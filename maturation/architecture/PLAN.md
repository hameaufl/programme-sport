# Découplage intégral approuvé — plan par phases

## 1. Inventaire, contrats et responsabilités
Verrouiller les identifiants, les frontières, les données effectivement exposées et la parité du comportement existant. Ne pas déplacer de données personnelles lors de cette phase.

## 2. Séparer les sources métier
La planification contient exclusivement les prescriptions; les activités réalisées sont des faits distincts; la santé conserve les sensations et rapports; le coaching conserve les préférences et les raisons des arbitrages. Déplacer fichiers et références, sans perte ni réécriture du contenu factuel. Lier par `id`.

## 3. Adaptateurs indépendants
Garmin FIT devient un consommateur de plans, pas un détenteur de programme. L'interface devient un add-on sans donnée canonique. Le build produit un modèle de lecture explicitement autorisé au lieu de recopier aveuglément les sources. Suppression de l'add-on sans altérer les domaines et le générateur Garmin.

## 4. Portabilité et confidentialité
Prouver l'indépendance de stockage et des chemins, interdire les imports inversés, comparer les données avant/après et contrôler le contenu publié. Documenter les limites du dépôt public et les étapes nécessaires pour passer à une source privée.

## Règle de déploiement
Implémentation sur branche isolée; publication sur `main` seulement après validation de l'ensemble. Pas de déplacement des données vers un hébergement privé sans choix explicite du propriétaire.
