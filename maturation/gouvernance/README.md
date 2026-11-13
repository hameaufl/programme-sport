# Gouvernance multi-agents — chantier expérimental

**Statut :** chantier de Maturation, documentation et protocole d'essai ; aucune bascule effective de `main`.
**Branche de travail :** `maturation/architecture-multiagents`.
**Point de départ métier figé :** `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4` (`main` au 12 novembre 2026).
**Contrainte de coût :** aucune API OpenAI payante, aucun service ni infrastructure supplémentaire requis.

## Lecture
- [Journal d'évolution](JOURNAL-EVOLUTION.md) : décisions prises avec le propriétaire, conclusions, limites, arbitrages ouverts et suite du chantier.
- [Charte des huit rôles](CHARTE.md) : hiérarchie, droits, frontières et articulation Gardien/Contrôleur qualité.
- [Protocole Coach](PROTOCOLE-COACH.md) : coordination séquentielle de rôles spécialisés au sein de ChatGPT Plus.
- [Plan de travail et de tests](PLAN-ET-TESTS.md) : phases, protection des informations métier, scénarios et critères d'acceptation.
- [Index du référentiel](referentiel/INDEX.md) : pointeurs vers les sources de décisions sans duplication de la vérité métier.

## Règles de transition
Ce chantier traite l'organisation et les consignes des agents, **pas les performances sportives, les prescriptions, les rapports, les équipements ou les activités**. Les domaines `domaines/*/donnees/`, archives et documents métier historiques sont conservés. Le Gardien doit contrôler la cohérence avant l'activation finale ; une validation humaine ou d'agent qui n'a pas eu lieu ne sera jamais annoncée comme acquise.

Le mécanisme choisi n'est **pas** une infrastructure autonome multi-LLM : dans ChatGPT, Coach coordonne des **rôles logiques successifs** avec des obligations de sortie et des contrôles reproductibles. Le dépôt contient la mémoire et les procédures ; l'activation dépend de la lecture effective des instructions de cette branche.

Les workflows existants de publication restent inchangés. La branche ne publie pas de nouveau site : la publication GitHub Pages opérationnelle reste celle de `main`. La fusion nécessite une **approbation explicite du propriétaire** après essais et contrôles.

## Audit de couverture (12 novembre 2026)
- [Verdict et écarts](AUDIT-COUVERTURE.md) : constats et blocages avant activation.
- [Matrice de couverture](MATRICE-COUVERTURE.md) : exigences, références, propriétaires proposés et preuves attendues.
- [Inventaire des rubriques](INVENTAIRE-RUBRIQUES.json) : index vérifiable des sections de huit textes normatifs, sans copie de leurs données.

## Protocoles proposés (13 novembre 2026 — non validés)
- [Fiches des huit rôles](agents/) : procédures de travail spécialisées et restrictions héritées, sans activation automatique.
- [Attributions cibles](COUVERTURE-CIBLE.md) et [table de correspondance](COUVERTURE-PROTOCOLES.json) : 85 exigences historiques regroupées, chacune liée à un responsable **proposé**.
- [Contradictions et obsolescences](referentiel/INCOHERENCES.md) : huit questions à qualifier par le Gardien.
- [Dossier de revue du Gardien](REVUE-GARDIEN-A-VALIDER.md) : examen explicitement **en attente**, pas de visa fictif.

## Revue du Gardien — 13 novembre 2026
- [Examen motivé des huit incohérences](referentiel/REVUE-LOGIQUE-GARDIEN-2026-11-13.md) : contrôle logique effectué avec la casquette Gardien dans la même conversation ; **activation bloquée**, aucun visa indépendant ni nouvelle permission.

## Vérification automatique et essais (13 novembre 2026)
- [Contrôles exécutables](CONTROLES-AUTOMATIQUES.md) et [inventaire initial des fichiers Git](references/inventaire-base.json).
- [Campagne comparative des dix simulations](CAMPAGNE-COMPARATIVE.md) et [scénarios JSON](SCENARIOS-SIMULATION.json) ; résultats de comportement **non encore mesurés**.

## Premier passage des scénarios (13 novembre 2026)
- [Rapport de simulation dirigée](ESSAI-DIRIGE-2026-11-13.md) et [traces détaillées des dix réponses](RESULTATS-ESSAIS-COACH.json).
- Il s'agit de dix réponses rédigées **avec les critères connus, au sein du même ChatGPT**. Aucun gain comparatif A/B ni validation indépendante n'est revendiqué ; le [contrôle de cohérence des traces](verifier-simulations.cjs) bloque ces affirmations prématurées.

- [Guide de tests A/B isolés dans ChatGPT Plus](GUIDE-ESSAIS-ISOLES.md) : instructions à coller dans deux conversations, résultats encore à recueillir.

- [Audit anti-contournement](AUDIT-ANTI-CONTOURNEMENT.md) : sources épinglées au SHA initial, préambule expérimental figé et tests de falsification.

- [Première comparaison A/B observée (10 scénarios)](RAPPORT-AB-2026-11-13.md) : rapport anonymisé, scores provisoires, limites méthodologiques, sans publication des PDF privés.

- [Proposition expérimentale B2 concise](PROPOSITION-B2-CONCISION.md) : réponse proportionnée sans affaiblir les contrôles ; visa d'activation non acquis.

- [Campagne ciblée B/B2](CAMPAGNE-CIBLEE-B2.md) : huit cas (six réutilisés, deux nouveaux), réponses d'exemple et tests automatisés ; performance de B2 non encore mesurée.
