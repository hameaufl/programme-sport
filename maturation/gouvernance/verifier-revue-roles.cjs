"use strict";
// Vérification de la revue provisoire des 29 sections de rôles (sans certification).
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const HERE=__dirname,ROOT=path.resolve(__dirname,"../..");
const BASE="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const OLD=new Set(["ROL-10","ROL-15","ROL-16","ROL-17","ROL-20","ROL-29"]);
function verify(review,text){
 if(review.schemaVersion!==1||review.source_main_sha!==BASE||review.source!=="docs/ROLES.md"||
   review.rubriques_couvertes_par_revue_preliminaire!==29||review.rubriques?.length!==29)
   throw Error("Revue des 29 rubriques incomplète");
 const lines=text.split(/\r?\n/),heads=lines.map((s,i)=>({line:i+1,title:s.replace(/^#{2,4}\s/,"")})).filter((x,i)=>/^#{2,4}\s/.test(lines[i]));
 if(heads.length!==29)throw Error("La source historique ne comporte pas 29 rubriques");
 const counts={courant_a_verifier:0,mixte_v1_v2_a_scinder:0,ancienne_procedure_v1_explicitement_depassee:0};
 for(let i=0;i<29;i++){
  const x=review.rubriques[i],h=heads[i],end=(heads[i+1]?.line||lines.length+1)-1;
  if(x.id!=="ROL-"+String(i+1).padStart(2,"0")||x.ligne_debut!==h.line||
     x.ligne_fin!==end||x.titre!==h.title||x.source_sha!==BASE||
     x.verification_semantique_exhaustive!==false||x.remplacement_applique!==false||
     !Object.hasOwn(counts,x.qualification_preliminaire)||x.justification?.length<55)
    throw Error("Ancrage ou qualification non justifiée : "+x.id);
  if(OLD.has(x.id)&&x.qualification_preliminaire!=="ancienne_procedure_v1_explicitement_depassee")
    throw Error("V1 réactivée sans arbitrage : "+x.id);
  counts[x.qualification_preliminaire]++;
 }
 if(counts.courant_a_verifier!==16||counts.mixte_v1_v2_a_scinder!==7||
    counts.ancienne_procedure_v1_explicitement_depassee!==6)
  throw Error("Décompte non conforme");
 return {rubriques:29,courantes_a_verifier:16,mixtes:7,anciennes_v1:6,regles_activees:0};
}
module.exports={verify};
if(require.main===module){
 try{
 const data=JSON.parse(fs.readFileSync(path.join(HERE,"REVUE-ROLES-29-RUBRIQUES.json"),"utf8"));
 const src=cp.execFileSync("git",["show",BASE+":docs/ROLES.md"],{cwd:ROOT,encoding:"utf8"});
 console.log("REVUE ROLES V2 : "+JSON.stringify(verify(data,src))+" ; revue par rubrique, non exhaustive.");
 }catch(e){console.error("REVUE ROLES V2 : REFUS — "+e.message);process.exitCode=1;}
}
