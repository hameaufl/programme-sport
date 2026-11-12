"use strict";
// Contrôle du site construit : aucun programme de montre ni référence de service externe.
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../.."),site=path.join(root,"_site");
function files(dir){
 if(!fs.existsSync(dir))throw Error("Site non construit : "+dir);
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  const file=path.join(dir,e.name);
  return e.isDirectory()?files(file):e.isFile()?[file]:[];
 });
}
const listing=files(site);
assert.ok(listing.some(p=>p.endsWith("index.html")),"Accueil absent");
for(const file of listing){
 const local=path.relative(site,file).replace(/\\/g,"/");
 assert.ok(!/\.fit$/i.test(local),"Ancien programme binaire publié : "+local);
 assert.ok(!/^fichiers\/garmin(?:\/|$)/i.test(local),"Ancien répertoire d'entraînements publié : "+local);
 if(local.endsWith(".html")){
  const html=fs.readFileSync(file,"utf8");
  assert.ok(!/garmin|\.fit\b|pieces_jointes/i.test(html),"Référence d'entraînement externe dans HTML : "+local);
 }
 if(/^data\/semaines\/.*\.json$/.test(local)){
  const data=JSON.parse(fs.readFileSync(file,"utf8"));
  for(const s of data.sessions){
   assert.ok(!Object.hasOwn(s,"pieces_jointes"),"Lien externe dans la projection : "+s.id);
   assert.ok(!/fichiers\/garmin|\.fit\b/i.test(JSON.stringify(s)),"Référence binaire dans les séances : "+s.id);
  }
 }
}
console.log("Publication sans fichiers d'entraînement validée : "+listing.length+" ressources.");
