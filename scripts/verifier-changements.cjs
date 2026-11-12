"use strict";
// Protection de chaque source métier après séparation des domaines.
const cp=require("node:child_process"),path=require("node:path"),fs=require("node:fs");
const root=path.resolve(__dirname,"..");
function git(args){return cp.execFileSync("git",args,{cwd:root,encoding:"utf8"}).trim();}
function dossier(p){
 if(p.startsWith("domaines/planification/donnees/seances/"))return "planification";
 if(p.startsWith("domaines/activites/donnees/seances/"))return "activites";
 if(p.startsWith("domaines/sante/donnees/"))return "sante";
 if(p.startsWith("domaines/coaching/donnees/"))return "coaching";
 return null;
}
try{
 const raw=git(["diff","--no-renames","--name-status","HEAD^","HEAD","--","domaines/planification/donnees","domaines/activites/donnees","domaines/sante/donnees","domaines/coaching/donnees"]);
 const lines=raw?raw.split(/\r?\n/):[],message=git(["log","-1","--format=%B"]);
 const entries=lines.map(line=>{const i=line.indexOf("\t");return i<0?null:{status:line.slice(0,i),file:line.slice(i+1)};}).filter(Boolean);
 const deletions=entries.filter(e=>/^[DR]/.test(e.status));
 if(deletions.length&&!message.includes("[migration-validée]")&&!message.includes("[suppression-seance-validée]")&&!message.includes("[suppression-champ-validée]"))
  throw Error("Suppression source métier sans marqueur explicite : "+deletions.map(e=>e.file).join("; "));
 const modifications=entries.filter(e=>/^[AM]/.test(e.status)&&e.file.startsWith("domaines/planification/donnees/seances/"));
 if(modifications.length>4&&!message.includes("[lot-valide]")&&!message.includes("[migration-validée]"))
  throw Error(modifications.length+" programmes modifiés sans accord de lot signalé [lot-valide].");
 for(const entry of entries){
  if(entry.status!=="M"||!entry.file.endsWith(".json"))continue;
  const old=JSON.parse(git(["show","HEAD^:"+entry.file])),now=JSON.parse(fs.readFileSync(path.join(root,entry.file),"utf8"));
  const area=dossier(entry.file);
  const idField=area==="planification"?"id":"seanceId";
  if(Object.hasOwn(old,idField)&&old[idField]!==now[idField])throw Error("Identifiant métier altéré : "+entry.file);
  if(old.date&&old.date!==now.date&&!message.includes("[date-validée]"))throw Error("Date de séance modifiée sans accord : "+entry.file);
  const removed=Object.keys(old).filter(k=>!Object.hasOwn(now,k));
  if(removed.length&&!message.includes("[suppression-champ-validée]")&&!message.includes("[migration-validée]"))
   throw Error("Champs sources disparus sans accord : "+entry.file+" ("+removed.join(", ")+")");
 }
 console.log("Protection métier : "+entries.length+" changements, "+deletions.length+" suppressions, "+modifications.length+" programmes affectés.");
}catch(e){console.error(e.message);process.exitCode=1;}
