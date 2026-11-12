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

## 12 novembre 2026 — Renfo à domicile, progressif et explicable

- L'utilisateur souhaite compléter le programme de course et de kiné par des séances **« Renfo »**, sans augmentation brusque de charge. Il **autorise l'intégration des animations et du renfo dans Mon Rythme** après examen des propositions. Pour le matériel et les préférences de pédagogie, consulter `personnel/CONTEXTE-COACH.md`.
- **Décision Coach : commencer par une séance courte par semaine** (17 et 24 novembre, 1er et 8 décembre), de 10–12 min, avec trois mouvements lents sur tapis ou, de façon conditionnelle, sur ballon. Une seule série facile de six répétitions par geste (ou six par côté). Pas d'élastique, de poids ni d'impact.
- **Séance A** : pont de bassin au sol, ouverture du genou sur le côté, bras et jambe opposés sur le dos. **Séance B** : bras et jambe opposés à quatre pattes, ouverture du genou sur le côté, pont de bassin sur ballon (facultatif ; à remplacer ou sauter si instable).
- **Sécurité / tolérance** : compte tenu des douleurs au pied droit à l'appui et à la hanche droite, le renfo reste facultatif, sans douleur croissante ; pas d'hyperextension du genou, ni travail sur ballon si l'équilibre ou la douleur ne le permet pas. Demander au kinésithérapeute un contrôle des exercices de genou/hanche si nécessaire. Les autres séances et leur statut restent inchangés.
- **Supports** : cinq GIFs schématiques indépendants et un lien `?` dans les exercices correspondants, ouvrant directement le GIF dans le même onglet pour pouvoir revenir avec la navigation du téléphone. Le calendrier affiche « Course à pied » même quand le champ `type` historique est absent ; seules les vues d'interface traitent cette différence.
- **Réévaluation** : une seconde séance de renfo hebdomadaire et la hausse éventuelle à cinq sorties de course ne seront envisagées que si les symptômes et la récupération le permettent.

## 12 novembre 2026 — Révision explicite du renfo après essai visuel

- **Demande utilisateur :** faire **environ 3 fois plus long** que les 10–12 minutes initiales, et passer de 1 à **3 renfos par semaine**, répartis, avec retours réguliers pour ajuster. Exemple des durées d'exercices encadrés en kiné dans `personnel/CONTEXTE-COACH.md` ; ces volumes ne sont pas repris intégralement dans l'autonomie.
- **Décision sportive :** 12 séances Renfo sur les semaines du 16 novembre au 13 décembre, **mardi, jeudi et samedi**, de **30–36 min prévues**. Chaque séance combine trois mouvements, chacun fait trois fois ; mise en route ~4 min, repos ~45 s entre mouvements et ~90 s entre tours, retour au calme ~4 min. Alternance des variantes A et B avec ballons facultatifs. Charges exclusivement au poids du corps avec tapis et ballon disponible.
- **Prudence :** compte tenu de la douleur plantaire droite à l'appui (5–6/10), de la hanche droite (5/10) et de l'hyperlaxité, le volume prévu n'est **pas une obligation**. Réduire/omettre un mouvement ou une séance si symptôme présent ou accru, y compris samedi lorsqu'une quatrième sortie courte est également prévue ; maintenir dimanche sans séance. L'augmentation de la fréquence est une **prévision demandée**, non une preuve de bonne tolérance.
- **Illustrations** : les cinq **PNG originaux validés par l'utilisateur** remplacent les GIF mal affichés ; banque organisée `assets/renfo/banque.json` et liens obligatoires dans `aidesExercices[].png`. Petit `?` ouvrant une boîte intégrée fermable `×`; même règle pour un exercice répété ou déjà connu. En cas de nouvelle gestuelle non encore illustrée, produire le PNG avant publication.
- **Périmètre** : les séances de course/kiné, comptes rendus, FIT et statuts sportifs existants sont préservés. Revoir la charge de renfo et de course après les premiers ressentis.

## 12 novembre 2026 — Renfo immédiatement et présentation sans paragraphes

- **Demande** : ajouter trois séances Renfo **dès cette semaine**, en conservant la fréquence de trois par semaine déjà prévue ensuite, et réécrire toutes les descriptions sous forme de listes chronologiques compactes où les temps figurent sur chaque puce.
- **Dates nouvelles** : jeudi **12**, samedi **14**, dimanche **15 novembre**, non réalisées, variantes A/B/A à la charge indicative de 30–36 min ; ne pas les déclarer réalisées. Le dimanche est un créneau **facultatif**, du fait de la séance du samedi et de la course du lundi 16 ; l'accumulation et les douleurs à l'appui ou à la hanche motivent l'annulation/la réduction si nécessaire.
- **Contenu** : 15 Renfos au total, chacun avec une mise en route ~4 min, trois exercices chronométrés et un retour au calme ~4 min ; conserver tous les liens de la banque PNG. Des chronos indicatifs sont des objectifs de séance, non des activités Garmin réalisées ou une prescription à tenir malgré la douleur.
- **Casquette Maturation strictement ponctuelle** : pour les Renfos, masquer les textes Objectif/Détails sous la liste tout en préservant les champs sources ; enregistrer la règle dans `AGENTS.md` et `docs/ROLES.md`, adapter les tests. Aucun changement aux séances Course/Kiné.
