"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs");
const {check}=require("../verifier-contretests-b2.cjs");
const dir=path.join(__dirname,"..");
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),"utf8"));
const a=read("CONTRETESTS-B2-PROMPTS.json"),b=read("CONTRETESTS-B2-CRITERES.json"),c=read("CONTRETESTS-B2-OBSERVATIONS.json");
test("Deux scénarios préparés et aucune observation prétendue",()=>assert.deepEqual(check(a,b,c),{statut:"non_execute",cas:2,observations:0}));
test("Refus d'une réponse simulée comme étant déjà observée",()=>{
 const v=structuredClone(c);v.observations[0].texteDisponible=true;assert.throws(()=>check(a,b,v));
});
test("Refus de notifier une fausse validation",()=>{
 const v=structuredClone(c);v.visaGardien=true;assert.throws(()=>check(a,b,v));
 const w=structuredClone(c);w.autorisationFusionMain=true;assert.throws(()=>check(a,b,w));
});
test("Refus d'un mauvais SHA de branche",()=>{
 const v=structuredClone(a);v.sha="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";assert.throws(()=>check(v,b,c));
});
test("Refus d'une omission d'exigences",()=>{
 const v=structuredClone(b);v.tests[1].attendus=[];assert.throws(()=>check(a,v,c));
});
test("Refus d'une publication infondée d'une réponse B2",()=>{
 const v=structuredClone(c);v.statut="observations_a_qualifier";v.observations[1].texteDisponible=true;assert.throws(()=>check(a,b,v));
});
