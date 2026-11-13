# Adaptateurs techniques

Les adaptateurs sont des composants remplaçables : accès aux sources, projections de lecture, intégrations externes et ressources Web. Aucun adaptateur n'est propriétaire d'un fait métier.

- `fichiers/` : ports de lecture des quatre domaines.
- `garmin/` : préparation locale de séances et opérations Garmin MCP **sur demande explicite et ciblée**. La préparation ne réalise aucune écriture distante.
- `projections/` : jointures par identifiants et listes blanches des données autorisées par les contrats de publication.
- `web/` : composants techniques utilisés lors du build du site.

Le domaine Planification conserve les prescriptions, Activités les réalisations confirmées, Santé les ressentis et rapports et Coaching les objectifs, décisions et équipements. Ne pas copier des informations brutes dans l'add-on Web. Pour la sécurité et les frontières : `contrats/DEPENDANCES.md`, `contrats/PORTS.md`, `docs/PROCEDURE-MIROIR-WEB.md` et `adaptateurs/garmin/MCP.md`.
