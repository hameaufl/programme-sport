"use strict";
const fs=require("node:fs"),path=require("node:path");
const {ROOT,collect,exposed,summary}=require("./donnees.cjs");
const depots=require("../adaptateurs/fichiers/depots.cjs");
const {projeterOrientation}=require("../adaptateurs/projections/coaching.cjs");
function build(){
 // L'add-on Web n'est pas nécessaire aux domaines métier ou aux services externes.
 if(process.env.MON_RYTHME_WEB==="0"){console.log("Add-on Web désactivé : domaines autonomes");return;}
 const mode=process.env.MON_RYTHME_POLITIQUE==="prive"?"prive":"courante";
 const fichier=mode==="prive"?"publication-prive-v1.json":"publication-v1.json";
 const policy=JSON.parse(fs.readFileSync(path.join(ROOT,"contrats",fichier),"utf8"));
 if(mode==="prive"&&process.env.MON_RYTHME_LEGACY==="1")throw Error("Compatibilité monolithique interdite avec la politique privée");
 // Stockage Santé et Coaching simulé hors du dépôt : leur absence ne bloque pas le Web.
 const depotsActifs=mode==="prive"?{...depots,
   sante:{...depots.sante,observations:()=>[],rapports:()=>[],evenements:()=>[],profil:()=>""},
   coaching:{...depots.coaching,objectifs:()=>({schemaVersion:1,objectifs:[]})}
 }:depots;
 const model=collect(depotsActifs);
 if(policy.default!=="deny"||policy.schemaVersion!==1)throw Error("Politique de publication non valide");
 const dest=path.join(ROOT,"_site");
 fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(dest,{recursive:true});
 function copy(src,to){
  const dst=path.join(dest,to);
  fs.mkdirSync(path.dirname(dst),{recursive:true});
  fs.copyFileSync(path.join(ROOT,src),dst);
 }
 function json(name,value){
  const file=path.join(dest,name);
  fs.mkdirSync(path.dirname(file),{recursive:true});
  fs.writeFileSync(file,JSON.stringify(value,null,2)+"\n","utf8");
 }
 for(const name of ["index.html","sante.html","coach.html"])copy("addons/web/pages/"+name,name);
 for(const name of ["favicon.svg","icon-192.png","icon-512.png","manifest.webmanifest"])copy("addons/web/public/"+name,name);
 for(const name of ["publication.txt",".nojekyll"])copy(name,name);
 const index=summary(model);
 index.buildVersion=process.env.GITHUB_SHA?process.env.GITHUB_SHA.slice(0,12):"local";
 const indexPublic={};for(const champ of policy.index||[])if(Object.hasOwn(index,champ))indexPublic[champ]=index[champ];
 json("data/index.json",indexPublic);
 // La projection Coaching est explicite, jamais une copie des documents métier ou de leur mémoire.
 if(policy.coaching?.orientationPublique===true){
  const vueCoach=projeterOrientation({orientation:depotsActifs.coaching.orientation(),objectifs:depotsActifs.coaching.objectifs()},policy);
  if(vueCoach)json("data/coaching/orientation.json",vueCoach);
 }
 for(const week of index.semaines)json("data/semaines/"+week+".json",{schemaVersion:1,semaine:week,sessions:exposed(week,model,policy)});
 if(policy.sante.profilPublic)copy("domaines/sante/donnees/PROFIL.md","data/sante/profil.md");
 // Minimisation de la vue Santé : les contenus de profil/événement restent dans les domaines métier.
 const events=policy.sante.evenementsPublics?model.events.map(e=>({date:e.date,title:e.title})):[],pageSize=30;
 const pages=[];
 for(let i=0;i<events.length;i+=pageSize){
  const name="page-"+String(pages.length+1).padStart(4,"0")+".json";
  pages.push(name);
  json("data/sante/journal/"+name,{schemaVersion:1,events:events.slice(i,i+pageSize)});
 }
 json("data/sante/journal/index.json",{schemaVersion:1,total:events.length,pages});
 // Ressources uniquement d'interface : pas de PNG/GIF dans les domaines métier.
 const images=path.join(ROOT,"addons/web/public/assets/renfo/png");
 if(fs.existsSync(images))fs.cpSync(images,path.join(dest,"assets/renfo/png"),{recursive:true});
 // Compatibilité des HTML mis en cache : option volontaire, désactivée par défaut
 // car elle republierait l'ensemble des séances sans contrôle de minimisation.
 if(process.env.MON_RYTHME_LEGACY==="1"){
  const weeks={};for(const week of index.semaines)weeks[week]=exposed(week,model,policy);
  const source="/* Compatibilité historique temporaire : exposition publique explicite. */\n"+
   "window.MON_RYTHME_OBJECTIFS = "+JSON.stringify(index.objectifs)+";\n"+
   "window.MON_RYTHME_DEBUT_CYCLE = "+JSON.stringify(index.debutCycle)+";\n"+
   "window.MON_RYTHME_PROGRAMMES = "+JSON.stringify(weeks)+";\n";
  const legacy=path.join(dest,"personnel/programme.js");fs.mkdirSync(path.dirname(legacy),{recursive:true});fs.writeFileSync(legacy,source);
 }
 console.log("Site produit : "+model.sessions.length+" séances, "+index.semaines.length+" semaines, "+model.reports.size+" rapports, "+events.length+" événements");
}
if(require.main===module)build();
module.exports={build};
