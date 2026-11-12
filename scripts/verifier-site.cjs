"use strict";
const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const {ROOT,collect,exposed,summary,monday}=require("./donnees.cjs");
const read=p=>fs.readFileSync(require("node:path").join(ROOT,p),"utf8");
const html=read("addons/web/pages/index.html"),sante=read("addons/web/pages/sante.html");
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
assert.ok(html.includes('<div class="section-top"><h2 id="headingAll">Séances de la semaine</h2></div>'),"La liste des séances doit conserver son titre");
assert.ok(!html.includes("Course et kiné programmées pour la semaine sélectionnée."),"Ne pas afficher de résumé statique au-dessus de la liste hebdomadaire");
assert.ok(!fs.existsSync(require("node:path").join(ROOT,"personnel/programme.js")),"Ancien fichier monolithique maintenu");
assert.ok(!fs.existsSync(require("node:path").join(ROOT,"personnel/seances")),"Anciennes séances mélangées toujours présentes");
const allowed=new Set(JSON.parse(read("contrats/publication-v1.json")).programme);
for(const [week,sessions] of data.weeks)for(const s of exposed(week,data)){
  for(const key of Object.keys(s))assert.ok(allowed.has(key),"Donnée non autorisée dans la projection Web : "+key);
  assert.ok(!Object.hasOwn(s,"blocs"),"Prescription technique divulguée par le Web");
}
for(const plan of data.plans.values())for(const k of ["fait","sensations","pieces_jointes","aidesExercices","exercicesRealises","structuresSollicitees"])
  assert.ok(!Object.hasOwn(plan,k),"Frontière métier violée dans une prescription : "+k);
for(const f of ["domaines/planification/modele.cjs","domaines/activites/modele.cjs","domaines/sante/modele.cjs","domaines/coaching/modele.cjs"])
  assert.ok(!/node:fs|addons\/|adaptateurs\//.test(read(f)),"Domaine dépendant d’un adaptateur : "+f);
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
const fitPath=require("node:path").join(ROOT,"adaptateurs/garmin/fichiers",sample.id+".fit");
const actualFit=fs.readFileSync(fitPath);
const binary=garmin.validateWorkoutFile(actualFit,planned);
assert.equal(binary.seconds,1020,"Total FIT erroné");
assert.ok(html.includes('fitDisplay(s)')&&html.includes('link.href="./"+entry.url'),"Lien de téléchargement FIT absent du détail");
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
  assert.equal(s.etapes.length,s.blocs.length,"Les étapes visibles doivent refléter les blocs structurés");
  assert.ok(Array.isArray(s.aidesExercices)&&s.aidesExercices.length===s.blocs.filter(b=>b.nature==="exercice").length,"Une aide PNG par exercice réel");
  assert.match(s.etapes[0],/^Mise en route · 4 min/,"Mise en route manquante");
  assert.match(s.etapes.at(-1),/^Étirements doux · 3 min : /,"Étirements doux chronométrés manquants");
  assert.ok(!s.etapes.some(e=>/^Retour au calme\b/i.test(e)),"Pas de retour au calme redondant si étirements");
  assert.ok(s.etapes.every(e=>e.includes(" · ")&&/\d+\s*(?:min|s)/.test(e)),"Chaque bullet doit comporter un chrono");
  for(const exercise of s.etapes.slice(1,-1)){
    const match=s.aidesExercices.find(a=>a.exercice===exercise);
    assert.ok(match&&/^assets\/renfo\/png\/[a-z0-9-]+\.png$/.test(match.png),"Lien PNG manquant : "+exercise);
    const file=require("node:path").join(ROOT,"addons/web/public",match.png);
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
  assert.equal(attached.url,"fichiers/garmin/"+s.id+".fit");
  const plan=garmin.parseSession(s);
  assert.equal(plan.sport,5,"Renfo doit utiliser le sport musculation");
  assert.equal(plan.steps.length,2+s.blocs.filter(b=>b.nature==="exercice").reduce((n,b)=>n+2*b.series-1,0),"FIT et blocs structurés incohérents");
  assert.equal(plan.steps.filter(x=>x.durationType===5).length,s.blocs.filter(b=>b.nature==="exercice").reduce((n,b)=>n+b.series,0),"Chaque série doit rester ouverte");
  assert.equal(plan.timedSeconds,plan.steps.reduce((n,b)=>n+b.seconds,0),"Temps FIT calculé sur les blocs");
  assert.equal(plan.durationSeconds,null,"Ne pas inventer de chronomètre total pour les répétitions à durée variable");
  const fit=fs.readFileSync(require("node:path").join(ROOT,"adaptateurs/garmin/fichiers",s.id+".fit"));
  const checked=garmin.validateWorkoutFile(fit,plan);
  assert.equal(checked.steps,plan.steps.length);
  assert.equal(checked.sport,"strength_training");
  assert.equal(checked.timedSeconds,plan.timedSeconds);
  assert.equal(plan.steps.at(-1).name,"Etirements doux");
  assert.equal(plan.steps.at(-1).seconds,s.blocs.at(-1).dureeSecondes);
}
const plannedCourses=data.sessions.filter(s=>s.id.startsWith("course-")&&!s.fait);
const historyCourse=data.sessions.find(s=>s.id==="course-2026-11-11");
assert.equal(historyCourse.fait,true,"Historique de sortie effectué à préserver");
assert.equal(historyCourse.etapes.length,3,"Ne pas modifier la séance de course terminée");
for(const s of plannedCourses){
 assert.ok(s.etapes.at(-1).startsWith("Étirements doux · 3 min : "), "Étirements de course absents : "+s.id);
 assert.ok(s.pieces_jointes?.some(p=>p.role==="entrainement_prevu"),"FIT course manquant : "+s.id);
 const plan=garmin.parseSession(s);
 assert.equal(plan.steps.at(-1).name,"Etirements doux","Les étirements doivent être dans le FIT course");
 assert.equal(plan.steps.at(-1).seconds,180,"Trois minutes d'étirements prévus par sortie");
 const ref=s.pieces_jointes.find(p=>p.role==="entrainement_prevu");
 assert.equal(ref.url,"fichiers/garmin/"+s.id+".fit");
 const fit=fs.readFileSync(require("node:path").join(ROOT,"adaptateurs/garmin/fichiers",s.id+".fit"));
 const validation=garmin.validateWorkoutFile(fit,plan);
 assert.equal(validation.seconds,parseInt(s.duree,10)*60,"Durée course et FIT incohérente");
}
if(strengthSessions.length){
 const redundantRenfo={...strengthSessions[0],blocs:[...strengthSessions[0].blocs]};
 redundantRenfo.blocs.splice(-1,0,{nature:"retour_au_calme",dureeSecondes:240});
 assert.throws(()=>garmin.parseSession(redundantRenfo),/retour au calme redondant/,"Pas de récupération en double");
 const invalidRenfo={...strengthSessions[0],blocs:strengthSessions[0].blocs.map(b=>({...b}))};
 invalidRenfo.blocs[1].mouvementId="mouvement-inconnu";
 assert.throws(()=>garmin.parseSession(invalidRenfo),/non reconnu/);
}
assert.ok(html.includes('s.type!=="renfo"'),"Renfo : ne pas afficher de paragraphes supplémentaires");
for(const s of renfo){const d=data.plans.get(s.id).dureeEstimeeMinutes;assert.equal(s.duree,d.min+"–"+d.max+" min","Durée Renfo issue du plan structuré");}
const banque=JSON.parse(read("addons/web/public/assets/renfo/banque.json"));
assert.ok(banque.images.length>=5,"Banque PNG incomplète");
const known=new Set(banque.images.map(e=>e.png));
for(const s of renfo)for(const help of s.aidesExercices)assert.ok(known.has(help.png),"Aide non référencée dans la banque : "+help.png);
console.log("Validation OK :",data.sessions.length,"séances,",data.reports.size,"rapports,",data.events.length,"événements ; 5000 séances fictives regroupées sans perte.");