# État opérationnel de référence — lecture sans héritage V1

**Statut : lecture documentaire proposée le 13 novembre 2026, pas une nouvelle norme activée.** Source opposable : `main` au SHA `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. Les règles historiques non révoquées restent applicables : **ce résumé ne les remplace pas**.

## Où est la vérité courante ?

| Besoin | Source de vérité opérationnelle de V2 |
| --- | --- |
| Séances planifiées, blocs, cycle | `domaines/planification/donnees/` |
| Activités effectivement confirmées | `domaines/activites/donnees/` |
| Ressentis, santé et rapports datés | `domaines/sante/donnees/` |
| Objectifs, décisions, préférences, équipements et mémoire du Coach | `domaines/coaching/donnees/` |
| Frontières techniques / contrat public | `contrats/DEPENDANCES.md`, `contrats/PORTS.md`, `contrats/publication-v1.json` |
| Lecture, projections, rendu | `adaptateurs/projections/`, `addons/web/` |
| Préparation Garmin en lecture seule | `adaptateurs/garmin/mcp.cjs` ; guide `adaptateurs/garmin/MCP.md` |
| Processus de livraison Web | `docs/PROCEDURE-MIROIR-WEB.md` et vérifications de build / CI / version réellement servie |

Le dossier `personnel/` et le générateur local `scripts/generer-garmin.cjs` ne sont **pas** des sources d'écriture dans V2. Les anciens passages qui les prescrivent sont historiques et ne doivent pas déclencher d'opération. Le nom « Mon Rythme » est la marque du site, et non une autorisation d'exposer davantage de données.

## Autorités et limites

Sur `main`, les deux casquettes effectives demeurent **Coach (faits et décisions sportives)** et **Maturation (architecture et publication technique)**, avec l'exception étroitement bornée des fragments de rendu métier autorisés au Coach. Les huit rôles de `maturation/architecture-multiagents` et le Coach B2 sont **encore expérimentaux** ; leur existence dans GitHub n'est pas une activation.

Le propriétaire contrôle les arbitrages et autorisations. « Mets-toi à jour » = lecture seule. **Garmin MCP n'écrit jamais sans demande explicitement autorisée pour l'opération et les dates/cibles visées**. Un succès d'upload ne prouve ni le contenu, ni le calendrier, ni l'envoi à la montre. Une CI réussie ne prouve pas à elle seule une publication Web servie.

Le dépôt et son historique Git restent publics. Le `noindex` et une politique d'affichage restreinte **ne constituent pas une protection des données déjà versionnées**. Ne pas copier du contenu personnel dans les documents de gouvernance.

## Ce qui doit rester distinct

- **État courant** : sources canoniques V2 et contrats réellement utilisés, identifiés par liens, sans duplications de faits.
- **Preuves de migration et décisions antérieures** : ne doivent plus être lues comme des instructions actives ; leur suppression ou mise en archive externe doit être étudiée, mais l'historique ne peut être effacé par simple réécriture de fichiers.
- **Archives métier Renfo** : seize JSON sous `domaines/planification/archives/2026-11-12/` et un README ; ce sont des archives intentionnelles de prescriptions et non un programme courant.
- **Gouvernance B2** : dossier d'essai sur branche, pas du code livré ni des droits indépendants.

Cette fiche offre **un point d'entrée current-only**, sans prétendre résoudre les huit conflits ouverts ni la revue exhaustive des 161 rubriques historiques.
