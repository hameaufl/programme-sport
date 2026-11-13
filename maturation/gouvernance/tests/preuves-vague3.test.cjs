"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),cp=require("node:child_process"),fs=require("node:fs"),path=require("node:path");
const ROOT=path.resolve(__dirname,"../../.."),data=JSON.parse(fs.readFileSync(path.join(__dirname,"..","INDEX-PREUVES-VAGUE3.json"),"utf8"));
const sh=(...args)=>cp.execFileSync("git",args,{cwd:ROOT,encoding:"utf8",maxBuffer:16*1024*1024});
const main="cf9241b9740be8e6c3f80058a45f76e197a4bb44";
test("L'index conserve exactement six empreintes Git existantes, sans accord de purge",()=>{
 assert.equal(data.main_sha,main);
 assert.equal(data.nombre_pieces,6);
 assert.equal(data.code_inspecte.length,17);
 assert.equal(data.docs_inspectes.length,10);
 assert.equal(data.aucun_fichier_supprime,true);
 assert.equal(data.aucun_fichier_deplace,true);
 assert.equal(data.aucune_donnee_metier_dupliquee,true);
 assert.equal(data.arbitrage_proprietaire_pour_chaque_retrait,true);
 assert.equal(new Set(data.pieces.map(x=>x.path)).size,6);
 for(const p of data.pieces){
  assert.equal(p.statut,"conserver_en_place");
  assert.equal(p.suppression_autorisee,false);
  assert.equal(p.deplacement_autorise,false);
  assert.equal(p.preuves_copies_dans_registre,false);
  const entry=sh("ls-tree",main,"--",p.path);
  const match=/^100644 blob ([a-f0-9]{40})\t([^\n]+)\n?$/.exec(entry);
  assert.ok(match,"Pièce Git introuvable "+p.path);
  assert.equal(match[1],p.blob_sha,p.path);
  assert.equal(match[2],p.path);
  assert.equal(Number(sh("cat-file","-s",p.blob_sha).trim()),p.octets,p.path);
 }
});
test("Le relevé de références littérales est reproductible au SHA fixé, sans lecture des contenus sensibles",()=>{
 const cache=new Map(),lines=(name)=>{if(!cache.has(name))cache.set(name,sh("show",main+":"+name).split(/\r?\n/));return cache.get(name);};
 for(const p of data.pieces){
  const foundCode=data.code_inspecte.filter(name=>lines(name).some(s=>s.includes(p.path)));
  const foundDocs=data.docs_inspectes.filter(name=>name!==p.path&&lines(name).some(s=>s.includes(p.path)));
  assert.deepEqual(foundCode,p.references_litterales_trouvees_dans_17_fichiers_de_code,p.path);
  assert.deepEqual(foundDocs,p.references_litterales_trouvees_dans_10_documents_inspectes,p.path);
 }
});
