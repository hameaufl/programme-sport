# Passation multi-agents : état durable et reprise dans une autre conversation

**État initial au 13 novembre 2026.** L'état courant doit être relu sur GitHub à chaque nouvelle conversation. **Aucun visa d'activation n'a été accordé.**

## Branches et contrôle de version

- Dépôt PUBLIC : https://github.com/hameaufl/programme-sport ; branche de travail `maturation/architecture-multiagents`.
- `main` et `tests/coach-a-main` : `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`.
- `tests/coach-b-coordinateur` : `c92d5a7c69b371bfa9ef6770363ad0c07bf53f93`.
- `tests/coach-b2-concis` : `0aca52ac999f3a579610edfa2106aa400518a3fc`, deux fichiers Coach modifiés par rapport à B.
- PR [#9](https://github.com/hameaufl/programme-sport/pull/9) ouverte et en brouillon. Branche de travail au début de cette passation : `89f739fde6dd9b205009c2f47e6b3722bf2814dd`.
- CI précédentes réussies : https://github.com/hameaufl/programme-sport/actions/runs/43428500959 et https://github.com/hameaufl/programme-sport/actions/runs/43428500837 .

## Avancement et preuves

- 8 rôles logiques séquentiels, sans agents LLM indépendants ni coût d'API supplémentaire.
- 8 documents historiques, 161 rubriques dans main (162 dans le premier inventaire, qui contient un préambule expérimental) et 85 familles d'exigences attribuées, mais **pas de certification de couverture sémantique clause par clause**. INC-001 à INC-008 ouvertes.
- A/B : 97/120 contre 108/120 (notation provisoire et non indépendante). B/B2 : 1 642 mots contre 471 sur six mêmes demandes, soit **−71,3 %**. Deux essais supplémentaires B2 sans comparateur B.
- Deux contre-tests B2 en conversations neuves : compte rendu complexe 9/9, publication Web 5/8 critères pleinement explicites, zéro erreur bloquante observée, examen non indépendant.
- Historique, validations modèle/tests/CI/deploy et frontière Coach/Maturation déjà prescrits dans les sources, rappelés dans `CHECKLIST-LIVRAISON-WEB-B2.md`.
- Avis logique `GARDIEN-AVIS-LOGIQUE-B2-2026-11-13.md` : **favorable à la poursuite des essais ; BLOQUÉ pour activation et fusion ; non indépendant**. Dossier propriétaire `DECISION-ADOPTION-B2-A-SOUMETTRE.md` et état bloquant `ETAT-ADOPTION-B2.json`.
- Tous les PDF de conversations et liens privés sont exclus du dépôt GitHub public ; seuls des résultats anonymisés y sont conservés.

## À poursuivre

Audit sémantique des huit documents historiques et qualification des huit conflits INC-001 à INC-008 sans les clore par supposition ; obtenir les visas nécessaires avant toute activation. Sources : `AUDIT-COUVERTURE.md`, `MATRICE-COUVERTURE.md`, `INVENTAIRE-RUBRIQUES.json`, `COUVERTURE-PROTOCOLES.json`, `referentiel/INCOHERENCES.md`, `referentiel/REVUE-LOGIQUE-GARDIEN-2026-11-13.md`, et nouveaux rapports à produire.

**Règles non négociables :** aucun merge `main` sans approbation propriétaire ; aucune écriture Garmin sans autorisation exacte et datée ; aucune donnée privée dans le dépôt ; aucune écriture métier/Web dans les essais ; pas de visa Gardien indépendant imaginé. Toute modification comportementale doit être soumise au processus Maturation puis Gardien.

## Prompt prêt à copier

> Tu reprends le projet GitHub PUBLIC hameaufl/programme-sport à la suite d'un travail de gouvernance expérimentale multi-rôles. Lis en premier la passation maturation/gouvernance/PASSATION-CHANTIER.md à la tête ACTUELLE de la branche maturation/architecture-multiagents (ne suppose pas que son SHA ancien est encore valable). Puis lis JOURNAL-EVOLUTION.md, PLAN-ET-TESTS.md, DECISION-ADOPTION-B2-A-SOUMETTRE.md, GARDIEN-AVIS-LOGIQUE-B2-2026-11-13.md, ETAT-ADOPTION-B2.json, et les documents d'audit sémantique et des incohérences qui s'y trouvent.
> 
> États de référence inchangés au 13 novembre 2026 : main et test A d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4 ; test B c92d5a7c69b371bfa9ef6770363ad0c07bf53f93 ; test B2 0aca52ac999f3a579610edfa2106aa400518a3fc. PR #9 ouverte en brouillon. Résultats : B2 réduit de 71,3 % la longueur sur 6 prompts identiques à B (1642 contre 471 mots). Deux contre-tests en sessions neuves : fidélité 9/9, Web 5/8 obligations explicites, zéro erreur bloquante observée ; PDF privés non publiés. 8 rôles logiques séquentiels, pas 8 agents techniques. 85 familles attribuées, 161 rubriques historiques dans main (162 titres inventoriés au départ en comptant le préambule expérimental), audit sémantique non certifié, 8 conflits INC-001 à INC-008 ouverts. Le Gardien n'a rendu qu'un avis logique NON INDÉPENDANT, favorable aux essais mais BLOQUÉ pour activation.
> 
> Poursuis l'audit sémantique des 8 documents historiques et les incohérences INC-001 à INC-008. Consulte d'abord les rapports et scripts déjà créés. Rédige et versionne seulement sur maturation/architecture-multiagents, en consignant références exactes, vérifications, réserves et décisions encore à arbitrer. Ne modifie aucun fait sportif/registre personnel, aucun fichier métier ou Web, et n'effectue aucune opération Garmin (créer/programmer/transférer/supprimer). « Mets-toi à jour » = lecture seule. Ne prétends jamais à une indépendance du Gardien ni à un accord de fusion. Aucune fusion ou activation vers main sans mon approbation explicite. GitHub est public : n'y publie ni PDF de conversations, ni données de santé personnelles. Vérifie CI, PR brouillon et invariance de main/A/B/B2 après les commits.

## Audit sémantique et instruction INC — état de la seconde étape
- [AUDIT-SEMANTIQUE-PRELIMINAIRE.md](AUDIT-SEMANTIQUE-PRELIMINAIRE.md) : **161 rubriques dans `main`**, 162 dans le premier inventaire de branche ; 42 rubriques avec ancrage direct, 119 sans ancrage direct (ne pas confondre avec couverture).
- [AUDIT-ANCRAGES-SEMANTIQUES.json](AUDIT-ANCRAGES-SEMANTIQUES.json) : sur **85 attributions**, 12 règles nouvelles ayant une fausse référence historique Garmin, 13 ancrages hors sujet, 13 références imprécises, 47 apparemment plausibles mais non certifiées. La matrice originale n'a pas encore été corrigée et **ne peut pas être présentée comme validée**.
- [INSTRUCTION-INC-001-008.md](referentiel/INSTRUCTION-INC-001-008.md) : dossiers INC-001 à INC-008 analysés individuellement, sources vérifiées, qualifications **provisoires** et critères de clôture. **Huit entrées toujours ouvertes, aucune autorisation Garmin nouvelle**.
- [QUALIFICATIONS-INC-001-008.json](referentiel/QUALIFICATIONS-INC-001-008.json) et vérificateurs CI prouvent l'existence de sources au SHA historique, **pas** la vérité de l'arbitrage logique ni un visa du Gardien.
- **Suite non terminée :** revue sémantique clause par clause des sources, justification puis correction des ancrages, revue Gardien attestée, arbitrages requis et approbation propriétaire pour toute fusion.
