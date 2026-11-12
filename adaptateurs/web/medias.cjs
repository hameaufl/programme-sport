"use strict";
// Le référentiel de médias appartient exclusivement à l'extension Web.
const store=require("../fichiers/stockage.cjs");
function images(mouvements){
 const banque=store.json("addons/web/public/assets/renfo/banque.json");
 if(banque.schemaVersion!==2||!Array.isArray(banque.images))throw Error("Manifeste Web invalide");
 const result=new Map();
 for(const item of banque.images){
  if(!mouvements[item.mouvementId]||result.has(item.mouvementId)||
   !/^assets\/renfo\/png\/[a-z0-9-]+\.png$/.test(item.png)||
   !store.existe("addons/web/public/"+item.png))throw Error("Ressource Web non autorisée");
  result.set(item.mouvementId,item.png);
 }
 return result;
}
module.exports={images};
