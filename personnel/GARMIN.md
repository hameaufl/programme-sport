# Garmin Venu 4 — futur flux de pièces jointes

**Statut au 12 novembre 2026 : premier entraînement prévu généré au format FIT Workout pour la séance du 11 novembre, et lien de téléchargement intégré au détail de cette séance. Aucun MCP Garmin connecté ; réception effective du fichier par la Venu 4 non testée.**

## Consigne de rédaction pour le Coach et l'interface

Lorsqu'un programme course/marche est présenté, créé ou modifié, **générer spontanément le FIT Workout** depuis les étapes si leur format est reconnu. Exécuter `node scripts/generer-garmin.cjs <id>`, contrôler le binaire et rattacher le fichier à la séance via `pieces_jointes`. Ne pas attendre un ordre spécifique de génération, mais **refuser les approximations** pour des structures non prises en charge. Les détails de compatibilité figurent dans ce document ; **le site affiche uniquement « Télécharger l'entraînement Garmin (.FIT) », sans ligne explicative en dessous**. Le Coach ne touche pas à l'IHM.

## Format FIT retenu et limites de transfert

- **Choix** : FIT **Workout**, conforme aux messages Garmin `file_id`, `workout`, `workout_step` ; distinct de FIT **Activity** pour une sortie enregistrée. L'exemple du mercredi 11 novembre contient **7 étapes** : marche 2 min, course 3 min, répétées trois fois ; marche finale 2 min, soit **17 min**. Aucun objectif de vitesse ou de fréquence cardiaque chiffré n'a été ajouté.
- **Fichier réel** : `personnel/pieces-jointes/seances/course-2026-11-11/prevu/course-2026-11-11.fit`. Source du plan : `personnel/seances/2026/11/course-2026-11-11.json` ; les états, sensations, exercices réalisés et structures sollicitées n'ont pas été reformulés.
- **Pour le Coach** : à chaque création/modification d'un programme marche/course reconnu, exécuter `node scripts/generer-garmin.cjs <id>`, vérifier le fichier, l'associer à l'unique séance via `pieces_jointes`, commit du FIT + JSON. **Ne pas modifier plusieurs séances par commodité** et ne pas inventer de rythme cible. Si la structure du programme n'est pas reconnue, **ne pas générer de fichier** et demander à Maturation de compléter le générateur.
- **Validation technique** : en-tête `.FIT`, CRC, type Workout (5), sport course, 7 étapes avec temps en millisecondes, durée totale et chemins d'archive. Les résultats sont vérifiés en CI. **Cela ne prouve pas l'import/synchronisation réelle sur une Venu 4.**
- **Transfert** : Garmin documente la création et l'envoi de séances depuis **Garmin Connect → Entraînement et planification → Entraînements → Envoyer à l'appareil**. Ce flux ne constitue pas la preuve d'un **import externe** de notre FIT Workout dans Garmin Connect. L'import Garmin Connect de fichiers d'activité FIT/TCX/GPX n'est pas le même service. Une éventuelle copie USB dans un dossier `Garmin/NewFiles` dépend de la compatibilité réelle du modèle et doit être testée prudemment, **pas présentée comme garantie**.
- Références : [Garmin FIT Workout](https://developer.garmin.com/fit/articles/file-types/workout.html), [Garmin Venu 4 — Workouts](https://www8.garmin.com/manuals/webhelp/GUID-2CF5620C-E585-4E0A-9CC3-9565533EEE4D/EN-US/GUID-D5F4F37C-EE1C-49E6-B743-FF5D40B903BE.html), [Garmin Venu 4 — envoyer un entraînement](https://www8.garmin.com/manuals/webhelp/GUID-2CF5620C-E585-4E0A-9CC3-9565533EEE4D/EN-US/GUID-D6E80F0C-F319-47D1-AF95-0884F3386635.html).

## Objectif et répartition des rôles

- **Coach** : reçoit les retours, analyse les exports Garmin, versionne les fichiers réellement transmis, met à jour le **fichier individuel de séance `personnel/seances/AAAA/MM/<id>.json`** et son compte rendu lié, décide ou conserve le programme. Crée éventuellement un fichier d'entraînement prévu pour la montre **après validation technique de son format**.
- **Maturation** : définit le **contrat des fichiers et données**, prépare l'architecture puis, **après demande ou approbation** du propriétaire, ajoute les liens/commandes dans l'IHM. Le Coach **ne modifie jamais l'interface** et Maturation **ne traite pas le coaching**.

## Emplacement proposé pour les pièces jointes

```
pieces-jointes/
  README.md
  seances/
    course-AAAA-MM-JJ/
      prevu/
      realise/
```

Créer les répertoires de séance **uniquement lorsqu'un vrai fichier est reçu ou généré**. Les fichiers publics peuvent inclure itinéraire GPS et localisation sensible : l'utilisateur a choisi un dépôt public versionné ; noter ce risque et **ne jamais publier de secret d'accès Garmin**.

## Contrat de données facultatif — à utiliser uniquement pour une vraie pièce jointe

Pour le moment, les fichiers individuels de `personnel/seances/` n'ont **aucun** champ `pieces_jointes`. À la première pièce jointe, le Coach peut utiliser ce schéma déjà documenté **si l'IHM actuelle n'a pas besoin d'être modifiée** :

```json
"pieces_jointes": [
  {"role":"entrainement_prevu","chemin":"personnel/pieces-jointes/seances/course-AAAA-MM-JJ/prevu/nom.fit","format":"fit"},
  {"role":"activite_realisee","chemin":"personnel/pieces-jointes/seances/course-AAAA-MM-JJ/realise/nom.fit","format":"fit"}
]
```

Les exemples ne sont **pas des fichiers réels**. Chemins relatifs au dépôt, nom de fichier sans traversée `..`, un rôle par entrée. Conserver les `id` des séances. Ne pas fabriquer les mesures ou des fichiers inexistants. Si une extension du modèle d'information est nécessaire, **demander l'intervention de Maturation** ; **jamais de modification d'HTML/CSS/JS par le Coach**.

## Deux formats de pièces jointes, à ne pas confondre

1. **Entraînement prévu** : une structure d'étapes à reproduire sur la Garmin Venu 4. Garmin Connect permet de créer un entraînement, le sélectionner puis l'envoyer à la montre. **Un fichier FIT d'activité n'est pas automatiquement un fichier d'entraînement importable**. Ne pas promettre une pièce jointe compatible sans vérification.
2. **Sortie réalisée** : export original depuis Garmin Connect, généralement `.fit` sur un appareil récent. Autres exports : `.tcx`, `.gpx`, intervalles en `.csv`. Le FIT est le premier choix pour archiver les données disponibles ; le GPS/la FC/l'allure peuvent être absents selon l'enregistrement.

Liens :
- Garmin Venu 4 : [manuel, entraînement depuis Garmin Connect](https://www8.garmin.com/manuals/webhelp/GUID-2CF5620C-E585-4E0A-9CC3-9565533EEE4D/EN-US/GUID-D6E80F0C-F319-47D1-AF95-0884F3386635.html).
- Garmin : [comment exporter des données Garmin Connect](https://support.garmin.com/fr-CA/?faq=W1TvTPW8JZ6LfJSfK512Q8).

## Fichier ou MCP ?

**Décision temporaire** : commencer avec l'export de fichier Garmin Connect fourni par l'utilisateur ; associer l'original versionné à la séance. Cela rend la reprise du projet indépendante de la mémoire de l'agent.

**Évolution éventuelle** : Garmin annonce une **Personal API** permettant de consulter des activités en JSON et FIT avec une clé personnelle et une authentification. Un importateur/MCP pourrait ensuite alimenter les fichiers du dépôt, selon les outils réellement disponibles et les autorisations de l'utilisateur. Aucun connecteur direct Garmin exploitable n'a été trouvé dans les plugins consultés au moment de cette rédaction ; ne pas prétendre le contraire sans vérification. **Jamais de clé/token dans un dépôt public.**

Référence : [Garmin Connect Developer Program — Personal API](https://developer.garmin.com/gc-developer-program/overview/).

## Traçabilité et autonomie

À chaque retour sportif, le Coach doit, si les outils et informations sont disponibles dans le tour en cours :
1. Identifier la séance et ses fichiers par `id`.
2. Déposer et versionner le fichier réel dans `personnel/pieces-jointes/`.
3. Renseigner `fait`, `sensations` et toute adaptation décidée **dans le seul fichier JSON de la séance concernée**.
4. Compléter l'historique `personnel/sante/` si pertinent.
5. Commit, journaliser les changements et répondre de manière concise.

**Pas de synchronisation automatique ni d'arrière-plan** tant qu'un mécanisme distinct n'est pas configuré. **Aucune modification d'IHM par le Coach**.

## 12 novembre 2026 — Entraînements Renfo systématiques (FIT Workout)

- **Nouvelle consigne explicite du propriétaire :** chaque Renfo dispose d'un **FIT Workout**, exactement comme les courses, téléchargeable depuis le détail de séance. Générer/régénérer automatiquement le FIT lors de chaque création ou modification du Renfo, avec `node scripts/generer-garmin.cjs renfo-AAAA-MM-JJ`, vérifier et attacher via `pieces_jointes`.
- **Fichiers initiaux :** **14 Renfos** conservés entre le 12 novembre et le 12 décembre, après suppression volontaire du dimanche 15 et déplacement du mardi 17 au lundi 16. Chaque séance a sa propre pièce `personnel/pieces-jointes/seances/<id>/prevu/<id>.fit`. Aucune activité réalisée ni métrique Garmin n'est inventée.
- **Sport FIT :** `strength_training` (5), type de fichier `Workout` (5). Chacun des 14 programmes actuels est organisé en **17 pas** : mise en route de 240 s, **9 séries ouvertes** (3 exercices × 3 séries) à valider manuellement, **6 pauses minutées** de 45 s ou 60 s entre les séries, retour au calme de 240 s. Les **780 s déterminés** sont uniquement l'échauffement, les pauses et le retour au calme ; la durée totale de 30–36 min n'est **pas** représentée par un faux chronomètre, car les durées par répétition sont données comme plages et dépendent de l'exécution.
- **Informations dans les pas :** noms d'exercices courts, nombres de répétitions par série, repères de maintien et repos entre répétitions dans les notes FIT. Aucun objectif cardiaque, charge ou allure inventé. Les gestes connus sont reconnus par le générateur ; un nouvel exercice ou changement de logique de séries nécessite une extension contrôlée, jamais un FIT approximatif.
- **Validation :** contrôler l'en-tête, les CRC, les types et noms de pas, le sport musculation, la durée des pauses, l'absence d'avancement automatique fictif et la présence de 14 liens de téléchargement. La publication du lien ne prouve **pas** l'import effectif dans Garmin Connect ni le comportement de la Venu 4 ; vérifier à l'occasion d'un essai sur montre.
- **Sources techniques :** [Garmin FIT Workout](https://developer.garmin.com/fit/articles/file-types/workout.html) et [Garmin — entraînement de musculation sur montre](https://support.garmin.com/fr-FR/?faq=LcYGZd4EOZ9PkTY5YRvin5).

## 12 novembre 2026 — Étirements dans les FIT prévus de Course et Renfo

- Les **étirements de récupération doux** sont désormais une étape finale de **180 s**, associée aux groupes sollicités, pour **toutes les séances de course et de renfo non réalisées**. Ils doivent apparaître à la fois dans la **liste `etapes` de la source JSON (donc la page web)** et dans le fichier **FIT Workout** généré. Mise à jour de `duree` lorsque le programme est allongé.
- **Course** : après la marche finale, une étape `Etirements doux` de 180 s, sans objectif d'allure. Le générateur accepte l'option de 21 min de course continue comme **alternative descriptive**, sans la substituer aux fractions principales. Une course effectuée avant cette règle n'est **pas** réécrite : la séance du 11 novembre et son FIT 7 étapes restent inchangés.
- **Renfo** : après le retour au calme de 4 min, étape `Etirements doux` de 180 s avec consigne brève ; le FIT passe de 17 à **18 pas** (9 séries ouvertes, 6 repos minutés, préparation et retour au calme, puis stretching). Le temps explicite passe de **780 s à 960 s** ; la durée exacte de réalisation dépend encore de la vitesse d'exécution des séries ouvertes.
- **Règle à l'avenir** : nouveau programme ou modification de `etapes` dans une course/un renfo non réalisé ⇒ vérifier que le bloc de stretching est présent, générer/régénérer le FIT, mettre à jour l'unique lien `pieces_jointes`, vérifier ses CRC et sa concordance avec le JSON. Ne jamais générer à partir d'une réalisation supposée.

## 12 novembre 2026 — Étirements seuls pour la récupération finale du Renfo

- Nouvelle préférence explicite du propriétaire, prioritaire sur les anciennes prescriptions : lorsqu'un Renfo prévu contient un bloc d'étirements doux, ces étirements font office de retour au calme. Ne pas ajouter 4 min de mouvements doux/respiration après les exercices. Conserver la mise en route de 4 min au début.
- Application aux 14 Renfos non réalisés : mêmes dates, IDs, exercices, séries, pauses, aides PNG, étirements, fait et sensations ; suppression du seul bloc redondant « Retour au calme ». Durée indicative 33–39 → 29–35 min, FIT Workout prévu 18 → 17 pas ; temps minuté 960 → 720 s. Aucune modification des sorties Course, des séances Kiné ou des activités déjà réalisées.
- Pour les Renfos futurs : cinq étapes chronologiques, FIT synchronisé avec le JSON et vérification de l'absence de retour au calme supplémentaire. Aucune preuve d'exécution sportive créée.
- Le générateur refuse les Renfos combinant un retour au calme distinct et les étirements.
