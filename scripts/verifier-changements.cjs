"use strict";
const cp=require("node:child_process"),path=require("node:path"),fs=require("node:fs");
const root=path.resolve(__dirname,"..");
function git(args){return cp.execFileSync("git",args,{cwd:root,encoding:"utf8"}).trim();}
try{
 const diff=git(["diff","--name-status","HEAD^","HEAD","--","personnel/seances","personnel/sante/rapports","personnel/sante/evenements"]);
 const lines=diff?diff.split(/\r?\n/):[];
 const migration=git(["diff","--name-only","HEAD^","HEAD"]).split(/\r?\n/);
 const isMigration=migration.includes("scripts/migration-preuve.json")&&migration.includes("personnel/programme.js");
 const deletions=lines.filter(x=>/^[DR]\d*\t/.test(x));
 if(deletions.length&&!isMigration)throw Error("Suppression/renommage de sources personnelles interdits sans migration validée : "+deletions.join("; "));
 const changes=lines.filter(x=>/^[AM]\tpersonnel\/seances\//.test(x));
 const message=git(["log","-1","--format=%B"]);
 if(changes.length>4&&!isMigration&&!message.includes("[lot-valide]"))throw Error(changes.length+" séances modifiées ensemble. Après validation explicite du lot par l'utilisateur, noter [lot-valide] dans le message de commit.");
 for(const line of lines){
   const match=line.match(/^M\t(personnel\/seances\/.+\.json)$/);
   if(!match)continue;
   const file=match[1];
   const previous=JSON.parse(git(["show","HEAD^:"+file]));
   const current=JSON.parse(fs.readFileSync(path.join(root,file),"utf8"));
   if(previous.id!==current.id)throw Error("Identifiant de séance modifié : "+file);
   const removed=Object.keys(previous).filter(key=>!Object.hasOwn(current,key));
   if(removed.length&&!message.includes("[suppression-champ-validée]")){
     throw Error("Champ(s) supprimé(s) dans "+file+" : "+removed.join(", ")+". Une suppression réellement demandée nécessite [suppression-champ-validée] dans le commit.");
   }
   if(previous.date!==current.date&&!message.includes("[date-validée]")){
     throw Error("Date de séance modifiée dans "+file+" ; nécessiter une demande explicite et le marqueur [date-validée].");
   }
 }
 console.log("Contrôle de portée :",changes.length,"séances modifiées,",deletions.length,"suppression(s), migration initiale =",isMigration);
}catch(e){console.error(e.message);process.exitCode=1;}
