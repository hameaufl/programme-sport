"use strict";
// Vérification déterministe de la TRAÇABILITÉ FORMELLE (et non de la vérité sémantique).
const fs = require("node:fs");
const path = require("node:path");
const ROOT = path.resolve(__dirname, "../..");
const cp = require("node:child_process");
const BASE = "d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const HERE = __dirname;
function historic(rel) {
 return cp.execFileSync("git", ["show", BASE + ":" + rel], { cwd: ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
}
const roles = {
  MAT: "MATURATION", SUI: "ANALYSTE", STR: "STRATEGE", PLA: "PLANIFICATEUR",
  GAR: "GARMIN", COO: "COACH", REF: "GARDIEN", QUA: "CONTROLEUR-QUALITE"
};
const expected = { MAT: 21, SUI: 16, STR: 6, PLA: 10, GAR: 13, COO: 6, REF: 7, QUA: 6 };
function requireTrue(value, msg) { if (!value) throw Error(msg); }
function read(rel) { return fs.readFileSync(path.join(ROOT, rel), "utf8"); }
function duplicates(values) {
  const s = new Set(); return values.filter((v) => s.has(v) || !s.add(v));
}
function verifyCoverage(data, matrixText, readFn, sourceAtBase = readFn) {
  requireTrue(data.schemaVersion === 1, "Version du référentiel de couverture invalide");
  requireTrue(data.totalExigences === 85 && data.attributions?.length === 85, "Couverture : exactement 85 exigences attendues");
  requireTrue(data.statut === "proposition_de_couverture_non_validee_par_le_gardien",
    "Couverture présentée comme validée sans mise à niveau contrôlée du processus");
  const ids = data.attributions.map((x) => x.id);
  requireTrue(duplicates(ids).length === 0, "IDs d'exigences dupliqués");
  const matrix = matrixText.split(/\r?\n/).map((l) => /^\| ((?:MAT|SUI|STR|PLA|GAR|COO|REF|QUA)-\d{2}) \|/.exec(l))
    .filter(Boolean).map((m) => m[1]);
  requireTrue(matrix.length === 85 && new Set(matrix).size === 85, "Matrice : 85 IDs uniques requis");
  requireTrue(ids.slice().sort().join(",") === matrix.slice().sort().join(","), "Matrice et attributions divergent");
  for (const [key, count] of Object.entries(expected)) {
    const belonging = data.attributions.filter((x) => x.id.startsWith(key + "-"));
    requireTrue(belonging.length === count, "Répartition de " + key + " : " + count + " attendu(s)");
    const p = "maturation/gouvernance/agents/" + roles[key] + ".md";
    const role = readFn(p);
    requireTrue(role.includes("BROUILLON DE GOUVERNANCE") && role.includes(key + "-01"),
      "Fiche absente, non déclarée brouillon ou non traçable : " + p);
    for (const row of belonging) {
      requireTrue(new RegExp("^" + key + "-\\d{2}$").test(row.id), "ID mal formé : " + row.id);
      requireTrue(row.fichier_protocole === p, "Mauvais propriétaire du protocole : " + row.id);
      requireTrue(row.statut_nouvelle_attribution === "proposee_non_validee", "Approbation non documentée : " + row.id);
      requireTrue(typeof row.exigence === "string" && row.exigence.length > 20 &&
        typeof row.controle_attendu === "string" && row.controle_attendu.length > 10,
        "Livrable/contrôle absent : " + row.id);
      const link = /^\[([^\]]+) L(\d+)\]\(https:\/\/github\.com\/hameaufl\/programme-sport\/blob\/([a-f0-9]{40})\/([^#)]+)#L(\d+)\)$/.exec(row.source_historique || "");
      requireTrue(link && link[2] === link[5] && link[1] === link[4] && link[3] === BASE,
        "Lien historique non épinglé au SHA initial : " + row.id);
      const source = link[4], line = Number(link[2]);
      requireTrue(!source.includes("..") && !path.isAbsolute(source) && line > 0, "Chemin source invalide : " + row.id);
      requireTrue(sourceAtBase(source).split(/\r?\n/).length >= line, "Source historique absente ou ligne hors limites : " + row.id);
    }
  }
  return ids.length;
}
function verifyRegister(text) {
  const lines = text.split(/\r?\n/).filter((l) => /^\| INC-\d{3} \|/.test(l));
  const ids = lines.map((l) => l.split("|")[1].trim());
  requireTrue(ids.length === 8 && new Set(ids).size === 8, "8 incohérences uniques attendues");
  for (let i = 1; i <= 8; i++) {
    requireTrue(ids.includes("INC-" + String(i).padStart(3, "0")), "INC manquante : " + i);
  }
  requireTrue(text.includes("État des huit entrées : ouvert"), "Registre clos sans revue explicite");
  return ids.length;
}
function execute() {
  const data = JSON.parse(read("maturation/gouvernance/COUVERTURE-PROTOCOLES.json"));
  const n = verifyCoverage(data, read("maturation/gouvernance/MATRICE-COUVERTURE.md"), read, historic);
  const inco = verifyRegister(read("maturation/gouvernance/referentiel/INCOHERENCES.md"));
  const audit = read("maturation/gouvernance/referentiel/REVUE-LOGIQUE-GARDIEN-2026-11-13.md");
  const dossier = read("maturation/gouvernance/REVUE-GARDIEN-A-VALIDER.md");
  requireTrue(audit.includes("BLOQUÉ POUR ACTIVATION") && audit.includes("Visa indépendant :** **NON"),
    "Le verdict logique du Gardien doit rester explicitement bloquant et non indépendant");
  requireTrue(dossier.includes("EN ATTENTE — NI VALIDÉ NI REFUSÉ") && dossier.includes("NON ACQUIS"),
    "Aucune validation formelle ni autorisation de fusion n'a été documentée");
  requireTrue(read("maturation/gouvernance/CHARTE.md").includes("Statut :** proposition"),
    "Charte présentée comme active sans approbation");
  console.log("REFERENTIEL : OK — " + n + " exigences attribuées à 8 protocoles, " +
    inco + " incohérences tracées et ouvertes, visa Gardien non acquis.");
  console.log("IMPORTANT : contrôle de forme/liaisons uniquement, aucune certification sémantique ou comportementale.");
}
module.exports = { duplicates, verifyCoverage, verifyRegister };
if (require.main === module) {
  try { execute(); }
  catch (e) { console.error("REFERENTIEL : REFUSÉ — " + e.message); process.exitCode = 1; }
}
