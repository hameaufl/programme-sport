# Planification — prescriptions sportives

Les séances prévues se trouvent dans `donnees/seances/AAAA/MM/<id>.json` et sont structurées en `blocs`. `donnees/cycle.json` définit le cycle et `donnees/mouvements.json` les mouvements référencés. Les identifiants restent stables.

La planification ne détient **ni réalisation confirmée, ni sensations, ni rapport médical, ni document Garmin**. Les comptes rendus et ressentis appartiennent respectivement aux domaines Activités et Santé. Les prescriptions conservent les détails chiffrés (durées, séries, répétitions, repos, tempo) ; `modele.cjs` et les projections produisent les libellés destinés aux lecteurs.

## Séances prévues

La référence pour une séance est son fichier actif sous `donnees/seances/`. Une seule séance Renfo est actuellement présente dans la planification : `renfo-2026-11-13`, à côté des séances Course et Kiné. Les fichiers de prescription datés sous `archives/` sont conservés **comme données**, mais ne sont pas chargés dans le calendrier actif et ne déclenchent aucune recréation.

Pour le Renfo concerné, la mise en route libre de 4 minutes précède trois exercices et les étirements doux de 3 minutes clôturent le travail ; aucun bloc « retour au calme » distinct n'est ajouté lorsque les étirements sont déjà prévus. Ne pas considérer une séance prévue comme effectuée.

## Garmin et Web

`adaptateurs/garmin/mcp.cjs` prépare une signature à partir des blocs sans écrire sur le compte. Toute création, programmation, correction ou suppression Garmin nécessite une demande **explicite, précise et ciblée**. Lorsqu'un modèle Garmin est réellement confirmé, `nomEntrainementMontre` enregistre **son nom exact**, jamais un identifiant ou un nom supposé.

Le Web affiche « Programme prévu · nom » si ce nom est présent et confirmé, sinon « Programme prévu ». Les étapes Renfo y sont allégées à leurs noms, sans supprimer le moindre détail des blocs métier. Les informations sensibles et les données techniques Garmin ne doivent pas être publiées.
