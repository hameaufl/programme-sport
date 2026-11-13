# Mon Rythme — règles communes pour Codex

Ce dépôt contient le produit actuel. Les sources métier, les contrats et le code sont les références opérationnelles. Ne jamais déduire un fait d'un journal, d'une conversation ou du rendu Web.

## Au début de chaque intervention
1. Lire `README.md`, `docs/ARCHITECTURE.md` et `docs/PROCESSUS.md`.
2. Lire uniquement les contrats, modèles, données et README du périmètre demandé.
3. Définir le changement, ses impacts et les vérifications nécessaires. Une demande « mets-toi à jour » isolée est en lecture seule.
4. Ne pas ajouter de journaux de conversation, de rôles d'agent, de procédures de reprise, de rapports d'audit permanents ou de document dupliquant une autre source.

## Frontières et vérité métier
- Quatre domaines : `planification` (prescrit), `activites` (réalisé confirmé), `sante` (observations et rapports), `coaching` (objectifs, équipements, orientation).
- L'objectif est dans `domaines/coaching/donnees/objectifs.json` ; le cap courant dans `domaines/coaching/donnees/orientation.json`.
- Les domaines n'importent ni Web, ni Garmin, ni stockage ; relier les faits par identifiants stables. Le code Web ne détient aucune donnée canonique.
- Les vues Web sont des projections à champs autorisés. Les pages sont `index.html`, `coach.html`, `sante.html` et `equipements.html`.
- Ne jamais transformer une séance planifiée en activité réalisée sans confirmation, ni écraser une donnée personnelle ou un rapport pour simplifier le code.

## Actions sensibles
- Le dépôt et le site sont publics : aucune nouvelle donnée confidentielle, aucun secret ni identifiant privé dans Git, le build ou les projections.
- Garmin : lecture/préparation par défaut ; création, modification, suppression, calendrier et envoi à une montre exigent une autorisation explicite portant sur les opérations et cibles. Vérifier les résultats à distance.
- Les exercices Garmin proviennent du catalogue officiel Garmin ; ne pas inventer d'intitulés. Animation facultative, pas bloquante.
- Ne pas fusionner, publier, supprimer des données ni étendre les permissions externes sans demande explicite.

## Qualité et livraison
- Appliquer `docs/PROCESSUS.md`. Une branche pour une tâche, une PR contrôlée ; ne pas travailler directement sur `main`.
- Garder les changements ciblés ; ajouter ou adapter les tests des contrats et des frontières. Un test qui protège une règle active ne doit pas être supprimé par commodité.
- Exécuter les commandes du `README.md`, inspecter le diff et distinguer résultats vérifiés, limites et actions restantes.
- Les décisions architecturales durables nécessitent une note ADR courte, seulement si elles changent les frontières ou les contrats.
