"use strict";
// Contrôle de classement non destructif : NE CONSTITUE PAS une autorisation de supprimer.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const ROOT=path.resolve(__dirname,"../.."),HERE=__dirname;
const BASE="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
function requireOk(ok,msg){if(!ok)throw Error(msg);}
function validate(inventory,review,files,readHistorical){
 requireOk(inventory.schemaVersion===1 && inventory.source_main_sha===BASE &&
   inventory.nombre_fichiers===143 && inventory.statut==="cartographie_non_destructive_sans_approbation_de_suppression",
   "Inventaire ou statut de nettoyage invalide");
 requireOk(inventory.fichiers?.length===143,"Les 143 fichiers doivent être inventoriés");
 const wanted=new Map(files.map(x=>[x.path,x.sha]));
 requireOk(wanted.size===143,"Arbre de main inattendu");
 const seen=new Set();
 for(const row of inventory.fichiers){
   requireOk(wanted.has(row.path)&&wanted.get(row.path)===row.blob_sha&&!seen.has(row.path),
     "Fichier de main absent, altéré ou dupliqué : "+row.path);
   seen.add(row.path);
   requireOk(row.suppression_autorisee===false&&row.dependances_verifiees===false,
     "Déclaration d'autorisation ou de vérification de dépendance inventée : "+row.path);
   requireOk(typeof row.action_proposee==="string"&&row.action_proposee.length>=9&&
     typeof row.categorie==="string"&&typeof row.risque==="string","Classement incomplet");
   if(/^domaines\/(?:activites|sante|coaching|planification)\/donnees\//.test(row.path))
     requireOk(row.categorie==="source_metier_canonique","Donnée métier de main à préserver : "+row.path);
   if(row.path.startsWith("domaines/planification/archives/"))
     requireOk(row.categorie==="archive_metier_a_preserver","Archive historique à préserver");
 }
 const archive=inventory.fichiers.filter(x=>x.categorie==="archive_metier_a_preserver");
 requireOk(archive.length===17&&archive.filter(x=>x.path.endsWith(".json")).length===16,
   "Nombre des pièces Renfo archivées incorrect");
 requireOk(inventory.fichiers.filter(x=>x.categorie==="source_metier_canonique").length===51,
   "Sources métier V2 non identifiées");
 requireOk(review.schemaVersion===1 && review.source_main_sha===BASE&&
   review.source==="docs/REPRISE.md"&&review.rubriques_couvertes_par_revue_preliminaire===30&&
   review.rubriques?.length===30,"Revue de reprise incomplète");
 const source=readHistorical("docs/REPRISE.md").split(/\r?\n/);
 const headings=source.map((s,i)=>({line:i+1,title:s.replace(/^#{2,4}\s/,"")})).
   filter((x,i)=>/^#{2,4}\s/.test(source[i]));
 requireOk(headings.length===30,"La source ne comporte plus 30 rubriques");
 const counters={courant_a_verifier:0,mixte_v1_v2_a_scinder:0,ancienne_procedure_v1_explicitement_depassee:0};
 const oldIDs=new Set(["REP-14","REP-15","REP-16","REP-23"]);
 for(let i=0;i<30;i++){
   const x=review.rubriques[i],h=headings[i],end=(headings[i+1]?.line||source.length+1)-1;
   requireOk(x.id==="REP-"+String(i+1).padStart(2,"0") &&x.ligne_debut===h.line&&
     x.ligne_fin===end&&x.titre===h.title&&x.source_sha===BASE&&
     x.verification_semantique_exhaustive===false&&x.modification_source_autorisee===false,
     "Revue non vérifiable ou fausse validation : "+x.id);
   requireOk(Object.hasOwn(counters,x.qualification_preliminaire)&&
     x.justification?.length>55,"Qualification sans justification : "+x.id);
   if(oldIDs.has(x.id))requireOk(x.qualification_preliminaire==="ancienne_procedure_v1_explicitement_depassee",
     "Ancienne procédure V1 oubliée : "+x.id);
   counters[x.qualification_preliminaire]++;
 }
 requireOk(counters.courant_a_verifier===16&&counters.mixte_v1_v2_a_scinder===10&&
   counters.ancienne_procedure_v1_explicitement_depassee===4,
   "Total de qualifications incorrect");
 return {fichiers:143,donnees_canoniques:51,archives_renfo:17,revues_reprise:30,courant_a_verifier:16,mixte:10,v1_depassee:4,destructions_autorisees:0};
}
module.exports={validate};
if(require.main===module){
 try{
  const read=p=>JSON.parse(fs.readFileSync(path.join(HERE,p),"utf8"));
  const parsed=cp.execFileSync("git",["ls-tree","-r",BASE],{cwd:ROOT,encoding:"utf8",maxBuffer:16*1024*1024});
  const files=parsed.trim().split("\n").map(line=>{
    const m=/^[0-7]{6} blob ([a-f0-9]{40})\t(.+)$/.exec(line);
    if(!m)throw Error("Entrée de tree inattendue : "+line);
    return {sha:m[1],path:m[2]};
  });
  const historic=p=>cp.execFileSync("git",["show",BASE+":"+p],{cwd:ROOT,encoding:"utf8",maxBuffer:16*1024*1024});
  console.log("ASSAINISSEMENT : "+JSON.stringify(validate(read("INVENTAIRE-ASSAINISSEMENT.json"),read("REVUE-REPRISE-30-RUBRIQUES.json"),files,historic))+" ; aucune suppression autorisée.");
 }catch(e){console.error("ASSAINISSEMENT : REFUS — "+e.message);process.exitCode=1;}
}
