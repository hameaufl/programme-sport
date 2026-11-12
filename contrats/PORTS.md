# Ports de lecture par domaine

Les dépendances sont injectables dans `adaptateurs/projections/lecture.cjs` :

- `planification.cycle()`, `planification.mouvements()`, `planification.seances()`, `planification.parId(id)`;
- `activites.seances()`, `activites.estRealisee(id)`;
- `sante.observations()`, `sante.rapports()`, `sante.evenements()`, `sante.profil()`;
- `coaching.objectifs()`, `coaching.equipements()` (inventaire du matériel confirmé, jamais publié dans le Web).
- `medias.images(catalogue)` est un port d’illustration facultatif. La gestion des entraînements connectés relève d’un adaptateur distinct, jamais des vues Web.

La première implémentation de ces ports se trouve sous `adaptateurs/fichiers/depots.cjs`; un remplacement du stockage Santé exige **seulement** une nouvelle implémentation de `sante`, pas de changement dans Planification, Coaching ou l'add-on Web.

L'interface affiche un **contrat de lecture versionné**, généré après jointure explicite par `seanceId` et filtrage avec `contrats/publication-v1.json`. Le domaine Santé n'importe jamais une définition de page et le domaine Planification n'importe jamais de format ou identifiant de synchronisation externe.
