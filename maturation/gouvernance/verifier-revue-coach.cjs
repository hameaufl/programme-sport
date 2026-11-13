"use strict";
// Contrôle structurel de la revue préliminaire Coach : aucune certification de sens ou de permission.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const ROOT=path.resolve(__dirname,"../..");
const BASE="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const SOURCE="docs/COACH-MODE-OPERATOIRE.md";
const STATES=["courant_a_verifier","mixte_a_scinder","etat_date_depasse_non_prescriptif"];
const HISTORICAL=new Set(["COM-06","COM-08"]);
const MIXED=new Set(["COM-03","COM-04","COM-05","COM-07","COM-09"]);
function verify(a,src){
 if(a.schemaVersion!==1||a.source_main_sha!==BASE||a.source!==SOURCE||
 a.rubriques_couvertes_par_revue_preliminaire!==15||a.rubriques?.length!==15||
 a.certification_semantique_exhaustive!==false||a.activation_autorisee!==false)
 throw Error("Périmètre faux ou activation revendiquée");
 const lines=src.split(/\r?\n/);
 const heads=lines.map((s,i)=>({n:i+1,title:s.replace(/^#{2,4}\s/,""),raw:s}))
 .filter(o=>/^#{2,4}\s/.test(o.raw));
 if(heads.length!==15)throw Error("Source historique : 15 rubriques attendues");
 const count=Object.fromEntries(STATES.map(x=>[x,0]));
 for(let i=0;i<heads.length;i++){
 const v=a.rubriques[i],h=heads[i],end=(heads[i+1] ? heads[i+1].n-1 : lines.length);
 if(!v||v.id!=="COM-"+String(i+1).padStart(2,"0")||v.source!==SOURCE||
 v.source_sha!==BASE||v.ligne_debut!==h.n||v.ligne_fin!==end||
 v.titre!==h.title||!STATES.includes(v.qualification_preliminaire)||
 v.justification?.length<60||v.verification_semantique_exhaustive!==false||
 v.remplacement_applique!==false||v.autorisation_nouvelle!==false||
 !Array.isArray(v.lignes_cles)||!v.lignes_cles.length||
 v.lignes_cles.some(n=>!Number.isInteger(n)||n<v.ligne_debut||n>v.ligne_fin))
 throw Error("Rubrique non vérifiable ou droit indu : "+(v?.id||i));
 if(HISTORICAL.has(v.id)&&v.qualification_preliminaire!=="etat_date_depasse_non_prescriptif")
 throw Error("Ancien état réactivé : "+v.id);
 if(MIXED.has(v.id)&&v.qualification_preliminaire!=="mixte_a_scinder")
 throw Error("Contradiction datée prise pour une obligation : "+v.id);
 count[v.qualification_preliminaire]++;
 }
 if(count.courant_a_verifier!==8||count.mixte_a_scinder!==5||
 count.etat_date_depasse_non_prescriptif!==2||
 STATES.some(k=>a.classes?.[k]!==count[k]))
 throw Error("Décompte ou catégories non conformes");
 return {rubriques:15,...count,activation_autorisee:false,certification:false};
}
module.exports={verify};
if(require.main===module){
 try{
 const a=JSON.parse(fs.readFileSync(path.join(__dirname,"REVUE-COACH-15-RUBRIQUES.json"),"utf8"));
 const src=cp.execFileSync("git",["show",BASE+":"+SOURCE],{cwd:ROOT,encoding:"utf8"});
 console.log("REVUE COACH (structure seule) : "+JSON.stringify(verify(a,src)));
 }catch(e){console.error("REVUE COACH REFUS : "+e.message);process.exitCode=1;}
}
