# Planification — domaine métier autonome

Les fichiers `donnees/seances/AAAA/MM/<id>.json` décrivent uniquement les séances **prévues**, via des `blocs` structurés. `donnees/cycle.json` contient le début du cycle; `donnees/mouvements.json` les identifiants de mouvement et leurs titres métier. Aucun état réalisé, symptôme, PNG, chemin FIT ou information du navigateur ne doit figurer ici.

Les formats visibles (puces et durée) sont produits par `modele.cjs`. L'adaptateur Garmin MCP prépare ses opérations à partir des `blocs`, sans dépendre du Web. Aucun fichier d'entraînement local n'est généré ni publié ; toute création/programmation distante exige les dates explicitement demandées par l'utilisateur pendant la bêta. Toute séance `renfo` avec étirements se termine par ceux-ci, sans retour au calme supplémentaire. Les modifications de prescriptions sont du ressort du Coach; le modèle technique du ressort de Maturation.

## 12 novembre 2026 — Premier nouveau Renfo

14 anciennes prescriptions sorties du calendrier, chacune conservée **intégralement** en archive sous `archives/2026-11-12/`. Une seule séance nouvelle prévue provisoirement le 14 novembre, non réalisée, et à faire valider avant tout appel d'écriture Garmin. Ne pas relancer automatiquement le cycle antérieur.

## 12 novembre 2026 au soir — Rectification prioritaire du premier Renfo

Sur demande du propriétaire, le seul brouillon actif est déplacé du 14 au **12 novembre** (`renfo-2026-11-12`), sans être marqué réalisé ni créer de modèle Garmin. L'ancien fichier du brouillon 14 est archivé intégralement dans `domaines/planification/archives/2026-11-12/brouillon-renfo-2026-11-14-avant-report.json`. Mise en route dansée douce 5 min et étirements détaillés 3 min ; durée indicative 31–34 min. Les anciennes prescriptions archivées ainsi que les séances Course/Kiné et activités confirmées sont inchangées.
