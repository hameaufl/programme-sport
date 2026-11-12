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
// Référentiel de matériel autonome : un équipement absent ou non confirmé est interdit.
const materiel=require("../domaines/coaching/donnees/equipements.json");
const coachModele=require("../domaines/coaching/modele.cjs");
const depot=require("../adaptateurs/fichiers/depots.cjs");
assert.deepEqual(depot.coaching.equipements(),materiel,"Le port d'équipement doit fournir l'inventaire canonique");
assert.equal(coachModele.verifierEquipements(materiel),materiel);
const equipe=new Map(materiel.equipements.map(e=>[e.id,e]));
assert.equal(equipe.get("tapis_sol")?.statut,"disponible");
assert.equal(equipe.get("ballon_gymnastique")?.statut,"disponible");
assert.equal(equipe.get("ballon_gymnastique")?.caracteristiques?.diametreCmApprox,80);
assert.equal(equipe.get("elastiques_resistance")?.statut,"absent");
assert.equal(equipe.get("halteres")?.statut,"absent");
assert.equal(equipe.get("autres_accessoires")?.statut,"non_confirme");
assert.equal(coachModele.verifierMaterielRequis(materiel,[]),true,"Un exercice au poids du corps ne requiert aucun accessoire");
assert.equal(coachModele.verifierMaterielRequis(materiel,["tapis_sol","ballon_gymnastique"]),true);
for(const id of ["elastiques_resistance","halteres","autres_accessoires","materiel_non_declare"])
 assert.throws(()=>coachModele.verifierMaterielRequis(materiel,[id]),/indisponible ou non confirmé/,"Matériel non déclaré ou absent à bloquer : "+id);
assert.throws(()=>coachModele.verifierEquipements({...materiel,equipements:[...materiel.equipements,materiel.equipements[0]]}),/doublonné/,"Doublons à rejeter");
assert.throws(()=>coachModele.verifierEquipements({...materiel,equipements:materiel.equipements.map((e,i)=>i?e:{...e,statut:"achete"})}),/mal formé/,"Statut non vérifié à rejeter");
assert.ok(!JSON.parse(read("contrats/publication-v1.json")).programme.includes("equipements"),"Inventaire distinct des données publiques Web");
assert.ok(read("AGENTS.md").includes("exercices officiels Garmin")&&read("adaptateurs/garmin/MCP.md").includes("animations"),"Règle Coach officielle et limites d'animation à conserver");
const mcp=require("../adaptateurs/garmin/mcp.cjs");
assert.ok(!/garmin|\.fit\b|pieces_jointes/i.test(html),"Aucune référence à des programmes de montre dans le site");
assert.ok(!/garmin|\.fit\b|pieces_jointes/i.test(sante),"Aucune référence à des programmes de montre dans la vue Santé");
assert.ok(!read("scripts/construire-site.cjs").includes("fichiers/garmin"),"Pas de copie de binaires lors de la publication");
assert.ok(!fs.existsSync(require("node:path").join(ROOT,"adaptateurs/garmin/fichiers")),"Anciennes pièces binaires toujours présentes");
assert.ok(!JSON.parse(read("contrats/publication-v1.json")).programme.includes("pieces_jointes"),"Le contrat Web ne doit pas exposer d'entraînements externes");
for(const seance of data.sessions)assert.ok(!Object.hasOwn(seance,"pieces_jointes"),"Pièce jointe externe encore projetée : "+seance.id);
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

// L'adaptateur MCP ne réalise aucun appel distant sans sélection du Coach.
const selection=mcp.preparer(renfo.map(s=>s.id));
assert.equal(selection.statut,"PREPARATION_LOCALE_SEULEMENT");
assert.equal(selection.modeles.length,2,"Les 14 Renfos réutilisent exactement deux prescriptions");
assert.equal(selection.modeles.reduce((n,m)=>n+m.dates.length,0),renfo.length);
const idsDistants=Object.fromEntries(selection.modeles.map((m,i)=>[m.empreinte,i+1]));
const calendrier=mcp.preparerCalendrier(selection,idsDistants);
assert.equal(calendrier.statut,"A_CONFIRMATION_EXPLICITE");
assert.equal(calendrier.schedules.length,renfo.length);
assert.equal(mcp.preparerCalendrier(selection,idsDistants,calendrier.schedules).schedules.length,0,"Pas de doublon de calendrier");
const memeJour=mcp.preparer(["course-2026-11-16","renfo-2026-11-16"]);
assert.equal(memeJour.modeles.length,2);
const idsJour=Object.fromEntries(memeJour.modeles.map((m,i)=>[m.empreinte,i+101]));
const propositionsJour=mcp.preparerCalendrier(memeJour,idsJour);
assert.equal(propositionsJour.schedules.length,2,"Une course et un Renfo peuvent être programmés le même jour");
const calendrierPartiel=mcp.preparerCalendrier(memeJour,idsJour,[propositionsJour.schedules[0]]);
assert.equal(calendrierPartiel.schedules.length,1,"Ne pas recréer le modèle déjà présent");
assert.equal(calendrierPartiel.alertes.length,1,"Signaler une autre séance le même jour avant écriture");
assert.throws(()=>mcp.preparerCalendrier(selection,{}),/non vérifié/,"Pas d'identifiant distant inventé");
assert.throws(()=>mcp.preparer([renfo[0].id,renfo[0].id]),/doublons/);
const renfoRedondant={...data.plans.get(renfo[0].id),blocs:[...data.plans.get(renfo[0].id).blocs,{nature:"retour_au_calme"}]};
assert.throws(()=>mcp.empreinte(renfoRedondant),/redondant/);
const courseSimple=data.plans.get("course-2026-11-13");
const dto=mcp.dtoCourse(courseSimple,"MR · Test technique");
assert.equal(dto.workoutSegments[0].workoutSteps.length,8,"Trois fractions, marche finale et étirements");
assert.ok(dto.workoutSegments[0].workoutSteps.every(e=>e.targetType.workoutTargetTypeKey==="no.target"),"Aucune zone cardiaque inventée");
assert.equal(dto.workoutSegments[0].workoutSteps.at(-1).endConditionValue,180,"Étirements conservés");
assert.throws(()=>mcp.dtoCourse(data.plans.get(renfo[0].id),"Test"),/Renfo non validée/);
assert.throws(()=>mcp.dtoCourse(data.plans.get("course-2026-12-14"),"Test"),/Option/,"Ne pas supprimer une alternative à l'insu du Coach");
const plannedCourses=data.sessions.filter(s=>s.id.startsWith("course-")&&!s.fait);
const historyCourse=data.sessions.find(s=>s.id==="course-2026-11-11");
assert.equal(historyCourse.fait,true,"Historique de sortie effectuée préservé");
assert.equal(historyCourse.etapes.length,3,"Ne pas modifier la course réalisée");
for(const c of plannedCourses)assert.ok(c.etapes.at(-1).startsWith("Étirements doux · 3 min : "),"Étirements prévus conservés : "+c.id);
assert.ok(html.includes('s.type!=="renfo"'),"Renfo : ne pas afficher de paragraphes supplémentaires");
for(const s of renfo){const d=data.plans.get(s.id).dureeEstimeeMinutes;assert.equal(s.duree,d.min+"–"+d.max+" min","Durée Renfo issue du plan structuré");}
const banque=JSON.parse(read("addons/web/public/assets/renfo/banque.json"));
assert.ok(banque.images.length>=5,"Banque PNG incomplète");
const known=new Set(banque.images.map(e=>e.png));
for(const s of renfo)for(const help of s.aidesExercices)assert.ok(known.has(help.png),"Aide non référencée dans la banque : "+help.png);
console.log("Validation OK :",data.sessions.length,"séances,",data.reports.size,"rapports,",data.events.length,"événements ; 5000 séances fictives regroupées sans perte.");