"use strict";
// Audit ciblé COM-03 à COM-09 : contrôle de la traçabilité des 26 points, PAS certification sémantique.
// Aucune consultation ni écriture dans Garmin Connect : sources Git figées exclusivement.
const fs=require("node:fs"),cp=require("node:child_process"),path=require("node:path");
const ROOT=path.resolve(__dirname,"../..");
const OLD="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const MAIN="e28b8cac98d20b78fd4835392b53afeeed18c234";
const SOURCE="docs/COACH-MODE-OPERATOIRE.md";
const ALLOWED=new Set(["alignement_v2","arbitrage_requis","instruction_supplantee","verification_distante_absente","historique_contradictoire"]);
const BLOCKED=new Set(["CL-02","CL-03","CL-15"]);
const RANGES={"COM-03":[19,26],"COM-04":[27,34],"COM-05":[35,41],"COM-06":[42,45],"COM-07":[46,49],"COM-08":[50,53],"COM-09":[54,60]};
function show(sha,file){
 return cp.execFileSync("git",["show",sha+":"+file],{cwd:ROOT,encoding:"utf8",maxBuffer:8*1024*1024});
}
function verify(data,read=show){
 if(data.schemaVersion!==1||data.source_historique_sha!==OLD||
 data.reference_v2_sha!==MAIN||data.total_points!==26||data.clauses?.length!==26||
 data.certification_clause_par_clause_complete!==false||
 data.garmin_ecriture_autorisee!==false||data.arbitrages_clos!==0)
 throw Error("L'audit prétend à une certification ou autorisation non acquise");
 const cache=new Map(), counts=Object.fromEntries([...ALLOWED].map(x=>[x,0]));
 const line=(sha,file,n)=>{
  const key=sha+":"+file;
  if(!cache.has(key))cache.set(key,read(sha,file).split(/\r?\n/));
  const lines=cache.get(key);
  if(!Number.isInteger(n)||n<1||n>lines.length)throw Error("Numéro de ligne impossible : "+key+"#L"+n);
  return lines[n-1];
 };
 for(let i=0;i<26;i++){
  const x=data.clauses[i],id="CL-"+String(i+1).padStart(2,"0");
  if(!x||x.id!==id||!/COM-0[3-9]/.test(x.rubrique)||!ALLOWED.has(x.classe)||
   x.analyse?.length<70||x.certification_exhaustive!==false||
   x.autorisation_garmin_nouvelle!==false||x.correction_operationnelle_appliquee!==false)
   throw Error("Attribution sémantique non justifiée : "+id);
  const range=RANGES[x.rubrique];
  if(!range||x.source?.ligne<range[0]||x.source?.ligne>range[1])
   throw Error("Clause classée dans une mauvaise rubrique : "+id);
  if(x.source?.chemin!==SOURCE||x.source?.sha!==OLD||
   x.preuve?.sha!==MAIN||!x.preuve?.chemin||x.preuve?.chemin.startsWith("/")||
   !x.source.fragment_attendu||!x.preuve.fragment_attendu||
   !line(x.source.sha,x.source.chemin,x.source.ligne).includes(x.source.fragment_attendu)||
   !line(x.preuve.sha,x.preuve.chemin,x.preuve.ligne).includes(x.preuve.fragment_attendu))
   throw Error("Preuve ou ancrage Git invalide : "+id);
  if(BLOCKED.has(id)&&x.classe!=="arbitrage_requis")
   throw Error("Permission Garmin déclarée résolue sans arbitrage : "+id);
  counts[x.classe]++;
 }
 for(const [k,v] of Object.entries(counts))if(data.classes?.[k]!==v)
 throw Error("Décompte des clauses altéré : "+k);
 if(Object.keys(data.classes||{}).length!==5)
 throw Error("Classes imprévues");
 return {points:26,classes:counts,arbitrages_clos:0,garmin_ecriture_autorisee:false,certification:false};
}
module.exports={verify};
if(require.main===module){
 try{
 const data=JSON.parse(fs.readFileSync(path.join(__dirname,"REVUE-CLAUSES-COACH-COM03-COM09.json"),"utf8"));
 console.log("REVUE CLAUSES COACH : "+JSON.stringify(verify(data)));
 }catch(e){console.error("REVUE CLAUSES COACH : REFUS — "+e.message);process.exitCode=1;}
}
