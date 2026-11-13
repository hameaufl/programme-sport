# Adaptateur Garmin Connect par MCP

`node adaptateurs/garmin/mcp.cjs renfo-AAAA-MM-JJ [autres identifiants sélectionnés]` prépare et compare les prescriptions sous `domaines/planification/donnees/seances/`, **sans appel Garmin ni écriture locale**.

La lecture, la bibliothèque d'entraînements, la programmation des dates et la transmission à un appareil sont distinctes. Le Coach ne procède à une création, une modification, une suppression, une programmation ou un envoi **qu'après une demande explicite pour les actions et les cibles exactes**. La CI et le site public ne se connectent pas au compte Garmin.

Choisir les exercices dans le **catalogue officiel Garmin** et vérifier les exigences de matériel dans `domaines/coaching/donnees/equipements.json`. **Animation facultative, pas bloquante** pour une séance personnalisée : fournir les explications pédagogiques séparément. Une réponse d'upload ne suffit pas ; relire et contrôler le modèle avant de confirmer le résultat.

Protocole complet : [MCP.md](MCP.md).
