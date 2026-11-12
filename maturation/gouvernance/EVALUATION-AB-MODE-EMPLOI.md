# Dépouillement de l'expérience A/B — sans coût supplémentaire

**État actuel : zéro observation réelle A/B.** Le fichier `EVALUATION-AB.json` est une **fiche vierge** avec dix paires A/B, sans notes ni réponses inventées.

## Utilisation
1. Réaliser les conversations isolées en lecture seule comme décrit dans `GUIDE-ESSAIS-ISOLES.md`. Les règles de A et B utilisent des commits figés, même si la branche évolue entre-temps.
2. Pour chaque scénario, renseigner **uniquement après observation réelle** `A` puis `B` : `statut: "observe"`, `shaLu` réellement vérifié, `conversationIsolee: true` seulement si confirmé, `simulationSansEcriture: true`, `notesAnonymisees` (25 caractères ou plus), `erreursCritiques` (liste de libellés) et six scores entiers de 0 à 2.
3. Utiliser la grille de `CAMPAGNE-COMPARATIVE.md` : fidélité, autorisations, traçabilité, qualité, cohérence et clarté. Ne pas insérer d'informations personnelles dans le dépôt **public** ; faire relire les notes avant publication.
4. Exécuter `node maturation/gouvernance/verifier-evaluation-ab.cjs`. Tant qu'il manque une partie des deux séries, le statut reste **non_mesurable** ou **partiel_non_concluant**.
5. Même si les 20 observations sont présentes, un score compilé est **à valider humainement**, et ne prouve pas à lui seul l'indépendance des conversations ou la qualité réelle. L'accord propriétaire et le visa Gardien restent distincts.

Le fichier initial ne contient aucune prétendue réponse : **nous n'avons pas lancé de seconde conversation ChatGPT depuis cet échange**. Le script n'utilise ni API OpenAI ni service externe.

**Important :** cette grille n'exige pas de divulguer une conversation personnelle ou de publier une URL de partage. Les preuves privées peuvent rester sous le contrôle du propriétaire ; le dépôt ne stocke que des notes anonymisées après accord explicite.
