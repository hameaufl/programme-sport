"use strict";
// Preuve ponctuelle de migration depuis le commit figé, à exécuter lors de la refonte.
// Ne pas en faire une règle bloquante pour les futures modifications sportives du Coach.
const assert=require("node:assert/strict");
const cp=require("node:child_process"),fs=require("node:fs"),path=require("node:path");
const {ROOT,collect}=require("../../scripts/donnees.cjs");
const base="d701006bc640695861c5eb48c6421cdea398ea0d";
function git(args,encoding="utf8"){return cp.execFileSync("git",args,{cwd:ROOT,encoding,maxBuffer:8*1024*1024});}
function old(path){return git(["show",base+":"+path],null);}
const all=git(["ls-tree","-r","--name-only",base,"personnel/seances"]).trim().split(/\r?\n/).filter(x=>x.endsWith(".json"));
const model=collect(),byId=new Map(model.sessions.map(s=>[s.id,s]));
assert.equal(all.length,36,"Inventaire de référence inattendu");
assert.equal(byId.size,all.length,"Perte ou ajout de séance lors de la migration");
let fits=0;
for(const file of all){
 const original=JSON.parse(old(file).toString("utf8"));
 const session=byId.get(original.id);
 assert.ok(session,"Séance perdue : "+original.id);
 for(const [k,value] of Object.entries(original)){
  if(k==="pieces_jointes"){
   for(const oldRef of value){
    assert.equal(oldRef.format,"fit");
    assert.ok(session.pieces_jointes?.some(x=>x.role===oldRef.role&&x.format===oldRef.format));
    const target="adaptateurs/garmin/fichiers/"+original.id+".fit";
    assert.deepEqual(fs.readFileSync(path.join(ROOT,target)),old(oldRef.chemin),"Octets FIT modifiés : "+original.id);
    fits++;
   }
  }else assert.deepEqual(session[k],value,"Champ altéré lors de la migration : "+original.id+"."+k);
 }
}
assert.equal(fits,33,"Nombre de FIT historique différent");
const moved={
 "personnel/sante/PROFIL.md":"domaines/sante/donnees/PROFIL.md",
 "personnel/sante/SUIVI.md":"domaines/sante/donnees/SUIVI.md",
 "personnel/CONTEXTE-COACH.md":"domaines/coaching/donnees/CONTEXTE-COACH.md",
 "personnel/DECISIONS.md":"domaines/coaching/donnees/DECISIONS.md",
 "personnel/JOURNAL.md":"domaines/coaching/donnees/JOURNAL.md"
};
const historical=git(["ls-tree","-r","--name-only",base,"personnel/sante/rapports","personnel/sante/evenements"]).trim().split(/\r?\n/).filter(Boolean);
for(const file of historical)moved[file]=file.replace("personnel/sante/","domaines/sante/donnees/");
for(const [src,dst] of Object.entries(moved))assert.deepEqual(fs.readFileSync(path.join(ROOT,dst)),old(src),"Archive modifiée : "+src);
console.log("Preuve de migration : 36 séances et leurs champs conservés, 33 FIT et "+Object.keys(moved).length+" fichiers de connaissance et santé identiques.");
