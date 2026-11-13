# Second passage sur 26 ancrages sémantiques

**Statut : propositions de remplacement à vérifier, NON APPLIQUÉES à la matrice**, afin de ne pas transformer une lecture partielle en validation de provenance.

Sur les **26 attributions** initialement repérées (13 clairement hors sujet, 13 trop approximatives), le second passage a repéré :

| Qualification | Nombre |
| --- | ---: |
| partielle | 7 |
| directe | 17 |
| insuffisante | 1 |
| provenance a arbitrer | 1 |
| **Total** | **26** |

Les sources candidates sont épinglées à des **lignes réelles du `main`** dans [PROPOSITIONS-26-ANCRAGES.json](PROPOSITIONS-26-ANCRAGES.json). Une ligne directe ne suffit pas nécessairement à couvrir toutes les sous-clauses de l'exigence ; les lignes partielles et insuffisantes sont identifiées explicitement.

**Point de vigilance particulier : REF-06.** La règle « le registre du Gardien est un index » n'a pas de fondement historique convaincant dans le `contrats/DEPENDANCES.md` cité. Elle semble être **une treizième proposition nouvelle de gouvernance**, sous réserve d'arbitrage formel. On ne corrige **pas** silencieusement le décompte validé mécaniquement 73/12. Une révision transparente du schéma et des preuves sera nécessaire si la requalification est retenue.

**Conséquence :** l'audit sémantique reste incomplet. Avant application à `COUVERTURE-PROTOCOLES.json`, valider clause et contre-clause, sourcer les exigences composites et mettre à jour avec tests les champs de provenance. Les anciennes associations restent traçables.
