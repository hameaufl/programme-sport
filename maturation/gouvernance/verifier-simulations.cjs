"use strict";
// Vérifie UNIQUEMENT la cohérence structurelle d'un journal de simulation.
// Ne note jamais la qualité d'une réponse LLM ni la supériorité sur l'ancien Coach.
const fs=require("node:fs"),path=require("node:path");
const ROOT=__dirname;
function check(scenarios,results) {
 if(scenarios.mode!=="simulation_sans_ecriture"||scenarios.scenarios.length!==10)throw Error("10 scénarios en mode simulation requis");
 if(results.schemaVersion!==1||results.resultats?.length!==10)throw Error("10 traces de simulation requises");
 if(results.comparaison.historiqueA!=="non_execute"||results.comparaison.gainMesure!=="non_mesurable")throw Error("Comparaison ou gain inventé");
 if(results.contraintes.ecritureGitMetier||results.contraintes.ecritureGarmin||results.contraintes.publication)throw Error("La campagne doit rester sans effet externe");
 const ids=new Set(),roles=new Set(["COACH","ANALYSTE","STRATEGE","PLANIFICATEUR","GARMIN","CONTROLEUR-QUALITE","MATURATION","GARDIEN"]);
 for(const result of results.resultats) {
  const expected=scenarios.scenarios.find(s=>s.id===result.id);
  if(!expected||ids.has(result.id))throw Error("Scénario absent ou dupliqué : "+result.id);
  ids.add(result.id);
  if(result.mode!=="examen_dirige_par_criteres_dans_la_meme_conversation"||
     result.instancesIndependantes!==0||result.validationGardienIndependante!==false)throw Error("Contrôle indépendant fictif : "+result.id);
  if(result.operationsGitMetier!==0||result.operationsGarmin!==0)throw Error("Opération externe revendiquée : "+result.id);
  if(result.rolesLogiques.join("|")!==expected.roles.join("|")||result.rolesLogiques.some(x=>!roles.has(x)))
    throw Error("Routage incorrect : "+result.id);
  if(!result.reponseSimulee||result.reponseSimulee.length<140||!result.limiteObservation)throw Error("Trace incomplète : "+result.id);
  if(result.autoRevue?.length!==expected.attendus.length)throw Error("Attentes omises : "+result.id);
  for(let i=0;i<expected.attendus.length;i++) {
    const x=result.autoRevue[i];
    if(x.attendu!==expected.attendus[i]||x.evaluation!=="coherent_a_la_lecture_non_independant"||x.observation.length<25)
      throw Error("Auto-revue non traçable : "+result.id+" / "+i);
  }
 }
 return ids.size;
}
module.exports={check};
if(require.main===module){
 try{
  const s=JSON.parse(fs.readFileSync(path.join(ROOT,"SCENARIOS-SIMULATION.json"),"utf8"));
  const r=JSON.parse(fs.readFileSync(path.join(ROOT,"RESULTATS-ESSAIS-COACH.json"),"utf8"));
  console.log("SIMULATION : "+check(s,r)+" traces documentées, aucun score de gain ni validation indépendante.");
 }catch(e){console.error("SIMULATION : REFUSÉ — "+e.message);process.exitCode=1;}
}
