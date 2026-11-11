# Contexte technique — Maturation

Mon Rythme : site statique responsive et francophone, GitHub Pages via GitHub Actions, branche `main`.

## Arborescence

- `index.html` : interface, calendrier, navigation et indicateurs statiques.
- `personnel/programme.js` : **unique source versionnée des données utilisateur**, chargée directement avec paramètre anti-cache.
- `personnel/sante/`, `personnel/pieces-jointes/`, `personnel/DECISIONS.md`, `personnel/JOURNAL.md`, `personnel/GARMIN.md` : santé, données sportives et mémoire Coach.
- `docs/` : architecture, mise en production, rôles et documentation de Maturation ; aucun jeu de données sportif copié.
- `scripts/verifier-site.cjs` et `.github/workflows/publier-pages.yml` : tests et pipeline.

## Fonctionnement

- Ouverture sur la semaine courante lundi-dimanche, date dynamique, bouton « Semaine en cours » visible au repos.
- `fait:false` : aucun statut ; `fait:true` : ✓ vert « Fait ». Notes seulement lorsqu'elles existent.
- Objectifs issus de la même source personnelle, rendus dans le conteneur existant de la page.
- Aucune saisie locale et aucun `localStorage`. Séances à `id` stables, descriptifs courts en puces.
- Aucun ajout visuel sans demande/approbation. Le Coach ne touche jamais l'IHM.

## Automatisation

Le workflow doit être déclenché automatiquement par tout commit sur `main` touchant le site ou **`personnel/**`**, y compris une mise à jour par Coach. Le job `build` contrôle le programme, crée un artefact de site comprenant la ressource au chemin `personnel/programme.js`; `deploy` attend sa disponibilité via API avant publication.

L'artefact de déploiement n'est **pas une duplication versionnée**. Le cache navigateur du HTML et des retards GitHub Pages restent possibles ; contrôler les Actions et, si accessible, `publication.txt`.

**Choix de visibilité :** dépôt public accepté pour les données fournies, mais jamais de secret Garmin ou de bilan inventé.
