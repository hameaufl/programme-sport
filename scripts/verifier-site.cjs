"use strict";
// Prépublication : contrôles indépendants des services externes.
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const read = path => fs.readFileSync(path, "utf8");
const required = ["index.html", "personnel/programme.js", "favicon.svg", "icon-192.png", "icon-512.png", "manifest.webmanifest", "publication.txt"];
for (const file of required) assert.ok(fs.existsSync(file), "Fichier manquant : " + file);
const html = read("index.html");
const programme = read("personnel/programme.js");
assert.ok(!fs.existsSync("programme.js"), "Duplication interdite : programme.js à la racine");
assert.ok(html.includes('source.src="./personnel/programme.js"'), "La page doit charger la source personnelle");
assert.ok(html.includes('id="goalsList"'), "Emplacement des objectifs absent");
const version = html.match(/<meta name="mon-rythme-version" content="([^"]+)"/);
assert.ok(version, "Identifiant de version HTML absent");
assert.ok(read("publication.txt").includes(version[1]), "Témoin de publication désynchronisé");
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
assert.ok(scripts.length, "Script de la page absent");
for (const [i, m] of scripts.entries()) {
  if (m[1].trim()) new vm.Script(m[1], { filename: "index.html : script " + (i + 1) });
}
new vm.Script(programme, { filename: "personnel/programme.js" });
assert.ok(!html.includes("localStorage"), "Stockage navigateur réintroduit");
assert.ok(!/<input[^>]*type=["']checkbox["']/i.test(html), "Coche interactive non autorisée");
assert.ok(html.includes('id="reset"') && html.includes("Semaine en cours"), "Bouton de semaine absent");
assert.ok(html.includes("if(!isCompleted(s))return null;"), "Statut vide des séances non confirmées");
const sandbox = { window: {} };
vm.runInNewContext(programme, sandbox, { filename: "personnel/programme.js" });
const goals = sandbox.window.MON_RYTHME_OBJECTIFS;
assert.ok(Array.isArray(goals) && goals.every(g => typeof g === "string"), "Objectifs invalides");
const weeks = sandbox.window.MON_RYTHME_PROGRAMMES;
assert.ok(weeks && typeof weeks === "object", "Programme absent");
const ids = new Set();
let count = 0;
for (const [monday, sessions] of Object.entries(weeks)) {
  assert.match(monday, /^\d{4}-\d{2}-\d{2}$/, "Clé de semaine invalide");
  const firstDay = new Date(monday + "T12:00:00Z");
  assert.ok(!Number.isNaN(+firstDay) && firstDay.getUTCDay() === 1, "Semaine non indexée par un lundi : " + monday);
  assert.ok(Array.isArray(sessions), "Semaine non listée");
  for (const s of sessions) {
    assert.ok(s.id && !ids.has(s.id), "ID manquant ou dupliqué");
    assert.match(s.date, /^\d{4}-\d{2}-\d{2}$/, "Date invalide");
    assert.ok(typeof s.titre === "string" && s.titre.trim(), "Titre absent");
    assert.equal(typeof s.fait, "boolean", "Statut invalide");
    assert.equal(typeof s.sensations, "string", "Sensations invalides");
    const date = new Date(s.date + "T12:00:00Z");
    assert.ok(!Number.isNaN(+date), "Date incorrecte");
    const week = new Date(date);
    week.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
    assert.equal(week.toISOString().slice(0, 10), monday, "Séance classée dans une autre semaine");
    ids.add(s.id); count++;
  }
}
assert.ok(count > 0, "Aucune séance");
console.log("Validation OK :", count, "séances, JS valide, données cohérentes, publication synchronisée.");
