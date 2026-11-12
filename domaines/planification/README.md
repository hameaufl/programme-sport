# Planification — domaine métier autonome

Les fichiers `donnees/seances/AAAA/MM/<id>.json` décrivent uniquement les séances **prévues**, via des `blocs` structurés. `donnees/cycle.json` contient le début du cycle; `donnees/mouvements.json` les identifiants de mouvement et leurs titres métier. Aucun état réalisé, symptôme, PNG, chemin FIT ou information du navigateur ne doit figurer ici.

Les formats visibles (puces et durée) sont produits par `modele.cjs`. L'adaptateur Garmin MCP prépare ses opérations à partir des `blocs`, sans dépendre du Web. Aucun fichier d'entraînement local n'est généré ni publié ; toute création/programmation distante exige les dates explicitement demandées par l'utilisateur pendant la bêta. Toute séance `renfo` avec étirements se termine par ceux-ci, sans retour au calme supplémentaire. Les modifications de prescriptions sont du ressort du Coach; le modèle technique du ressort de Maturation.

## 12 novembre 2026 — Premier nouveau Renfo

14 anciennes prescriptions sorties du calendrier, chacune conservée **intégralement** en archive sous `archives/2026-11-12/`. Une seule séance nouvelle prévue provisoirement le 14 novembre, non réalisée, et à faire valider avant tout appel d'écriture Garmin. Ne pas relancer automatiquement le cycle antérieur.
