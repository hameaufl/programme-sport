# Contexte de Mon Rythme — état opérationnel

_Mise à jour : 11 novembre 2026. En cas de conflit, suivre la demande utilisateur la plus récente et [AGENTS.md](../AGENTS.md)._

## Projet et publication

- Site statique **Mon Rythme**, en français, adapté ordinateur et Android avec raccourci standalone.
- Dépôt **public** : https://github.com/hameaufl/programme-sport ; branche `main`.
- Site GitHub Pages attendu : https://hameaufl.github.io/programme-sport/ . Un commit poussé n'atteste pas de la disponibilité du site ni du déploiement.
- `index.html` : interface HTML/CSS/JS, calendrier et affichage en lecture seule.
- `programme.js` : source statique unique des séances, **statuts `fait` et notes `sensations`**.
- `sante/` : suivi santé versionné (modèles encore vides), bilan de podologie annoncé et non reçu.
- `pieces-jointes/` : futur dépôt des fichiers Garmin prévus et réalisés ; documentation dans [GARMIN.md](GARMIN.md).
- `docs/`, `AGENTS.md`, `README.md` : mémoire persistante de projet et contrats de fonctionnement.
- Pas de base de données, authentification, serveur de suivi ou stockage local des données d'entraînement.

## Rôles — distinction impérative

Voir [ROLES.md](ROLES.md).

- **Coach**, exclusivement : reconnaître comme une demande d'action chaque retour utilisateur sur une sortie, un ressenti ou un fichier d'activité ; traiter **durant l'échange** la mise à jour de `programme.js`, du suivi santé et des pièces jointes réelles. Proposer / réaliser les ajustements d'entraînement selon le retour, sans obligation de modifier à chaque fois. **Aucune modification de l'IHM (`index.html`, CSS, JavaScript de rendu, contrôles, navigation).**
- **Maturation**, exclusivement : architecture, consignes, qualité technique, cache et IHM prête à accueillir les données du Coach. Modification visuelle uniquement sur demande ou approbation expresse du propriétaire. **Aucune modification du programme sportif, des statuts, des sensations ni des rapports réels à la place du Coach.**
- L'agent affecté **dans cette conversation est Maturation uniquement**. Des agents futurs doivent vérifier le rôle qui leur est attribué.

## Affichage des réalisations — décision actuelle

- `fait:false` : **aucun libellé ni symbole de statut**.
- `fait:true` : **coche blanche cerclée de vert et « Fait »**, sans interaction.
- Les sensations n'apparaissent qu'après un compte rendu réellement reçu ; les deux vues se comportent de la même manière.
- Cette règle de présentation relève uniquement de la casquette **Maturation**, et ne modifie aucun contenu de séance.

## Fonctionnement en lecture seule

- En-tête « mon rythme. » et date du jour dynamique.
- Bandeau existant « Programme Sport » et titre « Mon programme. », **sans sous-titre**.
- « Mes objectifs » : une seule puce « La priorité est de retrouver des sensations agréables, sans recherche de performance. » ; objectifs futurs à horizon trimestriel ou plus, **pas** de cinq cartes hebdomadaires.
- « Mon calendrier » : **sans description sous le titre**, semaines civiles **lundi-dimanche**, ouverture sur semaine et jour actuels, bouton « Semaine en cours » dynamique.
- « Programme du jour » et « Séances de la semaine » : durée, déroulé en puces concises, indicateur statique **« ✓ Fait » seulement si séance confirmée** et, lorsqu'elle existe, note **« Sensations : … »**.
- **Aucune saisie**, aucune case cliquable, aucun champ libre ; la réalisation et les sensations sont modifiées uniquement dans les fichiers GitHub, par le Coach.
- Pas de pied de page ni de nouvel élément graphique sans accord.
- `programme.js` contient des semaines indexées par le lundi `AAAA-MM-JJ`. Chaque séance possède un `id` stable, `date`, `titre`, `fait` (booléen), `sensations` (texte court, vide si aucun retour), et éventuellement `type`, `duree`, `etapes`.
- Les statuts **`fait: false` ne prouvent pas qu'une séance n'a pas eu lieu**, seulement qu'aucune confirmation n'a été intégrée. Ne pas déduire une réalisation de la date passée.
- Les 18 séances initiales ont `fait:false` et `sensations:""` tant que le propriétaire n'a pas confirmé leur réalisation.

## Sources de données et pièces jointes Garmin

- Montre : **Garmin Venu 4**.
- Le propriétaire pourra transmettre, après la sortie, un export de **Garmin Connect** : FIT (à privilégier comme original), TCX, GPX ou CSV d'intervalles selon disponibilité. Le Coach reliera l'original versionné à la séance via `pieces-jointes/`, produira un résumé **uniquement à partir des mesures présentes** et actualisera les données sportives.
- Le Coach pourra ultérieurement créer une séance prévue et une pièce jointe compatible avec Garmin Venu 4 **seulement après vérification de la compatibilité**, sans confondre FIT d'activité et entraînement structuré.
- Contrat facultatif `pieces_jointes` et procédures : [GARMIN.md](GARMIN.md). **Aucun export ni entraînement Garmin réellement joint à ce stade**. L'ajout de liens visuels vers ces fichiers est une intervention réservée à Maturation après demande/accord.
- Pour un accès direct Garmin : aucun plugin compatible identifié parmi les intégrations consultées lors de l'étude ; la Garmin Personal API peut être envisagée pour un importateur / MCP futur sans secret committé. Ne pas affirmer une connexion active sans vérification.
- **Objectif** : GitHub est la mémoire, non la session de l'agent ; le Coach n'a pas à retenir les comptes rendus d'une conversation à l'autre.

## Programme de course initial (modifiable par le Coach)

Source : PDF « Programme fractionné I », La Clinique du Coureur (8 semaines à l'origine), **adapté** à 5 semaines et aux modes du bracelet, avec 15 sorties comportant une phase de course.

- **2M+3C** : 3 × (2 min marche + 3 min course) + 2 min marche finale ; 17 min au total, 9 min courues.
- **2M+5C** : 3 × (2 min marche + 5 min course) + 2 min marche finale ; 23 min au total, 15 min courues.
- Option dernière séance si confortable : 3 min marche + 21 min course continue + 3 min marche ; pas d'obligation, pas de modes 30 ou 40 min intégrés.

| Séances initiales | Dates en 2026 | Modes |
| --- | --- | --- |
| Cycle 1 | 11, 13, 16 novembre | 2M+3C / 2M+3C / 2M+3C |
| Cycle 2 | 18, 20, 23 novembre | 2M+3C / 2M+3C / 2M+5C |
| Cycle 3 | 25, 27, 30 novembre | 2M+3C / 2M+5C / 2M+5C |
| Cycle 4 | 2, 4, 7 décembre | 2M+5C / 2M+5C / 2M+5C |
| Cycle 5 | 9, 11, 14 décembre | 2M+5C / 2M+5C / 2M+5C (option 21 min en continu le 14) |

Kiné **« Kiné · Genoux »** : **4, 9 et 18 novembre 2026**, aucun horaire fourni. Course + kiné le 18 novembre : deux séances et identifiants distincts.

**Objectif utilisateur :** reprise après longue interruption, sensations agréables, **absence de douleur**. Coach : diminuer, stabiliser, augmenter prudemment, remplacer, décaler, proposer du repos ou attendre. Pas de diagnostic médical, de progression automatique ni d'ajout arbitraire de séances.

## Santé publique et données encore attendues

- L'utilisateur a **explicitement choisi de publier et versionner** ses informations de santé liées au projet dans le dépôt public ; elles peuvent rester accessibles dans l'historique Git. Les **tracés GPS Garmin** peuvent révéler domicile ou autres lieux fréquentés. Ne jamais publier des secrets de connexion.
- `sante/PROFIL.md`, `sante/SUIVI.md` sont des **modèles vides** à ce jour.
- **Bilan de podologie** attendu, portant sur posture et appuis des pieds ; non reçu, aucune mesure ou conclusion à inférer.
- Coach doit seulement publier les éléments que l'utilisateur transmet pour le projet. Les retours réels et les fichiers réels seront versionnés.
- Aucune donnée de séance enregistrée dans le navigateur ; pas de synchronisation localStorage.

## Actualisation Android / cache

`index.html` charge `programme.js` avec un paramètre d'URL `?actualisation=<horodatage>` **dès l'ouverture**, lors du retour au premier plan et après restauration depuis l'historique navigateur. Le navigateur recharge ainsi le programme, les coches et les sensations depuis la publication GitHub Pages.

Les balises HTML isolées ne pilotent pas le cache HTTP des ressources. Une ancienne version de `index.html` ou un déploiement Pages différé peuvent encore retarder un changement. Pas de garantie d'actualisation instantanée, ni de fonctionnement hors ligne.

## Continuité multi-agents

Lire dans cet ordre : `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, `docs/CONTEXTE.md`, `docs/DECISIONS.md`, `docs/JOURNAL.md`, `docs/GARMIN.md`, `sante/README.md`, `pieces-jointes/README.md`, `README.md`, puis sources. Journaliser après chaque intervention. L'historique ancien peut contenir des décisions **abandonnées** ; seule la dernière règle explicitement validée fait autorité.
