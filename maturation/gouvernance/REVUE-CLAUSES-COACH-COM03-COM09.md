# Revue ciblée des clauses Coach COM-03 à COM-09 — conflits V1/V2

**Date : 13 novembre 2026 · Statut : instruction documentaire, non normative.**

Références : `docs/COACH-MODE-OPERATOIRE.md` au SHA historique `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4` ; preuves de V2 consultées sur `main` au SHA `e28b8cac98d20b78fd4835392b53afeeed18c234` (après PR #10). **Aucun outil Garmin distant consulté.**

[Table des 26 points, lignes et fragments exacts](REVUE-CLAUSES-COACH-COM03-COM09.json). Les citations Git sont automatiquement vérifiées ; **leur existence n'établit pas à elle seule la véracité de l'interprétation**.

| Première appréciation | Nombre de points |
| --- | ---: |
| Alignement documentaire avec la V2 | 13 |
| Instructions antérieures supplantées dans l'état courant du dépôt | 6 |
| Contradictions entre versions historiques, à documenter | 2 |
| Arbitrage requis avant toute exécution sensible | 3 |
| État distant Garmin non vérifié | 2 |
| **Total** | **26** |

Ce sont **26 points ciblés**, pas un audit exhaustif de toutes les sous-clauses de COM-03 à COM-09 ni des 161 rubriques historiques.

## Ce que les sources V2 permettent de trancher documentairement

### 1. Nom publié et titre « Programme prévu »

La source canonique `domaines/planification/donnees/seances/2026/11/renfo-2026-11-13.json`, ligne 6, contient `nomEntrainementMontre: "Reprise - Renfo A"` à la référence V2 étudiée. Le code `addons/web/pages/index.html` (lignes 189–197) restitue ce nom **dans le même titre** que « Programme prévu » et indique « Séance » si la séance est réalisée. La projection `contrats/publication-v1.json` autorise ce seul nom sous liste blanche.

Les valeurs anciennes « Mon Rythme - Renfo A » et « Mon Rythme - Renfo A (corrigé) » dans COM-03/COM-04, de même que « dans un encart séparé », décrivent des étapes de l'historique ou un rendu antérieur : **elles ne doivent pas remplacer la source ni le code V2 courants**. Le `MCP.md` conserve pourtant une indication « convention de nommage définitive non fixée » à sa ligne 64, alors que ses premières priorités fixent déjà une convention de préfixe : préparer une **correction de documentation ciblée**, sans renommer quoi que ce soit dans Garmin.

**Limite importante :** les fichiers Git attestent de la valeur enregistrée et du code de rendu, **pas** de la valeur actuellement présente dans Garmin Connect, de l'absence d'un modèle homonyme ni de l'état de synchronisation de la montre.

### 2. Modèle détaillé et Web allégé

COM-05 contient deux obligations compatibles : conserver les blocs complets de prescription dans Planification et réduire les libellés de renforcement exposés au Web, sans transformer une séance prévue en activité réalisée. La projection `adaptateurs/projections/lecture.cjs`, lignes 99–100, comporte ce filtrage.

La règle de **relecture stricte après création d'un modèle Garmin** demeure présente dans `adaptateurs/garmin/MCP.md`, ligne 51. Cette obligation de vérification n'autorise cependant **aucune création, suppression, programmation ou transmission** sans demande explicite couvrant l'opération et les cibles.

### 3. Chronologie des Renfos et fausses « dernières priorités »

Les passages COM-06 à COM-09 mélangent des photographies successives des 12–13 novembre, parfois présentées comme « priorité actuelle ». La prescription retenue dans la source Planification au SHA examiné est datée du **13 novembre 2026** ; elle a remplacé les brouillons précédents, qui restent en archive. L'ancienne mention « aucun modèle Garmin créé » précède le compte rendu de création ultérieur. **Les sections anciennes ne doivent ni reprogrammer une date ni recréer un brouillon.**

L'état « séance prévue » dans le document historique n'est pas une preuve de non-réalisation à une date ultérieure ; le statut actuel des activités dépend de leurs sources canoniques, non du récit ancien.

## Ce qui reste en arbitrage

1. **Recréation d'un entraînement pour le renommer.** COM-03 décrit une manipulation passée et la méthode utilisée. Le contrat MCP exige toujours une demande explicite avant création ; la méthode décrite n'est pas un ordre renouvelable.
2. **Suppression d'un ancien modèle intermédiaire.** COM-03 et COM-05 présentent une autorisation conditionnelle pour un brouillon de la même opération, alors que `MCP.md` impose aussi un accord spécifique pour toute suppression et interdit un effacement sans demande explicite. **Ne pas présumer que l'accord daté vaut pour une autre opération.**
3. **État réel de la bibliothèque et des calendriers Garmin.** Les déclarations historiques sur les modèles existants/supprimés ne sont pas cohérentes entre elles et n'ont pas été relues à distance pendant cet audit. Aucun statut « actuellement vérifié » ne peut en être déduit.

**Position conservatoire :** aucune opération Garmin en écriture, aucun nouvel accord réputé acquis ; toute ambiguïté de suppression doit être présentée au propriétaire et au Gardien dans le dossier d'incohérences avant de produire une règle de production consolidée. Les INC-001 à INC-008 restent ouvertes.

## Proposition de mini-lot suivant — **non appliqué**

Une fois les permissions clarifiées et les clauses contrôlées avec le propriétaire, proposer un lot très limité séparant dans `docs/COACH-MODE-OPERATOIRE.md` : (a) les règles V2 toujours applicables, (b) les événements historiques datés et leurs sources, (c) les opérations Garmin nécessitant une autorisation exacte. Harmoniser ensuite la mention de convention de nommage dans `adaptateurs/garmin/MCP.md`, **sans suppression des preuves**. Ces modifications affecteraient des instructions de comportement et nécessitent validation Gardien et approbation explicite avant toute fusion.

Aucune modification n'est effectuée dans `main`, les domaines, `AGENTS.md`, Garmin, les fichiers métier, les archives, les contrats ou le site. Les branches A/B/B2 et le statut de la PR #9 restent inchangés.
