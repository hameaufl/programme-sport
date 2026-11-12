"use strict";
// Propriété de l'adaptateur Garmin ; ne remonte jamais de chemin de dépôt dans les domaines.
const fs=require("node:fs"),path=require("node:path"),store=require("../fichiers/stockage.cjs");
function physique(id){if(!/^[a-z0-9-]+$/.test(id))throw Error("ID FIT non valide");return "adaptateurs/garmin/fichiers/"+id+".fit";}
function reference(id){
 const file=physique(id);if(!store.existe(file))return null;
 const bytes=fs.readFileSync(store.resolver(file));
 if(bytes.length<16||bytes.toString("ascii",8,12)!==".FIT")throw Error("FIT invalide : "+id);
 return {role:"entrainement_prevu",format:"fit",url:"fichiers/garmin/"+id+".fit"};
}
module.exports={physique,reference};
