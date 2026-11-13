"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const {validate}=require("../verifier-assainissement.cjs"),ROOT=path.resolve(__dirname,"../../.."),HERE=path.resolve(__dirname,"..");
const read=p=>JSON.parse(fs.readFileSync(path.join(HERE,p),"utf8"));
const i=read("INVENTAIRE-ASSAINISSEMENT.json"),r=read("REVUE-REPRISE-30-RUBRIQUES.json"),BASE="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const blobs=cp.execFileSync("git",["ls-tree","-r",BASE],{cwd:ROOT,encoding:"utf8"}).trim().split("\n").map(l=>{const m=/^[0-7]{6} blob ([a-f0-9]{40})\t(.+)$/.exec(l);return {sha:m[1],path:m[2]}});
const hist=p=>cp.execFileSync("git",["show",BASE+":"+p],{cwd:ROOT,encoding:"utf8"});
test("143 objets de main et 30 rubriques préservés ; aucune suppression autorisée",()=>{
 const v=validate(i,r,blobs,hist);assert.equal(v.fichiers,143);assert.equal(v.archives_renfo,17);assert.equal(v.destructions_autorisees,0);
});
test("Une autorisation destructive inventée doit être refusée",()=>{
 const x=structuredClone(i);x.fichiers[0].suppression_autorisee=true;assert.throws(()=>validate(x,r,blobs,hist));
});
test("Un fichier métier reclassé comme supprimable est refusé",()=>{
 const x=structuredClone(i);x.fichiers.find(v=>v.categorie==="source_metier_canonique").categorie="manuel_architecture_v1";assert.throws(()=>validate(x,r,blobs,hist));
});
test("Une archive Renfo reclassée comme documentation obsolète est refusée",()=>{
 const x=structuredClone(i);x.fichiers.find(v=>v.path.endsWith("/renfo-2026-11-12.json")&&v.path.includes("/archives/")).categorie="manuel_architecture_v1";assert.throws(()=>validate(x,r,blobs,hist));
});
test("Une vieille procédure FIT ne peut être présentée comme validée",()=>{
 const x=structuredClone(r);x.rubriques[13].qualification_preliminaire="courant_a_verifier";assert.throws(()=>validate(i,x,blobs,hist));
});
test("La revue d'une rubrique ne peut inventer une validation exhaustive",()=>{
 const x=structuredClone(r);x.rubriques[28].verification_semantique_exhaustive=true;assert.throws(()=>validate(i,x,blobs,hist));
});
test("Modification de l'arbre Git ou déplacement d'un ancien titre doit échouer",()=>{
 const b=structuredClone(blobs);b[0].sha="0".repeat(40);assert.throws(()=>validate(i,r,b,hist));
 const x=structuredClone(r);x.rubriques[0].ligne_debut=5;assert.throws(()=>validate(i,x,blobs,hist));
});
