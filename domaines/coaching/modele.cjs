"use strict";
function verifierObjectifs(data){
 if(!data||data.schemaVersion!==1||!Array.isArray(data.objectifs)||!data.objectifs.every(x=>typeof x==="string"&&x.trim()))throw Error("Objectifs de coaching invalides");
 return data;
}
module.exports={verifierObjectifs};
