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

## 11 novembre 2026 — Traitement du compte rendu de la première séance de kiné

- Retour reçu pour la séance du **4 novembre** : statut réalisé dans `personnel/programme.js` et faits consignés dans `personnel/sante/SUIVI.md`.
- Décision Coach : **maintenir provisoirement** le programme de course sans augmentation sur la base de ce seul retour rétrospectif. Réévaluer selon les sensations actuelles et les prochains comptes rendus, tout particulièrement la présence éventuelle de douleurs. Aucune autre séance considérée réalisée sans retour explicite.

## 12 novembre 2026 — Mise en forme de la kiné du 4 novembre après évolution de l'affichage

- Pour `kine-2026-11-04`, afficher des sensations **nominales et concises** en conservant les seuils rapportés (douleurs dès la plage 60–70 kg, charge ramenée à 50 kg).
- **Structures sollicitées probables, non attestées médicalement :** extension du genou à la presse / quadriceps fémoral ; stabilisation et abduction de hanche à la marche latérale avec élastique / moyen fessier et abducteurs coxo-fémoraux.
- Source des structures : `personnel/programme.js` uniquement (champ facultatif `structuresSollicitees`) ; `personnel/sante/SUIVI.md` reste le compte rendu fidèle avec la parole complète et les deux séquences d'étirements.
- Aucune progression sportive supplémentaire sans retours actuels ; aucune autre séance ou donnée modifiée.

## 12 novembre 2026 — Fréquence de course souhaitée et seuil de prudence

- L'utilisateur souhaite une **fréquence cible de cinq sorties hebdomadaires**, avec délégation au Coach pour réduire à quatre, trois ou moins selon l'évolution réelle, en privilégiant une reprise régulière, tranquille et sans blessure.
- **Décision immédiate du Coach : ne pas prescrire cinq sorties dès maintenant.** La première course du 11 novembre a entraîné une douleur plantaire droite **5–6/10 à l'appui** et une douleur de hanche droite **5/10**. La tolérance et l'évolution depuis cette sortie restent inconnues ; des douleurs à ces niveaux ne doivent pas être traitées comme de simples gênes normales.
- Préparer **un quatrième créneau hebdomadaire très court et facultatif** les 21 et 28 novembre, les 5 et 12 décembre, avec **1 × (2 min marche + 3 min course) + 2 min marche**, soit **7 min dont 3 min de course**. Ces sorties sont **conditionnelles**, pas des obligations : ne les effectuer que si les douleurs à l'appui et à la hanche se sont résorbées, sans gêne croissante ni récupération insuffisante après la dernière sortie. Le voisinage avec la séance du vendredi impose une vigilance accrue ; privilégier l'annulation/le report plutôt que courir deux jours de suite avec des symptômes.
- Garder les **15 sorties initiales, dont celle du 11 novembre réalisée, aux mêmes dates et avec les mêmes champs** ; dates de kiné inchangées. Les séances existantes et leur charge ne sont pas augmentées par cette opération.
- **Cinquième sortie hebdomadaire = objectif à réexaminer plus tard**, uniquement après tolérance stable de plusieurs semaines et, si besoin, avis du kinésithérapeute ; ne pas la planifier automatiquement. La priorité demeure le confort et la récupération, et la fréquence effective peut rester trois ou moins si nécessaire.
- La séance du **13 novembre** ne doit pas être courue si la douleur plantaire droite à l'appui ou la douleur de hanche persiste. La douleur qui augmente pendant la sortie, une boiterie ou une aggravation le lendemain justifient de réduire/arrêter et de demander un avis professionnel en cas de persistance.
- Des séances **FIT Workout prévues** sont associées à chaque nouvelle sortie (3 étapes, 420 secondes), sans inventer d'activité Garmin réalisée ni d'intensité chiffrée.
