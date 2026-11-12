# Index de décisions — première version à auditer par le Gardien

**Statut :** index de conception **non encore validé formellement par le Gardien**. Il renvoie aux sources, ne les remplace pas et ne contient aucun fait de santé ni de séance recopié.

## Décisions du chantier confirmées par le propriétaire
| ID | Objet | Source de référence | État |
| --- | --- | --- | --- |
| GOV-001 | Maturation et Coach de même rang | `../JOURNAL-EVOLUTION.md` | Retenue, en attente de visa Gardien |
| GOV-002 | Gardien auprès de Maturation, cohérence proactive | `../JOURNAL-EVOLUTION.md` | Retenue, en attente de visa Gardien |
| GOV-003 | Cinq spécialistes de Coach | `../JOURNAL-EVOLUTION.md` | Retenue, en attente de visa Gardien |
| GOV-004 | Maturation seul modifie les comportements, validation Gardien | `../JOURNAL-EVOLUTION.md` | Retenue, en attente de visa Gardien |
| GOV-005 | Contrôleur qualité conforme au référentiel validé | `../JOURNAL-EVOLUTION.md` | Retenue, en attente de visa Gardien |
| GOV-006 | Huit rôles au total, pas d'agent supplémentaire au départ | `../JOURNAL-EVOLUTION.md` | Retenue |
| GOV-007 | Sans API/serveur/abonnement supplémentaire | `../JOURNAL-EVOLUTION.md` | Choix explicite |
| GOV-008 | Branche de test, pas de fusion dans main sans approbation | `../JOURNAL-EVOLUTION.md` | Choix explicite |
| GOV-009 | Conservation intégrale des informations métier | `../JOURNAL-EVOLUTION.md` | Exigence de non-perte |
| GOV-010 | Contrôle final vérifiable et traçable | `../JOURNAL-EVOLUTION.md` | Cible d'implémentation |

## Sources métier qui font foi
- Directives en vigueur et règles de priorité : `AGENTS.md`, `docs/ROLES.md`, `docs/COACH-MODE-OPERATOIRE.md`.
- Contexte/continuité du Coach : `docs/CONTRAT-CONTINUITE-COACH.md`, `domaines/coaching/donnees/CONTEXTE-COACH.md`, `domaines/coaching/donnees/DECISIONS.md`, `domaines/coaching/donnees/JOURNAL.md`.
- Faits et prescriptions canoniques : `domaines/{coaching,planification,activites,sante}/donnees/` et archives.
- Affichage et publication : `contrats/publication-v1.json`, `docs/PROCEDURE-MIROIR-WEB.md`, `adaptateurs/projections/`.
- Précautions Garmin : `adaptateurs/garmin/MCP.md` et les consignes prioritaires correspondantes d'`AGENTS.md`.

## Contradictions à examiner, pas à effacer
- `AGENTS.md` et `docs/ROLES.md` contiennent des prescriptions historiques sur le nom Garmin, les fichiers FIT et le périmètre Web ; leurs passages plus récents peuvent primer, mais le Gardien doit **documenter explicitement les supersessions** pour éviter des directives simultanément ambiguës.
- Les recommandations d'architecture en cours de discussion ne doivent pas être qualifiées de décisions sportives.
- Les incohérences découvertes doivent être enregistrées (statut ouvert/arbitré/clos, sources, gravité, autorité compétente) dans un futur registre dédié ; aucune correction silencieuse.

## 13 novembre 2026 — Dossiers d'incohérence soumis au Gardien
Le registre [INCOHERENCES.md](INCOHERENCES.md) répertorie INC-001 à INC-008 et leur interprétation **proposée** par Maturation. Ce registre est ouvert, non visé ; aucune contradiction n'est réputée arbitrée du seul fait qu'une interprétation est indiquée. Voir aussi [la revue à valider](../REVUE-GARDIEN-A-VALIDER.md).
