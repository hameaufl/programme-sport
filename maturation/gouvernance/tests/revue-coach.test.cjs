"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const {verify}=require("../verifier-revue-coach.cjs");
const root=path.resolve(__dirname,"../../..");
const base="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const src=cp.execFileSync("git",["show",base+":docs/COACH-MODE-OPERATOIRE.md"],{cwd:root,encoding:"utf8"});
const data=JSON.parse(fs.readFileSync(path.join(root,"maturation/gouvernance/REVUE-COACH-15-RUBRIQUES.json"),"utf8"));
test("Les 15 rubriques Coach sont ancrées à la source historique, sans droit nouveau",()=>{
 assert.equal(verify(data,src).rubriques,15);
});
test("Un état Garmin daté ne peut devenir une consigne active",()=>{
 const a=structuredClone(data);a.rubriques[5].qualification_preliminaire="courant_a_verifier";
 assert.throws(()=>verify(a,src));
});
test("Une permission Garmin discutée ne peut devenir courante par requalification",()=>{
 const a=structuredClone(data);a.rubriques[4].qualification_preliminaire="courant_a_verifier";
 assert.throws(()=>verify(a,src));
});
test("Aucune certification, application ni activation implicite",()=>{
 const a=structuredClone(data);a.certification_semantique_exhaustive=true;assert.throws(()=>verify(a,src));
 const b=structuredClone(data);b.rubriques[0].remplacement_applique=true;assert.throws(()=>verify(b,src));
 const c=structuredClone(data);c.rubriques[3].autorisation_nouvelle=true;assert.throws(()=>verify(c,src));
});
test("Une borne ou un titre historique erroné doit être rejeté",()=>{
 const a=structuredClone(data);a.rubriques[14].ligne_fin=113;assert.throws(()=>verify(a,src));
 const b=structuredClone(data);b.rubriques[9].titre="titre modifié";assert.throws(()=>verify(b,src));
});
