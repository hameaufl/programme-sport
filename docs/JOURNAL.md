# Journal Maturation — historique technique

## 10–11 novembre 2026 — Mise en place

- Site statique Mon Rythme, responsive, calendrier lundi–dimanche, date actuelle dynamique.
- Documentation de reprise multi-LLM et rôles séparés.
- Passage des cases locales aux statuts statiques versionnés, affichage concis en puces, boutons et indicateurs ajustés sur demande.

## 11 novembre 2026 — Fiabilisation de Pages

- Échecs de la publication classique, puis passage à GitHub Actions.
- [Run 43101058284](https://github.com/hameaufl/programme-sport/actions/runs/43101058284) : échec de déploiement malgré artefact créé ; correction via jobs séparés, attente API et validateur prépublication.
- [Run 43102658894](https://github.com/hameaufl/programme-sport/actions/runs/43102658894) : `success`.

## 11 novembre 2026 — Séparation physique sans duplication

- Demande : distinguer construction et données personnelles **sans créer de copies**.
- Déplacement du fichier de programme, du suivi santé et de l'espace Garmin sous `personnel/` ; chargement direct à partir du nouveau chemin.
- Extraction du contenu personnel écrit en dur dans la page vers le fichier personnel.
- Workflow déclenché par `personnel/**`, chemin déployé conservé ; tests anti-doublons et validité JS mis à jour.
- Conservation à l'identique des 18 séances, identifiants et statuts ; aucune décision sportive.
- **Contrôle GitHub Actions confirmé :** [run 43105814078](https://github.com/hameaufl/programme-sport/actions/runs/43105814078), `completed / success`. Validation du code/données, artefact et déploiement Pages réussis.
- **Commit de séparation :** `2b2e5ba56820e1b40c74df41a853679c351ccfab`. Aucune vérification physique du rendu sur Android.


## 11 novembre 2026 — Empêcher l'indexation du site public

- **Demande** : conserver GitHub Pages public, décourager sa découverte depuis Google et les moteurs de recherche ; ne pas ajouter de visuel.
- **Implémentation** : balises `robots` et `googlebot` avec `noindex, nofollow` dans le `head` de `index.html`. Pas de `robots.txt` inefficace dans le sous-chemin du projet.
- **Prévention** : contrôle obligatoire du `noindex` par `scripts/verifier-site.cjs`, règle permanente dans `AGENTS.md`, documentation de transfert actualisée.
- **Versions** : méta-identifiant HTML et `publication.txt` harmonisés sur `2026-11-11-noindex-v5` ; aucun changement des données `personnel/`, du calendrier ni du design.
- **Contrôle GitHub Actions confirmé** : [run 43107294048](https://github.com/hameaufl/programme-sport/actions/runs/43107294048), **completed / success** — contrôle prépublication, artefact et déploiement Pages réussis.
- **Commit de mise en œuvre** : `c88b07cf660bcea3eb7a7be32f3b949651261126`. Contrôle direct de l'indexation Google non effectué (dépend d'une prochaine exploration).
- **Limite** : données et dépôt toujours publics ; `noindex` n'est pas un contrôle d'accès et ne s'applique pas directement à toutes les ressources non-HTML.

## 11 novembre 2026 — Style et périmètre de réponse du Coach

- **Demande** : réponses très concises, allant droit au but, sans longs paragraphes ; l'essentiel du détail est sur Mon Rythme.
- **Précision** : ne pas évoquer les modifications de la casquette Maturation lorsqu'elles sont étrangères au coaching.
- **Action Maturation** : consigne ajoutée dans `AGENTS.md`, `docs/ROLES.md`, `docs/DECISIONS.md` et `docs/REPRISE.md`.
- **Portée** : aucun changement de programme personnel, d'IHM ni du workflow GitHub Pages ; publication du site non déclenchée par ces seules modifications documentaires.

## 11 novembre 2026 — Lien vers l'application dans les réponses Coach

- **Demande** : le Coach peut joindre le lien direct du site dans ses réponses, afin que l'utilisateur l'ouvre depuis Android.
- **Précision** : malgré sa concision, le Coach peut fournir les détails d'une séance quand c'est demandé ou pertinent.
- **Limite** : ouverture standalone non garantie ; dépend du navigateur et d'Android.
- **Action Maturation** : mise à jour des consignes persistantes, des rôles, des décisions et de la reprise ; **aucune intervention sur l'IHM ni sur les données personnelles**.
- **Publication** : simple changement de documentation, ne déclenche pas GitHub Pages ; consignes poussées sur `main`.

## 11 novembre 2026 — Choix final du bouton Coach

- **Décision utilisateur** : retenir **l'option 2 (bouton visible)** et **l'icône 5 « Parcours »**, `route` dans la bibliothèque d'icônes.
- **Libellé** : « Ouvrir Mon Rythme » ; **cible** : https://hameaufl.github.io/programme-sport/ ; flèche externe à droite.
- **Implémentation documentaire** : règle persistante enregistrée dans `AGENTS.md`, `docs/ROLES.md`, `docs/DECISIONS.md` et `docs/REPRISE.md` pour les futurs LLM.
- **Limite technique** : vrai bouton seulement si le client conversationnel le permet ; repli sur un lien Markdown explicite. L'ouverture standalone sur Android n'est pas garantie.
- **Aucun changement d'IHM du site ni de données sportives** : commit documentaire, sans déclenchement de Pages.

## 11 novembre 2026 — Carte Coach simplifiée, nouvelle sélection

- **Demande utilisateur** : partir de la carte variante 2, remplacer l'icône Parcours de l'en-tête par la flèche `arrow-up-right`, supprimer le sous-titre et écrire **« Accéder à mes séances »** sur le bouton principal **sans icône**.
- **Action Maturation** : remplacer les consignes d'affichage des réponses dans `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, et consigner le nouveau choix dans les décisions.
- **Aucun changement de l'application GitHub Pages** ni du programme personnel. Documentation uniquement : pas de déploiement Pages attendu.

## 11 novembre 2026 — Centrage du titre de la carte Coach

- **Demande utilisateur** : centrer la flèche `arrow-up-right` et « Mon Rythme » **comme un groupe unique**, au-dessus du bouton « Accéder à mes séances ».
- **Action Maturation** : adaptation des consignes de la carte dans `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et ajout de la décision dans `docs/DECISIONS.md`.
- Aucun changement du code de l'application, des données sportives ou du workflow Pages ; commit documentaire uniquement.

## 11 novembre 2026 — Définition de « se mettre à jour »

- **Décision** : l'expression adressée à un agent LLM signifie **relire les connaissances du dépôt et les nouveaux commits de `main`**, sans écriture sur GitHub.
- **Précision** : pas de push, de journal, de modification de code ou de données et pas de déploiement lorsque cette demande est seule. Un ordre distinct peut autoriser une modification.
- **Portée** : Coach et Maturation ; les informations consultées et le résumé restent pertinents au rôle attribué.
- **Action Maturation** : une seule mise à jour documentaire pour ancrer cette règle dans `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, le registre des décisions et ce journal. Aucune modification du site.

## 11 novembre 2026 — Proposition initiale « Mon suivi santé »

- **Intervention Maturation** : création de `sante.html`, lien d'accès au bas de `index.html` et navigation retour.
- **Contenu affiché** : synthèse automatique des séances programmées, confirmées et notes ; profil santé par rubriques `##` de `PROFIL.md` ; journal par entrées datées `### AAAA-MM-JJ` de `SUIVI.md` ; derniers retours de séances.
- **Aucune donnée de santé inventée ou modifiée** : les modèles restent non renseignés ; rendu en lecture seule et sans copie pérenne du programme.
- **Workflow** : publication des deux pages et des fichiers Markdown sous leur chemin original ; tests prépublication de navigation, de syntaxe, de fichiers présents, et `noindex` des deux pages.
- **Version HTML** : `2026-11-11-suivi-sante-v6`.
- **Vérification GitHub Actions :** [run 43113273035](https://github.com/hameaufl/programme-sport/actions/runs/43113273035), `completed / success`. Contrôles prépublication, artefact et déploiement des deux pages réussis.
- **Commit de création** : `60cf51dfbef414529dd468d967d879c3963921d4`. Affichage sur Android et chargement effectif depuis le téléphone non vérifiés.


## 11 novembre 2026 — Épurer la semaine et améliorer l'affichage des sensations

- **Signalement** : le compte rendu de kiné du 4 novembre apparaît à tort dans le résumé de semaine ; sensations mal alignées à côté du libellé ; ✓ Fait trop éloigné du titre.
- **Correction Maturation** : dissocier les rendus hebdomadaire et quotidien dans `index.html` ; semaine = date, titre, éventuellement ✓ Fait ; détail = ✓ Fait à côté du titre, puis bloc vertical titre « Sensations » + paragraphe sous les étapes. Ajustements CSS et affichage mobile.
- **Coach** : ajout d'une consigne pédagogique pour reformuler le langage courant avec des termes techniques compréhensibles, en distinguant faits attestés et hypothèses ; pas de diagnostic inféré.
- **Données sportives** : aucun changement de `personnel/programme.js` ou des comptes rendus de santé. Les informations déjà écrites ne sont pas réinterprétées par Maturation.
- **Prévention** : tests statiques supplémentaires dans `scripts/verifier-site.cjs` sur la séparation des vues et la présentation des sensations ; conservation de la version HTML synchronisée avec `publication.txt`.
- **État de déploiement** : à contrôler sur le workflow GitHub Actions après commit.

## 11 novembre 2026 — Correction du contrôle prépublication (versions HTML)

- **Échec initial** : [run 43114293542](https://github.com/hameaufl/programme-sport/actions/runs/43114293542), étape `Contrôler le site et les données`, message `Versions des deux pages non synchronisées` ; aucun fichier publié pendant cet échec.
- **Cause précise** : `index.html` avait le nouveau témoin `2026-11-11-seances-sensations-v7`, tandis que `sante.html` conservait `2026-11-11-suivi-sante-v6`.
- **Correction Maturation** : synchroniser `sante.html` sur `2026-11-11-seances-sensations-v7` et ajouter une consigne de vérification des **trois versions** (`index.html`, `sante.html`, `publication.txt`) **avant** le commit, et non uniquement dans le pipeline.
- **Aucun changement des séances ni du contenu médical** ; le script de contrôle reste strict.
- **Validation finale** : [run 43114517500](https://github.com/hameaufl/programme-sport/actions/runs/43114517500), `completed / success`. Vérification du site, assemblage, envoi de l'artefact et publication GitHub Pages réussis.
- **Correctif** : commit `bc3b4619d0e000c1bd22d5e39210a870d0609873` (versions HTML alignées). Commit IHM initial `04fd78e49c1c5ae9ea529ee0bf214cdd8429a9c9`.
- **Limite restante** : rendu réel sur téléphone Android non testé par l'agent.

## 11 novembre 2026 — Ajouter le déroulé factuel au détail de séance

- **Demande** : afficher une liste de ce qui a été fait au-dessus des sensations, dans le détail du jour. Permettre au Coach de reformuler les sensations, avec termes sportifs techniques mais sans surinterprétation.
- **Conception** : section « Déroulé de la séance » en puces pour `fait:true`, basée sur `exercicesRealises` facultatif ou sur la ligne « Réalisé » déjà présente dans le journal santé du même ID ; « Programme prévu » pour les séances non confirmées. Les sensations restent séparées en paragraphe.
- **Cas existant** : séance de kiné du 4 novembre, déjà décrite dans `personnel/sante/SUIVI.md` ; **aucun texte sportif nouveau ni modification de `personnel/`**.
- **IHM** : mise à jour de `index.html` uniquement pour le rendu, conservation de la synthèse hebdomadaire, du statut à côté du titre et de l'affichage mobile.
- **Qualité** : nouveaux contrôles de séparation du prévu/réalisé, de la source santé et du type des `exercicesRealises` facultatifs. Publication des deux pages avec version commune `2026-11-11-deroule-seance-v8`.
- **Résultat du déploiement** : [run 43115608340](https://github.com/hameaufl/programme-sport/actions/runs/43115608340) terminé en `success` : validation, assemblage et publication GitHub Pages réussis. Commit IHM : `41ece7d09e0eba7c71440b4ca2cbf4752fc8179d`.
- **Vérification fonctionnelle du contenu** : le lecteur du journal extrait 4 éléments déjà rapportés pour `kine-2026-11-04`, sans écrire dans `personnel/`. Le rendu Android réel n'a pas été testé.

## Journal futur

Préciser : demande, fichiers/commit, contrôles, déploiement effectif, limites. Ne pas recopier les comptes rendus sportifs : ils appartiennent au Coach.
