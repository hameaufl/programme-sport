# Preuves techniques complémentaires INC-001, INC-002, INC-007 et INC-008

**13 novembre 2026 · Documentation probatoire, sans clôture des incohérences et sans autorisation de changement.**

Les résultats ci-dessous concernent le `main` figé `e28b8cac98d20b78fd4835392b53afeeed18c234` après la fusion de la PR #10 et les sources expérimentales de simulation de la PR #9. Le contrôle `verifier-preuves-inc-techniques.cjs` utilise les objets Git locaux et les fichiers publics du dépôt ; **il n'interroge aucun compte Garmin et n'envoie aucune commande**.

| Dossier | Élément vérifié | Preuve / contrôle | Limites restantes |
| --- | --- | --- | --- |
| **INC-001 — ancien FIT** | Pas de générateur `scripts/generer-garmin.cjs` ni fichier `.fit` dans l'arbre courant de `main`. Le validateur refuse les FIT dans la publication. | Arbre Git de `main`, `maturation/architecture/verifier-publication.cjs`, `scripts/verifier-site.cjs` | N'efface **pas** les blobs historiques ; n'empêche pas une autre intervention humaine de les recréer ultérieurement |
| **INC-002 — `personnel/`** | Pas de fichier sous `personnel/` dans l'arbre courant ; `scripts/verifier-site.cjs` bloque l'ancien monolithe et l'ancien dossier de séances. | Arbre Git de `main` et tests de site existants | L'absence de dossier ne certifie pas à elle seule une **migration sans perte de sens** de chaque fait personnel historique |
| **INC-007 — PNG et blocs** | Banque V2 sous `addons/web/public/assets/renfo/banque.json`, cinq chemins PNG présents. La projection `adaptateurs/projections/lecture.cjs` accède au média par `mouvementId` et lève une erreur si l'image requise est absente. | Banque + blobs + projection + cas de contrôle `scripts/verifier-site.cjs` | N'établit pas la bonne **pédagogie** de chaque image ou toute l'exhaustivité des exercices futurs |
| **INC-008 — simulation sans écriture** | Dix scénarios déclarés `simulation_sans_ecriture`, avec `ecriture_git` et `ecriture_garmin` interdites ; vérificateurs des préconditions. | `SCENARIOS-SIMULATION.json`, `verifier-simulations.cjs`, `verifier-autorisations.cjs` et tests négatifs | Ne prouve pas qu'un agent LLM en session réelle respectera systématiquement ces restrictions |

Les assertions et leurs cas de refus sont enregistrés dans `verifier-preuves-inc-techniques.cjs` et `tests/preuves-inc-techniques.test.cjs`. La CI de gouvernance expérimentale les exécute sans lancer d'écriture ni de publication.

## Conséquence pour les huit dossiers

Ces quatre enquêtes apportent des preuves techniques supplémentaires, mais **ne modifient aucun statut INC**. Les sources documentaires et les exceptions restent à examiner clause par clause ; le Gardien n'a pas délivré de visa formel indépendant. Il faut encore une décision documentée du propriétaire lorsqu'un changement de permission ou une opération réelle est en jeu.

**Important — confidentialité :** le dépôt et l'ancien historique restent publics. L'absence de fichiers sensibles dans l'arbre courant n'est pas une purge de l'historique Git, des copies ou des caches. Ce sujet demeure un projet séparé nécessitant une autorisation et un plan de migration privé.
