# Reprise par un nouvel agent LLM

## Lecture prioritaire

1. [AGENTS.md](../AGENTS.md) — règles **impératives**, rôles et interdiction d'ajouts visuels non sollicités.
2. [ROLES.md](ROLES.md) — périmètres **strictement séparés** Coach / Maturation.
3. [CONTEXTE.md](CONTEXTE.md) — fonctionnement, plan et contexte.
4. [DECISIONS.md](DECISIONS.md) — décisions chronologiques, y compris anciennes **abandonnées**.
5. [JOURNAL.md](JOURNAL.md) — changements et limites.
6. [GARMIN.md](GARMIN.md), [sante/README.md](../sante/README.md), [pieces-jointes/README.md](../pieces-jointes/README.md).
7. [README.md](../README.md), [programme.js](../programme.js), [index.html](../index.html).

**La dernière décision explicite de l'utilisateur prévaut sur les anciennes mentions historiques.** Un nouvel agent ne doit pas chercher à reconstituer l'état actuel exclusivement à partir d'un vieux paragraphe de journal.

## Attribution et périmètres

**Coach**
- Mandaté pour les séances, les sensations, les entraînements Garmin et leur évolution.
- Chaque **retour de séance** de l'utilisateur est déjà une **demande de traitement**. Dans le tour courant, **sans demander à nouveau « dois-je mettre à jour GitHub ? »**, actualiser `programme.js` (`fait`, `sensations`, éventuel programme à venir), l'historique `sante/` et les fichiers réels sous `pieces-jointes/` selon leur pertinence et les outils disponibles.
- Peut maintenir, diminuer, augmenter, remplacer, reporter, conseiller du repos ou attendre. Pas de progression automatique ni d'entraînement inventé.
- **Interdiction absolue : modifier `index.html`, CSS, JS de présentation, navigation, style, composants, éléments visuels.** Si les formats ne suffisent pas, transmettre la demande à Maturation. Les schémas sont préétablis par Maturation.
- Ne pas promettre d'import Garmin ou de travail en arrière-plan si ces outils ne sont pas présents. Journaliser et committer le travail réellement réalisé dans le tour.

**Maturation**
- **Casquette du présent agent** : uniquement architecture, documentation de la méthode, robustesse, interface et gestion du cache.
- **Aucune modification des données sportives, sensations, statuts `fait` ou fichiers Garmin réels** à la place du Coach.
- **Aucun changement graphique/visuel sans demande ou approbation explicite.** Peut proposer, puis attendre l'accord.
- Prépare l'IHM à afficher les données que le Coach publiera ; seul ce rôle touche au HTML/CSS/JS.

## Source de vérité — aucun stockage local

Dans `programme.js`, `window.MON_RYTHME_PROGRAMMES` est indexé par le **lundi de semaine civile** :

- `id` unique et **stable** (souvent `course-AAAA-MM-JJ` / `kine-AAAA-MM-JJ`).
- `date` de la séance ; `titre`, `type`, `duree`, `etapes` selon besoin.
- `fait: true` **uniquement après confirmation explicite du retour** ; sinon `false` signifie « non confirmé », pas « séance non réalisée ».
- `sensations: "..."` : notes synthétisées **seulement à partir du retour fourni**. Chaîne vide avant premier retour.
- `pieces_jointes` : champ facultatif **réservé** pour les fichiers réels une fois disponibles. Schéma dans [GARMIN.md](GARMIN.md). Pas de référence fictive.
- `index.html` montre ces informations **en lecture seule** ; ni champ de saisie ni case à cocher interactive.
- Aucune donnée de suivi dans `localStorage` ou autre stockage navigateur. Un retour mis à jour apparaît sur les appareils après déploiement Pages et recharge du programme.

## Santé et Garmin

- Dépôt `hameaufl/programme-sport` **public**, et publicité des données de santé **explicitement acceptée**. Les anciens fichiers restent potentiellement dans l'historique. Les données GPS peuvent dévoiler des lieux fréquentés.
- Aucun bilan réel n'a été déposé à ce stade. Le **bilan du podologue** sur posture et appuis des pieds est **attendu**, contenu inconnu.
- Garmin **Venu 4** : futur support des séances prévues et exports d'activités FIT/TCX/GPX/CSV ; aucun fichier présent. Import via Garmin Connect fichier d'abord ; potentiel MCP/API à valider ; **jamais de secret/token dans le dépôt**.
- Le Coach peut déposer/analyser fichiers et actualiser données, **jamais coder l'affichage** ; Maturation peut préparer l'interface avec approbation.

## Publication systématique et diagnostic Pages

**Après toute demande de changement ou toute décision pertinente au projet :**
- Exécuter et committer les changements autorisés dans le **même échange** : `main` est la source de vérité du dépôt.
- Documenter systématiquement la décision et l'action dans `docs/DECISIONS.md` et `docs/JOURNAL.md` ; si une décision ne mène à aucun changement de code, consigner le résultat / blocage.
- Relire les fichiers sur GitHub et mentionner les SHA réellement créés. Ne jamais présenter une modification non poussée comme effectuée.
- Vérifier la **publication Pages** si possible, et préciser explicitement lorsqu'elle n'est pas vérifiable.

**Distinguer dépôt et site :**
- `index.html` actuel : **lecture seule**, indicateurs « Fait » et « Sensations », aucune case à cocher, aucun `localStorage`.
- `publication.txt` à la racine est un témoin de version cible. Vérification depuis le navigateur : `https://hameaufl.github.io/programme-sport/publication.txt?v=20261111`.
- `index.html` comprend un méta-identifiant invisible `mon-rythme-version=2026-11-11-statique-fait-sensations-v1`.
- Si le témoin ne se charge pas ou si l'ancien HTML reste visible avec une URL `?v=...`, examiner **Settings → Pages** (source `main` / `/(root)` si publication depuis la branche) et **Actions → pages build and deployment**.
- Le nom du témoin est technique, sans affichage supplémentaire dans l'application. Après de futurs changements de l'IHM, **mettre à jour sa version** et le document `publication.txt` pour diagnostiquer d'éventuelles publications obsolètes.
- Les sensations ne s'affichent **que si `sensations` n'est pas vide**. L'absence de note ne prouve pas une panne d'affichage.

## Vérifications avant chaque commit

- Les 18 séances initiales (15 courses, 3 kinés), dates et `id` restent intacts sauf décision expresse de coaching.
- Les retours portent sur la bonne séance et sur **des faits transmis**, pas sur des suppositions.
- Le Coach ne touche pas aux fichiers de présentation ; Maturation ne touche pas aux sensations réelles.
- Aucun visuel supplémentaire non demandé ; aucune dépendance à `localStorage`.
- Code JavaScript syntaxiquement valide ; comportement après rechargement ; version anti-cache `programme.js?actualisation=...` intacte.
- Ne pas confondre commit `main`, publication GitHub Pages et test physique Android.
- Ajouter une entrée à `docs/JOURNAL.md`, mettre à jour `docs/DECISIONS.md` si une nouvelle règle remplace la précédente.

## Instruction courte pour une nouvelle conversation

> Reprends `hameaufl/programme-sport`. Lis `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, `docs/CONTEXTE.md`, `docs/DECISIONS.md`, `docs/JOURNAL.md`, `docs/GARMIN.md`, `sante/` et `pieces-jointes/`. **Rôle attribué pour cette conversation : [Coach ou Maturation]**. Reste strictement dans ce rôle. Pour Coach, mes retours de séance déclenchent la mise à jour effective du contenu sur GitHub, jamais du HTML/CSS/JS. Pour Maturation, structure et IHM seulement, aucun changement visuel sans mon accord. Journalise chaque intervention.

**Limite :** ce dépôt contient une mémoire structurée et versionnée, pas le texte intégral de toutes les conversations.
