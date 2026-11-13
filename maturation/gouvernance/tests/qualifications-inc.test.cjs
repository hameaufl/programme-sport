"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const {verify}=require("../verifier-qualifications-inc.cjs");
const root=path.resolve(__dirname,"../../..");
const d=JSON.parse(fs.readFileSync(path.join(root,"maturation/gouvernance/referentiel/QUALIFICATIONS-INC-001-008.json"),"utf8"));
const main="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const reader=p=>cp.execFileSync("git",["show",main+":"+p],{cwd:root,encoding:"utf8"});
test("Huit conflits ouverts, preuves historiques exactes, aucune autorisation",()=>{
 const x=verify(d,reader);assert.equal(x.dossiers,8);assert.equal(x.preuves,16);
});
test("Refuser une clôture inventée",()=>{
 const x=structuredClone(d);x.dossiers[0].statut="clos";assert.throws(()=>verify(x,reader));
});
test("Refuser un changement de contenu sans preuve",()=>{
 const x=structuredClone(d);x.dossiers[4].preuves[0].fragment="phrase-qui-n'existe-pas";assert.throws(()=>verify(x,reader));
});
test("Refuser l'octroi implicite d'une permission Garmin",()=>{
 const x=structuredClone(d);x.garmin_ecriture_autorisee=true;assert.throws(()=>verify(x,reader));
});
test("Refuser un faux visa/autorisation de fusion",()=>{
 const x=structuredClone(d);x.fusions_autorisees=true;assert.throws(()=>verify(x,reader));
});
test("Refuser le doublon d'un dossier",()=>{
 const x=structuredClone(d);x.dossiers[7].id="INC-006";assert.throws(()=>verify(x,reader));
});
