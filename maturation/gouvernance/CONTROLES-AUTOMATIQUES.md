# Garde-fous automatiques — phase de test sur branche

**13 novembre 2026 — prototypes exécutables**, uniquement pour la branche `maturation/architecture-multiagents`, sans serveur ni API payante. Ces scripts vérifient des **invariants déterministes** ; ils ne jugent pas le sens sportif ou la pertinence d'une décision.

## Vérificateur de non-perte
`node maturation/gouvernance/verifier-integrite-metier.cjs`

- Référence fixe : `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`, ancêtre obligatoire de `HEAD` et de `origin/main`.
- Comparaison de l'arbre **complet** `origin/main → HEAD`. Les **seuls fichiers différents autorisés** sont `AGENTS.md`, le nouveau workflow `.github/workflows/verifier-gouvernance.yml` et `maturation/gouvernance/**`.
- Comparaison cumulative `base → HEAD`. Si `main` a évolué légitimement, le contenu métier de la branche doit être identique à `origin/main`, faute de quoi la vérification échoue : re-synchronisation et nouvelle revue obligatoires.
- Le contenu historique d'`AGENTS.md` doit rester **un suffixe strict inchangé**, le texte expérimental étant uniquement intercalé après le titre.
- Git enregistre les objets et les SHA des fichiers de la référence de départ. Le script inventorie les **chemins historiques** sans republier de contenu sensible ; les comparaisons reposent sur les octets via Git, pas sur une intuition de l'agent.
- L'intégrité est **limitée au contenu versionné** : l'état réel de Garmin Connect, les données jamais écrites dans GitHub, les conversations et l'équivalence de sens après migration ne sont pas certifiés.
- En cas de changement de règle autorisé hors périmètre de la branche, il faut préparer une **nouvelle politique de migration** validée ; ne pas ajouter de dérogation silencieuse.

## Vérificateur du référentiel
`node maturation/gouvernance/verifier-referentiel.cjs`

- 85 exigences **uniques et présentes dans la matrice** ; huit protocoles avec rôles attendus, sources historiques existantes, contrôles déclarés, statut **proposé/non validé**.
- Huit incohérences distinctes (INC-001 à INC-008) **ouvertes**.
- La revue logique du Gardien doit indiquer « **BLOQUÉ** » et le dossier officiel « **EN ATTENTE** » ; aucune approbation simulée ne peut devenir une réussite mécanique.
- Cela vérifie **la structure et la traçabilité**, jamais la fidélité sémantique des 85 procédures ni leur exécution effective.

## Intégration CI
`.github/workflows/verifier-gouvernance.yml` : déclenché sur chaque push de la branche et les PR venant de cette branche vers `main`, **sans publication Pages ni écriture Garmin**. L'ancien workflow de refonte n'est pas modifié. En cas de résultat rouge, ne pas déclarer la branche prête.

## Scénarios négatifs
`node --test maturation/gouvernance/tests/*.test.cjs` exerce les gardes de chemins, la conservation stricte d'`AGENTS.md`, le refus d'IDs dupliqués et le refus de dossiers contradictoires incomplets.

## Limites et conditions pour les essais du Coach
Le succès des scripts ne prouve **pas** qu'un ChatGPT exécutera correctement les différents rôles dans une conversation. Il faut encore comparer, en mode simulation **sans aucune écriture**, les réponses de l'ancien Coach et du nouveau coordinateur à des cas identiques, puis mesurer les erreurs, omissions, respect des permissions et preuves. Ne pas fusionner sans l'accord explicite du propriétaire.
