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
