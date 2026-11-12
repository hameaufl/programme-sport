# Mon Rythme — application statique

## Entraînements Garmin (exemple du 11 novembre 2026)

Un premier fichier **FIT Workout** est disponible dans le détail de la séance de course du **11 novembre** : 3 × (2 min marche + 3 min course) puis 2 min marche, soit 17 min. Il se télécharge directement depuis Mon Rythme et est stocké dans `personnel/pieces-jointes/seances/course-2026-11-11/prevu/`. La compatibilité syntaxique est testée ; **l'installation du fichier FIT Workout externe dans Garmin Connect ou sur la Venu 4 n'est pas confirmée**. Les séances que l'utilisateur crée dans Garmin Connect peuvent, elles, être envoyées à la montre.

Le script `node scripts/generer-garmin.cjs <id>` génère les FIT Workout pour les formats de séries marche/course pris en charge ; le Coach doit rattacher les vrais fichiers à la séance individuelle, et ne jamais produire un FIT Activity fictif.

## Sources séparées et vues de consultation rapides

La source du calendrier est désormais **un fichier JSON par séance** sous `personnel/seances/AAAA/MM/<id>.json` ; objectifs et cycle dans `personnel/config.json`. Les rapports et événements santé sont individualisés. GitHub Actions valide toutes les données, puis produit dans l'artefact Pages un **index léger et un JSON pour chaque semaine** : le navigateur ne récupère que la semaine consultée. La page santé consulte les compteurs pré-calculés et des pages d'événements de 30 entrées.

**Aucun clone des séances dans le dépôt** : `data/` n'existe que dans `_site/`, créé par `node scripts/construire-site.cjs`. `personnel/programme.js` a été retiré après transfert des 18 objets **sans modification**, et la correspondance originale est conservée sous forme de métadonnées dans `scripts/migration-preuve.json`.

Le Coach ne change que le fichier de séance ciblé ; la CI contrôle les suppressions et les gros lots. Navigation actuelle exclusivement **hebdomadaire**.


Site : https://hameaufl.github.io/programme-sport/ — dépôt GitHub public, branche `main`.

## Indexation par les moteurs de recherche

**Décision du propriétaire : site public, mais non indexé.** L'HTML contient `robots: noindex, nofollow` et `googlebot: noindex, nofollow`. Le contrôle automatique bloque les publications si ces métadonnées sont absentes.

Un `robots.txt` dans ce sous-dossier GitHub Pages ne remplace pas les directives de page : le fichier `robots.txt` effectif doit résider à la racine de l'hôte. Ne pas bloquer le robot avec un `robots.txt` si l'on attend qu'il découvre `noindex`.

**Limites :** les directives sont respectées par les moteurs compatibles, mais n'offrent pas d'authentification ; les données de `personnel/`, les fichiers éventuels et le dépôt GitHub public peuvent être découverts ou partagés autrement. Une page déjà indexée pourra nécessiter une nouvelle exploration pour disparaître.

## Deux vues de Mon Rythme

- [Mon programme](https://hameaufl.github.io/programme-sport/) : calendrier et séances.
- [Mon suivi santé](https://hameaufl.github.io/programme-sport/sante.html) : première interface de bilan de la reprise sportive, profil, journal et réalisations confirmées.

La seconde page s'appuie sur les **vues générées** depuis les fichiers individuels de séance, les événements de santé et `personnel/sante/PROFIL.md`. Les deux pages sont marquées `noindex` ; les fichiers servis par Pages restent publics.

## Architecture sans doublon de données

- **Construction :** `index.html`, [docs/](docs/REPRISE.md), [AGENTS.md](AGENTS.md), `scripts/`, `.github/`.
- **Données personnelles :** [personnel/](personnel/README.md) — une source **par séance**, rapports et événements individualisés, santé et futures pièces jointes.

La page ne charge que `data/index.json` puis `data/semaines/<lundi>.json` au besoin. Les artefacts restent des **résultats temporaires de publication** et non des copies entretenues dans Git. Pour les anciens HTML mis en cache, le build produit temporairement des fichiers de compatibilité sous `_site/personnel/`, sans source concurrente.

## Casquettes et publication

- **Coach :** travaille uniquement dans `personnel/`, actualise les retours/activités dans l'échange ; aucun changement d'interface.
- **Maturation :** construit l'application, les scripts, la documentation et la présentation ; aucun ajout graphique sans demande ou approbation.
- **Push automatique :** tout commit touchant `personnel/**` sur `main` **déclenche GitHub Actions**. Le Coach doit contrôler `success`, pas utiliser `Run workflow` habituellement.

[Voir la procédure de reprise](docs/REPRISE.md) · [Voir les rôles](docs/ROLES.md) · [Voir les déploiements](https://github.com/hameaufl/programme-sport/actions/workflows/publier-pages.yml).

## Contrôles

`node scripts/verifier-site.cjs` : contrats des séances individuelles, identifiants, semaines, rapports et événements, test fictif 5 000 séances, JavaScript et versions. `node scripts/verifier-changements.cjs` contrôle la portée des modifications ; `node scripts/construire-site.cjs` produit les JSON hebdomadaires, le journal paginé et les fichiers de compatibilité hors Git.

La publication automatique utilise des jobs `build` et `deploy` séparés, avec vérification de la disponibilité de l'artefact avant déploiement. Le site peut momentanément subir un délai de diffusion/cache ; un commit ne suffit pas à attester une publication réussie.
