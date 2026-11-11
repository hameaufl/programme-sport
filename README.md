# Mon Rythme — application statique

Site : https://hameaufl.github.io/programme-sport/ — dépôt GitHub public, branche `main`.

## Indexation par les moteurs de recherche

**Décision du propriétaire : site public, mais non indexé.** L'HTML contient `robots: noindex, nofollow` et `googlebot: noindex, nofollow`. Le contrôle automatique bloque les publications si ces métadonnées sont absentes.

Un `robots.txt` dans ce sous-dossier GitHub Pages ne remplace pas les directives de page : le fichier `robots.txt` effectif doit résider à la racine de l'hôte. Ne pas bloquer le robot avec un `robots.txt` si l'on attend qu'il découvre `noindex`.

**Limites :** les directives sont respectées par les moteurs compatibles, mais n'offrent pas d'authentification ; les données de `personnel/`, les fichiers éventuels et le dépôt GitHub public peuvent être découverts ou partagés autrement. Une page déjà indexée pourra nécessiter une nouvelle exploration pour disparaître.

## Deux vues de Mon Rythme

- [Mon programme](https://hameaufl.github.io/programme-sport/) : calendrier et séances.
- [Mon suivi santé](https://hameaufl.github.io/programme-sport/sante.html) : première interface de bilan de la reprise sportive, profil, journal et réalisations confirmées.

La seconde page est **alimentée directement** par `personnel/programme.js` et les deux fichiers `personnel/sante/PROFIL.md` et `personnel/sante/SUIVI.md`, sans copier le contenu individuel dans le HTML. Les deux pages sont marquées `noindex`; les fichiers servis par Pages restent publics.

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
