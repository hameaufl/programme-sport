"use strict";
const assert=require("node:assert/strict");
const depots=require("../../adaptateurs/fichiers/depots.cjs");
const {collect,exposed}=require("../../adaptateurs/projections/lecture.cjs");
const policy=require("../../contrats/publication-prive-v1.json");
const complete=collect();
const replaceHealth={
 ...depots,
 sante:{...depots.sante,observations:()=>[],rapports:()=>[],evenements:()=>[],profil:()=>""},
 coaching:{...depots.coaching,objectifs:()=>({schemaVersion:1,objectifs:[]})}
};
const withoutPrivate=collect(replaceHealth,{medias:null});
assert.equal(withoutPrivate.sessions.length,complete.sessions.length,"La planification dépend du stockage Santé");
assert.equal(withoutPrivate.weeks.size,complete.weeks.size,"Les semaines dépendent du stockage Santé");
assert.equal(withoutPrivate.reports.size,0);
assert.equal(withoutPrivate.events.length,0);
assert.equal(withoutPrivate.config.objectifs.length,0);
for(const s of withoutPrivate.sessions){
 assert.equal(s.sensations,"");
 assert.ok(!s.pieces_jointes,"Garmin reste facultatif");
 assert.ok(!s.aidesExercices,"L'extension Web reste facultative");
 const old=complete.sessions.find(x=>x.id===s.id);
 assert.ok(old&&JSON.stringify(s.etapes)===JSON.stringify(old.etapes),"Le programme a été modifié par le débranchement du stockage");
}
for(const week of withoutPrivate.weeks.keys())for(const s of exposed(week,withoutPrivate,policy)){
 assert.ok(!Object.hasOwn(s,"sensations"));
 assert.ok(!Object.hasOwn(s,"structuresSollicitees"));
 assert.ok(!Object.hasOwn(s,"pieces_jointes"));
 assert.ok(!Object.hasOwn(s,"aidesExercices"));
}

const orientation=require("../../domaines/coaching/donnees/orientation.json");
const objectifs=require("../../domaines/coaching/donnees/objectifs.json");
const projeterOrientation=require("../../adaptateurs/projections/coaching.cjs").projeterOrientation;
const contratPublic=require("../../contrats/publication-v1.json");
const vue=projeterOrientation({orientation,objectifs},contratPublic);
assert.equal(vue.objectifPersonnel,objectifs.objectifs[0],"La projection repose sur le domaine Coaching, sans Santé ni Web");
assert.equal(vue.phase,orientation.phase);
assert.equal(projeterOrientation({orientation,objectifs},policy),null,"La stratégie doit pouvoir être débranchée");
const equipementMetier=depots.coaching.equipements();
const projeterEquipements=require("../../adaptateurs/projections/coaching.cjs").projeterEquipements;
assert.equal(projeterEquipements(equipementMetier,policy),null,"L'inventaire doit pouvoir être débranché");
const listePubliee=projeterEquipements(equipementMetier,contratPublic);
assert.equal(listePubliee.equipements.length,equipementMetier.equipements.filter(x=>x.statut==="disponible").length,"La projection ne doit dépendre que de Coaching");

console.log("Portabilité validée : "+withoutPrivate.sessions.length+" programmes sans Santé, Coaching privé ni extension Web.");
