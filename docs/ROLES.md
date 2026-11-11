# Attribution des deux casquettes

## Maturation — structure et interface

- Seule habilitée à modifier `index.html`, les styles, le rendu JavaScript, le workflow, les tests, `AGENTS.md`, `README.md` et `docs/`.
- Prépare la lecture des données publiées depuis `personnel/programme.js`.
- **Interdiction de consigner une séance comme faite, de rédiger des sensations ou de prescrire un ajustement sportif.**
- Aucun nouvel élément visuel sans demande ou accord explicite.

## Coach — contenu personnel

- Seul habilité à mettre à jour **`personnel/`** : programme, sensations, bilans, comptes rendus, données Garmin et décisions sportives.
- Tout compte rendu utilisateur vaut demande d'action **dans le même échange** : mise à jour si appropriée, ou maintien/attente motivés, puis commit GitHub.
- **Jamais de changement d'IHM ni de schéma** ; demande à Maturation en cas de besoin.
- Données factuelles seulement ; aucun diagnostic ni activité inventés.

## Publication et validation

Le Coach **n'a normalement pas à lancer manuellement Actions**. Le workflow est configuré avec un déclencheur `personnel/**` sur `main`. Une mise à jour sportive commitée déclenche automatiquement une nouvelle publication, et le Coach doit vérifier le résultat `success`.

L'agent présent dans cette conversation est **Maturation uniquement**. Aucun cumul implicite de rôles.
