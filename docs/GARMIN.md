# Garmin Venu 4 — futur flux de pièces jointes

**Statut : fonctionnalité envisagée, aucun fichier Garmin ajouté, aucun MCP Garmin connecté, aucune interface modifiée.**

## Objectif et répartition des rôles

- **Coach** : reçoit les retours, analyse les exports Garmin, versionne les fichiers réellement transmis, met à jour `programme.js` et les comptes rendus, décide ou conserve le programme. Crée éventuellement un fichier d'entraînement prévu pour la montre **après validation technique de son format**.
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

Pour le moment, `programme.js` n'a **aucun** champ `pieces_jointes`. À la première pièce jointe, le Coach peut utiliser ce schéma déjà documenté **si l'IHM actuelle n'a pas besoin d'être modifiée** :

```json
"pieces_jointes": [
  {"role":"entrainement_prevu","chemin":"pieces-jointes/seances/course-AAAA-MM-JJ/prevu/nom.fit","format":"fit"},
  {"role":"activite_realisee","chemin":"pieces-jointes/seances/course-AAAA-MM-JJ/realise/nom.fit","format":"fit"}
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
2. Déposer et versionner le fichier réel dans `pieces-jointes/`.
3. Renseigner `fait`, `sensations` et toute adaptation décidée dans `programme.js`.
4. Compléter l'historique `sante/` si pertinent.
5. Commit, journaliser les changements et répondre de manière concise.

**Pas de synchronisation automatique ni d'arrière-plan** tant qu'un mécanisme distinct n'est pas configuré. **Aucune modification d'IHM par le Coach**.
