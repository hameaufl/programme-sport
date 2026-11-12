"use strict";
// Adaptateur de stockage local. Remplaçable par un port distant : aucun domaine n'importe ce module.
const fs=require("node:fs"),path=require("node:path");
const ROOT=path.resolve(__dirname,"../..");
function resolver(rel){
 if(typeof rel!=="string"||path.isAbsolute(rel)||rel.split("/").some(p=>p===".."||p==="."))throw Error("Accès au stockage interdit : "+rel);
 const full=path.resolve(ROOT,rel);
 if(full!==ROOT&&!full.startsWith(ROOT+path.sep))throw Error("Sortie du stockage");
 return full;
}
function enumerer(rel,extension){
 const dir=resolver(rel);if(!fs.existsSync(dir))return [];
 function visit(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>{
  const f=path.join(p,e.name);if(e.isSymbolicLink())throw Error("Lien symbolique interdit : "+f);
  return e.isDirectory()?visit(f):e.isFile()&&f.endsWith(extension)?[f]:[];
 });}
 return visit(dir).sort();
}
function json(rel){return JSON.parse(fs.readFileSync(resolver(rel),"utf8"));}
function texte(rel){return fs.readFileSync(resolver(rel),"utf8");}
function existe(rel){return fs.existsSync(resolver(rel));}
function relatif(full){return path.relative(ROOT,full).split(path.sep).join("/");}
module.exports={ROOT,resolver,enumerer,json,texte,existe,relatif};
