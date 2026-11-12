# Audit anti-contournement des contrôles de gouvernance

**Date :** 13 novembre 2026. **Statut :** contrôles déterministes renforcés sur la branche, sans autorisation de fusion.

## Défauts mis en évidence
1. Les numéros de ligne de `AGENTS.md` référencés depuis la matrice étaient ceux des consignes historiques, mais l'insertion du préambule dans la branche les avait **décalés**. La CI vérifiait la présence d'une ligne et pouvait ainsi produire un faux positif.
2. `AGENTS.md` pouvait acquérir une nouvelle instruction expérimentale sans perdre le suffixe historique, car le contrôle ne validait pas le **contenu exact du préambule**.

## Correction
- Chaque exigence a un lien vers la version immuable `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4` dans GitHub, avec la ligne d'origine. Les **85 attributions et les 85 liens de la matrice** utilisent le même SHA. Le contrôle valide SHA, chemin, ligne et présence au commit initial.
- Le fichier `AGENTS.md` entier est comparé **octet par octet** à la version du premier commit expérimental `7a8016955cf74f312e40fc7b82bccca84020c9eb`, indépendamment de son contenu historique qui reste également vérifié.
- Des tests tentent de falsifier le SHA d'une source, de faire pointer un lien hors limites et de modifier le préambule : ces cas doivent être **refusés**.

## Frontières de la garantie
Le fait qu'une ligne existe dans le bon commit **ne prouve pas** que son contenu justifie sémantiquement l'exigence qui lui est attribuée ; le Gardien doit encore l'examiner. Le verrou agit sur les fichiers Git versionnés, pas sur Garmin Connect ou sur des conversations ChatGPT. Il n'introduit aucun agent autonome, n'accorde aucune permission d'exécution et ne fusionne rien dans `main`.

Toute évolution de `AGENTS.md` doit repasser par le processus de changement approuvé, puis ajuster **explicitement** le test sous revue, au lieu de le désactiver silencieusement.
