"use strict";
// Vérification de provenance historique des huit dossiers. Prouve présence de
// fragments dans main, PAS la justesse de leur arbitrage ni un visa Gardien.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const ROOT=path.resolve(__dirname,"../.."),MAIN="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
function verify(d,readHistoric){
 if(d.schemaVersion!==1||d.source_sha_main!==MAIN||d.dossiers?.length!==8||
    d.statut_global!=="huit_dossiers_ouverts_aucun_visa_formel"||
    d.audit_sous_casquette_gardien!=="logique_non_independant"||
    d.fusions_autorisees!==false||d.garmin_ecriture_autorisee!==false||
    d.autorisations_apportees?.length!==0)throw Error("État des dossiers non conforme");
 const wanted=Array.from({length:8},(_,i)=>"INC-"+String(i+1).padStart(3,"0"));
 const seen=new Set(),cache=new Map();
 for(const x of d.dossiers) {
  if(!wanted.includes(x.id)||seen.has(x.id)||x.statut!=="ouvert_qualification_provisoire_non_independante")
    throw Error("Clôture fictive, doublon ou ID inattendu : "+x.id);
  seen.add(x.id);
  if(x.preuves?.length<2||x.priorite_documentaire_proposee?.length<65||
     x.risque_si_erreur?.length<40||x.conditions_de_cloture?.length<55||
     x.arbitrage_et_autorite?.length<40)throw Error("Motivation absente : "+x.id);
  for(const p of x.preuves) {
    if(!/^(AGENTS\.md|docs\/[A-Z-]+\.md|adaptateurs\/[a-z/]+\.cjs|adaptateurs\/garmin\/MCP\.md)$/.test(p.path)||
       !Number.isInteger(p.ligne)||p.ligne<1||p.fragment.length<12||
       p.permalien!==`https://github.com/hameaufl/programme-sport/blob/${MAIN}/${p.path}#L${p.ligne}`)
      throw Error("Preuve invalide : "+x.id);
    if(!cache.has(p.path))cache.set(p.path,readHistoric(p.path).split(/\r?\n/));
    if(!cache.get(p.path)[p.ligne-1]?.includes(p.fragment))throw Error("Fragment pas au bon SHA/ligne : "+x.id+" "+p.path+":"+p.ligne);
  }
 }
 return {dossiers:seen.size,preuves:[...d.dossiers].reduce((n,x)=>n+x.preuves.length,0),statut:"ouverts_sans_visa"};
}
module.exports={verify};
if(require.main===module){
 try{
  const data=JSON.parse(fs.readFileSync(path.join(__dirname,"referentiel","QUALIFICATIONS-INC-001-008.json"),"utf8"));
  const read=p=>cp.execFileSync("git",["show",MAIN+":"+p],{cwd:ROOT,encoding:"utf8",maxBuffer:16*1024*1024});
  console.log("QUALIFICATIONS INC : "+JSON.stringify(verify(data,read))+" — présence de sources uniquement ; priorités non validées.");
 }catch(e){console.error("QUALIFICATIONS INC : REFUS — "+e.message);process.exitCode=1;}
}
