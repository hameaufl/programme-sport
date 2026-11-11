# Contexte et état fonctionnel du projet

_Mise à jour de ce dossier : 11 novembre 2026, d'après les demandes et le code du projet._

## Mission

**Mon Rythme / Programme Sport** est un site volontairement sobre de consultation d'un planning de sorties sportives et rendez-vous de kiné. Le coach établit des programmes avec l'utilisateur, et l'agent les intègre **statiquement** dans le dépôt, puis GitHub Pages expose la version publiée. L'interface est en français, responsive sur ordinateur et sur Android via un raccourci installé en mode standalone.

Dépôt : https://github.com/hameaufl/programme-sport — branche `main`, dépôt **public**. URL GitHub Pages attendue : https://hameaufl.github.io/programme-sport/ . Le fait que des commits soient présents ne prouve pas à lui seul que l'URL publique a été déployée correctement ; vérifier avant d'affirmer.

## Architecture

- `index.html` : page unique, CSS intégré, JavaScript natif de navigation et coches.
- `programme.js` : **source de vérité statique des séances**. Chaque clé est la date du lundi d'une semaine civile (AAAA-MM-JJ). Chaque séance conserve son `id`, notamment `course-AAAA-MM-JJ` ou `kine-AAAA-MM-JJ`.
- `manifest.webmanifest`, icônes, `.nojekyll` : intégration et publication sur GitHub Pages.
- Aucune base de données, aucun backend applicatif, aucun compte à saisir sur le site, aucun champ quotidien, ni formulaire de programme.
- Les noms de fichier et de clés de sauvegarde déjà publiés sont des contrats de compatibilité : les modifier exige une migration ou une approbation.


## Organisation des rôles

Voir [`ROLES.md`](ROLES.md) et [`AGENTS.md`](../AGENTS.md).

- **Maturation** : structure du dépôt, consignes, qualité technique, fonctionnement de Mon Rythme et évolution de l'IHM demandée ou expressément approuvée. Aucun embellissement visuel autonome.
- **Coach** : prise en compte des comptes rendus et du contexte de santé renseigné, programme de course, renforcement et récupération. Décisions possibles : diminuer, maintenir, augmenter, reporter, suspendre ou attendre pour mieux évaluer. **Ajustement possible dès le lendemain**, sans obligation de modifier systématiquement après chaque séance.
- Les deux rôles sont distincts même lorsqu'ils sont assurés par le même LLM.

## Espace de données santé versionnées

- `sante/README.md` : périmètre et avertissement de visibilité.
- `sante/PROFIL.md` : modèle de profil mécanique, antécédents et contraintes utiles.
- `sante/SUIVI.md` : modèle de comptes rendus et décisions d'entraînement.
- Aucun antécédent ni bilan clinique personnel **effectif** n'est actuellement renseigné.
- Le dépôt `hameaufl/programme-sport` est **public**. Un dossier Git n'est pas une frontière de confidentialité ; les fichiers, ainsi que leurs historiques, peuvent être exposés, y compris via GitHub Pages. L'utilisateur veut du **versionnement**, mais le dépôt cible et la visibilité de ses futures données personnelles doivent être clarifiés et explicitement validés avant leur publication. Dépôt privé séparé possible.

## Actualisation et cache du programme

- Au chargement, `index.html` crée dynamiquement une balise `script` vers `./programme.js?actualisation=<horodatage>` avant d'initialiser le calendrier.
- Le programme se recharge également au retour au premier plan (`visibilitychange`) et lors d'un retour d'historique navigateur (`pageshow` persistant).
- Une requête versionnée contourne la réutilisation ordinaire du cache HTTP de `programme.js`. Les mêmes identifiants de séances `id` préservent les coches en `localStorage`.
- Les balises HTML des séances ne constituent pas un mécanisme de validation du cache : c'est la ressource `programme.js` qui doit être actualisée.
- La version de `index.html` peut être conservée temporairement dans le cache du navigateur, et un déploiement GitHub Pages peut prendre du temps. Il n'existe pas de garantie de fraîcheur instantanée ni de fonctionnement hors ligne dans cette architecture.

## État de l'interface validé par l'utilisateur

- En-tête de marque « mon rythme. », avec la date courante à droite calculée depuis l'appareil. La date doit être mise à jour si la journée change sans rechargement.
- Bannière existante « Programme Sport » et titre **« Mon programme. »**, **sans** phrase supplémentaire de départ.
- Section **« Mes objectifs »** : actuellement **une seule puce** : « La priorité est de retrouver des sensations agréables, sans recherche de performance. » Les objectifs futurs sont **trimestriels ou plus longs**, pas des jalons hebdomadaires. Ne pas réintroduire les anciennes cartes de cinq étapes.
- Section **« Mon calendrier »**, **sans texte descriptif directement sous ce titre**. Semaines du lundi au dimanche, toujours. À l'ouverture, semaine actuelle et jour actuel sélectionnés. Flèches précédent/suivant, bouton **« Semaine en cours »** recalculé depuis la date effective.
- **« Programme du jour »** : détail de la séance ou des séances du jour, avec une case **« Fait »** par séance.
- **« Séances de la semaine »** : liste hebdomadaire, chacune avec sa case **« Fait »**.
- Une journée peut contenir simultanément course et kiné (cas du 18 novembre). Les coches restent indépendantes.
- **Aucun pied de page**.
- Aucune icône supplémentaire, bannière, texte explicatif, tableau de bord ou indicateur ajouté de la propre initiative d'un agent.

## Style éditorial actuel

- Description des séances : **puces courtes**, style nominal, sans phrase superflue.
- Affichage des courses : titre, durée, 3 puces « 3 × (2 min marche + 3/5 min course) », « 2 min de marche finale », « Allure facile » ; éventuelle option de course continue uniquement lors de la dernière séance.
- Les champs redondants `objectif` et `details` ont été retirés du programme en vigueur.
- Pas de bloc ou texte d'accompagnement supplémentaire sans demande.

## Sauvegarde du suivi

Le statut des coches est sauvegardé dans `localStorage` sous la clé `mon-rythme-suivi-v1` ; l'identifiant de séance `id` est la clé logique. Les cases ne sont **ni synchronisées** entre appareils, **ni poussées dans GitHub**. Le raccourci Android est installé par l'utilisateur ; selon son navigateur et l'environnement standalone, le stockage peut être partagé avec le site standard ou séparé. Il faut tester son environnement et ne pas promettre une synchronisation.

Nettoyer les données du navigateur peut effacer l'historique des coches. Conserver les identifiants en cas de renommage du titre.

## Programme en vigueur

Le document PDF d'origine était le « Programme fractionné I » de La Clinique du Coureur, contenant **8 semaines** de fractions marche/course et un objectif de 30 minutes continues. L'utilisateur a demandé initialement une compression à 5 semaines, ensuite une adaptation aux **modes préprogrammés de son bracelet** et la suppression des sorties de marche seule. L'agenda actuel conserve **15 sorties de course** et **3 séances de kiné**.

Modes du bracelet, étiquettes explicitement exigées :
- **2M+3C** = 3 × (2 min de marche + 3 min de course) + 2 min de marche : total 17 min, dont 9 min courues.
- **2M+5C** = 3 × (2 min de marche + 5 min de course) + 2 min de marche : total 23 min, dont 15 min courues.
- Séance éventuelle de **21 min continues** = 3 min marche + 21 min course + 3 min marche ; **facultative seulement** pour la dernière séance si l'aisance le permet. Les modes de 30 et 40 minutes continues n'appartiennent pas au cycle de 5 semaines.

Dates de course conservées, à allure facile et sans obligation de progression en cas de douleurs :
1. 11, 13, 16 novembre 2026 : 2M+3C / 2M+3C / 2M+3C
2. 18, 20, 23 novembre : 2M+3C / 2M+3C / 2M+5C
3. 25, 27, 30 novembre : 2M+3C / 2M+5C / 2M+5C
4. 2, 4, 7 décembre : 2M+5C / 2M+5C / 2M+5C
5. 9, 11, 14 décembre : 2M+5C / 2M+5C / 2M+5C (21 min continues facultatives le 14).

Rendez-vous existants : **« Kiné · Genoux »** les 4, 9 et 18 novembre 2026, sans horaires connus. Le 18 novembre comporte deux séances distinctes. Le programme statique est public, y compris ces libellés et dates ; ne pas y ajouter de données personnelles supplémentaires.

## Lignes de conduite sur les sensations

Le contexte utilisateur exprime un souhait de **reprise progressive après une longue interruption**, retrouver de bonnes sensations et **éviter les douleurs**. Ne pas pousser systématiquement la progression vers plus long ou plus vite. Cette intention est un contexte de projet et non une conclusion médicale. Ne pas inventer de diagnostics, de résultats, ni de séances réellement effectuées.

## Hors périmètre sans demande explicite

Stockage sur serveur, synchronisation entre appareils, nouvelles pages, formulaires de saisie, compte utilisateur, analytique, nouveaux blocs graphiques, scores de progression, ajout de sorties de marche, changement de design, génération de données d'entraînement ou ajout d'objectifs hebdomadaires.

## Mode d'accompagnement adopté à compter du 11 novembre 2026

- **Compte rendu de l'utilisateur après chaque sortie** : sensations, confort, éventuelles gênes, durées ou distances réalisées, à sa discrétion.
- **Adaptation au fil de l'eau, dès le lendemain** ; pas de bilan obligatoire en fin de semaine avant d'ajuster.
- Trois issues possibles : **réduire**, **maintenir** ou **augmenter modérément** la séance suivante selon les retours ; aucune augmentation automatique.
- Si le lendemain est un **jour sans course**, préserver ce repos et préparer **la prochaine séance programmée**.
- Ne pas créer de nouvelles courses ni déplacer les dates sans nécessité ou demande ; respecter les modes réels du bracelet.
- **Éviter la douleur** et tenir compte des séances de kiné ; ne pas interpréter une coche « Fait » comme la preuve d'une séance confortable.
- Les comptes rendus subjectifs et symptômes éventuels relèvent de la conversation privée, **pas du dépôt public**, sauf instruction explicite autorisant leur publication. Les décisions de programmation peuvent être répercutées dans `programme.js` et consignées sans données sensibles.

