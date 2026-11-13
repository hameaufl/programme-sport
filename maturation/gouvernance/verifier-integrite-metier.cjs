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
const INITIAL_PROTOTYPE = "7a8016955cf74f312e40fc7b82bccca84020c9eb";
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
function gitBlobMap(ref) {
  const entries = cp.execFileSync("git", ["ls-tree", "-r", "-z", ref], {cwd:ROOT})
    .toString("utf8").split("\0").filter(Boolean);
  const blobs = new Map();
  for (const item of entries) {
    const m = /^\d+ blob ([a-f0-9]{40})\t(.+)$/.exec(item);
    if (!m) throw Error("Objet Git non pris en charge dans " + ref + " : " + item.slice(0,80));
    blobs.set(m[2], m[1]);
  }
  return blobs;
}
// Testable sans accès Git : HEAD ne peut introduire aucun contenu hors
// gouvernance différent à la fois de la base figée et du main réel.
function verifyThreeWay(base, main, head) {
  const paths = new Set([...base.keys(), ...main.keys(), ...head.keys()]);
  const unauthorized = [], mainOnly = [];
  for (const file of paths) {
    if (allowed(file)) continue;
    const old = base.get(file), latest = main.get(file), local = head.get(file);
    if (local === old || local === latest) {
      if (local === old && latest !== old) mainOnly.push(file);
    } else unauthorized.push(file);
  }
  return {unauthorized,mainOnly};
}
function prototypeUnchanged(current, firstVersion) { return current === firstVersion; }
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
  // Le main peut avancer indépendamment du chantier : PR #10 a modifié
  // deux fichiers documentaires V2, alors que cette branche garde le SHA initial.
  // Une différence main→HEAD n'est pas une écriture sur cette branche si
  // les octets de HEAD sont strictement ceux de BASE. En revanche, un troisième
  // contenu non approuvé (ni BASE ni main) doit toujours être refusé.
  const baselineChanges = changed(BASE, head);
  const mainChanges = changed(BASE, main);
  const mainAgainstHead = changed(main, head);
  const drift = verifyThreeWay(gitBlobMap(BASE), gitBlobMap(main), gitBlobMap(head));
  if (drift.unauthorized.length) {
    throw Error("Dérive non autorisée (ni BASE ni main) : " + drift.unauthorized.join("; "));
  }
  if (!ancestor(INITIAL_PROTOTYPE, head)) throw Error("Le premier commit expérimental n’est pas un ancêtre de HEAD.");
  const firstVersion = cp.execFileSync("git", ["show", INITIAL_PROTOTYPE + ":AGENTS.md"], { cwd: ROOT, encoding: "utf8" });
  const orig = git(["show", BASE + ":AGENTS.md"]) + "\n";
  const current = fs.readFileSync(path.join(ROOT, "AGENTS.md"), "utf8");
  const onMain = git(["show", main + ":AGENTS.md"]) + "\n";
  if (!prototypeUnchanged(current, firstVersion)) throw Error("Instructions expérimentales AGENTS.md modifiées sans validation explicite : verrou de prototype.");
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
    " chemins ; diff BASE→main : " + mainChanges.length +
    " chemins ; diff main→HEAD : " + mainAgainstHead.length + " chemins.");
  console.log("  Évolutions propres au main absentes de cette branche (sans écriture locale) : " +
    drift.mainOnly.join(", "));
  console.log("NON-PERTE : OK (aucun octet non autorisé créé par la branche ; consignes AGENTS conservées).");
}
module.exports = { allowed, changedUnexpected, verifyThreeWay, preservedLegacy, prototypeUnchanged, BASE, INITIAL_PROTOTYPE };
if (require.main === module) {
  try { execute(); }
  catch (e) { console.error("NON-PERTE : REFUSÉ — " + e.message); process.exitCode = 1; }
}
