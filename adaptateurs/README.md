# Adaptateurs techniques — architecture V2

Les adaptateurs sont des composants techniques **remplaçables** : accès aux données, intégrations externes, projections et ressources Web. Aucun ne détient la vérité métier, ne décide d'une séance ni n'autorise une écriture par sa seule présence. Le cœur des quatre domaines reste utilisable indépendamment du site et de Garmin.

- `adaptateurs/fichiers/` : ports de lecture des sources canoniques sous `domaines/*/donnees/`.
- `adaptateurs/garmin/` : connexion Garmin MCP en bêta ; préparation et vérification en lecture seule possibles via `mcp.cjs`. Aucune création, programmation, suppression, modification ou transmission à la montre sans autorisation explicite pour l'opération et les dates/cibles exactes. Pas de génération FIT locale ni de téléchargement FIT Web dans le processus courant.
- `adaptateurs/projections/` : projections par **liste blanche**, refus des champs non explicitement autorisés par `contrats/publication-v1.json` ou la politique restreinte.
- `adaptateurs/web/` : ressources et chemins de présentation, sans stockage de faits métier.

**Frontières :** Coach détient les faits et décisions sportifs ; Maturation détient l'architecture, les contrats, projections, scripts et validations. Les seuls changements HTML permis au Coach sont les fragments locaux de rendu métier déjà autorisés, sans extension à l'interface générale.

Ne jamais exposer les sources Santé ou Coaching brutes, les identifiants Garmin privés ou les anciens fichiers FIT dans l'add-on `addons/web/`. Références : `contrats/PORTS.md`, `contrats/DEPENDANCES.md`, `adaptateurs/garmin/MCP.md` et `docs/PROCEDURE-MIROIR-WEB.md`.
