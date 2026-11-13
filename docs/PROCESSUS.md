# Processus de développement — méthode commune

Une seule méthode est utilisée pour toute évolution du produit : code, données, site Web, adaptateur, sécurité ou architecture. Le dépôt est la référence ; aucune conversation et aucun agent ne conserve un historique normatif parallèle.

## 1. Demande et périmètre

Créer ou sélectionner une GitHub Issue pour un chantier non trivial. Décrire : objectif, résultat attendu, modules touchés, critères d'acceptation, contraintes de confidentialité et permissions externes. Une correction très ponctuelle peut être décrite directement dans la PR.

## 2. Impact et décision

Vérifier `docs/ARCHITECTURE.md`, les contrats et le code existant. Identifier les dépendances et les risques de régression. Si les frontières ou les contrats changent durablement, ajouter un ADR court dans `docs/decisions/` avec contexte, décision actuelle, conséquences et date. Ne pas maintenir un journal de toutes les décisions révolues.

## 3. Implémentation isolée

Partir de `main` à jour ; créer une branche courte par travail, par exemple `travail/<sujet>`. Modifier uniquement les fichiers nécessaires. Ne pas mélanger des chantiers, ne pas créer de nouveaux agents ou protocoles de gouvernance pour accomplir une tâche.

## 4. Vérification et PR

Exécuter les validations du `README.md`, examiner le diff, vérifier les contrats et protéger les données. La PR précise : besoin, modifications, tests effectivement exécutés, limites, autorisations nécessaires et impact éventuel sur le Web ou Garmin. Les contrôles automatiques et la revue précèdent la fusion.

## 5. Clôture

Après acceptation, fusionner dans `main`, vérifier le déploiement seulement s'il a été déclenché, fermer l'Issue et supprimer la branche de travail. L'historique est celui des Issues, PR et commits. Garder uniquement les fichiers qui définissent le comportement ou les décisions architecturales **actuels**.

## Invariants

- `main` est la seule branche permanente ; au plus quelques branches actives liées à des tâches identifiées.
- Aucun fichier de « passation », « reprise », journal d'agents, matrice d'audits ou inventaire d'expérimentation n'entre dans le dépôt opérationnel.
- Pas de fusion ni d'écriture Garmin sans autorisation adaptée.
- Les faits sportifs et médicaux ne sont ni inventés ni effacés lors d'un nettoyage de gouvernance.
