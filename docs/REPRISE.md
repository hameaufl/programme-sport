# Reprise entre LLM — Mon Rythme

## Prévention des altérations involontaires

`scripts/verifier-changements.cjs` interdit désormais, par défaut, la disparition d'un champ ou le changement de date d'une séance existante. Une modification explicitement demandée doit être expliquée et signalée par `[suppression-champ-validée]` ou `[date-validée]` dans le message du commit. Ces marqueurs ne remplacent pas l'accord utilisateur. Les autres champs et séances doivent rester inchangés.

## Architecture actuelle : sources individuelles validées

**Prioritaire sur les sections historiques plus bas.** L'ancien `personnel/programme.js` n'existe plus : **18 séances transférées sans modification de leurs champs** dans `personnel/seances/AAAA/MM/<id>.json`. Le fichier `personnel/config.json` conserve objectifs/début du cycle. Comptes rendus individualisés sous `personnel/sante/rapports/`, événements datés sous `personnel/sante/evenements/` ; le texte source du journal a été redistribué **sans perte ni reformulation**. `SUIVI.md` contient les règles/modèle.

Coach : lire l'ID, modifier uniquement le JSON de cette séance, ne pas écraser un autre historique. Pour un lot de plus de quatre séances : accord utilisateur et message `[lot-valide]`. Les vues HTML consomment des **JSON de semaines générés** en CI, pas les fichiers individuels. `node scripts/verifier-site.cjs` vérifie les contrats et le regroupement de 5 000 séances fictives ; `scripts/verifier-changements.cjs` empêche suppressions intempestives ; `node scripts/construire-site.cjs` crée l'artefact Pages. **Aucune nouvelle navigation mois/année.**


Lire d'abord [AGENTS.md](../AGENTS.md), puis [ROLES.md](ROLES.md).

- **Maturation :** [CONTEXTE.md](CONTEXTE.md), [DECISIONS.md](DECISIONS.md), [JOURNAL.md](JOURNAL.md), `index.html`, `scripts/`, workflow.
- **Coach :** [personnel/README.md](../personnel/README.md), [personnel/DECISIONS.md](../personnel/DECISIONS.md), [personnel/JOURNAL.md](../personnel/JOURNAL.md), [personnel/programme.js](../personnel/programme.js), [personnel/sante/](../personnel/sante/README.md), [personnel/GARMIN.md](../personnel/GARMIN.md).

**Sources personnelles uniques actuelles** : fichiers `personnel/seances/AAAA/MM/<id>.json` et `personnel/config.json`, complétés par les rapports/événements individualisés. Les vues de semaines sont générées dans l'artefact, jamais copiées dans Git.

Le Coach modifie `personnel/` à la réception d'un compte rendu, puis pousse sur `main`. **GitHub Actions se déclenche automatiquement** pour `personnel/**`, sans demande « Run workflow ». Contrôler `success` et ne pas annoncer un déploiement pendant `queued` / `failure`. Il ne change jamais l'IHM.

Maturation maintient exclusivement structure/interface/tests et ne touche pas aux données sportives. Toute évolution visuelle nécessite approbation explicite. Documenter toute décision dans **le journal du rôle**, pousser et vérifier les fichiers.

## Dernière correction Coach — intitulés anatomiques sans précaution entre parenthèses

**Demande explicite** : le Coach **analyse lui-même** les groupes et chaînes musculaires travaillés à partir des exercices racontés ; **l'utilisateur n'a pas à lui fournir le vocabulaire**. Dans les puces **« Structures sollicitées »**, afficher seulement **« Région / fonction — muscles, chaînes ou structures »**, **sans** `(sollicitation probable…)`, `(non prouvé cliniquement)`, `(hypothèse)` ou autre justification répétée. Conserver la rigueur de sélection et ne pas poser de diagnostic. L'IHM masque les anciennes parenthèses méthodologiques ; **lors de la prochaine mise à jour par le Coach**, nettoyer à la source les deux libellés de `personnel/programme.js` pour la kiné du 4 novembre, sans toucher aux éléments anatomiques pertinents. **Maturation ne modifie pas `personnel/`**.

## Nouvelle priorité : sensations très courtes et muscles/chaînes sollicités

- **`sensations`** : quelques **segments nominaux**, presque sans verbes, sans récit ni répétition des exercices ; « ; » autorisé entre ressentis. Conserver les douleurs, circonstances et limites effectivement transmises. Pas de diagnostic.
- Le détail d'une séance **faite** comporte **« Séance » → « Structures sollicitées » → « Sensations »**. La section centrale affiche des **puces par région / fonction**, avec des noms de muscles, chaînes musculaires ou tendons précis et plausibles, sans prétendre à une certitude médicale.
- La section « Structures sollicitées » lit `structuresSollicitees: string[]` de la séance `fait:true` dans `personnel/programme.js`, ou **« Structures sollicitées : »** dans le compte rendu du même ID de `personnel/sante/SUIVI.md` (séparer les puces par `;`). Programme prioritaire, journal de repli ; **pas de duplication**. Si rien n'est renseigné, **« À préciser par le Coach »** ; pas d'anatomie inventée par l'interface.
- **Seul le Coach** renseigne les données et analyse les structures anatomiques usuelles à partir des mouvements rapportés, sans attendre la terminologie de l'utilisateur ; les libellés sont directs, sans « probable » répété. Les diagnostics cliniques restent distincts. Maturation modifie l'affichage et les tests, pas `personnel/`.

## Règle Coach sur la longueur du déroulé

**Les puces « Séance » doivent être nominales, très courtes (environ 2 à 8 mots), sans phrases narratives.** Exemples : « Bilan initial » ; « Étirements » ; « Presse à cuisses · 40 et 50 kg » ; « Marche latérale avec bande élastique ». Le Coach transcrit le vocabulaire courant en termes sportifs **sans invention**. Écrire ces libellés concis dans `exercicesRealises` ou dans `personnel/sante/SUIVI.md` après **« Réalisé : »** séparés par des points-virgules. **Sensations** conserve la description des douleurs/ressentis distincte du déroulé.

## Déroulé et sensations — dernière décision

- Dans la vue détaillée, afficher **« Séance »** sous le titre si la séance est confirmée : liste des exercices réellement rapportés, provenant de `s.exercicesRealises` (liste de chaînes facultative, rédigée par le Coach) ou de **« Réalisé »** dans `personnel/sante/SUIVI.md` pour le même identifiant. Jamais déduire de faits depuis un programme prévu ni des sensations. Si rien n'est documenté, afficher une mention d'absence.
- Pour une séance non réalisée, afficher **« Programme prévu »** et les `etapes` prévisionnelles existantes, sans laisser entendre qu'elles ont été effectuées.
- **« Sensations »** sous le déroulé, en paragraphe pour cette première version. Le Coach peut reformuler avec le vocabulaire sportif technique approprié et compréhensible, en distinguant interprétation et diagnostic. Maturation ne modifie pas `personnel/`.
- Le journal `SUIVI.md` est **déjà publié** par le workflow ; aucun nouveau fichier de données requis pour la page. Un bloc de suivi antérieur existe pour la kiné du 4 novembre.

## Règles d'affichage du programme et reformulation par le Coach

- **« Séances de la semaine »** : date et titre, avec **✓ Fait seulement si `fait:true`** ; jamais les notes de sensations ni les métadonnées d'effort dans cette vue synthétique. Conserver l'absence d'indication pour `fait:false`.
- **« Programme du jour »** : ✓ Fait à côté du titre ; **« Sensations » comme titre indépendant, sans deux-points**, suivi d'un paragraphe en dessous des étapes de la séance, seulement si une note existe.
- **Coach** : traduire les descriptions courantes de l'utilisateur en vocabulaire technique pertinent, brièvement expliqué, sans inventer un diagnostic, une chaîne musculaire certaine ou une mesure. Cette règle relève du contenu Coach ; Maturation n'écrit pas les ressentis.
- Les validations de `scripts/verifier-site.cjs` doivent préserver ces distinctions à chaque publication.

## Affichage compact du suivi santé

- **Page principale** : renvoi vers `sante.html` dans une carte à deux colonnes, **titre « Mon suivi santé » et bouton seulement**, sans phrase descriptive.
- **Page santé** : aucun sous-texte après « Mon suivi santé. » ; section « Mes séances suivies » supprimée entièrement, données de programme utilisées uniquement pour les compteurs ; profil et journal de suivi conservés.
- **Journal santé** : les entrées `### AAAA-MM-JJ — titre` dans `personnel/sante/SUIVI.md` alimentent le suivi des événements datés. Les chaussures de running peuvent être précisées après réception du modèle. Les conclusions du bilan podologique ne sont pas connues tant que le document n'est pas transmis.

## Deuxième page : suivi santé

L'interface comprend `sante.html`, accessible depuis une carte de redirection en bas de `index.html`. Elle présente les statistiques dérivées de `personnel/programme.js`, les sections du profil `personnel/sante/PROFIL.md` et les comptes rendus datés (`### AAAA-MM-JJ`) de `personnel/sante/SUIVI.md`, sans données personnelles dupliquées. Le Coach se contente de mettre à jour `personnel/`; Maturation seule intervient sur l'affichage. Le workflow publie l'HTML et les sources nécessaires, sans supprimer les balises `noindex`.

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
