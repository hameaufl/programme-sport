"use strict";
// Verrou de non-perte pour la BRANCHE EXPERIMENTALE, sans écriture métier.
// On compare à la fois au premier main et au dernier main distant.
// GitHub Actions : checkout avec fetch-depth: 0, uniquement les outils git/node intégrés.
const cp = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");
const ROOT = path.resolve(__dirname, "../..");
const BASE = "d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const ALLOWED_WORKFLOW = ".github/workflows/verifier-gouvernance.yml";
const HISTORICAL_PREFIX = "## RÈGLE MÉTIER ABSOLUE — Nommage Garmin";

function allowed(file) {
  return file === "AGENTS.md" ||
    file === ALLOWED_WORKFLOW ||
    (file.startsWith("maturation/gouvernance/") &&
      !file.includes("/../") && !file.includes("//") && !file.endsWith("/"));
}
function changedUnexpected(files) { return files.filter((file) => !allowed(file)); }
function preservedLegacy(oldText, newText) {
  if (!oldText.startsWith("# AGENTS.md") || !oldText.includes(HISTORICAL_PREFIX)) return false;
  const headingEnd = oldText.indexOf("\n") + 1;
  return newText.startsWith(oldText.slice(0, headingEnd)) &&
    newText.endsWith(oldText.slice(headingEnd)) &&
    newText.includes("EXPÉRIMENTATION MULTI-AGENTS");
}
function git(args) {
  return cp.execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }).trimEnd();
}
function changed(from, to) {
  const z = cp.execFileSync("git", ["diff", "--name-only", "-z", "--no-renames", from, to], { cwd: ROOT });
  return z.toString("utf8").split("\0").filter(Boolean);
}
function ancestor(older, newer) {
  const x = cp.spawnSync("git", ["merge-base", "--is-ancestor", older, newer], { cwd: ROOT });
  return x.status === 0;
}
function verifiedMain() {
  // En CI, « origin/main » est le main distant réel, pas le SHA d'une PR.
  try { return git(["rev-parse", "--verify", "refs/remotes/origin/main"]); }
  catch { throw Error("Référence origin/main introuvable. Faire git fetch origin main avant de vérifier."); }
}
function verifySnapshot() {
  const snapshot = JSON.parse(fs.readFileSync(path.join(__dirname, "references", "inventaire-base.json"), "utf8"));
  if (snapshot.schemaVersion !== 1 || snapshot.commitReference !== BASE ||
      snapshot.nombreFichiers !== 143 || snapshot.gitTreeSha !== git(["rev-parse", BASE + "^{tree}"])) {
    throw Error("Inventaire initial invalide ou différent du commit Git de référence.");
  }
  const entries = cp.execFileSync("git", ["ls-tree", "-r", "-z", BASE], { cwd: ROOT })
    .toString("utf8").split("\0").filter(Boolean);
  const actual = new Map();
  for (const row of entries) {
    const m = /^\d+ blob ([a-f0-9]{40})\t(.+)$/.exec(row);
    if (!m) throw Error("Objet inattendu dans la référence : " + row.slice(0, 100));
    actual.set(m[2], m[1]);
  }
  const declared = new Map(snapshot.fichiers.map((x) => [x.chemin, x.gitBlobSha]));
  if (actual.size !== snapshot.nombreFichiers || declared.size !== snapshot.nombreFichiers) {
    throw Error("Fichiers historiques absents ou inventaire en doublon.");
  }
  for (const [file, sha] of actual) {
    if (declared.get(file) !== sha) throw Error("Empreinte historique incohérente : " + file);
  }
  return actual.size;
}

function execute() {
  const nbFichiersInitiaux = verifySnapshot();
  const head = git(["rev-parse", "HEAD"]), main = verifiedMain();
  if (!ancestor(BASE, head) || !ancestor(BASE, main)) {
    throw Error("Référence initiale absente de l'ascendance de HEAD ou de main : contrôle impossible.");
  }
  const extraVsMain = changedUnexpected(changed(main, head));
  if (extraVsMain.length) {
    throw Error("Dérive métier/infrastructure par rapport au dernier main : " + extraVsMain.join("; ") +
      ". Resynchroniser la branche puis revérifier ; aucun fichier hors gouvernance n'est autorisé.");
  }
  // Comparaison cumulative au SHA initial : une évolution légitime de main ne peut être
  // acceptée que si les octets de la branche sont désormais identiques au dernier main.
  const baselineChanges = changed(BASE, head);
  const mainChanges = new Set(changed(BASE, main));
  const unexpectedBaseline = baselineChanges.filter((f) => !allowed(f) && !mainChanges.has(f));
  if (unexpectedBaseline.length) {
    throw Error("Dérive non héritée du main courant depuis la référence initiale : " + unexpectedBaseline.join("; "));
  }
  const orig = git(["show", BASE + ":AGENTS.md"]) + "\n";
  const current = fs.readFileSync(path.join(ROOT, "AGENTS.md"), "utf8");
  const onMain = git(["show", main + ":AGENTS.md"]) + "\n";
  if (!preservedLegacy(orig, current) || !preservedLegacy(onMain, current)) {
    throw Error("AGENTS.md historique modifié, tronqué, déplacé ou remplacé ; seule l'insertion expérimentale est admise.");
  }
  const paths = git(["ls-tree", "-r", "--name-only", BASE]).split("\n").filter(Boolean);
  const groups = [
    ["domaines/", "domaines et archives"],
    ["adaptateurs/", "adaptateurs"],
    ["addons/", "interfaces et médias"],
    ["contrats/", "contrats"],
    ["docs/", "documentation historique"],
    ["maturation/architecture/", "architecture historique"],
    [".github/", "workflows historiques"],
    ["scripts/", "scripts historiques"]
  ];
  console.log("NON-PERTE : " + nbFichiersInitiaux + " empreintes Git inventoriées et retrouvées à l’identique.");
  console.log("NON-PERTE : BASE " + BASE + " ; main " + main.slice(0, 12) + " ; HEAD " + head.slice(0, 12));
  for (const [p, label] of groups) {
    const n = paths.filter((f) => f.startsWith(p)).length;
    console.log("  " + label + " : " + n + " fichiers historiques recensés au SHA de base");
  }
  console.log("  diff cumulatif BASE→HEAD : " + baselineChanges.length +
    " chemins ; diff main→HEAD : " + changed(main, head).length + " chemins (gouvernance exclusivement).");
  console.log("NON-PERTE : OK (octets des autres fichiers identiques au main actuel, consignes historiques AGENTS intactes).");
}
module.exports = { allowed, changedUnexpected, preservedLegacy, BASE };
if (require.main === module) {
  try { execute(); }
  catch (e) { console.error("NON-PERTE : REFUSÉ — " + e.message); process.exitCode = 1; }
}
