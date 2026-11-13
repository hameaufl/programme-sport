# INC-005 — étude de suppression Garmin en lecture seule

**13 novembre 2026 · Aucun appel Garmin ni changement de droits.** Le but est d'instruire une divergence de textes, pas de supprimer un modèle.

## Collision vérifiée

- `AGENTS.md` au SHA historique `d88a202...`, **ligne 39** : décrit une possibilité ancienne d'effacer automatiquement un brouillon non conforme **créé dans la même opération**, après remplacement relu, identité et absence d'usage vérifiées.
- `adaptateurs/garmin/MCP.md` sur `main` `cf9241b9...`, **ligne 67** : `delete_workouts` est destructif et **requiert un accord spécifique**.
- `docs/CONTEXTE.md` sur `main`, **ligne 23** : aucune suppression sans demande explicite couvrant l'opération et la cible exacte.

Les faits historiques d'un nettoyage consenti en 2026 n'établissent pas que ce consentement soit **réutilisable** pour tout futur modèle. **La politique courante prudente consiste à refuser toute suppression sans autorisation spécifique et actuelle.** Les mêmes réserves valent pour la re-création sous un autre nom : créer puis effacer sont deux actions distinctes.

## Simulations de refus (sans exécution)

Le registre [INC-005-CAS-SIMULES.json](INC-005-CAS-SIMULES.json) contient **11 cas de préconditions purement fictives**. Le vérificateur expérimental existant (`verifier-autorisations.cjs`) refuse effectivement un accord absent, une cible ou date différente, l'absence d'aperçu, une identité douteuse, un usage potentiel et un modèle planifié. Une demande exacte et ciblée peut recevoir le verdict **« admissible_sur_papier »**, ce qui n'est **jamais** une autorisation réelle.

**Limite de sûreté découverte :** ce simulateur contrôle la *forme* de `preuveDemande` (chaîne de caractères suffisamment longue), **pas son origine authentifiée, sa fraîcheur, ni sa portée juridique ou opérationnelle**. Une chaîne mentionnant un « accord historique » recopié peut donc, dans un scénario où les autres booléens sont artificiellement vrais, être qualifiée « admissible_sur_papier ». Ce résultat **ne permet pas** de passer à l'exécution ; un agent réel doit vérifier une demande du propriétaire dans son contexte actuel, la cible exacte et l'action. Les tests rendent cette lacune de simulation explicite.

## Deux options à soumettre, sans en choisir à la place du propriétaire

**A — conservatoire (recommandée) :** même pour un intermédiaire créé au cours de la même opération, une **autorisation spécifique de suppression**, distincte de la création, est nécessaire pour la cible identifiée, avec aperçu, relecture du modèle de remplacement, absence confirmée de planification/usage et confirmation explicite.

**B — exception très bornée :** une autorisation préalable de *l'opération complète de remplacement + nettoyage de ses propres brouillons* pourrait couvrir le seul intermédiaire identifié de cette opération, sans jamais toucher aux modèles valides ou historiques. Les contraintes d'absence de calendrier, vérification d'identité et de contenu, prévisualisation et traçabilité restent obligatoires. Cette exception nécessite une décision documentée explicite du propriétaire.

**Statut :** zéro décision nouvelle, zéro modèle lu ou modifié à distance, zéro INC close. Aucune modification du code de politique, du protocole Coach, du protocole Garmin de production ou de `main`. La PR #9 reste expérimentale et non fusionnée.
