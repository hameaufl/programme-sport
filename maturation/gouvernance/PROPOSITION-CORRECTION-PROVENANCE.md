# Corrigendum de provenance — 12 règles de gouvernance créées dans le chantier

**Date : 13 novembre 2026. Statut : PROPOSITION NON APPLIQUÉE À LA MATRICE, NON VALIDÉE PAR LE GARDIEN.**

La matrice initiale regroupe 85 familles, mais **12 nouvelles règles de gouvernance** `COO/REF/QUA` y sont fictivement rattachées à `AGENTS.md#L3` du SHA historique `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. Cette ligne traite **du nommage Garmin** et ne fonde ni l'autorité du Gardien ni le statut des agents. C'est une erreur sémantique de provenance, **sans perte de règle historique**.

Les exigences ont en réalité été **proposées** lors du premier commit expérimental `7a8016955cf74f312e40fc7b82bccca84020c9eb` :

| ID | Vraie source de proposition (jamais un précédent du main historique) |
| --- | --- |
| COO-01 | [maturation/gouvernance/PROTOCOLE-COACH.md L8](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/PROTOCOLE-COACH.md#L8) |
| COO-02 | [maturation/gouvernance/PROTOCOLE-COACH.md L3](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/PROTOCOLE-COACH.md#L3) |
| COO-06 | [maturation/gouvernance/CHARTE.md L47](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L47) |
| REF-01 | [maturation/gouvernance/CHARTE.md L29](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L29) |
| REF-02 | [maturation/gouvernance/CHARTE.md L19](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L19) |
| REF-03 | [maturation/gouvernance/CHARTE.md L29](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L29) |
| REF-04 | [maturation/gouvernance/CHARTE.md L19](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L19) |
| REF-05 | [maturation/gouvernance/CHARTE.md L32](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L32) |
| QUA-01 | [maturation/gouvernance/PROTOCOLE-COACH.md L10](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/PROTOCOLE-COACH.md#L10) |
| QUA-02 | [maturation/gouvernance/CHARTE.md L25](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L25) |
| QUA-03 | [maturation/gouvernance/CHARTE.md L25](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L25) |
| QUA-06 | [maturation/gouvernance/CHARTE.md L31](https://github.com/hameaufl/programme-sport/blob/7a8016955cf74f312e40fc7b82bccca84020c9eb/maturation/gouvernance/CHARTE.md#L31) |

## Correction future préconisée

1. Introduire un champ de provenance distinguant **`obligation_historique`** et **`proposition_nouvelle_gouvernance`**. Pour les 12 lignes, `source_historique_pertinente = null` et `source_proposition` épinglée au SHA initial expérimental.
2. Adapter ensemble `COUVERTURE-PROTOCOLES.json`, `MATRICE-COUVERTURE.md`, `verifier-referentiel.cjs` et leurs tests pour gérer ces deux origines **sans traiter la proposition comme une règle active**.
3. Après validation des liens de remplacement, corriger les **13 autres ancrages hors sujet** et les **13 imprécis** du relevé `AUDIT-ANCRAGES-SEMANTIQUES.json`. Conserver le journal d'audit de l'ancien état et tester les changements de SHA/provenance.
4. Demander la revue du Gardien avec sa limite d'indépendance déclarée ; aucune activation ni fusion sans l'accord explicite du propriétaire.

Les 12 permaliens proposés ont été **contrôlés ligne par ligne dans les fichiers du commit initial**. Ils ne prouvent pas la couverture exhaustive des 161 rubriques de `main`. Le brouillon B2 et les données métier restent inchangés.
