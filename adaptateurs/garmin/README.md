# Adaptateur Garmin FIT — optionnel

- Fichiers binaires prévus : `fichiers/<id>.fit`, liés par l'identifiant stable d'une prescription.
- Génération : `node scripts/generer-garmin.cjs <id>` ; l'implémentation est `generateur.cjs`, la résolution de fichiers `catalogue.cjs`.
- Entrée du générateur : **`blocs` structurés** du domaine Planification, jamais les phrases de l'interface; les statuts réalisés viennent du domaine Activités.
- Le Web n'est ni importé ni nécessaire. Son lien de téléchargement est une projection distincte.
- Contrôles FIT : en-tête, CRC, messages Workout, étapes, chronos et absence de faux résultats réalisés. L'import effectif dans Garmin Connect / Venu 4 reste à confirmer.
