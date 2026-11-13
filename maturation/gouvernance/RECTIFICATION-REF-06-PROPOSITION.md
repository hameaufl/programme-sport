# REF-06 — rectification de provenance soumise à revue

**13 novembre 2026 · Proposition isolée, NON ADOPTÉE.**
Branche : `maturation/ref06-provenance-proposition-20261113`, issue du commit expérimental `e543c6b04e6f8be4e47da2ae8f849c54281baf2c`. Cette branche ne modifie ni `main` ni la PR n°9 tant qu'une fusion distincte n'est pas décidée.

## Constat vérifié

- L'ancien ancrage `contrats/DEPENDANCES.md#L3` renvoie seulement au titre « Règles opposables » ; il ne prouve pas le fonctionnement du registre du Gardien.
- Le même fichier, ligne 12, établit le principe général de non-duplication des sources métier : cette contrainte historique reste intacte.
- L'organisation spécifique du registre du Gardien en index apparaît dans `maturation/gouvernance/CHARTE.md#L39`, au commit expérimental `7a8016955cf74f312e40fc7b82bccca84020c9eb` : il s'agit d'une nouvelle proposition, non d'une obligation historique.

## Changement proposé

1. Dans `COUVERTURE-PROTOCOLES.json`, rattacher uniquement REF-06 à `source_proposition`, mettre `source_historique: null` et `type_provenance: proposition_nouvelle_gouvernance`.
2. Dans `MATRICE-COUVERTURE.md`, qualifier la même ligne de « Nouvelle proposition » et afficher **72 historiques / 13 nouvelles**, sans changer le total de 85 exigences.
3. Faire respecter ces comptes et ce lien immuable par `verifier-referentiel.cjs` et ses tests.
4. Faire conserver par `verifier-audit-semantique.cjs` l'ancien ancrage REF-06 dans l'audit historique **sans** le considérer comme provenance courante du candidat. Les 161 rubriques historiques, les anciens constats et les autres attributions ne sont pas réécrits.

Les documents `REF-06-PROVENANCE-CANDIDATE.json`, `ETUDE-REF-06-PROVENANCE.md`, `EXAMEN-CRITIQUE-26-ANCRAGES.json` et les autres relevés « non appliqués » décrivent **l'état antérieur à cette proposition** ; ils demeurent conservés comme preuves d'origine, et non comme autorisation de fusion.

## Vérifications à exécuter sur cette branche

```sh
node maturation/gouvernance/verifier-referentiel.cjs
node maturation/gouvernance/verifier-audit-semantique.cjs
node --test maturation/gouvernance/tests/verificateurs.test.cjs maturation/gouvernance/tests/audit-semantique.test.cjs
```

**Verrous maintenus :** aucune nouvelle règle de comportement active, aucune permission pour Garmin, aucune suppression d'archives, aucune écriture métier ni publication Web. REF-06 n'est pas déclaré arbitré par le propriétaire, les huit INC restent ouvertes, l'audit clause par clause et le visa Gardien ne sont pas acquis. L'accord pour préparer REF-06 ne vaut pas accord de fusion de cette branche, de la PR n°9, ou de déploiement B2.
