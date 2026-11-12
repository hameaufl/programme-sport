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
module.exports={projeterOrientation};
