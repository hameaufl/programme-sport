"use strict";
// Audit structurel des 87 rubriques restantes ; jamais une certification sémantique.
// Ne change ni les permissions, ni les données métier, ni les archives historiques.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const ROOT=path.resolve(__dirname,"../..");
const BASE="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const PATHS={"AGENTS.md":53,"docs/CONTRAT-CONTINUITE-COACH.md":14,
"docs/PROCEDURE-MIROIR-WEB.md":5,"adaptateurs/garmin/MCP.md":11,"contrats/DEPENDANCES.md":4};
const COUNTS={courant_a_verifier:54,mixte_v1_v2_a_scinder:24,ancienne_procedure_v1_explicitement_depassee:5,etat_date_non_prescriptif:4};
const OLD=new Set(["AGN-26","AGN-33","AGN-34","AGN-35","AGN-50"]);
const DATED=new Set(["AGN-06","AGN-10","AGN-27","MCP-06"]);
const CONFLICT=new Set(["AGN-03","AGN-04","AGN-05","AGN-24","AGN-29","AGN-44","AGN-49","AGN-51","AGN-52","AGN-53","CON-06","CON-13","MCP-03","MCP-04","MCP-07","MCP-08","MCP-11"]);
function show(sha,file){return cp.execFileSync("git",["show",sha+":"+file],{cwd:ROOT,encoding:"utf8",maxBuffer:32*1024*1024});}
function verify(data,invent,otherReviews,reader=show){
 if(data.schemaVersion!==1||data.source_main_sha!==BASE||
 data.rubriques_couvertes!==87||data.rubriques?.length!==87||
 data.certification_semantique_exhaustive!==false||
 data.modification_operationnelle_appliquee!==false||
 data.autorisation_garmin_nouvelle!==false||data.visa_gardien!==false||
 invent.source_sha_main!==BASE||invent.nombre_rubriques_main!==161)
 throw Error("Inventaire non conforme ou validation indue");
 const count=Object.fromEntries(Object.keys(COUNTS).map(s=>[s,0]));
 const sections=new Map(invent.sections.map(x=>[x.section,x]));
 const all=[], taken=new Set(), observedFiles={};
 for(const [file,expected] of Object.entries(PATHS)){
  const text=reader(BASE,file),lines=text.split(/\r?\n/);
  const headers=lines.map((raw,i)=>({raw,line:i+1,title:raw.replace(/^#{2,4}\s/,"")})).filter(x=>/^#{2,4}\s/.test(x.raw));
  if(headers.length!==expected)throw Error("Source historique mal indexée : "+file);
  observedFiles[file]={lines,headers};
 }
 for(const row of data.rubriques){
  if(!Object.hasOwn(PATHS,row.source)||row.source_sha!==BASE||
   !Object.hasOwn(COUNTS,row.qualification_preliminaire)||
   row.justification?.length<55||row.verification_semantique_exhaustive!==false||
   row.remplacement_applique!==false||row.autorisation_nouvelle!==false)
   throw Error("Statut faux, non justifié ou permissions implicites : "+row.id);
  const prefix=({"AGENTS.md":"AGN","docs/CONTRAT-CONTINUITE-COACH.md":"CON",
   "docs/PROCEDURE-MIROIR-WEB.md":"WEB","adaptateurs/garmin/MCP.md":"MCP",
   "contrats/DEPENDANCES.md":"DEP"})[row.source];
  const index=Number(row.id?.slice(prefix.length+1))-1;
  if(!/^([A-Z]{3})-\d{2}$/.test(row.id)||row.id!==prefix+"-"+String(index+1).padStart(2,"0")||
   index<0||index>=PATHS[row.source]||taken.has(row.id))
   throw Error("ID hors périmètre, invalide ou répété : "+row.id);
  taken.add(row.id);
  const s=observedFiles[row.source],h=s.headers[index],end=(s.headers[index+1]?.line||s.lines.length+1)-1;
  if(row.ligne_debut!==h.line||row.ligne_fin!==end||row.titre!==h.title)
   throw Error("Bornes ou titre différents du SHA Git : "+row.id);
  const inv=sections.get(row.source+"#L"+row.ligne_debut);
  if(!inv||inv.ligne_fin!==row.ligne_fin||inv.titre!==row.titre)
   throw Error("L'inventaire initial ne corrobore pas : "+row.id);
  if(OLD.has(row.id)&&row.qualification_preliminaire!=="ancienne_procedure_v1_explicitement_depassee")
   throw Error("Ancienne procédure personnelle/FIT réactivée : "+row.id);
  if(DATED.has(row.id)&&row.qualification_preliminaire!=="etat_date_non_prescriptif")
   throw Error("État daté devenu instruction : "+row.id);
  if(CONFLICT.has(row.id)&&row.qualification_preliminaire!=="mixte_v1_v2_a_scinder")
   throw Error("Conflit V1/V2 silencieusement résolu : "+row.id);
  count[row.qualification_preliminaire]++;
  all.push(row.source+"#L"+row.ligne_debut);
 }
 if(taken.size!==87||Object.keys(PATHS).some(p=>data.rubriques.filter(x=>x.source===p).length!==PATHS[p]))
 throw Error("87 rubriques ou répartition incorrectes");
 for(const [key,n] of Object.entries(COUNTS))if(count[key]!==n||data.classes?.[key]!==n)
 throw Error("Classes ou totaux incorrects : "+key);
 if(!Array.isArray(otherReviews)||otherReviews.length!==3)
 throw Error("Trois revues préalables attendues");
 for(const review of otherReviews){
  if(review.source_main_sha!==BASE)throw Error("Revue initiale provenant d'un autre SHA");
  for(const row of review.rubriques){
   if(row.verification_semantique_exhaustive!==false)throw Error("Certification sémantique auto-proclamée");
   all.push(row.source+"#L"+row.ligne_debut);
  }
 }
 if(all.length!==161||new Set(all).size!==161||
  all.some(s=>!sections.has(s))||sections.size!==161)
 throw Error("L'inventaire des 161 rubriques n'est pas couvert exactement une fois");
 return {rubriques_preliminaires:161,rubriques_nouvelles:87,classes:count,
  clauses_certifiees:false,autorisations_garmin:false};
}
module.exports={verify,OLD,DATED,CONFLICT};
if(require.main===module){
 try{
 const here=__dirname,read=name=>JSON.parse(fs.readFileSync(path.join(here,name),"utf8"));
 const result=verify(read("REVUE-87-RUBRIQUES-RESTANTES.json"),read("INVENTAIRE-RUBRIQUES-MAIN.json"),[
 read("REVUE-REPRISE-30-RUBRIQUES.json"),read("REVUE-ROLES-29-RUBRIQUES.json"),read("REVUE-COACH-15-RUBRIQUES.json")]);
 console.log("161 RUBRIQUES (classification uniquement) : "+JSON.stringify(result));
 }catch(err){console.error("161 RUBRIQUES : REFUS — "+err.message);process.exitCode=1;}
}
