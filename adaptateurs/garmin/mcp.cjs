"use strict";
// Adaptateur sans effet de bord : prépare des décisions MCP, jamais d'écriture distante.
// La source métier est Planification V2 (blocs), les IDs Garmin restent hors des domaines.
const crypto=require("node:crypto");
const depots=require("../fichiers/depots.cjs");
const modele=require("../../domaines/planification/modele.cjs");
function canonique(x){
 if(Array.isArray(x))return x.map(canonique);
 if(x&&typeof x==="object")return Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonique(x[k])]));
 return x;
}
function verifierPrescription(p){
 if(!p||!["course","renfo"].includes(p.type)||!Array.isArray(p.blocs)||!p.blocs.length)
  throw Error("Seuls les programmes structurés Course et Renfo sont pris en charge");
 if(p.type==="renfo"&&p.blocs.some(b=>b.nature==="retour_au_calme")&&p.blocs.some(b=>b.nature==="etirements"))
  throw Error("Retour au calme redondant avec les étirements");
 return p;
}
function empreinte(p){
 verifierPrescription(p);
 // Le même contenu peut être programmé à plusieurs dates : ni date, ni titre, ni id.
 const prescription=JSON.stringify(canonique({sport:p.type,blocs:p.blocs}));
 return crypto.createHash("sha256").update(prescription).digest("hex");
}
function preparer(ids,source=depots){
 if(!Array.isArray(ids)||!ids.length||new Set(ids).size!==ids.length)
  throw Error("Sélection explicite, non vide et sans doublons exigée");
 const catalogue=source.planification.mouvements();
 const ref=Object.fromEntries(catalogue.mouvements.map(m=>[m.id,m]));
 const groupes=new Map();
 for(const id of ids){
  if(typeof id!=="string"||!/^(?:course|renfo)-\d{4}-\d{2}-\d{2}$/.test(id))throw Error("Identifiant non admissible : "+id);
  const plan=verifierPrescription(modele.verifier(source.planification.parId(id),ref));
  if(plan.id!==id||!plan.date.endsWith(id.slice(-10)))throw Error("Programme et date incohérents : "+id);
  if(source.activites?.estRealisee?.(id))throw Error("Séance déjà réalisée : ne pas reprogrammer sans arbitrage Coach : "+id);
  const hash=empreinte(plan);
  if(!groupes.has(hash))groupes.set(hash,{empreinte:hash,sport:plan.type,modele:plan,dates:[],seanceIds:[]});
  const groupe=groupes.get(hash);
  groupe.dates.push(plan.date);groupe.seanceIds.push(id);
 }
 return {statut:"PREPARATION_LOCALE_SEULEMENT",selection:ids.slice(),modeles:[...groupes.values()]};
}
// Préparer les associations à des dates : nécessite des identifiants récupérés de Garmin,
// jamais devinés. L'appel MCP schedule_workouts est effectué seulement par le Coach autorisé.
function preparerCalendrier(preparation,idsDistants,existants=[]){
 if(preparation?.statut!=="PREPARATION_LOCALE_SEULEMENT"||!idsDistants||typeof idsDistants!=="object"||!Array.isArray(existants))throw Error("Contexte de planification invalide");
 const aProgrammer=[],alertes=[];
 for(const m of preparation.modeles){
  const remote=idsDistants[m.empreinte];
  if(!Number.isSafeInteger(remote)||remote<=0)throw Error("Modèle distant non vérifié : "+m.empreinte);
  for(const date of m.dates){
   const surDate=existants.filter(x=>x.calendar_date===date||x.date===date);
   if(surDate.some(x=>(x.workout_id??x.workoutId)===remote))continue;
   // Plusieurs activités distinctes peuvent légitimement figurer le même jour.
   // Une autre entrée existante impose une vérification humaine avant écriture.
   if(surDate.length)alertes.push({date,sport:m.sport,message:"Autre entraînement déjà présent ce jour : vérifier le calendrier"});
   aProgrammer.push({workout_id:remote,calendar_date:date});
  }
 }
 return {outil:"schedule_workouts",schedules:aProgrammer,alertes,statut:"A_CONFIRMATION_EXPLICITE"};
}
// Conversion prudente pour les fractions marche/course courantes : aucun objectif FC inventé.
// Les Renfos demandent un contrôle des exercices homologués Garmin et de la récupération.
function dtoCourse(p,nom){
 verifierPrescription(p);
 if(p.type!=="course")throw Error("Conversion automatique Renfo non validée : vérifier les noms Garmin, séries et étirements");
 if(typeof nom!=="string"||!nom.trim()||nom.length>256)throw Error("Nom Garmin à choisir et valider avant création");
 const blocs=p.blocs;
 if(blocs.some(b=>!["fractions","marche_finale","allure","etirements"].includes(b.nature)))
  throw Error("Option ou étape non convertible sans décision explicite du Coach");
 const fractions=blocs.filter(b=>b.nature==="fractions"),finale=blocs.filter(b=>b.nature==="marche_finale"),stretch=blocs.filter(b=>b.nature==="etirements");
 if(fractions.length!==1||finale.length!==1||stretch.length!==1)throw Error("Schéma Course non pris en charge");
 const result=[],sportType={sportTypeId:1,sportTypeKey:"running"};
 function push(stepTypeId,stepTypeKey,seconds,description){
  if(!Number.isSafeInteger(seconds)||seconds<=0)throw Error("Durée Garmin invalide");
  result.push({type:"ExecutableStepDTO",stepOrder:result.length+1,
   stepType:{stepTypeId,stepTypeKey},
   endCondition:{conditionTypeId:2,conditionTypeKey:"time"},endConditionValue:seconds,
   targetType:{workoutTargetTypeId:1,workoutTargetTypeKey:"no.target"},
   description});
 }
 const b=fractions[0];
 for(let n=0;n<b.repetitions;n++){
  push(n===0?1:4,n===0?"warmup":"recovery",b.marcheSecondes,"Marche facile");
  push(3,"interval",b.courseSecondes,"Course à pied, allure facile");
 }
 push(2,"cooldown",finale[0].dureeSecondes,"Marche finale");
 push(2,"cooldown",stretch[0].dureeSecondes,"Étirements doux : "+stretch[0].consignes);
 return {workoutName:nom.trim(),sportType,workoutSegments:[{segmentOrder:1,sportType,workoutSteps:result}]};
}
if(require.main===module){
 const ids=process.argv.slice(2);
 try{
  const p=preparer(ids);
  // Aucun identifiant secret, aucune écriture ni programme créé.
  console.log(JSON.stringify({statut:p.statut,modeles:p.modeles.map(m=>({empreinte:m.empreinte,sport:m.sport,seanceIds:m.seanceIds,dates:m.dates}))},null,2));
 }catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={empreinte,preparer,preparerCalendrier,dtoCourse};
