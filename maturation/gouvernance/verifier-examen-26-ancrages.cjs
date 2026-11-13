"use strict";
// Vérification de la correspondance des 26 candidats de provenance avec les rubriques
// V1/V2 classées. Ni correction de matrice ni certification d'activation.
const fs=require("node:fs"),path=require("node:path");
const HERE=__dirname,BASE="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const ALERT_IDS=new Set(["MAT-17","MAT-20","PLA-05","PLA-07","PLA-08","STR-04","REF-06"]);
function verify(data,prop,reviews){
 if(data.schemaVersion!==1||data.source_sha_main!==BASE||
 data.corrections?.length!==26||prop.corrections?.length!==26||
 data.modification_matrice_appliquee!==false||
 data.validation_gardien!==false||data.nouvelle_provenance_validee!==false)
 throw Error("Portée ou autorisation de provenance falsifiée");
 const rubric=reviews.flatMap(x=>x.rubriques);
 if(rubric.length!==161||new Set(rubric.map(x=>x.source+"#L"+x.ligne_debut)).size!==161)
 throw Error("Référentiel des 161 rubriques incomplet ou répété");
 const count={total:0,sources_mixte:0,sources_v1_abrogee:0,sans_source_historique:0,alertes_documentaires:0,validations_de_provenance:0};
 const statuses=new Set(["courant_a_verifier","mixte_v1_v2_a_scinder","ancienne_procedure_v1_explicitement_depassee","etat_date_non_prescriptif",
 "mixte_a_scinder","etat_date_depasse_non_prescriptif"]);
 for(let i=0;i<26;i++){
  const current=data.corrections[i],candidate=prop.corrections[i];
  if(!current||!candidate||current.id!==candidate.id||
  current.qualite_source_proposee!==candidate.statut_proposition||
  current.certification_clause!==false||current.correction_matrice_appliquee!==false||
  current.reserve?.length<55)
   throw Error("Candidat altéré ou validé sans preuve : "+candidate?.id);
  const old=candidate.candidat_source,report=current.candidat_source;
  if(old){
   if(!report||report.chemin!==old.path||report.sha!==old.sha||report.ligne!==old.line||old.sha!==BASE)
    throw Error("Source candidate non épinglée : "+candidate.id);
   const section=rubric.find(x=>x.source===old.path&&old.line>=x.ligne_debut&&old.line<=x.ligne_fin);
   if(!section||section.id!==current.rubrique_historique?.id||
   section.qualification_preliminaire!==current.rubrique_historique?.statut||
   !statuses.has(section.qualification_preliminaire))
    throw Error("Rubrique historique incorrecte : "+candidate.id);
   const risk=section.qualification_preliminaire!=="courant_a_verifier";
   if(current.risque_reactivation_v1!==risk)
    throw Error("Risque historique minoré : "+candidate.id);
   if(section.qualification_preliminaire==="mixte_v1_v2_a_scinder")count.sources_mixte++;
   if(section.qualification_preliminaire==="ancienne_procedure_v1_explicitement_depassee")count.sources_v1_abrogee++;
  }else{
   if(report!==null||current.rubrique_historique!==null||
    current.risque_reactivation_v1!==false)throw Error("Nouvelle provenance inventée : "+candidate.id);
   count.sans_source_historique++;
  }
  if(ALERT_IDS.has(current.id)){
   if(current.controle_transversal!=="a_reprendre_ou_scinder")
    throw Error("Alerte historique ignorée : "+current.id);
   count.alertes_documentaires++;
  }
  count.total++;
 }
 for(const [key,val] of Object.entries(count))if(data.compteurs?.[key]!==val)
 throw Error("Comptage faussé : "+key);
 if(count.total!==26||count.sources_mixte!==4||count.sources_v1_abrogee!==1||
 count.sans_source_historique!==1||count.alertes_documentaires!==7)
 throw Error("Bilan de provenance inattendu");
 return {candidats:26,alertes:7,provenances_validees:0,corrections_effectives:0};
}
module.exports={verify};
if(require.main===module){
 try{
 const read=x=>JSON.parse(fs.readFileSync(path.join(HERE,x),"utf8"));
 const data=read("EXAMEN-CRITIQUE-26-ANCRAGES.json");
 const proposals=read("PROPOSITIONS-26-ANCRAGES.json");
 const review=["REVUE-87-RUBRIQUES-RESTANTES.json","REVUE-REPRISE-30-RUBRIQUES.json",
 "REVUE-ROLES-29-RUBRIQUES.json","REVUE-COACH-15-RUBRIQUES.json"].map(read);
 console.log("EXAMEN PROVENANCE 26 : "+JSON.stringify(verify(data,proposals,review)));
 }catch(err){console.error("EXAMEN PROVENANCE REFUS : "+err.message);process.exitCode=1;}
}
