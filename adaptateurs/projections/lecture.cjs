"use strict";
// Assemblage par ports, sans connaissance des chemins physiques des domaines.
const path=require("node:path");
const local=require("../fichiers/stockage.cjs");
const depotFichiers=require("../fichiers/depots.cjs");
const mediasWeb=require("../web/medias.cjs");
const planModel=require("../../domaines/planification/modele.cjs");
const activities=require("../../domaines/activites/modele.cjs");
const health=require("../../domaines/sante/modele.cjs");
const coaching=require("../../domaines/coaching/modele.cjs");
const {ROOT}=local;
function monday(iso){
 const d=new Date(iso+"T12:00:00Z");d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);
 return d.toISOString().slice(0,10);
}
function filesIn(dir,ext){return local.enumerer(path.relative(ROOT,dir).split(path.sep).join("/"),ext);}
function collect(depots=depotFichiers,{medias=mediasWeb}={}){
 const cycle=depots.planification.cycle(),prefs=coaching.verifierObjectifs(depots.coaching.objectifs());
 if(cycle.schemaVersion!==1||!planModel.dateValide(cycle.debutCycle))throw Error("Cycle sportif invalide");
 const catalogue=depots.planification.mouvements();
 if(catalogue.schemaVersion!==1||!Array.isArray(catalogue.mouvements))throw Error("Référentiel de mouvements invalide");
 const mouvements=Object.fromEntries(catalogue.mouvements.map(x=>[x.id,x]));
 if(Object.keys(mouvements).length!==catalogue.mouvements.length)throw Error("Mouvements dupliqués");
 const images=medias?medias.images(mouvements):new Map();
 const sourceFiles=depots.planification.seances(),activiteFiles=depots.activites.seances(),observationsFiles=depots.sante.observations();
 const execution=new Map(),observations=new Map(),plans=new Map(),sessions=[],weeks=new Map();
 for(const doc of activiteFiles){
  const a=activities.verifier(doc.donnees);
  if(execution.has(a.seanceId))throw Error("Activité dupliquée : "+a.seanceId);
  execution.set(a.seanceId,a);
 }
 for(const doc of observationsFiles){
  const o=health.verifierObservation(doc.donnees);
  if(observations.has(o.seanceId))throw Error("Ressenti dupliqué : "+o.seanceId);
  observations.set(o.seanceId,o);
 }
 for(const doc of sourceFiles){
  const p=planModel.verifier(doc.donnees,mouvements);
  if(plans.has(p.id))throw Error("Plan dupliqué : "+p.id);
  plans.set(p.id,p);
  const s=planModel.presenter(p,mouvements),a=execution.get(p.id),o=observations.get(p.id);
  s.fait=!!a;s.sensations=o?o.sensations:"";
  if(a)for(const key of ["exercicesRealises","structuresSollicitees"])if(Object.hasOwn(a,key))s[key]=a[key];
  if(medias){
   const aides=(p.blocs||[]).filter(b=>b.nature==="exercice").map(b=>{
    const png=images.get(b.mouvementId);if(!png)throw Error("Illustration absente : "+b.mouvementId);
    return {exercice:planModel.texteBloc(b,mouvements),png};
   });
   if(aides.length)s.aidesExercices=aides;
  }
  Object.defineProperty(s,"blocs",{value:p.blocs,enumerable:false});
  sessions.push(s);
  const week=monday(p.date);if(!weeks.has(week))weeks.set(week,[]);weeks.get(week).push(s);
 }
 for(const id of execution.keys())if(!plans.has(id))throw Error("Activité orpheline : "+id);
 for(const id of observations.keys())if(!plans.has(id))throw Error("Ressenti orphelin : "+id);
 for(const list of weeks.values())list.sort((a,b)=>a.date.localeCompare(b.date)||String(a.heure||"").localeCompare(String(b.heure||""))||a.id.localeCompare(b.id));
 const reportFiles=depots.sante.rapports(),reports=new Map();
 for(const doc of reportFiles){
  const raw=doc.texte,m=raw.match(/^- \*\*Identifiant\s*:\*\*\s*\x60([^\x60]+)\x60\s*$/m);
  if(!m)throw Error("Rapport sans identifiant : "+doc.path);
  const id=m[1];
  if(reports.has(id)||!plans.has(id)||doc.nom!==id+".md")throw Error("Rapport orphelin : "+id);
  const readBullet=name=>{
   const prefix="- **"+name+" :** ";
   const line=raw.split(/\r?\n/).find(x=>x.startsWith(prefix));
   return line?line.slice(prefix.length).split(/\s*;\s*/).map(x=>x.trim()).filter(Boolean):[];
  };
  reports.set(id,{exercices:readBullet("Réalisé"),structures:readBullet("Structures sollicitées")});
 }
 const eventFiles=depots.sante.evenements(),events=[],seen=new Set();
 for(const doc of eventFiles){
  const lines=doc.texte.split(/\r?\n/),first=lines.findIndex(x=>x.trim());
  const m=first<0?null:lines[first].match(/^### (\d{4}-\d{2}-\d{2})\s+—\s+(.+)$/);
  const id=doc.nom.replace(/\.md$/,"");
  if(!m||!planModel.dateValide(m[1])||seen.has(id)||!id.startsWith(m[1]+"-"))throw Error("Événement santé invalide : "+id);
  seen.add(id);events.push({id,date:m[1],title:m[2],lines:lines.slice(first+1)});
 }
 events.sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
 return {config:{schemaVersion:1,debutCycle:cycle.debutCycle,objectifs:prefs.objectifs},sessions,weeks,reports,events,plans,execution,observations,mouvements,sourceFiles,reportFiles,eventFiles};
}
function exposed(week,model,policy=local.json("contrats/publication-v1.json")){
 if(policy.schemaVersion!==1||policy.default!=="deny"||!Array.isArray(policy.programme))throw Error("Politique de publication absente");
 return (model.weeks.get(week)||[]).map(s=>{
  const view={};for(const key of policy.programme)if(Object.hasOwn(s,key))view[key]=s[key];
  const rapport=model.reports.get(s.id);
  if(rapport){
   if(!s.exercicesRealises?.length&&policy.programme.includes("exercicesDuRapport"))view.exercicesDuRapport=rapport.exercices;
   if(!s.structuresSollicitees?.length&&policy.programme.includes("structuresDuRapport"))view.structuresDuRapport=rapport.structures;
  }
  if(Object.hasOwn(view,"blocs"))throw Error("Modèle interne exporté vers le Web");
  return view;
 });
}
function summary(model){
 return {schemaVersion:1,objectifs:model.config.objectifs,debutCycle:model.config.debutCycle,
  semaines:[...model.weeks.keys()].sort(),
  compteurs:{programmees:model.sessions.length,realisees:model.sessions.filter(x=>x.fait===true).length,
  avecSensations:model.sessions.filter(x=>x.sensations.trim()).length}};
}
module.exports={ROOT,collect,exposed,summary,monday,validDate:planModel.dateValide,filesIn};
