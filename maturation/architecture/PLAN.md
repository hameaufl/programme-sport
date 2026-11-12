# Découplage intégral approuvé — plan par phases

## 1. Inventaire, contrats et responsabilités
Verrouiller les identifiants, les frontières, les données effectivement exposées et la parité du comportement existant. Ne pas déplacer de données personnelles lors de cette phase.

## 2. Séparer les sources métier
La planification contient exclusivement les prescriptions; les activités réalisées sont des faits distincts; la santé conserve les sensations et rapports; le coaching conserve les préférences et les raisons des arbitrages. Déplacer fichiers et références, sans perte ni réécriture du contenu factuel. Lier par `id`.

## 3. Adaptateurs indépendants
L'adaptateur Garmin Connect par MCP est un consommateur de prescriptions, pas un détenteur de programme : aucun fichier FIT à construire localement ni à publier. L'interface devient un add-on sans donnée canonique. Le build produit un modèle de lecture explicitement autorisé au lieu de recopier aveuglément les sources. Suppression de l'add-on sans altérer les domaines ni l'adaptateur Garmin MCP.

## 4. Portabilité et confidentialité
Prouver l'indépendance de stockage et des chemins, interdire les imports inversés, comparer les données avant/après et contrôler le contenu publié. Documenter les limites du dépôt public et les étapes nécessaires pour passer à une source privée.

## Règle de déploiement
Implémentation sur branche isolée; publication sur `main` seulement après validation de l'ensemble. Pas de déplacement des données vers un hébergement privé sans choix explicite du propriétaire.

## 12 novembre 2026 — Mon Rythme sans fichiers d'entraînement ; Garmin Connect par MCP

- **Choix explicitement validé** : supprimer tous les 33 fichiers FIT d'entraînements prévus du dépôt courant, retirer le générateur local et tous les téléchargements/mentions Garmin du site Web. Le Web continue d'afficher les 36 programmes, leurs informations, les états et les PNG.
- **Architecture** : adaptation séparée `adaptateurs/garmin/mcp.cjs`, sans effet de bord ; la source reste les blocs structurés de Planification V2. La création dans Garmin Connect et l'affectation de dates sont opérées par le Coach via le MCP personnalisé, jamais par le Web ou une CI.
- **Modèles réutilisables** : même entraînement pour plusieurs dates du calendrier ; premier contrôle des modèles existants obligatoire. Nommage non encore fixé ; réutiliser les prescriptions identiques et ne pas créer un modèle par date.
- **Bêta** : aucune création ni programmation Garmin avant demande explicite sur une ou plusieurs dates nommées par le propriétaire. Ne pas anticiper plusieurs semaines ; aucun envoi automatique à la montre. Premier essai complet Venu 4 restant à confirmer.
- **Contrôles** : vérifier l'absence de fichiers externes et de références dans toute sortie Web, y compris publication standard/restrictive. Les programmes effectués, ressentis et rapports existants sont préservés ; les anciens binaires restent techniquement dans l'historique Git.

