# Journal Maturation — historique technique

## 10–11 novembre 2026 — Mise en place

- Site statique Mon Rythme, responsive, calendrier lundi–dimanche, date actuelle dynamique.
- Documentation de reprise multi-LLM et rôles séparés.
- Passage des cases locales aux statuts statiques versionnés, affichage concis en puces, boutons et indicateurs ajustés sur demande.

## 11 novembre 2026 — Fiabilisation de Pages

- Échecs de la publication classique, puis passage à GitHub Actions.
- [Run 43101058284](https://github.com/hameaufl/programme-sport/actions/runs/43101058284) : échec de déploiement malgré artefact créé ; correction via jobs séparés, attente API et validateur prépublication.
- [Run 43102658894](https://github.com/hameaufl/programme-sport/actions/runs/43102658894) : `success`.

## 11 novembre 2026 — Séparation physique sans duplication

- Demande : distinguer construction et données personnelles **sans créer de copies**.
- Déplacement du fichier de programme, du suivi santé et de l'espace Garmin sous `personnel/` ; chargement direct à partir du nouveau chemin.
- Extraction du contenu personnel écrit en dur dans la page vers le fichier personnel.
- Workflow déclenché par `personnel/**`, chemin déployé conservé ; tests anti-doublons et validité JS mis à jour.
- Conservation à l'identique des 18 séances, identifiants et statuts ; aucune décision sportive.
- **Contrôle GitHub Actions confirmé :** [run 43105814078](https://github.com/hameaufl/programme-sport/actions/runs/43105814078), `completed / success`. Validation du code/données, artefact et déploiement Pages réussis.
- **Commit de séparation :** `2b2e5ba56820e1b40c74df41a853679c351ccfab`. Aucune vérification physique du rendu sur Android.


## 11 novembre 2026 — Empêcher l'indexation du site public

- **Demande** : conserver GitHub Pages public, décourager sa découverte depuis Google et les moteurs de recherche ; ne pas ajouter de visuel.
- **Implémentation** : balises `robots` et `googlebot` avec `noindex, nofollow` dans le `head` de `index.html`. Pas de `robots.txt` inefficace dans le sous-chemin du projet.
- **Prévention** : contrôle obligatoire du `noindex` par `scripts/verifier-site.cjs`, règle permanente dans `AGENTS.md`, documentation de transfert actualisée.
- **Versions** : méta-identifiant HTML et `publication.txt` harmonisés sur `2026-11-11-noindex-v5` ; aucun changement des données `personnel/`, du calendrier ni du design.
- **Contrôle GitHub Actions confirmé** : [run 43107294048](https://github.com/hameaufl/programme-sport/actions/runs/43107294048), **completed / success** — contrôle prépublication, artefact et déploiement Pages réussis.
- **Commit de mise en œuvre** : `c88b07cf660bcea3eb7a7be32f3b949651261126`. Contrôle direct de l'indexation Google non effectué (dépend d'une prochaine exploration).
- **Limite** : données et dépôt toujours publics ; `noindex` n'est pas un contrôle d'accès et ne s'applique pas directement à toutes les ressources non-HTML.

## 11 novembre 2026 — Style et périmètre de réponse du Coach

- **Demande** : réponses très concises, allant droit au but, sans longs paragraphes ; l'essentiel du détail est sur Mon Rythme.
- **Précision** : ne pas évoquer les modifications de la casquette Maturation lorsqu'elles sont étrangères au coaching.
- **Action Maturation** : consigne ajoutée dans `AGENTS.md`, `docs/ROLES.md`, `docs/DECISIONS.md` et `docs/REPRISE.md`.
- **Portée** : aucun changement de programme personnel, d'IHM ni du workflow GitHub Pages ; publication du site non déclenchée par ces seules modifications documentaires.

## 11 novembre 2026 — Lien vers l'application dans les réponses Coach

- **Demande** : le Coach peut joindre le lien direct du site dans ses réponses, afin que l'utilisateur l'ouvre depuis Android.
- **Précision** : malgré sa concision, le Coach peut fournir les détails d'une séance quand c'est demandé ou pertinent.
- **Limite** : ouverture standalone non garantie ; dépend du navigateur et d'Android.
- **Action Maturation** : mise à jour des consignes persistantes, des rôles, des décisions et de la reprise ; **aucune intervention sur l'IHM ni sur les données personnelles**.
- **Publication** : simple changement de documentation, ne déclenche pas GitHub Pages ; consignes poussées sur `main`.

## 11 novembre 2026 — Choix final du bouton Coach

- **Décision utilisateur** : retenir **l'option 2 (bouton visible)** et **l'icône 5 « Parcours »**, `route` dans la bibliothèque d'icônes.
- **Libellé** : « Ouvrir Mon Rythme » ; **cible** : https://hameaufl.github.io/programme-sport/ ; flèche externe à droite.
- **Implémentation documentaire** : règle persistante enregistrée dans `AGENTS.md`, `docs/ROLES.md`, `docs/DECISIONS.md` et `docs/REPRISE.md` pour les futurs LLM.
- **Limite technique** : vrai bouton seulement si le client conversationnel le permet ; repli sur un lien Markdown explicite. L'ouverture standalone sur Android n'est pas garantie.
- **Aucun changement d'IHM du site ni de données sportives** : commit documentaire, sans déclenchement de Pages.

## 11 novembre 2026 — Carte Coach simplifiée, nouvelle sélection

- **Demande utilisateur** : partir de la carte variante 2, remplacer l'icône Parcours de l'en-tête par la flèche `arrow-up-right`, supprimer le sous-titre et écrire **« Accéder à mes séances »** sur le bouton principal **sans icône**.
- **Action Maturation** : remplacer les consignes d'affichage des réponses dans `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, et consigner le nouveau choix dans les décisions.
- **Aucun changement de l'application GitHub Pages** ni du programme personnel. Documentation uniquement : pas de déploiement Pages attendu.

## 11 novembre 2026 — Centrage du titre de la carte Coach

- **Demande utilisateur** : centrer la flèche `arrow-up-right` et « Mon Rythme » **comme un groupe unique**, au-dessus du bouton « Accéder à mes séances ».
- **Action Maturation** : adaptation des consignes de la carte dans `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et ajout de la décision dans `docs/DECISIONS.md`.
- Aucun changement du code de l'application, des données sportives ou du workflow Pages ; commit documentaire uniquement.

## 11 novembre 2026 — Définition de « se mettre à jour »

- **Décision** : l'expression adressée à un agent LLM signifie **relire les connaissances du dépôt et les nouveaux commits de `main`**, sans écriture sur GitHub.
- **Précision** : pas de push, de journal, de modification de code ou de données et pas de déploiement lorsque cette demande est seule. Un ordre distinct peut autoriser une modification.
- **Portée** : Coach et Maturation ; les informations consultées et le résumé restent pertinents au rôle attribué.
- **Action Maturation** : une seule mise à jour documentaire pour ancrer cette règle dans `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, le registre des décisions et ce journal. Aucune modification du site.

## 11 novembre 2026 — Proposition initiale « Mon suivi santé »

- **Intervention Maturation** : création de `sante.html`, lien d'accès au bas de `index.html` et navigation retour.
- **Contenu affiché** : synthèse automatique des séances programmées, confirmées et notes ; profil santé par rubriques `##` de `PROFIL.md` ; journal par entrées datées `### AAAA-MM-JJ` de `SUIVI.md` ; derniers retours de séances.
- **Aucune donnée de santé inventée ou modifiée** : les modèles restent non renseignés ; rendu en lecture seule et sans copie pérenne du programme.
- **Workflow** : publication des deux pages et des fichiers Markdown sous leur chemin original ; tests prépublication de navigation, de syntaxe, de fichiers présents, et `noindex` des deux pages.
- **Version HTML** : `2026-11-11-suivi-sante-v6`.
- **Vérification GitHub Actions :** [run 43113273035](https://github.com/hameaufl/programme-sport/actions/runs/43113273035), `completed / success`. Contrôles prépublication, artefact et déploiement des deux pages réussis.
- **Commit de création** : `60cf51dfbef414529dd468d967d879c3963921d4`. Affichage sur Android et chargement effectif depuis le téléphone non vérifiés.


## 11 novembre 2026 — Épurer la semaine et améliorer l'affichage des sensations

- **Signalement** : le compte rendu de kiné du 4 novembre apparaît à tort dans le résumé de semaine ; sensations mal alignées à côté du libellé ; ✓ Fait trop éloigné du titre.
- **Correction Maturation** : dissocier les rendus hebdomadaire et quotidien dans `index.html` ; semaine = date, titre, éventuellement ✓ Fait ; détail = ✓ Fait à côté du titre, puis bloc vertical titre « Sensations » + paragraphe sous les étapes. Ajustements CSS et affichage mobile.
- **Coach** : ajout d'une consigne pédagogique pour reformuler le langage courant avec des termes techniques compréhensibles, en distinguant faits attestés et hypothèses ; pas de diagnostic inféré.
- **Données sportives** : aucun changement de `personnel/programme.js` ou des comptes rendus de santé. Les informations déjà écrites ne sont pas réinterprétées par Maturation.
- **Prévention** : tests statiques supplémentaires dans `scripts/verifier-site.cjs` sur la séparation des vues et la présentation des sensations ; conservation de la version HTML synchronisée avec `publication.txt`.
- **État de déploiement** : à contrôler sur le workflow GitHub Actions après commit.

## 11 novembre 2026 — Correction du contrôle prépublication (versions HTML)

- **Échec initial** : [run 43114293542](https://github.com/hameaufl/programme-sport/actions/runs/43114293542), étape `Contrôler le site et les données`, message `Versions des deux pages non synchronisées` ; aucun fichier publié pendant cet échec.
- **Cause précise** : `index.html` avait le nouveau témoin `2026-11-11-seances-sensations-v7`, tandis que `sante.html` conservait `2026-11-11-suivi-sante-v6`.
- **Correction Maturation** : synchroniser `sante.html` sur `2026-11-11-seances-sensations-v7` et ajouter une consigne de vérification des **trois versions** (`index.html`, `sante.html`, `publication.txt`) **avant** le commit, et non uniquement dans le pipeline.
- **Aucun changement des séances ni du contenu médical** ; le script de contrôle reste strict.
- **Validation finale** : [run 43114517500](https://github.com/hameaufl/programme-sport/actions/runs/43114517500), `completed / success`. Vérification du site, assemblage, envoi de l'artefact et publication GitHub Pages réussis.
- **Correctif** : commit `bc3b4619d0e000c1bd22d5e39210a870d0609873` (versions HTML alignées). Commit IHM initial `04fd78e49c1c5ae9ea529ee0bf214cdd8429a9c9`.
- **Limite restante** : rendu réel sur téléphone Android non testé par l'agent.

## 11 novembre 2026 — Ajouter le déroulé factuel au détail de séance

- **Demande** : afficher une liste de ce qui a été fait au-dessus des sensations, dans le détail du jour. Permettre au Coach de reformuler les sensations, avec termes sportifs techniques mais sans surinterprétation.
- **Conception** : section « Déroulé de la séance » en puces pour `fait:true`, basée sur `exercicesRealises` facultatif ou sur la ligne « Réalisé » déjà présente dans le journal santé du même ID ; « Programme prévu » pour les séances non confirmées. Les sensations restent séparées en paragraphe.
- **Cas existant** : séance de kiné du 4 novembre, déjà décrite dans `personnel/sante/SUIVI.md` ; **aucun texte sportif nouveau ni modification de `personnel/`**.
- **IHM** : mise à jour de `index.html` uniquement pour le rendu, conservation de la synthèse hebdomadaire, du statut à côté du titre et de l'affichage mobile.
- **Qualité** : nouveaux contrôles de séparation du prévu/réalisé, de la source santé et du type des `exercicesRealises` facultatifs. Publication des deux pages avec version commune `2026-11-11-deroule-seance-v8`.
- **Résultat du déploiement** : [run 43115608340](https://github.com/hameaufl/programme-sport/actions/runs/43115608340) terminé en `success` : validation, assemblage et publication GitHub Pages réussis. Commit IHM : `41ece7d09e0eba7c71440b4ca2cbf4752fc8179d`.
- **Vérification fonctionnelle du contenu** : le lecteur du journal extrait 4 éléments déjà rapportés pour `kine-2026-11-04`, sans écrire dans `personnel/`. Le rendu Android réel n'a pas été testé.

## 11 novembre 2026 — Libellés minimalistes dans le déroulé

- **Demande** : utiliser des puces nominales très courtes, sans verbes ni longues explications, avec une terminologie sportive adaptée et uniquement les précisions réellement reçues.
- **Décision pérenne** : consigne de concision adressée au Coach dans `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et `docs/DECISIONS.md` ; déroulé bref, sensations et précautions conservées séparément.
- **Présentation du 4 novembre** : la rubrique « Réalisé » du journal santé fournit quatre libellés compacts au rendu existant, sans changer la note de sensations, le statut « Fait » ni les autres données.
- **Technique** : aucune retouche HTML/CSS/JavaScript ; les fichiers `personnel/**` déclenchent automatiquement la publication Pages.
- **Contrôle** : [run 43116704510](https://github.com/hameaufl/programme-sport/actions/runs/43116704510), `completed / success` ; site publié après validation et déploiement.

## 12 novembre 2026 — Simplification du titre « Séance »

- **Demande** : remplacer « Déroulé de la séance » par le libellé simple **« Séance »** dans le détail d'une séance effectuée.
- **Modification Maturation** : intitulé du bloc dans `index.html` ; validation synchronisée dans `scripts/verifier-site.cjs` ; consignes opérationnelles à jour dans `AGENTS.md`, `docs/ROLES.md` et `docs/REPRISE.md`.
- Les séances à venir restent sous **« Programme prévu »** ; les exercices, sensations et données personnelles ne sont pas modifiés.
- Version commune des deux pages HTML et du témoin : `2026-11-12-seance-titre-v9`.
- Publication : [run 43117155992](https://github.com/hameaufl/programme-sport/actions/runs/43117155992), `completed / success`. Validation, artefact et déploiement Pages réussis ; commit IHM `c3c02f5f746c46634136411c2486a67259d13768`.

## 12 novembre 2026 — Simplification et première chronologie d'équipement du suivi santé

- **Demande UI** : réduire le bandeau « Mon suivi santé » de la page programme à un titre et un bouton en deux colonnes ; enlever le texte de la bannière santé ; supprimer intégralement « Mes séances suivies ».
- **Rendu** : conservation des compteurs dérivés du programme, des rubriques du profil et du journal daté. Suppression du code JS et du CSS inutilisés pour la liste d'activités.
- **Informations reçues** : nouvelles semelles orthopédiques le lundi 9 novembre et achat de chaussures de running le lundi précédent (2 novembre). Référence des baskets non encore transmise ; bilan podologique annoncé, pas de résultats disponibles.
- **Source de vérité** : événements datés dans le journal `personnel/sante/SUIVI.md`, sans duplication dans l'HTML. Aucune conclusion clinique ni tolérance inventée.
- **Vérifications** : contrôles de la navigation, absence des sections supprimées, existence du suivi daté, cohérence des deux versions HTML, JavaScript et balises `noindex`.
- **Validation et publication réussies** : [run 43118346281](https://github.com/hameaufl/programme-sport/actions/runs/43118346281), `completed / success` ; contrôles, préparation et déploiement GitHub Pages validés. Correction de syntaxe du validateur intégrée dans `cb2a58165767ad820f28975f01b8563920ddba27` ; changement principal dans `662e8381aa82e890d9fd96f5b5893693160b6d70`.

## 12 novembre 2026 — Structures anatomiques et sensations télégraphiques

- **Demande IHM** : ajouter « Structures sollicitées » entre « Séance » et « Sensations », en liste par région ou chaîne musculaire, avec vocabulaire technique précis et lisible ; ne pas mêler l'anatomie aux exercices.
- **Demande Coach** : résumer les ressentis en segments nominaux très brefs, presque sans verbes, sans paraphrase narrative. Distinguer effort rapporté, sollicitation probable et diagnostic.
- **Implémentation Maturation** : section dédiée seulement sur les séances réalisées. Sources facultatives `structuresSollicitees` de `personnel/programme.js` ou `**Structures sollicitées :**` dans le journal de même ID ; aucune dérivation anatomique automatique, état « À préciser par le Coach » si absent.
- **Consignes et tests** : `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, `docs/DECISIONS.md` et `scripts/verifier-site.cjs`. Aucun changement des fichiers `personnel/`.
- **Version des deux pages et témoin** : `2026-11-12-structures-sollicitees-v11`. [Run 43120640790](https://github.com/hameaufl/programme-sport/actions/runs/43120640790) **`completed / success`** : validation, artefact et publication GitHub Pages réussis. Commit de fonctionnalité `43cfd0e397cfda5922c0b614efcc1a15d5435285`, correctif du test `e29dbd9941572e93a6ae43b5895eff406a012aa9`.

## 12 novembre 2026 — Rectifier les réserves inutiles des structures sollicitées

- **Constat** : commit Coach `3fd064e3f5f777aa2f87533f99bdad02f1c86b76` ; les deux puces de la séance de kinésithérapie du 4 novembre comprenaient des parenthèses « sollicitation probable... ».
- **Demande** : le Coach fournit **son analyse anatomique directement**, sous forme de puces nettes, sans répétition d'avertissements de non-validation clinique ; l'utilisateur n'a pas à transmettre les termes musculaires.
- **Correction Maturation** : règle prioritaire dans `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et décisions ; l'interface filtre **uniquement les réserves méthodologiques parenthétiques** connues, sans masquer les précisions anatomiques utiles.
- **Maintien des périmètres** : aucune modification de `personnel/`. La correction durable à la source appartient au Coach lors de sa prochaine intervention sur le programme.
- **Qualité** : tests sur les deux puces concernées et sur une parenthèse anatomique utile ; versions des deux pages HTML et du témoin synchronisées (`2026-11-12-structures-sans-reserves-v12`).
- **Publication validée** : [run 43121853734](https://github.com/hameaufl/programme-sport/actions/runs/43121853734), `completed / success` ; tests, artefact et déploiement GitHub Pages réussis. Commit IHM et consignes : `36c78d4a8cac277521dd6b22493cef75086c6c6e`.

## 12 novembre 2026 — Migration de capacité, sans transformation des données du Coach

- Audit validé : fichier monolithique, journal linéaire et téléchargements globaux inadaptés à plusieurs milliers d'entrées.
- **Migration lossless** : 18 objets séance copiés **champ pour champ** dans leurs fichiers ; objectifs et début du cycle conservés ; notes d'introduction isolées ; comptes rendus et événements découpés en blocs de texte **identiques** à ceux du journal précédent.
- Les sources restent individuelles et GitHub garde l'historique ; les semaines JSON et le journal paginé ne sont que des **résultats de build**, absents du dépôt.
- Calendrier hebdomadaire inchangé. Lecture réseau à la demande par semaine, jusqu'à huit semaines en mémoire. Page santé : compteurs déjà calculés et événements paginés par 30.
- Tests de date, identifiants, intégrité et correspondance rapports/séances ; test artificiel à 5 000 entrées. Le Coach modifie les fichiers ciblés.
- **Contrôle de migration et déploiement** : [run 43125039245](https://github.com/hameaufl/programme-sport/actions/runs/43125039245), `completed / success` : 18 séances, 7 semaines, 1 rapport, 2 événements et test synthétique de 5 000 séances. Migration commit `61eb40ca3910754604f20bc42c0d6b634277b398`. **Audit indépendant après commit** : les 18 objets JSON correspondent exactement aux originaux, la configuration et les commentaires sont identiques et le journal d'origine est entièrement reconstituable octet pour octet.

## 12 novembre 2026 — Finalisation : compatibilité des anciennes pages et consignes opérationnelles

- Pour éviter une rupture lors du chargement d'un ancien HTML PWA/Android conservé en cache, le build prépare un `programme.js` et un `SUIVI.md` **agrégés uniquement dans `_site/`**. Aucun fichier source monolithique supplémentaire dans Git ; les nouvelles pages utilisent toujours les vues JSON hebdomadaires.
- Remplacement des références obsolètes à `personnel/programme.js` dans les documentations opérationnelles, sans changer les données de séances ou le contenu des rapports.
- **Premier essai de compatibilité** : run [43125822813](https://github.com/hameaufl/programme-sport/actions/runs/43125822813), échec du build (`ReferenceError` sur l'index non initialisé). Aucun déploiement produit ; correction : itérer les clés de `model.weeks` sans dépendre de l'index encore non créé.
- **Correction supplémentaire de déclenchement** : les évolutions du générateur `scripts/construire-site.cjs` ne déclenchaient pas le workflow (seul `scripts/verifier-site.cjs` figurait dans le filtre). Le filtre inclut désormais `scripts/**` pour valider **toute** modification de génération, de données ou de tests.
- **Compatibilité et scripts déployés** : [run 43126109156](https://github.com/hameaufl/programme-sport/actions/runs/43126109156), `completed / success` après correction du générateur et extension du déclenchement CI à `scripts/**`.

## 12 novembre 2026 — Renforcer le garde-fou contre l'écrasement des champs

- **Intégrité post-migration** : en plus des identifiants stables et de l'interdiction de suppressions de fichiers, la CI compare chaque séance modifiée à sa version précédente : **propriétés supprimées ou dates modifiées interdites par défaut**.
- Un accord utilisateur explicite, matérialisé dans le message de commit par `[suppression-champ-validée]` ou `[date-validée]`, est indispensable pour ces opérations intentionnelles. Une modification ordinaire des sensations ou structures conserve les autres champs.
- **Validation finale** : [run 43126434526](https://github.com/hameaufl/programme-sport/actions/runs/43126434526), `completed / success` : tests, construction et GitHub Pages. Les **24 fichiers de données individuelles/configuration et journal** conservent exactement les mêmes SHA Git que juste après la migration (18 séances, 1 rapport, 2 événements, configuration et notes) ; aucune altération des données du Coach. Aucun changement de navigation. La vitesse sur appareil Android n'a pas été mesurée physiquement.

## 12 novembre 2026 — FIT Workout du programme de course du 11 novembre

- **Source** : séance `course-2026-11-11`, 17 minutes prévues sous forme de trois fractions marche 2 min + course 3 min, marche finale 2 min. Contenu sportif existant conservé ; ajout d'une seule référence de pièce jointe.
- **Travail Maturation** : générateur `scripts/generer-garmin.cjs`, premier vrai fichier FIT binaire sous `personnel/pieces-jointes/seances/course-2026-11-11/prevu/`, validations FIT et intégrité dans `scripts/verifier-site.cjs`, lien de téléchargement du détail de séance.
- **Coach** : consignes permanentes de génération automatique pour les modèles reconnus ; aucun FIT approximatif, aucun FIT Activity fictif, aucune cible d'allure ou de FC inventée.
- **Limite** : conformité binaire testée, **acceptation par Garmin Venu 4 non démontrée** ; transfert à confirmer sans MCP Garmin.
- **Déploiement confirmé** : [run 43130205690](https://github.com/hameaufl/programme-sport/actions/runs/43130205690), `completed / success` (tests, build, artefact et publication GitHub Pages). Commit principal : `09abd968dd452b607a70be711d9cab4862dabf54`.
- **Contrôle indépendant** : le blob FIT publié correspond au fichier de 395 octets, SHA Git `83c34a15985b80227b789f4e4b8d7c305cc0c217` ; CRC de l'en-tête et du fichier confirmé par un second algorithme bit-à-bit. Les 7 étapes totalisent 1 020 secondes. **Acceptation dans Garmin Connect ou sur la Venu 4 non testée**.

## 12 novembre 2026 — Alléger l'accès Garmin et fiabiliser les consignes Coach

- **IHM** : supprimer exclusivement la légende « Fichier d'entraînement prévu · transfert vers Venu 4 à tester » et son style dédié. Le lien « Télécharger l'entraînement Garmin (.FIT) » demeure à l'identique dans le détail de séance.
- **Coach** : règle prioritaire de génération FIT spontanée lors de la présentation/création/modification d'un programme course/marche pris en charge, rattachement au JSON individuel, commit et validation ; aucune conversion approximative.
- **Consignes** : `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, `personnel/GARMIN.md` ; les précautions de transfert restent documentées mais non affichées.
- **Contrôle** : test de non-régression de l'interface, préservation du lien FIT et des 7 étapes d'exemple dans `scripts/verifier-site.cjs`. Versions `index.html`, `sante.html` et `publication.txt` synchronisées sous `2026-11-12-garmin-lien-simple-v15`.
- **Données du Coach et FIT binaire existants** : aucun changement.
- **Déploiement confirmé** : [run 43131100817](https://github.com/hameaufl/programme-sport/actions/runs/43131100817), `completed / success` : validations, construction et publication GitHub Pages réussies. Commit interface et consignes : `e84bab2306a82e443c67515e8cd3e7a660b3e7a3`.
- **Vérification d'intégrité indépendante** : les 25 fichiers source des séances, rapports, événements, configuration et pièces jointes conservent exactement les mêmes SHA Git qu'avant cette modification. Lien FIT conservé, sous-texte absent.

## 12 novembre 2026 — Contrat de mémoire métier permanente pour les Coachs

- **Demande initiale** : toutes les informations métier fournies au Coach doivent être poussées sur GitHub afin de pouvoir changer de LLM sans perte de contexte. **Précision du propriétaire** : cela couvre **tous les paramètres de personnalisation**, pas seulement le sport, la santé ou les séances, et doit préserver le **même niveau de nuance**.
- **Actions Maturation** : publication d'un [contrat de continuité](CONTRAT-CONTINUITE-COACH.md), règle prioritaire en tête de `AGENTS.md`, renforcement des rôles et de la procédure de reprise, actualisation du contexte technique devenu obsolète et ajout d'un lien documentaire dans le README.
- **Procédure Coach** : nouvelle connaissance transversale → source personnelle adaptée dans `personnel/` (création de `CONTEXTE-COACH.md` par le Coach si nécessaire) ; provenance, date, nuance, décision/raison, vérification GitHub et lecture par le successeur.
- **Périmètre** : aucun contenu personnel reformulé ou ajouté, aucun fichier `personnel/` changé ; règles, pas de transfert rétroactif fictif depuis des conversations inaccessibles.
- **Contrôle** : vérifier que le commit et les instructions sont lisibles sur `main`. Modification documentaire uniquement ; aucune republication Pages requise.

## 12 novembre 2026 — Séparateur des activités quotidiennes

- **Correction Maturation** : remplacement du libellé figé « Course + kiné » par une construction à partir de chaque séance du jour, avec une majuscule par activité et un séparateur **« , »**.
- **Exemples contrôlés** : « Course », « Course, Kiné », « Course, Kiné, Mobilité » et « Course, Course » ; « — » pour un jour sans séance.
- **Périmètre** : `index.html`, tests `scripts/verifier-site.cjs` et documentation de la présentation, sans modification des données du Coach ni de la navigation.
- **Versions** : `2026-11-12-libelles-jour-virgule-v16` dans les deux pages et le témoin.
- **Publication réussie** : [run 43135765836](https://github.com/hameaufl/programme-sport/actions/runs/43135765836), `completed / success` : validation, génération et déploiement GitHub Pages confirmés. Commit IHM : `9cb1be29666b4125f33272e7c49699f96dac9a3d`.

## Journal futur

Préciser : demande, fichiers/commit, contrôles, déploiement effectif, limites. Ne pas recopier les comptes rendus sportifs : ils appartiennent au Coach.

## 12 novembre 2026 — Animations d'exercice et libellé « Course à pied »

- À la demande de l'utilisateur, intégrer des liens `?` discrets sur chaque exercice des séances Renfo, pointant vers des **fichiers GIF autonomes** servis par Pages, dans le même onglet pour permettre un retour navigateur immédiat. Aucune modale ni visionneuse supplémentaire.
- Corriger le libellé quotidien des séances de course **sans champ `type`** : afficher « Course à pied » à partir de l'identifiant ou du titre existants, sans modifier les données personnelles. Préserver « Kiné », ajouter « Renfo » et conserver les activités multiples séparées par une virgule.
- Cinq GIFs schématiques légers générés à partir des mêmes gestes que les animations pédagogiques présentées au propriétaire (pont de bassin au sol, ouverture de genou, mouvement opposé sur le dos, à quatre pattes, pont avec ballon). Les sources originales présentées en conversation ne sont pas déposées telles quelles ; variantes schématiques optimisées pour une publication légère.
- Étendre le build pour copier `assets/renfo/` et la CI pour contrôler les liens, les fichiers GIF et les intitulés du calendrier. Ne pas changer la navigation entre les semaines, la page santé, l'accès Garmin ni les statuts sportifs.

## 12 novembre 2026 — PNG originaux et dialogue d'aide Renfo

- Demande utilisateur : réutiliser à l'identique les cinq schémas PNG approuvés ; les GIF ne s'affichent pas (carré gris) et sont retirés des liens et de l'artefact Pages. Aucun redessin des PNG.
- `index.html` : bouton d'aide `?` réduit à 16 px, placé sur la ligne de l'exercice avec espace insécable, ouvrant un `<dialog>` responsive illustré par le PNG, fermeture `×`, Échap ou fond ; pas de navigation externe.
- `assets/renfo/banque.json` : cinq gestes et leurs PNG sources ; `scripts/construire-site.cjs` publie uniquement la banque d'images PNG, pas les GIF historiques. `scripts/verifier-site.cjs` contrôle chaque liaison Renfo/PNG, la signature PNG, les 12 séances et la fenêtre.
- La navigation hebdomadaire, les intitulés Course à pied/Kiné, les liens Garmin et le suivi santé ne sont pas modifiés, en dehors du marqueur de version synchronisé dans les deux pages et le témoin.

## 12 novembre 2026 — Le Renfo affiche uniquement les puces chronométrées

- **Maturation ponctuelle à la demande de l'utilisateur** : masquer les paragraphes Objectif et Détails sous la liste `etapes` des **seules séances Renfo**, pour éviter la verbosité et la duplication des consignes. Les autres types de séances restent inchangés.
- **Règle permanente** : formats et responsabilités détaillés dans `AGENTS.md` et `docs/ROLES.md` ; chaque puce affiche son volume et son chrono. Les trois gestes gardent obligatoirement leurs aides PNG ; la mise en route et le retour au calme n'en nécessitent pas.
- **Tests** : 15 Renfos répartis en cinq semaines à trois séances, dont 12/14/15 novembre ; cinq étapes séquentielles avec temps et trois PNG par session.

## 12 novembre 2026 — Générateur FIT étendu au Renfo

- Demande de l'utilisateur : fichier Garmin FIT Workout pour **chaque Renfo**, à l'instar des courses. Aucun changement d'interface : le lien existant détecte `pieces_jointes` quel que soit le type de séance.
- `scripts/generer-garmin.cjs` accepte désormais `renfo-AAAA-MM-JJ`, encode le sport `strength_training` (5), les étapes chronométrées et les séries ouvertes avec notes. Le parseur refuse les gestes inconnus ou consignes de temps non vérifiables ; la génération course reste inchangée.
- Tests `scripts/verifier-site.cjs` : contrôle du FIT de chacune des 14 séances restantes, des 17 pas, du sport musculation, de 9 étapes manuelles et des 780 s d'échauffement/pauses/retour au calme, plus cas de rejet d'un exercice inconnu.
- Les 14 binaires sont stockés dans `personnel/pieces-jointes/seances/<id>/prevu/<id>.fit` ; fichiers PNG et affichage de la page inchangés. Import physique Garmin Connect/Venu 4 non prouvé.

## 12 novembre 2026 — Suppression du résumé fixe sous « Séances de la semaine »

- Demande : ne plus afficher la phrase « Course et kiné programmées pour la semaine sélectionnée. » ; elle peut devenir obsolète, tandis que la liste ci-dessous donne l’information à jour.
- Maturation : retirer seulement ce paragraphe dans `index.html`, conserver le titre, la liste alimentée par les séances et la navigation hebdomadaire. Aucune modification des fichiers `personnel/`.
- Ajouter un contrôle de non-régression dans `scripts/verifier-site.cjs` et documenter la règle dans `AGENTS.md`.
- Synchroniser les versions des deux pages et de `publication.txt` : `2026-11-12-liste-seances-sans-resume-v19`.
- Publication : vérification après GitHub Actions.

## 12 novembre 2026 — Étirements post-effort dans la source et dans les FIT

- Le propriétaire demande un bloc final d'étirements doux de récupération sur chaque Course/Renfo programmée, présent **à la fois dans le JSON affiché et dans le FIT Workout correspondant**, sans modifier les séances réellement faites.
- Le générateur Garmin et les tests reconnaissent cette étape de 180 s sur les deux types de séances. La course réalisée du 11 novembre est laissée telle quelle ; les 18 autres courses et 14 Renfos reçoivent cette dernière étape et sont ré-exportés en FIT. La même source sert au web et à la montre ; pas de texte spécifique ajouté au HTML.
- Pour le Renfo, le bloc général est une étape de récupération, à l'instar de la mise en route/du retour au calme, et n'est pas un exercice technique individuel : les aides PNG déjà approuvées restent celles des trois mouvements prescrits. Aucune autre image changée.
- Les 32 FIT sont validés à la CI (CRC, durées, noms et nombres d'étapes) et la publication Pages répercutera les changements de descriptif. La compatibilité réelle d'import Garmin reste distincte et non démontrée.

## 12 novembre 2026 — Étirements seuls pour la récupération finale du Renfo

- Nouvelle préférence explicite du propriétaire, prioritaire sur les anciennes prescriptions : lorsqu'un Renfo prévu contient un bloc d'étirements doux, ces étirements font office de retour au calme. Ne pas ajouter 4 min de mouvements doux/respiration après les exercices. Conserver la mise en route de 4 min au début.
- Application aux 14 Renfos non réalisés : mêmes dates, IDs, exercices, séries, pauses, aides PNG, étirements, fait et sensations ; suppression du seul bloc redondant « Retour au calme ». Durée indicative 33–39 → 29–35 min, FIT Workout prévu 18 → 17 pas ; temps minuté 960 → 720 s. Aucune modification des sorties Course, des séances Kiné ou des activités déjà réalisées.
- Pour les Renfos futurs : cinq étapes chronologiques, FIT synchronisé avec le JSON et vérification de l'absence de retour au calme supplémentaire. Aucune preuve d'exécution sportive créée.
- Intervention Maturation : parseur FIT, tests de non-régression et binaires FIT actualisés ; déploiement via Actions à vérifier.

## 12 novembre 2026 — Refonte complète en domaines et add-ons, après accord explicite du propriétaire

- Découpage par phases : inventaire et frontières, séparation canonique Planification/Activités/Santé/Coaching, adaptateur Garmin et Web indépendant, puis contrôles de portabilité et confidentialité.
- Les 36 séances ont été converties en plans à blocs typés, activités effectivement réalisées et observations de santé distinctes. Les comptes rendus et archives Coach ont été déplacés sans changement factuel. Les 33 FIT ont été déplacés avec leur SHA d'origine ; l'interface n'en détient aucun.
- L'extension Web a ses propres sources et ressources sous `addons/web/`, ne reçoit que des champs autorisés via une projection. Tests : parité historique complète, CI de build standard et de publication restreinte, absence de dépendance du cœur envers le Web.
- La politique de publication historique reste publique; la variante restreinte prépare un transfert futur vers un autre support et **n'efface pas les copies déjà publiques**. La publication de cette refonte sur `main` ne doit intervenir qu'après CI verte.

## 12 novembre 2026 — Mon Rythme sans fichiers d'entraînement ; Garmin Connect par MCP

- **Choix explicitement validé** : supprimer tous les 33 fichiers FIT d'entraînements prévus du dépôt courant, retirer le générateur local et tous les téléchargements/mentions Garmin du site Web. Le Web continue d'afficher les 36 programmes, leurs informations, les états et les PNG.
- **Architecture** : adaptation séparée `adaptateurs/garmin/mcp.cjs`, sans effet de bord ; la source reste les blocs structurés de Planification V2. La création dans Garmin Connect et l'affectation de dates sont opérées par le Coach via le MCP personnalisé, jamais par le Web ou une CI.
- **Modèles réutilisables** : même entraînement pour plusieurs dates du calendrier ; premier contrôle des modèles existants obligatoire. Nommage non encore fixé ; réutiliser les prescriptions identiques et ne pas créer un modèle par date.
- **Bêta** : aucune création ni programmation Garmin avant demande explicite sur une ou plusieurs dates nommées par le propriétaire. Ne pas anticiper plusieurs semaines ; aucun envoi automatique à la montre. Premier essai complet Venu 4 restant à confirmer.
- **Contrôles** : vérifier l'absence de fichiers externes et de références dans toute sortie Web, y compris publication standard/restrictive. Les programmes effectués, ressentis et rapports existants sont préservés ; les anciens binaires restent techniquement dans l'historique Git.

## 12 novembre 2026 — Nouvelle préférence Garmin : gestes officiels, pédagogie, animation et suivi du matériel

- **Décision utilisateur applicable aux futurs exercices et révisions de Renfo :** le Coach sélectionne **autonomement** ses mouvements exclusivement dans le **catalogue officiel des exercices Garmin**. Il vérifie catégorie, identité du geste, éventuelle fiche/description, besoin de matériel et pertinence pour le programme. Il ne crée aucun mouvement inédit, ne rebaptise pas un mouvement voisin et ne suppose jamais un exercice « reconnu » sans vérification ; le Coach garde la responsabilité du choix des exercices ainsi que du volume, des séries et des répétitions adaptés.
- **Préférence pédagogique forte :** exercices documentés et, idéalement, animés sur la Venu 4. **Limite vérifiée du constructeur :** Garmin ne fournit les animations sur montre que pour certains entraînements **prédéfinis**, et **pas pour les séances personnalisées** créées dans Garmin Connect/MCP, même avec des exercices classifiés. Le Coach doit expliciter cette différence et privilégier un vrai entraînement prédéfini animé si l'animation est impérative, sans le substituer automatiquement au plan personnalisé ; choix d'arbitrage restant ouvert.
- **Nouvelle source de vérité de l'équipement :** `domaines/coaching/donnees/equipements.json`, modélisée et validée indépendamment des prescriptions. Déclarés disponibles : tapis de sol et gros ballon de gymnastique (~80 cm). Déclarés absents : élastiques de résistance et haltères. Aucun autre accessoire n'est confirmé. Le poids du corps est privilégié. Les envies d'achat ne prouvent pas la disponibilité ; seul un retour explicite du propriétaire actualise l'inventaire.
- **Portée :** ne modifier aucune séance déjà écrite ou réalisée du seul fait de cette nouvelle préférence. Aucun envoi ni création Garmin n'est autorisé par cette décision : la règle de bêta imposant des dates explicitement demandées demeure. Les anciens choix de dessins PNG concernent la présentation Web et ne confèrent pas un statut officiel Garmin aux anciens mouvements.
- **Références fabricant :** https://support.garmin.com/en-US/?faq=IPD6X8JSLBAUQOXvz7zBO6 ; documentation Venu 4 https://www8.garmin.com/manuals/webhelp/GUID-2CF5620C-E585-4E0A-9CC3-9565533EEE4D/EN-US/GUID-B7EDF898-AC46-4504-A12A-A1FFA1756878.html.

