"use strict";
function verifierObjectifs(data){
 if(!data||data.schemaVersion!==1||!Array.isArray(data.objectifs)||!data.objectifs.every(x=>typeof x==="string"&&x.trim()))throw Error("Objectifs de coaching invalides");
 return data;
}

const STATUTS=new Set(["disponible","absent","non_confirme"]);
function verifierEquipements(data){
 if(!data||data.schemaVersion!==1||!/^\d{4}-\d{2}-\d{2}$/.test(data.maj||"")||
    !Array.isArray(data.equipements)||!data.equipements.length)
  throw Error("Inventaire des équipements invalide");
 const ids=new Set();
 for(const e of data.equipements){
  if(!e||typeof e!=="object"||typeof e.id!=="string"||!/^[a-z0-9_]+$/.test(e.id)||
     typeof e.nom!=="string"||!e.nom.trim()||!STATUTS.has(e.statut)||ids.has(e.id))
   throw Error("Équipement inconnu, doublonné ou mal formé");
  if(e.caracteristiques!==undefined&&
     (typeof e.caracteristiques!=="object"||e.caracteristiques===null||Array.isArray(e.caracteristiques)))
   throw Error("Caractéristiques d'équipement mal formées");
  if(e.notes!==undefined&&typeof e.notes!=="string")throw Error("Notes d'équipement mal formées");
  ids.add(e.id);
 }
 return data;
}
function verifierMaterielRequis(inventaire,requis){
 verifierEquipements(inventaire);
 if(!Array.isArray(requis)||requis.some(id=>typeof id!=="string"))throw Error("Matériel requis invalide");
 const connus=new Map(inventaire.equipements.map(e=>[e.id,e.statut]));
 for(const id of new Set(requis)){
  if(connus.get(id)!=="disponible")throw Error("Matériel indisponible ou non confirmé : "+id);
 }
 return true;
}
module.exports={verifierObjectifs,verifierEquipements,verifierMaterielRequis};
