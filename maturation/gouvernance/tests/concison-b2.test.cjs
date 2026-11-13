"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {verify,countWords}=require("../verifier-concision-b2.cjs");
const root=path.join(__dirname,"..");
const cases=JSON.parse(fs.readFileSync(path.join(root,"CAS-CIBLES-B2.json"),"utf8"));
const output=JSON.parse(fs.readFileSync(path.join(root,"REPONSES-EXEMPLES-B2.json"),"utf8"));
const coach=fs.readFileSync(path.join(root,"agents","COACH.md"),"utf8");
const protocol=fs.readFileSync(path.join(root,"PROTOCOLE-COACH.md"),"utf8");
test("Huit exemples ciblés avec budget et garde-fous conservés",()=>{
 assert.equal(verify(cases,output,coach,protocol).length,8);
});
test("Réponse trop longue refusée",()=>{
 const x=structuredClone(output);
 x.reponses[0].reponse+=" phrase-longue".repeat(95);
 assert.throws(()=>verify(cases,x,coach,protocol));
});
test("Mention de sécurité ou de disponibilité supprimée : refus",()=>{
 const x=structuredClone(output);
 x.reponses[2].reponse=x.reponses[2].reponse.replace("inconnus","certains");
 assert.throws(()=>verify(cases,x,coach,protocol));
});
test("Sans règle de contrôle qualité interne, échec du vérificateur",()=>{
 const x=coach.replace("contrôle qualité obligatoire","simple option de qualité");
 assert.throws(()=>verify(cases,output,x,protocol));
});
test("Sans contrôle de calendrier, échec du vérificateur",()=>{
 const x=protocol.replace("ne jamais proposer un jour explicitement exclu","proposer librement n'importe quel jour");
 assert.throws(()=>verify(cases,output,coach,x));
});
test("Une sortie qui prétend publier ou programmer réellement n'est pas une fixture valide",()=>{
 const x=structuredClone(output);
 x.operationsGarmin=1;assert.throws(()=>verify(cases,x,coach,protocol));
});
test("Doublon de scénario détecté",()=>{
 const x=structuredClone(cases);x.cas[7].id="CIB-01";
 assert.throws(()=>verify(x,output,coach,protocol));
});
test("Nombre de mots compté de façon reproductible",()=>{
 assert.equal(countWords("Un deux  trois\nquatre"),4);
});

test("Un nouveau cas fictif spontané ne doit plus être requis à l'initialisation",()=>{
 const c=coach.replace("ne pas inventer des scénarios fictifs","inventer librement des scénarios fictifs");
 assert.throws(()=>verify(cases,output,c,protocol));
 const p=protocol.replace("aucun exercice fictif improvisé","plein d'exercices fictifs improvisés");
 assert.throws(()=>verify(cases,output,coach,p));
});
