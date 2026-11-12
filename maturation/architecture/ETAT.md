# État de livraison de la refonte V2

- Branche de travail : `refonte/modularisation-metiers-20261112`.
- Référence historique immuable : `d701006bc640695861c5eb48c6421cdea398ea0d`.
- Périmètre : 36 séances, 33 fichiers FIT, 3 rapports santé, 2 événements, 5 images PNG; Coach, Santé, Planification et Activités découplés.
- Contrats : `contrats/DEPENDANCES.md`, `contrats/PORTS.md`, politiques de publication.
- Contrôles : `node scripts/verifier-site.cjs` ; `node maturation/architecture/verifier-portabilite.cjs` ; preuve historique conservée dans les anciens commits ; `MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs` et contrôle de fuite.
- La migration de l'hébergement confidentiel effectif, les accès authentifiés et l'assainissement de l'ancien historique public sont hors de cette opération : ils nécessitent un choix de stockage privé et un projet de confidentialité distinct.

## 12 novembre 2026 — Mon Rythme sans fichiers d'entraînement ; Garmin Connect par MCP

- **Choix explicitement validé** : supprimer tous les 33 fichiers FIT d'entraînements prévus du dépôt courant, retirer le générateur local et tous les téléchargements/mentions Garmin du site Web. Le Web continue d'afficher les 36 programmes, leurs informations, les états et les PNG.
- **Architecture** : adaptation séparée `adaptateurs/garmin/mcp.cjs`, sans effet de bord ; la source reste les blocs structurés de Planification V2. La création dans Garmin Connect et l'affectation de dates sont opérées par le Coach via le MCP personnalisé, jamais par le Web ou une CI.
- **Modèles réutilisables** : même entraînement pour plusieurs dates du calendrier ; premier contrôle des modèles existants obligatoire. Nommage non encore fixé ; réutiliser les prescriptions identiques et ne pas créer un modèle par date.
- **Bêta** : aucune création ni programmation Garmin avant demande explicite sur une ou plusieurs dates nommées par le propriétaire. Ne pas anticiper plusieurs semaines ; aucun envoi automatique à la montre. Premier essai complet Venu 4 restant à confirmer.
- **Contrôles** : vérifier l'absence de fichiers externes et de références dans toute sortie Web, y compris publication standard/restrictive. Les programmes effectués, ressentis et rapports existants sont préservés ; les anciens binaires restent techniquement dans l'historique Git.

