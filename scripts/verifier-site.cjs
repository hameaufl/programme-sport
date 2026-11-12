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
assert.equal(resumeJour([{type:"course"}]),"Course à pied", "Titre du calendrier pour une course");
assert.equal(resumeJour([{type:"course"},{type:"kine"}]),"Course à pied, Kiné", "Virgule et espace entre deux activités");
assert.equal(resumeJour([{type:"course"},{type:"kine"},{type:"mobilité"}]),"Course à pied, Kiné, Mobilité", "Toutes les activités doivent apparaître, même au-delà de deux");
assert.equal(resumeJour([{type:"course"},{type:"course"}]),"Course à pied, Course à pied", "Ne pas masquer une seconde séance du même type");
assert.equal(resumeJour([{id:"course-2026-11-13",titre:"Course à pied · 2M+3C"}]),"Course à pied", "Course identifiée sans type explicite");
assert.equal(resumeJour([{id:"kine-2026-11-18"}]),"Kiné", "Kiné sans type explicite");
assert.equal(resumeJour([{type:"renfo",titre:"Renfo"}]),"Renfo", "Renfo visible dans le calendrier");
assert.ok(html.includes("var label=resumeJour(dailySessions);"), "Le calendrier doit utiliser les libellés composés");
assert.ok(!html.includes("Course + kiné"), "L'ancien séparateur + doit disparaître");
const renfo=data.sessions.filter(x=>x.type==="renfo");
for(const s of renfo){
  assert.ok(/^renfo-\d{4}-\d{2}-\d{2}$/.test(s.id),"Identifiant renfo incorrect");
  assert.equal(s.titre,"Renfo");
  assert.equal(s.etapes.length,5,"Renfo : mise en route + 3 exercices + retour au calme");
  assert.ok(Array.isArray(s.aidesExercices)&&s.aidesExercices.length===3,"Trois aides PNG par Renfo requises");
  assert.match(s.etapes[0],/^Mise en route · 4 min/,"Mise en route manquante");
  assert.match(s.etapes[4],/^Retour au calme · 4 min/,"Retour au calme manquant");
  assert.ok(s.etapes.every(e=>e.includes(" · ")&&/\d+\s*(?:min|s)/.test(e)),"Chaque bullet doit comporter un chrono");
  for(const exercise of s.etapes.slice(1,-1)){
    const match=s.aidesExercices.find(a=>a.exercice===exercise);
    assert.ok(match&&/^assets\/renfo\/png\/[a-z0-9-]+\.png$/.test(match.png),"Lien PNG manquant : "+exercise);
    const file=require("node:path").join(ROOT,match.png);
    const bytes=fs.readFileSync(file);
    assert.equal(bytes.subarray(0,8).toString("hex"),"89504e470d0a1a0a","Image PNG invalide : "+match.png);
  }
}
assert.ok(html.includes('var aid=aids.find')&&html.includes('showExerciseHelp(aid.png,item)')&&html.includes('id="exerciseDialog"'),"Fenêtre d'aide PNG cliquable absente");
const buildScript=read("scripts/construire-site.cjs");
assert.ok(buildScript.includes('path.join(dest,"assets/renfo/png")'),"PNG absents de l'artefact");

const strengthSessions=data.sessions.filter(s=>s.type==="renfo");
for(const s of strengthSessions){
  assert.ok(s.pieces_jointes&&s.pieces_jointes.length===1,"FIT Renfo manquant : "+s.id);
  const attached=s.pieces_jointes[0];
  assert.equal(attached.role,"entrainement_prevu");
  assert.equal(attached.format,"fit");
  assert.equal(attached.chemin,"personnel/pieces-jointes/seances/"+s.id+"/prevu/"+s.id+".fit");
  const plan=garmin.parseSession(s);
  assert.equal(plan.sport,5,"Renfo doit utiliser le sport musculation");
  assert.equal(plan.steps.length,17,"17 étapes FIT par séance de renfo");
  assert.equal(plan.steps.filter(x=>x.durationType===5).length,9,"9 séries ouvertes à valider manuellement");
  assert.equal(plan.timedSeconds,780,"Temps explicites échauffement/repos/retour 13 min");
  assert.equal(plan.durationSeconds,null,"Ne pas inventer de chronomètre total pour les répétitions à durée variable");
  const fit=fs.readFileSync(require("node:path").join(ROOT,attached.chemin));
  console.log("Diagnostic Renfo FIT",s.id,"fichier",fit.length,"dataSize",fit.readUInt32LE(4),"header",fit.subarray(0,16).toString("hex"));
  const checked=garmin.validateWorkoutFile(fit,plan);
  assert.equal(checked.steps,17);
  assert.equal(checked.sport,"strength_training");
  assert.equal(checked.timedSeconds,780);
}
const invalidRenfo=JSON.parse(JSON.stringify(strengthSessions[0]));
invalidRenfo.etapes[1]="Exercice inconnu · 3 × 10 ; repos 60 s entre séries";
assert.throws(()=>garmin.parseSession(invalidRenfo),/non reconnu/);
assert.equal(renfo.length,14,"Deux renfos la semaine du 9 et trois les autres semaines");
assert.ok(renfo.some(s=>s.id==="renfo-2026-11-16"),"Renfo du lundi 16 manquant");
assert.ok(!renfo.some(s=>s.id==="renfo-2026-11-15"||s.id==="renfo-2026-11-17"),"Anciennes dates de Renfo toujours présentes");
const renfoParSemaine=new Map();
for(const session of renfo){
  const week=monday(session.date);
  renfoParSemaine.set(week,(renfoParSemaine.get(week)||0)+1);
}
assert.equal(renfoParSemaine.get("2026-11-09"),2,"Dimanche 15 novembre réservé au repos");
for(const week of ["2026-11-16","2026-11-23","2026-11-30","2026-12-07"])
  assert.equal(renfoParSemaine.get(week),3,"Trois Renfos requis semaine "+week);
assert.ok(html.includes('s.type!=="renfo"'),"Renfo : ne pas afficher de paragraphes supplémentaires");
for(const s of renfo)assert.equal(s.duree,"30–36 min","Durée Renfo non triplée");
const banque=JSON.parse(read("assets/renfo/banque.json"));
assert.equal(banque.exercices.length,5,"Banque PNG incomplète");
const known=new Set(banque.exercices.map(e=>e.png));
for(const s of renfo)for(const help of s.aidesExercices)assert.ok(known.has(help.png),"Aide non référencée dans la banque : "+help.png);
console.log("Validation OK :",data.sessions.length,"séances,",data.reports.size,"rapports,",data.events.length,"événements ; 5000 séances fictives regroupées sans perte.");