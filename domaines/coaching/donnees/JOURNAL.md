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

## 12 novembre 2026 — Libellés de la séance kiné du 4 novembre

- **Demande de précision :** uniquement retirer le mot « cuisses » dans les libellés du déroulé de `kine-2026-11-04`.
- **Application :** « Presse · 40 et 50 kg » et « Marche latérale avec bande élastique » ; bilan initial, deux étirements, ordre et charges inchangés.
- **Aucune autre modification sportive** : sensations, structures sollicitées et calendrier inchangés.

## 12 novembre 2026 — Profil mécanique et démarche médicale éventuelle

- L'utilisateur fournit un bilan de référence : pieds extra-larges (113 mm, petit 43), difficultés de chaussage avec semelles orthopédiques, douleurs du quatrième métatarsien gauche, hallux valgus droit, périostites récurrentes depuis des années, douleur du genou gauche en hyperextension et hyperlaxité généralisée avec sentiment de renforcement musculaire insuffisant.
- **Hypothèses non confirmées :** compression métatarsienne entre os voisins dans des chaussures trop étroites ; éventuelle contribution de la largeur des chaussures aux douleurs plantaires près du talon.
- **Précision du médecin selon l'utilisateur :** échographie du pied évoquée pour la douleur au quatrième métatarsien ; radiographie ou autre modalité à déterminer. Éventuelle nouvelle consultation d'ici quelques semaines si la douleur persiste malgré les semelles ; aucun examen ni rendez-vous acté.
- **Action Coach :** renseignement de `personnel/sante/PROFIL.md` uniquement pour le contenu santé et journalisation de la décision ; aucune modification de séance ni génération de FIT Workout, aucun diagnostic inventé.

## 12 novembre 2026 — Intitulés des sorties et ancienneté des périostites

- Demande explicite de modification groupée des 15 séances de course : abandon des numéros « Séance 1/2/3 » au profit des titres **« Course à pied · 2M+3C »** (6 sorties) et **« Course à pied · 2M+5C »** (9 sorties).
- Seuls les champs `titre` des 15 séances sont modifiés ; les dates, ID, étapes prévues, réalisations, sensations, autres données et pièces Garmin restent intacts. Les rendez-vous de kinésithérapie ne changent pas.
- Correction de l'antécédent rapporté : les **périostites existent depuis des années**, et non depuis un an ; rectification des deux mentions dans `personnel/sante/PROFIL.md` ainsi que dans le présent journal.
- Aucun FIT régénéré : pas de changement d'étapes prévues. Lot explicitement demandé par l'utilisateur et commité avec `[lot-valide]`.

## 12 novembre 2026 — Reprise très progressive avec quatrième sortie optionnelle

- Demande de l'utilisateur : viser progressivement **5 sorties de course par semaine**, avec adaptation autonome par le Coach à **4, 3 ou moins** selon les sensations et le risque de blessure. Il insiste sur une pratique régulière mais tranquille pour réhabituer progressivement le corps à l'effort.
- **Analyse Coach :** la douleur à l'appui sous le pied droit (5–6/10) et celle de la hanche droite (5/10) lors du 11 novembre rendent une augmentation immédiate à cinq injustifiée. Ne pas banaliser ces douleurs ; une légère gêne stable n'est pas nécessairement un motif d'arrêt, mais la douleur significative ou aggravée impose de réduire et de faire réévaluer si elle persiste.
- **Aménagement anticipé :** quatre créneaux très courts **facultatifs** ajoutés les samedis **21, 28 novembre, 5 et 12 décembre**, mode **2M+3C raccourci à 1 répétition** : 2 min marche, 3 min course, 2 min marche = 7 min au total. Ne pas les effectuer en cas de douleur à l'appui, de douleur de hanche ou de mauvaise récupération ; pas de séance de rattrapage automatique.
- **Objectif cinq séances** : non encore programmé ; réévaluer après des retours positifs sur plusieurs sorties et la tolérance de quatre séances. La programmation existante, les séances déjà réalisées et les consultations restent intactes.
- **Garmin** : quatre FIT Workout de 3 étapes créés et liés à chaque nouvelle séance ; aucun enregistrement d'activité inventé. Aucune modification d'IHM.

## 12 novembre 2026 — Matériel réel, animations et premiers renfos

- Nouvelle précision utilisateur : uniquement tapis de sol et gros ballon d'environ 80 cm, **aucun élastique ni autre équipement** disponible à domicile. Il signalera toute acquisition ultérieure ; priorité aux mouvements au poids du corps adaptés à l'hyperlaxité et à la douleur.
- Besoin pédagogique explicite : intitulés français accessibles, six mouvements plutôt qu'une nomenclature de séries compliquée, GIF par exercice via `?` ouvrant directement l'animation, bouton Retour du smartphone conservé. Les préférences durables sont détaillées dans `personnel/CONTEXTE-COACH.md`.
- Intégration après validation par l'utilisateur : quatre sessions `Renfo` hebdomadaires prévues, non faites (17 et 24 novembre, 1er et 8 décembre), cinq GIFs simplifiés d'aide aux gestes et liens dans les détails de séance. Pas de modification des séances course ou kiné existantes.
- Correction d'interface demandée : les cases des jours du calendrier doivent afficher « Course à pied », pas « Séance », pour les courses plus anciennes dépourvues de champ `type` ; préserver le séparateur virgule et la capitalisation.
- Garder la portée Coach limitée aux faits dans `personnel/` ; la mise en page et le build relèvent de Maturation, demandés directement par l'utilisateur dans le même échange.

## 12 novembre 2026 — Trois renfos plus longs, PNG statiques et consigne permanente

- L'utilisateur juge le Renfo initial beaucoup trop court et demande environ **×3 de durée** et **3 séances de renfo par semaine**, réparties, avec adaptation après ses retours.
- Relecture des séances existantes et programmation sur 4 semaines : conserver 4 séances Renfo existantes et ajouter 8 séances, soit 12 au total, mardi/jeudi/samedi, chacune 30–36 min prévues, mode facultatif selon symptômes et récupération.
- Exemples de volumes de kiné communiqués (ponts 3 × 10 avec effort de 20 s et repos 5 s, marche latérale élastique presque 10 min) : consigner dans `personnel/CONTEXTE-COACH.md` sans les attribuer à une séance précise ni en faire une prescription automatique à domicile.
- Remplacement effectif des aides GIF par les **PNG originaux que l'utilisateur a validés** ; banque unique documentée, question mark plus petit, image agrandie dans une fenêtre intégrée fermable. Règle permanente enregistrée dans `AGENTS.md` et `docs/ROLES.md`.
- Aucun changement apporté aux séances course, kiné ou Garmin. Publication et contrôles du site obligatoires.

## 12 novembre 2026 — Renfo immédiat et descriptions séquentielles

- Trois nouveaux Renfos non réalisés datés du **12, 14 et 15 novembre**, en supplément des douze Renfos des quatre semaines suivantes ; **15 Renfos en tout**, trois par semaine sur cinq semaines.
- Toutes les séances Renfo prévues présentent désormais **cinq puces chronologiques**, avec échauffement 4 min, exercices et leurs durées/pauses, retour au calme 4 min. Les anciennes descriptions longues sont supprimées du rendu, mais les champs `objectif`/`details` restent présents.
- Banque PNG et exercices déjà choisis inchangés ; les schémas ne sont pas redessinés. Séance du dimanche 15 particulièrement facultative compte tenu de la densité.
- Consignes durables mises à jour avec casquette éphémère Maturation. Statut/identifiant/date des 12 Renfos existants ainsi que course et kiné conservés.

## 12 novembre 2026 — Correction de la semaine du 16 novembre

- À la demande de l'utilisateur, **Renfo mardi 17 → lundi 16 novembre** avec contenu inchangé, et **Renfo dimanche 15 supprimé**, tous deux non réalisés. Nouveau Renfo du lundi prévu, également non réalisé.
- Dimanche 15 et mardi 17 sans Renfo ; mardi précédant la kiné du 18 réservé à la récupération. Le lundi 16 a déjà une course prévue, à adapter selon les sensations.
- La protection de suppression de la CI reçoit une exception **limitée à ces deux IDs et au déplacement validé**. Les tests vérifient désormais 14 Renfos sur le cycle.

## 12 novembre 2026 — Quatorze FIT Workout Renfo et génération future automatique

- Le propriétaire demande un fichier d'entraînement Garmin pour **chaque** Renfo, comme pour les courses. Après sa correction de calendrier, les dates actives sont : 12, 14, 16, 19, 21, 24, 26, 28 novembre et 1, 3, 5, 8, 10, 12 décembre. **Renfo du 15 et du 17 novembre supprimés** ; ne générer aucun FIT pour ces anciennes dates.
- **Action Coach** : quatorze FIT binaires de type Workout musculation créés et attachés individuellement ; 9 séries ouvertes et 6 pauses minutées par séance, avec 4 min de préparation et 4 min de récupération. Éviter d'assimiler ces fichiers à des activités réellement pratiquées.
- **Action technique Maturation** : extension du générateur de FIT pour les Renfos tout en conservant le format course ; validation systématique des nouveaux programmes et des liens lors de la construction du site. Aucun changement de page ou des PNG.

## 12 novembre 2026 — Étirements dans les séances encore programmées

- L'utilisateur demande un bloc d'étirements doux après les courses et Renfos, directement dans le descriptif et le fichier Garmin. Il précise qu'il ne faut **pas retoucher les séances déjà effectuées**.
- **18 courses à venir** : un bloc final 3 min pour mollets/fessiers/ischio-jambiers, sans douleur ou hyperextension ; durée totale prévue augmentée de 3 min, mode et option éventuelle inchangés. **14 Renfos à venir** : 3 min de récupération douce sur les muscles ciblés (A/B) après les 4 min de retour au calme ; durée prévue 33–39 min, et trois aides PNG d'exercices techniques conservées.
- **Garmin** : 32 FIT Workout générés/régénérés depuis les plans, incluant explicitement le bloc d'étirements ; ne pas inventer de données d'activité réalisée. L'interface s'appuie toujours sur les fichiers JSON ; aucun exercice exécuté ni résultat médical n'a été inventé.
- **Séance réalisée du 11 novembre** : inchangée, même si l'étirement aurait pu être utile ; ne pas lui attribuer rétroactivement un geste non déclaré.

## 12 novembre 2026 — Étirements seuls pour la récupération finale du Renfo

- Nouvelle préférence explicite du propriétaire, prioritaire sur les anciennes prescriptions : lorsqu'un Renfo prévu contient un bloc d'étirements doux, ces étirements font office de retour au calme. Ne pas ajouter 4 min de mouvements doux/respiration après les exercices. Conserver la mise en route de 4 min au début.
- Application aux 14 Renfos non réalisés : mêmes dates, IDs, exercices, séries, pauses, aides PNG, étirements, fait et sensations ; suppression du seul bloc redondant « Retour au calme ». Durée indicative 33–39 → 29–35 min, FIT Workout prévu 18 → 17 pas ; temps minuté 960 → 720 s. Aucune modification des sorties Course, des séances Kiné ou des activités déjà réalisées.
- Pour les Renfos futurs : cinq étapes chronologiques, FIT synchronisé avec le JSON et vérification de l'absence de retour au calme supplémentaire. Aucune preuve d'exécution sportive créée.

## 12 novembre 2026 — Préférence validée pour les entraînements Garmin Connect (MCP bêta)

- Le compte Garmin Connect est nouvellement créé et un **MCP personnalisé Garmin** est connecté. Sa bibliothèque et son calendrier étaient vides lors de l'inventaire ; aucun appareil n'était retourné par les lectures MCP. Cela ne valide pas encore le transfert réel à la Venu 4.
- Un **même modèle d'entraînement Garmin** est réutilisable à **plusieurs dates** de Garmin Connect, par calendrier. Éviter une copie par séance ou par jour quand les blocs sont identiques ; inspecter les entraînements distants avant création et programmer les seules dates indiquées.
- **Bêta : le Coach n'effectue AUCUNE écriture via le MCP sans demande explicite de l'utilisateur pour la séance du jour ou les jours exacts qu'il précise.** Ne pas créer, envoyer ou programmer automatiquement tout un mois ou plusieurs semaines. Une mise à jour de programme ne vaut pas ordre Garmin.
- Nommage descriptif court à convenir lors du premier usage ; aucune convention de référence mois/date ou « Renfo haut/bas » n'est décidée. Réutiliser les contenus identiques, et contrôler les variations avant d'associer plusieurs dates.
- Mon Rythme affiche les séances, dates et aides visuelles, **sans aucun document ou téléchargement d'entraînement Garmin**. Les 33 FIT locaux et leur générateur ont été supprimés du HEAD, ainsi que la publication des pièces. Les données sportives prévues et réalisées sont conservées sans altération.
- Opérations autorisées uniquement à la demande : lectures get_workouts/get_scheduled_workouts, puis upload_workout(s) et schedule_workouts sur sélection contrôlée, vérification des succès. Le module `adaptateurs/garmin/mcp.cjs` prépare en lecture seule ; le Coach effectue les appels MCP, jamais la CI ou le site.
- Les exercices de Renfo doivent conserver échauffement, séries, repos et étirements sans retour au calme redondant. Tant que la représentation Garmin des mouvements et du déroulé complet n'est pas vérifiée, ne pas créer un Renfo approximatif. Ne jamais inventer des zones cardiaques et ne pas conclure à une réalisation ou une synchro depuis la seule programmation.

