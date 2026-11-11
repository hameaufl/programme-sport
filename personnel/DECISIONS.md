# Décisions du domaine personnel et sportif

**Historique des choix, y compris ceux abandonnés.** Source de vérité opérationnelle unique : `personnel/programme.js`. Le Coach complète ce registre après chaque décision sportive.

## 3. Programme sportif (novembre–décembre 2026)

- Source fournie : PDF « Programme fractionné I » (La Clinique du Coureur), initialement 8 semaines.
- Demande de le condenser en 5 semaines et d'accélérer légèrement les durées courues. Proposition initiale : 5 sorties/semaine dont 3 courses et 2 marches.
- Décision **remplaçante** : retirer les sorties sans course ; conserver **3 courses/semaine** sur 5 périodes de 7 jours, avec repos.
- Bracelet à programmes prédéfinis : 3×(2min marche + 3min course)+2min marche ; 3×(2min marche + 5min course)+2min marche ; également 21, 30, 40 min en continu parmi ses choix.
- L'utilisateur demande **2M+3C** et **2M+5C** comme noms des séances ; **ne plus employer les noms « mode A » et « mode B »**.
- 21 min en continu seulement **facultatif** en fin de cycle ; 30/40 min non intégrés.
- Date de départ modifiée plusieurs fois au gré du passage à minuit ; **date définitive du programme actuel : mercredi 11 novembre 2026**, dernière séance le 14 décembre.
- Les séances sont datées et ne doivent pas être décalées automatiquement.
- Kiné : dates **4, 9 et 18 novembre 2026** ; intitulé finalement demandé **« Kiné · Genoux »**, et non « Kiné · renforcement des genoux ». Aucun horaire.
- Les semaines du calendrier doivent commencer **le lundi**, même si le cycle de course de 5 périodes de 7 jours a démarré un mercredi ; tous les enregistrements ont été regroupés par lundi **sans changer leurs dates**.

## 9. Accompagnement après chaque séance — 11 novembre 2026

- L'utilisateur transmettra des **comptes rendus après ses sorties** afin d'ajuster le programme au fur et à mesure.
- Demande initiale : adapter les sorties de la semaine suivante. **Correction immédiate et prioritaire** : **adapter dès le lendemain / dès le jour d'après**, sans attendre la semaine suivante.
- Cela signifie : revoir la planification dès le retour, ajuster la sortie du lendemain **si elle existe** ; sinon ajuster la **prochaine séance prévue** en préservant les jours de récupération.
- Selon les sensations : réduire, stabiliser ou augmenter prudemment durée et distance ; la reprise agréable et l'absence de douleur restent prioritaires.
- Le bracelet ayant des programmes prédéfinis, ne pas inventer des séances incompatibles avec ses modes sans en discuter.
- **Confidentialité du dépôt public** : consigner ici la méthode et les choix fonctionnels, **pas les comptes rendus privés ou informations de santé personnelles** sans demande explicite.

## 11. Santé personnelle versionnée — 11 novembre 2026

- Demande d'un **répertoire dédié `sante/`** pour un historique versionné des antécédents, aspects mécaniques, autres contraintes et comptes rendus utiles au Coach.
- Les modèles `sante/PROFIL.md` et `sante/SUIVI.md` sont créés **sans information médicale personnelle inventée ou enregistrée**.
- Le propriétaire souhaite des informations de santé **dans un historique Git versionné** ; cette décision remplace l'ancien refus absolu de toute donnée personnelle versionnée.
- **Point restant à clarifier avant une écriture sensible** : le dépôt actuel est **public** et utilisé pour GitHub Pages. Vouloir un historique versionné ne vaut pas confirmation de publication publique de données de santé. Informer le propriétaire et confirmer la destination ainsi que sa visibilité avant de pousser un antécédent ou un symptôme ; possibilité d'un dépôt santé **privé distinct**.
- Les coches « Fait » demeurent en `localStorage` indépendamment de ce journal santé ; aucune synchronisation implicite.

## 14. Pièces jointes Garmin Venu 4 — possibilité future

- Montre utilisée : **Garmin Venu 4**.
- Pièces jointes possibles par séance : **entraînement prévu** compatible Garmin (après validation technique), **activité réellement enregistrée** (export FIT, GPX, TCX, CSV selon disponibilité).
- Les rapports peuvent inclure GPS, distances, vitesses/allures, fréquence cardiaque, intervalles et toute mesure **effectivement présente** ; ne pas en inventer.
- Source possible initiale : **export d'activité Garmin Connect fourni par le propriétaire**. Un import **MCP/API** est envisagé mais non confirmé ni relié aujourd'hui.
- Structure et conventions documentées dans `docs/GARMIN.md` et `pieces-jointes/README.md`. **Aucune pièce jointe Garmin réelle déposée à cette date**. Aucun lien ou panneau de pièce jointe ajouté à l'IHM sans demande/approbation.
- GitHub doit être la **mémoire persistante** des fichiers et décisions ; ne pas dépendre de la mémoire d'une conversation ou d'un agent.

## 20. Séparation personnelle du dépôt — 11 novembre 2026

- **Une seule source versionnée de programme :** `personnel/programme.js`. Aucune copie à la racine.
- Santé, rapports, futures pièces Garmin, choix et historique sportifs appartiennent au dossier `personnel/`.
- Les documents techniques dans `docs/` n'ont pas vocation à reproduire les données sportives.
- Le Coach modifie les données personnelles et commit ; GitHub Actions publie automatiquement sur push vers `main`.
- Les données restent publiques par décision explicite du propriétaire ; aucun bilan ni compte rendu réel n'a encore été transmis.
