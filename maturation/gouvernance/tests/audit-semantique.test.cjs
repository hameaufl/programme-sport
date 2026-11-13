"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const {verify}=require("../verifier-audit-semantique.cjs");
const ROOT=path.resolve(__dirname,"../../.."),HERE=path.resolve(__dirname,"..");
const read=p=>JSON.parse(fs.readFileSync(path.join(HERE,p),"utf8"));
const I=read("INVENTAIRE-RUBRIQUES-MAIN.json"),A=read("AUDIT-ANCRAGES-SEMANTIQUES.json"),C=read("COUVERTURE-PROTOCOLES.json");
const MAIN="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const load=p=>cp.execFileSync("git",["show",MAIN+":"+p],{cwd:ROOT,encoding:"utf8"});
test("Les 161 rubriques de main et 85 attributions gardent leur statut provisoire",()=>{
 assert.equal(verify(I,A,C,load).certification_semantique,"NON");
});
test("Refuser de présenter le préambule expérimental comme historique",()=>{
 const x=structuredClone(I);x.nombre_rubriques_main=162;assert.throws(()=>verify(x,A,C,load));
});
test("Refuser une source déplacée vers un faux SHA",()=>{
 const x=structuredClone(C);x.attributions[0].source_historique=x.attributions[0].source_historique.replace(MAIN,"f".repeat(40));
 assert.throws(()=>verify(I,A,x,load));
});
test("Refuser de requalifier sans audit une attribution incorrecte",()=>{
 const x=structuredClone(A);x.attributions.find(v=>v.id==="COO-01").statut="ancre_plausible_non_certifiee";
 assert.throws(()=>verify(I,x,C,load));
});
test("Refuser une rubrique supprimée ou un titre altéré",()=>{
 const x=structuredClone(I);x.sections[0].titre="Titre sans source";
 assert.throws(()=>verify(x,A,C,load));
});
