"use strict";
// Assemblage de lecture aux frontières des domaines : ne constitue aucune source canonique.
const fs=require("node:fs"),path=require("node:path");
const store=require("../fichiers/stockage.cjs");
const planModel=require("../../domaines/planification/modele.cjs");
const activities=require("../../domaines/activites/modele.cjs");
const health=require("../../domaines/sante/modele.cjs");
const coaching=require("../../domaines/coaching/modele.cjs");
const {ROOT}=store;
function monday(iso){
 const d=new Date(iso+"T12:00:00Z");d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);
 return d.toISOString().slice(0,10);
}
function filesIn(dir,ext){
 const rel=path.relative(ROOT,dir).split(path.sep).join("/");
 return store.enumerer(rel,ext);
}
function collect(){
 const cycle=store.json("domaines/planification/donnees/cycle.json");
 const prefs=coaching.verifierObjectifs(store.json("domaines/coaching/donnees/objectifs.json"));
 if(cycle.schemaVersion!==1||!planModel.dateValide(cycle.debutCycle))throw Error("Cycle sportif invalide");
 const catalogue=store.json("domaines/planification/donnees/mouvements.json");
 if(catalogue.schemaVersion!==1||!Array.isArray(catalogue.mouvements))throw Error("Référentiel de mouvements invalide");
 const mouvements=Object.fromEntries(catalogue.mouvements.map(x=>[x.id,x]));
 if(Object.keys(mouvements).length!==catalogue.mouvements.length)throw Error("Mouvements dupliqués");
 // Les aides graphiques appartiennent exclusivement à l'extension Web.
 const banque=store.json("addons/web/public/assets/renfo/banque.json");
 if(banque.schemaVersion!==2||!Array.isArray(banque.images))throw Error("Manifeste d'images Web invalide");
 const images=new Map();
 for(const aid of banque.images){
  if(!mouvements[aid.mouvementId]||images.has(aid.mouvementId)||
     !/^assets\/renfo\/png\/[a-z0-9-]+\.png$/.test(aid.png)||
     !store.existe("addons/web/public/"+aid.png))throw Error("Image Web invalide");
  images.set(aid.mouvementId,aid.png);
 }
 const sourceFiles=store.enumerer("domaines/planification/donnees/seances",".json");
 const activiteFiles=store.enumerer("domaines/activites/donnees/seances",".json");
 const observationsFiles=store.enumerer("domaines/sante/donnees/ressentis/seances",".json");
 const execution=new Map(),observations=new Map(),plans=new Map(),sessions=[],weeks=new Map();
 for(const file of activiteFiles){
  const a=activities.verifier(JSON.parse(fs.readFileSync(file,"utf8")));
  if(execution.has(a.seanceId))throw Error("Exécution dupliquée : "+a.seanceId);
  execution.set(a.seanceId,a);
 }
 for(const file of observationsFiles){
  const o=health.verifierObservation(JSON.parse(fs.readFileSync(file,"utf8")));
  if(observations.has(o.seanceId))throw Error("Observation dupliquée : "+o.seanceId);
  observations.set(o.seanceId,o);
 }
 for(const file of sourceFiles){
  const p=JSON.parse(fs.readFileSync(file,"utf8"));
  planModel.verifier(p,mouvements);
  const expected="domaines/planification/donnees/seances/"+p.date.slice(0,4)+"/"+p.date.slice(5,7)+"/"+p.id+".json";
  if(store.relatif(file)!==expected||plans.has(p.id))throw Error("Plan orphelin ou dupliqué : "+store.relatif(file));
  plans.set(p.id,p);
  const s=planModel.presenter(p,mouvements),a=execution.get(p.id),o=observations.get(p.id);
  s.fait=!!a;
  s.sensations=o?o.sensations:"";
  if(a)for(const key of ["exercicesRealises","structuresSollicitees"])if(Object.hasOwn(a,key))s[key]=a[key];
  const fitPath="adaptateurs/garmin/fichiers/"+p.id+".fit";
  if(store.existe(fitPath)){
   const bytes=fs.readFileSync(store.resolver(fitPath));
   if(bytes.length<16||bytes.toString("ascii",8,12)!==".FIT")throw Error("FIT invalide : "+p.id);
   s.pieces_jointes=[{role:"entrainement_prevu",format:"fit",url:"fichiers/garmin/"+p.id+".fit"}];
  }
  const aids=(p.blocs||[]).filter(b=>b.nature==="exercice").map(b=>{
   const png=images.get(b.mouvementId);
   if(!png)throw Error("Illustration absente pour "+b.mouvementId);
   return {exercice:planModel.texteBloc(b,mouvements),png};
  });
  if(aids.length)s.aidesExercices=aids;
  // Disponible pour les adaptateurs techniques, jamais exporté dans les vues Web.
  Object.defineProperty(s,"blocs",{value:p.blocs,enumerable:false});
  sessions.push(s);
  const week=monday(p.date);if(!weeks.has(week))weeks.set(week,[]);weeks.get(week).push(s);
 }
 for(const id of execution.keys())if(!plans.has(id))throw Error("Activité orpheline : "+id);
 for(const id of observations.keys())if(!plans.has(id))throw Error("Ressenti orphelin : "+id);
 for(const [week,ss] of weeks)ss.sort((a,b)=>a.date.localeCompare(b.date)||String(a.heure||"").localeCompare(String(b.heure||""))||a.id.localeCompare(b.id));
 const reportFiles=store.enumerer("domaines/sante/donnees/rapports",".md"),reports=new Map();
 for(const file of reportFiles){
  const raw=fs.readFileSync(file,"utf8");
  const match=raw.match(/^- \*\*Identifiant\s*:\*\*\s*`([^`]+)`\s*$/m);
  if(!match)throw Error("Rapport sans identifiant "+store.relatif(file));
  const id=match[1];if(reports.has(id)||!plans.has(id)||path.basename(file)!==id+".md")throw Error("Rapport orphelin "+id);
  const bullet=name=>{
   const prefix="- **"+name+" :** ";
   const entry=raw.split(/\r?\n/).find(line=>line.startsWith(prefix));
   return entry?entry.slice(prefix.length).split(/\s*;\s*/).map(x=>x.trim()).filter(Boolean):[];
  };
  reports.set(id,{exercices:bullet("Réalisé"),structures:bullet("Structures sollicitées")});
 }
 const eventFiles=store.enumerer("domaines/sante/donnees/evenements",".md"),events=[],eventIds=new Set();
 for(const file of eventFiles){
  const lines=fs.readFileSync(file,"utf8").split(/\r?\n/);
  const first=lines.findIndex(x=>x.trim()),m=first<0?null:lines[first].match(/^### (\d{4}-\d{2}-\d{2})\s+—\s+(.+)$/);
  const id=path.basename(file,".md");
  if(!m||!planModel.dateValide(m[1])||eventIds.has(id)||!id.startsWith(m[1]+"-"))throw Error("Événement de santé invalide : "+id);
  eventIds.add(id);events.push({id,date:m[1],title:m[2],lines:lines.slice(first+1)});
 }
 events.sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
 return {config:{schemaVersion:1,debutCycle:cycle.debutCycle,objectifs:prefs.objectifs},sessions,weeks,reports,events,plans,execution,observations,mouvements,sourceFiles,reportFiles,eventFiles};
}
function exposed(week,model){
 const policy=store.json("contrats/publication-v1.json");
 if(policy.schemaVersion!==1||policy.default!=="deny"||!Array.isArray(policy.programme))throw Error("Politique de publication absente");
 return (model.weeks.get(week)||[]).map(s=>{
  const view={};for(const key of policy.programme)if(Object.hasOwn(s,key))view[key]=s[key];
  const report=model.reports.get(s.id);
  if(report){
   if(!s.exercicesRealises?.length&&policy.programme.includes("exercicesDuRapport"))view.exercicesDuRapport=report.exercices;
   if(!s.structuresSollicitees?.length&&policy.programme.includes("structuresDuRapport"))view.structuresDuRapport=report.structures;
  }
  if(Object.hasOwn(view,"blocs"))throw Error("Fuite du modèle interne");
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
