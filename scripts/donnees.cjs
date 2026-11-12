"use strict";
const fs=require("node:fs");
const path=require("node:path");
const ROOT=path.resolve(__dirname,"..");
function rel(p){return path.relative(ROOT,p).split(path.sep).join("/");}
function filesIn(directory,extension){
  if(!fs.existsSync(directory))return [];
  return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
    const p=path.join(directory,entry.name);
    if(entry.isSymbolicLink())throw Error("Lien symbolique interdit dans les données : "+rel(p));
    return entry.isDirectory()?filesIn(p,extension):entry.isFile()&&p.endsWith(extension)?[p]:[];
  }).sort();
}
function readJSON(p){return JSON.parse(fs.readFileSync(p,"utf8"));}
function validDate(date){return typeof date==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(date)&&!Number.isNaN(Date.parse(date+"T12:00:00Z"))&&new Date(date+"T12:00:00Z").toISOString().slice(0,10)===date;}
function monday(iso){const d=new Date(iso+"T12:00:00Z");d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);return d.toISOString().slice(0,10);}
function listOfStrings(v){return Array.isArray(v)&&v.every(s=>typeof s==="string"&&s.trim().length>0);}
function str(v){return typeof v==="string";}
function collect(){
  const config=readJSON(path.join(ROOT,"personnel/config.json"));
  if(config.schemaVersion!==1||!listOfStrings(config.objectifs)||!validDate(config.debutCycle))throw Error("Configuration du programme invalide");
  const files=filesIn(path.join(ROOT,"personnel/seances"),".json");
  const sessions=[],ids=new Set(),weeks=new Map();
  for(const p of files){
    const s=readJSON(p);
    if(!str(s.id)||!/^[a-z0-9][a-z0-9-]*$/.test(s.id)||ids.has(s.id))throw Error("Identifiant manquant, incorrect ou dupliqué : "+rel(p));
    const parts=rel(p).split("/");
    if(parts.length!==5||parts[0]!=="personnel"||parts[1]!=="seances"||!/^20\d{2}$/.test(parts[2])||!/^\d{2}$/.test(parts[3])||parts[4]!==s.id+".json")throw Error("Nom ou dossier incohérent : "+rel(p));
    if(!validDate(s.date)||!str(s.titre)||!s.titre.trim()||typeof s.fait!=="boolean"||!str(s.sensations))throw Error("Champs requis incorrects : "+s.id);
    for(const k of ["etapes","exercicesRealises","structuresSollicitees"])if(Object.hasOwn(s,k)&&!listOfStrings(s[k]))throw Error("Liste invalide "+k+" : "+s.id);
    for(const k of ["heure","duree","distance","type","objectif","details"])if(Object.hasOwn(s,k)&&!str(s[k]))throw Error("Champ texte invalide "+k+" : "+s.id);
    if(!s.fait&&((s.exercicesRealises||[]).length||(s.structuresSollicitees||[]).length))throw Error("Séance non faite avec détails réalisés : "+s.id);
    if(Object.hasOwn(s,"pieces_jointes")){
      if(!Array.isArray(s.pieces_jointes))throw Error("Pièces jointes invalides : "+s.id);
      const seenRoles=new Set();
      for(const a of s.pieces_jointes){
        if(!a||!["entrainement_prevu","activite_realisee"].includes(a.role)||a.format!=="fit"||typeof a.chemin!=="string")throw Error("Pièce jointe invalide : "+s.id);
        const prefix="personnel/pieces-jointes/seances/"+s.id+"/"+(a.role==="entrainement_prevu"?"prevu":"realise")+"/";
        if(seenRoles.has(a.role)||!a.chemin.startsWith(prefix)||!/^[-a-zA-Z0-9_./]+\.fit$/.test(a.chemin)||a.chemin.includes(".."))throw Error("Chemin ou rôle Garmin incorrect : "+s.id);
        const attachment=path.join(ROOT,a.chemin);
        if(!fs.existsSync(attachment)||!fs.statSync(attachment).isFile())throw Error("Pièce jointe Garmin introuvable : "+a.chemin);
        const buf=fs.readFileSync(attachment);
        if(buf.length<16||buf.toString("ascii",8,12)!==".FIT")throw Error("Fichier FIT invalide : "+a.chemin);
        seenRoles.add(a.role);
      }
    }
    ids.add(s.id);sessions.push(s);
    const week=monday(s.date);
    if(!weeks.has(week))weeks.set(week,[]);
    weeks.get(week).push(s);
  }
  const reports=new Map(),reportFiles=filesIn(path.join(ROOT,"personnel/sante/rapports"),".md");
  for(const p of reportFiles){
    const raw=fs.readFileSync(p,"utf8");
    const m=raw.match(/^- \*\*Identifiant\s*:\*\*\s*`([^`]+)`\s*$/m);
    if(!m)throw Error("Rapport sans identifiant : "+rel(p));
    const id=m[1];
    if(reports.has(id)||!ids.has(id)||path.basename(p)!==id+".md")throw Error("Rapport orphelin ou dupliqué : "+rel(p));
    const readBullet=(name)=>{
      const line=raw.split(/\r?\n/).find(line=>line.startsWith("- **"+name+" :** "));
      return line?line.slice(("- **"+name+" :** ").length).split(/\s*;\s*/).map(x=>x.trim()).filter(Boolean):[];
    };
    reports.set(id,{exercices:readBullet("Réalisé"),structures:readBullet("Structures sollicitées")});
  }
  const events=[],eventFiles=filesIn(path.join(ROOT,"personnel/sante/evenements"),".md"),eventIds=new Set();
  for(const p of eventFiles){
    const text=fs.readFileSync(p,"utf8");
    const lines=text.split(/\r?\n/);
    const h=lines.findIndex(x=>x.trim());
    const m=h<0?null:lines[h].match(/^### (\d{4}-\d{2}-\d{2})\s+—\s+(.+)$/);
    if(!m||!validDate(m[1]))throw Error("Événement mal daté : "+rel(p));
    const id=path.basename(p,".md");
    if(eventIds.has(id)||!id.startsWith(m[1]+"-"))throw Error("ID d'événement incohérent : "+rel(p));
    eventIds.add(id);
    events.push({id,date:m[1],title:m[2],lines:lines.slice(h+1)});
  }
  events.sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
  for(const [week,list] of weeks)list.sort((a,b)=>a.date.localeCompare(b.date)||String(a.heure||"").localeCompare(String(b.heure||""))||a.id.localeCompare(b.id));
  return {config,sessions,weeks,reports,events,sourceFiles:files,reportFiles,eventFiles};
}
function exposed(week,model){
  return (model.weeks.get(week)||[]).map(s=>{
    const result={...s},report=model.reports.get(s.id);
    if(report){
      if(!Array.isArray(s.exercicesRealises)||!s.exercicesRealises.length)result.exercicesDuRapport=report.exercices;
      if(!Array.isArray(s.structuresSollicitees)||!s.structuresSollicitees.length)result.structuresDuRapport=report.structures;
    }
    return result;
  });
}
function summary(model){
  return {schemaVersion:1,objectifs:model.config.objectifs,debutCycle:model.config.debutCycle,
    semaines:[...model.weeks.keys()].sort(),
    compteurs:{programmees:model.sessions.length,realisees:model.sessions.filter(x=>x.fait===true).length,
      avecSensations:model.sessions.filter(x=>x.sensations.trim()).length}};
}
module.exports={ROOT,collect,exposed,summary,monday,validDate,filesIn};