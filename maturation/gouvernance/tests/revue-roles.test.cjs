"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),cp=require("node:child_process");
const {verify}=require("../verifier-revue-roles.cjs");
const root=path.resolve(__dirname,"../../.."),b="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const source=cp.execFileSync("git",["show",b+":docs/ROLES.md"],{cwd:root,encoding:"utf8"});
const rows=JSON.parse(fs.readFileSync(path.join(root,"maturation/gouvernance/REVUE-ROLES-29-RUBRIQUES.json"),"utf8"));
test("Les 29 sections historiques de ROLES sont recensées sans nouveau droit",()=>assert.equal(verify(rows,source).rubriques,29));
test("Une ancienne obligation FIT ne peut pas redevenir courante",()=>{
 const x=structuredClone(rows);x.rubriques[9].qualification_preliminaire="courant_a_verifier";
 assert.throws(()=>verify(x,source));
});
test("Aucun remplacement ne peut être annoncé comme effectué",()=>{
 const x=structuredClone(rows);x.rubriques[0].remplacement_applique=true;assert.throws(()=>verify(x,source));
});
test("Aucune rubrique ne peut prétendre à l'exhaustivité sémantique",()=>{
 const x=structuredClone(rows);x.rubriques[7].verification_semantique_exhaustive=true;assert.throws(()=>verify(x,source));
});
