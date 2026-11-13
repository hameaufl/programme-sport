"use strict";
// Contrôle statique de notes A/B2 publiques ; ne lit pas les PDF privés et ne juge pas le sens des réponses.
const fs=require("node:fs"),path=require("node:path");
const EXPECTED_B="c92d5a7c69b371bfa9ef6770363ad0c07bf53f93";
const EXPECTED_B2="0aca52ac999f3a579610edfa2106aa400518a3fc";
const expectedPairs={ "CIB-01":230,"CIB-02":243,"CIB-03":217,"CIB-04":276,"CIB-05":262,"CIB-06":414 };
function verify(report) {
 if(report.schemaVersion!==1 || report.versionB!==EXPECTED_B || report.versionB2!==EXPECTED_B2 ||
   report.nature!=="observation_de_conversations_reelles_avec_analyse_manuelle_non_independante") throw Error("Type d'observation ou SHA invalide");
 if(report.confidentialite?.pdfPublies!==false || report.confidentialite?.conversationsVerbatimPubliees!==false ||
    report.activation?.visaGardien!==false || report.activation?.accordFusionMain!==false ||
    report.activation?.permissionGarmin!==false) throw Error("Statut d'activation ou confidentialité incompatible");
 if(report.comparables?.length!==6 || report.nouveaux?.length!==2 ||
    !Array.isArray(report.limites) || report.limites.length<3) throw Error("Comptage des scénarios incomplet");
 const ids=new Set(),sums={B:0,B2:0};
 for(const p of report.comparables) {
  if(ids.has(p.id) || expectedPairs[p.id]===undefined || p.B!==expectedPairs[p.id] ||
     !Number.isInteger(p.B2) || p.B2<1 ||
     typeof p.observation!=="string" || p.observation.length<30 ||
     typeof p.reserve!=="string" || p.reserve.length<30) throw Error("Paire altérée : "+p.id);
  ids.add(p.id); sums.B+=p.B; sums.B2+=p.B2;
 }
 for(const p of report.nouveaux) {
  if(!["CIB-07","CIB-08"].includes(p.id) || ids.has(p.id) || p.comparateurB!=="absent" ||
     !Number.isInteger(p.B2) || p.B2<1 ||
     p.verdict!=="refus_correct") throw Error("Comparaison inventée pour nouveau test : "+p.id);
  ids.add(p.id);
 }
 if(ids.size!==8 || sums.B!==1642 || sums.B2!==471 ||
    report.mesures?.comparables!==6 || report.mesures?.reponsesB2Total!==8 ||
    report.mesures?.sommeB!==sums.B || report.mesures?.sommeB2!==sums.B2 ||
    report.mesures?.economieMots!==sums.B-sums.B2 ||
    Math.round((1-sums.B2/sums.B)*1000)/10!==report.mesures?.reductionPourcent)
   throw Error("Mesures comparatives arithmétiquement incohérentes");
 return {casComparables:6,nouveauxSansB:2,motsB:sums.B,motsB2:sums.B2,reductionPourcent:report.mesures.reductionPourcent};
}
module.exports={verify};
if(require.main===module){
 try{
 const d=JSON.parse(fs.readFileSync(path.join(__dirname,"RESULTATS-B2-OBSERVES.json"),"utf8"));
 const out=verify(d);console.log("B2 OBSERVÉ : "+JSON.stringify(out)+" ; revue manuelle non indépendante.");
 }catch(e){console.error("B2 OBSERVÉ : REFUS — "+e.message);process.exitCode=1;}
}
