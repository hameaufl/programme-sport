# Planification — domaine métier autonome

Les fichiers `donnees/seances/AAAA/MM/<id>.json` décrivent uniquement les séances **prévues**, via des `blocs` structurés. `donnees/cycle.json` contient le début du cycle; `donnees/mouvements.json` les identifiants de mouvement et leurs titres métier. Aucun état réalisé, symptôme, PNG, chemin FIT ou information du navigateur ne doit figurer ici.

Les formats visibles (puces et durée) sont produits par `modele.cjs`. L'adaptateur Garmin MCP prépare ses opérations à partir des `blocs`, sans dépendre du Web. Aucun fichier d'entraînement local n'est généré ni publié ; toute création/programmation distante exige les dates explicitement demandées par l'utilisateur pendant la bêta. Toute séance `renfo` avec étirements se termine par ceux-ci, sans retour au calme supplémentaire. Les modifications de prescriptions sont du ressort du Coach; le modèle technique du ressort de Maturation.

## 12 novembre 2026 — Premier nouveau Renfo

14 anciennes prescriptions sorties du calendrier, chacune conservée **intégralement** en archive sous `archives/2026-11-12/`. Une seule séance nouvelle prévue provisoirement le 14 novembre, non réalisée, et à faire valider avant tout appel d'écriture Garmin. Ne pas relancer automatiquement le cycle antérieur.

## 12 novembre 2026 au soir — Rectification prioritaire du premier Renfo

Sur demande du propriétaire, le seul brouillon actif est déplacé du 14 au **12 novembre** (`renfo-2026-11-12`), sans être marqué réalisé ni créer de modèle Garmin. L'ancien fichier du brouillon 14 est archivé intégralement dans `domaines/planification/archives/2026-11-12/brouillon-renfo-2026-11-14-avant-report.json`. Mise en route dansée douce 5 min et étirements détaillés 3 min ; durée indicative 31–34 min. Les anciennes prescriptions archivées ainsi que les séances Course/Kiné et activités confirmées sont inchangées.

## 12 novembre 2026 au soir — Nouveau report du premier Renfo

La seule séance active est désormais `renfo-2026-11-13` (**vendredi 13 novembre**) au lieu du brouillon `renfo-2026-11-12`, conservé intégralement dans `domaines/planification/archives/2026-11-12/brouillon-renfo-2026-11-12-avant-report.json`. Échauffement libre de **4 min**, étirements doux de **3 min** sans vidéo fixée ; exercices et séries inchangés. Séance non réalisée et sans modèle Garmin créé. Une course existe déjà ce même jour et reste inchangée sous réserve d'un réexamen du confort à l'appui ; les archives et activités passées sont conservées.

## 12 novembre 2026 — Nom exact de l'entraînement à charger

Pour **toute séance associée à un modèle Garmin créé et relu**, enregistrer obligatoirement son nom textuel exact dans `nomEntrainementMontre` de la source Planification correspondante. La projection publique sous contrat `publication-v1.json` affiche alors « Entraînement à charger sur la montre : <nom> » au-dessus des étapes. Aucune référence chiffrée, aucun lien ni détail du modèle Garmin n'est publié ; le contrat privé n'expose pas ce nom. Le modèle canonique vérifie la validité du champ ; si aucun entraînement n'existe encore, **ne pas inventer de nom**. Les prescriptions restent intégrales dans les blocs métier et la programmation distante reste une action séparée soumise à autorisation.
