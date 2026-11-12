# Garmin MCP — contrat d'orchestration pour le Coach (bêta, 12 novembre 2026)

## Décision approuvée

Un entraînement enregistré dans Garmin Connect constitue un **modèle** utilisable à **plusieurs dates** du calendrier. La référence métier reste la prescription V2 structurée, non un fichier Garmin local. **Pendant la bêta, aucune écriture Garmin sans demande expresse pour la séance du jour ou les dates exactes indiquées.** Une création ou une modification de programme sur GitHub ne déclenche pas de création Garmin automatique. Ne jamais remplir par anticipation des semaines ou mois de calendrier.

Le site Mon Rythme ne connaît plus d'entraînements Garmin : aucun lien de téléchargement, identifiant distant, fichier binaire ou référence historique. Ne pas réintroduire cette fonction dans le Web. Les deux mondes restent reliés seulement par la date et la prescription dans la décision du Coach.

## Séquence strictement manuelle, à suivre pour les dates demandées

1. Lire `AGENTS.md`, les sources V2, les détails de la séance demandée et confirmer que les dates/identifiants sont ceux de la demande. Ne pas déduire implicitement une plage de plusieurs semaines. Une séance déjà réalisée n'est pas automatiquement reprogrammée.
2. Avant toute écriture, consulter le MCP : `get_workouts`, éventuellement `get_workout_by_id(raw=true)` pour vérifier les structures, et `get_scheduled_workouts` pour les dates ciblées. Un compte neuf peut être vide ; l'absence d'appareil dans le MCP **n'est pas** une preuve de synchronisation possible.
3. Calculer la signature de chaque prescription et regrouper les programmes identiques. Le module pur `adaptateurs/garmin/mcp.cjs` exporte `empreinte`, `preparer(ids)`, `preparerCalendrier` et `dtoCourse`. En ligne de commande, il n'effectue **que la préparation en lecture seule**. L'empreinte exclut ID/date/titre, mais intègre sport et blocs : pas d'assimilation de programmes avec des étapes différentes.
4. Pour chaque signature, rechercher d'abord un modèle Garmin déjà vérifié. Choisir un nom lisible avec le propriétaire si c'est la première création ; **convention de nommage définitive non fixée**. Pas de création si correspondance incertaine, risque de doublon, ou conversion imparfaite. Un changement de prescription nécessite une nouvelle version/réconciliation, jamais une modification silencieuse d'autres dates.
5. Seulement en cas de demande et pour les modèles vraiment manquants, utiliser `upload_workout` ou `upload_workouts` ; vérifier la réponse et relire via `get_workout_by_id`. Le regroupement n'implique pas qu'un appel groupé soit atomique : journaliser les succès et erreurs, puis réinterroger avant toute reprise.
6. Associer les **mêmes workout_id** aux dates explicitement autorisées via `schedule_workouts` (ou `schedule_week` pour des modèles existants). Utiliser `preparerCalendrier` après vérification des IDs, comparer le calendrier et éviter les doublons. Plusieurs activités distinctes peuvent coexister un même jour ; l’adaptateur remonte une alerte si ce jour contient déjà une autre entrée, à vérifier avant écriture. Ne jamais planifier des dates supplémentaires. Contrôler chaque date par `get_scheduled_workouts` après l’appel.
7. `reschedule_workout` et `unschedule_workouts` modifient les entrées de calendrier, pas le modèle ; seuls les changements explicitement demandés sont admis. `delete_workouts` est destructif et requiert un accord spécifique. `push_workout_to_device` est distinct de la planification et **non idempotent** : aucun envoi individuel en l'absence d'une demande explicite.
8. Confirmer uniquement les opérations effectivement réussies. Un programme planifié dans Garmin Connect ne signifie pas qu'il a été réalisé ni forcément synchronisé immédiatement sur la Venu 4. Ne pas modifier Activités/Santé sur la foi d'une programmation.

## Validation du contenu et limites

- Les DTO Garmin ont des règles strictes : `ExecutableStepDTO` pour les étapes, `RepeatGroupDTO` si répétitions regroupées, avec `endCondition` de type `iterations` et ordre des étapes global. Ne jamais deviner des IDs d'énumération, une intensité ou une zone cardiaque. L'outil `create_walk_run_workout` et d'autres assistants appliquent parfois une cible cardiaque par défaut : ne pas les utiliser si elle n'est pas prescrite.
- `dtoCourse` produit un brouillon pour les fractions régulières, la marche finale et les étirements, sans objectif cardiaque. Une **option alternative de course** demande un choix explicite avant conversion ; ne pas l'effacer silencieusement.
- Pour le Renfo, les noms et catégories Garmin officiels, les répétitions, temps de maintien, pauses, mise en route et étirements doivent correspondre à la prescription complète. Le convertisseur automatique **reste volontairement bloqué** tant que cette correspondance n'a pas été contrôlée sur un premier modèle. L'outil simplifié `create_strength_workout` ne garantit pas la conservation des étapes générales de récupération : ne pas les perdre par commodité.
- Les identifiants `workout_id` et `scheduled_workout_id` sont différents. Garder les rapprochements dans le contexte de l'opération ; ne jamais écrire d'identifiants de compte, de jetons, de cookies ou de secrets dans un dépôt public. Les réponses MCP ne font pas partie des pages Web.
- En cas d'erreur ou de résultat partiel, **arrêter**, relire la bibliothèque/le calendrier et demander un arbitrage plutôt que réessayer à l'aveugle.

## Responsabilités

**Maturation** maintient les ports, la conversion, le dédoublonnage et les tests. **Coach** décide du contenu sportif, appelle les outils Garmin autorisés pour les dates demandées et vérifie leur succès ; l'**utilisateur** valide les nouvelles conventions de nommage et l'étendue des dates. Aucun appel d'écriture n'est effectué par l'architecture lors des builds, publications ou vérifications.
