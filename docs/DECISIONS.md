# Décisions techniques — Maturation

Les décisions individuelles et la planification sportive se trouvent dans [personnel/DECISIONS.md](../personnel/DECISIONS.md), sans copie des données dans ce document.

- **Site** : publication GitHub Pages via Actions, `main`, calendrier hebdomadaire et affichage statique en lecture seule.
- **Rôles** : Coach exclusivement chargé des données sous `personnel/` ; Maturation exclusivement chargée du rendu, des conventions et de la publication. Pas de cumul automatique.
- **IHM** : aucune évolution visuelle sans demande/accord ; ✓ « Fait » uniquement après confirmation, aucune case interactive ou stockage local ; objectifs issus du fichier personnel.
- **Qualité** : prévalidation JavaScript/données/témoin par `node scripts/verifier-site.cjs`.
- **Déploiement** : `build` et `deploy` séparés ; contrôle API de l'artefact suite aux erreurs observées dans [actions/deploy-pages#451](https://github.com/actions/deploy-pages/issues/451).
- **Automatisation** : tout commit Coach sur `personnel/**` déclenche Pages, sans lancement manuel ; vérifier l'état `success` après publication.
- **Ségrégation récente** : déplacement du programme, du suivi santé et du futur espace Garmin sous `personnel/`, **sans second exemplaire versionné**. Les fichiers construction ne reprennent pas le programme individuel.
- **Historique** : les anciennes règles de suivi local, et la publication Pages classique depuis la branche, ont été abandonnées. Les décisions plus anciennes restent accessibles dans les commits Git.

## 11 novembre 2026 — Absence d'indexation souhaitée

- Le site GitHub Pages **reste public par choix explicite**, mais le propriétaire **ne veut pas qu'il apparaisse dans les résultats des moteurs de recherche**.
- **Choix technique** : ajout de `<meta name="robots" content="noindex, nofollow">` et `<meta name="googlebot" content="noindex, nofollow">` dans `index.html`, **sans changement visuel**.
- **Pas de `robots.txt` projet trompeur** : sur `hameaufl.github.io/programme-sport/`, seul le fichier à la racine de l'hôte est applicable. Une interdiction de crawl empêcherait potentiellement Google de lire `noindex`.
- **Prévention** : test intégré à `scripts/verifier-site.cjs`, échec de publication si `noindex` manque ; procédure inscrite dans `AGENTS.md`.
- **Limitations** : les moteurs peuvent différer dans leur respect de `noindex` ; le dépôt public et les données JavaScript/Garmin ne deviennent pas privés ni systématiquement désindexés ; l'URL peut toujours être partagée.

## 11 novembre 2026 — Réponses du Coach concises et exclusivement métier

- **Décision utilisateur** : limiter fortement la verbosité du Coach ; répondre directement, brièvement, sans longs paragraphes, idéalement 1 à 3 phrases lorsqu'un retour est simple.
- **Périmètre strict** : parler uniquement des entraînements, séances réalisées, sensations, récupération et ajustements pertinents. **Ne pas signaler ou récapituler les changements de Maturation non pertinents** pour son métier.
- Les détails complets sont poussés dans `personnel/` et consultables sur Mon Rythme ; **ne pas les répéter** dans le chat.
- En cas de blocage effectif d'un commit ou d'une publication du Coach, ou d'une alerte importante, le signaler clairement et brièvement.
- Cette décision concerne le **style de réponse du Coach**, non les décisions sportives et non l'obligation de versionner son travail.

## 11 novembre 2026 — Lien vers Mon Rythme et détail de séance par le Coach

- Le Coach **ajoute un lien** vers [Mon Rythme](https://hameaufl.github.io/programme-sport/) lorsqu'il répond à un retour de séance ou une modification du programme.
- Ce lien peut ouvrir une application standalone installée sur Android ou le navigateur : **aucune promesse d'ouverture dans le lanceur**.
- La brièveté est une préférence par défaut : **le Coach peut fournir le détail d'une séance** à la demande ou lorsque celui-ci est utile (étapes, durée, progression et récupération pertinentes). Ne pas supprimer ces précisions au seul motif d'être très concis.
- Le Coach ne commente toujours pas les interventions de Maturation étrangères à son métier.
- Cette règle porte uniquement sur le **contenu des réponses du Coach** ; aucun nouvel élément graphique dans le site, aucune modification sportive.

## 11 novembre 2026 — Style de lancement du site depuis les réponses Coach

- **Option 2 définitivement choisie** parmi les trois boutons proposés : bouton principal bien visible et lisible.
- **Icône 5 « Parcours »**, correspondant à l'icône Lucide `route`, sélectionnée parmi quinze options ; elle évoque le chemin suivi à son rythme.
- Format : **[icône Parcours] Ouvrir Mon Rythme [flèche de sortie]**, URL `https://hameaufl.github.io/programme-sport/`.
- Afficher un **vrai bouton cliquable si l'interface de conversation le permet**, sinon un lien Markdown nommé ; ne pas faire croire qu'un simple texte crée un bouton.
- La décision concerne **la réponse du Coach uniquement**, pas l'interface de Mon Rythme. Le Coach reste concis, centré sur le coaching et peut détailler une séance si nécessaire.
- Aucun ajout de bouton dans le code HTML du site et aucune modification du programme personnel.

## 11 novembre 2026 — Carte Coach variante 2 simplifiée, choix remplaçant

- Le propriétaire choisit **la carte de la variante 2**, basée sur l'aperçu précédent, **mais simplifiée**.
- En-tête : remplacer l'icône « Parcours » (`route`) par **`arrow-up-right`** juste à gauche du titre **« Mon Rythme »**.
- **Supprimer entièrement le sous-paragraphe** sous le titre (« Retrouver mes séances et mon suivi »).
- Bouton principal pleine largeur : **« Accéder à mes séances »**, **sans icône**. L'ancien « Ouvrir mon programme » et sa flèche sont retirés.
- URL inchangée : `https://hameaufl.github.io/programme-sport/`.
- **Cette décision remplace le choix du bouton seul avec l'icône route** et tous anciens textes de bouton contradictoires. Exclusivement pour les réponses du Coach dans le chat ; aucune nouvelle carte sur le site GitHub Pages.

## 11 novembre 2026 — Centrage du titre dans la carte du Coach

- Nouvelle précision demandée : **centrer horizontalement ensemble** la flèche `arrow-up-right` et le texte **« Mon Rythme »** au-dessus du bouton.
- Garder l'icône et le titre sur **une seule ligne**, la flèche à gauche, avec un petit espacement ; ne pas les centrer séparément.
- Conserver exactement le bouton principal **« Accéder à mes séances »** pleine largeur **sans icône**, sans sous-texte et avec la même destination.
- Cette consigne concerne **la carte affichée dans la réponse ChatGPT du Coach**, pas l'interface du site GitHub Pages.

## 11 novembre 2026 — Sens de « se mettre à jour » pour tout agent

- **Instruction utilisateur explicite** : « se mettre à jour » signifie **prendre connaissance de l'état du dépôt GitHub**, notamment des nouveaux commits reçus depuis la dernière consultation.
- Cette demande vise la **mémoire opérationnelle de l'agent**, pas le code ni le contenu du site : **aucun changement de fichier, décision de Coach, commit, journal, push ou workflow** sur la seule demande de lecture.
- S'applique aux **deux casquettes** : Coach consulte son domaine `personnel/` et les règles ; Maturation consulte les règles, code et documents techniques. La réponse se limite à une confirmation ou aux changements pertinents au rôle.
- Si une modification est demandée en plus, elle est une **instruction distincte**, exécutée dans le périmètre habituel.
- La présente inscription de cette règle est l'exception initiale autorisée pour assurer le transfert de consigne aux futurs LLM.

## 11 novembre 2026 — Première page dédiée au suivi santé

- **Demande explicite** : modifier l'IHM pour ajouter une redirection depuis le programme vers une seconde page de bilan de la reprise sportive.
- **Maturation** crée `sante.html` et un accès en bas de `index.html`, avec retour vers le calendrier. Une proposition fonctionnelle est publiée pour recueillir les retours d'ergonomie.
- La page agrège **uniquement les données réellement enregistrées** : `personnel/programme.js` pour les compteurs et séances suivies, `personnel/sante/PROFIL.md` pour les rubriques de bilan, `personnel/sante/SUIVI.md` pour les comptes rendus datés.
- **Aucune duplication** des informations personnelles dans une seconde source et **aucun bilan médical créé par Maturation**. Les données absentes restent explicitement non renseignées.
- Le rendu Markdown utilise seulement du texte sûr et des listes, jamais d'HTML provenant des documents. Affichage des entrées datées avec un titre `### AAAA-MM-JJ` ; les modèles de journal ne sont pas affichés comme des comptes rendus.
- Déploiement `sante.html` + sources Markdown par GitHub Actions, balises `noindex` sur les deux pages, et contrôles avant publication.

## 11 novembre 2026 — Séparer le résumé hebdomadaire du compte rendu détaillé

- Dans **« Séances de la semaine »**, conserver la date et le titre, ajouter uniquement ✓ « Fait » si la séance est confirmée. **Ne jamais afficher les sensations dans cette vue**, ni les métadonnées détaillées. Une séance non confirmée ne reçoit pas de statut visuel, selon la décision antérieure.
- Dans **« Programme du jour »**, aligner ✓ « Fait » directement à côté du titre de la séance ; afficher les sensations **après le déroulé** avec un **titre « Sensations » sans deux-points** puis un paragraphe en pleine largeur. Corriger les retours à la ligne et débordements mobiles.
- Casquette **Coach** : lorsque l'utilisateur parle de mouvements ou sensations en termes courants, employer une terminologie anatomique/biomécanique ou de préparation physique adaptée et brièvement expliquée, **sans présenter de supposition comme un diagnostic ou un fait confirmé**.
- Les notes et statuts réels restent inchangés ; seule l'interface et les consignes de rédaction des futurs comptes rendus évoluent.
- Ajouter un test prépublication pour empêcher le retour des notes dans la liste hebdomadaire.

## 11 novembre 2026 — Découpage des séances : déroulé et sensations

- Choix éditorial pour la première version : **« Déroulé de la séance »** (plus approprié qu'un titre « Programme » pour les réalisations) suivi de **« Sensations »**, conservé en paragraphe. La liste à puces doit exposer les **faits réalisés**, sans mise en forme qui les confonde avec le ressenti.
- Pour les séances **programmées et non confirmées**, titre **« Programme prévu »** et `etapes` existantes ; jamais un programme planifié étiqueté « réalisé ».
- Pour les séances **réalisées**, première source : nouveau champ **optionnel** `exercicesRealises: string[]` du programme versionné (à renseigner exclusivement par le Coach). En son absence, rendre la section « Réalisé » du journal `personnel/sante/SUIVI.md` correspondant à l'ID, découpée en puces aux points-virgules. Le journal est déjà sur Pages ; aucun doublon de données dans l'IHM.
- La première séance de kiné a un compte rendu véritable dans le journal : les exercices déjà rapportés apparaissent sans exiger que Maturation réécrive le programme.
- **Responsabilité du Coach** : distinguer faits (exercices), sensations (ressenti), hypothèses (chaînes musculaires sollicitées), et reformuler avec une terminologie compréhensible ; ne pas inférer de diagnostic. Aucun changement du contenu sportif par Maturation.
- Conserver le résumé hebdomadaire épuré et l'absence de cases cliquables. Ajouter validation structurelle prépublication, garder les deux pages et `publication.txt` sur la même version.

## 11 novembre 2026 — Concision impérative du déroulé des séances

- Les éléments sous **« Déroulé de la séance »** sont des **intitulés en puces très courts**, de préférence **2 à 8 mots**, sans phrase narrative, sujet-verbe-complément ni détails de contexte.
- Retenir des désignations précises : **« Bilan initial »**, **« Étirements »**, **« Presse à cuisses · 40 et 50 kg »**, **« Marche latérale avec bande élastique »** ; les charges et équipements ne figurent que s'ils ont réellement été rapportés.
- Le Coach **traduit le vocabulaire de l'utilisateur en termes techniques pertinents** sans inventer des groupes musculaires ou conclure sur une technique non confirmée.
- La partie **« Sensations »** et le suivi santé détaillé demeurent les emplacements pour la narration, les douleurs et les nuances ; la liste ne doit pas les reprendre.
- Les intitulés affichés proviennent de `personnel/programme.js` (`exercicesRealises`, le cas échéant) ou de **« Réalisé »** dans `personnel/sante/SUIVI.md`, séparé par points-virgules ; **ne pas créer de doublon** lorsque l'une des sources contient déjà les faits.

## 12 novembre 2026 — Renommage du titre du bloc réalisé

- **Dernière décision prioritaire** : dans la vue « Programme du jour », le titre de la liste des exercices d'une séance confirmée est désormais **« Séance »**, et non « Déroulé de la séance ».
- **« Programme prévu »** reste le titre pour les séances non confirmées, afin de distinguer les exercices planifiés des exercices réalisés.
- Le format en puces courtes, les sensations distinctes, les données du Coach et le résumé hebdomadaire restent inchangés. Les intitulés anciens dans cet historique décrivent les versions précédentes, pas la règle actuelle.

## 12 novembre 2026 — Simplification des accès et de la page santé

- Sur la page **Mon programme**, la carte de navigation vers « Mon suivi santé » ne comporte plus de texte secondaire ; **titre et bouton côte à côte**, avec repli adapté aux très petites largeurs.
- Sur **Mon suivi santé**, supprimer le sous-titre du héros et **supprimer entièrement « Mes séances suivies »**, y compris la liste des séances et le code de rendu associé. Conserver les indicateurs généraux, le profil et le journal santé.
- Le journal santé affiche les faits réels sous forme d'entrées datées (`### AAAA-MM-JJ`), en les lisant depuis `personnel/sante/SUIVI.md`, sans copie dans l'HTML.
- Nouveaux repères à renseigner progressivement : obtention de semelles orthopédiques le lundi **9 novembre 2026**, achat de chaussures de running le **2 novembre 2026** ; marque et modèle non transmis. Bilan podologique annoncé, aucun document encore disponible dans l'échange.
- Préserver la séparation des vues, les deux pages `noindex` et le versionnement des sources uniques. Tester avant le déploiement.

## 12 novembre 2026 — Sensations nominales et structures sollicitées

- Demande : **résumer les sensations de manière très concise**, en fragments nominaux quasi non verbaux, sans retranscription phrasée de l'échange et sans répéter les exercices. Rester fidèle aux douleurs, déclencheurs, limites et aux informations réellement fournies.
- Entre **« Séance »** et **« Sensations »**, ajouter **« Structures sollicitées »** : liste anatomique précise **groupée par région/fonction**, fondée sur les mouvements réellement décrits ; ne pas placer la terminologie musculaire dans les puces d'exercices. Uniquement lorsque la séance est confirmée.
- Source réservée au Coach : `structuresSollicitees: string[]` facultatif de `personnel/programme.js`, ou ligne `**Structures sollicitées :**` du journal `personnel/sante/SUIVI.md` identifié par la séance ; **pas de doublon** et programme prioritaire.
- Privilégier la terminologie exacte (*quadriceps fémoral*, *ischio-jambiers*, *moyen fessier*, *chaînes postérieures*, etc.) sur les noms corporels vagues, sans inférer un tendon blessé ni affirmer une activation clinique. Qualifier la sollicitation probable et **n'afficher aucune liste inventée**.
- S'il n'existe pas de donnée anatomique, afficher « À préciser par le Coach ». Les informations sportives déjà versionnées restent inchangées ; test prépublication étendu à ce nouveau schéma.

## 12 novembre 2026 — Structures sollicitées : supprimer les réserves systématiques

- **Correction demandée après le dernier commit Coach `3fd064e`** : les deux libellés de `structuresSollicitees` affichaient « sollicitation probable... » entre parenthèses. **Ce type de réserve est indésirable dans la liste**.
- Le **Coach doit analyser lui-même** les mouvements et en tirer les structures anatomiques pertinentes, **sans demander à l'utilisateur leurs noms**. Les puces ne contiennent que les résultats : p. ex. « Genou / extension — quadriceps fémoral » et « Hanche / abduction et stabilisation — moyen fessier, abducteurs coxo-fémoraux ».
- **Aucune parenthèse de justification** (« probable », « non prouvée cliniquement », « hypothèse », etc.). Cette simplification stylistique ne transforme pas une déduction biomécanique en diagnostic médical : conserver l'exactitude et omettre toute structure insuffisamment étayée.
- Correction de présentation dans `index.html` : supprimer uniquement les parenthèses de précaution méthodologique connues à l'affichage, **sans altérer les données du Coach**. Ajouter des tests prépublication garantissant la conservation des véritables précisions anatomiques entre parenthèses.
- Prochaine action du Coach sur le programme : **raccourcir les deux anciennes valeurs à la source** dans `personnel/programme.js`, sans modifier les termes anatomiques fondés. Les règles de séparation des rôles restent applicables.

## 12 novembre 2026 — Migration des sources vers des fichiers unitaires

- **Demande** : préparer plusieurs milliers de séances et comptes rendus, préserver la fluidité et empêcher les réécritures involontaires par des Coach LLM, **sans altérer aucune donnée existante ni changer la navigation hebdomadaire**.
- **Décision** : `personnel/seances/AAAA/MM/<id>.json` comme source unique d'une séance ; `personnel/config.json` pour objectifs et début de cycle ; notes de cycle historiques conservées séparément. `personnel/programme.js` retiré.
- **Comptes rendus** : un fichier par séance dans `personnel/sante/rapports/`, événements indépendants dans `personnel/sante/evenements/`. Les blocs de `SUIVI.md` ont été déplacés **octet pour octet**, sans réinterprétation.
- **Publication** : script Node de validation/génération produisant `data/index.json`, semaines détaillées et journal paginé dans `_site/`, sans les stocker dans Git. L'IHM charge uniquement une semaine, avec cache limité à huit semaines ; la page santé charge un résumé et une page de journal à la fois.
- **Intégrité** : preuve de migration avec commit/blob originaux dans `scripts/migration-preuve.json` ; comparaison 18/18 objets JSON, objectifs et cycle, journal reconstitué identique ; validateur statique + test synthétique 5 000 séances ; script de portée empêchant suppressions et exigeant l'accord `[lot-valide]` au-delà de quatre séances par commit.
- **Périmètres** : les futures modifications de séance, sensations, structures et rapport restent strictement Coach. Aucun bouton d'accès direct mois ou année.

## 12 novembre 2026 — Premier FIT Workout Garmin pour une séance planifiée

- **Demande** : choisir un fichier d'entraînement exploitable par la Venu 4, générer un exemple pour la séance prévue le 11 novembre 2026, le rattacher au détail du programme et documenter la génération par le Coach. Aucun MCP Garmin pour l'instant.
- **Choix technique** : FIT **Workout** (distinct d'un FIT Activity), avec en-tête, CRC et messages `file_id`, `workout`, `workout_step`, selon la spécification Garmin. Pour le 11 novembre : **3 × (2 min marche + 3 min course) + 2 min marche**, soit 7 étapes, 17 min, sans cible cardiaque ni vitesse inventée.
- **Archive source** : `personnel/pieces-jointes/seances/course-2026-11-11/prevu/course-2026-11-11.fit`, lien `pieces_jointes` ajouté à la seule séance concernée. Les données sportives préexistantes restent strictement inchangées.
- **IHM** : lien de téléchargement sur le détail de séance ; **navigation hebdomadaire inchangée**. Générateur autonome `scripts/generer-garmin.cjs` et contrôles de la structure FIT intégrés à la CI.
- **Règle Coach** : produire automatiquement le FIT quand un programme est ajouté ou modifié et que ses étapes sont reconnues ; refuser une conversion approximative pour un modèle non pris en charge.
- **Limite de compatibilité** : Venu 4 prend en charge les entraînements structurés envoyés depuis Garmin Connect, **pas de preuve d'import d'un FIT Workout tiers** via Garmin Connect ou directement via USB. Pas de garantie sans essai réel.

## 12 novembre 2026 — Lien Garmin sans sous-texte et génération Coach automatique

- À la demande de l'utilisateur, **supprimer de l'IHM** la ligne « Fichier d'entraînement prévu · transfert vers Venu 4 à tester » située sous le téléchargement FIT. Conserver le lien et son texte, sans autre élément visuel.
- Les informations de limites ou d'essai technique **restent dans la documentation**, sans surcharge visible sur la page de séance.
- **Coach** : dès qu'un programme course/marche est présenté, créé ou modifié et que ses étapes sont reconnues, générer le FIT Workout **spontanément** dans le même flux, l'attacher à la séance JSON individuelle et vérifier les tests et la publication. Aucun deuxième ordre explicite requis.
- En cas de format d'étapes non pris en charge, **refuser un FIT approximatif** et demander un changement technique à Maturation.
- **Aucune altération des données d'entraînement existantes**, des sensations et des structures ; navigation hebdomadaire inchangée. Régressions prévenues par tests du lien et de l'absence de sous-texte.

## 12 novembre 2026 — Continuité métier intégrale et indépendante du LLM Coach

- **Clarification explicite du propriétaire** : toutes les connaissances que possède le Coach **pour personnaliser son programme**, bien au-delà des séances ou de la reprise sportive, doivent être persistées sur GitHub. Un changement de modèle ou de conversation ne doit pas faire perdre la finesse des informations, de l'analyse, des contraintes et des choix.
- **Règle prioritaire** : lors de tout nouvel apport métier, même sans modification immédiate d'une séance, le Coach conserve dans `personnel/` les faits, préférences, contraintes, contexte de vie pertinent, équipement, motivation, objectifs, mesures, santé, réponses aux entraînements, hypothèses, décisions et justifications. **Aucune connaissance utile uniquement conservée dans une conversation.**
- **Sources** : conserver une source canonique par objet ; le Coach peut créer `personnel/CONTEXTE-COACH.md` pour les connaissances transversales qui n'ont pas d'autre emplacement ; les séances, comptes rendus, profil, décisions et journal conservent leurs rôles existants. Aucune donnée personnelle n'est copiée dans `docs/`.
- **Finesse et traçabilité** : dater, sourcer, signaler le niveau de confirmation, le contexte, la portée, les raisons de décisions et les points en suspens ; ne jamais substituer une synthèse appauvrie aux documents détaillés.
- **Processus** : lire le dépôt avant d'agir ; écrire dans le même échange, contrôler le diff, committer/pousser et vérifier à distance. Ne pas déclarer un contexte sauvegardé sans succès. Un nouvel agent relit les sources pertinentes avant toute proposition personnalisée.
- **Exceptions** : « Mets-toi à jour » seul demeure une opération **strictement en lecture seule**. Les connaissances de conversations antérieures inaccessibles ne peuvent pas être reconstituées automatiquement. **Dépôt public** : pas de garantie de confidentialité.
- **Mise en œuvre Maturation** : contrat technique [CONTRAT-CONTINUITE-COACH.md](CONTRAT-CONTINUITE-COACH.md), règles de priorité et de reprise dans `AGENTS.md`, `docs/ROLES.md` et `docs/REPRISE.md`. Pas d'impact sur `personnel/` ni sur les pages HTML.

## 12 novembre 2026 — Libellé des journées à plusieurs activités

- Demande : dans les cases du calendrier, afficher les activités **séparées par « , » (virgule et espace)** au lieu de « + », avec **une majuscule initiale pour chacune**. Exemple : **« Course, Kiné »**.
- Le rendu prend en compte **toutes** les activités du jour dans leur ordre, pas seulement la présence de Course et Kiné, et ne fusionne pas deux séances de même type. Aucun élément de navigation ou champ personnel modifié.
- La vérification prépublication teste les journées à zéro, une, deux et trois séances, y compris une double activité du même type ; version HTML synchronisée entre les deux pages.

## 12 novembre 2026 — Refonte complète en domaines et add-ons, après accord explicite du propriétaire

- Découpage par phases : inventaire et frontières, séparation canonique Planification/Activités/Santé/Coaching, adaptateur Garmin et Web indépendant, puis contrôles de portabilité et confidentialité.
- Les 36 séances ont été converties en plans à blocs typés, activités effectivement réalisées et observations de santé distinctes. Les comptes rendus et archives Coach ont été déplacés sans changement factuel. Les 33 FIT ont été déplacés avec leur SHA d'origine ; l'interface n'en détient aucun.
- L'extension Web a ses propres sources et ressources sous `addons/web/`, ne reçoit que des champs autorisés via une projection. Tests : parité historique complète, CI de build standard et de publication restreinte, absence de dépendance du cœur envers le Web.
- La politique de publication historique reste publique; la variante restreinte prépare un transfert futur vers un autre support et **n'efface pas les copies déjà publiques**. La publication de cette refonte sur `main` ne doit intervenir qu'après CI verte.
