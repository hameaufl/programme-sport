"use strict";
// Projection de lecture publique : ni chemin des sources, ni mémoire brute, ni note clinique.
const coaching=require("../../domaines/coaching/modele.cjs");
function projeterOrientation({orientation,objectifs},politique){
 if(politique?.default!=="deny"||politique?.schemaVersion!==1||politique?.coaching?.orientationPublique!==true)return null;
 const source=coaching.verifierOrientation(orientation),but=coaching.verifierObjectifs(objectifs);
 return {
  schemaVersion:1,
  miseAJour:source.miseAJour,
  objectifPersonnel:but.objectifs[0]||null,
  phase:source.phase,
  ligneDirectrice:source.ligneDirectrice,
  tendances:source.tendances.map(x=>({horizon:x.horizon,intention:x.intention,condition:x.condition})),
  vigilances:source.vigilances.map(x=>({sujet:x.sujet,attention:x.attention}))
 };
}
// Vue publique du matériel effectivement possédé, distincte de la source complète.
// Les absences, attentes d'achat, notes et données de provenance ne sont pas exposées.
function projeterEquipements(inventaire,politique){
 if(politique?.default!=="deny"||politique?.schemaVersion!==1||politique?.coaching?.equipementsPublics!==true)return null;
 const source=coaching.verifierEquipements(inventaire);
 return {
  schemaVersion:1,
  miseAJour:source.maj,
  equipements:source.equipements.filter(e=>e.statut==="disponible").map(e=>{
   const item={nom:e.nom};
   const diametre=e.caracteristiques?.diametreCmApprox;
   if(typeof diametre==="number"&&Number.isFinite(diametre)&&diametre>0&&diametre<500){
    item.diametreCmApprox=diametre;
   }
   return item;
  })
 };
}
module.exports={projeterOrientation,projeterEquipements};
