"use strict";
// Domaine pur : ni système de fichiers, ni interface Web, ni export Garmin.
function dateValide(date){
 if(typeof date!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(date))return false;
 const d=new Date(date+"T12:00:00Z");
 return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===date;
}
function heures(s){return Number.isInteger(s)&&s>0&&s%60===0;}
function verifier(plan,referentiel){
 if(!plan||typeof plan!=="object"||!/^[a-z0-9-]+$/.test(plan.id||"")||!dateValide(plan.date)||typeof plan.titre!=="string"||!plan.titre.trim())throw Error("Planification : identité invalide");
 if(!["course","renfo","kine"].includes(plan.type))throw Error("Planification : type inconnu "+plan.id);
 if(Object.hasOwn(plan,"nomEntrainementMontre")){
  const nom=plan.nomEntrainementMontre;
  if(typeof nom!=="string"||!nom.trim()||nom!==nom.trim()||nom.length>256||/[\r\n<>]/.test(nom)||/^(?:\d+|https?:\/\/)/i.test(nom))
   throw Error("Planification : nom d’entraînement montre invalide "+plan.id);
 }
 if(plan.dureeEstimeeMinutes){
  const d=plan.dureeEstimeeMinutes;
  if(!Number.isInteger(d.min)||!Number.isInteger(d.max)||d.min<1||d.max<d.min)throw Error("Planification : durée incorrecte "+plan.id);
 }
 if(plan.blocs){
  if(!Array.isArray(plan.blocs)||!plan.blocs.length)throw Error("Planification : blocs incorrects "+plan.id);
  for(const b of plan.blocs){
   if(!b||typeof b!=="object")throw Error("Planification : bloc absent "+plan.id);
   if(b.nature==="exercice"){
    if(!referentiel[b.mouvementId]||!Number.isInteger(b.series)||b.series<1||!Number.isInteger(b.repetitions)||b.repetitions<1||
       !Number.isInteger(b.reposEntreSeriesSecondes)||b.reposEntreSeriesSecondes<1||typeof b.consignes!=="string")throw Error("Planification : prescription Renfo invalide "+plan.id);
   }else if(b.nature==="fractions"){
    if(!Number.isInteger(b.repetitions)||b.repetitions<1||!heures(b.marcheSecondes)||!heures(b.courseSecondes))throw Error("Planification : fractions incorrectes");
   }else if(["mise_en_route","etirements","marche_finale"].includes(b.nature)){
    if(!heures(b.dureeSecondes))throw Error("Planification : durée d'étape incorrecte");
   }else if(b.nature==="allure"){if(b.niveau!=="facile")throw Error("Planification : allure non prise en charge");
   }else if(b.nature==="option"){if(typeof b.consignes!=="string"||!b.consignes)throw Error("Planification : option invalide");
   }else throw Error("Planification : nature non reconnue "+b.nature);
  }
 }
 return plan;
}
function texteBloc(b,ref){
 switch(b.nature){
 case "fractions": return b.repetitions+" × ("+(b.marcheSecondes/60)+" min marche + "+(b.courseSecondes/60)+" min course)";
 case "marche_finale":return b.dureeSecondes/60+" min de marche finale";
 case "allure":return "Allure "+b.niveau;
 case "option":return "Option "+b.consignes;
 case "etirements":return "Étirements doux · "+(b.dureeSecondes/60)+" min : "+b.consignes;
 case "mise_en_route":return "Mise en route · "+(b.dureeSecondes/60)+" min "+b.consignes;
 case "exercice":{
  const m=ref[b.mouvementId];if(!m)throw Error("Mouvement inconnu : "+b.mouvementId);
  return m.titre+" · "+b.series+" × "+b.repetitions+(b.parCote?" par côté":"")+" ; "+b.consignes+
   b.separateurRepos+b.reposEntreSeriesSecondes+" s entre séries (~"+b.estimationMinutes.min+"–"+b.estimationMinutes.max+" min)"+
   (b.complement?" ; "+b.complement:"");
 }
 default:throw Error("Nature inconnue : "+b.nature);
 }
}
function presenter(plan,ref){
 verifier(plan,ref);
 const obj={id:plan.id,date:plan.date,titre:plan.titre,type:plan.type};
 for(const key of ["heure","distance","objectif","details","nomEntrainementMontre"])if(Object.hasOwn(plan,key))obj[key]=plan[key];
 if(plan.dureeEstimeeMinutes){const d=plan.dureeEstimeeMinutes;obj.duree=d.min===d.max?d.min+" min":d.min+"–"+d.max+" min";}
 if(plan.blocs)obj.etapes=plan.blocs.map(b=>texteBloc(b,ref));
 return obj;
}
module.exports={verifier,presenter,texteBloc,dateValide};
