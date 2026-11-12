# Coach — procédure active et vérifiable

## PRIORITÉ ABSOLUE — Nom du programme Garmin toujours visible dans « Mon programme » (12 novembre 2026)

**Décision explicite du propriétaire :** dès qu'un entraînement est créé ou réutilisé dans Garmin Connect pour une séance, le Coach **doit obligatoirement renseigner son nom exact et vérifié** dans le champ canonique `nomEntrainementMontre` de `domaines/planification/donnees/seances/AAAA/MM/<id>.json`. Le nom est celui **effectivement relu** via Garmin MCP (`get_workout_by_id` ou bibliothèque), pas un intitulé supposé, ni le titre générique « Renfo », ni un identifiant numérique. Pour toute date explicitement associée à ce modèle, enregistrer la même référence textuelle vérifiée. Le Coach doit vérifier que la projection publique l'expose et que la page **Mon programme** indique clairement **« Entraînement à charger sur la montre : <nom exact> »** au-dessus des étapes. Ne jamais considérer l'opération terminée tant que les tests, le déploiement et le nom affiché n'ont pas été vérifiés. Règle obligatoire pour **toutes les séances possédant un modèle Garmin créé**, pas seulement les Renfos.

**Séparation métier impérative :** le champ contient **uniquement le nom public exact**. Aucun ID Garmin, jeton, compte, URL privée, FIT ou structure détaillée ne rejoint le dépôt public ou le Web. Une séance dont le modèle n'est pas encore créé n'a pas de nom à inventer : le remplir **immédiatement après création et relecture confirmées**, dans le même cycle de livraison. Les cinq lignes du Renfo restent **« Echauffement », noms des exercices, « Étirements »**, sans volumes ni durées ; le nom Garmin se trouve dans un encart séparé, non dans ces lignes. Un modèle dans la bibliothèque **n'est pas automatiquement programmé au calendrier ni transféré à la montre** ; ces opérations demandent leurs autorisations habituelles.

**Application immédiate :** `renfo-2026-11-13` référence le modèle toujours présent et validé dans Garmin Connect sous le nom exact **« Mon Rythme - Renfo A (corrigé) »**. La version intermédiaire erronée a été supprimée. Ce modèle n'a pas été inscrit au calendrier Garmin et la séance n'est pas marquée réalisée.

## RÈGLE PRIORITAIRE — Renfo Web minimal, modèle Garmin détaillé, nettoyage intermédiaire autorisé (12 novembre 2026)

- **Mon programme, Renfo prévu :** afficher seulement les noms de cinq étapes : `Echauffement`, le nom français des trois exercices, `Étirements`. Ne montrer **ni durée, ni séries, ni répétitions, ni tempo, ni maintien, ni récupération** dans ces cinq lignes ni dans les aides graphiques. Le port Web `adaptateurs/projections/lecture.cjs` doit également supprimer ces détails de `etapes` et `aidesExercices[].exercice` dans le JSON public. Les durées globales de séance prévues peuvent subsister hors de ces lignes si autorisées par le contrat. Respecter les activités réellement effectuées : ne jamais transformer leur restitution factuelle en prescription.
- **Aucune perte de données métier :** conserver les cinq blocs complets, le minutage réel de 4 min et 3 min, ainsi que séries, répétitions, repos et tempos dans `domaines/planification/donnees/seances/2026/11/renfo-2026-11-13.json` et les futures prescriptions Renfo. Garmin Connect porte les étapes détaillées accessibles à la montre. Le Web n'est qu'une vue allégée.
- **Nettoyage Garmin MCP à chaque création :** après `upload_workout`, lire `get_workout_by_id(raw=true)` et vérifier exhaustivement le sport, les étapes, les durées, chaque catégorie et nom exact d'exercice, les séries, répétitions, repos et descriptions. Si un brouillon que **le Coach vient de créer au cours de la même opération** est non conforme, ne jamais le programmer ni l'envoyer. Une fois la version correcte **créée ET relue**, le Coach est **autorisé par le propriétaire à supprimer automatiquement l'intermédiaire erroné** dont l'identité et la non-conformité sont établies : d'abord `delete_workout(confirm=false)` pour vérifier le nom et l'ID, puis `delete_workout(confirm=true)`, puis `get_workouts` pour confirmer sa disparition et la présence de la version conforme. **Cette autorisation ne s'étend pas** aux modèles historiques ou valides, aux modèles potentiellement utilisés, à une suppression de calendrier ou à une identité douteuse : dans ces cas, s'arrêter et demander l'accord spécifique. Journaliser les actions sans publier d'identifiants Garmin dans le dépôt public.
- **État vérifié :** après accord explicite reçu le 12 novembre 2026, « Mon Rythme - Renfo A » (3 étapes `HIP_STABILITY` dont le `exerciseName` avait été effacé lors du premier upload) a été supprimé définitivement avec aperçu puis confirmation. La bibliothèque relue ne contient plus que « Mon Rythme - Renfo A (corrigé) » et les deux HIIT Garmin préexistants. Le Renfo corrigé `HIP_RAISE/CLAMS` reste **non planifié dans le calendrier Garmin**, et la séance du 13 novembre demeure **non réalisée**.

## DERNIER ÉTAT — Renfo A créé, rendu allégé, reconnaissance Garmin vérifiée

La séance `renfo-2026-11-13` est l'**unique Renfo actif**, encore **non réalisé**. Dans la page Mon programme, afficher les deux lignes **« Echauffement »** et **« Étirements »** seules, sans chronométrage ni consignes annexes. Dans Planification conserver néanmoins les étapes structurées de **240 s et 180 s**, nécessaires au modèle Garmin. Le programme **« Mon Rythme - Renfo A (corrigé) »** a été créé et **relu avec succès** dans la bibliothèque Garmin : 17 étapes (4 min, trois exercices par 3 séries et les repos, 3 min). Les clés acceptées par Garmin Connect sont `HIP_RAISE/HIP_RAISE`, `HIP_RAISE/CLAMS`, `HIP_STABILITY/DEAD_BUG` ; le FIT SDK seul peut proposer `HIP_STABILITY/CLAM_SHELLS`, mais Garmin Connect **ne le retient pas** à l'upload. Vérifier systématiquement par `get_workout_by_id(raw=true)` que chaque `exerciseName` est conservé, en plus du volume et des repos. Une première version intermédiaire non conforme existe encore : ne pas la programmer et **ne jamais la supprimer sans autorisation spécifique**. Le modèle corrigé n'est **ni planifié** sur le calendrier Garmin **ni envoyé** à un appareil ; ne pas déclarer la séance réalisée.

## PRIORITÉ LA PLUS RÉCENTE — Renfo au vendredi 13 novembre, échauffement libre (12 novembre 2026 au soir)

Le seul Renfo actif est **`renfo-2026-11-13`**, reporté du jeudi 12 au vendredi 13 novembre faute de temps. Son contenu courant ne fixe **aucune vidéo ni chorégraphie** : **échauffement de 4 minutes**, **étirements doux de 3 minutes**. Les vidéos envoyées par l'utilisateur sont de simples idées pour son choix personnel, et la vidéo précédemment proposée par le Coach n'est plus la référence. Le brouillon du 12 est archivé intégralement dans `domaines/planification/archives/2026-11-12/brouillon-renfo-2026-11-12-avant-report.json`, les 14 anciennes séances archivées sont intactes. La séance n'est **pas réalisée** et aucun modèle Garmin n'a été créé. Une course existe aussi le vendredi 13 : veiller au confort des appuis et à la récupération, sans modifier cette course automatiquement. Le contenu reste à valider avant tout usage Garmin.

## PRIORITÉ ACTUELLE — Premier Renfo déplacé au jeudi 12 novembre 2026

Le propriétaire demande que **la seule séance Renfo active** soit `renfo-2026-11-12` plutôt que le brouillon du 14 novembre mentionné dans les passages historiques ci-dessous. L'ancien brouillon du 14 est archivé sous `domaines/planification/archives/2026-11-12/brouillon-renfo-2026-11-14-avant-report.json`, sans perte. La séance du **12 novembre est prévue, pas réalisée**, après 24 min de course d'essai sur tapis et avec douleur plantaire droite encore rapportée. Échauffement musical doux progressif de **5 min** (vidéo Zumba Gold Bachata proposée, non validée définitivement), étirements guidés **3 min**, durée indicative **31–34 min**. Aucun programme Garmin ne doit être créé ni programmé avant validation explicite du contenu, et si l'appui est douloureux il faut reporter.

## PRIORITÉ — Renfos remis à zéro, proposition unique à valider (12 novembre 2026)

Sur demande explicite du propriétaire, les **14 anciens Renfos ont été retirés de la planification active** et archivés intégralement dans `domaines/planification/archives/2026-11-12/`. Il ne reste qu'un brouillon `renfo-2026-11-14` pour le samedi 14 novembre : **ne pas recréer les autres dates automatiquement**, malgré l'ancienne préférence pour trois Renfos par semaine. L'utilisateur doit valider la séance et sa date avant toute création / programmation / suppression via Garmin MCP. Les autres activités, courses et kinés et toutes les données de santé sont inchangées. Le brouillon doit utiliser les exercices Garmin vérifiés et son contenu doit être intégralement convertible, échauffement et étirements compris.


**Version opérationnelle : 12 novembre 2026.** Document d'entrée à lire en priorité sous casquette **Coach**. Les documents volumineux `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et `docs/CONTRAT-CONTINUITE-COACH.md` contiennent aussi des règles et décisions historiques conservées **sans effacement**. Les passages renvoyant à l'ancien `personnel/`, aux FIT locaux ou à une interdiction absolue du rendu Web sont historiques lorsqu'ils contredisent les règles prioritaires V2.

## 1. Vérification avant de conseiller ou d'écrire

1. Relire le dernier `main`, `domaines/coaching/donnees/objectifs.json`, `orientation.json`, le contexte `CONTEXTE-COACH.md`, les dernières décisions `DECISIONS.md` et les sources utiles du jour.
2. Séparer clairement **fait réalisé**, **ressenti déclaré**, **hypothèse personnelle**, **analyse du Coach**, **décision sportive**, **intention conditionnelle**. Conserver date, chiffres, unités, provenance et incertitudes.
3. `Mets-toi à jour` **isolé** = lecture seule. Toute nouvelle déclaration métier utile = mettre à jour les sources dans l'échange courant. Ne jamais supposer une activité effectuée du seul planning.
4. Respecter l'objectif personnel canonique : retrouver des sensations agréables, **sans recherche de performance** ; ne pas progresser automatiquement en cas de douleurs.

## 2. Route de chaque information, sans doublon

| Information | Seule source canonique opérationnelle |
| --- | --- |
| Programme prévu, blocs et durée prévisionnelle | `domaines/planification/donnees/seances/AAAA/MM/<id>.json` |
| **Activité réalisée, exercices réalisés, structures sollicitées** | `domaines/activites/donnees/seances/AAAA/MM/<id>.json` |
| Ressentis de séance, douleurs et récupération rapportés | `domaines/sante/donnees/ressentis/seances/AAAA/MM/<id>.json` |
| Nuances d'un retour précis et récit source | `domaines/sante/donnees/rapports/AAAA/MM/<id>.md` |
| Événement daté | `domaines/sante/donnees/evenements/AAAA/MM/<date>-sujet.md` |
| Objectif, stratégie, matériel et décisions transversales | `domaines/coaching/donnees/{objectifs.json,orientation.json,equipements.json,CONTEXTE-COACH.md,DECISIONS.md,JOURNAL.md}` |

Identifiants, dates, séances effectuées et historiques sont à **préserver**. Un essai réellement effectué mais hors cycle peut posséder une entrée minimale de référence dans Planification **uniquement si nécessaire à la liaison** avec Activités, sans inventer un entraînement prescrit antérieurement. Ne pas dupliquer les faits entre couches ; un rapport peut pointer vers l'analyse anatomique du fichier Activités. Pour le journal Santé public, en-tête strict : `### AAAA-MM-JJ — Intitulé`.

## 3. Checklist impérative pour **chaque activité confirmée** — avant le commit

- [ ] `seanceId` stable, `fait: true`, date et nature confirmées, sans déduire une durée réelle du programme prévu.
- [ ] `exercicesRealises` : reprendre uniquement les exercices ou étapes effectivement rapportés, avec volumes et unités connus ; pas d'invention à partir du planning.
- [ ] **`structuresSollicitees: string[]` : champ obligatoire non vide pour chaque activité réalisée**, y compris une sortie non planifiée sur tapis. C'est **au Coach de le renseigner spontanément** à partir des gestes déclarés ; ne pas attendre que l'utilisateur le demande.
- [ ] Regrouper en puces nominales brèves `Région / fonction — structures anatomiques` : `Jambe / propulsion — quadriceps fémoral, triceps sural`, `Hanche / stabilisation — moyen fessier`. Ce sont des **exemples de forme**, jamais un modèle à recopier sans adéquation des gestes.
- [ ] Ne pas écrire `(sollicitation probable…)` ou des réserves répétées **dans les puces**. Il s'agit d'une interprétation biomécanique usuelle, **pas** d'une mesure clinique, ni d'un diagnostic de lésion. Écarter les muscles non fondés ; si le mouvement n'est pas assez décrit, indiquer `À préciser par le Coach — mouvements non décrits`, sans inventer.
- [ ] Ressentis **distincts** dans Santé, concis et fidèles ; rapport narratif si nécessaire. `orientation.json` seulement si phase, tendances ou vigilances évoluent, et sans doubler l'objectif canonique.
- [ ] Vérifier que le détail de la séance dans **Mon programme** présente dans l'ordre **Séance → Structures sollicitées → Sensations**, et que les réalisations apparaissent correctement dans **Mon suivi santé**. La page ne devine aucun muscle et ne convertit aucun plan en fait.

## 4. Mode d'intervention Web et tests

**Un seul processus de livraison** : modifier les sources de vérité → contrôler les projections publiques autorisées → corriger **uniquement un fragment local de rendu métier** si nécessaire → valider/build → créer de préférence **un seul commit** → contrôler GitHub Actions **et** la version réellement servie.

- Contrôles principaux : `node scripts/verifier-site.cjs`, `node scripts/verifier-changements.cjs`, `node scripts/construire-site.cjs`, `node scripts/verifier-miroir-web.cjs`, `node maturation/architecture/verifier-publication.cjs`.
- `domaines/activites/modele.cjs` rejette désormais une activité réalisée sans `structuresSollicitees`. Les tests doivent échouer avant publication si le champ manque, est vide ou n'est pas projeté fidèlement.
- Politique privée : `MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs` et `node maturation/architecture/verifier-publication-prive.cjs`.
- Vérifier le workflow **« Publier Mon Rythme »**, build + déploiement + `data/index.json.buildVersion` égal au SHA voulu. Un **commit seul ne vaut pas publication**. Si non confirmé : l'annoncer explicitement.
- HTML, CSS, navigation générale, schémas, adaptateurs, contrats, scripts et workflows : responsabilité **Maturation**, sauf la dérogation du Coach sur **un fragment de rendu métier local**. Ne pas copier des valeurs métier en dur dans les pages. Procédure détaillée : `docs/PROCEDURE-MIROIR-WEB.md`.

## 5. Garde-fous prioritaires

- **Aucune perte de données métier :** ne supprimer ni écraser les faits, séances, rapports, décisions et anciens contextes ; préférer les compléments datés. Vérifier le diff, l'identité des séances et l'absence de suppressions avant publication.
- **Confidentialité :** dépôt GitHub et site standard **publics** ; les contrats filtrent les projections mais ne rendent pas le dépôt privé. Ne pas élargir la publication des données Santé.
- **Garmin MCP bêta :** aucune création, mise à jour, programmation ou envoi sans demande explicite de l'utilisateur **pour les dates exactes**. Une modification du site ou du programme n'est pas un ordre Garmin.
- **Renfo futur :** choisir exclusivement des mouvements officiellement vérifiés du catalogue Garmin, adaptés au matériel domestique réellement confirmé et à la tolérance ; animations montre facultatives. Rien à réécrire rétroactivement sans nécessité.
- **Diagnostic :** les douleurs, l'incertitude et les avis professionnels restent distincts des sollicitations anatomiques usuelles. Adapter ou reporter si les symptômes le justifient, sans conclure à une guérison depuis un essai ponctuel.

## 6. Reprise / historique

- **Entrée active pour toutes les casquettes :** `AGENTS.md` → ce document → sources métiers pertinentes → tests et publication.
- **Architecture et rôles :** `docs/ROLES.md`, `docs/CONTRAT-CONTINUITE-COACH.md`, `docs/REPRISE.md` ; anciens textes conservés, mais les chemins `personnel/` sont historiques sous V2.
- **Historique métier complet :** `domaines/coaching/donnees/CONTEXTE-COACH.md`, `DECISIONS.md`, `JOURNAL.md` et les domaines Planification/Activités/Santé ; ne jamais déplacer ou résumer ces sources au point d'en perdre une nuance.
