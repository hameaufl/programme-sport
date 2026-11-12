"use strict";
function verifier(activite){
 if(!activite||typeof activite.seanceId!=="string"||!/^[a-z0-9-]+$/.test(activite.seanceId)||activite.fait!==true)throw Error("Activité réalisée non valide");
 for(const key of ["exercicesRealises","structuresSollicitees"])if(Object.hasOwn(activite,key)&&(!Array.isArray(activite[key])||!activite[key].every(x=>typeof x==="string")))throw Error("Rapport d'exécution non valide "+activite.seanceId);
 return activite;
}
module.exports={verifier};
