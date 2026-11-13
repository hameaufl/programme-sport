# Frontières et contrats — architecture modulaire

## Règles opposables

1. Les domaines métier `planification`, `activites`, `sante` et `coaching` ne peuvent importer ni `addons/` ni `adaptateurs/`, ni dépendre de GitHub Pages ou d'un chemin de stockage.
2. Le Coach consomme les domaines via des identifiants métier et des ports; les décisions de coaching ne sont pas des observations de santé.
3. La planification ne détient ni compte rendu, ni sensation, ni lien vers un média/format de transfert. L'activité réalisée ne réécrit pas le programme prescrit.
4. Les données de santé ne contiennent pas de CSS, HTML, règles de publication ni représentation destinée au navigateur.
5. Garmin et le Web sont des **adaptateurs optionnels**. Ils consomment des vues métier explicites, sans imposer leurs propres conventions aux données source.
6. La publication est **deny-by-default**: elle ne sélectionne que les champs déclarés dans le contrat de lecture. Une modification de modèle n'implique jamais une exposition automatique.
7. Les identifiants `id` / `seanceId` sont durables; aucun domaine n'importe le chemin physique d'un autre domaine. Les connexions sont exclusivement faites par identifiants.
8. Les schémas et projections sont versionnés; pas de duplication manuelle des sources de vérité, pas de dépendance circulaire, pas de réécriture de faits réalisés.

## Flux autorisés

```text
sante ───────┐
activites ───┼──> coaching (lecture de faits autorisés)
preferences ─┘            │
                          v
                     planification
                          │
               projections/ports
                  /           \
       adaptateur Garmin    add-on Web
```

Les adaptateurs peuvent utiliser plusieurs domaines dans un **assemblage de lecture**; les domaines restent autonomes.

## Règles de sécurité

Le site et le dépôt sont actuellement publics. `noindex` n'est pas une authentification.
Le contenu d'une projection publique reste public, y compris ses copies, ses caches et les publications déjà effectuées.
Toute future extraction privée nécessite une politique de publication adaptée, un service authentifié pour des vues privées, et un plan d'assainissement des publications et historiques passés. L'architecture prépare cette évolution, sans prétendre l'avoir déjà accomplie.

## Projection de stratégie Coaching (12 novembre 2026)

Le domaine Coaching décide, porte `objectifs.json` et `orientation.json` et valide la forme de l'orientation dans son modèle pur. `adaptateurs/fichiers/depots.cjs` fournit des **ports de lecture** ; `adaptateurs/projections/coaching.cjs` **sélectionne les seuls champs autorisés** de l'objectif et des tendances/vigilances, sans sérialiser les notes, fichiers sources, historiques, rapports médicaux ou champs inconnus. Le builder choisit la politique de publication. `addons/web/pages/coach.html` lit exclusivement la projection générée ; il n'importe ni domaine, ni adapter, ni source originale. Les textes métier ne dépendent pas de l'interface. L'agent Coach rafraîchit le résumé à chaque arbitrage réel ; Maturation ne décide pas du programme. En mode restreint aucun résumé n'est publié.
