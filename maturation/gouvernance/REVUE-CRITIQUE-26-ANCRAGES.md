# Réexamen critique des 26 candidats de provenance — rubriques V1/V2

**13 novembre 2026 · Analyse croisée préparatoire, sans correction de matrice ni nouvelle provenance validée.**

Sources : [PROPOSITIONS-26-ANCRAGES.json](PROPOSITIONS-26-ANCRAGES.json), [EXAMEN-CRITIQUE-26-ANCRAGES.json](EXAMEN-CRITIQUE-26-ANCRAGES.json), et les quatre revues couvrant désormais les **161 rubriques** du `main` historique `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`.

Sur **26 candidats** :
- **4** sont situés dans une rubrique **mixte V1/V2** ;
- **1** dans une rubrique **V1 explicitement remplacée** ;
- **1** n'a **aucune source historique candidate** (`REF-06`) ;
- **20** renvoient à une rubrique classée « courant à vérifier », ce qui ne rend pas leur attribution complète ni certifiée. Parmi ces vingt, l'ancrage `STR-04` est déjà jugé **insuffisant** dans la proposition initiale.

## Sept décisions de traitement proposées

| Référence | Rubrique historique | Problème | Suite sans écriture normative |
| --- | --- | --- | --- |
| `MAT-17` | `AGN-32` — mixte | Compatibilité d'anciens caches dans `personnel/` ; ancienne technique ne prouve pas l'usage V2 | Conserver la preuve de compatibilité, vérifier contre les scripts de build actuels, ne pas raviver la source V1 |
| `MAT-20` | `AGN-50` — V1 remplacée | Principe utile de non-duplication situé dans une prescription monolithique dépassée | Trouver une nouvelle preuve active dans `contrats/DEPENDANCES.md` ou les ports V2 avant promotion |
| `PLA-05` | `AGN-05` — mixte | Préservation de détails Planification mêlée à une permission historique Garmin | Séparer la preuve des blocs canoniques de la clause d'écriture/suppression |
| `PLA-07` | `AGN-29` — mixte | Ancienne banque PNG ou champ `etapes` ; l'architecture V2 projette les médias depuis les blocs | Tester `mouvementId` → banque de médias → projection ; interdire la copie d'un champ obsolète |
| `PLA-08` | `AGN-11` — mixte | Règle utile de non-recréation attachée à un ancien brouillon daté | Préserver la règle de non-automaticité, ne jamais réinstaller les anciennes dates |
| `STR-04` | `CON-10` — plausible V2 | La ligne citée ne prouve pas toute la liste des décisions sportives | Rechercher des preuves distinctes pour maintenir, alléger, reporter ou attendre |
| `REF-06` | aucune | « Le registre du Gardien est un index » semble une innovation de gouvernance, pas une ancienne obligation | Arbitrer explicitement un éventuel passage de **73/12** à **72/13**, sans le faire de manière silencieuse |

**Les cinq ancrages mixtes/obsolètes ne sont pas nécessairement faux pour chaque fragment de la règle.** Ils ne peuvent cependant servir de preuve de règle *actuelle* sans séparation du contenu V1 dépassé. Et une source classée « courant plausible » **n'est pas une certification de toutes les sous-clauses**.

## Contrôles et garde-fous

Le fichier JSON conserve pour chaque candidat son identifiant d'exigence, sa ligne Git épinglée, la rubrique historique exacte, son état provisoire, l'avertissement et le statut **non appliqué**. `verifier-examen-26-ancrages.cjs` empêche d'inventer une provenance pour `REF-06`, de dissimuler une source V1 ou de déclarer une validation/rectification inexistante. Ses tests n'évaluent **pas** la pertinence sémantique d'une source.

**Aucune modification** de `COUVERTURE-PROTOCOLES.json`, `MATRICE-COUVERTURE.md`, des 8 INC, de la documentation opérationnelle ou des sources métier. La correction des lignes de la matrice nécessitera un travail de preuve clause par clause, la revue Gardien et les arbitrages de provenance appropriés.
