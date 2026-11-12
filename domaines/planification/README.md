# Planification — domaine métier autonome

Les fichiers `donnees/seances/AAAA/MM/<id>.json` décrivent uniquement les séances **prévues**, via des `blocs` structurés. `donnees/cycle.json` contient le début du cycle; `donnees/mouvements.json` les identifiants de mouvement et leurs titres métier. Aucun état réalisé, symptôme, PNG, chemin FIT ou information du navigateur ne doit figurer ici.

Les formats visibles (puces et durée) sont produits par `modele.cjs`. Le générateur FIT consomme directement `blocs` et non les libellés rendus par l'interface. Toute séance `renfo` avec étirements se termine par ceux-ci, sans retour au calme supplémentaire. Les modifications de prescriptions sont du ressort du Coach; le modèle technique du ressort de Maturation.
