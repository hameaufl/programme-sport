"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {verify}=require("../verifier-porte-adoption-b2.cjs");
const root=path.resolve(__dirname,"..");
const get=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const s=get("ETAT-ADOPTION-B2.json"),b=get("RESULTATS-B2-OBSERVES.json"),c=get("CONTRETESTS-B2-OBSERVATIONS.json");
const ref=fs.readFileSync(path.join(root,"referentiel","INCOHERENCES.md"),"utf8");
const files=["maturation/gouvernance/PROTOCOLE-COACH.md","maturation/gouvernance/agents/COACH.md"];
test("Candidat B2 recommandé pour les essais, activation bloquée",()=>{
  assert.deepEqual(verify(s,b,c,ref,files),{
    candidat:"favorable_pour_essais",activation:"bloquee",fusion:"interdite_sans_accord",
    preuves:{casComparables:6,contretests:2,incOuverts:8,fichiersDifferentsB2:2}
  });
});
test("Fausse autorisation de fusion refusée",()=>{
 const x=structuredClone(s);x.verrous.approbationExpliciteFusion="accorde";
 assert.throws(()=>verify(x,b,c,ref,files));
});
test("Faux visa du Gardien ou fausse exhaustivité refusé",()=>{
 const x=structuredClone(s);x.verrous.visaGardienFormel="valide";assert.throws(()=>verify(x,b,c,ref,files));
 const y=structuredClone(s);y.verrous.auditSemantiqueExhaustif="acquis";assert.throws(()=>verify(y,b,c,ref,files));
});
test("Huit conflits non clos ne peuvent pas disparaître silencieusement",()=>{
 const x=structuredClone(s);x.verrous.incidentsReferentiel.restants=0;assert.throws(()=>verify(x,b,c,ref,files));
 assert.throws(()=>verify(s,b,c,ref.replace("INC-008","INC-007"),files));
});
test("Changement hors deux protocoles ou déviation de SHA bloqué",()=>{
 assert.throws(()=>verify(s,b,c,ref,[...files,"maturation/gouvernance/agents/GARDIEN.md"]));
 const x=structuredClone(s);x.versionB2="f".repeat(40);assert.throws(()=>verify(x,b,c,ref,files));
});
test("Données B2 ou réussite du contre-test fictivement améliorée : refus",()=>{
 const x=structuredClone(b);x.mesures.sommeB2=50;assert.throws(()=>verify(s,x,c,ref,files));
 const y=structuredClone(c);y.observations[1].attendusSatisfaits=8;assert.throws(()=>verify(s,b,y,ref,files));
});
test("La confidentialité et le statut de non-activation restent explicites",()=>{
 const x=structuredClone(s);x.confidentialite.pdfsPublics=true;assert.throws(()=>verify(x,b,c,ref,files));
 const y=structuredClone(s);y.activation="activee";assert.throws(()=>verify(y,b,c,ref,files));
});
