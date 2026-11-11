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


### 11 novembre 2026 — Méthode d'ajustement au lendemain

- **Demande** : comptes rendus de chaque sortie pour ajuster les séances selon les sensations.
- **Correction explicite** : ne **pas** attendre la semaine suivante ; réviser la planification **dès le lendemain**.
- **Règle** : adapter la séance du lendemain si elle est prévue ; sinon la prochaine séance programmée. Maintenir les jours sans course et la récupération.
- **Options** : diminuer, maintenir ou augmenter prudemment durées et distances. Aucune augmentation automatique.
- **Confidentialité** : ne pas enregistrer de compte rendu médical ou de symptômes dans le dépôt public.
- **Fichiers de documentation** : `AGENTS.md`, `docs/CONTEXTE.md`, `docs/DECISIONS.md`, `docs/JOURNAL.md`. Programme de course et interface inchangés.


### 11 novembre 2026 — Deux casquettes, espace santé versionné, cache Android

- **Demande** : organiser la reprise par futurs LLM autour des deux casquettes **Maturation** (amélioration du projet, consignes et IHM, sans ajouts visuels non approuvés) et **Coach** (santé, entraînements, récupération, suivi selon les sensations).
- **Décision Coach** : possibilité d'adapter dès le lendemain, **de ne pas modifier**, de reporter ou d'attendre plusieurs retours. Les ajustements ne sont pas automatiques.
- **Santé** : création d'un répertoire versionné `sante/` et de modèles de profil / journal. **Aucune donnée médicale personnelle ajoutée**. Alerte : dépôt GitHub et GitHub Pages **publics** ; avant un premier enregistrement sensible, confirmer explicitement le dépôt cible et sa visibilité. Option alternative : dépôt privé.
- **Cache** : la problématique est liée à la réponse HTTP `programme.js`, pas à un attribut de balise HTML. Au **chargement initial**, le script demande `./programme.js?actualisation=<horodatage>`, initialise ensuite le calendrier, et renouvelle la requête après retour au premier plan ou restauration historique. Repli vers la ressource classique en cas d'échec initial. Aucune nouvelle commande ni modification graphique.
- **Fichiers** : `index.html`, `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, `docs/CONTEXTE.md`, `docs/DECISIONS.md`, `docs/JOURNAL.md`, `README.md`, `sante/README.md`, `sante/PROFIL.md`, `sante/SUIVI.md`.
- **Commits clés** : `bc3d047` (chargement anti-cache), `7806012` (rôles), `b514c92` (santé, structure), `6a742ee` (agents), `3614f15` (reprise), `888057e` (contexte), `622268b` (décisions), `6a9d1a7` (README).
- **Tests à contrôler** : 18 séances et identifiants inchangés, fonctionnalité locale « Fait », intégrité du JavaScript, absence de nouvelle UI, présence des documents. Pas de test direct sur l'Android de l'utilisateur.
- **Limites** : le navigateur peut servir un ancien `index.html` pendant un temps ; le déploiement Pages peut être différé. Une URL anti-cache ne garantit pas que le CDN a déjà reçu la dernière publication.

### 11 novembre 2026 — Rôles exclusifs, Coach autonome sur les contenus, futur Garmin

**Demande de l'utilisateur :**
- Après réception d'un compte rendu de sortie, le **Coach** doit comprendre que la mise à jour du dépôt fait partie de sa tâche, **sans consigne séparée** ; il peut adapter le programme, publier le résumé des sensations, modifier `fait`, associer des pièces jointes Garmin, ou conserver les séances si la progression n'est pas appropriée.
- **Interdiction absolue de modifier l'IHM pour le Coach**, y compris HTML, CSS, JavaScript de rendu, éléments visuels ou navigation.
- **Maturation** reste seule habilitée à préparer l'interface, les formats et l'architecture ; ajout visuel **uniquement à la demande ou après approbation**. Le présent agent reste **Maturation uniquement**.
- Future **Garmin Venu 4** : entraînements prévus et exports d'activités réellement effectuées, avec tracé, distance, allure, données sportives réellement disponibles ; option d'import fichier ou, plus tard, MCP/API. GitHub doit contenir tout l'historique durable.
- L'utilisateur a confirmé **explicitement le caractère public** de ses données de santé versionnées ; les données personnelles ne sont pas encore reçues.

**Fichiers :**
- `AGENTS.md` : règle prioritaire de séparation et déclenchement du travail Coach après un retour.
- `docs/ROLES.md` : périmètres exclusifs et types d'actions permis/interdits.
- `docs/REPRISE.md`, `docs/CONTEXTE.md`, `docs/DECISIONS.md`, `README.md` : reprise multi-agents alignée sur l'état actuel.
- `docs/GARMIN.md` et `pieces-jointes/README.md` : conventions futures des pièces jointes, aucun fichier Garmin réel.
- `sante/README.md`, `sante/PROFIL.md`, `sante/SUIVI.md` : stockage public confirmé, modèles **non renseignés**.

**État technique vérifié avant documentation** :
- `index.html` est **en lecture seule** avec statuts « Fait » et notes « Sensations », **sans localStorage**.
- `programme.js` contient 18 séances, valeurs initiales `fait:false`, `sensations:""`, aucun retour réel ni fichier Garmin déposé.
- Le système de rafraîchissement de `programme.js` avec URL renouvelée reste en place. Aucune modification de l'IHM dans cette intervention de définition des rôles.

**Limites** :
- Aucune API/MCP Garmin n'est actuellement connectée ; les fichiers d'export reçus pourront être intégrés directement au dépôt par un agent Coach muni des outils.
- La compatibilité réelle d'un entraînement Garmin généré nécessite une validation. **Pas de travail en arrière-plan non configuré**.
- Dépôt GitHub public : d'éventuels trajets GPS peuvent révéler des lieux personnels ; les contenus restent versionnés dans Git.

### 11 novembre 2026 — Diagnostic « site Android encore ancien » et publication systématique

- **Signalement utilisateur** : après nettoyage du cache, l'application sur Android présente encore des **coches manuelles** et aucune sensation affichée. Demande de vérification GitHub / Pages et de **publication systématique de chaque décision/code par Maturation**.
- **Constat sur le dépôt `main`** : `index.html` en lecture seule (pas de checkbox, pas de `localStorage`, affichage « Fait » / « Sensations » si donnée), `programme.js` contient **18 séances**, toutes `fait:false` et `sensations:""` en l'absence de comptes rendus confirmés.
- **Écart observé** : l'utilisateur voit une version **plus ancienne de l'HTML** ; l'absence de notes de sensations est attendue tant qu'aucun compte rendu n'est intégré.
- **Vérification du site en ligne** : tentative d'accès au site GitHub Pages et à ses fichiers depuis les outils disponibles, **non concluante** ; ne pas annoncer un déploiement confirmé ni attribuer sans preuve la cause au cache ou à GitHub Pages.
- **Action technique Maturation** : ajouter un méta-identifiant HTML invisible `2026-11-11-statique-fait-sensations-v1`, puis un témoin de publication racine `publication.txt`, sans modifier l'affichage, les séances ou le suivi.
- **Procédure de vérification utilisateur** : charger `https://hameaufl.github.io/programme-sport/publication.txt?v=20261111` puis `https://hameaufl.github.io/programme-sport/?v=20261111-statique-fait-sensations-v1`. Si la version du témoin est absente / les cases restent interactives, consulter `Settings → Pages` et `Actions → pages build and deployment`.
- **Consigne permanente** : toute décision et intervention de Maturation doit être **committée et documentée sur GitHub dans l'échange courant**, suivie d'une relecture des fichiers et, si possible, d'un contrôle du déploiement public. Le Coach respecte la même discipline pour ses données sportives dans son rôle.
- **Fichiers modifiés / créés** : `AGENTS.md`, `index.html` (métadonnée invisible), `publication.txt`, `docs/DECISIONS.md`, `docs/REPRISE.md`, `docs/JOURNAL.md`, `README.md` (si modification).
- **Commits partiels vérifiés** : `b15c375` (consignes), `02f39af` (meta HTML), `264a6fb` (témoin), `bf37df5` (décision), `bcebf98` (reprise).
- **Limites** : pas de preuve de la version actuellement servie par Pages, ni de test physique Android. Le témoin `publication.txt` ne garantit pas qu'un `index.html` plus récent a été publié ; un cache HTML ou un déploiement ancien demeurent possibles.

## Modèle pour les prochaines entrées

### AAAA-MM-JJ — Titre
- **Demande** : ...
- **Décision** : ...
- **Fichiers** : ...
- **Commit(s)** : ...
- **Vérification** : ...
- **Points ouverts / limites** : ...

Ne pas effacer le passé lors des prochaines modifications ; ajouter une nouvelle entrée pour documenter ce qui a été remplacé.
