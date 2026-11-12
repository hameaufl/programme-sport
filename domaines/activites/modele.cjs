"use strict";
function verifier(activite){
 if(!activite||typeof activite.seanceId!=="string"||!/^[a-z0-9-]+$/.test(activite.seanceId)||activite.fait!==true)throw Error("Activité réalisée non valide");
 if(Object.hasOwn(activite,"exercicesRealises")&&
    (!Array.isArray(activite.exercicesRealises)||!activite.exercicesRealises.every(x=>typeof x==="string"&&x.trim())))throw Error("Rapport d'exécution non valide "+activite.seanceId);
 // Toute activité attestée doit posséder cette analyse du Coach ; pas de structures déduites par le Web.
 // En cas de gestes insuffisamment connus, une mention explicite "À préciser par le Coach" est préférable à une invention.
 if(!Array.isArray(activite.structuresSollicitees)||activite.structuresSollicitees.length===0||
    !activite.structuresSollicitees.every(x=>typeof x==="string"&&x.trim()))
    throw Error("Structures sollicitées obligatoires et non vides : "+activite.seanceId);
 return activite;
}
module.exports={verifier};
