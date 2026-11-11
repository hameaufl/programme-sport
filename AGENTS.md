# AGENTS.md — règles obligatoires des agents LLM

## Indexation volontairement désactivée — règle permanente

- La page publique **ne doit pas être indexée** par les moteurs de recherche respectant `noindex`. Maintenir dans `index.html` les balises `<meta name="robots" content="noindex, nofollow">` et `<meta name="googlebot" content="noindex, nofollow">`.
- `scripts/verifier-site.cjs` doit **échouer avant publication** si ces métadonnées disparaissent. Ne jamais les supprimer sans demande explicite du propriétaire.
- **Ne pas ajouter de `robots.txt` bloquant l'exploration** sur cette page : Google doit pouvoir la consulter pour lire `noindex`. Un `robots.txt` déposé dans le sous-répertoire du projet `/programme-sport/` n'est pas reconnu comme fichier `robots.txt` de l'hôte.
- **Limite assumée :** `noindex` n'est ni un mot de passe ni une garantie contre tous les moteurs/robots ; le dépôt GitHub et les ressources non-HTML restent publics et potentiellement découvrables. Ne jamais présenter le site comme confidentiel ou inaccessible sans l'URL.
- À chaque modification future de l'HTML, garder la directive et vérifier sa publication. Aucune modification visuelle n'est nécessaire.

## Deux casquettes exclusives

**Maturation** : architecture, `index.html`, CSS, JS de rendu, `docs/`, `AGENTS.md`, `README.md`, validation et déploiement. **Jamais les données sportives réelles, sensations, statuts ou décisions de progression.**

**Coach** : données et historiques dans **`personnel/` exclusivement**. Dès qu'un compte rendu est fourni, traiter dans l'échange la séance, les sensations et les ajustements pertinents ; conserver, diminuer, augmenter, reporter ou attendre selon les éléments reçus. **Jamais aucune modification de l'interface, du workflow, du contrat des données ou des éléments graphiques.**

**Aucun ajout graphique par Maturation sans sollicitation ou approbation explicite.** Un conseil d'ergonomie ne vaut pas autorisation de le mettre en œuvre.

## Séparation physique obligatoire — aucune duplication

- **Source personnelle unique : `personnel/programme.js`**. Pas de `programme.js` à la racine, ni de copie versionnée.
- **Personne/sport :** `personnel/` (programme, santé, rapports, Garmin, décisions et journal sportifs).
- **Construction :** `index.html`, `docs/`, `scripts/`, `.github/`, `README.md`, ce fichier.
- Pas de séances, bilans individuels, distances, programmes ni comptes rendus dupliqués dans les README ou registres techniques ; ceux-ci décrivent seulement le fonctionnement.
- Les objectifs affichés proviennent aussi de `personnel/programme.js` ; pas de texte personnel encodé en dur dans l'HTML.
- Le site sert le **même fichier sous le même chemin** `./personnel/programme.js`. L'artefact de déploiement est temporaire, pas une source Git.

## Mise à jour GitHub et continuité — systématique

1. Lire `AGENTS.md`, [docs/REPRISE.md](docs/REPRISE.md) et les documents du **rôle attribué** avant de modifier.
2. À chaque décision ou changement accepté : modifier les fichiers **du bon rôle**, mettre à jour son journal et pousser sur `main` dans la conversation courante. Jamais promettre une action ultérieure sans outil adapté.
3. **Coach :** un retour utilisateur vaut demande de mise à jour effective, sans solliciter une seconde instruction « pousse sur GitHub ». Les données personnelles restent factuelles, jamais inventées.
4. **Publication automatique :** un push sur `main` concernant `personnel/**`, le site ou le workflow déclenche `Publier Mon Rythme`. Le Coach **ne lance pas manuellement les Actions** à chaque retour ; il vérifie que la publication est déclenchée et suit le statut.
5. Contrôler les fichiers après commit et **vérifier le workflow**. Un commit n'est pas la preuve d'un déploiement réussi ; mentionner `failure`, `queued` ou `success` selon les faits.
6. Après chaque intervention, mettre à jour la mémoire dans le dépôt : aucun détail nécessaire à la reprise ne doit dépendre du souvenir de l'agent.

## Contrat technique à préserver

- `node scripts/verifier-site.cjs` avant publication : syntaxe, contrats et absence de doublon.
- Workflow `.github/workflows/publier-pages.yml` : jobs `build` et `deploy` séparés, attente API pour la visibilité de l'artefact. Contenu personnel sous `personnel/**` déclenche une publication.
- Pas de `localStorage` pour le suivi ; `fait:false` n'affiche rien, `fait:true` affiche ✓ Fait. Sensations si non vides.
- Conserver les `id` stables, les semaines lundi-dimanche, la date et le bouton de retour dynamiques, l'URL anti-cache, le mobile.
- Descriptions courtes et en puces, sans doublons.
- **Dépôt public accepté** pour les données transmises ; ne pas inventer de données et ne jamais publier de secrets.

## Reprise

- **Maturation :** [docs/REPRISE.md](docs/REPRISE.md), [docs/ROLES.md](docs/ROLES.md), [docs/CONTEXTE.md](docs/CONTEXTE.md), [docs/DECISIONS.md](docs/DECISIONS.md), [docs/JOURNAL.md](docs/JOURNAL.md).
- **Coach :** [personnel/README.md](personnel/README.md), [personnel/DECISIONS.md](personnel/DECISIONS.md), [personnel/JOURNAL.md](personnel/JOURNAL.md), [personnel/sante/](personnel/sante/README.md), [personnel/GARMIN.md](personnel/GARMIN.md), puis `personnel/programme.js`.
- Les dernières décisions explicites de l'utilisateur prévalent sur les pistes historiques abandonnées.
