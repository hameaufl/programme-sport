"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const {evaluate}=require("../verifier-autorisations.cjs");
const ROOT=path.resolve(__dirname,"../../.."),DIR=path.resolve(__dirname,"..");
const read=x=>JSON.parse(fs.readFileSync(path.join(DIR,x),"utf8"));
const candidate=read("REF-06-PROVENANCE-CANDIDATE.json"),sim=read("INC-005-CAS-SIMULES.json");
function git(sha,file){return cp.execFileSync("git",["show",sha+":"+file],{cwd:ROOT,encoding:"utf8"}).split(/\r?\n/);}
test("REF-06 : citer la vraie première formulation, sans la promouvoir en obligation historique",()=>{
 const old=git(candidate.referenceHistorique,candidate.lienActuellementDansMatrice.chemin);
 const first=git(candidate.referenceOrigineProposition,candidate.premiereFormulationSpecifique.chemin);
 assert.equal(old[candidate.lienActuellementDansMatrice.ligne-1],candidate.lienActuellementDansMatrice.fragment);
 assert.ok(first[candidate.premiereFormulationSpecifique.ligne-1].includes(candidate.premiereFormulationSpecifique.fragment));
 assert.ok(old[candidate.principeGeneriqueHistorique.ligne-1].includes(candidate.principeGeneriqueHistorique.fragment));
 assert.equal(candidate.provenanceProposee,"proposition_nouvelle_gouvernance");
 assert.equal(candidate.matrice_modifiee,false);
 assert.equal(candidate.adoption_gardien_autorisee,false);
 assert.equal(candidate.arbitrage_proprietaire_obtenu,false);
 assert.deepEqual(candidate.decompte_actuel,{obligations_historiques:73,propositions_nouvelles:12});
 assert.deepEqual(candidate.decompte_candidat_sous_reserve_approbation,{obligations_historiques:72,propositions_nouvelles:13});
});
test("INC-005 : scénarios de refus sans aucune opération distante",()=>{
 assert.equal(sim.schemaVersion,1);
 assert.equal(sim.mode,"simulation_sans_execution");
 assert.equal(sim.nouvelle_permission,false);
 assert.equal(sim.suppression_garmin_effectuee,false);
 assert.equal(sim.inc005_clos,false);
 assert.equal(sim.cas.length,11);
 for(const c of sim.cas)assert.equal(evaluate(c.donnees).statut,c.attendu,"Cas "+c.id);
});
test("INC-005 : un texte historique ne vérifie pas une approbation actuelle",()=>{
 const scenario=sim.cas.find(x=>x.id==="ancienne-demande-simplement-declaree");
 assert.ok(scenario);
 assert.equal(evaluate(scenario.donnees).statut,"admissible_sur_papier");
 assert.notEqual(evaluate(scenario.donnees).statut,"permission_reelle");
 assert.equal(sim.suppression_garmin_effectuee,false);
});
test("INC-005 : refus sur une suppression dans une autre date ou sur un modèle planifié",()=>{
 const change=structuredClone(sim.cas.find(x=>x.id==="autorisation-fictive-complete").donnees);
 change.cible.date="2026-11-14";
 assert.equal(evaluate(change).statut,"refuse");
 change.cible.date="2026-11-13";
 change.cible.planifie=true;
 assert.equal(evaluate(change).statut,"refuse");
});
