# Contexte et état fonctionnel du projet

_Mise à jour de ce dossier : 11 novembre 2026, d'après les demandes et le code du projet._

## Mission

**Mon Rythme / Programme Sport** est un site volontairement sobre de consultation d'un planning de sorties sportives et rendez-vous de kiné. L'utilisateur fournit des programmes, l'agent les intègre **statiquement** dans le dépôt, puis GitHub Pages expose la version publiée. L'interface est en français, responsive sur ordinateur et sur Android via un raccourci installé en mode standalone.

Dépôt : https://github.com/hameaufl/programme-sport — branche `main`, dépôt **public**. URL GitHub Pages attendue : https://hameaufl.github.io/programme-sport/ . Le fait que des commits soient présents ne prouve pas à lui seul que l'URL publique a été déployée correctement ; vérifier avant d'affirmer.

## Architecture

- `index.html` : page unique, CSS intégré, JavaScript natif de navigation et coches.
- `programme.js` : **source de vérité statique des séances**. Chaque clé est la date du lundi d'une semaine civile (AAAA-MM-JJ). Chaque séance conserve son `id`, notamment `course-AAAA-MM-JJ` ou `kine-AAAA-MM-JJ`.
- `manifest.webmanifest`, icônes, `.nojekyll` : intégration et publication sur GitHub Pages.
- Aucune base de données, aucun backend applicatif, aucun compte à saisir sur le site, aucun champ quotidien, ni formulaire de programme.
- Les noms de fichier et de clés de sauvegarde déjà publiés sont des contrats de compatibilité : les modifier exige une migration ou une approbation.

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
