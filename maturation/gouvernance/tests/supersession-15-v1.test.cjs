"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const ROOT=path.resolve(__dirname,"../../.."),dir=path.resolve(__dirname,"..");
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name),"utf8"));
const doc=read("PROPOSITIONS-SUPERSESSION-15-V1.json");
const original=doc.source_catalogues.flatMap(x=>read(x).rubriques);
const txt=(sha,file)=>cp.execFileSync("git",["show",sha+":"+file],{cwd:ROOT,encoding:"utf8"}).split(/\r?\n/);
test("15 sections V1 obsolètes, sans aucune suppression, permise ou annoncée",()=>{
 assert.equal(doc.total,15);assert.equal(doc.entrees.length,15);
 assert.equal(doc.certification_complete,false);assert.equal(doc.autorisation_supprimer,false);
 assert.equal(doc.modification_document_production,false);assert.equal(doc.reclassement_des_anciens_titres,false);
 assert.equal(new Set(doc.entrees.map(x=>x.id)).size,15);
 const old=original.filter(x=>x.qualification_preliminaire==="ancienne_procedure_v1_explicitement_depassee");
 assert.equal(old.length,15);
 assert.deepEqual(new Set(doc.entrees.map(x=>x.id)),new Set(old.map(x=>x.id)));
});
test("Les 15 liens de remplacement partiel sont ancrés à des lignes réelles sans équivalence fictive",()=>{
 const cache=new Map(),lines=(sha,file)=>{const key=sha+":"+file;if(!cache.has(key))cache.set(key,txt(sha,file));return cache.get(key);};
 for(const row of doc.entrees){
  const o=original.find(x=>x.id===row.id),a=row.source_historique,b=row.destination_v2_partielle;
  assert.ok(o);assert.equal(a.sha,doc.source_historique_sha);
  assert.equal(a.chemin,o.source);assert.equal(a.debut,o.ligne_debut);assert.equal(a.fin,o.ligne_fin);assert.equal(a.titre,o.titre);
  assert.equal(lines(a.sha,a.chemin)[a.debut-1].replace(/^#{2,4}\s/,""),a.titre);
  assert.equal(b.sha,doc.reference_courante);
  assert.ok(lines(b.sha,b.chemin)[b.ligne-1].includes(b.fragment),"Preuve V2 introuvable "+row.id);
  assert.equal(row.examen_clause_complet,false);
  assert.equal(row.ancien_fragment_supprime,false);
  assert.equal(row.source_remplacee,false);
  assert.equal(row.autorisation_modification_main,false);
 }
});
