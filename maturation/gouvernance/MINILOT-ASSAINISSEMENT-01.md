# Mini-lot documentaire n°1 — préparation et décision à obtenir

**Statut : préparé, non approuvé, aucune écriture de source V2 dans `main`.**

### Cibles proposées

| Fichier actuel | Liens entrants détectés dans le corpus de 39 | Traitement proposé |
| --- | ---: | --- |
| `adaptateurs/README.md` | 0 | Remplacer la formulation générique « FIT Garmin » par l'architecture Garmin MCP V2 ; texte prêt |
| `docs/CONTEXTE.md` | 1 (`AGENTS.md`) | Remplacer la description mêlant les anciens chemins `personnel/` par le contexte V2 ; texte prêt |
| `maturation/architecture/README-personnel-historique.md` | 0 | **Pas encore de suppression** : dossier de preuve de migration, liens externes inconnus |

Les deux propositions prêtes sont [PROPOSITION-CONTEXTE-TECHNIQUE-V2.md](PROPOSITION-CONTEXTE-TECHNIQUE-V2.md) et [PROPOSITION-README-ADAPTATEURS-V2.md](PROPOSITION-README-ADAPTATEURS-V2.md). Ce sont des **brouillons hors de leur emplacement opérationnel**, uniquement sur la branche de gouvernance.

### Vérification préalable
- L'étude des références [ETUDE-DEPENDANCES-NETTOYAGE.json](ETUDE-DEPENDANCES-NETTOYAGE.json) couvre 39 documents, scripts, contrats et workflows de `main` au SHA `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`, pas les domaines métier ni les renvois externes.
- Les références dans des conversations ChatGPT anciennes, fichiers non analysés, issues ou liens Web publics peuvent persister.
- Avant une modification effective, fournir le diff exact, une preuve que les procédures actuelles sont intactes, un plan de retour arrière et l'approbation du propriétaire sur chaque fichier.
- Aucun retrait des documents `AGENTS.md`, `docs/REPRISE.md`, des décisions techniques, données sportives ni des archives Renfo dans ce mini-lot.

**Aucun outil Garmin n'a été appelé en écriture, aucun fichier de production n'est modifié et la PR expérimentale reste brouillon.**
