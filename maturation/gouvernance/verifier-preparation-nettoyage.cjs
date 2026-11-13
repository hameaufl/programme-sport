"use strict";
// Reproduit 39 recherches exactes de références et vérifie 26 sources candidates.
// Aucun verdict ici n'est une validation sémantique ou une autorisation de suppression.
const fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const HERE=__dirname,ROOT=path.resolve(__dirname,"../..");
const BASE="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
function demand(ok,msg){if(!ok)throw Error(msg);}
function verify(deps,proposals,anomalies,readMain,files){
 demand(deps.schemaVersion===1&&deps.source_sha_main===BASE&&deps.quantite_fichiers_analyses===39&&
  deps.statut==="revue_interne_partielle_non_destructive","Étude des dépendances manquante ou validée fictivement");
 const set=new Set(deps.fichiers_analyses),filesSet=new Set(files);
 demand(set.size===39&&deps.fichiers_analyses.every(p=>filesSet.has(p)),"Corpus de 39 fichiers non concordant avec main");
 demand(deps.cibles?.length===5,"Cinq candidats documentaires requis");
 const targets=new Set(["docs/REPRISE.md","docs/CONTEXTE.md","maturation/architecture/README-personnel-historique.md",
   "scripts/migration-preuve.json","adaptateurs/README.md"]);
 const texts=new Map(deps.fichiers_analyses.map(p=>[p,readMain(p)]));
 for(const t of deps.cibles){
  demand(targets.delete(t.target)&&t.suppression_autorisee===false&&
   t.dependances_externes_verifiees===false,"Suppression autorisée ou cible invalide : "+t.target);
  const actual=deps.fichiers_analyses.filter(p=>p!==t.target&&texts.get(p).includes(t.target)).sort();
  demand(actual.join("|")===t.sites.slice().sort().join("|"),"Dépendances internes incohérentes : "+t.target);
 }
 demand(targets.size===0,"Cible de nettoyage absente");
 demand(proposals.schemaVersion===1&&proposals.source_sha_main===BASE&&
  proposals.statut==="propositions_non_appliquees_de_second_passage"&&proposals.corrections?.length===26,
  "Les propositions de provenance ne doivent pas être présentées comme appliquées");
 const expected=new Set(anomalies.attributions.filter(x=>x.statut==="ancre_historiquement_non_pertinente"||
  x.statut==="section_plausible_ligne_non_probante").map(x=>x.id));
 demand(expected.size===26,"Les 26 anomalies initiales manquent");
 const counts={directe:0,partielle:0,insuffisante:0,provenance_a_arbitrer:0};
 for(const p of proposals.corrections){
  demand(expected.delete(p.id)&&Object.hasOwn(counts,p.statut_proposition)&&
   p.applique_dans_matrice===false&&p.certification_semantique===false,
   "Ancre requalifiée ou appliquée sans preuve : "+p.id);
  counts[p.statut_proposition]++;
  if(p.id==="REF-06")
   demand(p.statut_proposition==="provenance_a_arbitrer"&&p.candidat_source===null,
    "REF-06 ne peut être promue à une règle de main");
  else{
   const s=p.candidat_source;
   demand(s?.sha===BASE&&filesSet.has(s.path)&&Number.isInteger(s.line)&&s.line>=1&&
    s.url===`https://github.com/hameaufl/programme-sport/blob/${BASE}/${s.path}#L${s.line}`&&
    readMain(s.path).split(/\r?\n/)[s.line-1]!==undefined,
    "Clause source candidate absente : "+p.id);
  }
 }
 demand(expected.size===0&&counts.directe===17&&counts.partielle===7&&
  counts.insuffisante===1&&counts.provenance_a_arbitrer===1,"Comptage ou portée des ancrages incorrects");
 return{fichiers_parcourus:39,candidats_nettoyage:5,ancrages_proposes:26,directs:17,partiels:7,insuffisants:1,
   nouveau_conflit_provenance:1,suppressions_autorisees:0,corrections_matrice_appliquees:0};
}
module.exports={verify};
if(require.main===module){
 try{
 const read=p=>JSON.parse(fs.readFileSync(path.join(HERE,p),"utf8"));
 const list=cp.execFileSync("git",["ls-tree","-r","--name-only",BASE],{cwd:ROOT,encoding:"utf8"}).trim().split("\n");
 const cache=new Map();
 const main=p=>{if(!cache.has(p))cache.set(p,cp.execFileSync("git",["show",BASE+":"+p],{cwd:ROOT,encoding:"utf8",maxBuffer:16*1024*1024}));return cache.get(p);};
 const v=verify(read("ETUDE-DEPENDANCES-NETTOYAGE.json"),read("PROPOSITIONS-26-ANCRAGES.json"),read("AUDIT-ANCRAGES-SEMANTIQUES.json"),main,list);
 console.log("MINILOT NETTOYAGE : "+JSON.stringify(v)+" — statut préparatoire, sans suppression ni nouvelle norme.");
 }catch(e){console.error("MINILOT NETTOYAGE : REFUS — "+e.message);process.exitCode=1;}
}
