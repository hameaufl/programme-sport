"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { allowed, changedUnexpected, preservedLegacy } = require("../verifier-integrite-metier.cjs");
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
