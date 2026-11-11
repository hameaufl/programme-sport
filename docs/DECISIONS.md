# Décisions techniques — Maturation

Les décisions individuelles et la planification sportive se trouvent dans [personnel/DECISIONS.md](../personnel/DECISIONS.md), sans copie des données dans ce document.

- **Site** : publication GitHub Pages via Actions, `main`, calendrier hebdomadaire et affichage statique en lecture seule.
- **Rôles** : Coach exclusivement chargé des données sous `personnel/` ; Maturation exclusivement chargée du rendu, des conventions et de la publication. Pas de cumul automatique.
- **IHM** : aucune évolution visuelle sans demande/accord ; ✓ « Fait » uniquement après confirmation, aucune case interactive ou stockage local ; objectifs issus du fichier personnel.
- **Qualité** : prévalidation JavaScript/données/témoin par `node scripts/verifier-site.cjs`.
- **Déploiement** : `build` et `deploy` séparés ; contrôle API de l'artefact suite aux erreurs observées dans [actions/deploy-pages#451](https://github.com/actions/deploy-pages/issues/451).
- **Automatisation** : tout commit Coach sur `personnel/**` déclenche Pages, sans lancement manuel ; vérifier l'état `success` après publication.
- **Ségrégation récente** : déplacement du programme, du suivi santé et du futur espace Garmin sous `personnel/`, **sans second exemplaire versionné**. Les fichiers construction ne reprennent pas le programme individuel.
- **Historique** : les anciennes règles de suivi local, et la publication Pages classique depuis la branche, ont été abandonnées. Les décisions plus anciennes restent accessibles dans les commits Git.
