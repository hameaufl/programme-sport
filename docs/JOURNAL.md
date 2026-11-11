# Journal du projet

Ce journal couvre les **principales étapes et décisions de la conversation de lancement**, puis les interventions ultérieures. Il ne constitue ni une transcription littérale des échanges ni la liste exhaustive de tous les commits historiques. Les instructions et choix ultérieurs de l'utilisateur priment sur les choix abandonnés.

## Historique initial — novembre 2026

### 1. Création de Mon Rythme
**Demande / contexte :** un outil très simple pour consulter l'emploi du temps sportif et des sorties sur téléphone et ordinateur. Le projet passe progressivement d'un planning à remplir à un calendrier **en lecture du programme statique**, sans saisies.

**Décisions :** suppression du nombre fixe de sorties, des champs matin/midi/soir et d'un ancien suivi par cases ; volonté de n'afficher que des séances programmées.

### 2. Choix de GitHub Pages
**Demande / contexte :** abandon d'une piste de publication Netlify au profit d'un dépôt GitHub public nommé « programme sport ».

**Décisions :** `hameaufl/programme-sport`, branche `main`, publication attendue via GitHub Pages. Aucun backend, base de données ou connexion pour la consultation du programme.

**Limite :** vérifier séparément l'activation et l'état de GitHub Pages, ne pas déduire du commit que la page est en ligne.

### 3. Adaptation du plan sportif
**Entrée utilisateur :** PDF « Programme fractionné I » de La Clinique du Coureur (8 semaines, fractions marche/course). 

**Demande :** passage initial à 5 semaines et 5 sorties/semaine ; adaptation ensuite aux modes du bracelet ; suppression des sorties sans course.

**Décision finale de cette étape :** 15 sorties de course en 5 périodes de sept jours. Modes appelés d'abord A/B, puis **renommés « 2M+3C » et « 2M+5C »** ; option 21 minutes continues seulement si confortable, non obligatoire. Le démarrage a été décalé plusieurs fois selon les demandes : **11 novembre 2026** est la date en vigueur.

**Notes :** le plan final n'est pas la transcription du PDF original. Il faut conserver des jours de repos et ne pas forcer malgré une douleur.

### 4. Kiné et calendrier
**Demande :** ajouter « Kiné · renforcement des genoux » les 4, 9 et 18 novembre 2026, puis remplacer le libellé par **« Kiné · Genoux »**.

**Décision :** 3 rendez-vous sans horaire, distincts des 15 sorties. Le **18 novembre**, une séance de course et une séance de kiné coexistent. Les semaines du calendrier commencent **le lundi** : les séances ont été regroupées par lundi sans décaler leurs dates.

### 5. Nettoyage de l'interface
**Demande :** supprimer « , simplement », le sous-titre du début du programme, des descriptions superflues, les cinq cartes d'objectifs hebdomadaires, le grand encart de reprise et le pied de page. Les objectifs sont destinés à des horizons **trimestriels ou plus longs**.

**État :** bannière « Mon programme. », rubrique « Mes objectifs » avec une seule priorité présentée en puce, « Mon calendrier », détail du jour et liste hebdomadaire. Date et bouton « Semaine en cours » dynamiques.

### 6. Réintroduction du suivi
**Demande :** ajouter une case par séance terminée, conservée localement pour le navigateur et le raccourci Android standalone.

**État :** `localStorage["mon-rythme-suivi-v1"]`, identifiants uniques stables `course-...` et `kine-...`. Les coches ne se synchronisent pas entre appareils. Aucune modification de séance ne doit casser l'identifiant.

### 7. Renommage des programmes du bracelet
**Demande :** remplacer les labels « mode A » et « mode B » par **« 2M+3C »** et **« 2M+5C »**.

**État :** intitulés et documentation mis à jour sans modifier les identifiants de séances.

## Intervention — 11 novembre 2026 : simplification finale et passation aux agents

**Demandes utilisateur :**
- Retirer la ligne « Semaines du lundi au dimanche · séances de course et de kiné » sous « Mon calendrier ».
- Définir une règle permanente : **aucun ajout graphique ou visuel par un agent sans demande ou approbation**. L'agent peut proposer une amélioration à valeur ajoutée, mais doit attendre l'accord explicite.
- Formaliser suffisamment de décisions et de contexte dans le dépôt pour reprendre avec un autre agent LLM.
- Dernière précision : case « Réalisé » **au masculin**.

**Travail réalisé :**
- `index.html` : suppression ciblée de la phrase sous « Mon calendrier », commit `a64a542`.
- `AGENTS.md` : consignes obligatoires et règles de sobriété, commit `9fea7a3`.
- `index.html` : « Réalisée » devient « Réalisé », commit `665d7d3`.
- `docs/REPRISE.md` : mode d'emploi de transfert vers un nouvel agent, commit `ba1c7a1`.
- `docs/CONTEXTE.md` : état et fonctionnement, commit `8f229b1`.
- `docs/DECISIONS.md` : décisions actives et décisions remplacées, commit `6dbe43e`.
- `docs/JOURNAL.md` : présent historique, avec état vérifiable dans le dépôt.
- `README.md` : sommaire d'accès à la documentation d'agents, état fonctionnel et libellé « Réalisé ».

**Contrôles :** relire les fichiers écrits à partir de GitHub ; vérifier que la description a disparu de `index.html`, que le texte visible de coche est « Réalisé », et que les dates et identifiants des 18 séances sont intacts. Un contrôle de fichier et de syntaxe n'est **pas** un test de rendu mobile réel, ni une preuve du déploiement GitHub Pages.

**Points de vigilance :**
- Les nouveaux agents doivent lire `AGENTS.md` avant de modifier le projet.
- Le dépôt est public. Il comprend déjà les dates et intitulés des rendez-vous ; ne pas publier d'autres détails sensibles.
- Le suivi reste local : pas de synchronisation ni de sauvegarde distante.
- L'absence d'ajouts graphiques non approuvés est une consigne **contraignante**, non une simple préférence esthétique.

### Vérification complémentaire — 11 novembre 2026

- **Demande** : remplacer « Réalisée » par **« Réalisé »** sur les coches.
- **Fichiers** : `index.html` (libellé visible et accessibilité), `README.md` (libellé et accès à la documentation de reprise).
- **Commits** : `665d7d3`, `4232ced`, `89d61ec`.
- **Vérification** : 15 courses et 3 séances « Kiné · Genoux » conservées dans `programme.js`, 18 identifiants `id` distincts. Absence de l'ancienne phrase sous « Mon calendrier ». Présence de `AGENTS.md` et des quatre documents de passation.
- **Limites** : vérifications par lecture du code et des fichiers GitHub ; pas de test de rendu réel sur le raccourci Android ni de confirmation du déploiement GitHub Pages.


### 11 novembre 2026 — Libellé de suivi « Fait »

- **Demande :** remplacer « Réalisé » par **« Fait »**, sans autre modification de l'interface.
- **Fichiers :** `index.html`, `README.md`, `docs/CONTEXTE.md`, `docs/REPRISE.md`, `docs/DECISIONS.md`, `docs/JOURNAL.md`.
- **Décision :** « Fait » devient l'unique libellé actif des cases de suivi, y compris dans leurs intitulés d'accessibilité ; « Réalisé » reste documenté uniquement comme ancien choix historique.
- **Compatibilité :** ni les identifiants de séance ni la clé de `localStorage` ne sont modifiés. Les coches préexistantes sont conservées par le code.
- **Vérification :** à effectuer à la relecture des fichiers GitHub ; pas de test physique du raccourci Android.

### 11 novembre 2026 — Descriptions courtes et listes à puces

- **Demande** : descriptions de séances plus directes, sans verbes superflus ni répétitions ; utiliser des puces.
- **Décision** : une seule description du déroulé par séance ; suppression des champs `objectif` et `details` redondants ; `etapes` synthétiques avec style nominal. Consigne éditoriale persistante pour les agents.
- **Fichiers** : `programme.js`, `index.html`, `AGENTS.md`, `docs/DECISIONS.md`, `docs/CONTEXTE.md`, `docs/JOURNAL.md`.
- **Commits** : `cf65195` (données), `677aac2` (puces), `a75c73e` (consignes).
- **Vérifications prévues** : 15 courses, 3 kinés, 18 identifiants inchangés, cases « Fait » et sauvegarde locale inchangées.
- **Limite** : aucune vérification physique du raccourci Android ; déploiement GitHub Pages à contrôler indépendamment.

## Modèle pour les prochaines entrées

### AAAA-MM-JJ — Titre
- **Demande** : ...
- **Décision** : ...
- **Fichiers** : ...
- **Commit(s)** : ...
- **Vérification** : ...
- **Points ouverts / limites** : ...

Ne pas effacer le passé lors des prochaines modifications ; ajouter une nouvelle entrée pour documenter ce qui a été remplacé.
