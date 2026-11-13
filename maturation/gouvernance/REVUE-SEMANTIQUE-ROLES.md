# Revue de la séparation des rôles : 29 rubriques, état courant et V1

**Date : 13 novembre 2026.** Source historique fixe : `main` `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. Cette analyse est une lecture **par rubrique**, non une certification clause par clause. Aucune permission n'est changée.

| État préliminaire | Rubriques |
| --- | ---: |
| Courant V2 plausible, à vérifier | **16** |
| Mixte V1/V2 à scinder | **7** |
| Procédure V1 remplacée | **6** |
| **Total** | **29** |

Les anciens automatismes **FIT** (rubriques ROL-10, ROL-15, ROL-16), les chemins d'écriture `personnel/` (ROL-17 et ROL-20) et l'ancien déclencheur de publication (ROL-29) ne doivent pas reprendre autorité sur V2. En revanche, **les règles de continuité, de prise en compte des faits, d'étirements et d'aide PNG** qui figurent parfois dans ces passages ne doivent pas disparaître par la simple suppression des sections.

La frontière HTML est particulièrement sensible : la section ROL-19 réservait la page entière à Maturation, tandis que l'autorisation V2 permet au Coach une **correction strictement locale du rendu métier**, sans accès à la navigation, aux contrats ou aux scripts. Toute consolidation doit conserver cette limite et ne pas accorder de nouveau droit.

Les 29 entrées, bornes et motifs sont enregistrés dans [REVUE-ROLES-29-RUBRIQUES.json](REVUE-ROLES-29-RUBRIQUES.json). Avec les 30 rubriques de `docs/REPRISE.md`, **59 sur 161 rubriques historiques de niveau H2–H4 sont désormais qualifiées par un premier passage**, mais **aucune certification exhaustive** n'est déduite de ce chiffre.

**Suite :** poursuivre le décompte par clauses des six autres sources ; définir une fiche active unique Coach/Maturation + un registre d'exceptions, puis demander une validation à la fois documentaire, de permissions et du propriétaire avant de toucher `AGENTS.md` ou aux procédures en production.
