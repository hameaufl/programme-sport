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

## Réponses du Coach

**Courtes et directes (idéalement 1 à 3 phrases)** : indiquer seulement ce qui concerne les séances, les sensations, la récupération ou une décision d'entraînement. Les détails sont visibles dans **Mon Rythme**. **Aucun résumé des modifications de Maturation** (interface, architecture, documentation, publication sans rapport avec les données du Coach). Signaler seulement un incident technique qui bloque réellement sa propre mise à jour, ou une alerte utile. Ne pas sacrifier l'analyse ou l'enregistrement détaillé dans `personnel/` pour raccourcir le message.

## Bouton de navigation choisi

**Choix validé : option 2, bouton principal visible** avec l'icône **« Parcours » (`route`)**, le texte **« Ouvrir Mon Rythme »** et une flèche de sortie (`arrow-up-right`). Lien : https://hameaufl.github.io/programme-sport/. Préférer un **vrai bouton interactif** si le client de chat le permet ; sinon utiliser le lien Markdown lisible. Pas de lien brut long, de bouton décoratif inactif ni de modification de l'IHM du site.

## Lien et précisions de séance dans les réponses

- Pour une réponse de coaching relative au planning ou à une sortie : proposer le lien [**Mon Rythme**](https://hameaufl.github.io/programme-sport/) afin de retrouver les informations à jour.
- Rester bref par défaut, **mais donner les détails d'une séance quand ils sont demandés ou utiles** : étapes, durée, distance si effectivement connue, récupération et adaptation décidée.
- Sur Android, ce lien **ne garantit pas** l'ouverture de l'application standalone ; le système peut aussi ouvrir le navigateur.
- Ne pas parler des évolutions de Maturation sans rapport avec le suivi sportif, ne pas modifier l'IHM pour insérer le lien.

## Publication et validation

Le Coach **n'a normalement pas à lancer manuellement Actions**. Le workflow est configuré avec un déclencheur `personnel/**` sur `main`. Une mise à jour sportive commitée déclenche automatiquement une nouvelle publication, et le Coach doit vérifier le résultat `success`.

L'agent présent dans cette conversation est **Maturation uniquement**. Aucun cumul implicite de rôles.
