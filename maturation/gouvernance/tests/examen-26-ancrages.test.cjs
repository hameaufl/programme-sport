"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {verify}=require("../verifier-examen-26-ancrages.cjs");
const here=path.resolve(__dirname,"..");
const read=x=>JSON.parse(fs.readFileSync(path.join(here,x),"utf8"));
const d=read("EXAMEN-CRITIQUE-26-ANCRAGES.json"),p=read("PROPOSITIONS-26-ANCRAGES.json");
const reviews=["REVUE-87-RUBRIQUES-RESTANTES.json","REVUE-REPRISE-30-RUBRIQUES.json",
"REVUE-ROLES-29-RUBRIQUES.json","REVUE-COACH-15-RUBRIQUES.json"].map(read);
test("26 propositions croisées sans validation automatique de provenance",()=>{
 const x=verify(d,p,reviews);assert.equal(x.candidats,26);assert.equal(x.provenances_validees,0);
});
test("MAT-20 ne peut prétendre provenir d'une rubrique actuellement valide",()=>{
 const a=structuredClone(d);a.corrections.find(x=>x.id==="MAT-20").rubrique_historique.statut="courant_a_verifier";
 assert.throws(()=>verify(a,p,reviews));
});
test("MAT-17 conserve son avertissement sur compatibilité de cache V1/V2",()=>{
 const a=structuredClone(d);a.corrections.find(x=>x.id==="MAT-17").controle_transversal="relecture_clause_necessaire";
 assert.throws(()=>verify(a,p,reviews));
});
test("REF-06 ne reçoit ni source fictive ni statut validé",()=>{
 const a=structuredClone(d);a.corrections.find(x=>x.id==="REF-06").candidat_source={chemin:"AGENTS.md",sha:d.source_sha_main,ligne:3};
 assert.throws(()=>verify(a,p,reviews));
 const b=structuredClone(d);b.nouvelle_provenance_validee=true;assert.throws(()=>verify(b,p,reviews));
});
test("Toute modification silencieuse d'un lien, d'un statut ou de la matrice est rejetée",()=>{
 const a=structuredClone(d);a.corrections[0].candidat_source.ligne=999;assert.throws(()=>verify(a,p,reviews));
 const b=structuredClone(d);b.modification_matrice_appliquee=true;assert.throws(()=>verify(b,p,reviews));
 const c=structuredClone(d);c.corrections[0].certification_clause=true;assert.throws(()=>verify(c,p,reviews));
});
