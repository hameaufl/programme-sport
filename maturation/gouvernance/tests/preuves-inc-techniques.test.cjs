"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),cp=require("node:child_process");
const {verify}=require("../verifier-preuves-inc-techniques.cjs");
const root=path.resolve(__dirname,"../../.."),main="e28b8cac98d20b78fd4835392b53afeeed18c234";
const git=(...args)=>cp.execFileSync("git",args,{cwd:root,encoding:"utf8"});
const paths=git("ls-tree","-r","--name-only",main).trim().split("\n");
const get=f=>git("show",main+":"+f);
const base={paths,bank:get("addons/web/public/assets/renfo/banque.json"),
 projection:get("adaptateurs/projections/lecture.cjs"),
 verifierSite:get("scripts/verifier-site.cjs"),
 verifierPublication:get("maturation/architecture/verifier-publication.cjs"),
 modeGarmin:get("adaptateurs/garmin/README.md")};
const simulation=fs.readFileSync(path.join(root,"maturation/gouvernance/SCENARIOS-SIMULATION.json"),"utf8");
test("Présence de preuves techniques INC-001/002/007/008 au commit de référence (sans clôture)",()=>{
 const r=verify(base,simulation);assert.equal(r.inc007_png_images,5);assert.equal(r.incidents_fermes,0);
});
test("Un ancien FIT ou chemin personnel réintroduit échoue",()=>{
 const a=structuredClone(base);a.paths.push("scripts/generer-garmin.cjs");assert.throws(()=>verify(a,simulation));
 const b=structuredClone(base);b.paths.push("personnel/seances/2026/11/a.json");assert.throws(()=>verify(b,simulation));
});
test("PNG manquante ou référence de projection supprimée échoue",()=>{
 const a=structuredClone(base);a.paths=a.paths.filter(x=>!x.endsWith("/dead-bug.png"));assert.throws(()=>verify(a,simulation));
 const b=structuredClone(base);b.projection=b.projection.replace("images.get(b.mouvementId)","new Map().get(b.mouvementId)");assert.throws(()=>verify(b,simulation));
});
test("Une simulation qui revendique des droits d'écriture échoue",()=>{
 const data=JSON.parse(simulation);data.scenarios[0].interdits=data.scenarios[0].interdits.filter(x=>x!=="ecriture_garmin");
 assert.throws(()=>verify(base,JSON.stringify(data)));
});
