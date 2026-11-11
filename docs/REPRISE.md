# Reprendre le projet avec un nouvel agent

Ce document est un guide de reprise **sans historique de discussion**. Le dépôt est public, et le propriétaire a expressément consenti au versionnement public des statuts et informations de santé qu'il transmet. Aucune donnée inventée ni aucun secret d'authentification.

## Chemin de lecture obligatoire

1. [AGENTS.md](../AGENTS.md) — règles permanentes, notamment **aucun ajout graphique sans demande ou approbation explicite**.
2. [ROLES.md](ROLES.md) — les deux casquettes **Maturation** et **Coach**.
3. [CONTEXTE.md](CONTEXTE.md) — produit, technique et coaching.
4. [Dossier santé](../sante/README.md) — profil et historique versionné **seulement si des données ont été renseignées**.
5. [DECISIONS.md](DECISIONS.md) — décisions actives et abandonnées.
6. [JOURNAL.md](JOURNAL.md) — journal des travaux et limites.
7. [README.md](../README.md) — documentation générale.
8. [index.html](../index.html), [programme.js](../programme.js) — réalité du code.

## Attribution de rôle au moment de cette passation

Le propriétaire a désigné **l'agent en charge des développements de ce chantier comme Maturation uniquement**, pas Coach. Un futur agent doit vérifier quel rôle lui est attribué, et ne pas s'approprier le coaching par défaut.

Le suivi est **100 % statique dans `programme.js`** : `fait: false/true` et `sensations: "..."`. Les deux vues présentent ces données en lecture seule. **Aucune saisie, case interactive ou donnée sauvegardée sur l'appareil**.

**Pièce attendue :** bilan du podologue (posture et appuis des pieds), non fourni à ce stade. Le propriétaire a validé le stockage public versionné ; à réception, reprendre uniquement les données réellement communiquées.

## Première intervention de l'agent

- Reformuler uniquement la demande en cours, sans lancer une refonte non demandée.
- Vérifier les fichiers actuels sur la branche `main` et leur contenu avant d'écrire.
- Respecter exactement les intitulés et dates de séances existants, sauf instruction contraire.
- Vérifier les identifiants `id` stables : ils relient les séances à leurs comptes rendus versionnés. **Ne pas régénérer les identifiants** en renommant les séances.
- Vérifier la semaine civile du lundi au dimanche et l'ouverture sur la semaine courante.
- Ne pas ajouter de nouvelle zone, illustration, texte décoratif, bouton, graphique ou pied de page de sa propre initiative.
- Si une amélioration visuelle semble utile, la suggérer sans l'implémenter, jusqu'à approbation.
- Après le changement, mettre à jour les documents concernés et ajouter une entrée datée au `JOURNAL.md` (avec résultats de tests et commit si connu).
- Ne pas annoncer que la publication GitHub Pages est effective si elle n'a pas été vérifiée.

## Répartition des décisions

- **Maturation** : continuité du projet, architecture, cache, documentation, interface uniquement à la demande. Aucun ajout graphique sans approbation.
- **Coach** : décisions de séances basées sur les retours et l'historique disponible ; possible maintien, baisse, hausse, repos, report ou attente. Réexamen dès le lendemain si utile, sans obligation d'intervenir automatiquement.
- **Santé versionnée** : le propriétaire a **explicitement accepté la visibilité publique** du dépôt. Les modèles sont encore vides. Ajouter uniquement ses bilans et retours réellement fournis, sans diagnostics inventés.
- **Cache Android** : `programme.js` doit être relu à l'ouverture avec une URL renouvelée et au retour au premier plan ; distinguer cela de la mise en cache de `index.html` ou d'un déploiement non achevé.

## Ajouter ou modifier une séance

Les données sont dans `programme.js`, variable `window.MON_RYTHME_PROGRAMMES`, avec une clé par **lundi** au format AAAA-MM-JJ et un tableau de séances sous chaque clé. Chaque séance a `date`, `titre`, `id`, `fait` (booléen, `false` jusqu'au retour confirmant la réalisation), `sensations` (texte court, `""` si aucun retour), et éventuellement `type`, `duree`, `etapes`.

- Les séances avec course utilisent `id: "course-AAAA-MM-JJ"`.
- Les séances de kiné utilisent `id: "kine-AAAA-MM-JJ"` et `type:"kine"`.
- Les statuts et notes sont **versionnés dans Git**, sous `fait` et `sensations`. `index.html` se contente de les afficher ; il n'y a plus de `localStorage`.
- Si plusieurs séances de même type sont programmées le même jour, leurs identifiants devront être rendus uniques sans modifier ceux des séances déjà publiées.
- **N'ajouter aucune heure fictive** ; les rendez-vous existants n'ont pas d'heures renseignées.
- Après retour confirmé par le propriétaire, renseigner `fait: true` et résumer ses sensations dans `programme.js`, puis créer un commit. Sans retour : laisser `fait: false` et `sensations: ""`.

## Vérifications après modification

1. `programme.js` reste du JavaScript valide ; les semaines et dates correspondent.
2. `index.html` s'ouvre sans erreur JavaScript et reste utilisable sur petit écran.
3. Les indicateurs « ☐ Fait » / « ☑ Fait » et les sensations sont **en lecture seule** et identiques dans le détail du jour et la liste de la semaine.
4. Les statuts et notes proviennent de `programme.js`, actualisé avec paramètre anti-cache ; **aucun stockage local de suivi**. Vérifier l'affichage identique sur les appareils après publication.
5. La date et le bouton « Semaine en cours » restent dynamiques ; le chargement initial de `programme.js` ajoute un paramètre anti-cache.
6. Le site n'a reçu **aucun ajout visuel non approuvé**.
7. Pour la mise en ligne, distinguer **commit sur main**, **déploiement Pages** et **vérification réelle de l'URL**.

## Demande-type à coller dans une nouvelle conversation

> Reprends le projet GitHub public `hameaufl/programme-sport`. Commence par lire `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, `docs/CONTEXTE.md`, `docs/DECISIONS.md`, `docs/JOURNAL.md` et le dossier `sante/` (si renseigné), puis les sources. Applique strictement la règle d'absence d'ajouts graphiques sans mon accord. Effectue uniquement les changements que je te demanderai et journalise-les.

## Limites du transfert

Ces fichiers forment une **mémoire de projet structurée**, pas une copie intégrale du chat. Les passages exacts des conversations privées ne sont pas déposés automatiquement dans le dépôt public. Les décisions importantes et les changements de direction sont récapitulés dans `DECISIONS.md`. La conversation nouvelle et les instructions explicites du propriétaire font autorité sur cette documentation.
