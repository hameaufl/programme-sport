"use strict";
// Valide la fidélité des projections web au contenu métier, sans élargir la publication.
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const dest=path.join(root,"_site");
const {collect,exposed,summary}=require("../adaptateurs/projections/lecture.cjs");
const depots=require("../adaptateurs/fichiers/depots.cjs");
const {projeterOrientation,projeterEquipements}=require("../adaptateurs/projections/coaching.cjs");
function lireJSON(relatif){
 const fichier=path.join(dest,relatif);
 assert.ok(fs.existsSync(fichier),"Projection manquante : "+relatif);
 return JSON.parse(fs.readFileSync(fichier,"utf8"));
}
const policy=JSON.parse(fs.readFileSync(path.join(root,"contrats/publication-v1.json"),"utf8"));
assert.equal(policy.default,"deny","Le miroir doit appliquer un contrat de refus par défaut");
const model=collect(depots);
const index=summary(model);
index.buildVersion=process.env.GITHUB_SHA?process.env.GITHUB_SHA.slice(0,12):"local";
const publicIndex={};
for(const cle of policy.index||[])if(Object.hasOwn(index,cle))publicIndex[cle]=index[cle];
assert.deepEqual(lireJSON("data/index.json"),publicIndex,"Résumé publié différent du modèle métier");
for(const semaine of index.semaines){
 assert.deepEqual(
  lireJSON("data/semaines/"+semaine+".json"),
  {schemaVersion:1,semaine,sessions:exposed(semaine,model,policy)},
  "Séances publiées désynchronisées : "+semaine
 );
}
if(policy.coaching?.orientationPublique===true){
 const orientation=projeterOrientation({
  orientation:depots.coaching.orientation(),
  objectifs:depots.coaching.objectifs()
 },policy);
 assert.deepEqual(lireJSON("data/coaching/orientation.json"),orientation,
  "Le cap public du Coach ne reflète pas sa source canonique");
}
if(policy.coaching?.equipementsPublics===true){
 assert.deepEqual(lireJSON("data/coaching/equipements.json"),
  projeterEquipements(depots.coaching.equipements(),policy),
  "L'inventaire public ne reflète pas le matériel confirmé");
}
const evenements=policy.sante?.evenementsPublics===true
 ?model.events.map(e=>({date:e.date,title:e.title})):[];
const indexJournal=lireJSON("data/sante/journal/index.json");
assert.equal(indexJournal.total,evenements.length,"Nombre de repères Santé désynchronisé");
const pages=[];
for(let i=0;i<evenements.length;i+=30){
 const nom="page-"+String(pages.length+1).padStart(4,"0")+".json";
 pages.push(nom);
 assert.deepEqual(lireJSON("data/sante/journal/"+nom),
  {schemaVersion:1,events:evenements.slice(i,i+30)},
  "Repères Santé différents des événements autorisés");
}
assert.deepEqual(indexJournal.pages,pages,"Index des repères Santé désynchronisé");
assert.ok(!fs.existsSync(path.join(dest,"data/sante/profil.md")),
 "Le profil clinique détaillé ne doit pas être publié");
console.log("Miroir Web cohérent : "+index.semaines.length+" semaines, "+
 evenements.length+" repères Santé et orientation du Coach vérifiés.");
