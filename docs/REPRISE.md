# Reprendre le projet avec un nouvel agent

Ce document est un guide de prise en main **sans historique de discussion**. Le dépôt est public : il ne doit contenir aucun secret.

## Chemin de lecture obligatoire

1. [AGENTS.md](../AGENTS.md) — règles permanentes, notamment **aucun ajout graphique sans demande ou approbation explicite**.
2. [CONTEXTE.md](CONTEXTE.md) — présentation du produit, fonctionnement et état actuel.
3. [DECISIONS.md](DECISIONS.md) — décisions et décisions abandonnées.
4. [JOURNAL.md](JOURNAL.md) — journal des travaux, prochaines tâches et éventuels blocages.
5. [README.md](../README.md) — documentation utilisateur.
6. [index.html](../index.html), [programme.js](../programme.js) — la réalité de l'implémentation, à privilégier si un document est devenu obsolète.

## Première intervention de l'agent

- Reformuler uniquement la demande en cours, sans lancer une refonte non demandée.
- Vérifier les fichiers actuels sur la branche `main` et leur contenu avant d'écrire.
- Respecter exactement les intitulés et dates de séances existants, sauf instruction contraire.
- Vérifier les identifiants de séances `id` : les coches locales dépendent de leur stabilité. **Ne pas régénérer les identifiants** en renommant les séances.
- Vérifier la semaine civile du lundi au dimanche et l'ouverture sur la semaine courante.
- Ne pas ajouter de nouvelle zone, illustration, texte décoratif, bouton, graphique ou pied de page de sa propre initiative.
- Si une amélioration visuelle semble utile, la suggérer sans l'implémenter, jusqu'à approbation.
- Après le changement, mettre à jour les documents concernés et ajouter une entrée datée au `JOURNAL.md` (avec résultats de tests et commit si connu).
- Ne pas annoncer que la publication GitHub Pages est effective si elle n'a pas été vérifiée.

## Ajouter ou modifier une séance

Les données sont dans `programme.js`, variable `window.MON_RYTHME_PROGRAMMES`, avec une clé par **lundi** au format AAAA-MM-JJ et un tableau de séances sous chaque clé. Chaque séance a `date`, `titre`, `id` et éventuellement `type`, `duree`, `details`, `objectif`, `etapes`.

- Les séances avec course utilisent `id: "course-AAAA-MM-JJ"`.
- Les séances de kiné utilisent `id: "kine-AAAA-MM-JJ"` et `type:"kine"`.
- Le suivi est enregistré dans `localStorage["mon-rythme-suivi-v1"]`, sur chaque appareil. Un nouveau `id` ferait perdre l'association avec l'ancienne coche.
- Si plusieurs séances de même type sont programmées le même jour, leurs identifiants devront être rendus uniques sans modifier ceux des séances déjà publiées.
- **N'ajouter aucune heure fictive** ; les rendez-vous existants n'ont pas d'heures renseignées.
- Ne jamais stocker les cases réalisées dans GitHub.

## Vérifications après modification

1. `programme.js` reste du JavaScript valide ; les semaines et dates correspondent.
2. `index.html` s'ouvre sans erreur JavaScript et reste utilisable sur petit écran.
3. Les cases « Réalisé » peuvent être cochées/décochées dans le détail du jour et la liste de la semaine ; les deux présentations reflètent la même donnée.
4. Après rechargement, le suivi local est conservé ; pas de synchronisation interappareil.
5. La date et le bouton « Semaine en cours » restent dynamiques.
6. Le site n'a reçu **aucun ajout visuel non approuvé**.
7. Pour la mise en ligne, distinguer **commit sur main**, **déploiement Pages** et **vérification réelle de l'URL**.

## Demande-type à coller dans une nouvelle conversation

> Reprends le projet GitHub public `hameaufl/programme-sport`. Commence par lire `AGENTS.md`, `docs/REPRISE.md`, `docs/CONTEXTE.md`, `docs/DECISIONS.md` et `docs/JOURNAL.md`, puis les sources. Applique strictement la règle d'absence d'ajouts graphiques sans mon accord. Effectue uniquement les changements que je te demanderai et journalise-les.

## Limites du transfert

Ces fichiers forment une **mémoire de projet structurée**, pas une copie intégrale du chat. Les passages exacts des conversations privées ne sont pas déposés automatiquement dans le dépôt public. Les décisions importantes et les changements de direction sont récapitulés dans `DECISIONS.md`. La conversation nouvelle et les instructions explicites du propriétaire font autorité sur cette documentation.
