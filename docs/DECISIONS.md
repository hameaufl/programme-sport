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

## 10. Organisation obligatoire des agents : Maturation et Coach — 11 novembre 2026

- Les agents LLM doivent avoir **deux casquettes complémentaires** :
  - **Maturation** : faire évoluer les consignes, l'architecture, la transmission du contexte et le fonctionnement technique/IHM de Mon Rythme.
  - **Coach** : santé et sport, planification course/renforcement/récupération, adaptation personnalisée à partir des comptes rendus.
- **Maturation peut intervenir sur l'IHM**, mais la règle antérieure reste prioritaire : **aucun ajout d'élément visuel ou graphique sans demande ou accord explicite**. Une proposition n'est pas une autorisation d'exécuter.
- Le **Coach peut aussi choisir de ne pas changer immédiatement** le programme, attendre des retours supplémentaires, reporter ou conserver une séance. La correction antérieure « dès le lendemain » signifie une **possibilité de réévaluation rapide**, et non une obligation automatique de modifier ou d'ajouter une sortie.

## 11. Santé personnelle versionnée — 11 novembre 2026

- Demande d'un **répertoire dédié `sante/`** pour un historique versionné des antécédents, aspects mécaniques, autres contraintes et comptes rendus utiles au Coach.
- Les modèles `sante/PROFIL.md` et `sante/SUIVI.md` sont créés **sans information médicale personnelle inventée ou enregistrée**.
- Le propriétaire souhaite des informations de santé **dans un historique Git versionné** ; cette décision remplace l'ancien refus absolu de toute donnée personnelle versionnée.
- **Point restant à clarifier avant une écriture sensible** : le dépôt actuel est **public** et utilisé pour GitHub Pages. Vouloir un historique versionné ne vaut pas confirmation de publication publique de données de santé. Informer le propriétaire et confirmer la destination ainsi que sa visibilité avant de pousser un antécédent ou un symptôme ; possibilité d'un dépôt santé **privé distinct**.
- Les coches « Fait » demeurent en `localStorage` indépendamment de ce journal santé ; aucune synchronisation implicite.

## 12. Fraîcheur du programme / cache Android — 11 novembre 2026

- Problème signalé : après actualisation du site Android standalone, des données de séance restent parfois anciennes jusqu'à vidage du cache.
- L'utilisateur suggère un « tag HTML par programme du jour » permettant de détecter un changement. **Décision technique** : le cache HTTP fonctionne au niveau des **ressources**, pas à celui d'un attribut de balise HTML ; ne pas ajouter une UI d'actualisation non demandée.
- Implémentation : chargement initial de `programme.js` par script dynamique vers `./programme.js?actualisation=<horodatage>`, puis actualisation à chaque retour au premier plan et à la restauration depuis l'historique navigateur. Repli sur la ressource standard si la requête fraîche échoue.
- Le `localStorage` et les identifiants de séances restent inchangés.
- Limites : une ancienne version de `index.html` peut rester en cache ; GitHub Pages peut nécessiter un délai de publication. Pas de garantie instantanée sur les réseaux et caches intermédiaires, ni de prise en charge hors ligne garantie.

## 13. Révolution du suivi : 100 % statique, aucun stockage local — 11 novembre 2026

- La demande initiale de coches et notes `localStorage` (sections historiques 5 à 9) est **ANNULÉE**.
- **Source de vérité unique : `programme.js`**, avec `fait:false/true` et `sensations:""` ou un court compte rendu reçu. Pas de saisie dans le site ; les indicateurs sont en lecture seule.
- Le statut `fait:false` veut dire « **pas de confirmation intégrée** », et non une séance manquée. Aucune réalisation ni sensation ne doit être inventée.
- Le propriétaire a **confirmé explicitement** que ses données de santé et retours sportifs seront **publics et versionnés** sur ce dépôt. Ils peuvent rester dans l'historique Git ; les fichiers Garmin GPS peuvent révéler des lieux personnels. Pas de jetons ni secrets dans Git.
- Maturation structure l'affichage ; les contenus réels relèvent du Coach, jamais de l'utilisateur via un formulaire web.

## 14. Pièces jointes Garmin Venu 4 — possibilité future

- Montre utilisée : **Garmin Venu 4**.
- Pièces jointes possibles par séance : **entraînement prévu** compatible Garmin (après validation technique), **activité réellement enregistrée** (export FIT, GPX, TCX, CSV selon disponibilité).
- Les rapports peuvent inclure GPS, distances, vitesses/allures, fréquence cardiaque, intervalles et toute mesure **effectivement présente** ; ne pas en inventer.
- Source possible initiale : **export d'activité Garmin Connect fourni par le propriétaire**. Un import **MCP/API** est envisagé mais non confirmé ni relié aujourd'hui.
- Structure et conventions documentées dans `docs/GARMIN.md` et `pieces-jointes/README.md`. **Aucune pièce jointe Garmin réelle déposée à cette date**. Aucun lien ou panneau de pièce jointe ajouté à l'IHM sans demande/approbation.
- GitHub doit être la **mémoire persistante** des fichiers et décisions ; ne pas dépendre de la mémoire d'une conversation ou d'un agent.

## 15. Séparation définitive des casquettes — décision la plus récente

- **Coach exclusivement** : reconnaît le retour utilisateur (« j'ai fait ma sortie », sensations, fichier Garmin) comme **déclencheur suffisant pour traiter et mettre à jour immédiatement dans GitHub** (`fait`, `sensations`, données et pièces jointes, adaptation éventuelle du planning), sans redemander une instruction de publication distincte.
- **Le Coach n'a JAMAIS le droit de changer l'IHM**, l'HTML, le CSS, le JavaScript de présentation, les menus ou les composants. Ni de créer des éléments graphiques. Si l'interface ou le schéma ne suffit pas : transférer la demande à Maturation.
- **Maturation exclusivement** : architecture, documentation, infrastructure, contrat des données et **toutes les modifications d'interface**. Nouveaux éléments visuels uniquement avec la **demande/approbation explicite** du propriétaire. **Maturation ne transcrit plus les retours réels, ne coche plus les sorties et n'adapte plus les séances.**
- Les casquettes **ne sont pas automatiquement cumulées**. L'agent de cette conversation est **Maturation seulement** ; l'agent Coach sera distinct.
- Un retour peut conduire à **maintenir, réduire, augmenter, reporter, remplacer ou attendre**. Adapter dès le lendemain si pertinent, pas d'obligation de modification systématique.
- Pas de travail en arrière-plan supposé : le traitement s'effectue lors de l'échange où l'utilisateur transmet son retour, avec les outils disponibles et les permissions nécessaires.

### Conséquences sur le dépôt

- Coach : `programme.js` **contenu**, `sante/` **données factuelles**, `pieces-jointes/` **fichiers réels**, documentation des choix sportifs.
- Maturation : `index.html`, architecture, documentation des agents et schémas, rendu des références de pièces jointes (si demandé), gestion du cache.
- Historique des décisions : **conserver** les anciennes règles datées pour comprendre les choix abandonnés, mais ne jamais les réappliquer.

## 16. Publication systématique et contrôle du site public — 11 novembre 2026

- **Nouvelle instruction explicite** : l'agent Maturation doit **systématiquement enregistrer et pousser sur GitHub toutes les décisions prises et toutes les modifications de code**, sans attendre une seconde demande. Les agents Coach conservent la même obligation pour les comptes rendus, séances et données sportives qui relèvent de leur périmètre.
- Tout retour du propriétaire concernant le projet doit donner lieu **dans le tour en cours**, avec l'accès GitHub disponible, soit à une mise à jour de code/contenu et de documentation, soit à une trace documentaire de la décision/observation. Les décisions non implémentées doivent être identifiées comme telles.
- **Vérification obligatoire après push** : relire les fichiers modifiés et noter le commit. **Contrôler aussi le déploiement GitHub Pages** lorsque les outils le permettent ; ne pas confondre fichiers de `main` et version publique accessible sur téléphone.
- **Symptôme du 11 novembre** : sur Android, l'utilisateur observe toujours des **coches interactives**, même après nettoyage du cache, et ne voit pas l'affichage statique des sensations. Or `index.html` sur `main` n'a plus aucune interaction de suivi ni `localStorage` et affiche des sensations **seulement si une note existe**. Le symptôme suggère donc une **ancienne version du HTML servie** ; le résultat exact du déploiement n'a pas pu être contrôlé via les outils de consultation disponibles.
- Ajout d'un méta-identifiant HTML invisible `mon-rythme-version` et d'un fichier de diagnostic **`publication.txt`** (version `2026-11-11-statique-fait-sensations-v1`). Aucun nouvel élément visuel.
- Si les deux fichiers du dépôt sont à jour mais que le site reste ancien : vérifier dans **Settings → Pages** la source de publication (`main`, `/(root)` si publication depuis une branche) et dans **Actions** les exécutions `pages build and deployment`. Une URL HTML avec paramètre unique peut exclure un cache navigateur simple, mais ne remplace pas la vérification du déploiement.
- **Aucune modification des données sportives**, des dates, du suivi `fait` ou `sensations` lors de cette vérification.

## 17. Correction de la publication Pages — diagnostic du 11 novembre 2026

- **Preuve utilisateur** : `publication.txt` renvoie un **404 sur GitHub Pages** et l'ancienne IHM avec cases interactives reste affichée après effacement du cache.
- **Constat API GitHub** : `main` inclut bien le HTML de lecture seule et le témoin, mais le workflow classique **`pages build and deployment`** a généré **de nombreux `startup_failure` avec zéro job**, et plusieurs exécutions `queued`. Le plus récent succès identifié pour ce workflow était le run n°45 (11 novembre vers 00:32 UTC), avant les nombreuses modifications du soir.
- GitHub documente une limite souple de **10 builds Pages par heure** lorsqu'on publie depuis une branche. **Hypothèse contributive**, pas diagnostic entièrement établi : le premier échec de la série survient après une longue période sans build, sans logs d'exécution exploitables.
- **Correctif technique Maturation** : création de `.github/workflows/publier-pages.yml` pour publication **personnalisée via GitHub Actions**, indépendamment de cette limite spécifique, avec filtres de chemins et `concurrency.cancel-in-progress: true`. Seuls les fichiers utiles au site sont publiés.
- **Action du propriétaire nécessaire** : `Settings → Pages → Build and deployment → Source : GitHub Actions`. L'outil GitHub disponible ne permet pas de modifier ce réglage. Si nécessaire, `Actions → Publier Mon Rythme → Run workflow` sur `main`.
- **Non confirmé à ce stade** : déploiement du site via le nouveau workflow, vérification externe du témoin et rafraîchissement effectif Android. Ne pas prétendre que la seule présence du YAML a résolu le problème.
- **Aucun changement** du programme sportif, des 18 statuts ou de leurs sensations, ni de la présentation visuelle.

## 18. « Fait » visible uniquement après confirmation — 11 novembre 2026

- **Demande explicite :** pour toute séance non encore confirmée, retirer **le carré vide et le mot « Fait »** ; aucun statut affiché.
- Si la séance est réalisée (`fait:true`) : afficher **une coche claire et agréable (✓ blanc sur cercle vert) + « Fait »**.
- Même rendu dans le détail quotidien et la liste hebdomadaire ; sensations seulement si elles sont renseignées.
- **Pas de modification du programme sportif** ni des valeurs `fait` / `sensations` ; rôle Maturation uniquement.
- L'utilisateur confirme que la publication **GitHub Actions s'est déclenchée et achevée automatiquement**, sans `Run workflow` manuel. Le déclenchement sur push des fichiers du site reste en place.
