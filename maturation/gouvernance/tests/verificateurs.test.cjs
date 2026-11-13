"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { allowed, changedUnexpected, preservedLegacy, prototypeUnchanged } = require("../verifier-integrite-metier.cjs");
const { duplicates, verifyRegister, verifyCoverage } = require("../verifier-referentiel.cjs");

test("Modifications de gouvernance permises, domaines et architecture interdits", () => {
  assert.equal(allowed("maturation/gouvernance/agents/COACH.md"), true);
  assert.equal(allowed(".github/workflows/verifier-gouvernance.yml"), true);
  for (const f of [
    "domaines/sante/donnees/PROFIL.md", "domaines/planification/archives/seance.json",
    "docs/ROLES.md", "adaptateurs/garmin/MCP.md", "addons/web/pages/index.html",
    "maturation/architecture/PLAN.md", "maturation/gouvernance/../architecture/PLAN.md",
    ".github/workflows/publier-pages.yml"
  ]) assert.equal(allowed(f), false, f);
  assert.deepEqual(changedUnexpected(["AGENTS.md", "domaines/sante/donnees/PROFIL.md"]),
    ["domaines/sante/donnees/PROFIL.md"]);
});

test("AGENTS : préfixe expérimental seul ; suppression historique bloquée", () => {
  const old = "# AGENTS.md\n\n## RÈGLE MÉTIER ABSOLUE — Nommage Garmin\nContenu historique important\n";
  const newer = "# AGENTS.md\n\n## EXPÉRIMENTATION MULTI-AGENTS\n\n" +
    "## RÈGLE MÉTIER ABSOLUE — Nommage Garmin\nContenu historique important\n";
  assert.equal(preservedLegacy(old, newer), true);
  assert.equal(preservedLegacy(old, newer.replace("Contenu historique important", "Version modifiée")), false);
  assert.equal(preservedLegacy(old, newer.replace("Contenu historique important\n", "")), false);
});

test("Deux IDs d'exigence identiques sont interdits", () => {
  assert.deepEqual(duplicates(["A", "B", "A"]), ["A"]);
  assert.deepEqual(duplicates(["MAT-01", "SUI-01"]), []);
});

test("Une incohérence manquante ou en double bloque la revue", () => {
  const ids = Array.from({ length: 8 }, (_, i) => "| INC-" + String(i + 1).padStart(3, "0") +
    " | texte | sources | avis | action | à qualifier |").join("\n");
  const base = ids + "\nÉtat des huit entrées : ouvert";
  assert.equal(verifyRegister(base), 8);
  assert.throws(() => verifyRegister(base.replace("INC-008", "INC-007")));
  assert.throws(() => verifyRegister(base.replace("INC-004", "INC-009")));
  assert.throws(() => verifyRegister(ids));
});

test("Matrice dégradée ou attributions absentes sont refusées", () => {
  const bad = { schemaVersion: 1, totalExigences: 85, attributions: [] };
  assert.throws(() => verifyCoverage(bad, "", () => ""));
  assert.throws(() => verifyCoverage({ schemaVersion: 0, totalExigences: 85, attributions: [] }, "", () => ""));
});

test("Inventaire fixe de dix simulations sans écriture", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const d = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "SCENARIOS-SIMULATION.json"), "utf8"));
  assert.equal(d.schemaVersion, 1);
  assert.equal(d.mode, "simulation_sans_ecriture");
  assert.equal(d.scenarios.length, 10);
  const ids = d.scenarios.map((x) => x.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const scenario of d.scenarios) {
    assert.ok(scenario.requete.includes("SIMULATION") || scenario.id === "SC-01");
    assert.ok(scenario.interdits.includes("ecriture_git") && scenario.interdits.includes("ecriture_garmin"));
    assert.ok(scenario.attendus.length >= 3);
  }
});

test("Le préambule expérimental ne peut pas acquérir une permission supplémentaire",()=>{
 const first="# AGENTS.md\n## EXPÉRIMENTATION MULTI-AGENTS\nLecture seule.\n## HISTORIQUE\n";
 assert.equal(prototypeUnchanged(first,first),true);
 assert.equal(prototypeUnchanged(first.replace("Lecture seule","Ecriture automatique"),first),false);
 assert.equal(prototypeUnchanged(first+"Permission sans accord\n",first),false);
});
test("Les 73 liens historiques et 12 propositions ont deux provenances distinctes et épinglées",()=>{
 const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
 const root=path.resolve(__dirname,"../../..");
 const base="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
 const data=JSON.parse(fs.readFileSync(path.join(__dirname,"..","COUVERTURE-PROTOCOLES.json"),"utf8"));
 const matrix=fs.readFileSync(path.join(__dirname,"..","MATRICE-COUVERTURE.md"),"utf8");
 const read=p=>fs.readFileSync(path.join(root,p),"utf8");
 const historic=p=>cp.execFileSync("git",["show",base+":"+p],{cwd:root,encoding:"utf8"});
 assert.equal(verifyCoverage(data,matrix,read,historic),85);
 assert.equal(data.attributions.filter(x=>x.type_provenance==="obligation_historique").length,73);
 assert.equal(data.attributions.filter(x=>x.type_provenance==="proposition_nouvelle_gouvernance").length,12);
 const wrongSha=structuredClone(data);
 wrongSha.attributions[0].source_historique=wrongSha.attributions[0].source_historique.replace(base,"e".repeat(40));
 assert.throws(()=>verifyCoverage(wrongSha,matrix,read,historic));
 const badLine=structuredClone(data);
 badLine.attributions[2].source_historique=badLine.attributions[2].source_historique.replace(/#L\d+\)/,"#L999999)");
 assert.throws(()=>verifyCoverage(badLine,matrix,read,historic));
});

test("La source d'une proposition de gouvernance ne peut être falsifiée en obligation historique",()=>{
 const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
 const root=path.resolve(__dirname,"../../..");
 const data=JSON.parse(fs.readFileSync(path.join(__dirname,"..","COUVERTURE-PROTOCOLES.json"),"utf8"));
 const matrix=fs.readFileSync(path.join(__dirname,"..","MATRICE-COUVERTURE.md"),"utf8");
 const read=p=>fs.readFileSync(path.join(root,p),"utf8");
 const old=p=>cp.execFileSync("git",["show","d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4:"+p],{cwd:root,encoding:"utf8"});
 const fake=structuredClone(data);const item=fake.attributions.find(x=>x.id==="REF-01");
 item.type_provenance="obligation_historique";
 item.source_historique="[AGENTS.md L3](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L3)";
 delete item.source_proposition;
 assert.throws(()=>verifyCoverage(fake,matrix,read,old));
 const bad=structuredClone(data);bad.attributions.find(x=>x.id==="COO-01").source_proposition=bad.attributions.find(x=>x.id==="COO-01").source_proposition.replace("7a8016955cf74f312e40fc7b82bccca84020c9eb","d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4");
 assert.throws(()=>verifyCoverage(bad,matrix,read,old));
});
