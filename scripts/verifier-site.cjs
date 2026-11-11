"use strict";
// Prépublication : contrôles indépendants des services externes.
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const read = path => fs.readFileSync(path, "utf8");
const required = ["sante.html", "personnel/sante/PROFIL.md", "personnel/sante/SUIVI.md", "index.html", "personnel/programme.js", "favicon.svg", "icon-192.png", "icon-512.png", "manifest.webmanifest", "publication.txt"];
for (const file of required) assert.ok(fs.existsSync(file), "Fichier manquant : " + file);
const html = read("index.html");
assert.ok(html.includes('<meta name="robots" content="noindex, nofollow">'), "La page doit interdire son indexation");
assert.ok(html.includes('<meta name="googlebot" content="noindex, nofollow">'), "Le refus explicite de Googlebot est requis");
const healthHtml = read("sante.html");
assert.ok(html.includes('href="./sante.html"'), "Le lien vers la page santé manque");
assert.ok(healthHtml.includes('href="./"'), "Lien de retour du suivi santé manquant");
assert.ok(healthHtml.includes('<meta name="robots" content="noindex, nofollow">'), "La page santé doit interdire son indexation");
assert.ok(healthHtml.includes('<meta name="googlebot" content="noindex, nofollow">'), "La page santé doit refuser son indexation par Googlebot");
assert.ok(healthHtml.includes('src="./personnel/programme.js?actualisation="'), "La page santé doit lire la source unique");
assert.ok(healthHtml.includes('./personnel/sante/PROFIL.md') && healthHtml.includes('./personnel/sante/SUIVI.md'), "Sources santé manquantes");
assert.ok(!healthHtml.includes("localStorage"), "Aucune donnée personnelle en stockage navigateur");
const healthScripts = [...healthHtml.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
assert.ok(healthScripts.length, "Script de la page santé manquant");
for (const [i, m] of healthScripts.entries()) {
  if (m[1].trim()) new vm.Script(m[1], {filename:"sante.html : script "+(i+1)});
}
assert.ok(html.includes('class="health-preview"') && html.includes('<h2 id="headingHealth">Mon suivi santé</h2>') && html.includes('class="health-cta" href="./sante.html"'), "Accès compact et direct à la page santé absent");
assert.ok(!html.includes("Un espace pour retrouver les bilans et les repères de ma reprise sportive."), "Sous-titre superflu du lien santé");
assert.ok(healthHtml.includes('<h1>Mon suivi santé.</h1>') && !healthHtml.includes("Mes repères, mes bilans et les retours de mes séances"), "Le titre santé ne doit pas avoir de sous-texte");
assert.ok(!healthHtml.includes("Mes séances suivies") && !healthHtml.includes("activityEntries") && !healthHtml.includes("activityTitle"), "La section des séances suivies doit être complètement supprimée");
assert.ok(healthHtml.includes('id="healthFollow"') && healthHtml.includes('id="healthProfile"'), "Le journal et le profil santé doivent rester disponibles");
const suiviSource = read("personnel/sante/SUIVI.md");
assert.ok(suiviSource.includes("### 2026-11-09 — Nouvelles semelles orthopédiques"), "Événement des semelles manquant");
assert.ok(suiviSource.includes("### 2026-11-02 — Chaussures de running"), "Achat des chaussures manquant");
const programme = read("personnel/programme.js");
assert.ok(!fs.existsSync("programme.js"), "Duplication interdite : programme.js à la racine");
assert.ok(html.includes('source.src="./personnel/programme.js"'), "La page doit charger la source personnelle");
assert.ok(html.includes('id="goalsList"'), "Emplacement des objectifs absent");
const version = html.match(/<meta name="mon-rythme-version" content="([^"]+)"/);
assert.ok(version, "Identifiant de version HTML absent");
assert.ok(read("publication.txt").includes(version[1]), "Témoin de publication désynchronisé");
assert.ok(healthHtml.includes('name="mon-rythme-version" content="'+version[1]+'"'), "Versions des deux pages non synchronisées");
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
const weeklyList = html.slice(html.indexOf('var all=document.getElementById("allContent")'), html.indexOf('function refreshToday()'));
assert.ok(weeklyList.includes('var done=completionDisplay(s);'), "La liste hebdomadaire doit montrer seulement le statut Fait");
assert.ok(!weeklyList.includes("sensationsDisplay(s)") && !weeklyList.includes("metadata(s)"), "La liste hebdomadaire doit rester synthétique sans sensations ni métadonnées");
assert.ok(html.includes('box.appendChild(note);') && html.includes('head.appendChild(done);'), "Le détail doit placer Fait au titre et les sensations sous les étapes");
const dayStart = html.indexOf("var dayContent=document.getElementById");
const weeklyStart = html.indexOf('var all=document.getElementById("allContent")');
const dailyRender = html.slice(dayStart,weeklyStart);
assert.ok(dailyRender.includes("box.appendChild(derouleDisplay(s));"), "Déroulé de la séance absent du détail quotidien");
assert.ok(dailyRender.indexOf("derouleDisplay(s)") < dailyRender.indexOf("sensationsDisplay(s)"), "Le déroulé doit précéder les sensations");
assert.ok(dailyRender.includes("var structures=structuresDisplay(s);"), "Bloc Structures sollicitées manquant du détail");
assert.ok(dailyRender.indexOf("derouleDisplay(s)") < dailyRender.indexOf("structuresDisplay(s)") && dailyRender.indexOf("structuresDisplay(s)") < dailyRender.indexOf("sensationsDisplay(s)"), "Les sections doivent suivre l'ordre Séance, Structures, Sensations");
assert.ok(html.includes('box.appendChild(elem("h4","","Structures sollicitées"));'), "Titre de la rubrique anatomique absent");
assert.ok(html.includes("structuresJournal[s.id]") && html.includes("s.structuresSollicitees"), "Sources Coach des structures non lues");
assert.ok(html.includes("var structures=raw.match(") && html.includes("if(structures)entry.structures=structures[1];") && html.includes("À préciser par le Coach."), "Journal des structures ou état vide non pris en charge");
assert.ok(html.includes('isCompleted(s)?"Séance":"Programme prévu"'), "Pour une séance réalisée, le titre doit être Séance ; conserver Programme prévu sinon");
assert.ok(html.includes("s.exercicesRealises") && html.includes("realisesJournal[s.id]"), "Lecture des exercices réalisés absente");
assert.ok(html.includes("analyserJournalRealise(markdown)") && html.includes('./personnel/sante/SUIVI.md?actualisation='), "Source réelle du journal santé non lue");
assert.ok(!html.includes('Sensations :'), "La section sensations ne doit pas retrouver un affichage en colonnes");
const journalSource = read("personnel/sante/SUIVI.md");
assert.ok(journalSource.includes("kine-2026-11-04") && journalSource.includes("**Réalisé :**"), "Le journal réel de kiné doit rester disponible pour le détail");
assert.ok(html.includes('box.appendChild(elem("h4","","Sensations"));') && html.includes('box.appendChild(elem("p","note",s.sensations.trim()));'), "Les sensations doivent avoir un titre et un paragraphe distincts");
assert.ok(!html.includes('Sensations :'), "La présentation en colonnes Sensations : doit avoir disparu");
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
    if (Object.hasOwn(s, "structuresSollicitees")) {
      assert.ok(Array.isArray(s.structuresSollicitees) && s.structuresSollicitees.every(x => typeof x === "string" && x.trim()), "Liste anatomique invalide");
      assert.equal(s.fait, true, "Des structures réalisées exigent une séance confirmée");
    }
    if (Object.hasOwn(s, "exercicesRealises")) {
      assert.ok(Array.isArray(s.exercicesRealises) && s.exercicesRealises.every(x => typeof x === "string" && x.trim()), "Liste des exercices réalisés invalide");
      assert.equal(s.fait, true, "Des exercices réalisés exigent une séance confirmée");
    }
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
