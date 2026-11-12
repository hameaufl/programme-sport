# Contexte technique — Maturation

Mon Rythme : site statique responsive et francophone, GitHub Pages via GitHub Actions, branche `main`.

## Arborescence actuelle

- `index.html` : page de programme, jours et navigation **hebdomadaire** ; lit un index JSON léger puis uniquement la semaine consultée.
- `sante.html` : suivi santé (profil, indicateurs et événements datés paginés).
- `personnel/seances/AAAA/MM/<id>.json` : une séance individuelle par source canonique, avec identifiant stable, programme prévu, statut, sensations et structures renseignées.
- `personnel/config.json` : objectifs du cycle, début de cycle et version du schéma.
- `personnel/sante/PROFIL.md`, `personnel/sante/rapports/`, `personnel/sante/evenements/` : profil santé, rapports liés aux séances, événements datés.
- `personnel/DECISIONS.md`, `personnel/JOURNAL.md`, `personnel/GARMIN.md` et `personnel/pieces-jointes/` : décisions et historique du Coach, Garmin et pièces jointes.
- `personnel/CONTEXTE-COACH.md` : **futur point d'entrée à créer/entretenir par le Coach**, pour les faits transversaux de personnalisation qui n'appartiennent pas à une autre source. Pas de duplication des séances ou de leurs rapports.
- `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md`, `docs/CONTRAT-CONTINUITE-COACH.md` : instructions prioritaires pour la reprise et la continuité métier.
- `scripts/donnees.cjs`, `scripts/verifier-site.cjs`, `scripts/verifier-changements.cjs`, `scripts/construire-site.cjs` : collecte, validation et génération.
- `.github/workflows/publier-pages.yml` : contrôle et publication.

## Fonctionnement

- Affichage par semaine, du lundi au dimanche ; boutons « semaine précédente », « semaine suivante », « semaine en cours » inchangés.
- Statut « Fait » seulement si `fait:true`. Détail : « Séance », « Structures sollicitées », « Sensations » ; FIT Workout téléchargeable si pièce jointe existante.
- Les vues `data/index.json`, `data/semaines/<lundi>.json` et `data/sante/journal/` sont **générées dans `_site/`**, jamais modifiées comme sources Git.
- Le générateur peut maintenir des exports agrégés de compatibilité pour d'anciens HTML mis en cache ; ce ne sont pas des sources du Coach.
- Pas de saisie navigateur ni de `localStorage`. Pas d'ajout visuel sans demande/approbation.

## Mémoire métier et responsabilités

- **Le Coach** est seul responsable des informations personnelles et métier sous `personnel/`. Toute donnée pertinente à la personnalisation, même sans modification du programme immédiate, doit être persistée sur GitHub avec sa source, ses nuances, son évolution et sa justification.
- **Maturation** maintient architecture, IHM, scripts, tests et documents techniques, **sans rédiger ni réinterpréter les faits du Coach**.
- [Contrat de continuité du Coach](CONTRAT-CONTINUITE-COACH.md) : précise comment préserver la finesse de personnalisation lors d'un changement de LLM et comment relire les sources sans duplication.
- **« Mets-toi à jour » seul** : lecture seule du GitHub, aucun commit.

## Publication et sécurité

Tout commit de programme sous `personnel/` déclenche normalement GitHub Actions. Le build contrôle les données et génère les semaines et événements avant publication. **Vérifier `success`**, pas seulement le push.

Les pages utilisent `noindex, nofollow`, mais **le dépôt et les données sont publics**. Ne pas publier de secrets/jetons ni de données inutiles de tiers. Une confidentialité stricte demanderait une architecture différente.
