# Mon Rythme — application statique

Site : https://hameaufl.github.io/programme-sport/ — dépôt GitHub public, branche `main`.

## Architecture sans doublon de données

- **Construction :** `index.html`, [docs/](docs/REPRISE.md), [AGENTS.md](AGENTS.md), `scripts/`, `.github/`.
- **Données personnelles :** [personnel/](personnel/README.md) — une seule source versionnée `personnel/programme.js`, état des séances, sensations, santé et futures pièces jointes.

La page charge directement `./personnel/programme.js` ; **aucun deuxième fichier programme dans Git**. L'artefact temporaire GitHub Pages est un résultat technique de publication, pas une copie entretenue dans le dépôt.

## Casquettes et publication

- **Coach :** travaille uniquement dans `personnel/`, actualise les retours/activités dans l'échange ; aucun changement d'interface.
- **Maturation :** construit l'application, les scripts, la documentation et la présentation ; aucun ajout graphique sans demande ou approbation.
- **Push automatique :** tout commit touchant `personnel/**` sur `main` **déclenche GitHub Actions**. Le Coach doit contrôler `success`, pas utiliser `Run workflow` habituellement.

[Voir la procédure de reprise](docs/REPRISE.md) · [Voir les rôles](docs/ROLES.md) · [Voir les déploiements](https://github.com/hameaufl/programme-sport/actions/workflows/publier-pages.yml).

## Contrôles

`node scripts/verifier-site.cjs` : contrats des données, identifiants et semaines, JavaScript, absence de stockage local, chemin unique, témoin de version.

La publication automatique utilise des jobs `build` et `deploy` séparés, avec vérification de la disponibilité de l'artefact avant déploiement. Le site peut momentanément subir un délai de diffusion/cache ; un commit ne suffit pas à attester une publication réussie.
