# Décisions techniques — Maturation

Les décisions individuelles et la planification sportive se trouvent dans [personnel/DECISIONS.md](../personnel/DECISIONS.md), sans copie des données dans ce document.

- **Site** : publication GitHub Pages via Actions, `main`, calendrier hebdomadaire et affichage statique en lecture seule.
- **Rôles** : Coach exclusivement chargé des données sous `personnel/` ; Maturation exclusivement chargée du rendu, des conventions et de la publication. Pas de cumul automatique.
- **IHM** : aucune évolution visuelle sans demande/accord ; ✓ « Fait » uniquement après confirmation, aucune case interactive ou stockage local ; objectifs issus du fichier personnel.
- **Qualité** : prévalidation JavaScript/données/témoin par `node scripts/verifier-site.cjs`.
- **Déploiement** : `build` et `deploy` séparés ; contrôle API de l'artefact suite aux erreurs observées dans [actions/deploy-pages#451](https://github.com/actions/deploy-pages/issues/451).
- **Automatisation** : tout commit Coach sur `personnel/**` déclenche Pages, sans lancement manuel ; vérifier l'état `success` après publication.
- **Ségrégation récente** : déplacement du programme, du suivi santé et du futur espace Garmin sous `personnel/`, **sans second exemplaire versionné**. Les fichiers construction ne reprennent pas le programme individuel.
- **Historique** : les anciennes règles de suivi local, et la publication Pages classique depuis la branche, ont été abandonnées. Les décisions plus anciennes restent accessibles dans les commits Git.

## 11 novembre 2026 — Absence d'indexation souhaitée

- Le site GitHub Pages **reste public par choix explicite**, mais le propriétaire **ne veut pas qu'il apparaisse dans les résultats des moteurs de recherche**.
- **Choix technique** : ajout de `<meta name="robots" content="noindex, nofollow">` et `<meta name="googlebot" content="noindex, nofollow">` dans `index.html`, **sans changement visuel**.
- **Pas de `robots.txt` projet trompeur** : sur `hameaufl.github.io/programme-sport/`, seul le fichier à la racine de l'hôte est applicable. Une interdiction de crawl empêcherait potentiellement Google de lire `noindex`.
- **Prévention** : test intégré à `scripts/verifier-site.cjs`, échec de publication si `noindex` manque ; procédure inscrite dans `AGENTS.md`.
- **Limitations** : les moteurs peuvent différer dans leur respect de `noindex` ; le dépôt public et les données JavaScript/Garmin ne deviennent pas privés ni systématiquement désindexés ; l'URL peut toujours être partagée.

## 11 novembre 2026 — Réponses du Coach concises et exclusivement métier

- **Décision utilisateur** : limiter fortement la verbosité du Coach ; répondre directement, brièvement, sans longs paragraphes, idéalement 1 à 3 phrases lorsqu'un retour est simple.
- **Périmètre strict** : parler uniquement des entraînements, séances réalisées, sensations, récupération et ajustements pertinents. **Ne pas signaler ou récapituler les changements de Maturation non pertinents** pour son métier.
- Les détails complets sont poussés dans `personnel/` et consultables sur Mon Rythme ; **ne pas les répéter** dans le chat.
- En cas de blocage effectif d'un commit ou d'une publication du Coach, ou d'une alerte importante, le signaler clairement et brièvement.
- Cette décision concerne le **style de réponse du Coach**, non les décisions sportives et non l'obligation de versionner son travail.

## 11 novembre 2026 — Lien vers Mon Rythme et détail de séance par le Coach

- Le Coach **ajoute un lien** vers [Mon Rythme](https://hameaufl.github.io/programme-sport/) lorsqu'il répond à un retour de séance ou une modification du programme.
- Ce lien peut ouvrir une application standalone installée sur Android ou le navigateur : **aucune promesse d'ouverture dans le lanceur**.
- La brièveté est une préférence par défaut : **le Coach peut fournir le détail d'une séance** à la demande ou lorsque celui-ci est utile (étapes, durée, progression et récupération pertinentes). Ne pas supprimer ces précisions au seul motif d'être très concis.
- Le Coach ne commente toujours pas les interventions de Maturation étrangères à son métier.
- Cette règle porte uniquement sur le **contenu des réponses du Coach** ; aucun nouvel élément graphique dans le site, aucune modification sportive.
