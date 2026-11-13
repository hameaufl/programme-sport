"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {verify}=require("../verifier-161-rubriques.cjs");
const root=path.resolve(__dirname,"..");
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const data=read("REVUE-87-RUBRIQUES-RESTANTES.json");
const inv=read("INVENTAIRE-RUBRIQUES-MAIN.json");
const others=["REVUE-REPRISE-30-RUBRIQUES.json","REVUE-ROLES-29-RUBRIQUES.json","REVUE-COACH-15-RUBRIQUES.json"].map(read);
test("161 rubriques historiquement ancrées une fois : ce n'est PAS une certification des clauses",()=>{
 const result=verify(data,inv,others);
 assert.equal(result.rubriques_preliminaires,161);
 assert.equal(result.rubriques_nouvelles,87);
 assert.equal(result.clauses_certifiees,false);
});
test("Une ancienne obligation FIT ne devient pas une obligation actuelle",()=>{
 const a=structuredClone(data);a.rubriques.find(r=>r.id==="AGN-33").qualification_preliminaire="courant_a_verifier";
 assert.throws(()=>verify(a,inv,others));
});
test("Une consigne de suppression Garmin mixte ne peut être réactivée par simple reclassement",()=>{
 const a=structuredClone(data);a.rubriques.find(r=>r.id==="MCP-11").qualification_preliminaire="courant_a_verifier";
 assert.throws(()=>verify(a,inv,others));
});
test("Une ancienne prescription Renfo datée ne peut devenir prescriptive",()=>{
 const a=structuredClone(data);a.rubriques.find(r=>r.id==="AGN-10").qualification_preliminaire="courant_a_verifier";
 assert.throws(()=>verify(a,inv,others));
});
test("Aucune disparition de source historique, doublon, transfert ou nouvelle permission",()=>{
 const a=structuredClone(data);a.rubriques.pop();assert.throws(()=>verify(a,inv,others));
 const b=structuredClone(data);b.rubriques[0].ligne_debut=999;assert.throws(()=>verify(b,inv,others));
 const c=structuredClone(data);c.autorisation_garmin_nouvelle=true;assert.throws(()=>verify(c,inv,others));
 const d=structuredClone(data);d.certification_semantique_exhaustive=true;assert.throws(()=>verify(d,inv,others));
 const e=structuredClone(others);e[0].rubriques[0].source="AGENTS.md";e[0].rubriques[0].ligne_debut=3;
 assert.throws(()=>verify(data,inv,e));
});
