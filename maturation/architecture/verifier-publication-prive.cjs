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
assert.equal(count,require("../../adaptateurs/fichiers/depots.cjs").planification.seances().length,"Programmes conservés en mode de publication restreinte");
assert.ok(!fs.existsSync(path.join(site,"data/sante/profil.md")),"Profil Santé publié malgré l'interdiction");
assert.ok(!fs.existsSync(path.join(site,"data/coaching/orientation.json")),"Orientation du Coach publiée malgré la politique restreinte");
assert.ok(!fs.existsSync(path.join(site,"data/coaching/equipements.json")),"Matériel du Coach publié malgré la politique restreinte");
assert.equal(policy.coaching.equipementsPublics,false,"La politique restreinte doit exclure la projection de matériel");
assert.equal(policy.coaching.orientationPublique,false,"La politique restreinte doit exclure la projection du Coach");
assert.ok(!fs.existsSync(path.join(site,"fichiers/garmin")),"Des fichiers externes interdits ont été publiés");
assert.ok(!fs.existsSync(path.join(site,"personnel")),"Ancien dossier personnel publié");
const journal=read("data/sante/journal/index.json");
assert.equal(journal.total,0);
console.log("Publication restreinte conforme : aucune donnée Santé ni binaire externe, programme conservé.");
