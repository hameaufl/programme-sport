# Architecture de Mon Rythme

## Principe

Les données et règles métier restent indépendantes des interfaces, du stockage concret, de Garmin et de GitHub Pages. Un module possède une responsabilité unique, un contrat explicite et des tests adaptés. Les interfaces externes sont remplaçables.

## Domaines et sources canoniques

| Domaine | Source | Responsabilité |
| --- | --- | --- |
| Planification | `domaines/planification/donnees/` | Séances prévues, cycle, mouvements, prescriptions |
| Activités | `domaines/activites/donnees/` | Exécutions confirmées et exercices réalisés |
| Santé | `domaines/sante/donnees/` | Ressentis, comptes rendus et événements |
| Coaching | `domaines/coaching/donnees/` | Objectifs, orientation, équipements et arbitrages sportifs |

Un identifiant de séance durable permet le rapprochement sans recopier ni confondre la prescription, la réalisation et l'observation.

## Frontières techniques

- `domaines/` contient des modèles et validations indépendants des périphériques et du Web.
- `adaptateurs/fichiers/` fournit les ports d'accès aux sources.
- `adaptateurs/projections/` assemble uniquement les vues de lecture permises par les contrats.
- `adaptateurs/garmin/` prépare l'intégration avec Garmin ; aucune opération distante implicite.
- `addons/web/` affiche les projections générées sous `_site/` par le build ; les pages n'écrivent pas dans les données métier.
- `contrats/DEPENDANCES.md` décrit les dépendances autorisées ; `contrats/PORTS.md` les interfaces de lecture.

Les politiques de publication utilisent des listes blanches avec refus par défaut. Une vue restreinte est un filtre de build, **pas** une authentification. Le code, les données suivies dans Git et les publications passées peuvent être publics : éviter tout contenu confidentiel.

## Qualité

Les contrôles présents sous `scripts/` testent les modèles métier, les frontières, la portabilité, les projections, les informations exposées et le site construit. GitHub Actions les exécute sur les pull requests. Ces vérifications complètent la revue humaine ; elles ne démontrent pas à elles seules l'absence de tout couplage ou de toute fuite.

## Évolution

Une fonctionnalité doit respecter les frontières existantes ou proposer un ADR motivé avec impact, alternatives et décision à valider. La méthode de développement figure uniquement dans `docs/PROCESSUS.md` et les instructions communes dans `AGENTS.md`. Les conversations et expériences abandonnées ne sont pas des règles.
