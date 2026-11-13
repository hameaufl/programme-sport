# REF-06 — dossier de provenance et proposition d'arbitrage

**13 novembre 2026 · Statut : proposition de rectification non appliquée.**

**Question :** « Le registre actif est seulement index : ne pas copier les sources métier » est-il une obligation historique déjà présente sur `main` ou une règle spécifique nouvelle introduite par le chantier du Gardien ?

## Confrontation des sources exactes

La matrice `COUVERTURE-PROTOCOLES.json` classe REF-06 comme `obligation_historique` en citant `contrats/DEPENDANCES.md` **ligne 3** au SHA historique `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. Cette ligne est uniquement le titre **« Règles opposables »** : elle ne contient aucune mention de Gardien ou d'index.

Le même contrat (ligne 12) interdit la **duplication manuelle des sources de vérité**. Il soutient le *principe général* de non-duplication ; il ne définit ni le registre ni l'organisation du rôle Gardien. La référence à une source métier n'est donc **pas** une preuve historique directe de la règle précise.

La **formulation explicite** apparaît en revanche à la **ligne 39** de `maturation/gouvernance/CHARTE.md`, dès le premier commit expérimental `7a8016955cf74f312e40fc7b82bccca84020c9eb` : « L'index du Gardien renvoie aux sources canoniques, ne les remplace pas ». La charte est marquée « proposition de fonctionnement testable » et non « norme approuvée ».

## Conclusion proposée, non adoptée

**Classer REF-06 comme proposition nouvelle de gouvernance**, avec `source_historique = null` et `source_proposition` pointant vers le premier commit de `CHARTE.md#L39`. Le compte de la matrice passerait, sous réserve de revue et d'accord, de **73 exigences historiques + 12 propositions nouvelles** à **72 + 13**, sans changer son total de **85**.

Le principe de non-duplication continue à s'appliquer dans les contrats V2 **indépendamment** du statut particulier de REF-06. La proposition ne donne **aucune autorité accrue au Gardien** et ne transforme pas les documents de gouvernance en sources métier.

**Ne rien appliquer avant arbitrage :** `COUVERTURE-PROTOCOLES.json`, la matrice Markdown et les vérificateurs 73/12 restent volontairement inchangés ; toute correction future devra être atomique, traçable et munie de tests des deux origines. Le dossier ne clôt ni `REF-06` ni les huit INC.

[Preuve structurée et vérifiable](REF-06-PROVENANCE-CANDIDATE.json).
