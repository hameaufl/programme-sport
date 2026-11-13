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

- [Résultat de livraison B2 et preuves](RAPPORT-B2-2026-11-13.md) ; [instructions prêtes pour trois tests discriminants](GUIDE-ESSAI-B2-PRET.md). La branche B2 ne contient pas les corrigés du banc d'essai.

- [Premier bilan de huit réponses réelles B2](RAPPORT-OBSERVE-B2-2026-11-13.md) : six comparables à B (−71,3 % de mots), deux nouveaux sans comparateur, réserves de précision et de méthode ; [observations structurées](RESULTATS-B2-OBSERVES.json).

- [Protocole historique des deux contre-tests B2](CONTRETESTS-B2-GUIDE.md) : prompts conservés pour reproductibilité ; les réponses ont ensuite été évaluées séparément, voir le rapport et les observations à jour ci-dessous.

- [Résultat des deux contre-tests B2 en sessions neuves](RAPPORT-CONTRETESTS-B2-2026-11-13.md) : 9/9 et 5/8 critères à lecture stricte, aucune erreur bloquante et trois détails Web à compléter avant livraison réelle ; [observations anonymisées](CONTRETESTS-B2-OBSERVATIONS.json).

- [Avis logique final du Gardien sur B2](GARDIEN-AVIS-LOGIQUE-B2-2026-11-13.md) ; [checklist Web](CHECKLIST-LIVRAISON-WEB-B2.md) et [dossier de décision à soumettre](DECISION-ADOPTION-B2-A-SOUMETTRE.md). **B2 candidat, activation bloquée.**

- [Passation du chantier et prompt de reprise](PASSATION-CHANTIER.md) : état vérifié, preuves et restrictions pour une autre conversation.

- [Audit sémantique préliminaire](AUDIT-SEMANTIQUE-PRELIMINAIRE.md) : **161 rubriques main / 162 dont 1 expérimentale** ; [inventaire historique](INVENTAIRE-RUBRIQUES-MAIN.json) ; [85 ancrages qualifiés](AUDIT-ANCRAGES-SEMANTIQUES.json), sans certification exhaustive.
- [Instruction des huit incohérences](referentiel/INSTRUCTION-INC-001-008.md) : 16 fragments de preuve à SHAs fixes, priorités proposées et **8 dossiers encore ouverts** ; [relevé structuré](referentiel/QUALIFICATIONS-INC-001-008.json).

- [Point d'entrée documentaire de l'état courant V2](ETAT-COURANT-REFERENCE.md), sans activation B2.
- [Plan de nettoyage progressif sans destruction](PLAN-ASSAINISSEMENT-V2.md), [inventaire de 143 fichiers](INVENTAIRE-ASSAINISSEMENT.json) et [revue des 30 rubriques de reprise](REVUE-SEMANTIQUE-REPRISE.md).
- [Correction de provenance appliquée](CORRECTION-PROVENANCE-APPLIQUEE.md) : 73 obligations historiques, 12 règles expérimentales nouvelles distinctes ; visa Gardien encore absent.

- [Préparation du mini-lot documentaire V2 n°1](MINILOT-ASSAINISSEMENT-01.md) : deux propositions de textes de remplacement non appliquées ; [étude de 39 fichiers et cinq cibles](ETUDE-DEPENDANCES-NETTOYAGE.json).
- [Revue de 26 ancrages restant à fiabiliser](REVUE-26-ANCRAGES.md) : 17 directs, 7 partiels, 1 insuffisant, 1 provenance REF-06 à arbitrer ; aucune fausse validation.

- [Revue des 29 rubriques de ROLES](REVUE-SEMANTIQUE-ROLES.md) : 16 courantes à vérifier, 7 mixtes V1/V2, 6 anciennes ; avec REPRISE, 59/161 rubriques passées en revue, sans certification clause par clause.

- [Troisième revue sémantique : 15 rubriques du mode opératoire Coach](REVUE-SEMANTIQUE-COACH.md), [ancrages précis](REVUE-COACH-15-RUBRIQUES.json) et tests négatifs : 8 courantes à vérifier, 5 mixtes, 2 états historiques datés. Avec REPRISE et ROLES, **74/161** rubriques qualifiées préliminairement. Premier mini-lot documentaire fusionné dans `main` via PR #10 ; PR #9 toujours en brouillon.

- [Revue ciblée des 26 points COM-03 à COM-09](REVUE-CLAUSES-COACH-COM03-COM09.md) et [table de preuves exactes](REVUE-CLAUSES-COACH-COM03-COM09.json) : noms Garmin historiques, en-tête Web unique, suppression conditionnelle de modèles intermédiaires et chronologie datée. **3 arbitrages restent ouverts, pas de lecture Garmin distante, aucune écriture métier**. Les 26 points approfondissent 7 rubriques déjà classées : **74/161** reste le décompte préliminaire.

- [Première qualification intégrale 161/161](REVUE-SEMANTIQUE-87-RUBRIQUES.md) avec [87 rubriques nouvellement classées](REVUE-87-RUBRIQUES-RESTANTES.json) ; contrôle structurel et tests anti-réactivation FIT (ce n'est PAS la certification des clauses).
- [Critique transversale des 26 ancrages](REVUE-CRITIQUE-26-ANCRAGES.md), [registre JSON](EXAMEN-CRITIQUE-26-ANCRAGES.json) et refus de requalification d'une procédure V1 en autorité active.
- [Preuves techniques INC ciblées](PREUVES-TECHNIQUES-INC-001-002-007-008.md), sans clôture ; [proposition d'index actif V2 non normatif](PROPOSITION-INDEX-ACTIF-V2.md).
- [Mini-lot n°2 — PR #11 brouillon](https://github.com/hameaufl/programme-sport/pull/11) : renvois V2 corrigés dans deux documents, non fusionné. [Décisions qui demandent le propriétaire](DECISIONS-A-SOUMETTRE-2026-11-13.md).

- **13 novembre 2026 — PR #11 fusionnée sur autorisation explicite** : `main` `cf9241b9740be8e6c3f80058a45f76e197a4bb44`, deux corrections documentaires Coach/MCP (4 substitutions), [publication Pages réussie](https://github.com/hameaufl/programme-sport/actions/runs/43465068468). PR #9 toujours brouillon, 8 INC ouvertes et aucune adoption B2 ni opération Garmin.

- **13 novembre 2026, nouvelles étapes expérimentales sans fusion :** [Étude REF-06](ETUDE-REF-06-PROVENANCE.md), [étude INC-005 et scénarios sans Garmin](ETUDE-INC-005-SUPPRESSION.md), [index de six preuves techniques sans copie](INDEX-PREUVES-VAGUE3.md), [propositions pour les quinze procédures V1 remplacées](REVUE-SUPERSESSION-15-V1.md). [PR #12 en brouillon](https://github.com/hameaufl/programme-sport/pull/12) : correction du README racine, non fusionnée. `main` demeure `cf9241b9740be8e6c3f80058a45f76e197a4bb44`, huit INC ouvertes, aucun visa indépendant ni adoption B2.
