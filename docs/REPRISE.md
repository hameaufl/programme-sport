# Reprise entre LLM — Mon Rythme

Lire d'abord [AGENTS.md](../AGENTS.md), puis [ROLES.md](ROLES.md).

- **Maturation :** [CONTEXTE.md](CONTEXTE.md), [DECISIONS.md](DECISIONS.md), [JOURNAL.md](JOURNAL.md), `index.html`, `scripts/`, workflow.
- **Coach :** [personnel/README.md](../personnel/README.md), [personnel/DECISIONS.md](../personnel/DECISIONS.md), [personnel/JOURNAL.md](../personnel/JOURNAL.md), [personnel/programme.js](../personnel/programme.js), [personnel/sante/](../personnel/sante/README.md), [personnel/GARMIN.md](../personnel/GARMIN.md).

**Source personnelle unique** : `personnel/programme.js`, pas de `programme.js` à la racine. L'HTML charge cette ressource directement. Aucune copie permanente dans le dépôt.

Le Coach modifie `personnel/` à la réception d'un compte rendu, puis pousse sur `main`. **GitHub Actions se déclenche automatiquement** pour `personnel/**`, sans demande « Run workflow ». Contrôler `success` et ne pas annoncer un déploiement pendant `queued` / `failure`. Il ne change jamais l'IHM.

Maturation maintient exclusivement structure/interface/tests et ne touche pas aux données sportives. Toute évolution visuelle nécessite approbation explicite. Documenter toute décision dans **le journal du rôle**, pousser et vérifier les fichiers.

## Non-indexation du site

`index.html` doit conserver `<meta name="robots" content="noindex, nofollow">` et `<meta name="googlebot" content="noindex, nofollow">`. Le test prépublication vérifie cette règle. **Ne pas ajouter un `robots.txt` dans le sous-répertoire** comme substitut : seul celui de la racine de l'hôte est pertinent, et bloquer le crawl peut neutraliser la lecture du `noindex`.

Le site demeure **public** et le dépôt GitHub est consultable. Le `noindex` n'empêche pas l'accès direct ni la découverte des fichiers hors des moteurs qui respectent la règle.

## Vérifications prépublication

`node scripts/verifier-site.cjs` : syntaxe JS, objectifs, séances/semaines/ID, chemin d'accès unique, absence de doublon, témoins. Workflow : jobs `build` et `deploy` distincts, attente API artefact, puis contrôle du statut.

## Instruction de transfert

> Reprends le dépôt `hameaufl/programme-sport`. Lis `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et les fichiers de ta casquette **[Coach / Maturation]**. Conserve la séparation physique sans duplication. Après tout changement, pousse et journalise, puis contrôle GitHub Actions.

Les anciennes variantes et le détail du contexte restent disponibles dans les registres propres à chaque rôle et dans l'historique Git.
