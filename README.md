# Programme Sport — Mon Rythme

Site **statique**, responsive, publié sur **GitHub Pages**. Son programme est identique sur ordinateur et téléphone après mise à jour de la page.

## Cycle actuel : 5 semaines dès le 11 novembre 2026

- Début **mercredi 11 novembre 2026**, dernière séance **lundi 14 décembre 2026**.
- Le cycle sportif comporte **cinq étapes de 7 jours**, du mercredi au mardi ; l'interface du calendrier affiche les **semaines civiles du lundi au dimanche** et ne déplace aucune séance.
- **3 sorties avec course par semaine**, donc **15 sorties** au total.
- **Aucune sortie constituée uniquement de marche**. Les autres jours sont sans séance programmée, pour récupérer.
- **Kinésithérapie — renforcement des genoux** : mercredi **4 novembre**, lundi **9 novembre** et mercredi **18 novembre 2026**. Les séances de kiné sont indépendantes du programme de course et ne sont pas comptées parmi les 15 sorties. Le 18 novembre comporte à la fois une séance de course et une séance de kiné ; aucun horaire n’est spécifié.
- Les modes préprogrammés du bracelet déterminent les séances, sans ajuster leur minutage interne.

| Mode bracelet | Séquence exacte | Durée totale | Course totale |
| --- | --- | --- | --- |
| A | 3 × (2 min marche + 3 min course) + 2 min marche | 17 min | 9 min |
| B | 3 × (2 min marche + 5 min course) + 2 min marche | 23 min | 15 min |
| C (facultatif) | 3 min marche + 21 min course + 3 min marche | 27 min | 21 min continues |

### Enchaînement des séances

| Semaine | Dates | Séance 1 | Séance 2 | Séance 3 |
| --- | --- | --- | --- | --- |
| 1 | 11, 13, 16 novembre | A | A | A |
| 2 | 18, 20, 23 novembre | A | A | B |
| 3 | 25, 27, 30 novembre | A | B | B |
| 4 | 2, 4, 7 décembre | B | B | B |
| 5 | 9, 11, 14 décembre | B | B | B (C facultatif à la dernière séance) |

**Important** : ce programme est une adaptation réduite du *Programme fractionné I* (La Clinique du Coureur), fourni par l'utilisateur. Il n'en constitue pas une transcription exacte. Passer d'une séance B à 21 minutes continues est une progression importante : **ne pas forcer** le mode C si le B reste difficile. Les modes 30 min et 40 min en continu ne sont pas inclus dans les 5 semaines.

Courir lentement, à une allure où parler reste possible. Répéter le mode A ou B au besoin, ou marcher pendant une portion de course. Conserver au moins un jour sans course entre les séances. En cas de douleur inhabituelle ou persistante, interrompre la séance ; en cas de doute, demander un avis de santé. Le programme de course à pied débutant [NHS Couch to 5K](https://www.nhs.uk/better-health/get-active/get-running-with-couch-to-5k/couch-to-5k-running-plan/) repose également sur trois séances hebdomadaires avec repos entre deux sorties.

## Objectif général et étapes

**Objectif :** reprendre le sport après une longue pause, retrouver de bonnes sensations et progresser sans courir malgré la douleur. Pas de chrono à atteindre ; la régularité et le confort priment.

| Étape | Dates | Grand objectif |
| --- | --- | --- |
| 1 | 11–17 novembre | Retrouver l'envie de bouger, avec une reprise douce. |
| 2 | 18–24 novembre | Installer la régularité tout en respectant la récupération. |
| 3 | 25 novembre–1er décembre | Allonger avec confiance si les séances sont confortables. |
| 4 | 2–8 décembre | Gagner en aisance dans les blocs de course de 5 minutes. |
| 5 | 9–15 décembre | Consolider sans douleur, sans obligation de tenter 21 minutes en continu. |

Ces objectifs correspondent à des **jalons indicatifs**, pas à un suivi de performance ni à des étapes validées automatiquement. Le site met en évidence la période en cours en fonction de la date de l'appareil, sans collecter de données.

## Architecture

- `index.html` : interface responsive, calendrier en semaines civiles **du lundi au dimanche**, détail des séances et présentation des objectifs.
- `programme.js` : **source unique du programme**, éditable via GitHub ; `window.MON_RYTHME_DEBUT_CYCLE` indique le début de la course, `window.MON_RYTHME_PROGRAMMES` regroupe toutes les séances sous la date du **lundi** correspondant, `window.MON_RYTHME_OBJECTIF_GENERAL` et `window.MON_RYTHME_ETAPES` définissent les objectifs statiques.
- `favicon.svg`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png` : éléments de présentation.
- `.nojekyll` : pour la publication GitHub Pages.

Aucun serveur applicatif, compte utilisateur, formulaire, suivi, stockage local ou base de données. La publication est **publique**.

## Mettre en ligne

1. Ouvrir [Settings → Pages](https://github.com/hameaufl/programme-sport/settings/pages).
2. Sous **Build and deployment**, choisir **Deploy from a branch**.
3. Choisir `main` et `/(root)`, puis **Save**.
4. Site : https://hameaufl.github.io/programme-sport/

L'actualisation de `programme.js` et `index.html` sur `main` entraîne une nouvelle publication sur GitHub Pages. Le navigateur peut temporairement afficher une version en cache.

## Confidentialité

GitHub Pages est un hébergement public : ne pas inclure d'informations confidentielles ou personnelles dans le dépôt.

**Attention :** les dates et le libellé des séances de kiné intégrées ici sont désormais consultables publiquement.
