# Couverture cible — protocoles spécialisés proposés

**13 novembre 2026 — statut de conception :** attribution complète **des 85 familles recensées lors du premier audit**, sous réserve de relecture sémantique du Gardien. Ce n'est ni un audit clause-par-clause exhaustif de toutes les archives ni une validation de comportement.

| Responsable de rédaction opérationnelle proposé | Fichier | Familles attribuées |
| --- | --- | ---: |
| MATURATION | [MATURATION](agents/MATURATION.md) | 21 |
| ANALYSTE | [ANALYSTE](agents/ANALYSTE.md) | 16 |
| STRATEGE | [STRATEGE](agents/STRATEGE.md) | 6 |
| PLANIFICATEUR | [PLANIFICATEUR](agents/PLANIFICATEUR.md) | 10 |
| GARMIN | [GARMIN](agents/GARMIN.md) | 13 |
| COACH | [COACH](agents/COACH.md) | 6 |
| GARDIEN | [GARDIEN](agents/GARDIEN.md) | 7 |
| CONTROLEUR-QUALITE | [CONTROLEUR-QUALITE](agents/CONTROLEUR-QUALITE.md) | 6 |

Les attributions nominatives figurent dans [COUVERTURE-PROTOCOLES.json](COUVERTURE-PROTOCOLES.json) (85 identifiants uniques), avec le texte synthétique de l'exigence, la référence historique, le contrôle attendu et le statut **proposé, non validé**.

## Différence entre « attribué » et « couvert »
- **Attribué** : un rôle est désigné ; c'est vérifiable par unicité d'ID.
- **Procédure décrite** : la fiche comporte les étapes correspondantes ; une lecture humaine et des scénarios doivent vérifier leur fidélité.
- **Validé par Gardien** : avis explicite, daté et lié au commit, à recueillir ; aucun visa n'existe encore.
- **Fiable en exploitation** : tests comportementaux comparatifs et contrôles automatiques réussis ; non démontré pour l'instant.

**Barrière :** tant qu'un conflit de [la liste](referentiel/INCOHERENCES.md) affecte une tâche, ne pas déclarer sa conformité sur la base du nouveau protocole seul ; consulter les sources historiques actives et demander l'arbitrage compétent. Pas de fusion `main` sans accord du propriétaire.
