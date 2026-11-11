# Programme Sport — Mon Rythme

## Reprise par un nouvel agent LLM

**Commencer par [AGENTS.md](AGENTS.md)** : règles impératives, notamment **aucun ajout graphique ou visuel sans la demande ou l'approbation explicite de l'utilisateur**. Proposer une amélioration est permis ; la réaliser sans accord ne l'est pas.

Pour reprendre ce projet sans l'historique de conversation, lire ensuite :

- [Guide de reprise](docs/REPRISE.md)
- [Contexte et architecture](docs/CONTEXTE.md)
- [Registre des décisions](docs/DECISIONS.md)
- [Journal chronologique](docs/JOURNAL.md)

Ces documents restituent les **décisions pertinentes et le contexte fonctionnel**, non une transcription littérale du chat. Les choix les plus récents priment sur les anciennes pistes abandonnées ; maintenir ces documents à jour lors de chaque intervention.


Site **statique**, adapté au téléphone (y compris raccourci installé sur Android) et à l'ordinateur, publié sur **GitHub Pages**.

## Interface

- **Mon programme.** : titre sans sous-titre de départ.
- **Mes objectifs** : une priorité de reprise agréable, sans recherche de performance. Cette rubrique est destinée à des objectifs **trimestriels ou plus longs** à préciser ultérieurement ; les cinq jalons hebdomadaires ont été retirés.
- **Mon calendrier** : titre sans texte descriptif sous celui-ci ; semaines civiles **du lundi au dimanche**. La semaine en cours est affichée automatiquement à chaque chargement, avec le jour actuel sélectionné. Le bouton « Semaine en cours » recalcule la date lorsqu'on clique dessus. En gardant la page ouverte sur le jour actuel, le passage de minuit peut également actualiser le jour affiché.
- **Programme du jour** et **Séances de la semaine** : chaque séance peut être cochée comme **Fait**. Une coche s'affiche également sur les jours dont toutes les séances sont terminées.
- Aucun pied de page.

## Sauvegarde du suivi

Les coches sont mémorisées dans le **localStorage** du navigateur, sous la clé `mon-rythme-suivi-v1`, avec un identifiant stable pour chaque séance (`course-AAAA-MM-JJ` ou `kine-AAAA-MM-JJ`). Une case décochée est retirée du suivi.

- Les coches sont conservées après rafraîchissement ou fermeture de la page **tant que le stockage du navigateur/site est conservé**.
- Sur Android, le raccourci standalone peut utiliser le même stockage du site selon le navigateur utilisé ; il faut tester la persistance dans cet environnement précis.
- **Aucune synchronisation automatique** entre téléphone et ordinateur. Cocher sur un appareil ne coche pas l'autre.
- Le suivi n'est **pas publié dans GitHub** et n'est **pas envoyé à un serveur**.
- Effacer les données du site, réinitialiser le navigateur ou changer de contexte de stockage peut effacer les coches. Aucune sauvegarde à distance n'est disponible.

## Programme sportif actuel

Cycle de course du **mercredi 11 novembre au lundi 14 décembre 2026** : **15 séances avec course**, réparties sur cinq cycles de sept jours, avec du repos entre les sorties.

Le calendrier civil est volontairement **indépendant** de ces cycles de sept jours : il affiche les rendez-vous aux bonnes dates sans les déplacer.

Modes disponibles sur le bracelet :

| Mode | Séquence | Durée totale | Temps couru |
| --- | --- | --- | --- |
| 2M+3C | 3 × (2 min marche + 3 min course) + 2 min marche | 17 min | 9 min |
| 2M+5C | 3 × (2 min marche + 5 min course) + 2 min marche | 23 min | 15 min |
| C (facultatif) | 3 min marche + 21 min course + 3 min marche | 27 min | 21 min continues |

| Étape | Sorties avec course | Bracelet |
| --- | --- | --- |
| 1 | 11, 13, 16 novembre | 2M+3C, 2M+3C, 2M+3C |
| 2 | 18, 20, 23 novembre | 2M+3C, 2M+3C, 2M+5C |
| 3 | 25, 27, 30 novembre | 2M+3C, 2M+5C, 2M+5C |
| 4 | 2, 4, 7 décembre | 2M+5C, 2M+5C, 2M+5C |
| 5 | 9, 11, 14 décembre | 2M+5C, 2M+5C, 2M+5C (mode C facultatif le 14) |

Séances de **Kiné · Genoux** : 4, 9 et 18 novembre 2026, sans horaires spécifiés. Le 18 novembre comporte à la fois une séance de course et une séance de kiné : chacune possède sa propre case de suivi.

La progression en course est adaptée du *Programme fractionné I* (La Clinique du Coureur), mais ne le reproduit pas exactement. Courir à allure facile, ralentir ou répéter une séance au besoin, et ne pas forcer en présence de douleurs. Le passage au mode C n'est pas obligatoire.

## Architecture

- `index.html` : interface responsive, navigation hebdomadaire et cases sauvegardées en local ;
- `programme.js` : contenu **statique** des séances et identifiants stables ;
- `favicon.svg`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png` : présentation et installation mobile ;
- `.nojekyll` : publication directe via GitHub Pages.

Les séances futures pourront être modifiées dans `programme.js` sans supprimer les cases déjà enregistrées pour les séances ayant conservé le même identifiant.

## Publication

[Paramètres GitHub Pages du dépôt](https://github.com/hameaufl/programme-sport/settings/pages) → **Deploy from a branch**, `main`, dossier `/(root)`.

Site : https://hameaufl.github.io/programme-sport/

Le dépôt et le programme statique sont **publics**. Les données de suivi sont distinctes et restent **locales à chaque navigateur/appareil**.
