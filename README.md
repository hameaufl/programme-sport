# Programme Sport — Mon Rythme

Site statique de consultation du programme sportif, adapté au téléphone et à l'ordinateur.

## Architecture

- `index.html` : interface responsive, navigation entre les semaines et détail des sorties.
- `programme.js` : **source unique du programme**, modifiée lors de l'intégration des vrais tableaux.
- `favicon.svg`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png` : icônes de l'application.
- `.nojekyll` : publication GitHub Pages sans traitement Jekyll.

Aucune base de données, aucun formulaire de saisie, aucune case de suivi, aucun nombre de sorties imposé. Les sorties sont affichées seulement lorsqu'elles ont été ajoutées à `programme.js`.

## Publier

Ce dépôt contient les fichiers du site à la racine de la branche `main`.

Activer **GitHub Pages** dans **Settings → Pages** :

1. Sous **Build and deployment**, choisir **Deploy from a branch**.
2. Branche : **main** ; dossier : **/(root)** ; puis **Save**.
3. Site attendu : https://hameaufl.github.io/programme-sport/

Les modifications futures de `programme.js`, une fois fusionnées dans `main`, mettent à jour le programme sur les deux appareils après déploiement.

## Format du programme

`window.MON_RYTHME_PROGRAMMES` est un objet indexé par les lundis, au format `AAAA-MM-JJ`. Chaque semaine contient un tableau de zéro, une ou plusieurs sorties, avec les champs :

- `date` : jour de la sortie au format `AAAA-MM-JJ` (obligatoire) ;
- `titre`, `heure`, `duree`, `distance`, `objectif`, `details` ;
- `etapes` : liste facultative des parties de séance.

**Exemple fictif uniquement, à ne pas intégrer au programme réel :**

```js
window.MON_RYTHME_PROGRAMMES = {
  "2026-11-09": [
    {date:"2026-11-11",titre:"Sortie",heure:"10:00",duree:"45 min",details:"Séance fournie dans le tableau."}
  ]
};
```

## Visibilité

Le dépôt GitHub et le site GitHub Pages sont **publics**. Ne pas y commiter de données confidentielles.

## Vérification après activation

- Attendre la fin du premier déploiement GitHub Pages dans l'onglet **Actions**.
- Ouvrir https://hameaufl.github.io/programme-sport/ sur ordinateur et téléphone.
- Si une page 404 s'affiche, vérifier **Settings → Pages → Deploy from a branch → main → /(root)**.
- Les sorties affichées proviennent uniquement de `programme.js`. Il n'y a aucun suivi à cocher ni donnée sauvegardée dans le navigateur.
