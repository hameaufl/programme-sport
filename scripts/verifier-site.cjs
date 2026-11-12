"use strict";
const fs=require("node:fs");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const {ROOT,collect,exposed,summary,monday}=require("./donnees.cjs");
const read=p=>fs.readFileSync(require("node:path").join(ROOT,p),"utf8");
const html=read("addons/web/pages/index.html"),sante=read("addons/web/pages/sante.html"),coachPage=read("addons/web/pages/coach.html"),equipPage=read("addons/web/pages/equipements.html");
const data=collect(),index=summary(data);

// Obligation structurante : aucun compte rendu d'activité confirmée sans analyse anatomique du Coach.
const verifierActivite=require("../domaines/activites/modele.cjs").verifier;
const fictive={seanceId:"verification-structures-2026-11-12",fait:true};
assert.throws(()=>verifierActivite(fictive),/Structures sollicitées obligatoires/,
 "Une activité réalisée ne peut omettre les structures sollicitées");
assert.throws(()=>verifierActivite({...fictive,structuresSollicitees:[]}),/Structures sollicitées obligatoires/,
 "Le champ ne peut être une liste vide");
assert.throws(()=>verifierActivite({...fictive,structuresSollicitees:[" "]}),/Structures sollicitées obligatoires/,
 "Les libellés anatomiques ne peuvent être blancs");
for(const [id,realisation] of data.execution){
 assert.ok(Array.isArray(realisation.structuresSollicitees)&&realisation.structuresSollicitees.length,
   "Activité confirmée sans structures : "+id);
 const seance=data.sessions.find(s=>s.id===id);
 assert.ok(seance&&seance.fait===true,"Réalisation absente de la vue : "+id);
 assert.deepEqual(seance.structuresSollicitees,realisation.structuresSollicitees,
   "Structures affichées différentes de la source Activités : "+id);
 const vue=exposed(monday(seance.date),data).find(s=>s.id===id);
 assert.ok(vue,"Séance manquante de la projection publique : "+id);
 assert.deepEqual(vue.structuresSollicitees,realisation.structuresSollicitees,
   "Structures non projetées dans Mon Rythme : "+id);
}
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
for(const page of [html,sante,coachPage,equipPage]){
  assert.ok(page.includes('<meta name="robots" content="noindex, nofollow">'),"Noindex absent");
  assert.ok(page.includes('<meta name="googlebot" content="noindex, nofollow">'),"Noindex Google absent");
  for(const script of page.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(script[1].trim())new vm.Script(script[1]);
}
const version=html.match(/<meta name="mon-rythme-version" content="([^"]+)"/)?.[1];
assert.ok(version&&[sante,coachPage,equipPage].every(page=>page.includes('name="mon-rythme-version" content="'+version+'"'))&&read("publication.txt").includes(version),"Versions des quatre vues incohérentes");

// Navigation et encarts communs : présentation cohérente, hors des données métier.
const pagesVisuelles=[["index",html],["sante",sante],["coach",coachPage],["equipements",equipPage]];
const styleCommun=read("addons/web/public/style-commun.css");
assert.ok(styleCommun.includes("min-height:232px")&&styleCommun.includes("min-height:210px")&&
 styleCommun.includes("header.site-header")&&styleCommun.includes(".site-brand-wrap #todayLabel")&&
 styleCommun.includes("align-items:baseline")&&styleCommun.includes("top:2px")&&
 styleCommun.includes("@media(max-width:420px)")&&
 styleCommun.includes(".shell {width:min(1160px")&&
 styleCommun.includes("grid-template-columns:repeat(4,minmax(0,1fr))")&&
 styleCommun.includes("grid-template-columns:repeat(2,minmax(0,1fr))")&&
 styleCommun.includes("@media(max-width:1000px)")&&styleCommun.includes("@media(max-width:600px)")&&
 !styleCommun.includes("justify-content:flex-end"),
 "L'en-tête commun doit occuper la largeur et le menu doit se répartir en quatre puis deux colonnes");
const destinations=[
 ["index","Mon programme","./"],
 ["coach","Le cap du Coach","./coach.html"],
 ["sante","Mon suivi santé","./sante.html"],
 ["equipements","Mon équipement","./equipements.html"]
];
for(const [page,source] of pagesVisuelles){
 assert.ok(source.includes('href="./style-commun.css?v='+version+'">'),"Feuille partagée absente : "+page);
 assert.ok(source.includes('defer src="./en-tete.js?v='+version+'"></script>'),"Script de date commun absent : "+page);
 assert.ok(source.includes('<div class="hero">')&&source.includes('<div class="hero-copy"><h1>')&&
   source.includes('class="hero-mark" aria-hidden="true"')&&source.includes('<svg viewBox="0 0 50 50">'),
   "Grand encart ou pictogramme absent : "+page);
 assert.ok(!source.includes('<p class="eyebrow">')&&!source.includes('<p class="subtitle">'),
   "Sous-titre réintroduit dans un encart : "+page);
 const menus=source.match(/<nav class="site-navigation"[\s\S]*?<\/nav>/g)||[];
 assert.equal(menus.length,1,"Une seule navigation commune attendue : "+page);
 const menu=menus[0];
 const headerStart=source.indexOf('<header class="site-header">'),headerEnd=source.indexOf('</header>',headerStart);
 const navPos=source.indexOf('<nav class="site-navigation"');
 const brandPos=source.indexOf('<div class="site-brand-wrap">',headerStart);
 const brandEnd=source.indexOf('</div>',brandPos);
 const datePos=source.indexOf('<time id="todayLabel"></time>',brandPos);
 assert.ok(headerStart>=0&&brandPos>headerStart&&brandEnd>brandPos&&
  datePos>brandEnd&&datePos<navPos&&navPos<headerEnd&&headerEnd<source.indexOf('<main>')&&
  source.includes('<a class="brand" href="./" aria-label="Accueil Mon Rythme">'),
  "Logo, date et menu identiques dans l'en-tête des quatre pages : "+page);
 assert.equal((menu.match(/class="site-nav-link/g)||[]).length,4,"Quatre destinations attendues : "+page);
 assert.equal((menu.match(/aria-current="page"/g)||[]).length,1,"Un seul onglet actif : "+page);
 let previous=-1;
 for(const [id,label,href] of destinations){
   const start=menu.indexOf(">"+label+"<");
   assert.ok(start>previous,"Ordre de navigation incorrect (Programme, Coach, Santé, Équipement) : "+page);
   previous=start;
   if(id===page)assert.ok(menu.includes('aria-current="page">'+label+'</span>'),"Page active incorrecte : "+page);
   else assert.ok(menu.includes('href="'+href+'">'+label+'</a>'),"Lien d'en-tête incorrect : "+page+" / "+label);
 }
 assert.ok(!source.includes('class="back"')&&!source.includes('← Mon programme'),
   "Bouton de retour redondant à retirer de l'en-tête : "+page);
}
assert.ok(read("scripts/construire-site.cjs").includes('"style-commun.css"')&&
 read("scripts/construire-site.cjs").includes('"en-tete.js"'),
 "Le CSS et le script de date partagés doivent être copiés dans l'artefact de publication");
const scriptDate=read("addons/web/public/en-tete.js");
new vm.Script(scriptDate);
const fauxTime={textContent:"",dateTime:""};
const DateFixe=class extends Date{constructor(...args){super(...(args.length?args:["2026-11-12T12:00:00Z"]));}};
vm.runInNewContext(scriptDate,{
 Date:DateFixe,Intl,
 document:{readyState:"complete",getElementById:id=>id==="todayLabel"?fauxTime:null,
   addEventListener:()=>{},hidden:false},
 window:{addEventListener:()=>{},setInterval:()=>{}}
});
assert.equal(fauxTime.dateTime,"2026-11-12","La date doit être locale au navigateur et renseigner <time>");
assert.match(fauxTime.textContent,/12 novembre 2026/,"La date commune doit être affichée en français");

// Éviter les raccourcis et sous-titres qui dupliquent désormais les titres et la navigation.
assert.ok(!html.includes('class="insights-grid"')&&!html.includes('class="health-preview"')&&
 !html.includes('class="health-cta"'),"Les trois anciens raccourcis du programme doivent être supprimés");
const programmeHeader=html.slice(html.indexOf('<header class="site-header">'),html.indexOf('</header>'));
const brandWrapStart=programmeHeader.indexOf('<div class="site-brand-wrap">');
const datePosition=programmeHeader.indexOf('<time id="todayLabel"></time>');
const brandWrapEnd=programmeHeader.indexOf('</div>',brandWrapStart);
const marqueEnd=programmeHeader.indexOf('</a>',brandWrapStart);
assert.ok(html.indexOf('<nav class="site-navigation"')<html.indexOf('<main>')&&
 brandWrapStart>=0&&marqueEnd>brandWrapStart&&datePosition>marqueEnd&&
 datePosition<brandWrapEnd&&
 programmeHeader.indexOf('<nav class="site-navigation"')>brandWrapEnd,
 "Sur toutes les pages, la date doit suivre la marque et précéder le menu");
for(const [nom,page] of pagesVisuelles){
 assert.ok(!page.includes('class="section-note"')&&!page.includes('class="hint"')&&!page.includes('class="help"'),
  "Sous-titre redondant sous un titre de section : "+nom);
}
assert.ok(!sante.includes('class="section-note"'),"Les quatre descriptions redondantes du suivi Santé doivent disparaître");
assert.ok(!equipPage.includes('class="hint"')&&!equipPage.includes('class="overview-desc"'),
 "La liste et le compteur d'équipements ne doivent pas répéter leur propre fonction");
assert.ok(!coachPage.includes('class="goal-label"'),"La carte objectif ne doit pas répéter le titre de sa section");

assert.ok(![html,sante,coachPage,equipPage].some(p=>p.includes("personnel/programme.js")),"Les pages doivent utiliser les vues générées");
assert.ok(html.includes("data/semaines/")&&html.includes('id="previous"')&&html.includes('id="following"')&&html.includes('id="reset"'),"Calendrier hebdomadaire brisé");
assert.ok(html.includes('isCompleted(s)?"Séance":"Programme prévu"')&&html.includes('"Structures sollicitées"')&&html.includes('"Sensations"'),"Trois sections des séances manquantes");
assert.ok(html.includes("s.exercicesDuRapport")&&html.includes("s.structuresDuRapport"),"Rapports liés aux séances manquants");
assert.ok(sante.includes("data/sante/journal/index.json")&&sante.includes("data/index.json"),"Suivi santé paginé ou compteurs manquants");

const projectionCoach=require("../adaptateurs/projections/coaching.cjs").projeterOrientation;
const domaineCoach=require("../domaines/coaching/modele.cjs");
const portsCoach=require("../adaptateurs/fichiers/depots.cjs").coaching;
const sourceCoach=portsCoach.orientation(),objectifsCoach=portsCoach.objectifs();
assert.equal(domaineCoach.verifierOrientation(sourceCoach),sourceCoach,"Orientation du Coach absente ou invalide");
assert.ok(sourceCoach.sourcesMetier.length>0&&sourceCoach.tendances.length>0&&sourceCoach.vigilances.length>0,"Synthèse métier et provenance nécessaires");
assert.ok(sourceCoach.sourcesMetier.every(ref=>/^(coaching|sante|activites|planification):[a-z0-9:-]+$/.test(ref)),"Références métier logiques uniquement, pas de chemins physiques");
const policyCoach=JSON.parse(read("contrats/publication-v1.json"));
const publicCoach=projectionCoach({orientation:sourceCoach,objectifs:objectifsCoach},policyCoach);
assert.deepEqual(Object.keys(publicCoach).sort(),["schemaVersion","miseAJour","objectifPersonnel","phase","ligneDirectrice","tendances","vigilances"].sort(),"Seuls les champs d'orientation autorisés sont publiés");
assert.equal(publicCoach.objectifPersonnel,objectifsCoach.objectifs[0],"L'objectif personnel doit venir de la source canonique");
assert.equal(publicCoach.phase,sourceCoach.phase);
assert.deepEqual(Object.keys(publicCoach.tendances[0]).sort(),["horizon","intention","condition"].sort(),"Pas de propriétés métier inconnues dans les tendances");
assert.deepEqual(Object.keys(publicCoach.vigilances[0]).sort(),["sujet","attention"].sort(),"Pas de propriétés métier inconnues dans la vigilance");
const avecInfos={...sourceCoach,informationsPrivees:"NE_PAS_PUBLIER",
 tendances:sourceCoach.tendances.map(t=>({...t,historiqueInterne:"NE_PAS_PUBLIER"})),
 vigilances:sourceCoach.vigilances.map(v=>({...v,identifiantMedical:"NE_PAS_PUBLIER"}))};
const publicFiltre=projectionCoach({orientation:avecInfos,objectifs:{...objectifsCoach,notesConfidentielles:"NE_PAS_PUBLIER"}},policyCoach);
assert.ok(!JSON.stringify(publicFiltre).includes("NE_PAS_PUBLIER")&&!JSON.stringify(publicFiltre).includes("sourcesMetier"),
 "Le projecteur ne doit pas transférer les notes métier, les chemins et les champs ajoutés");
assert.equal(projectionCoach({orientation:avecInfos,objectifs:objectifsCoach},JSON.parse(read("contrats/publication-prive-v1.json"))),null,
 "La projection restreinte doit refuser le cap du Coach");
assert.equal(projectionCoach({orientation:avecInfos,objectifs:objectifsCoach},{schemaVersion:1,default:"deny"}),null,
 "Politique sans autorisation de Coaching = refus par défaut");
assert.throws(()=>domaineCoach.verifierOrientation({...sourceCoach,phase:""}),/invalide/,"Cap vide interdit");
assert.throws(()=>domaineCoach.verifierOrientation({...sourceCoach,tendances:[...sourceCoach.tendances,sourceCoach.tendances[0]]}),/invalide/,"Identifiants de tendances dupliqués interdits");
assert.ok(coachPage.includes("./data/coaching/orientation.json")&&coachPage.includes('id="coachObjective"')&&
 coachPage.includes('id="coachTrends"')&&coachPage.includes('id="coachWatch"'),"La page du Coach doit lire sa projection et présenter les trois rubriques");
const heroCoach=coachPage.slice(coachPage.indexOf('<div class="hero">'),coachPage.indexOf('<section aria-labelledby="objectiveTitle">'));
assert.ok(!heroCoach.includes('id="coachPhase"')&&!heroCoach.includes('id="coachDirection"')&&!heroCoach.includes('id="coachDate"'),"Le bandeau vert doit être réservé au titre");
const enchainementCoach=['id="objectiveTitle"','id="orientationTitle"','id="trendsTitle"','id="watchTitle"'].map(id=>coachPage.indexOf(id));
assert.ok(enchainementCoach.every(i=>i>=0)&&enchainementCoach.every((i,n)=>n===0||i>enchainementCoach[n-1]),"Hiérarchie des sections du Coach altérée");
assert.ok(coachPage.includes('class="orientation-card"')&&coachPage.includes('id="coachPhase"')&&
 coachPage.includes('id="coachDirection"')&&coachPage.includes('id="coachDate"'),"La nouvelle section doit préserver le cap, sa description et sa date");
assert.ok(!coachPage.includes("Des intentions conditionnelles, pas des séances ajoutées au calendrier.")&&
 !coachPage.includes("Les éléments que le Coach prendra en compte dans ses prochains ajustements."),"Sous-titres supprimés à ne pas réintroduire");
assert.ok(html.includes('href="./coach.html"')&&coachPage.includes('href="./sante.html"'),"Navigation vers la stratégie ou le suivi santé absente");
assert.ok(!/domaines\/(?:coaching|sante|activites|planification)\/donnees\//.test(coachPage),"La page ne doit pas connaître les chemins des domaines");
assert.ok(!sante.includes("L'essentiel de ma reprise, sans les notes de fond.")&&
 !sante.includes("Les observations détaillées restent dans le domaine Santé")&&
 !sante.includes("Cette vue ne constitue pas un avis médical."),"Les textes supprimés de Mon suivi santé ne doivent pas réapparaître");
assert.ok(read("AGENTS.md").includes("orientation.json")&&read("docs/CONTRAT-CONTINUITE-COACH.md").includes("orientation.json"),
 "Consignes de continuité du Coach non actualisées");

assert.ok(sante.includes('id="weekGraph"')&&sante.includes('id="recentDone"')&&sante.includes('id="healthEvents"'),"Nouvelle vue visuelle de santé incomplète");
assert.ok(sante.includes('id="doneCount"')&&sante.includes('id="feedbackCount"')&&sante.includes('id="plannedCount"'),"Indicateurs santé manquants");
assert.ok(!/profileSections|fillParagraphs|data\/sante\/profil\.md|Mes repères de santé/.test(sante),"Ancien affichage brut du profil Santé réintroduit");
assert.ok(!/display\s*:\s*none[^}]*healthProfile|hidden[^>]*healthProfile/.test(sante),"Le profil ne doit pas seulement être masqué visuellement");
const publicationSante=JSON.parse(read("contrats/publication-v1.json")).sante;
assert.equal(publicationSante.profilPublic,false,"Le profil médical brut ne doit plus être publié vers le site");
assert.equal(publicationSante.evenementsPublics,true,"Les dates d'événements doivent rester dans les repères visuels");
assert.ok(read("scripts/construire-site.cjs").includes("model.events.map(e=>({date:e.date,title:e.title}))"),"Les notes détaillées des événements ne doivent plus être copiées vers le site");
const originalProfil=read("domaines/sante/donnees/PROFIL.md");
assert.ok(originalProfil.includes("Antécédents utiles à la pratique sportive")&&originalProfil.includes("Rééducation et suivi professionnel")&&originalProfil.includes("Tolérance à l'effort et récupération"),"Le contexte clinique complet doit rester dans Santé");
assert.ok(data.events.length>0&&data.events.every(e=>Array.isArray(e.lines)&&e.lines.some(x=>x.trim())),"Les notes d'événements doivent rester intégralement dans Santé");
assert.ok(read("domaines/coaching/donnees/CONTEXTE-COACH.md").includes("Zones à surveiller")&&
  read("domaines/coaching/donnees/DECISIONS.md").includes("Décisions du domaine personnel")&&
  read("domaines/coaching/donnees/JOURNAL.md").includes("Journal du domaine sportif"),"La mémoire de réflexion du Coach doit rester disponible");
assert.ok(read("maturation/architecture/AUDIT-SUIVI-SANTE.md").includes("PROFIL.md"),"Audit des sources conservées absent");

assert.ok(![html,sante,coachPage,equipPage].some(page=>page.includes("localStorage")),"Stockage navigateur non autorisé");
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

const projectEquipments=require("../adaptateurs/projections/coaching.cjs").projeterEquipements;
const policyEquip=JSON.parse(read("contrats/publication-v1.json"));
const publicEquip=projectEquipments(materiel,policyEquip);
const expectedAvailable=materiel.equipements.filter(e=>e.statut==="disponible");
assert.equal(publicEquip.schemaVersion,1);
assert.equal(publicEquip.miseAJour,materiel.maj);
assert.equal(publicEquip.equipements.length,expectedAvailable.length,"Afficher uniquement le matériel confirmé disponible");
assert.deepEqual(Object.keys(publicEquip).sort(),["schemaVersion","miseAJour","equipements"].sort(),"N'exposer aucun champ interne de l'inventaire");
assert.ok(publicEquip.equipements.every(e=>Object.keys(e).every(k=>["nom","diametreCmApprox"].includes(k))),"Uniquement les propriétés d'affichage sont autorisées");
assert.deepEqual(publicEquip.equipements.map(e=>e.nom),expectedAvailable.map(e=>e.nom));
assert.ok(!JSON.stringify(publicEquip).includes("provenance")&&!JSON.stringify(publicEquip).includes("notes")&&!JSON.stringify(publicEquip).includes("elastiques_resistance"),"Ne pas divulguer les champs métier d'inventaire");
assert.equal(publicEquip.equipements.find(e=>e.nom==="Gros ballon de gymnastique")?.diametreCmApprox,80);
const sentinelle={...materiel,secret:"NE_JAMAIS_PUBLIER",equipements:materiel.equipements.map(e=>({...e,notes:"NE_JAMAIS_PUBLIER",autreDonnee:"NE_JAMAIS_PUBLIER"}))};
assert.ok(!JSON.stringify(projectEquipments(sentinelle,policyEquip)).includes("NE_JAMAIS_PUBLIER"),"Un champ ajouté au domaine ne doit pas apparaître dans le Web");
assert.equal(projectEquipments(sentinelle,JSON.parse(read("contrats/publication-prive-v1.json"))),null,"Interdire les équipements dans la politique restreinte");
assert.equal(projectEquipments(sentinelle,{default:"deny",schemaVersion:1}),null,"Pas d'autorisation explicite : pas de projection");
const noEquip={...materiel,equipements:materiel.equipements.map(e=>({...e,statut:"absent"}))};
assert.deepEqual(projectEquipments(noEquip,policyEquip).equipements,[],"Équipement non disponible à exclure");
assert.ok(equipPage.includes("./data/coaching/equipements.json")&&equipPage.includes('id="equipmentList"')&&equipPage.includes('id="equipmentCount"'),"La page doit dépendre uniquement de la projection de matériel");
assert.ok(html.includes('href="./equipements.html"')&&coachPage.includes('href="./equipements.html"'),"Liens vers l'inventaire manquants");
assert.ok(!/domaines\/(?:coaching|sante|activites|planification)\/donnees\//.test(equipPage),"Le Web ne doit pas lire les chemins métier");
assert.ok(!equipPage.includes("Tapis de sol")&&!equipPage.includes("Gros ballon de gymnastique"),"Ne pas coder les équipements en dur dans la page");
assert.ok(read("AGENTS.md").includes("equipements.html")&&read("docs/CONTRAT-CONTINUITE-COACH.md").includes("equipements.html"),"Les agents doivent connaître cette vue et l'inventaire canonique");

const equipe=new Map(materiel.equipements.map(e=>[e.id,e]));
assert.equal(equipe.get("tapis_sol")?.statut,"disponible");
assert.equal(equipe.get("ballon_gymnastique")?.statut,"disponible");
assert.equal(equipe.get("ballon_gymnastique")?.caracteristiques?.diametreCmApprox,80);
assert.deepEqual([...equipe.keys()].sort(),["ballon_gymnastique","tapis_sol"],"L'inventaire domicile ne doit contenir que les équipements réellement possédés");
assert.ok([...equipe.values()].every(e=>e.statut==="disponible"),"Un équipement absent ou non confirmé ne doit pas figurer dans l'inventaire");
assert.equal(coachModele.verifierMaterielRequis(materiel,[]),true,"Un exercice au poids du corps ne requiert aucun accessoire");
assert.equal(coachModele.verifierMaterielRequis(materiel,["tapis_sol","ballon_gymnastique"]),true);
for(const id of ["elastiques_resistance","halteres","autres_accessoires","materiel_non_declare"])
 assert.throws(()=>coachModele.verifierMaterielRequis(materiel,[id]),/indisponible ou non confirmé/,"Matériel non déclaré ou absent à bloquer : "+id);
assert.throws(()=>coachModele.verifierEquipements({...materiel,equipements:[...materiel.equipements,materiel.equipements[0]]}),/doublonné/,"Doublons à rejeter");
assert.throws(()=>coachModele.verifierEquipements({...materiel,equipements:materiel.equipements.map((e,i)=>i?e:{...e,statut:"achete"})}),/mal formé/,"Statut non vérifié à rejeter");
assert.ok(!JSON.parse(read("contrats/publication-v1.json")).programme.includes("equipements"),"Inventaire distinct des données publiques Web");
assert.ok(read("AGENTS.md").includes("catalogue officiel Garmin")&&read("adaptateurs/garmin/MCP.md").includes("Animation facultative, pas bloquante"),"Exercices officiels et animations facultatives : règle Coach à conserver");
assert.ok(read("domaines/coaching/donnees/CONTEXTE-COACH.md").includes("L'animation sur la Venu 4 est facultative"),"Le Coach doit pouvoir proposer des séances personnalisées sans animation");
const mcp=require("../adaptateurs/garmin/mcp.cjs");
assert.ok(!/garmin|\.fit\b|pieces_jointes/i.test(html),"Aucune référence à des programmes de montre dans le site");
assert.ok(!/garmin|\.fit\b|pieces_jointes/i.test(sante),"Aucune référence à des programmes de montre dans la vue Santé");
assert.ok(!/garmin|\.fit\b|pieces_jointes/i.test(coachPage),"Aucune référence à des programmes de montre dans la vue Coaching");
assert.ok(!/garmin|\.fit\b|pieces_jointes/i.test(equipPage),"Aucune référence à des programmes de montre dans la vue des équipements");
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