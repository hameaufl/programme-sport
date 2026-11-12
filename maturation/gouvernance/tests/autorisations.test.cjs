"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const {evaluate}=require("../verifier-autorisations.cjs");
const cas=JSON.parse(fs.readFileSync(path.join(__dirname,"cas-autorisations.json"),"utf8")).cas;
test("20 cas fictifs de préconditions, aucun outil externe",()=>{
  assert.equal(cas.length,20);
  const ids=cas.map(x=>x.id);assert.equal(new Set(ids).size,ids.length);
  for(const x of cas)assert.equal(evaluate(x.donnees).statut,x.attendu,x.id);
});
test("Refuser toute exécution réelle et toute entrée hors contrat",()=>{
  assert.equal(evaluate({mode:"execution_reelle",operation:"lecture"}).statut,"refuse");
  assert.equal(evaluate({mode:"analyse_sans_execution",operation:"inconnue"}).statut,"refuse");
});
test("Ne pas laisser une autorisation de programme permettre la suppression",()=>{
  const model=cas.find(x=>x.id==="CAS-04");
  const cloned=structuredClone(model.donnees);cloned.operation="garmin.supprimer";
  assert.equal(evaluate(cloned).statut,"refuse");
});
test("Ne pas autoriser une suppression planifiée",()=>{
  const x=structuredClone(cas.find(x=>x.id==="CAS-11").donnees);x.cible.planifie=true;
  assert.equal(evaluate(x).statut,"refuse");
});
