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

## Journal futur

Préciser : demande, fichiers/commit, contrôles, déploiement effectif, limites. Ne pas recopier les comptes rendus sportifs : ils appartiennent au Coach.
