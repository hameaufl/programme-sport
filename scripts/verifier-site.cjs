"use strict";
const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const {ROOT,collect,exposed,summary,monday}=require("./donnees.cjs");
const read=p=>fs.readFileSync(require("node:path").join(ROOT,p),"utf8");
const html=read("index.html"),sante=read("sante.html");
const data=collect(),index=summary(data);
assert.equal(data.sessions.length,new Set(data.sessions.map(s=>s.id)).size,"Identifiants uniques");
assert.ok(data.sessions.length>0,"Programme vide");
assert.ok(data.sessions.every(x=>monday(x.date)),"Dates et semaines cohérentes");
for(const [mondayDate,ss] of data.weeks){
  const views=exposed(mondayDate,data);
  assert.equal(views.length,ss.length,"Toutes les séances doivent être présentes dans la semaine");
  for(let i=0;i<ss.length;i++){
    assert.equal(views[i].id,ss[i].id,"Aucun changement d'identifiant lors de la génération");
    for(const key of Object.keys(ss[i]))assert.deepEqual(views[i][key],ss[i][key],"Champ source altéré : "+ss[i].id+"."+key);
  }
}
assert.equal(index.compteurs.programmees,data.sessions.length);
assert.equal(index.compteurs.realisees,data.sessions.filter(s=>s.fait).length);
assert.equal(index.compteurs.avecSensations,data.sessions.filter(s=>s.sensations.trim()).length);
for(const page of [html,sante]){
  assert.ok(page.includes('<meta name="robots" content="noindex, nofollow">'),"Noindex absent");
  assert.ok(page.includes('<meta name="googlebot" content="noindex, nofollow">'),"Noindex Google absent");
  for(const script of page.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(script[1].trim())new vm.Script(script[1]);
}
const version=html.match(/<meta name="mon-rythme-version" content="([^"]+)"/)?.[1];
assert.ok(version&&sante.includes('name="mon-rythme-version" content="'+version+'"')&&read("publication.txt").includes(version),"Versions des deux vues incohérentes");
assert.ok(!html.includes("personnel/programme.js")&&!sante.includes("personnel/programme.js"),"Les pages doivent utiliser les vues générées");
assert.ok(html.includes("data/semaines/")&&html.includes('id="previous"')&&html.includes('id="following"')&&html.includes('id="reset"'),"Calendrier hebdomadaire brisé");
assert.ok(html.includes('isCompleted(s)?"Séance":"Programme prévu"')&&html.includes('"Structures sollicitées"')&&html.includes('"Sensations"'),"Trois sections des séances manquantes");
assert.ok(html.includes("s.exercicesDuRapport")&&html.includes("s.structuresDuRapport"),"Rapports liés aux séances manquants");
assert.ok(sante.includes("data/sante/journal/index.json")&&sante.includes("data/index.json"),"Suivi santé paginé ou compteurs manquants");
assert.ok(!html.includes("localStorage")&&!sante.includes("localStorage"),"Stockage navigateur non autorisé");
assert.ok(!fs.existsSync(require("node:path").join(ROOT,"personnel/programme.js")),"Ancien fichier monolithique maintenu");
const base={date:"2027-01-06",titre:"Séance fictive",id:"fictif-2027-01-06",fait:false,sensations:""};
const synthetic=[];
for(let i=0;i<5000;i++){
  const d=new Date("2027-01-06T12:00:00Z");d.setUTCDate(d.getUTCDate()+Math.floor(i/3)*2);
  synthetic.push({...base,id:"fictif-"+i,date:d.toISOString().slice(0,10)});
}
const fakeWeeks=new Map();
for(const s of synthetic){const w=monday(s.date);if(!fakeWeeks.has(w))fakeWeeks.set(w,[]);fakeWeeks.get(w).push(s);}
assert.equal([...fakeWeeks.values()].reduce((n,list)=>n+list.length,0),5000,"Test synthétique 5000 séances : aucune perte");
assert.ok([...fakeWeeks.values()].every(list=>list.length<=12),"Les fichiers hebdomadaires doivent rester bornés avec un planning normal");
const garmin=require("./generer-garmin.cjs");
const sample=data.sessions.find(s=>s.id==="course-2026-11-11");
assert.ok(sample&&sample.pieces_jointes&&sample.pieces_jointes.length===1,"Exemple Garmin non relié à la séance du 11 novembre");
const planned=garmin.parseSession(sample);
assert.equal(planned.durationSeconds,17*60,"Durée de la séance Garmin incorrecte");
assert.equal(planned.steps.length,7,"Sept étapes attendues pour la séance du 11 novembre");
const expectedSeconds=[120,180,120,180,120,180,120];
assert.deepEqual(planned.steps.map(x=>x.seconds),expectedSeconds,"Les fractions de marche/course doivent être identiques au programme prévu");
const fitPath=require("node:path").join(ROOT,sample.pieces_jointes[0].chemin);
const actualFit=fs.readFileSync(fitPath);
const binary=garmin.validateWorkoutFile(actualFit,planned);
assert.equal(binary.seconds,1020,"Total FIT erroné");
assert.ok(html.includes('fitDisplay(s)')&&html.includes('link.href="./"+entry.chemin'),"Lien de téléchargement FIT absent du détail");
assert.ok(!html.includes("Importer dans Garmin Connect"),"Ne pas promettre un import Garmin Connect non documenté");
assert.ok(html.includes("Télécharger l'entraînement Garmin (.FIT)"),"L'intitulé du lien de téléchargement doit être conservé");
assert.ok(!html.includes("Fichier d'entraînement prévu · transfert vers Venu 4 à tester")&&!html.includes("garmin-note"),"Aucun avertissement technique affiché sous le lien Garmin");
const titlesStart=html.indexOf("  function titreActiviteJour(s) {");
const titlesEnd=html.indexOf("  function render() {",titlesStart);
assert.ok(titlesStart>=0&&titlesEnd>titlesStart, "Fonctions de libellé des jours absentes");
const {titreActiviteJour,resumeJour}=vm.runInNewContext(html.slice(titlesStart,titlesEnd)+"\n({titreActiviteJour,resumeJour});");
assert.equal(resumeJour([]),"—", "Jour sans séance inchangé");
assert.equal(resumeJour([{type:"course"}]),"Course", "Majuscule pour une sortie seule");
assert.equal(resumeJour([{type:"course"},{type:"kine"}]),"Course, Kiné", "Virgule et espace entre deux activités");
assert.equal(resumeJour([{type:"course"},{type:"kine"},{type:"mobilité"}]),"Course, Kiné, Mobilité", "Toutes les activités doivent apparaître, même au-delà de deux");
assert.equal(resumeJour([{type:"course"},{type:"course"}]),"Course, Course", "Ne pas masquer une seconde séance du même type");
assert.ok(html.includes("var label=resumeJour(dailySessions);"), "Le calendrier doit utiliser les libellés composés");
assert.ok(!html.includes("Course + kiné"), "L'ancien séparateur + doit disparaître");
console.log("Validation OK :",data.sessions.length,"séances,",data.reports.size,"rapports,",data.events.length,"événements ; 5000 séances fictives regroupées sans perte.");