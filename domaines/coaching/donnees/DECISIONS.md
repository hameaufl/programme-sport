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

## 12 novembre 2026 — Ajustement de récupération avant la kiné du 18 novembre

- **Nouvelle demande explicite** : déplacer le **Renfo du mardi 17 novembre au lundi 16 novembre**, et **supprimer** la séance du dimanche 15 novembre pour préserver la récupération. Il s'agit d'un déplacement de créneau, non d'une séance réalisée.
- **Application** : renfo-2026-11-17 est remplacé par renfo-2026-11-16 avec **exactement les mêmes exercices, temps et images PNG** ; renfo-2026-11-15 est supprimé car pas réalisé. Dimanche 15 et mardi 17 sont sans Renfo ; mardi 17 est jour de récupération avant le kiné du mercredi 18.
- **Charge à surveiller** : lundi 16 contient déjà une course prévue ; ces deux activités ne sont pas à faire coûte que coûte le même jour. En cas de douleurs au pied ou à la hanche, ou de fatigue, **réduire ou renoncer au Renfo ou à la course** selon les symptômes, sans rattraper automatiquement. Les autres dates restent inchangées.
- Suppression strictement demandée et contrôlée via marqueur `[suppression-seance-validée]` réservé aux deux séances non réalisées (15, 17 novembre) et création du lundi 16 ; aucune dérogation générale aux protections de données.

## 12 novembre 2026 — FIT Workout de Renfo pour toutes les séances

- **Demande explicite :** désormais générer systématiquement un **entraînement Garmin pour chaque Renfo**, comme pour toute course, sans redemander de confirmation. Les 14 Renfos restants après le déplacement 17→16 et la suppression du 15 novembre sont tous concernés.
- **Choix technique** : sport `strength_training`, Workout FIT séparé par séance, **17 pas dont neuf séries ouvertes** à terminer manuellement afin de préserver les plages de maintien 8–10 s et les répétitions sans inventer de temps précis ; les quatre minutes de mise en route et de récupération, ainsi que les pauses de 45/60 s, sont minutées. Aucune nouvelle prescription de charge sportive.
- **Conservation** : seuls les champs `pieces_jointes` sont ajoutés dans les 14 JSON ; `fait`, dates, IDs, chronos de description, sensations et PNG restent identiques. Aucun fichier pour les renfos supprimés.
- **Autonomie du Coach** : à tout nouveau Renfo ou changement d'étapes, générer/régénérer, valider les CRC et le programme, associer un unique FIT prévu, vérifier les liens et la publication. Les détails sont documentés dans `personnel/GARMIN.md` ; la compatibilité réelle avec l'import Garmin Connect/Venu 4 reste à tester.

## 12 novembre 2026 — Étirements post-effort ajoutés aux programmes non réalisés

- **Demande** : compléter toutes les séances de **course et de Renfo** par des étirements appropriés aux chaînes sollicitées, **aussi bien visibles dans le programme web que présents dans le fichier Garmin prévu**, et le faire systématiquement pour les futurs ajouts. **Précision ultérieure explicite** : ne **pas** modifier les séances `fait: true`.
- **Décision Coach** : pour chacune des **18 courses prévues**, une étape finale « Étirements doux » de **3 min** (mollets, fessiers, arrière des cuisses) est ajoutée après les fractions de course/marche et les éventuelles options ; la durée totale prévisionnelle passe de 7/17/23 à 10/20/26 min selon le cas. Pour les **14 Renfos prévus**, ajouter après le retour au calme une puce finale ciblant hanches/fessiers/arrière des cuisses (A) ou hanches/fessiers/épaules (B), et passer de **30–36 à 33–39 min**.
- **Risque / limites** : dans le contexte d'hyperlaxité et des douleurs au pied droit/hanche droite, les étirements doivent rester doux, stables, de faible amplitude et facultatifs en cas de douleur ; pas de rebond, d'hyperextension du genou, ni de traction forcée sur la voûte plantaire. Le bloc chronométré sert de repère, pas de preuve d'une exécution réelle.
- **Préservation** : la seule course `fait: true`, celle du **11 novembre**, n'est pas modifiée, pas plus que les kinés réalisées du 4 et 9 ou les autres données de santé. Les 32 séances prévues conservent leurs IDs, dates, contenus antérieurs, sensations, statuts et PNG ; seules les étapes prévisionnelles, la durée et la pièce FIT associée changent ou sont créées.
- **Technique** : adapter `scripts/generer-garmin.cjs` pour garantir les 180 s de stretching final de chaque plan Course/Renfo non réalisé, régénérer **32 fichiers FIT Workout** et attacher systématiquement les FIT manquants aux 14 sorties de course auparavant sans pièce. Vérifier taille, CRC, sport, étapes et cohérence source/FIT. Réévaluer selon les retours de séance sans imposer une progression.

## 12 novembre 2026 — Étirements seuls pour la récupération finale du Renfo

- Nouvelle préférence explicite du propriétaire, prioritaire sur les anciennes prescriptions : lorsqu'un Renfo prévu contient un bloc d'étirements doux, ces étirements font office de retour au calme. Ne pas ajouter 4 min de mouvements doux/respiration après les exercices. Conserver la mise en route de 4 min au début.
- Application aux 14 Renfos non réalisés : mêmes dates, IDs, exercices, séries, pauses, aides PNG, étirements, fait et sensations ; suppression du seul bloc redondant « Retour au calme ». Durée indicative 33–39 → 29–35 min, FIT Workout prévu 18 → 17 pas ; temps minuté 960 → 720 s. Aucune modification des sorties Course, des séances Kiné ou des activités déjà réalisées.
- Pour les Renfos futurs : cinq étapes chronologiques, FIT synchronisé avec le JSON et vérification de l'absence de retour au calme supplémentaire. Aucune preuve d'exécution sportive créée.

## 12 novembre 2026 — Préférence validée pour les entraînements Garmin Connect (MCP bêta)

- Le compte Garmin Connect est nouvellement créé et un **MCP personnalisé Garmin** est connecté. Sa bibliothèque et son calendrier étaient vides lors de l'inventaire ; aucun appareil n'était retourné par les lectures MCP. Cela ne valide pas encore le transfert réel à la Venu 4.
- Un **même modèle d'entraînement Garmin** est réutilisable à **plusieurs dates** de Garmin Connect, par calendrier. Éviter une copie par séance ou par jour quand les blocs sont identiques ; inspecter les entraînements distants avant création et programmer les seules dates indiquées.
- **Bêta : le Coach n'effectue AUCUNE écriture via le MCP sans demande explicite de l'utilisateur pour la séance du jour ou les jours exacts qu'il précise.** Ne pas créer, envoyer ou programmer automatiquement tout un mois ou plusieurs semaines. Une mise à jour de programme ne vaut pas ordre Garmin.
- Nommage descriptif court à convenir lors du premier usage ; aucune convention de référence mois/date ou « Renfo haut/bas » n'est décidée. Réutiliser les contenus identiques, et contrôler les variations avant d'associer plusieurs dates.
- Mon Rythme affiche les séances, dates et aides visuelles, **sans aucun document ou téléchargement d'entraînement Garmin**. Les 33 FIT locaux et leur générateur ont été supprimés du HEAD, ainsi que la publication des pièces. Les données sportives prévues et réalisées sont conservées sans altération.
- Opérations autorisées uniquement à la demande : lectures get_workouts/get_scheduled_workouts, puis upload_workout(s) et schedule_workouts sur sélection contrôlée, vérification des succès. Le module `adaptateurs/garmin/mcp.cjs` prépare en lecture seule ; le Coach effectue les appels MCP, jamais la CI ou le site.
- Les exercices de Renfo doivent conserver échauffement, séries, repos et étirements sans retour au calme redondant. Tant que la représentation Garmin des mouvements et du déroulé complet n'est pas vérifiée, ne pas créer un Renfo approximatif. Ne jamais inventer des zones cardiaques et ne pas conclure à une réalisation ou une synchro depuis la seule programmation.

## 12 novembre 2026 — Nouvelle préférence Garmin : gestes officiels, pédagogie, animation et suivi du matériel

- **Décision utilisateur applicable aux futurs exercices et révisions de Renfo :** le Coach sélectionne **autonomement** ses mouvements exclusivement dans le **catalogue officiel des exercices Garmin**. Il vérifie catégorie, identité du geste, éventuelle fiche/description, besoin de matériel et pertinence pour le programme. Il ne crée aucun mouvement inédit, ne rebaptise pas un mouvement voisin et ne suppose jamais un exercice « reconnu » sans vérification ; le Coach garde la responsabilité du choix des exercices ainsi que du volume, des séries et des répétitions adaptés.
- **Préférence pédagogique forte :** exercices documentés et, idéalement, animés sur la Venu 4. **Limite vérifiée du constructeur :** Garmin ne fournit les animations sur montre que pour certains entraînements **prédéfinis**, et **pas pour les séances personnalisées** créées dans Garmin Connect/MCP, même avec des exercices classifiés. Le Coach doit expliciter cette différence et privilégier un vrai entraînement prédéfini animé si l'animation est impérative, sans le substituer automatiquement au plan personnalisé ; choix d'arbitrage restant ouvert.
- **Nouvelle source de vérité de l'équipement :** `domaines/coaching/donnees/equipements.json`, modélisée et validée indépendamment des prescriptions. Déclarés disponibles : tapis de sol et gros ballon de gymnastique (~80 cm). Déclarés absents : élastiques de résistance et haltères. Aucun autre accessoire n'est confirmé. Le poids du corps est privilégié. Les envies d'achat ne prouvent pas la disponibilité ; seul un retour explicite du propriétaire actualise l'inventaire.
- **Portée :** ne modifier aucune séance déjà écrite ou réalisée du seul fait de cette nouvelle préférence. Aucun envoi ni création Garmin n'est autorisé par cette décision : la règle de bêta imposant des dates explicitement demandées demeure. Les anciens choix de dessins PNG concernent la présentation Web et ne confèrent pas un statut officiel Garmin aux anciens mouvements.
- **Références fabricant :** https://support.garmin.com/en-US/?faq=IPD6X8JSLBAUQOXvz7zBO6 ; documentation Venu 4 https://www8.garmin.com/manuals/webhelp/GUID-2CF5620C-E585-4E0A-9CC3-9565533EEE4D/EN-US/GUID-B7EDF898-AC46-4504-A12A-A1FFA1756878.html.

## 12 novembre 2026 — Arbitrage définitif sur les animations Garmin Venu 4

- **Décision explicite du propriétaire :** le Coach doit continuer à construire **des entraînements Renfo personnalisés**, avec uniquement des exercices **effectivement classifiés dans le catalogue officiel Garmin**. Le Coach recherche et choisit lui-même ces mouvements, sans demander au propriétaire de sélectionner les exercices à sa place. Aucune invention ni assimilation d'exercices voisins.
- **Priorité pédagogique :** pour un exercice encore inconnu, le propriétaire souhaite consulter les explications ou démonstrations avant sa séance, dans l'écosystème Garmin ou depuis une autre source fiable. Le Coach fournit une dénomination Garmin exacte, un nom français, des consignes accessibles et des liens documentaires **vérifiés** quand ils existent, sans inventer une animation.
- **Révision de priorité :** les animations sur la montre **ne sont plus une condition nécessaire** ; il est acceptable qu'une séance personnalisée sur Venu 4 ne comporte aucune animation. Il n'est plus demandé de privilégier systématiquement les séances Garmin prédéfinies animées. Le Coach ajuste lui-même les séries, répétitions, temps de maintien, repos et volume, tout en préservant la fidélité du mouvement catalogué.
- **Matériel et sécurité inchangés :** l'inventaire structuré `domaines/coaching/donnees/equipements.json` reste la source de référence ; poids du corps/tapis/ballon ~80 cm, autres équipements absents ou non confirmés. La phase bêta Garmin reste stricte : aucune création, modification, programmation ou transmission via MCP hors demande explicite pour les dates indiquées. Les séances précédemment planifiées ne sont pas retouchées par cette seule décision.

## 12 novembre 2026 — Synthèse visible de la stratégie du Coach, domaines inchangés

- **Demande du propriétaire :** confirmer la séparation forte entre l'acquisition/détention de l'information métier et sa représentation dans l'add-on Web ; conserver chaque fait dans Santé, Activités, Planification ou Coaching. Les futurs agents doivent lire et suivre cette règle avant toute modification.
- **Nouvelle page :** « Le cap du Coach », accessible depuis Mon Rythme, présente l'objectif personnel canonique, une ligne directrice actuelle, des intentions à venir **conditionnelles** et des points d'attention. Ce ne sont ni des entraînements déjà décidés ni une copie des notes de raisonnement. Les informations doivent rester dans un modèle Coaching indépendant ; seule une projection à liste blanche est publiée.
- **Responsabilité durable du Coach :** mettre à jour `domaines/coaching/donnees/orientation.json` et les justifications `DECISIONS.md` / `JOURNAL.md` quand son orientation évolue à la suite de nouveaux faits ou des objectifs exprimés, sans modifier des données médicales hors de leur domaine. Ne pas écrire à la suite d'un simple « Mets-toi à jour » en lecture seule.
- **Choix de présentation :** supprimer de « Mon suivi santé » la phrase sous le titre (« L'essentiel de ma reprise, sans les notes de fond. ») ainsi que la phrase en bas expliquant les sources et l'absence d'avis médical ; ne pas les remettre.
- **Confidentialité :** le site standard et les sources du dépôt sont publics ; la projection ne publie ni les sources médicales ni les notes du Coach. La politique restreinte supprime entièrement cette projection.

