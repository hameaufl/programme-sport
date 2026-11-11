# Données personnelles — source unique

Responsable du **contenu** : casquette **Coach**. Maturation peut changer l'architecture, jamais le plan sportif ni les comptes rendus.

- [programme.js](programme.js) : **seul fichier versionné des séances, statuts, sensations et objectifs**. Aucun `programme.js` à la racine.
- [sante/](sante/README.md) : profil, futur bilan podologue et suivis.
- [pieces-jointes/](pieces-jointes/README.md) : fichiers réels d'activités ou entraînements Garmin, futurs.
- [GARMIN.md](GARMIN.md) : formats et contexte Garmin.
- [DECISIONS.md](DECISIONS.md), [JOURNAL.md](JOURNAL.md) : historique personnel et consignes Coach.

**Publication :** le site lit `personnel/programme.js` directement. Un commit de Coach dans `personnel/**` déclenche automatiquement [GitHub Actions](../.github/workflows/publier-pages.yml). Le Coach contrôle le run après commit ; aucun lancement manuel habituel.

**Aucune copie versionnée :** seule la ressource déployée par GitHub Pages est conditionnée dans l'artefact de site, ce qui ne crée pas de seconde source dans le dépôt.

**Dépôt public par choix explicite.** Les traces GPS futures peuvent révéler des lieux personnels, les historiques Git restent consultables. Ne pas committer de secrets Garmin.

**État :** aucune sensation, séance réalisée ou bilan podologue n'est actuellement documenté par un retour réel.
