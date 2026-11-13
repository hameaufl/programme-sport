"use strict";
// Validation STRUCTURELLE de l'inventaire historique et des annotations d'audit.
// Les statuts de pertinence sont des jugements préparatoires humains, non certifiés par ce script.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const ROOT=path.resolve(__dirname,"../.."),HERE=__dirname;
const MAIN="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const EXPECTED=["AGENTS.md","docs/ROLES.md","docs/COACH-MODE-OPERATOIRE.md","docs/CONTRAT-CONTINUITE-COACH.md","docs/REPRISE.md","docs/PROCEDURE-MIROIR-WEB.md","adaptateurs/garmin/MCP.md","contrats/DEPENDANCES.md"];
const STATUSES={
 provenance_nouvelle_confondue_avec_source_historique:12,
 ancre_historiquement_non_pertinente:13,
 section_plausible_ligne_non_probante:13,
 ancre_plausible_non_certifiee:47
};
function verify(inventory,anomalies,coverage,readMain) {
 if(inventory.source_sha_main!==MAIN||inventory.nombre_rubriques_main!==161||
   inventory.nombre_rubriques_premier_inventaire!==162||anomalies.source_sha_main!==MAIN||
   inventory.attribution_familles_total!==85||coverage.attributions?.length!==85)
  throw Error("SHA ou versions/couverture incohérents");
 const sections=inventory.sections;
 if(!Array.isArray(sections)||sections.length!==161||
    anomalies.attributions?.length!==85)throw Error("Rubriques ou attributions non dénombrées");
 const found=new Set(),sources=new Map();
 for(const p of EXPECTED){
  const lines=readMain(p).split(/\r?\n/);sources.set(p,lines);
  const heads=lines.map((s,i)=>({line:i+1,title:s.replace(/^#{2,4}\s/,"")})).
   filter((x,i)=>/^#{2,4}\s/.test(lines[i]));
  const actual=sections.filter(x=>x.section.startsWith(p+"#L"));
  if(actual.length!==heads.length||actual.some((x,i)=>x.ligne_debut!==heads[i].line||x.titre!==heads[i].title||
     x.source_sha!==MAIN||x.evaluation_semantique!=="non_certifiee_sans_lecture_clause_par_clause"))
    throw Error("Inventaire historique erroné : "+p);
  for(const v of actual){
    if(found.has(v.section))throw Error("Doublon rubrique");found.add(v.section);
  }
 }
 if(found.size!==161||inventory.sources["AGENTS.md"].rubriques_main!==53||
   inventory.sources["AGENTS.md"].rubriques_inventaire_initial!==54)throw Error("Différence 161/162 non justifiée");
 const coverMap=new Map(coverage.attributions.map(x=>[x.id,x]));
 const counts=Object.fromEntries(Object.keys(STATUSES).map(k=>[k,0]));
 const seen=new Set();
 for(const v of anomalies.attributions){
  if(seen.has(v.id)||!coverMap.has(v.id)||!Object.hasOwn(STATUSES,v.statut))throw Error("ID/statut manquant ou doublé");
  seen.add(v.id);counts[v.statut]++;
  const m=/\/blob\/([a-f0-9]{40})\/([^#)]+)#L(\d+)\)/.exec(coverMap.get(v.id).source_historique);
  if(!m||m[1]!==MAIN||m[2]!==v.source_origine||Number(m[3])!==v.ligne_origine||
    !sources.get(m[2])?.[v.ligne_origine-1])throw Error("Ligne source manquante : "+v.id);
 }
 for(const [k,n] of Object.entries(STATUSES))if(counts[k]!==n||anomalies.compteurs[k]!==n||
    inventory.comptes_anomalies[k]!==n)throw Error("Comptage anomalies incorrect : "+k);
 const anchored=sections.filter(x=>x.nombre_ancrages>0).length;
 if(anchored!==42||inventory.sections_avec_attribution_directe!==42||
    inventory.sections_sans_attribution_directe!==119)throw Error("Nombre de rubriques ancrées incohérent");
 return {rubriques_main:161,exigences:85,rubriques_avec_ancrage:42,provenances_nouvelles:12,ancres_hors_sujet:13,imprecises:13,certification_semantique:"NON"};
}
module.exports={verify};
if(require.main===module){
 try{
 const read=p=>JSON.parse(fs.readFileSync(path.join(HERE,p),"utf8"));
 const im=read("INVENTAIRE-RUBRIQUES-MAIN.json"),a=read("AUDIT-ANCRAGES-SEMANTIQUES.json"),c=read("COUVERTURE-PROTOCOLES.json");
 const historic=p=>cp.execFileSync("git",["show",MAIN+":"+p],{cwd:ROOT,encoding:"utf8",maxBuffer:16*1024*1024});
 console.log("AUDIT SEMANTIQUE PRÉLIMINAIRE : "+JSON.stringify(verify(im,a,c,historic)));
 }catch(e){console.error("AUDIT SEMANTIQUE PRÉLIMINAIRE : REFUS — "+e.message);process.exitCode=1;}
}
