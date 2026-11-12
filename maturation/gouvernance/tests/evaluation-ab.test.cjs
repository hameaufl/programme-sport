"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const {analyse,KEYS}=require("../verifier-evaluation-ab.cjs");
const root=path.join(__dirname,"..");
const source=JSON.parse(fs.readFileSync(path.join(root,"EVALUATION-AB.json"),"utf8"));
const ids=JSON.parse(fs.readFileSync(path.join(root,"SCENARIOS-SIMULATION.json"),"utf8")).scenarios.map(x=>x.id);
const observation=(sha,score)=>({
 statut:"observe",shaLu:sha,conversationIsolee:true,simulationSansEcriture:true,
 notesAnonymisees:"Observation fictive utilisée uniquement dans un test unitaire.",
 erreursCritiques:[],scores:Object.fromEntries(KEYS.map(k=>[k,score]))
});
test("Aucun résultat réel = comparaison non mesurable",()=>{
 assert.deepEqual(analyse(source,ids),{statut:"non_mesurable",paires:0,observations:0});
});
test("Une seule réponse enregistrée = comparaison non concluante",()=>{
 const testDoc=structuredClone(source);
 testDoc.resultats[0].B=observation(source.versionB,2);
 assert.equal(analyse(testDoc,ids).statut,"partiel_non_concluant");
});
test("Deux séries fictives complètes sont agrégées sans certification automatique",()=>{
 const testDoc=structuredClone(source);
 for(const x of testDoc.resultats){x.A=observation(source.versionA,1);x.B=observation(source.versionB,2);}
 const result=analyse(testDoc,ids);
 assert.equal(result.statut,"comparaison_chiffree_a_valider_humainement");
 assert.equal(result.paires,10);assert.equal(result.differenceBmoinsA,60);
});
test("Refus SHA absent, critère invalide ou déclaration d'isolement absente",()=>{
 const testDoc=structuredClone(source);
 testDoc.resultats[0].A=observation(source.versionB,2);
 assert.throws(()=>analyse(testDoc,ids));
 testDoc.resultats[0].A=observation(source.versionA,2);
 testDoc.resultats[0].A.scores.qualite=3;
 assert.throws(()=>analyse(testDoc,ids));
 testDoc.resultats[0].A.scores.qualite=2;
 testDoc.resultats[0].A.conversationIsolee=false;
 assert.throws(()=>analyse(testDoc,ids));
});
test("Rejeter le doublon d'un scénario",()=>{
 const testDoc=structuredClone(source);
 testDoc.resultats[1].id=testDoc.resultats[0].id;
 assert.throws(()=>analyse(testDoc,ids));
});
