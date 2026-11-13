# Garmin Connect — protocole MCP opérationnel

## Principes

Les prescriptions sont des `blocs` de `domaines/planification/donnees/seances/`. L'adaptateur `adaptateurs/garmin/mcp.cjs` prépare des signatures et une comparaison **sans appel Garmin et sans écriture** ; les outils MCP distants sont employés par le Coach uniquement lorsqu'ils sont accessibles et autorisés.

**Aucune écriture distante sans demande explicite du propriétaire pour l'action, les cibles et les dates exactes.** Créer un modèle, le programmer, le déplacer, le déprogrammer, le supprimer et le pousser vers l'appareil sont des opérations différentes. Une autorisation de création **ne contient pas** d'autorisation tacite de suppression. Une bibliothèque ou un calendrier lu ne prouve pas l'état de synchronisation de l'appareil.

## Noms et affichage

Le nom du modèle Garmin doit être **lisible et cohérent avec l'objectif principal actif et la phase sportive** définis dans Coaching. Vérifier le nom réellement attribué au modèle avant d'inscrire `nomEntrainementMontre` dans Planification : pas de nom supposé ni de suffixe technique provenant d'un brouillon. Le même nom peut être affiché sur le Web **dans le titre unique** « Programme prévu · nom » ; aucun identifiant, URL privée, jeton ou détail confidentiel Garmin n'est exposé. Une activité réalisée conserve « Séance » comme titre.

Les modèles identiques peuvent être réutilisés pour plusieurs dates après correspondance vérifiée des blocs. Les programmes et les décisions sportives restent dans les domaines, pas dans le modèle distant.

## Exercices officiels et matériel

Pour les nouveaux exercices Renfo, choisir uniquement les entrées réellement prises en charge dans le **catalogue officiel Garmin Connect** et compatibles avec `domaines/coaching/donnees/equipements.json`. Vérifier la catégorie et l'identifiant d'exercice réellement acceptés par l'API ; ne pas supposer qu'une étiquette provenant d'un catalogue tiers est autorisée. Les séries, répétitions, durées, tempos, repos et descriptions sont conservés dans la prescription structurée. **Animation facultative, pas bloquante** : les vidéos/illustrations d'une montre ne sont pas une condition de création d'un exercice personnalisé ; les explications pédagogiques publiques sont servies séparément par les PNG autorisés.

## Séquence des opérations explicitement demandées

1. Lire `AGENTS.md`, les objectifs, les blocs de séance et les dates/cibles fournies par le propriétaire. Une demande pour une date ne couvre pas automatiquement les semaines suivantes.
2. **Avant écriture**, consulter si autorisé `get_workouts`, `get_workout_by_id(raw=true)` et `get_scheduled_workouts` afin de confronter noms, signatures et calendrier. Une correspondance incertaine impose de s'arrêter.
3. Préparer les signatures via `empreinte`, `preparer(ids)`, `preparerCalendrier` et `dtoCourse` dans `adaptateurs/garmin/mcp.cjs`. Les signatures décrivent sport et blocs ; deux entraînements avec des étapes différentes ne sont pas équivalents.
4. Si le propriétaire a explicitement autorisé la création, utiliser `upload_workout` ou `upload_workouts` pour les seuls modèles manquants. Lire la réponse, puis **relire le contenu complet** avec `get_workout_by_id(raw=true)` : sport, étapes, identifiants d'exercice, durées, séries, répétitions, repos, tempos et descriptions. Un simple `success` ne démontre pas l'intégrité.
5. Si une programmation est expressément demandée pour des dates déterminées, réutiliser le même `workout_id` pour les séances identiques, vérifier les entrées existantes, puis appeler `schedule_workouts` ou `schedule_week`. Contrôler les dates par `get_scheduled_workouts`. Ne pas créer de doublon à cause d'un échec partiel.
6. Pour déplacer/déprogrammer, demander explicitement l'action et sa cible, puis appliquer `reschedule_workout` ou `unschedule_workouts` et relire le calendrier.
7. **Suppression :** `delete_workouts` et les confirmations associées sont destructifs. Toujours exiger un accord spécifique sur le modèle réellement identifié ; faire précéder toute confirmation d'un aperçu, vérifier l'absence d'usage ou de calendrier et l'existence du remplacement conforme. Un nettoyage de brouillon ne s'autorise pas lui-même.
8. **Envoi à la montre :** `push_workout_to_device` est distinct de la programmation, non idempotent et interdit sans demande expresse visant l'envoi.
9. Ne confirmer que les actions effectivement exécutées et relues. Une séance programmée n'est pas une activité réalisée et une création de modèle ne garantit pas l'apparition immédiate sur la montre.

## Sécurité du site et limites

Le site Web ne présente que les informations prévues par les contrats de projection ; il ne crée, distribue ou télécharge aucun programme Garmin. Les données privées du compte Garmin restent hors du dépôt public. Les modèles personnels et le calendrier sont lus ou modifiés seulement dans la limite des permissions réellement accordées.

Pendant la phase bêta du connecteur, l'absence de modèle ou d'appareil dans la réponse MCP n'autorise aucune déduction sur un compte ou une synchronisation future. Aucune opération Garmin n'est déclenchée par une validation de site ou une mise à jour GitHub.
