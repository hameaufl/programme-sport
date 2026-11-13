"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs");
const {check}=require("../verifier-contretests-b2.cjs");
const dir=path.join(__dirname,"..");
const read=n=>JSON.parse(fs.readFileSync(path.join(dir,n),"utf8"));
const a=read("CONTRETESTS-B2-PROMPTS.json"),b=read("CONTRETESTS-B2-CRITERES.json"),observed=read("CONTRETESTS-B2-OBSERVATIONS.json");
const c=structuredClone(observed);
c.statut="non_execute"; c.dateEvaluation=null;
for(const v of c.observations){v.texteDisponible=false;v.shaEffectivementVerifie=null;v.contexteNeufConfirme=null;v.erreursBloquantes=null;v.attendusSatisfaits=null;v.appreciation=null;v.nombreMots=null;v.notesAnonymisees=null;}
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

test("Deux conversations neuves réellement évaluées mais non indépendamment certifiées",()=>{
 const v=structuredClone(c);
 const sha="0aca52ac999f3a579610edfa2106aa400518a3fc";
 v.statut="observations_a_qualifier";
 v.dateEvaluation="2026-11-13";
 for(let i=0;i<2;i++)Object.assign(v.observations[i],{
   texteDisponible:true,shaEffectivementVerifie:sha,contexteNeufConfirme:true,erreursBloquantes:0,
   attendusSatisfaits:i===0?9:5,appreciation:"audite",nombreMots:i===0?212:165,
   notesAnonymisees:"Observation fictive de test unitaire, pas une réponse de Coach créée par ce test."
 });
 assert.deepEqual(check(a,b,v),{statut:"observations_a_qualifier",cas:2,observations:2});
 v.observations[1].attendusSatisfaits=9;
 assert.throws(()=>check(a,b,v));
 v.observations[1].attendusSatisfaits=5;v.visaGardien=true;
 assert.throws(()=>check(a,b,v));
});

test("Notes publiées de l'audit correspondent aux observations effectivement transmises",()=>{
 const summary=check(a,b,observed);
 assert.equal(summary.observations,2);
 assert.equal(observed.observations[0].erreursBloquantes,0);
 assert.equal(observed.observations[1].erreursBloquantes,0);
 assert.equal(observed.observations[0].attendusSatisfaits,9);
 assert.equal(observed.observations[1].attendusSatisfaits,5);
 assert.equal(observed.observations[0].nombreMots,212);
 assert.equal(observed.observations[1].nombreMots,165);
});
