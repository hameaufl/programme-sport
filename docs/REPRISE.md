# Reprise entre LLM — Mon Rythme

Lire d'abord [AGENTS.md](../AGENTS.md), puis [ROLES.md](ROLES.md).

- **Maturation :** [CONTEXTE.md](CONTEXTE.md), [DECISIONS.md](DECISIONS.md), [JOURNAL.md](JOURNAL.md), `index.html`, `scripts/`, workflow.
- **Coach :** [personnel/README.md](../personnel/README.md), [personnel/DECISIONS.md](../personnel/DECISIONS.md), [personnel/JOURNAL.md](../personnel/JOURNAL.md), [personnel/programme.js](../personnel/programme.js), [personnel/sante/](../personnel/sante/README.md), [personnel/GARMIN.md](../personnel/GARMIN.md).

**Source personnelle unique** : `personnel/programme.js`, pas de `programme.js` à la racine. L'HTML charge cette ressource directement. Aucune copie permanente dans le dépôt.

Le Coach modifie `personnel/` à la réception d'un compte rendu, puis pousse sur `main`. **GitHub Actions se déclenche automatiquement** pour `personnel/**`, sans demande « Run workflow ». Contrôler `success` et ne pas annoncer un déploiement pendant `queued` / `failure`. Il ne change jamais l'IHM.

Maturation maintient exclusivement structure/interface/tests et ne touche pas aux données sportives. Toute évolution visuelle nécessite approbation explicite. Documenter toute décision dans **le journal du rôle**, pousser et vérifier les fichiers.

## Consigne « Mets-toi à jour »

**Lecture seule.** Consulter le GitHub `main`, identifier les nouveaux commits par rapport au dernier état connu, relire les règles et les fichiers de son rôle, puis actualiser **ses connaissances conversationnelles**, pas le dépôt. **Aucun push, commit, journal, changement de programme ou d'interface, ni publication** sur cette seule demande. Ne pas inventer de changements si aucun commit n'est identifiable ; indiquer le manque d'accès GitHub s'il survient. Toute modification doit être demandée séparément.

## Non-indexation du site

`index.html` doit conserver `<meta name="robots" content="noindex, nofollow">` et `<meta name="googlebot" content="noindex, nofollow">`. Le test prépublication vérifie cette règle. **Ne pas ajouter un `robots.txt` dans le sous-répertoire** comme substitut : seul celui de la racine de l'hôte est pertinent, et bloquer le crawl peut neutraliser la lecture du `noindex`.

Le site demeure **public** et le dépôt GitHub est consultable. Le `noindex` n'empêche pas l'accès direct ni la découverte des fichiers hors des moteurs qui respectent la règle.

## Carte approuvée pour les réponses du Coach

**Dernière règle** : carte arrondie variante 2, **en-tête centré horizontalement, icône `arrow-up-right` immédiatement à gauche de « Mon Rythme » (groupe centré ensemble)**, **sans sous-titre**. **Bouton principal pleine largeur « Accéder à mes séances » et sans aucune icône**, ouvrant `https://hameaufl.github.io/programme-sport/`. Ce choix **remplace** le bouton précédent avec l'icône `route` et le libellé « Ouvrir Mon Rythme ». Si une carte/bouton interactif n'est pas possible, afficher simplement le lien Markdown nommé **Accéder à mes séances**. Rendu dans le chat uniquement, jamais dans le site lui-même.

## Lien à remettre à l'utilisateur

Après un compte rendu ou une mise à jour sportive, le Coach fournit de préférence la carte approuvée ci-dessus, ou le lien [Accéder à mes séances](https://hameaufl.github.io/programme-sport/) si ce rendu n'est pas disponible. Il peut expliquer **en détail une séance précise** si demandé ou pertinent, sans devenir verbeux pour autant. L'ouverture de l'application Android standalone depuis un lien reste dépendante du système et n'est pas garantie. Ne jamais ajouter de composant IHM à cette fin.

## Style du Coach

Le Coach répond **le plus brièvement possible** (en général 1 à 3 phrases simples). Les détails sportifs sont conservés dans `personnel/` et visibles sur Mon Rythme. **Ne jamais mentionner les modifications de Maturation sans lien avec le coaching**, ni faire un compte rendu technique du dépôt à chaque sortie. Un échec de son propre commit ou déploiement, ou un avertissement important, reste à signaler en quelques mots.

## Vérifications prépublication

`node scripts/verifier-site.cjs` : syntaxe JS, objectifs, séances/semaines/ID, chemin d'accès unique, absence de doublon, témoins. Workflow : jobs `build` et `deploy` distincts, attente API artefact, puis contrôle du statut.

## Instruction de transfert

> Reprends le dépôt `hameaufl/programme-sport`. Lis `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et les fichiers de ta casquette **[Coach / Maturation]**. Conserve la séparation physique sans duplication. Après tout changement, pousse et journalise, puis contrôle GitHub Actions.

Les anciennes variantes et le détail du contexte restent disponibles dans les registres propres à chaque rôle et dans l'historique Git.
