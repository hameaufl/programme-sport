"use strict";
// Implémentation locale des PORTS métier. Remplacer chaque section indépendamment
// par un adaptateur privé (API, dépôt, base) sans changer le cœur ni le Web.
const fs=require("node:fs"),path=require("node:path"),local=require("./stockage.cjs");
function documents(rep,ext){
 return local.enumerer(rep,ext).map(file=>({
  path:local.relatif(file),texte:fs.readFileSync(file,"utf8"),nom:path.basename(file)
 }));
}
function jsonDocuments(rep){return documents(rep,".json").map(d=>({...d,donnees:JSON.parse(d.texte)}));}
function dateDir(id){const date=String(id).slice(-10);if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw Error("ID sans date");return date.slice(0,4)+"/"+date.slice(5,7);}
const depots={
 planification:{
  cycle:()=>local.json("domaines/planification/donnees/cycle.json"),
  mouvements:()=>local.json("domaines/planification/donnees/mouvements.json"),
  seances:()=>jsonDocuments("domaines/planification/donnees/seances").map(d=>{
   const wanted="domaines/planification/donnees/seances/"+d.donnees.date.slice(0,4)+"/"+d.donnees.date.slice(5,7)+"/"+d.donnees.id+".json";
   if(d.path!==wanted)throw Error("Planification mal classée : "+d.path);
   return d;
  }),
  parId:id=>local.json("domaines/planification/donnees/seances/"+dateDir(id)+"/"+id+".json")
 },
 activites:{
  seances:()=>jsonDocuments("domaines/activites/donnees/seances"),
  estRealisee:id=>local.existe("domaines/activites/donnees/seances/"+dateDir(id)+"/"+id+".json")
 },
 sante:{
  observations:()=>jsonDocuments("domaines/sante/donnees/ressentis/seances"),
  rapports:()=>documents("domaines/sante/donnees/rapports",".md"),
  evenements:()=>documents("domaines/sante/donnees/evenements",".md"),
  profil:()=>local.texte("domaines/sante/donnees/PROFIL.md")
 },
 coaching:{objectifs:()=>local.json("domaines/coaching/donnees/objectifs.json"),
  equipements:()=>local.json("domaines/coaching/donnees/equipements.json"),
  orientation:()=>local.json("domaines/coaching/donnees/orientation.json")}
};
module.exports=depots;
