# Journal du domaine sportif

Historique des consignes et programmes, conservé pour reprise avec un Coach distinct. Les sorties réellement effectuées ne sont jamais inventées.

### 3. Adaptation du plan sportif
**Entrée utilisateur :** PDF « Programme fractionné I » de La Clinique du Coureur (8 semaines, fractions marche/course). 

**Demande :** passage initial à 5 semaines et 5 sorties/semaine ; adaptation ensuite aux modes du bracelet ; suppression des sorties sans course.

**Décision finale de cette étape :** 15 sorties de course en 5 périodes de sept jours. Modes appelés d'abord A/B, puis **renommés « 2M+3C » et « 2M+5C »** ; option 21 minutes continues seulement si confortable, non obligatoire. Le démarrage a été décalé plusieurs fois selon les demandes : **11 novembre 2026** est la date en vigueur.

**Notes :** le plan final n'est pas la transcription du PDF original. Il faut conserver des jours de repos et ne pas forcer malgré une douleur.

### 4. Kiné et calendrier
**Demande :** ajouter « Kiné · renforcement des genoux » les 4, 9 et 18 novembre 2026, puis remplacer le libellé par **« Kiné · Genoux »**.

**Décision :** 3 rendez-vous sans horaire, distincts des 15 sorties. Le **18 novembre**, une séance de course et une séance de kiné coexistent. Les semaines du calendrier commencent **le lundi** : les séances ont été regroupées par lundi sans décaler leurs dates.

### 7. Renommage des programmes du bracelet
**Demande :** remplacer les labels « mode A » et « mode B » par **« 2M+3C »** et **« 2M+5C »**.

**État :** intitulés et documentation mis à jour sans modifier les identifiants de séances.

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

## 11 novembre 2026 — Migration structurelle (Maturation)

- Déplacement vers `personnel/` de la source du programme, du dossier santé et de l'espace Garmin ; aucune donnée de séance modifiée.
- Les rapports ultérieurs et décisions de coaching seront consignés ici.

## 11 novembre 2026 — Premier compte rendu réel reçu (kiné du 4 novembre)

- L'utilisateur confirme la réalisation de sa première séance « Kiné · Genoux » du 4 novembre (`kine-2026-11-04`).
- Compte rendu détaillé factuel consigné dans `personnel/sante/SUIVI.md` ; résumé et statut « Fait » mis à jour dans `personnel/programme.js`.
- **Décision Coach :** aucun changement automatique de dates ou de séances de course. Attendre des informations sur l'état actuel des genoux et les autres activités avant toute progression ; ne pas forcer à une charge qui provoque la douleur.
- Aucun autre rendez-vous ni sortie noté réalisé faute de confirmation.

## 12 novembre 2026 — Précision du compte rendu de kiné du 4 novembre

- **Correction utilisateur :** remplacer le texte des sensations de `kine-2026-11-04` par le ressenti exact de douleur à la presse à partir de 60–70 kg, avec maintien de la charge à 50 kg.
- **Déroulé corrigé :** ajouter une seconde étape « Étirements » pour clôturer la séance après la marche latérale avec bande élastique.
- **Réalisations :** mettre à jour le champ `sensations` dans `personnel/programme.js` et l'entrée « Réalisé » / « Sensations » de `personnel/sante/SUIVI.md` ; dates, autres séances et plan de course inchangés.

## 12 novembre 2026 — Application des nouvelles règles à la kiné du 4 novembre

- **Demande utilisateur :** reprendre la dernière publication de la séance `kine-2026-11-04` selon les consignes les plus récentes de sensations nominales et de « Structures sollicitées ».
- **Sensations :** résumé affiché raccourci en fragments nominaux, en conservant le seuil douloureux rapporté (à partir de 60–70 kg) et la limitation volontaire à 50 kg. Le libellé original plus narratif reste dans `personnel/sante/SUIVI.md` comme compte rendu historique.
- **Structures sollicitées :** deux indications de **sollicitation anatomiquement probable**, non de constat clinique : quadriceps fémoral pour l'extension du genou à la presse ; moyen fessier et abducteurs coxo-fémoraux pour la stabilisation / abduction de hanche lors de la marche latérale avec élastique. L'utilisateur n'a pas fourni d'analyse musculaire du kinésithérapeute ni les muscles visés par les étirements ; ne rien ajouter à ce sujet.
- **Source unique :** `structuresSollicitees` dans `personnel/programme.js` ; pas de doublon de la liste dans le journal santé. Le déroulé réel de `personnel/sante/SUIVI.md` conserve **les deux étapes « Étirements »**, dont la dernière clôture la séance.
- **Décision :** maintenir les autres séances et le programme de course sans modification ; demander des sensations actuelles avant toute progression.
