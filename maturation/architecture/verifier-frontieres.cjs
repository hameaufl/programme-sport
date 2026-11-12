"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const ROOT=path.resolve(__dirname,"../..");
const domaines=["planification","activites","sante","coaching"];
function visit(dir){if(!fs.existsSync(dir))return [];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
 const p=path.join(dir,e.name);if(e.isSymbolicLink())throw Error("Lien symbolique non autorisé : "+p);
 return e.isDirectory()?visit(p):e.isFile()?[p]:[];
});}
assert.ok(!fs.existsSync(path.join(ROOT,"personnel")),"Monolithe personnel toujours présent");
assert.ok(!fs.existsSync(path.join(ROOT,"index.html")),"La page ne doit plus être racine du domaine");
assert.ok(!fs.existsSync(path.join(ROOT,"sante.html")),"La santé Web ne doit plus être à la racine");
for(const domaine of domaines){
 const root=path.join(ROOT,"domaines",domaine);
 for(const f of visit(root)){
  if(f.endsWith(".cjs")){
   const code=fs.readFileSync(f,"utf8");
   assert.ok(!/require\([^)]*(?:adaptateurs|addons|scripts|maturation)/.test(code),"Import de couche extérieure : "+f);
   assert.ok(!/node:fs|node:path|fetch\(|localStorage/.test(code),"Domaine dépendant d'une implémentation : "+f);
  }
 }
}
const plans=visit(path.join(ROOT,"domaines/planification/donnees/seances")).filter(x=>x.endsWith(".json"));
const execs=visit(path.join(ROOT,"domaines/activites/donnees/seances")).filter(x=>x.endsWith(".json"));
const obs=visit(path.join(ROOT,"domaines/sante/donnees/ressentis/seances")).filter(x=>x.endsWith(".json"));
assert.ok(plans.length>0);
for(const f of plans){
 const p=JSON.parse(fs.readFileSync(f,"utf8"));
 for(const k of ["fait","sensations","exercicesRealises","structuresSollicitees","pieces_jointes","aidesExercices","etapes"])
  assert.ok(!Object.hasOwn(p,k),"Plan métier pollué : "+k+" "+p.id);
 if(p.blocs)assert.ok(p.blocs.every(b=>!Object.hasOwn(b,"png")&&!Object.hasOwn(b,"chemin")&&!Object.hasOwn(b,"url")));
}
for(const f of execs){
 const p=JSON.parse(fs.readFileSync(f,"utf8"));
 for(const k of ["sensations","etapes","blocs","pieces_jointes","aidesExercices"])
  assert.ok(!Object.hasOwn(p,k),"Réalisation contenant des données externes : "+k+" "+p.seanceId);
}
for(const f of obs){
 const p=JSON.parse(fs.readFileSync(f,"utf8"));
 assert.deepEqual(Object.keys(p).sort(),["seanceId","sensations"],"Une observation contient des attributs d'autres domaines");
}
const html=["index.html","sante.html"].map(n=>fs.readFileSync(path.join(ROOT,"addons/web/pages",n),"utf8"));
for(const page of html)assert.ok(!/domaines\/(?:sante|planification|activites|coaching)\/donnees\/|personnel\/sante\//.test(page),
 "Le Web connaît les sources internes d'un domaine");
console.log("Frontières validées : "+plans.length+" plans, "+execs.length+" activités réalisées, "+obs.length+" observations, aucune dépendance entrante Web/Garmin.");
