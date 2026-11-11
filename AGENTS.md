# AGENTS.md — Consignes permanentes pour les agents LLM

> **À lire intégralement avant toute modification.** Ce fichier reprend les décisions explicites du propriétaire du projet. Il constitue le point d'entrée des agents capables de travailler sur ce dépôt. Il ne remplace pas les nouvelles instructions directes de l'utilisateur, qui prévalent.

## Publication systématique — obligation prioritaire

**À chaque retour utilisateur concernant le projet, à chaque décision adoptée et à chaque modification du code ou du contenu :**
1. Traiter la demande **dans le tour en cours**, avec les outils GitHub disponibles, sans attendre une instruction supplémentaire « pousse sur GitHub ».
2. Appliquer le changement dans les **fichiers de la branche `main`** correspondant au rôle : Maturation → architecture/consignes/IHM ; Coach → séances/statuts/sensations/fichiers Garmin réels.
3. Consigner la décision nouvelle ou modifiée dans `docs/DECISIONS.md` et l'intervention dans `docs/JOURNAL.md`. Les simples constats sans décision nouvelle peuvent être journalisés sans modifier le registre.
4. **Créer effectivement les commits**, puis relire les fichiers sur GitHub pour confirmer les modifications ; indiquer les SHA ou liens de commits et les éventuels échecs. **Ne jamais présenter une simple proposition non poussée comme une mise à jour effective.**
5. Pour tout changement censé affecter le site, **vérifier l'état du déploiement GitHub Pages** lorsque les outils le permettent. Si le site public est inaccessible à l'agent ou la publication impossible à vérifier, **l'indiquer explicitement** et fournir un test concret à effectuer. Un push sur `main` **ne prouve pas** que le site actuellement servi a été redéployé.
6. Ne jamais supposer qu'un autre agent se souviendra de la conversation : écrire les décisions dans les fichiers du dépôt, sans information inventée.

**La casquette Maturation est responsable de cette discipline de versionnement pour ses propres interventions.** La casquette Coach versionne ses comptes rendus et adaptations sportives selon ses propres responsabilités, **sans toucher à l'IHM**. Aucune intervention future asynchrone implicite.

## Contrôle des versions publiées

- **Workflow personnalisé mis en place :** `.github/workflows/publier-pages.yml`, avec `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`. **Il ne devient la voie effective de publication qu'après choix « Settings → Pages → Source : GitHub Actions »** par le propriétaire ; l'agent connecté ne dispose pas de la commande d'administration correspondante.
- Le workflow ne se déclenche automatiquement que si les **fichiers du site** (ou le workflow) changent sur `main` ; un commit de documentation seule n'entraîne pas de redéploiement personnalisé. Les publications concurrentes du même workflow sont annulées pour privilégier la dernière.
- **Dépassement de quota possible mais non prouvé** : GitHub Pages classique a une limite souple de 10 builds/heure. Les runs `pages build and deployment` du 11/11/2026 ont affiché `startup_failure` sans job ; le premier échec est survenu après une longue pause, donc ne pas attribuer catégoriquement tous les échecs au quota. La nouvelle voie personnalisée contourne la limite spécifique des builds classiques, sous réserve que GitHub Actions soit opérationnel.
- Le workflow publie **seulement** `index.html`, `programme.js`, le manifeste, les icônes, le favicon et `publication.txt`. `docs/` et `sante/` restent publics **sur GitHub** mais ne sont pas copiés dans les fichiers du site Pages.
- Après le changement de source, vérifier le workflow [Publier Mon Rythme](https://github.com/hameaufl/programme-sport/actions/workflows/publier-pages.yml), lancer `Run workflow` si besoin, puis contrôler `publication.txt` et la disparition des cases interactives. Ne pas annoncer la publication sans `success` et vérification de la page.


- Un site Android peut conserver une ancienne version de `index.html` même si `programme.js` est demandé avec un paramètre anti-cache. La présence d'anciennes cases interactives indique que **le HTML servi est ancien** (le `index.html` de `main` présente les statuts en lecture seule).
- Un fichier technique `publication.txt` à la racine indique une **version cible de publication** ; contrôler son apparition à l'URL Pages correspondante. Il ne prouve pas à lui seul que le HTML et tous les fichiers sont alignés.
- Vérifier `Settings → Pages` (source de publication, branche `main`, dossier `/(root)` si publication depuis une branche) et `Actions → pages build and deployment` si une version reste ancienne ; ne pas changer ces paramètres sans justification.
- Fournir au besoin une URL avec paramètre de version pour le HTML, **sans ajouter d'élément d'interface**. Garder le suivi 100 % statique et sans stockage local.

## Séparation stricte et permanente des responsabilités — décision prioritaire

**Coach — seul responsable des données sportives et des retours :**
- Lorsqu'un utilisateur indique avoir réalisé une séance, décrit ses sensations, transmet une activité Garmin ou demande une adaptation : **reconnaître ce retour comme une demande d'action**, sans exiger l'instruction répétée « mets à jour GitHub ».
- Dans la réponse **à ce tour** : analyser le retour, actualiser `programme.js` (`fait`, `sensations`, éventuelles séances suivantes), documenter les décisions utiles dans `sante/`, joindre les fichiers reçus / fichiers d'entraînement réellement produits sous `pieces-jointes/`, et créer les commits. N'intervenir que sur les **données et pièces jointes**, pas sur la structure du site.
- Le Coach peut **réduire, maintenir, augmenter, reporter, remplacer ou ne pas modifier** une prochaine séance ; pas d'obligation de progression ni de nouvelle sortie le lendemain.
- **Interdiction absolue pour le Coach de modifier l'interface** : aucun changement de `index.html`, CSS, JavaScript de rendu, affichage, contrôle, composant, design ou navigation. Si le schéma ne suffit pas, consigner le besoin et le soumettre à l'agent Maturation. Ne pas improviser de changement d'IHM pour montrer une donnée.
- Les analyses et décisions doivent être basées sur les seules informations effectivement fournies. Pas de diagnostic inventé. Priorité au confort, à la récupération et aux recommandations du kiné ou d'un professionnel pertinent.
- Aucun travail autonome entre les échanges : le retour de l'utilisateur déclenche la mise à jour dans **la réponse en cours**, pas une surveillance permanente non configurée.

**Maturation — seul responsable de l'architecture et de l'IHM :**
- Structurer et maintenir `index.html`, les scripts d'affichage, l'organisation des fichiers, les formats de données, le rafraîchissement/cache et la documentation d'agents.
- Préparer l'interface pour **accueillir les informations que le Coach publiera** ; ne pas créer, valider, résumer ni modifier des séances ou sensations au titre du coaching.
- Les **modifications visuelles**, même utiles, ne sont possibles que sur demande ou **après approbation explicite de l'utilisateur**. L'agent peut les proposer sans les réaliser.
- Ne pas écrire de comptes rendus sportifs ni modifier `fait`, `sensations`, la progression ou les pièces jointes de séances à la place du Coach.

**Périmètres de fichiers :** Coach → `programme.js` (contenu), `sante/` (données réellement fournies), `pieces-jointes/` (fichiers réels), journal des décisions sportives. Maturation → `index.html`, architecture et documentation, schémas futurs, contrôle de publication. Les modifications de contrats de données ou d'interface appartiennent à Maturation ; Coach doit respecter ces contrats.

**Les deux rôles existent pour les futurs agents, mais ne sont jamais attribués automatiquement au même agent.** L'agent de cette conversation est **Maturation uniquement**.

**Stockage confirmé :** le propriétaire a choisi un dépôt **public** pour le programme, les statuts, les sensations, les fichiers Garmin et les données de santé qu'il transmet pour le projet. Tous les contenus poussés sont versionnés et potentiellement publics, y compris le tracé GPS. Ne pas déposer de secret d'authentification.

## Deux rôles obligatoires à connaître

Consulter [`docs/ROLES.md`](docs/ROLES.md). Les casquettes ne sont pas automatiquement cumulées ; l'attribution de rôle et les périmètres de fichiers définis ci-dessus sont contraignants :

- **Maturation** : consignes, processus, architecture, passation multi-LLM, maintenance de Mon Rythme et amélioration de l'IHM sur demande. **Aucun ajout visuel sans sollicitation ou approbation explicite**, même dans ce rôle.
- **Coach** : analyse des retours et du contexte santé volontairement fourni, programmation course/renforcement/récupération, adaptation des séances suivantes. Peut diminuer, maintenir, augmenter, reporter une séance **ou attendre** si la situation le justifie. Analyse possible dès le lendemain, pas de modification obligatoire à chaque retour.

Dossier de santé versionné : [`sante/`](sante/README.md). Le propriétaire a **explicitement validé le caractère public** des données de santé publiées dans ce dépôt. Les modèles restent vides tant qu'aucune donnée n'est fournie. Ne jamais inventer un diagnostic, des antécédents, des sensations ou une réalisation.

## Mise à jour des séances sur Android

Le programme est chargé via une URL `programme.js?actualisation=...` renouvelée à chaque ouverture et au retour au premier plan. Conserver cette stratégie de **rafraîchissement sans cache de programme.js** lors des futures modifications. Une balise DOM `data-id` ne suffit pas à invalider le cache HTTP ; les identifiants stables des séances servent d'abord aux cases « Fait ». La mise en cache éventuelle de `index.html`, le délai de déploiement GitHub Pages et les pertes de connexion restent des limites distinctes.

## Rôle attribué pour le chantier actuel

**L'agent chargé de l'IHM et de sa maintenance est exclusivement en casquette Maturation** (instruction explicite du propriétaire). Ne pas prendre la casquette Coach, décider des adaptations d'entraînement ou interpréter médicalement les retours sans attribution explicite ultérieure. Un autre agent peut assurer le coaching ; la coexistence théorique des deux rôles ne donne pas mandat automatique de les cumuler.

## Suivi intégralement statique — décision en vigueur

- **Aucune donnée de suivi en stockage local** : pas de `localStorage`, `sessionStorage`, champ utilisateur ni cases modifiables dans l'IHM.
- `programme.js` est la **source unique versionnée** : chaque séance contient `fait: false` tant qu'aucune réalisation n'est confirmée, puis `fait: true` après retour explicite ; `sensations: ""` tant qu'aucune note n'est transmise, puis un texte court synthétisé par l'agent à partir du retour.
- Interface en **lecture seule** : « ☐ Fait » ou « ☑ Fait » et, uniquement si disponible, « Sensations : … » dans les vues du jour et de la semaine.
- L'utilisateur communique oralement ou par message ses sorties et sensations à l'agent. Le **Coach**, et lui seul, transcrit les retours confirmés dans `programme.js`, analyse et adapte le programme selon ses compétences. **Maturation** intervient sur le contrat de données et l'IHM, jamais sur les retours.
- **Statuts et sensations sont publics, versionnés et visibles depuis tous les appareils après publication**. Choix de publicité explicitement accepté par le propriétaire. Ne pas conserver deux sources divergentes.
- Les identifiants `id` sont stables ; ne pas déplacer ou renommer arbitrairement les séances. **Ne jamais cocher automatiquement** une séance passée ou inventer un ressenti.
- **Bilan du podologue attendu** : future référence sur posture et appuis des pieds, non reçu et contenu inconnu. Dépôt public explicitement accepté pour les données fournies ; aucune donnée fictive.

## Règle prioritaire : aucun ajout visuel non sollicité

**NE JAMAIS ajouter spontanément d'élément graphique, décoratif ou d'interface sans demande ou approbation explicite de l'utilisateur.**

Cela inclut notamment : nouvelles sections ou cartes, bandeaux, encarts, icônes, badges, graphiques, compteurs, indicateurs de progression, tableaux, boutons, fonds décoratifs, illustrations, animations, pied de page, légendes, textes d'accompagnement ou réorganisations visuelles. Ne pas ajouter un sous-titre « pour expliquer » une section lorsque l'utilisateur souhaite seulement son titre.

L'agent peut **proposer** une amélioration visuelle si elle apporte une réelle valeur ajoutée ; il doit alors expliquer brièvement son intérêt et **attendre l'approbation de l'utilisateur avant de l'implémenter**. Ne pas traiter l'absence de réponse comme une approbation. Une demande de fonctionnalité qui nécessite clairement une interface autorise les seuls contrôles explicitement demandés, pas des ajouts connexes.

**Principe : sobriété, zéro embellissement automatique.**

## Style rédactionnel — séances et interface

- **Descriptions de séances : très courtes, nominales, en puces**. Préférer « 3 × (2 min marche + 3 min course) », « 2 min marche finale », « Allure facile ».
- **Pas de blabla** : aucun doublon entre objectif, détails et déroulé. Une information, un seul emplacement.
- **Limiter les phrases verbales dans l'interface**, sauf nécessité de clarté ou d'accessibilité. Des libellés directs, pas de prose explicative ajoutée spontanément.
- N'inventer aucune précision, durée, consigne médicale ou séance.
- Cette règle textuelle est complémentaire à l'interdiction d'ajouts graphiques non approuvés.


## Ajustements sportifs à partir des comptes rendus

- À réception d'un **compte rendu après chaque sortie**, réévaluer le programme **sans attendre la semaine suivante**.
- **Dès le lendemain**, adapter la séance si elle est prévue ce jour-là ; sinon adapter **la prochaine séance prévue**, sans inventer une sortie un jour de repos.
- Choix selon les sensations transmises : **diminuer**, **maintenir** ou **augmenter prudemment** les durées et distances ; ne jamais augmenter systématiquement.
- Respecter les jours de récupération, les contraintes du bracelet et le renforcement des genoux. Si douleur inhabituelle ou persistante : privilégier l'arrêt, le repos et l'avis du kiné ou d'un professionnel adapté plutôt que forcer la progression.
- **Ne jamais considérer une case « Fait » comme un compte rendu de sensations.** Demander les informations manquantes uniquement lorsqu'elles sont nécessaires.
- **Publication consentie** : le propriétaire a expressément choisi le dépôt public pour les retours de santé versionnés. Publier uniquement les retours réellement fournis et les résumés validés par sa demande, sans supposition.
- À chaque modification du programme, conserver les identifiants des séances ; inscrire les comptes rendus factuels fournis dans `programme.js` (ou `sante/` pour l'historique de santé), sans extrapolation ni double source contradictoire.

## Priorités de travail

1. Respecter la demande précise la plus récente de l'utilisateur.
2. Conserver les fonctionnalités existantes non concernées.
3. Ne pas modifier les dates, la nature des séances, le nombre de séances, leurs modes ou leurs identifiants sans demande.
4. Pour toute modification de l'interface, vérifier le rendu et les interactions sur petit et grand écran autant que les outils disponibles le permettent ; ne pas affirmer un test visuel non réalisé.
5. Documenter les changements dans `docs/JOURNAL.md` et mettre à jour `docs/DECISIONS.md` / `docs/CONTEXTE.md` si une décision change. Ne pas laisser la documentation contredire le code ou la demande.
6. Ne pas prétendre que GitHub Pages est déployé ni que les changements sont visibles en ligne sans vérification. Distinguer « poussé sur GitHub » de « visible sur Pages ».
7. Ne pas introduire de collecte, synchronisation, stockage externe, authentification, dépendance de service tiers ou suivi analytique sans autorisation.

## Conventions spécifiques

- **Langue : français** pour l'interface, la documentation métier et les échanges.
- Dépôt : `hameaufl/programme-sport` ; branche principale : `main` ; site GitHub Pages attendu : `https://hameaufl.github.io/programme-sport/`.
- Architecture : site HTML/CSS/JavaScript **statique**, sans framework obligatoire, backend ou base de données.
- `index.html` : interface, navigation, consultation, coches.
- `programme.js` : séances datées et identifiants de séance ; les semaines sont indexées par leur **lundi**.
- La **semaine civile** de l'interface va du lundi au dimanche. À l'ouverture, afficher la semaine actuelle et le jour actuel ; bouton « Semaine en cours » dynamique.
- Garder le site utilisable sur ordinateur et sur Android via un raccourci standalone.
- **Suivi statique :** `fait` et `sensations` dans `programme.js`, commit GitHub puis affichage public sur tous les appareils. Aucun stockage du suivi dans le navigateur. **Préserver les `id`**.
- Séances : 15 sorties de course actuellement, plus 3 rendez-vous « Kiné · Genoux » les 4, 9 et 18 novembre 2026. Aucune séance de marche seule.
- Les libellés de bracelet sont **2M+3C** et **2M+5C**, pas « mode A » ni « mode B ». Le mode 21 minutes continues est facultatif en fin de cycle.
- Objectifs : perspective **trimestrielle ou au-delà**, et non jalons hebdomadaires. L'interface actuelle montre seulement une phrase à puce sous « Mes objectifs ».
- Pas de sous-titre dans le bandeau « Mon programme. », pas de description sous « Mon calendrier », pas de pied de page.
- Ne pas inventer d'horaires de kiné, de résultats réels, de symptômes ou de séances réalisées.
- Les programmes, cases « Fait » et notes « Sensations » publiés sur GitHub Pages sont **publics** par choix explicite du propriétaire. Ne pas ajouter d'éléments inconnus ou publier des transcriptions intégrales sans demande.

## Avant de travailler dans une nouvelle conversation

Lire dans cet ordre :

1. Ce fichier `AGENTS.md`.
2. `docs/REPRISE.md` — protocole de reprise et points à vérifier.
3. `docs/CONTEXTE.md` — état exact, fonctionnalités et architecture.
4. `docs/DECISIONS.md` — historique des décisions et des choix remplacés.
5. `docs/ROLES.md` — séparation Maturation / Coach.
6. `sante/README.md` et ses modèles — contexte santé versionné si renseigné, respectant la visibilité du dépôt.
7. `docs/JOURNAL.md` — modifications et transferts récents.
8. `README.md` puis les fichiers `index.html` et `programme.js` pour la réalité du code.

À la fin de **chaque intervention**, ajouter au journal : date de l'intervention, demande exacte ou résumé fidèle, fichiers modifiés, décisions prises, tests effectués, commit et limites éventuelles.

> Cette documentation est une **reconstitution structurée des décisions et du contexte**, pas une transcription littérale complète des échanges. Elle doit être maintenue à jour pour permettre une reprise sans l'historique de ce chat.
