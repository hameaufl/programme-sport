# Proposition de remplacement de adaptateurs/README.md — état V2

**Brouillon non déployé.**

Les adaptateurs sont des détails techniques remplaçables : stockage, lecture des domaines, **Garmin Connect par MCP** et projection filtrée vers l'add-on Web. Aucun adaptateur n'est une source de vérité métier ni ne crée de prescription à lui seul. Les domaines purs fonctionnent sans GitHub Pages ni Garmin.

- `adaptateurs/fichiers/` : ports et accès aux sources canoniques des domaines.
- `adaptateurs/garmin/mcp.cjs` : préparation et comparaison **en lecture seule**, sans génération locale FIT ni écriture distante implicite.
- `adaptateurs/projections/` : transformation contrôlée vers les contrats publics à liste blanche.
- `adaptateurs/web/` : ressources et chemins servant uniquement la présentation.

Le Coach reste propriétaire des faits et contenus sportifs ; Maturation assure les contrats, l'infrastructure et les tests. Une action Garmin en écriture exige une autorisation explicite, exacte et datée. Ne jamais importer directement les données métier brutes dans le Web.

**Application proposée :** remplacement du texte de `adaptateurs/README.md` après revue d'un petit lot de documentation et vérification CI. L'ancien README reste inchangé actuellement.
