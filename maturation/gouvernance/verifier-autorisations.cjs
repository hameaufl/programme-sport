"use strict";
/**
 * Simulateur de préconditions. Ne commande JAMAIS GitHub, Garmin ou une API.
 * Entrées : assertions fictives de test, non pas preuves réelles.
 * Une sortie "admissible_sur_papier" N'AUTORISE PAS une action réelle.
 */
const allowed = new Set([
  "lecture","garmin.creer","garmin.programmer","garmin.envoyer",
  "garmin.supprimer","gouvernance.modifier","metier.ecrire","web.publier"
]);
const branch="maturation/architecture-multiagents";
function missing(...values){return values.some(v=>!v);}
function evaluate(c) {
  const errors=[];
  const refuse=(s)=>errors.push(s);
  if(!c || c.mode!=="analyse_sans_execution" || !allowed.has(c.operation)) {
    return {statut:"refuse",motifs:["Entrée invalide ou tentative d'exécution non prise en charge"]};
  }
  const a=c.autorisation || {};
  const t=c.cible || {};
  if(c.operation==="lecture") {
    return {statut:"admissible_sur_papier",motifs:["Lecture seule : aucune écriture proposée"]};
  }
  if(c.operation==="metier.ecrire" || c.operation==="web.publier") {
    if(c.branche===branch) refuse("Branche expérimentale : aucune écriture métier ou publication");
    if(c.operation==="web.publier") refuse("La publication n'est pas étudiée par ce simulateur");
    else if(c.role!=="COACH") refuse("Responsable de l'écriture métier autre que Coach");
    if(!t.chemin || !t.chemin.startsWith("domaines/") || t.chemin.includes("..")) refuse("Chemin métier non canonique");
  }
  if(c.operation.startsWith("garmin.")) {
    if(c.role!=="GARMIN") refuse("Opération Garmin hors spécialité habilitée");
    if(a.typeAction!==c.operation || a.accordProprietaire!==true ||
       typeof a.preuveDemande!=="string" || a.preuveDemande.length<10) {
      refuse("Accord du propriétaire exact, traçable et spécifique à l'action absent");
    }
    const date=String(t.date || "");
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Array.isArray(a.datesExactes) ||
       !a.datesExactes.includes(date)) refuse("Date exacte non autorisée");
    if(c.operation==="garmin.creer" || c.operation==="garmin.programmer" || c.operation==="garmin.envoyer") {
      if(!t.workoutId && c.operation!=="garmin.creer") refuse("Identifiant d'entraînement absent");
      if(c.operation==="garmin.creer" && !t.signatureValidee) refuse("Signature modèle à créer non vérifiée");
      if(c.operation==="garmin.programmer" && !t.modeleRelu) refuse("Modèle distant non relu");
      if(c.operation==="garmin.envoyer" && !t.appareilVerifie) refuse("Appareil non confirmé");
    }
    if(c.operation==="garmin.supprimer") {
      if(!t.workoutId || !a.ciblesExactes?.includes(t.workoutId)) refuse("Identité de suppression non autorisée");
      if(!(t.apercuValide && t.identiteVerifiee && t.absenceUsageConfirmee && !t.planifie)) {
        refuse("Aperçu, identité, absence d'usage et absence de calendrier non tous vérifiés");
      }
      // Ne pas contourner l'autorisation d'une suppression par une exception automatique.
      if(!a.accordProprietaire) refuse("Suppression non autorisée");
    }
  }
  if(c.operation==="gouvernance.modifier") {
    if(c.role!=="MATURATION") refuse("Seul Maturation propose/applique le comportement des agents");
    if(!a.avisGardien || a.avisGardien.verdict!=="valide" ||
        !/^[a-f0-9]{40}$/.test(a.avisGardien.shaProposition||"")) {
      refuse("Visa préalable précis du Gardien manquant");
    }
    if(t.agent==="GARDIEN" && a.accordProprietaire!==true) {
      refuse("Changement des règles du Gardien : accord explicite du propriétaire absent");
    }
    if(c.branche==="main" && !a.approbationFusionProprietaire) {
      refuse("Activation main sans approbation explicite du propriétaire");
    }
  }
  return {statut:errors.length?"refuse":"admissible_sur_papier",
    motifs:errors.length?errors:["Conditions déclarées cohérentes dans un cas fictif ; aucune permission réelle accordée"]};
}
module.exports={evaluate};
if(require.main===module){
  const fs=require("node:fs"), path=require("node:path");
  try{
    const p=path.join(__dirname,"tests","cas-autorisations.json");
    const fixtures=JSON.parse(fs.readFileSync(p,"utf8"));
    for(const c of fixtures.cas){
      const got=evaluate(c.donnees);
      if(got.statut!==c.attendu)throw Error(c.id+": attendu "+c.attendu+", obtenu "+got.statut+" ("+got.motifs.join("; ")+")");
    }
    console.log("PRÉCONDITIONS : "+fixtures.cas.length+" cas fictifs vérifiés ; aucune action réelle ; aucun droit créé.");
  }catch(e){console.error("PRÉCONDITIONS : ÉCHEC — "+e.message);process.exitCode=1;}
}
