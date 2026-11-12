"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const {check}=require("../verifier-simulations.cjs");
const fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..");
const original=JSON.parse(fs.readFileSync(path.join(root,"SCENARIOS-SIMULATION.json"),"utf8"));
const actual=JSON.parse(fs.readFileSync(path.join(root,"RESULTATS-ESSAIS-COACH.json"),"utf8"));
test("Dix traces sans comparaison imaginaire",()=>assert.equal(check(original,actual),10));
test("Refuser un score d'amélioration inventé",()=>{
 const fake=structuredClone(actual);fake.comparaison.gainMesure="amélioration de 50%";
 assert.throws(()=>check(original,fake));
});
test("Refuser une validation Gardien indépendante fictive",()=>{
 const fake=structuredClone(actual);fake.resultats[0].validationGardienIndependante=true;
 assert.throws(()=>check(original,fake));
});
test("Refuser une écriture Garmin ou métier dans la simulation",()=>{
 const fake=structuredClone(actual);fake.resultats[4].operationsGarmin=1;
 assert.throws(()=>check(original,fake));
});
test("Refuser un attendu manquant ou le mauvais routage",()=>{
 let fake=structuredClone(actual);fake.resultats[1].autoRevue.pop();
 assert.throws(()=>check(original,fake));
 fake=structuredClone(actual);fake.resultats[2].rolesLogiques=["COACH"];
 assert.throws(()=>check(original,fake));
});
