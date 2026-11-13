"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs");
const {verify}=require("../verifier-resultats-b2.cjs");
const src=JSON.parse(fs.readFileSync(path.join(__dirname,"..","RESULTATS-B2-OBSERVES.json"),"utf8"));
test("Six comparaisons et deux nouveaux tests sans comparateur B",()=>{
 const r=verify(src);assert.equal(r.casComparables,6);assert.equal(r.nouveauxSansB,2);
 assert.equal(r.reductionPourcent,71.3);
});
test("Refus de créer un résultat historique B pour un nouveau test",()=>{
 const x=structuredClone(src);x.nouveaux[0].comparateurB="reponse_b_simulee";assert.throws(()=>verify(x));
});
test("Refus de travestir la somme des mots",()=>{
 const x=structuredClone(src);x.mesures.sommeB2=100;assert.throws(()=>verify(x));
});
test("Refus d'affirmer un visa de fusion ou de publier les PDF",()=>{
 const x=structuredClone(src);x.activation.accordFusionMain=true;assert.throws(()=>verify(x));
 const y=structuredClone(src);y.confidentialite.pdfPublies=true;assert.throws(()=>verify(y));
});
test("Refus de supprimer les réserves d'un des six scénarios",()=>{
 const x=structuredClone(src);x.comparables[5].reserve="";assert.throws(()=>verify(x));
});
test("Refus d'un SHA B2 différent de celui testé",()=>{
 const x=structuredClone(src);x.versionB2="c92d5a7c69b371bfa9ef6770363ad0c07bf53f93";assert.throws(()=>verify(x));
});
