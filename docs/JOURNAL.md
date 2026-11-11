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
- À vérifier après commit : validation du pipeline et disponibilité de l'application mise à jour.

## Journal futur

Préciser : demande, fichiers/commit, contrôles, déploiement effectif, limites. Ne pas recopier les comptes rendus sportifs : ils appartiennent au Coach.
