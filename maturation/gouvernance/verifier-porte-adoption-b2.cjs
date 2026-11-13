"use strict";
// Porte documentaire d'adoption B2. REFUSE les déclarations de validation non acquise.
// IMPORTANT : ce script n'est PAS une protection de branche GitHub ni un visa du Gardien.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const ROOT=path.resolve(__dirname,"../.."),HERE=__dirname;
const B="c92d5a7c69b371bfa9ef6770363ad0c07bf53f93";
const B2="0aca52ac999f3a579610edfa2106aa400518a3fc";
const MAIN="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const ONLY=[
  "maturation/gouvernance/PROTOCOLE-COACH.md",
  "maturation/gouvernance/agents/COACH.md"
];
function demand(ok,msg){if(!ok)throw Error(msg);}
function verify(state,btoB2,tests,register,differences){
 demand(state.schemaVersion===1&&state.versionB===B&&state.versionB2===B2&&state.sourceHistorique===MAIN,
  "Mauvaise version de l'analyse d'adoption");
 demand(state.qualiteDuDossier==="candidate_favorable_pour_essais_sans_ecriture"&&state.activation==="bloquee",
  "Activation déclarée sans visa documenté");
 demand(state.confidentialite?.pdfsPublics===false&&state.confidentialite?.conversationsIntegralesPubliques===false,
  "Publication de preuves privées non autorisée");
 const diff=differences.slice().sort();
 demand(diff.length===2&&diff.join("|")===ONLY.join("|"),"B2 n'est plus une évolution strictement à deux protocoles");
 demand(btoB2.versionB===B&&btoB2.versionB2===B2&&btoB2.mesures?.comparables===6&&
   btoB2.mesures.sommeB===1642&&btoB2.mesures.sommeB2===471&&
   btoB2.mesures.reductionPourcent===71.3,"Mesures B/B2 absentes ou altérées");
 const m=state.demonstrations?.sixPromptsBversB2;
 demand(m?.nombre===6&&m.motsB===1642&&m.motsB2===471&&m.pourcentageReduction===71.3,
   "Résumé de concision discordant");
 const cs=tests.observations;
 demand(tests.statut==="observations_a_qualifier"&&tests.referenceB2===B2&&cs?.length===2,
   "Contre-tests B2 non présents");
 const p=cs.find(x=>x.id==="CT-B2-01"),w=cs.find(x=>x.id==="CT-B2-02");
 demand(p?.texteDisponible===true&&p.erreursBloquantes===0&&p.attendusSatisfaits===9&&p.attendusTotaux===9&&
   w?.texteDisponible===true&&w.erreursBloquantes===0&&w.attendusSatisfaits===5&&w.attendusTotaux===8,
   "Résultats des contre-tests discordants");
 const ct=state.demonstrations?.contreTestsB2;
 demand(ct?.nombre===2&&ct.obligationsCR?.satisfaites===9&&ct.obligationsCR.total===9&&
   ct.obligationsWeb?.satisfaites===5&&ct.obligationsWeb.total===8&&ct.erreursBloquantesObservees===0,
  "Résumé des contre-tests non prouvé");
 const entries=register.split(/\r?\n/).filter(x=>/^\| INC-\d{3} \|/.test(x));
 const ids=entries.map(x=>x.split("|")[1].trim());
 demand(entries.length===8&&new Set(ids).size===8&&Array.from({length:8},(_,i)=>
  "INC-"+String(i+1).padStart(3,"0")).every(x=>ids.includes(x)),"Registre INC-001 à INC-008 incomplet");
 const v=state.verrous;
 demand(v?.auditSemantiqueExhaustif==="non_acquis"&&
  v.incidentsReferentiel?.restants===8&&v.incidentsReferentiel?.statut==="ouverts"&&
  v.visaGardienFormel==="non_acquis"&&v.indepenceAvisGardien==="non_independant"&&
  v.approbationExpliciteFusion==="non_donnee"&&v.certificatPublicationReelle==="non_applicable_tests_lecture_seule",
  "Condition de fusion déclarée acquise sans nouvelle procédure d'examen");
 return {candidat:"favorable_pour_essais",activation:"bloquee",fusion:"interdite_sans_accord",
   preuves:{casComparables:6,contretests:2,incOuverts:8,fichiersDifferentsB2:2}};
}
module.exports={verify};
if(require.main===module) {
 try {
  const read=x=>JSON.parse(fs.readFileSync(path.join(HERE,x),"utf8"));
  const diff=cp.execFileSync("git",["diff","--name-only",B,B2],{cwd:ROOT,encoding:"utf8"}).trim().split("\n").filter(Boolean);
  const state=read("ETAT-ADOPTION-B2.json"),cmp=read("RESULTATS-B2-OBSERVES.json");
  const cases=read("CONTRETESTS-B2-OBSERVATIONS.json"),registre=fs.readFileSync(path.join(HERE,"referentiel","INCOHERENCES.md"),"utf8");
  const result=verify(state,cmp,cases,registre,diff);
  console.log("ADOPTION B2 : "+JSON.stringify(result)+" — ni visa Gardien indépendant ni protection GitHub réelle.");
 } catch(e) {console.error("ADOPTION B2 : REFUS — "+e.message);process.exitCode=1;}
}
