# État de livraison de la refonte V2

- Branche de travail : `refonte/modularisation-metiers-20261112`.
- Référence historique immuable : `d701006bc640695861c5eb48c6421cdea398ea0d`.
- Périmètre : 36 séances, 33 fichiers FIT, 3 rapports santé, 2 événements, 5 images PNG; Coach, Santé, Planification et Activités découplés.
- Contrats : `contrats/DEPENDANCES.md`, `contrats/PORTS.md`, politiques de publication.
- Contrôles : `node scripts/verifier-site.cjs` ; `node maturation/architecture/verifier-portabilite.cjs` ; `node maturation/architecture/verifier-migration.cjs` (preuve ponctuelle seulement); `MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs` et contrôle de fuite.
- La migration de l'hébergement confidentiel effectif, les accès authentifiés et l'assainissement de l'ancien historique public sont hors de cette opération : ils nécessitent un choix de stockage privé et un projet de confidentialité distinct.
