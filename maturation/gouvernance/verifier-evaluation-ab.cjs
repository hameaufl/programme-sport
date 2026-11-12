"use strict";
// Dépouillement de scores SAISIS APRÈS deux conversations isolées.
// N'exécute aucun LLM, n'obtient aucune preuve de façon autonome.
const fs=require("node:fs"),path=require("node:path");
const KEYS=["fidelite","autorisations","tracabilite","qualite","coherence","clarte"];
const EXPECTED_A="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const EXPECTED_B="c6f5b58dacfa9fc96c976b60c966302ed754b525";
function analyse(document,scenarioIds) {
 if(!document||document.schemaVersion!==1||document.versionA!==EXPECTED_A||
     document.versionB!==EXPECTED_B||!Array.isArray(document.resultats)) throw Error("Versions ou structure A/B incorrectes");
 if(document.resultats.length!==scenarioIds.length||new Set(document.resultats.map(x=>x.id)).size!==scenarioIds.length ||
    document.resultats.some(x=>!scenarioIds.includes(x.id))) throw Error("Scénarios absents/dupliqués/étrangers");
 const sums={A:0,B:0},critical={A:0,B:0}; let pairs=0, observations=0;
 for(const x of document.resultats){
   for(const role of ["A","B"]){
     const v=x[role];
     if(v===null)continue;
     observations++;
     if(v.statut!=="observe" || v.shaLu!==(role==="A"?EXPECTED_A:EXPECTED_B) ||
        v.conversationIsolee!==true || v.simulationSansEcriture!==true ||
        v.notesAnonymisees?.length<25 || !Array.isArray(v.erreursCritiques) ||
        !v.scores || Object.keys(v.scores).length!==KEYS.length ||
        KEYS.some(key=>!Number.isInteger(v.scores[key])||v.scores[key]<0||v.scores[key]>2)){
       throw Error("Observation non vérifiable dans sa forme : "+x.id+"/"+role);
     }
     if(new Set(v.erreursCritiques).size!==v.erreursCritiques.length)throw Error("Erreurs critiques dupliquées");
     sums[role]+=KEYS.reduce((s,key)=>s+v.scores[key],0);
     critical[role]+=v.erreursCritiques.length;
   }
   if(x.A!==null&&x.B!==null)pairs++;
 }
 if(observations===0)return {statut:"non_mesurable",paires:0,observations:0};
 if(pairs!==scenarioIds.length)return {statut:"partiel_non_concluant",paires:pairs,observations};
 return {statut:"comparaison_chiffree_a_valider_humainement",paires:pairs,observations,totaux:sums,
   erreursCritiques:critical,differenceBmoinsA:sums.B-sums.A,
   note:"Le script agrège seulement des évaluations manuelles ; il ne prouve ni indépendance ni gain réel."};
}
module.exports={analyse,KEYS};
if(require.main===module){
 try{
   const dir=__dirname;
   const doc=JSON.parse(fs.readFileSync(path.join(dir,"EVALUATION-AB.json"),"utf8"));
   const scenarios=JSON.parse(fs.readFileSync(path.join(dir,"SCENARIOS-SIMULATION.json"),"utf8"));
   console.log("EVALUATION A/B : "+JSON.stringify(analyse(doc,scenarios.scenarios.map(s=>s.id))));
 }catch(e){console.error("EVALUATION A/B : REFUSÉ — "+e.message);process.exitCode=1;}
}
