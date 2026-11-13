# Guide des essais A/B isolés — versions historiques figées

**Deux branches de test figées :**
- A : `tests/coach-a-main`, commit `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`.
- B : `tests/coach-b-coordinateur`, commit `c92d5a7c69b371bfa9ef6770363ad0c07bf53f93`.

Ne pas confondre `tests/coach-b-coordinateur` (version testée, figée) et `maturation/architecture-multiagents` (branche de travail susceptible de changer).

## Protocole de vérification
1. Ouvrir deux conversations ChatGPT distinctes et demander à A d'appliquer **uniquement** les règles historiques de A, à B d'appliquer uniquement les fiches de B. Le préambule de sécurité est **lecture seule** : aucune écriture GitHub, Garmin ou publication.
2. Donner strictement les mêmes prompts sans les listes d'attendus. Les prompts officiels sont `SCENARIOS-SIMULATION.json`.
3. Pour un essai moins contaminé, ouvrir **une nouvelle conversation par paire de tests**, ou au minimum noter que l'ordre des prompts modifie le contexte. Vérifier que chaque assistant lit son SHA.
4. Recueillir les réponses dans des fichiers privés ; **ne pas committer les conversations intégrales dans le dépôt public**.
5. Faire noter par un évaluateur qui ne connaît pas l'origine A/B si possible, selon `CAMPAGNE-COMPARATIVE.md`. Vérifier les sources et les refus ; le score ne remplace pas l'analyse des erreurs majeures.
6. Conserver une évaluation provisoire anonymisée dans `EVALUATION-AB.json`. Le résultat actuel est décrit dans `RAPPORT-AB-2026-11-13.md`.

**Statut au 13 novembre 2026 :** les deux conversations ont été réellement exécutées (10 réponses chacune), mais la notation demeure provisoire et le test reste séquentiel et non aveugle. Aucun accord de fusion n'a été donné.
