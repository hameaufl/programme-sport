"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {verify}=require("../verifier-clauses-coach.cjs");
const data=JSON.parse(fs.readFileSync(path.join(__dirname,"..","REVUE-CLAUSES-COACH-COM03-COM09.json"),"utf8"));
test("Les 26 points ciblés sont sourcés à deux commits fixes",()=>{
 const r=verify(data);assert.equal(r.points,26);assert.equal(r.garmin_ecriture_autorisee,false);
 assert.equal(r.arbitrages_clos,0);
});
test("Déplacement d'une ligne historique ou citation inventée rejetés",()=>{
 const a=structuredClone(data);a.clauses[0].source.ligne=99;assert.throws(()=>verify(a));
 const b=structuredClone(data);b.clauses[1].preuve.fragment_attendu="AUTORISATION TOTALE";assert.throws(()=>verify(b));
});
test("Le nom prétendument confirmé ne peut être ré-ancré à un mauvais SHA",()=>{
 const a=structuredClone(data);a.clauses[3].preuve.sha="f".repeat(40);assert.throws(()=>verify(a));
});
test("Les permissions Garmin et la clôture des arbitrages ne sont pas modifiables par la revue",()=>{
 const a=structuredClone(data);a.garmin_ecriture_autorisee=true;assert.throws(()=>verify(a));
 const b=structuredClone(data);b.arbitrages_clos=1;assert.throws(()=>verify(b));
 const c=structuredClone(data);c.clauses[14].classe="alignement_v2";assert.throws(()=>verify(c));
 const d=structuredClone(data);d.clauses[1].autorisation_garmin_nouvelle=true;assert.throws(()=>verify(d));
});
test("Aucune correction opérationnelle ou certification exhaustive fictive",()=>{
 const a=structuredClone(data);a.certification_clause_par_clause_complete=true;assert.throws(()=>verify(a));
 const b=structuredClone(data);b.clauses[8].correction_operationnelle_appliquee=true;assert.throws(()=>verify(b));
 const c=structuredClone(data);c.classes.alignement_v2++;assert.throws(()=>verify(c));
});
