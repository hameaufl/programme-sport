# Adaptateur Garmin Connect par MCP — indépendant de Mon Rythme

- **Bêta en lecture seule par défaut** : `node adaptateurs/garmin/mcp.cjs renfo-AAAA-MM-JJ [autres IDs autorisés]` identifie les modèles identiques et affiche les dates sélectionnées, **sans aucun appel Garmin ni écriture locale**.
- Source canonique : `domaines/planification/donnees/seances/` (blocs). Aucun fichier d'entraînement n'est créé, archivé, copié ou publié par le Web. Il n'y a plus de générateur FIT local.
- Le Coach exécute, depuis sa conversation et **uniquement après demande explicite**, les outils MCP de lecture, de création et de programmation. Ni la CI ni l'add-on Web ne se connectent à un compte Garmin.
- Réutiliser un modèle existant pour plusieurs dates ; le nommage reste un choix du propriétaire et le premier envoi/synchronisation sur la Venu 4 est à confirmer.
- Référence opérationnelle : [MCP.md](MCP.md). Les fichiers supprimés ne sont accessibles que dans l'historique Git, pas sur le site.
