# Activités réalisées — domaine métier autonome

`donnees/seances/AAAA/MM/<id>.json` n'existe **que pour une séance réellement confirmée**. Le champ `seanceId` référence la prescription, sans la recopier; `fait:true` confirme la réalisation, `exercicesRealises` et `structuresSollicitees` sont des comptes rendus factuels/analyses sportifs issus du Coach. Les ressentis personnels sont des observations du domaine Santé.

Ne jamais conclure qu'une activité a été réalisée à partir de sa présence dans le calendrier.

## Obligatoire pour chaque réalisation — 12 novembre 2026

Lorsqu'une activité est confirmée, le Coach renseigne **dans la même intervention** `structuresSollicitees: string[]` (non vide) dans le fichier d'Activités, y compris pour une sortie spontanée, un essai sur tapis, une séance de course, de renforcement ou de kinésithérapie. Il **déduit lui-même** les groupes musculaires usuels à partir des mouvements **réellement décrits**, sans attendre que le propriétaire fournisse des termes anatomiques. Libellés courts sous la forme « Région / fonction — muscles ou chaînes », **sans** mention répétée « probable » ni diagnostic supposé.

Si les exercices sont réellement insuffisamment décrits, enregistrer honnêtement une entrée « À préciser par le Coach — mouvements non décrits » plutôt que d'inventer une sollicitation ; la compléter une fois les gestes connus. Ne pas en déduire qu'une séance planifiée a eu lieu. `exercicesRealises` conserve le déroulé factuel ; les sensations restent dans Santé, les décisions dans Coaching.

La validation `domaines/activites/modele.cjs` et le test `scripts/verifier-site.cjs` **refusent désormais une réalisation sans structures** ; le détail de « Mon programme » reçoit ces champs via la projection autorisée, sans copie dans HTML. Protocole d'exécution : `docs/PROCESSUS.md`.
