"use strict";
const fs=require("node:fs");
const path=require("node:path");
const {ROOT,collect,exposed,summary}=require("./donnees.cjs");
function build(){
 const model=collect();
 const dest=path.join(ROOT,"_site");
 fs.rmSync(dest,{recursive:true,force:true});
 fs.mkdirSync(dest,{recursive:true});
 function copy(source,target=source){
   const dst=path.join(dest,target);
   fs.mkdirSync(path.dirname(dst),{recursive:true});
   fs.copyFileSync(path.join(ROOT,source),dst);
 }
 function json(name,value){
   const file=path.join(dest,name);
   fs.mkdirSync(path.dirname(file),{recursive:true});
   fs.writeFileSync(file,JSON.stringify(value,null,2)+"\n","utf8");
 }
 for(const name of ["index.html","sante.html","favicon.svg","icon-192.png","icon-512.png","manifest.webmanifest","publication.txt",".nojekyll"])copy(name);
 copy("personnel/sante/PROFIL.md");
 // Original des fichiers de santé consultable via GitHub, non nécessaire au fonctionnement du navigateur.
 // Compatibilité des anciens HTML potentiellement gardés en cache Android :
 // ces deux fichiers sont UNIQUEMENT produits dans _site/, jamais dans le dépôt.
 const legacyWeeks={};
 for(const week of index.semaines)legacyWeeks[week]=model.weeks.get(week);
 const legacyJS="/* Compatibilité temporaire avec les anciennes pages mises en cache ; données générées. */\n"+
  "window.MON_RYTHME_OBJECTIFS = "+JSON.stringify(model.config.objectifs)+";\n"+
  "window.MON_RYTHME_DEBUT_CYCLE = "+JSON.stringify(model.config.debutCycle)+";\n"+
  "window.MON_RYTHME_PROGRAMMES = "+JSON.stringify(legacyWeeks)+";\n";
 const legacyProgram=path.join(dest,"personnel/programme.js");
 fs.mkdirSync(path.dirname(legacyProgram),{recursive:true});
 fs.writeFileSync(legacyProgram,legacyJS,"utf8");
 const oldJournal=fs.readFileSync(path.join(ROOT,"personnel/sante/SUIVI.md"),"utf8");
 const reportContents=model.reportFiles.map(p=>fs.readFileSync(p,"utf8")).join("");
 const eventContents=model.eventFiles.map(p=>fs.readFileSync(p,"utf8")).join("");
 const journalOldStyle=oldJournal.replace("## Équipement de reprise — événements datés",reportContents+"## Équipement de reprise — événements datés")
   .replace("## Modèle d'entrée",eventContents+"## Modèle d'entrée");
 const compatibleJournal=path.join(dest,"personnel/sante/SUIVI.md");
 fs.mkdirSync(path.dirname(compatibleJournal),{recursive:true});
 fs.writeFileSync(compatibleJournal,journalOldStyle,"utf8");
 const index=summary(model);
 index.buildVersion=process.env.GITHUB_SHA?process.env.GITHUB_SHA.slice(0,12):"local";
 json("data/index.json",index);
 for(const monday of index.semaines)json("data/semaines/"+monday+".json",{schemaVersion:1,semaine:monday,sessions:exposed(monday,model)});
 const pageSize=30,pageCount=Math.ceil(model.events.length/pageSize);
 const pages=[];
 for(let page=0;page<pageCount;page++){
   const name="page-"+String(page+1).padStart(4,"0")+".json";
   pages.push(name);
   json("data/sante/journal/"+name,{schemaVersion:1,events:model.events.slice(page*pageSize,(page+1)*pageSize)});
 }
 json("data/sante/journal/index.json",{schemaVersion:1,total:model.events.length,pages});
 const attachments=path.join(ROOT,"personnel/pieces-jointes/seances");
 if(fs.existsSync(attachments))fs.cpSync(attachments,path.join(dest,"personnel/pieces-jointes/seances"),{recursive:true});
 console.log("Préparation réussie :",model.sessions.length,"séances,",index.semaines.length,"semaines,",model.reports.size,"rapports,",model.events.length,"événements");
}
if(require.main===module)build();
module.exports={build};