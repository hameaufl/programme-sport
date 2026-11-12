# Données personnelles — sources individuelles

**Coach : responsable exclusif des données de séance et de santé ; Maturation n'intervient pas sur les faits.**

- **`seances/AAAA/MM/<id>.json`** : une séance par fichier, tous les champs de la séance (titre, date, statut, exercices, structures, sensations). **ID stable ; ne jamais réécrire les autres fichiers.**
- **`config.json`** : version du schéma, objectifs et date de début du cycle.
- **`NOTES-CYCLE.txt`** : commentaires historiques du programme antérieur, sans duplication de séances.
- **`sante/rapports/AAAA/MM/<id>.md`** : compte rendu détaillé d'une séance, lié par identifiant.
- **`sante/evenements/AAAA/MM/<date>-<sujet>.md`** : événements santé datés (équipements, bilans reçus), indépendants des séances.
- **`sante/SUIVI.md`** : modèle de saisie et règles, non un journal monolithique.
- **`pieces-jointes/`**, **`GARMIN.md`** : mêmes conventions d'archives réelles et de liens.

**Règle d'édition** : lire les derniers commits et le fichier ciblé, modifier uniquement les champs demandés, ne supprimer aucun ID ni aucun fichier. Les modifications multi-séances (plus de quatre JSON à la fois) demandent un accord explicite, puis `[lot-valide]` dans le message du commit. Les validations tournent en CI ; une publication n'est déclarée terminée qu'après succès GitHub Actions.

Le site utilise des **fichiers hebdomadaires générés par `scripts/construire-site.cjs`** ; ne pas les éditer dans Git. Les sources et exports sportifs restent **publics**.
