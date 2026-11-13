"use strict";
// Vérifie la préparation et la saisie des observations des contre-tests B2.
// Ne génère pas de réponses LLM, ne calcule pas automatiquement de qualité sémantique.
const fs=require("node:fs"),path=require("node:path");
const B2="0aca52ac999f3a579610edfa2106aa400518a3fc";
const NAMES=["CT-B2-01","CT-B2-02"];
function check(prompts,criteria,results) {
 if(prompts.schemaVersion!==1||criteria.schemaVersion!==1||results.schemaVersion!==1 ||
   prompts.branche!=="tests/coach-b2-concis" || prompts.sha!==B2 || results.referenceB2!==B2)
   throw Error("Schéma ou branche SHA non concordant");
 if(prompts.tests?.length!==2||criteria.tests?.length!==2||results.observations?.length!==2)
   throw Error("Deux scénarios, deux grilles et deux observations requis");
 const unique=(items)=>new Set(items).size===items.length;
 for(const source of [prompts.tests,criteria.tests,results.observations]) {
   const ids=source.map(x=>x.id);
   if(!unique(ids)||!NAMES.every(n=>ids.includes(n)))throw Error("Scénario absent ou dupliqué");
 }
 if(results.independanceEvaluation!==false||results.visaGardien!==false||
    results.autorisationFusionMain!==false||results.autorisationGarmin!==false)
    throw Error("Visa/accord/indépendance non acquis ne peut être inventé");
 for(const t of prompts.tests) {
  if(!t.scenario.includes("SIMULATION ENTIÈREMENT FICTIVE") ||
     !t.scenario.includes("LECTURE SEULE") ||t.scenario.length<450)
     throw Error("Prompt de test non protégé ou incomplet : "+t.id);
  const criteriaRow=criteria.tests.find(x=>x.id===t.id);
  if(criteriaRow.bloquants.length<3||criteriaRow.attendus.length<7 ||
     criteriaRow.attendus.some(x=>x.length<28))throw Error("Critères insuffisants : "+t.id);
  const observation=results.observations.find(x=>x.id===t.id);
  if(observation.attendusTotaux!==criteriaRow.attendus.length)throw Error("Dénominateur du score invalide : "+t.id);
  if(results.statut==="non_execute") {
    if(observation.texteDisponible!==false||observation.shaEffectivementVerifie!==null||
     observation.contexteNeufConfirme!==null||observation.erreursBloquantes!==null||
     observation.attendusSatisfaits!==null||observation.nombreMots!==null||
     observation.notesAnonymisees!==null||observation.appreciation!==null)
     throw Error("Résultat de conversation inventé pour un test non exécuté : "+t.id);
  } else if(results.statut==="observations_a_qualifier") {
    if(observation.texteDisponible===true) {
      if(observation.shaEffectivementVerifie!==B2||observation.contexteNeufConfirme!==true||
         !Number.isInteger(observation.erreursBloquantes)||observation.erreursBloquantes<0||
         !Number.isInteger(observation.attendusSatisfaits)||observation.attendusSatisfaits<0||
         observation.attendusSatisfaits>observation.attendusTotaux||
         !Number.isInteger(observation.nombreMots)||observation.nombreMots<1||
         typeof observation.notesAnonymisees!=="string"||observation.notesAnonymisees.length<45)
        throw Error("Réponse observée mais éléments d'audit insuffisants : "+t.id);
    } else if(observation.shaEffectivementVerifie!==null||observation.attendusSatisfaits!==null)
      throw Error("Résultat absent pourtant noté : "+t.id);
  } else throw Error("Statut inconnu");
 }
 return {statut:results.statut,cas:2,observations:results.observations.filter(x=>x.texteDisponible).length};
}
module.exports={check};
if(require.main===module) {
 try{
 const root=__dirname;
 const a=JSON.parse(fs.readFileSync(path.join(root,"CONTRETESTS-B2-PROMPTS.json"),"utf8"));
 const b=JSON.parse(fs.readFileSync(path.join(root,"CONTRETESTS-B2-CRITERES.json"),"utf8"));
 const c=JSON.parse(fs.readFileSync(path.join(root,"CONTRETESTS-B2-OBSERVATIONS.json"),"utf8"));
 const summary=check(a,b,c);
 console.log("CONTRE-TESTS B2 : "+JSON.stringify(summary)+" ; statut de la revue : "+(summary.observations===0?"aucune réponse observée":"revue manuelle non indépendante, résultats de conversations privées")+".");
 }catch(e){console.error("CONTRE-TESTS B2 : REFUS — "+e.message);process.exitCode=1;}
}
