"use strict";
function verifierObservation(observation){
 if(!observation||typeof observation.seanceId!=="string"||!observation.seanceId||
  typeof observation.sensations!=="string"||!observation.sensations.trim())throw Error("Observation de santé non valide");
 return observation;
}
module.exports={verifierObservation};
