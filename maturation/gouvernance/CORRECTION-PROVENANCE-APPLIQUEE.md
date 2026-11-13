# Rectification de provenance : 73 obligations historiques et 12 nouvelles propositions

**État : modification de traçabilité du brouillon expérimental, non validation de ses règles.** La matrice initiale et les valeurs précédentes restent consultables dans les commits antérieurs.

L'audit avait révélé 12 familles d'agents fictivement rattachées à `AGENTS.md L3` du `main` historique, alors que cette ligne impose un nommage Garmin. La distinction est maintenant représentée directement :

- **73 obligations historiques** : `type_provenance: "obligation_historique"` et lien immuable du `main`.
- **12 exigences NOUVELLES de gouvernance** : `type_provenance: "proposition_nouvelle_gouvernance"`, `source_historique: null`, et lien `source_proposition` au premier commit expérimental `7a8016955`.
- La [matrice des 85 familles](MATRICE-COUVERTURE.md) indique « Nouvelle proposition » pour les 12 lignes.
- Le validateur exige le bon SHA pour chaque type et interdit de requalifier une proposition en obligation historique, sans prétendre vérifier la vérité sémantique des 73 autres références.

La [base d'anomalies initiale](AUDIT-ANCRAGES-SEMANTIQUES.json) reste **un instantané des erreurs d'origine**, non une mesure de l'état corrigé : douze faux liens désormais rectifiés dans le référentiel actif de travail, treize hors sujet et treize imprécis restant à revoir, et 47 jugés plausibles sans certification. **La couverture sémantique des 161 rubriques de `main` reste NON certifiée.**

Aucun comportement d'agent ou permission n'a été changé par ce correctif. Les protections GitHub, l'accord du propriétaire et le visa Gardien restent manquants.
