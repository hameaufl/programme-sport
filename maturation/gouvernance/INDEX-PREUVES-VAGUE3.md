# Vague 3 — index de preuves techniques sans copie de contenu

**13 novembre 2026 · État préparatoire, aucune opération d'archivage ou de purge.** Les six pièces recensées sont épinglées au commit `cf9241b9740be8e6c3f80058a45f76e197a4bb44` de `main`. Leurs identifiants Git sont enregistrés dans [l'index vérifiable](INDEX-PREUVES-VAGUE3.json). **Ce registre ne reproduit aucun journal, décision, donnée médicale ou contexte personnel.**

| Pièce | Rôle historique | État |
| --- | --- | --- |
| `docs/DECISIONS.md` | Décisions historiques (contenu potentiellement métier) | Conserver sur place ; référence depuis `AGENTS.md` |
| `docs/JOURNAL.md` | Journal historique (contenu potentiellement métier) | Conserver sur place ; référence depuis `AGENTS.md` |
| `maturation/architecture/ETAT.md` | État et preuves de la refonte | Conserver sur place |
| `maturation/architecture/PLAN.md` | Plan de refonte historique | Conserver sur place ; références depuis `README.md` et `AGENTS.md` |
| `scripts/migration-preuve.json` | Pièce ponctuelle de migration | Conserver sur place |
| `maturation/architecture/README-personnel-historique.md` | Note technique V1 conservée | Conserver sur place, séparation documentaire envisageable après autorisation |

## Recherche de dépendances contrôlable

Une inspection des **17 fichiers de code et workflows V2** sous `scripts/`, `adaptateurs/`, `maturation/architecture/` et `.github/workflows/` n'a trouvé **aucun emploi textuel direct des six chemins complets**. Une inspection parallèle de **10 documents de référence** a trouvé les renvois cités dans le tableau. Les chemins et la liste exacte des fichiers inspectés sont conservés dans le JSON ; les assertions automatiques vérifient le même échantillon au SHA fixé.

**Limite :** une absence de chaîne littérale **ne prouve pas** l'absence de références calculées, de liens externes, de dépendances historiques ou de contenus encore nécessaires. Des liens Markdown relatifs peuvent ne pas utiliser le chemin racine intégral. Ce contrôle **n'autorise aucune suppression**.

## Décisions et non-perte

Avant tout déplacement futur, exiger : relecture de chaque obligation encore active, récupération certaine des faits et preuves, audit des importations et références réelles, choix d'un espace d'archives pérenne, retour arrière, recherche de liens externes connus et **accord explicite du propriétaire pour chaque chemin**. Pour les deux journaux, ne pas copier de matière personnelle dans la gouvernance.

Ne pas confondre retrait du fichier courant et purge de l'histoire Git publique, qui exige un projet de confidentialité séparé. Les blobs et tailles sont la **trace sans perte** de l'état actuel, pas une validation de transfert ou d'effacement.

Le chantier de gouvernance PR #9 reste en brouillon ; la PR #12 de correction du README racine est également **en brouillon, sans fusion**.
