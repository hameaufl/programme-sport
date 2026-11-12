# Ports de lecture par domaine

Les dépendances sont injectables dans `adaptateurs/projections/lecture.cjs` :

- `planification.cycle()`, `planification.mouvements()`, `planification.seances()`, `planification.parId(id)`;
- `activites.seances()`, `activites.estRealisee(id)`;
- `sante.observations()`, `sante.rapports()`, `sante.evenements()`, `sante.profil()`;
- `coaching.objectifs()`.
- `medias.images(catalogue)` et `garmin.reference(seanceId)` sont des ports **optionnels**, propres aux consommateurs.

La première implémentation de ces ports se trouve sous `adaptateurs/fichiers/depots.cjs`; un remplacement du stockage Santé exige **seulement** une nouvelle implémentation de `sante`, pas de changement dans Planification, Coaching ou l'add-on Web.

L'interface affiche un **contrat de lecture versionné**, généré après jointure explicite par `seanceId` et filtrage avec `contrats/publication-v1.json`. Le domaine Santé n'importe jamais une définition de page et le domaine Planification n'importe jamais de fichier Garmin.
