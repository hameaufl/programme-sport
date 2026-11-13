"use strict";
// Tests statiques de CONSISTANCE D'EXEMPLES ; pas un moteur d'évaluation du modèle.
const fs=require("node:fs"),path=require("node:path");
const root=__dirname;
const countWords=x=>(x.trim().match(/[^\s]+/g)||[]).length;
const normal=x=>x.toLocaleLowerCase("fr");
function verify(cases,outputs,coachProtocol,mainProtocol) {
 if(cases.schemaVersion!==1||cases.statut!=="exemples_didactiques_non_observations_chatgpt"||
  !Array.isArray(cases.cas)||cases.cas.length!==8)throw Error("Huit scénarios ciblés requis");
 if(outputs.mode!=="illustrations_fictives_non_issues_d_une_conversation_de_test"||
  outputs.operationsGitHub!==0||outputs.operationsGarmin!==0||
  !Array.isArray(outputs.reponses)||outputs.reponses.length!==8)throw Error("Sorties didactiques ou mode sans écriture invalide");
 const ids=new Set(),out=new Set(),notes=[];
 for(const t of cases.cas){
   if(ids.has(t.id)||!/^CIB-0[1-8]$/.test(t.id)||typeof t.budgetMots!=="number"||
      !["court","conditionnel","justificatif"].includes(t.type)||t.budgetMots<50||t.budgetMots>180)
      throw Error("Fiche ciblée invalide ou dupliquée : "+t.id);
   ids.add(t.id);
   const result=outputs.reponses.find(x=>x.id===t.id);
   if(!result||out.has(result.id)||typeof result.reponse!=="string"||result.reponse.length<100)
      throw Error("Réponse didactique absente : "+t.id);
   out.add(result.id);
   const wordCount=countWords(result.reponse);
   if(wordCount>t.budgetMots)throw Error("Exemple trop long : "+t.id+" ("+wordCount+"/"+t.budgetMots+")");
   for(const term of t.exigences){
    if(!normal(result.reponse).includes(normal(term)))
      throw Error("Notion obligatoire omise : "+t.id+" / "+term);
   }
   notes.push({id:t.id,mots:wordCount,maximum:t.budgetMots,referenceB_MotsPDF:t.ancienB_MotsPDF});
 }
 const requiredCoach=[
  "Sortie proportionnée B2","contrôle qualité obligatoire","Ne pas choisir d'horaire ou de date incompatible",
  "Les budgets sont **indicatifs**"
 ];
 const requiredProtocol=[
  "Restitution proportionnée B2","Ne pas confondre visibilité des contrôles et exécution des contrôles",
  "ne jamais proposer un jour explicitement exclu"
 ];
 for(const text of requiredCoach)if(!coachProtocol.includes(text))throw Error("Garde-fou Coach manquant : "+text);
 for(const text of requiredProtocol)if(!mainProtocol.includes(text))throw Error("Garde-fou protocole manquant : "+text);
 return notes;
}
module.exports={verify,countWords};
if(require.main===module){
 try{
 const a=JSON.parse(fs.readFileSync(path.join(root,"CAS-CIBLES-B2.json"),"utf8"));
 const b=JSON.parse(fs.readFileSync(path.join(root,"REPONSES-EXEMPLES-B2.json"),"utf8"));
 const x=verify(a,b,
   fs.readFileSync(path.join(root,"agents","COACH.md"),"utf8"),
   fs.readFileSync(path.join(root,"PROTOCOLE-COACH.md"),"utf8"));
 console.log("B2 : "+x.length+" exemples concis vérifiés, zéro sortie de modèle réellement évaluée.");
 console.log("B2 : "+x.map(z=>z.id+"="+z.mots+"/"+z.maximum+" mots").join(", "));
 }catch(e){console.error("B2 : REFUS — "+e.message);process.exitCode=1;}
}
