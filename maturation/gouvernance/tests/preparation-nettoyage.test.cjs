"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),path=require("node:path"),fs=require("node:fs"),cp=require("node:child_process");
const {verify}=require("../verifier-preparation-nettoyage.cjs");
const root=path.resolve(__dirname,"../../.."),base="d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4";
const load=p=>JSON.parse(fs.readFileSync(path.join(root,"maturation/gouvernance",p),"utf8"));
const deps=load("ETUDE-DEPENDANCES-NETTOYAGE.json"),props=load("PROPOSITIONS-26-ANCRAGES.json"),anoms=load("AUDIT-ANCRAGES-SEMANTIQUES.json");
const files=cp.execFileSync("git",["ls-tree","-r","--name-only",base],{cwd:root,encoding:"utf8"}).trim().split("\n");
const cache=new Map(),read=p=>{if(!cache.has(p))cache.set(p,cp.execFileSync("git",["show",base+":"+p],{cwd:root,encoding:"utf8"}));return cache.get(p);};
test("39 références internes et 26 propositions réellement préparées sans suppression",()=>{
 const v=verify(deps,props,anoms,read,files);assert.equal(v.fichiers_parcourus,39);assert.equal(v.suppressions_autorisees,0);
});
test("Un lien entrant omis empêche de retirer une documentation",()=>{
 const x=structuredClone(deps);x.cibles.find(y=>y.target==="docs/REPRISE.md").sites=[];
 assert.throws(()=>verify(x,props,anoms,read,files));
});
test("Une suppression ou validation externe auto-déclarée est refusée",()=>{
 const x=structuredClone(deps);x.cibles[0].suppression_autorisee=true;assert.throws(()=>verify(x,props,anoms,read,files));
 const y=structuredClone(deps);y.cibles[1].dependances_externes_verifiees=true;assert.throws(()=>verify(y,props,anoms,read,files));
});
test("REF-06 ne peut devenir une obligation historique par opportunisme",()=>{
 const x=structuredClone(props);x.corrections.find(y=>y.id==="REF-06").statut_proposition="directe";
 assert.throws(()=>verify(deps,x,anoms,read,files));
});
test("La revue de 26 ancrages ne peut se transformer en validation sans preuve",()=>{
 const x=structuredClone(props);x.corrections[0].applique_dans_matrice=true;assert.throws(()=>verify(deps,x,anoms,read,files));
 const y=structuredClone(props);y.corrections[0].certification_semantique=true;assert.throws(()=>verify(deps,y,anoms,read,files));
});
