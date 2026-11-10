# Programme Sport — Mon Rythme

Site **statique**, responsive, publié avec **GitHub Pages**, pour consulter les séances à la fois sur ordinateur et sur téléphone.

## Programme publié

**Du mardi 10 novembre au dimanche 13 décembre 2026**, cinq semaines et **25 sorties** :
- trois séances de course/marche à allure facile par semaine ;
- deux séances de marche de récupération par semaine ;
- deux journées sans sortie par semaine.

Le calendrier est réparti par **semaines civiles, du lundi au dimanche**. La première commence le 9 novembre, mais la première séance est le **mardi 10 novembre**.

Ce programme est une **adaptation originale, condensée**, du document *Programme fractionné — I* (La Clinique du Coureur) fourni par l'utilisateur. Le document original comporte huit semaines, cinq séances de course/marche par semaine, et termine par 30 minutes de course continue. Le plan affiché ici ne reproduit pas le PDF : il privilégie trois entraînements course/marche et deux marches sans course afin de préserver de la récupération. Objectif final indicatif : **20 minutes de course continue** ; extension à 25 minutes seulement si les étapes précédentes sont confortables, sans douleur.

Toutes les séances de course incluent 5 minutes de marche avant et 5 minutes après, comptées dans la durée totale affichée. Les courses se font à **allure conversationnelle**, sans objectif de vitesse. Il est pertinent de répéter une séance, de prolonger une phase ou de revenir à la marche si nécessaire. En cas de douleur persistante ou inhabituelle, interrompre la séance et demander un avis professionnel.

## Architecture

- `index.html` : interface responsive, semaines, jours et détail des séances ;
- `programme.js` : **source de vérité unique** du programme daté, avec description et étapes de chaque séance ;
- `favicon.svg`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png` : icônes du site ;
- `.nojekyll` : publication directe GitHub Pages.

Ni base de données, ni authentification, ni formulaire, ni cases de suivi, ni `localStorage`. Les dates et séances sont intégrées **statiquement dans `programme.js`**. Modifier ce fichier dans la branche `main` met à jour les programmes après le déploiement, sur tous les appareils utilisant la même URL.

## Publication

Dans [Settings → Pages](https://github.com/hameaufl/programme-sport/settings/pages), choisir **Deploy from a branch**, `main`, dossier `/(root)`, puis **Save**.

Site attendu : https://hameaufl.github.io/programme-sport/

Après une publication, un navigateur peut conserver brièvement une ancienne version en cache. Recharger la page si nécessaire.

## Format des séances

`window.MON_RYTHME_PROGRAMMES` est un objet indexé par la date du **lundi** de chaque semaine (`AAAA-MM-JJ`). Chaque entrée possède la date réelle de sortie et des champs d'affichage tels que `titre`, `duree`, `objectif`, `details`, `etapes`. Ce fichier peut évoluer pour de futurs plans : il n'y a aucune contrainte technique de cinq sorties par semaine.

## Visibilité

Le dépôt et le site GitHub Pages sont **publics**. Ne publier aucune donnée personnelle ou confidentielle.
