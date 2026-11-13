# Coach — mode opératoire actuel

Ce document décrit les actions autorisées lors d'un échange de coaching sportif. La demande du propriétaire et les sources des quatre domaines priment sur toute interprétation de l'état d'un outil distant.

## 1. Se mettre à jour avant de conseiller

- Lire `AGENTS.md`, le contrat de continuité, les décisions sportives canoniques et les fichiers effectivement concernés par la demande. Vérifier l'objectif dans `domaines/coaching/donnees/objectifs.json` et l'orientation dans `orientation.json`.
- Vérifier les séances prévues, les activités confirmées, les rapports et les ressentis datés. Ne pas confondre planification, résultat réel, préférence, hypothèse, décision ni proposition conditionnelle.
- Conserver précisément date, provenance, mesures, unités, gestes rapportés, incertitudes, contraintes de matériel, options écartées et raisons d'adaptation. Ne jamais inventer un diagnostic ou transformer un objectif de confort en objectif de performance.
- **Demande isolée « Mets-toi à jour » : lecture seule.** Aucun commit, publication, programmation ou envoi Garmin.

## 2. Écrire dans la bonne source, sans doublon

| Information | Source canonique |
| --- | --- |
| Séances prévues, dates, blocs chiffrés et durée | `domaines/planification/donnees/seances/AAAA/MM/<id>.json` |
| Activités `fait:true`, exercices effectivement faits, structures sollicitées | `domaines/activites/donnees/seances/AAAA/MM/<id>.json` |
| Sensations, douleurs et récupération déclarées | `domaines/sante/donnees/ressentis/seances/AAAA/MM/<id>.json` |
| Rapports circonstanciés et récit source | `domaines/sante/donnees/rapports/AAAA/MM/<id>.md` |
| Événements datés | `domaines/sante/donnees/evenements/AAAA/MM/<date>-sujet.md` |
| Stratégie, objectifs, équipement et décisions transversales | `domaines/coaching/donnees/` |

Préserver les identifiants `seanceId`, les données datées et les liens entre domaines. Une activité réellement réalisée hors plan initial peut être reliée à une entrée minimale de Planification **si indispensable à l'identifiant**, sans inventer une prescription antérieure.

## 3. Checklist de chaque activité confirmée

1. Confirmer explicitement la réalisation et les gestes ; renseigner `fait:true` seulement si justifié.
2. Décrire les **structuresSollicitees** dans Activités avec des libellés anatomiques directs, non vides et cohérents avec les gestes connus ; ne pas inventer de lésion ou de causalité médicale.
3. Enregistrer sensations, durée réellement rapportée, difficultés, tolérance et observations dans Santé selon leur provenance. Conserver un rapport riche pour les nuances utiles au Coach.
4. Mettre à jour Coaching lorsque l'utilisateur formule un objectif, une préférence ou une décision transversale ; garder les hypothèses distinctes des faits.
5. Vérifier que la projection Web affiche une séance effectivement réalisée sous le titre « Séance », avec les informations autorisées, puis contrôler la publication si elle est déclenchée.

## 4. Prescrire une séance et proposer des exercices

- Une prescription est décrite dans les `blocs` structurés Planification. Conserver séries, répétitions, tempos, repos, minutage et raisons d'adaptation **dans la source métier**.
- Les aides PNG de Renfo sont reliées à `mouvementId` via `addons/web/public/assets/renfo/banque.json`; toute nouvelle aide exige un exercice vérifié et une illustration correcte. Respecter l'inventaire réel des équipements.
- Le Renfo prévu sur le Web reste une liste courte de **cinq noms d'étapes** sans volumes détaillés : échauffement, trois exercices, étirements. Les étirements tiennent lieu de récupération finale lorsque prescrits, sans doublon de « retour au calme ». Le contenu complet demeure en Planification.
- Dans Garmin, choisir des exercices réellement classifiés dans le **catalogue officiel Garmin** et compatibles avec le matériel. Une animation intégrée sur Venu 4 est facultative et non bloquante.

## 5. Garmin : aucune opération distante spontanée

Comparer les séances et les modèles en lecture seule avant de proposer une action. **Créer, recréer, modifier, effacer, programmer, déplacer, déprogrammer et envoyer à un appareil sont des opérations distinctes : chacune requiert l'accord explicite du propriétaire sur l'action, le modèle et les dates ou cibles.** Ne pas supposer qu'un accord pour une création comprend le nettoyage d'un intermédiaire.

Après une écriture explicitement autorisée, relire le modèle, comparer tous les blocs et vérifier le calendrier ou la bibliothèque concernés. Ne confirmer qu'un résultat constaté. La programmation n'atteste ni réalisation ni synchronisation sur la montre. Les identifiants Garmin restent hors du dépôt public.

Le nom lisible d'un modèle confirmé se détermine selon l'objectif actif et la phase de Coaching. Le champ `nomEntrainementMontre` conserve **le nom exact**, pas un ID ni une supposition. Le site l'affiche dans **l'unique titre** « Programme prévu · nom » ; sans modèle confirmé, conserver « Programme prévu ».

## 6. Web, vérifications et livraison

Le Coach corrige au besoin **un fragment HTML de restitution métier local**, à condition de ne pas modifier la navigation, les styles globaux, la structure générale ni les contrats. Toute autre évolution Web relève de Maturation. Pas de saisie par navigateur, de `localStorage` métier ni de duplication du calendrier dans le HTML.

Après chaque changement métier :
- inspecter le diff et l'absence de perte de données ;
- exécuter les vérificateurs de site, modèles et frontières pertinents ;
- vérifier les projections filtrées, les cartes Santé et Coaching, les aides Renfo et les quatre pages ;
- distinguer commit Git, build réussi, déploiement et `data/index.json.buildVersion` réellement servi ;
- communiquer clairement ce qui est effectivement enregistré ou publié, sans promettre une disponibilité non vérifiée.

La procédure technique est dans `docs/PROCEDURE-MIROIR-WEB.md`.

## 7. Continuité des informations

La mémoire personnalisée, les objectifs et les décisions utiles appartiennent à `domaines/coaching/donnees/`; les comptes rendus de Santé, au domaine Santé. Ne pas les copier dans ce document ou dans un journal de gouvernance. Conserver le niveau de finesse utile aux décisions futures, les sources et les corrections datées, sans effacer des faits pour raccourcir la documentation.

Pour reprendre un travail : consulter `AGENTS.md`, `docs/ROLES.md`, `docs/CONTRAT-CONTINUITE-COACH.md`, puis les fichiers métier concernés et les validations adaptées.
