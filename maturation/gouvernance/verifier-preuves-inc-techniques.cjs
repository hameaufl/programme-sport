"use strict";
// Quatre dossiers INC : présence de preuves techniques au SHA main approuvé.
// PAS clôture d'incident, PAS validation de politique, PAS appel Garmin/API externe.
const cp=require("node:child_process"),path=require("node:path"),fs=require("node:fs");
const ROOT=path.resolve(__dirname,"../..");
const MAIN="e28b8cac98d20b78fd4835392b53afeeed18c234";
function git(...args){return cp.execFileSync("git",args,{cwd:ROOT,encoding:"utf8",maxBuffer:16*1024*1024});}
function snapshot(){
 const paths=git("ls-tree","-r","--name-only",MAIN).trim().split("\n").filter(Boolean);
 const read=file=>git("show",MAIN+":"+file);
 return {paths,bank:read("addons/web/public/assets/renfo/banque.json"),
 projection:read("adaptateurs/projections/lecture.cjs"),
 verifierSite:read("scripts/verifier-site.cjs"),
 verifierPublication:read("maturation/architecture/verifier-publication.cjs"),
 modeGarmin:read("adaptateurs/garmin/README.md")};
}
function verify(a,simulation){
 const paths=new Set(a.paths);
 if([...paths].some(x=>x.startsWith("personnel/")))
 throw Error("INC-002 : une source monolithique personnel existe au SHA contrôlé");
 if(paths.has("scripts/generer-garmin.cjs")||[...paths].some(x=>/\.fit$/i.test(x)))
 throw Error("INC-001 : ancien générateur ou FIT local actif dans le tree de main");
 if(!a.verifierPublication.includes('!/\\.fit$/i')||
 !a.verifierSite.includes('Ancien fichier monolithique maintenu'))
 throw Error("INC-001/002 : un contrôle de non-régression attendu manque");
 const bank=JSON.parse(a.bank);
 if(bank.schemaVersion!==2||bank.images?.length!==5)
 throw Error("INC-007 : banque V2 introuvable ou nombre d'images imprévu");
 const ids=new Set();
 for(const entry of bank.images){
  if(!entry.mouvementId||!/^assets\/renfo\/png\/[a-z0-9-]+\.png$/.test(entry.png)||
   ids.has(entry.mouvementId)||!paths.has("addons/web/public/"+entry.png))
    throw Error("INC-007 : banque d'images orpheline ou dupliquée");
  ids.add(entry.mouvementId);
 }
 if(!a.projection.includes("images.get(b.mouvementId)")||
 !a.projection.includes("Illustration absente")||
 !a.verifierSite.includes("Une aide PNG par exercice réel"))
 throw Error("INC-007 : relation bloc vers PNG ou cas de refus non présente");
 const scenarios=JSON.parse(simulation);
 if(scenarios.mode!=="simulation_sans_ecriture"||scenarios.scenarios?.length!==10||
 scenarios.scenarios.some(x=>!x.interdits?.includes("ecriture_git")||!x.interdits?.includes("ecriture_garmin")))
 throw Error("INC-008 : simulation sans écriture non protégée");
 if(!a.modeGarmin.includes("demande explicite"))
 throw Error("INC-008 : frontière lecture seule Garmin manquante dans la référence");
 return {sha_main:MAIN,inc001_fit_local_absent:true,inc002_personnel_absent:true,
 inc007_png_images:bank.images.length,inc008_simulations_sans_ecriture:10,
 incidents_fermes:0,autorisation_garmin:false,preuve_comportementale:false};
}
module.exports={verify};
if(require.main===module){
 try{
 const simulation=fs.readFileSync(path.join(__dirname,"SCENARIOS-SIMULATION.json"),"utf8");
 console.log("PREUVES TECHNIQUES INC (sans clôture) : "+JSON.stringify(verify(snapshot(),simulation)));
 }catch(err){console.error("PREUVES INC REFUS : "+err.message);process.exitCode=1;}
}
