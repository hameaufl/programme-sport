# Vague 2 — pré-matrice de supersession des quinze rubriques V1 obsolètes

**13 novembre 2026 · État : propositions de destinations V2, sans suppression ni correction du `main`.**

Parmi les 161 rubriques historiques classées, **15 sont explicitement rangées comme « procédure V1 remplacée »** : 5 dans `AGENTS.md`, 4 dans `docs/REPRISE.md` et 6 dans `docs/ROLES.md`. Les quinze titres, bornes et destinations de référence sont conservés dans [le registre de supersession](PROPOSITIONS-SUPERSESSION-15-V1.json), épinglé aux SHAs historiques et `main` après PR #11.

| Famille de consignes à remplacer | Nombre | Destination V2 candidate |
| --- | ---: | --- |
| Anciens générateurs et envois FIT locaux | 8 | `docs/CONTEXTE.md` (Garmin MCP manuel) et les contraintes de `adaptateurs/garmin/MCP.md` |
| Sources historiques `personnel/` et mélange prévu/réalisé | 5 | `docs/CONTEXTE.md`, `docs/COACH-MODE-OPERATOIRE.md`, `contrats/DEPENDANCES.md` |
| Ancienne exposition du suivi Santé au Web | 1 | Quatre pages V2 et projection Santé filtrée |
| Anciennes consignes de publication | 1 | `docs/PROCEDURE-MIROIR-WEB.md` et contrôle de version réellement servie |
| **Total** | **15** | |

**Important : une destination candidate n'est pas la preuve de non-perte de toutes les sous-clauses.** Chaque rubrique peut comporter une obligation toujours valable, une décision datée, des champs ou nuances sportives et des contraintes pédagogiques. **Ne pas supprimer l'archive ni déclarer le remplacement certifié sans examen clause par clause.**

## Conditions pour la consolidation

1. Pour chaque ID, conserver la preuve historique (chemin, bornes et SHA Git), établir les sous-clauses applicables, pointer vers des clauses V2 explicites et ajouter le test de non-régression correspondant.
2. Extraire uniquement les instructions V1 *réellement supplantées*, sans déplacer de données personnelles dans la gouvernance. Les anciennes générations FIT ne doivent pas être réactivées ; aucune modification Garmin.
3. Préparer le diff exact d'un premier protocole actif, vérifier les nouvelles références et obtenir un visa adapté ; demander une **approbation de fusion distincte**. Ne pas modifier la PR #9 pour la fusion ni fusionner une autre PR par défaut.

La couverture **161/161 rubriques** demeure préliminaire. Les **8 INC restent ouvertes**. Ce registre ne change ni les droits des agents, ni les données, ni les archives, ni la liste des 85 familles de provenance.
