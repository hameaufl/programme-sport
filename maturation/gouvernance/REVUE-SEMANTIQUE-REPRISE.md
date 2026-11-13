# Premier passage de consolidation sémantique : docs/REPRISE.md

**13 novembre 2026. Source :** `main` `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. Le document [REVUE-REPRISE-30-RUBRIQUES.json](REVUE-REPRISE-30-RUBRIQUES.json) décrit les **30 rubriques H2** avec leurs bornes exactes, qualification provisoire et raison. **La lecture a été faite rubrique par rubrique ; cela ne valide pas chaque clause à l'intérieur.**

| Statut | Nombre | Signification |
| --- | ---: | --- |
| Courant à vérifier contre V2 et les tests | 16 | Principe encore plausible, lecture du code actuel nécessaire |
| Mixte V1/V2 à séparer | 10 | Règles utiles mêlées à des chemins/personnalisations historiques |
| Procédure V1 explicitement dépassée | 4 | Les rubriques FIT locaux, `personnel/` ou sources santé V1 ne doivent pas guider une écriture actuelle |
| **Total** | **30** | **Aucune source modifiée** |

**Risques concrets dans ce document :** les rubriques 14–16 prescrivent des FIT locaux, l'ancien générateur et le dossier `personnel/` ; la 23 lit la page Santé depuis ces mêmes anciennes sources. Les rubriques 17–22 et 28 conservent des consignes utiles de rédaction mais mentionnent encore des chemins V1 dans leur corps. Il serait dangereux de supprimer `docs/REPRISE.md` en entier sans absorber ses exigences de lisibilité, reprise, données confirmées, contrôle Web et permissions.

**Proposition :** préparer une nouvelle entrée opérationnelle V2 concise et stable, auditer la bonne transposition des clauses toujours valables puis seulement soumettre au propriétaire le remplacement de l'ancien document. Aucun nettoyage effectif des sources de `main` dans ce chantier.
