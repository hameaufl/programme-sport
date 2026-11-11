# Registre des décisions utilisateur

**Convention :** les décisions sont ordonnées chronologiquement. Les décisions récentes prévalent sur les propositions ou choix précédents. « Abandonné » signifie qu'il ne faut **pas** le rétablir sans nouvelle demande.

## 1. Origine du projet et simplification

- Objectif initial : consulter son organisation quotidienne, semaine par semaine, et ses sorties.
- Première hypothèse : quatre sorties par semaine. **Abandonnée.** Le nombre de sorties doit provenir du programme réel, jamais d'une règle de l'interface.
- Première idée de suivi par cases/progression. **Abandonnée provisoirement**, puis **réintroduite explicitement plus tard** sous la forme de cases « Réalisé » avec stockage local.
- Champs matin/midi/soir et saisies dans l'interface. **Abandonnés.** Le calendrier présente uniquement des sorties réellement programmées et leurs informations.
- Utilisation sur téléphone et ordinateur, même URL, interface responsive et volontairement minimale.
- Le propriétaire transmet des programmes ; un agent met à jour les **fichiers statiques** du dépôt. Aucun formulaire d'administration.

## 2. Hébergement et accès

- Netlify avait été envisagé, puis l'utilisateur souhaitait provisoirement un site privé.
- Décision **remplaçante** : aucune donnée personnelle ne serait gérée au sein du programme statique et **GitHub Pages** héberge la page. Dépôt choisi : `hameaufl/programme-sport`, `main`.
- Le site et les **informations statiques publiées** sont publics. Aucune connexion utilisateur ni base de données nécessaires pour consulter le programme.
- Les **coches de réalisation** constituent un suivi personnel : elles restent seulement dans le navigateur, pas dans le dépôt public.

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

## 4. Structure et apparence de l'interface

- Bannière titre : **« Mon programme. »**. « , simplement » a été supprimé.
- Supprimer le sous-titre de départ « Départ mercredi… Trois séances avec course par semaine. » ; pas d'autre sous-titre improvisé.
- Afficher la date du jour en haut à droite, **dynamique**, pas en dur ; mise à jour lorsque la journée change.
- Le bouton **« Semaine en cours »** est dynamique et doit rester. L'ouverture affiche directement la semaine et le jour courant.
- Les semaines de calendrier vont du **lundi au dimanche**.
- « Mes objectifs » concerne des **objectifs de trimestre ou plus**, non des cartes/jalons hebdomadaires. Seul le titre est conservé, avec **une puce** « La priorité est de retrouver des sensations agréables, sans recherche de performance. ». L'encart « Reprendre le sport… » et les cinq objectifs intermédiaires visuels ont été supprimés.
- Sous le titre **« Mon calendrier »**, supprimer **« Semaines du lundi au dimanche · séances de course et de kiné. »**. Ne pas remplacer ce texte.
- Supprimer le pied de page « Mon Rythme · Site statique publié avec GitHub Pages. », sans remplacement.
- Interdiction nouvellement explicite : **un agent ne doit ajouter aucun élément graphique ou visuel sans demande ou approbation préalable** ; il peut proposer si valeur ajoutée, puis attendre l'accord. Règle inscrite dans `AGENTS.md`.

## 5. Suivi par cases

- Après un premier souhait de supprimer les coches, l'utilisateur les **redemande explicitement** pour suivre les séances effectuées.
- Stockage demandé : **local dans le navigateur** (`localStorage`), notamment pour un raccourci Android lancé en mode standalone.
- Les cases apparaissent dans le détail du jour et la liste hebdomadaire ; leur état se reflète dans les deux vues. Ne pas publier les données de suivi dans GitHub.
- Libellé de la case : **« Réalisé »** (masculin, selon dernière demande), et non « Réalisée ».
- Garder les identifiants des séances inchangés lors d'un renommage pour préserver l'association à la coche.
- Deux appareils ont des `localStorage` potentiellement indépendants : aucune synchronisation automatique n'a été demandée.

## 6. Continuité entre agents LLM

- Décision du propriétaire : documenter les choix et le contexte afin qu'un **nouvel agent reprenne le projet sans l'historique de cette conversation**.
- Fichiers de reprise : `AGENTS.md`, `docs/REPRISE.md`, `docs/CONTEXTE.md`, `docs/DECISIONS.md`, `docs/JOURNAL.md`.
- Garder le registre et le journal à jour après de futures interventions.
- Le dépôt étant **public**, transférer une **synthèse fonctionnelle et décisionnelle**, et non des secrets ni une transcription complète privée.

## 7. Libellé des coches — décision la plus récente (11 novembre 2026)

- **Nouvelle demande explicite :** remplacer « Réalisé » par **« Fait »** dans les deux vues et les libellés d'accessibilité.
- Ce choix **remplace** la décision précédente demandant le masculin « Réalisé ». Conserver l'historique ci-dessus pour la traçabilité, mais appliquer **« Fait »** comme libellé actif.
- Aucune modification des identifiants de séance, des dates, ni du stockage local `mon-rythme-suivi-v1` ; les coches déjà enregistrées restent associées aux mêmes séances.

## 8. Descriptions des séances — décision du 11 novembre 2026

- **Descriptions très concises** : libellés directs, majoritairement sans verbe conjugué.
- **Étapes présentées en puces**, pas en liste numérotée.
- **Pas de doublons** entre l'objectif, le détail et les étapes ; supprimer les paragraphes redondants. Les 15 courses actuelles se présentent avec durée, liste brève du déroulé et éventuelle option de fin de cycle.
- Préserver le programme réel, ses dates et ses identifiants, les trois kinés et les coches locales.
- Interdiction inchangée : aucun élément graphique supplémentaire sans accord du propriétaire.

## 9. Accompagnement après chaque séance — 11 novembre 2026

- L'utilisateur transmettra des **comptes rendus après ses sorties** afin d'ajuster le programme au fur et à mesure.
- Demande initiale : adapter les sorties de la semaine suivante. **Correction immédiate et prioritaire** : **adapter dès le lendemain / dès le jour d'après**, sans attendre la semaine suivante.
- Cela signifie : revoir la planification dès le retour, ajuster la sortie du lendemain **si elle existe** ; sinon ajuster la **prochaine séance prévue** en préservant les jours de récupération.
- Selon les sensations : réduire, stabiliser ou augmenter prudemment durée et distance ; la reprise agréable et l'absence de douleur restent prioritaires.
- Le bracelet ayant des programmes prédéfinis, ne pas inventer des séances incompatibles avec ses modes sans en discuter.
- **Confidentialité du dépôt public** : consigner ici la méthode et les choix fonctionnels, **pas les comptes rendus privés ou informations de santé personnelles** sans demande explicite.

