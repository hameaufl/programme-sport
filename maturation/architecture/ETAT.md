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

## 12 novembre 2026 — Nouvelle préférence Garmin : gestes officiels, pédagogie, animation et suivi du matériel

- **Décision utilisateur applicable aux futurs exercices et révisions de Renfo :** le Coach sélectionne **autonomement** ses mouvements exclusivement dans le **catalogue officiel des exercices Garmin**. Il vérifie catégorie, identité du geste, éventuelle fiche/description, besoin de matériel et pertinence pour le programme. Il ne crée aucun mouvement inédit, ne rebaptise pas un mouvement voisin et ne suppose jamais un exercice « reconnu » sans vérification ; le Coach garde la responsabilité du choix des exercices ainsi que du volume, des séries et des répétitions adaptés.
- **Préférence pédagogique forte :** exercices documentés et, idéalement, animés sur la Venu 4. **Limite vérifiée du constructeur :** Garmin ne fournit les animations sur montre que pour certains entraînements **prédéfinis**, et **pas pour les séances personnalisées** créées dans Garmin Connect/MCP, même avec des exercices classifiés. Le Coach doit expliciter cette différence et privilégier un vrai entraînement prédéfini animé si l'animation est impérative, sans le substituer automatiquement au plan personnalisé ; choix d'arbitrage restant ouvert.
- **Nouvelle source de vérité de l'équipement :** `domaines/coaching/donnees/equipements.json`, modélisée et validée indépendamment des prescriptions. Déclarés disponibles : tapis de sol et gros ballon de gymnastique (~80 cm). Déclarés absents : élastiques de résistance et haltères. Aucun autre accessoire n'est confirmé. Le poids du corps est privilégié. Les envies d'achat ne prouvent pas la disponibilité ; seul un retour explicite du propriétaire actualise l'inventaire.
- **Portée :** ne modifier aucune séance déjà écrite ou réalisée du seul fait de cette nouvelle préférence. Aucun envoi ni création Garmin n'est autorisé par cette décision : la règle de bêta imposant des dates explicitement demandées demeure. Les anciens choix de dessins PNG concernent la présentation Web et ne confèrent pas un statut officiel Garmin aux anciens mouvements.
- **Références fabricant :** https://support.garmin.com/en-US/?faq=IPD6X8JSLBAUQOXvz7zBO6 ; documentation Venu 4 https://www8.garmin.com/manuals/webhelp/GUID-2CF5620C-E585-4E0A-9CC3-9565533EEE4D/EN-US/GUID-B7EDF898-AC46-4504-A12A-A1FFA1756878.html.

