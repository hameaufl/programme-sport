# Assainissement progressif vers un dépôt présentant uniquement l'état courant

**Date : 13 novembre 2026.** **Principe choisi pour ce brouillon : séparation entre état actif et preuves, préservation des faits et décisions importantes, suppression uniquement sur décision fondée et autorisée.** Le dépôt `main`, les archives, la santé, Garmin et le Web ne sont **pas modifiés dans cette phase**.

L'inventaire [INVENTAIRE-ASSAINISSEMENT.json](INVENTAIRE-ASSAINISSEMENT.json) fige les **143 fichiers** du `main` au SHA `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`, leur blob SHA et une catégorie de traitement. Ce classement est **initial**, pas une autorisation de suppression. Il existe **16 JSON Renfo archivés** et un README dans le dossier d'archives : les conserver jusqu'à validation d'une autre politique de preuve.

## Objectif cible

L'accès habituel au dépôt ne doit plus imposer de lire plusieurs versions contradictoires. Un **point d'entrée opérationnel unique** expliquera les règles en vigueur, l'architecture V2 et les droits d'écriture. Les références anciennes seront accessibles séparément sous un espace de preuves / historique contrôlé, sans devenir des obligations opérationnelles. Les informations personnelles actuelles restent dans leur domaine canonique, sans copie dans la gouvernance ni le Web.

**Attention :** retirer un ancien fichier du HEAD GitHub ne retire pas les commits précédents accessibles au public, les copies, les caches ou les liens externes. Ne jamais confondre « dépôt courant épuré » et « historique confidentiel purgé ». Une vraie migration privée exigerait une étude d'hébergement, d'accès et de réécriture d'historique, avec consentement explicite.

## Vagues prévues

| Vague | Cible | Travail autorisé à ce stade | Condition de passage |
| --- | --- | --- | --- |
| **0 — Inventaire et références** | 143 chemins, SHA, usages et classif. | **Effectué :** inventorier, proposer le point d'entrée V2, classifier 30 rubriques de `docs/REPRISE.md` | Aucune donnée supprimée |
| **1 — Docs techniques manifestement V1** | `maturation/architecture/README-personnel-historique.md`, `docs/CONTEXTE.md`, `adaptateurs/README.md` | Proposer remplacement current-only et rechercher les liens entrants, tests et références externes | Démontrer que les contraintes utiles subsistent ; approbation précise des fichiers |
| **2 — Protocoles mixtes** | `docs/REPRISE.md`, `AGENTS.md`, `docs/ROLES.md`, `docs/COACH-MODE-OPERATOIRE.md`, `docs/CONTRAT-CONTINUITE-COACH.md`, `adaptateurs/garmin/MCP.md` | Revue clause par clause, propositions de règles opérationnelles consolidées et registre de supersession | Gardien, compatibilité V2, tests de non-perte et accord explicite avant remplacement |
| **3 — Preuves et journaux techniques** | `docs/DECISIONS.md`, `docs/JOURNAL.md`, `maturation/architecture/ETAT.md`, `PLAN.md`, `scripts/migration-preuve.json` | Préparer un index de preuves épinglé au SHA et un archivage technique séparé | S'assurer de l'accessibilité durable et de l'absence de dépendances CI |
| **4 — Archives et mémoire métier** | `domaines/planification/archives/` et données métier historiques/transversales | **Lecture et tri exclusivement sous responsabilité Coach/propriétaire** ; pas de transfert, copie, suppression ou anonymisation improvisés | Autorisation spécifique, conservation des liens, consentement et preuve de récupération |

Il est possible d'alléger la lecture **avant** la suppression : utiliser [ETAT-COURANT-REFERENCE.md](ETAT-COURANT-REFERENCE.md) comme fiche synthétique, puis garder les preuves ailleurs jusqu'à décision.

## Prérequis incontournables de tout retrait futur

1. Décrire chaque fichier et son rôle actif/révolu, avec SHA et raison de la décision.
2. Rechercher toutes les dépendances **réelles** (imports, scripts, tests, workflows, docs, projections, références externes connues).
3. Établir la preuve que **chaque fait, contrainte ou règle encore valable** est conservé dans son domaine ou document canonique, sans double source.
4. Préparer un plan de retour arrière, une preuve d'archive, la comparaison de l'état exact avant/après et le dispositif de confidentialité.
5. Obtenir l'autorisation du **propriétaire sur des chemins précis**, la revue du Gardien si règle comportementale, puis contrôler CI, publication éventuelle et données réellement servies. Ne jamais présumer un droit à effacer.
6. Si le but est d'effacer l'accès public à des informations déjà publiées, définir un **chantier distinct de confidentialité** ; supprimer HEAD seulement est insuffisant.

La [revue des 30 rubriques de reprise](REVUE-REPRISE-30-RUBRIQUES.json) distingue règles V2 apparentes, segments historiques remplacés et mélanges à scinder. Ce diagnostic n'est **pas** une certification sémantique exhaustive de toutes les phrases.

**Décision actuelle :** aucune suppression autorisée ; `main`, les branches A/B/B2 et Garmin inchangés ; PR #9 en brouillon.

## 13 novembre 2026 — Résultat de la vague préparatoire (sans suppression supplémentaire)
La première qualification des **161 rubriques historiques** est désormais complète au niveau des titres/rubriques : voir [revue des 87 restantes](REVUE-SEMANTIQUE-87-RUBRIQUES.md). Les **24 rubriques mixtes**, **5 V1 remplacées** et **4 états datés** de ce lot requièrent conservation des preuves et examen clause par clause avant remplacement ; les classes ne sont pas des verdicts de conformité.

Après le mini-lot n°1 fusionné (PR #10), un [mini-lot n°2 en brouillon](https://github.com/hameaufl/programme-sport/pull/11) propose seulement **deux fichiers et quatre substitutions** de renvois documentaires V2. **Aucune fusion ni suppression n'est autorisée par cette fiche.** Les arbitrages INC-005/REF-06 restent décrits dans [DECISIONS-A-SOUMETTRE-2026-11-13.md](DECISIONS-A-SOUMETTRE-2026-11-13.md). Les archives et données métier ne sont pas touchées.

## Fusion approuvée du mini-lot n°2 — 13 novembre 2026
Après accord du propriétaire, la [PR #11](https://github.com/hameaufl/programme-sport/pull/11) a été fusionnée au commit `cf9241b9740be8e6c3f80058a45f76e197a4bb44`, avec [CI Pages](https://github.com/hameaufl/programme-sport/actions/runs/43465068468) réussie et version servie vérifiée. **Deux fichiers documentaires, quatre corrections ciblées ; aucune permission Garmin et aucune suppression historique nouvelle.** La mention antérieure « en brouillon » est conservée comme photographie de préparation. Les arbitrages INC-005, REF-06 et PR #9 restent indépendants et ouverts.
