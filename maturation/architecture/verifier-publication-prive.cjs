"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"../.."),site=path.join(root,"_site"),read=p=>JSON.parse(fs.readFileSync(path.join(site,p),"utf8"));
const policy=require("../../contrats/publication-prive-v1.json");
assert.equal(policy.default,"deny");
const index=read("data/index.json");
assert.ok(Array.isArray(index.semaines));
for(const key of Object.keys(index))assert.ok(policy.index.includes(key),"Champ d'index non autorisé : "+key);
let count=0;
for(const w of index.semaines){
 const data=read("data/semaines/"+w+".json");
 for(const s of data.sessions){
  for(const k of Object.keys(s))assert.ok(policy.programme.includes(k),"Champ de séance privé publié : "+k);
  count++;
 }
}
assert.equal(count,36,"Programmes conservés en mode de publication restreinte");
assert.ok(!fs.existsSync(path.join(site,"data/sante/profil.md")),"Profil Santé publié malgré l'interdiction");
assert.ok(!fs.existsSync(path.join(site,"fichiers/garmin")),"Fichiers FIT publiés malgré l'interdiction");
assert.ok(!fs.existsSync(path.join(site,"personnel")),"Ancien dossier personnel publié");
const journal=read("data/sante/journal/index.json");
assert.equal(journal.total,0);
console.log("Publication restreinte conforme : aucune santé, aucun FIT, programme conservé.");
