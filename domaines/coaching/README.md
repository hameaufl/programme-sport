# Coaching personnalisé — décisions et continuité

`donnees/objectifs.json` contient les objectifs durables ; `donnees/equipements.json` constitue **l’inventaire structuré canonique du matériel** (disponible, absent ou non confirmé, provenance, caractéristiques) ; `donnees/CONTEXTE-COACH.md`, `DECISIONS.md`, `JOURNAL.md` et `NOTES-CYCLE.txt` conservent le raisonnement, les préférences, adaptations, motifs, versions et points à éclaircir.

Le Coach consulte par identifiant les sources Planification, Activités et Santé, mais ne les duplique pas ici. Les observations cliniques ne sont pas de simples règles de coaching. La reprise d'un autre agent doit préserver toute nuance utile, indépendamment du Web, de Garmin et du lieu de stockage.

Le Coach maintient `equipements.json` uniquement à partir d'une acquisition, d'une disponibilité ou d'une indisponibilité explicitement déclarée par le propriétaire. Un achat envisagé ne vaut pas possession. Le modèle pur `modele.cjs` expose `verifierEquipements()` et `verifierMaterielRequis()` pour contrôler les prérequis d'un exercice avant planification ; les équipements absents ou non confirmés sont bloquants. Le poids du corps n'exige aucun matériel. Le fichier reste dans le dépôt public mais ne fait pas partie des projections du site.
