# Passation multi-agents : état durable et reprise dans une autre conversation

## Actualisation après accord du propriétaire — PR #12 fusionnée le 13 novembre 2026
- **`main` confirmé :** `83cbe0dafabb9aa5ee291802181985e4c6da2153`. La [PR #12](https://github.com/hameaufl/programme-sport/pull/12) a été **fusionnée par squash sur accord explicite**, depuis la branche `maturation/minilot-assainissement-03-readme`. Le diff confirmé porte **uniquement sur `README.md`** (+48/-36 lignes) : architecture V2, quatre pages et commandes disponibles, suppression des *instructions* d'exploitation FIT obsolètes. Aucun script FIT, archive ou fichier métier n'a été créé ni supprimé.
- [Vérification CI sans publication de la PR](https://github.com/hameaufl/programme-sport/actions/runs/43466175077) réussie. **Aucun workflow Pages déclenché pour le commit de fusion** `83cbe0dafabb9aa5ee291802181985e4c6da2153` lors du contrôle ; `README.md` seul n'est pas un chemin surveillé par `publier-pages.yml`. **Ne pas annoncer un nouveau déploiement ni une nouvelle version du site.** La PR #11 avait déjà été publiée au commit précédent.
- **PR #9 toujours en brouillon et non fusionnée**, sur `maturation/architecture-multiagents`. Les dossiers `INC-005` et `REF-06`, ainsi que les huit INC au total, restent ouverts et non arbitrés. 161/161 rubriques classées à titre préliminaire ; pas de visa Gardien indépendant ni d'activation B2.
- **Aucune autre fusion approuvée.** Les autorisations des PR #10, #11 et #12 ne valent ni visa de la PR #9, ni permission Garmin, ni purge historique, ni requalification automatique de `REF-06`.


## Avancement ultérieur du 13 novembre 2026 — arbitrages documentés et trois vagues préparées
- `main` toujours `cf9241b9740be8e6c3f80058a45f76e197a4bb44` (PR #10 et #11 déjà fusionnées et publiées) ; **PR #9 toujours expérimentale en brouillon**, A/B/B2 inactives. Une **PR #12** distincte ([correction du README racine](https://github.com/hameaufl/programme-sport/pull/12)) a été préparée sur branche isolée : **un fichier** et **aucune fusion**. Sa [CI de refonte](https://github.com/hameaufl/programme-sport/actions/runs/43466175077) est réussie. Le README actuel de `main` mentionne encore une commande FIT et un validateur de migration supprimés : PR #12 propose de les rectifier sans modifier les scripts.
- **REF-06** : [étude épinglée](ETUDE-REF-06-PROVENANCE.md) démontrant que `contrats/DEPENDANCES.md#L3` ne prouve pas une règle d'index propre au Gardien ; la première formulation explicite se trouve dans `CHARTE.md#L39` au premier commit expérimental. Requalification **proposée seulement** de 73/12 à 72/13, **non appliquée** à la matrice ; accord du propriétaire encore requis.
- **INC-005** : [étude d'arbitrage](ETUDE-INC-005-SUPPRESSION.md) et [11 scénarios fictifs](INC-005-CAS-SIMULES.json) ; politique conservatoire conseillée, **aucun accord ni opération réelle**. Le simulateur de permissions ne vérifie pas l'authenticité d'une chaîne `preuveDemande` : un résultat « admissible sur papier » ne prouve **jamais** une permission réelle.
- **Vague 3** : [6 pièces techniques et journaux indexés sans copie](INDEX-PREUVES-VAGUE3.md) avec empreintes/tailles Git et recherche de références littérales sur **17 scripts/workflows + 10 documents**. Aucun déplacement, suppression, audit externe ou purge autorisés. La première CI a révélé une erreur de transcription d'une empreinte de journal, **corrigée** au commit `723282c9`, puis [gouvernance](https://github.com/hameaufl/programme-sport/actions/runs/43467579903) et [refonte](https://github.com/hameaufl/programme-sport/actions/runs/43467579993) réussies.
- **Vague 2** : les [15 rubriques explicitement V1 remplacées](REVUE-SUPERSESSION-15-V1.md), au sein des 161 titres qualifiés, ont désormais des **destinations V2 candidates** avec lignes Git épinglées et tests de refus. **Ces liens sont partiels, pas une certification de non-perte clause par clause**. [CI de gouvernance](https://github.com/hameaufl/programme-sport/actions/runs/43468153755) réussie.
- Les **8 INC restent ouvertes**, `REF-06` et `INC-005` non arbitrées, pas de visa Gardien indépendant, aucune écriture Garmin, métier ou Web, aucune opération sur les archives ou l'historique. **Ne fusionner aucune PR sans un nouvel accord explicite du propriétaire.**


## Mise à jour du 13 novembre 2026 — PR n°11 fusionnée avec accord du propriétaire
- **Dernier `main` vérifié :** `cf9241b9740be8e6c3f80058a45f76e197a4bb44` après la [PR #11 fusionnée](https://github.com/hameaufl/programme-sport/pull/11), par squash ; **deux fichiers documentaires uniquement** et quatre substitutions de renvois V2. La PR #10 était déjà fusionnée au commit `e28b8cac`.
- **Publication Mon Rythme vérifiée :** workflow [43465068468](https://github.com/hameaufl/programme-sport/actions/runs/43465068468) terminé avec succès ; build, déploiement Pages et contrôle de version réellement servie réussis.
- La **PR #9 reste ouverte en brouillon, non fusionnée** ; sa base historique `d88a202` demeure la référence de l'inventaire H2–H4, distincte du `main` actuel. A/B/B2 non activées.
- **Aucune permission Garmin nouvelle**, aucune modification de données, historique, contrats ou architecture de production. Les 161 rubriques sont classées au premier passage, mais non certifiées clause par clause. Les **8 INC** restent ouvertes, `REF-06` et `INC-005` attendent un arbitrage distinct, aucun visa Gardien indépendant ni accord de fusion PR #9.
- Les mentions plus bas « PR #11 en brouillon » décrivent **l'état précédent** et sont désormais historiques. Le prochain accord éventuel doit porter sur `REF-06`, `INC-005` ou un **lot précis différent**, sans approbation implicite.


## Synthèse du 13 novembre 2026 — revue 161/161, provenance et mini-lot n°2
- Source de travail expérimentale : 161/161 rubriques H2–H4 classées à titre de **premier passage**, sans certification sémantique de chacune des clauses. [87 nouvelles classifications](REVUE-SEMANTIQUE-87-RUBRIQUES.md) et [index exact](REVUE-87-RUBRIQUES-RESTANTES.json).
- [26 ancrages recroisés](REVUE-CRITIQUE-26-ANCRAGES.md) : 4 candidats issus de rubriques mixtes V1/V2, 1 issu d'une procédure V1 remplacée, 1 `REF-06` sans source historique et 1 `STR-04` insuffisant ; **aucune correction de matrice validée**.
- [Preuves techniques complémentaires INC-001/002/007/008](PREUVES-TECHNIQUES-INC-001-002-007-008.md) et tests négatifs, **huit INC toujours ouvertes**. [Projet d'index actif V2](PROPOSITION-INDEX-ACTIF-V2.md), non normatif.
- Mini-lot n°2 préparé via [PR #11](https://github.com/hameaufl/programme-sport/pull/11) sur branche isolée : **2 fichiers et 4 lignes corrigées, CI refonte réussie, PR en brouillon NON FUSIONNÉE**. Nommage Garmin V2 et renvois obsolètes uniquement, sans modifier les permissions. `main` demeure `e28b8cac98d20b78fd4835392b53afeeed18c234` et PR #9 en brouillon.
- [Dossier des décisions nécessitant l'accord du propriétaire](DECISIONS-A-SOUMETTRE-2026-11-13.md) : fusion éventuelle de PR #11 séparément, arbitrage de la portée INC-005, classement possible de REF-06 ; **aucun accord présumé**, aucune écriture Garmin, aucune adoption B2 ou fusion PR #9.


## Nouvelle étape du 13 novembre 2026 — analyse des conflits COM-03 à COM-09
- [Revue ciblée](REVUE-CLAUSES-COACH-COM03-COM09.md) et [26 ancrages contrôlés](REVUE-CLAUSES-COACH-COM03-COM09.json) entre la source historique `d88a202` et les preuves du `main` `e28b8ca` : **13 alignements V2 documentaires, 6 instructions supplantées, 2 contradictions historiques, 3 arbitrages et 2 états Garmin non vérifiés à distance**. Cela ne porte pas le nombre de rubriques classées au-delà de **74/161** : il s'agit d'une analyse **à l'intérieur** de sept rubriques déjà comptées.
- Conclusion documentaire : `nomEntrainementMontre` en Planification est `Reprise - Renfo A` au SHA vérifié et le Web utilise un **titre unique** ; les anciens noms et encarts sont historiques. Ne pas inférer l'état réel Garmin Connect de GitHub.
- Les permissions de **recréation/suppression d'intermédiaires Garmin** restent à arbitrer ; aucune autorisation Garmin nouvelle, aucun modèle distant relu ou modifié, huit INC ouvertes. `docs/COACH-MODE-OPERATOIRE.md` et `adaptateurs/garmin/MCP.md` sont **inchangés en production**. Le futur mini-lot de clarification comportementale exige une décision du propriétaire et une revue Gardien.
- Vérificateur `verifier-clauses-coach.cjs`, tests de refus et étape CI ; contrôle de gouvernance réussi sur [exécution 43453819758](https://github.com/hameaufl/programme-sport/actions/runs/43453819758).


## Actualisation du 13 novembre 2026 — après le mini-lot n°1 et la revue Coach
- `main` actuel : `e28b8cac98d20b78fd4835392b53afeeed18c234` après la [PR #10 fusionnée](https://github.com/hameaufl/programme-sport/pull/10), exclusivement documentaire. GitHub Pages a publié et vérifié sa version. **Le SHA `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4` mentionné dans l'état initial ci-dessous reste la base historique de l'audit et de A, pas la tête actuelle de `main`.**
- Troisième source revue : `docs/COACH-MODE-OPERATOIRE.md` au SHA historique, **15 rubriques** (8 plausiblement courantes, 5 mixtes, 2 états datés dépassés). [Revue et arbitrages](REVUE-SEMANTIQUE-COACH.md) · [ancrages](REVUE-COACH-15-RUBRIQUES.json). **74/161 rubriques** qualifiées préliminairement ; **87** sans qualification. Aucune conformité phrase par phrase démontrée.
- PR #9 maintenue en brouillon ; A/B/B2 non activées ; huit INC ouvertes ; aucun visa Gardien indépendant, aucune écriture Garmin ni suppression d'archive. Prochaine priorité : revue clause par clause COM-03 à COM-09, puis 87 rubriques encore non classées.


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
- [AUDIT-ANCRAGES-SEMANTIQUES.json](AUDIT-ANCRAGES-SEMANTIQUES.json) : sur **85 attributions**, 12 règles nouvelles ayant une fausse référence historique Garmin, 13 ancrages hors sujet, 13 références imprécises, 47 apparemment plausibles mais non certifiées. La matrice de travail distingue maintenant **73 obligations historiques / 12 propositions nouvelles**, mais **ne peut pas être présentée comme validée** ; les 13 ancrages hors sujet et 13 imprécis restent à traiter.
- [INSTRUCTION-INC-001-008.md](referentiel/INSTRUCTION-INC-001-008.md) : dossiers INC-001 à INC-008 analysés individuellement, sources vérifiées, qualifications **provisoires** et critères de clôture. **Huit entrées toujours ouvertes, aucune autorisation Garmin nouvelle**.
- [QUALIFICATIONS-INC-001-008.json](referentiel/QUALIFICATIONS-INC-001-008.json) et vérificateurs CI prouvent l'existence de sources au SHA historique, **pas** la vérité de l'arbitrage logique ni un visa du Gardien.
- **Suite non terminée :** revue sémantique clause par clause des sources, justification puis correction des ancrages, revue Gardien attestée, arbitrages requis et approbation propriétaire pour toute fusion.

## Remédiation de provenance : 12 liens corrigés sur la branche expérimentale
- [Proposition de correction de provenance](PROPOSITION-CORRECTION-PROVENANCE.md) et [12 sources initiales vérifiées](PROVENANCE-12-REGLES-PROPOSEES.json) : distinguer `source_historique = null` de la `source_proposition` de gouvernance. **Ne pas considérer les 12 anciennes lignes `AGENTS.md L3` comme correctement justifiées.** Les 13 autres liens hors sujet et 13 imprécis nécessitent également vérification. La matrice d'origine reste accessible dans l'historique Git ; les douze liens sont corrigés dans la matrice actuelle de travail, **sans approbation Gardien**.

## Nouveau chantier : assainissement progressif vers une source courante unique
- Point d'entrée non normatif : [ETAT-COURANT-REFERENCE.md](ETAT-COURANT-REFERENCE.md), fondé sur la V2 de `main` et distinguant production actuelle de huit rôles proposés.
- Plan explicite en cinq vagues : [PLAN-ASSAINISSEMENT-V2.md](PLAN-ASSAINISSEMENT-V2.md). **Aucune suppression ni déplacement** n'est actuellement autorisé ou effectué.
- [INVENTAIRE-ASSAINISSEMENT.json](INVENTAIRE-ASSAINISSEMENT.json) : 143 blobs de `main` figés au SHA historique, dont 51 sources métier V2 et 17 pièces d'archives Renfo protégées (16 JSON + README). Tous les fichiers sont classés, **aucun fichier marqué « supprimable » sans preuve**.
- [REVUE-SEMANTIQUE-REPRISE.md](REVUE-SEMANTIQUE-REPRISE.md) et [REVUE-REPRISE-30-RUBRIQUES.json](REVUE-REPRISE-30-RUBRIQUES.json) : 30 rubriques, 16 courantes à vérifier, 10 mixtes et 4 V1 dépassées. Revue documentaire par rubrique, pas certification de toutes les clauses.
- [CORRECTION-PROVENANCE-APPLIQUEE.md](CORRECTION-PROVENANCE-APPLIQUEE.md) : 73 sources historiques et 12 nouvelles propositions désormais séparées ; autres ancrages faux/imprécis à examiner.
- **Prochaine priorité :** consolider les textes V2 utiles, prouver les références et les dépendances, puis soumettre des chemins précis pour décision du propriétaire ; ne pas supprimer la mémoire personnelle, les archives, l'historique public ou les protocoles contraignants à l'aveugle.

## Préparation du mini-lot documentaire n°1 et revue de 26 ancrages
- [MINILOT-ASSAINISSEMENT-01.md](MINILOT-ASSAINISSEMENT-01.md) : deux textes de remplacement V2 prêts **mais non appliqués** sur `main` ou les branches de test ; aucune suppression permise.
- [ETUDE-DEPENDANCES-NETTOYAGE.json](ETUDE-DEPENDANCES-NETTOYAGE.json) : recherche de cinq anciennes références dans **39 fichiers** de documentation/code/CI du `main` historique ; 6 liens vers `docs/REPRISE.md`, 1 vers `docs/CONTEXTE.md`, 1 vers `scripts/migration-preuve.json` ; aucune vérification des liens externes.
- [REVUE-26-ANCRAGES.md](REVUE-26-ANCRAGES.md) : **17 candidats directs, 7 partiels, 1 insuffisant**, et **REF-06 peut être une treizième nouvelle proposition** ; à arbitrer plutôt que convertir automatiquement 73/12 en 72/13. Aucune de ces 26 corrections n'a été appliquée à la matrice.
- **Suite :** revoir les sources et la certification clause par clause, demander les arbitrages de provenance et l'autorisation du propriétaire avant tout nettoyage documentaire effectif. B2 et `main` toujours inchangés.

## Revue complémentaire des responsabilités historiques
- [REVUE-SEMANTIQUE-ROLES.md](REVUE-SEMANTIQUE-ROLES.md) : 29 rubriques de `docs/ROLES.md` qualifiées (16 plausiblement courantes, 7 mixtes, 6 V1 dépassées) avec [index des sources exactes](REVUE-ROLES-29-RUBRIQUES.json).
- **59/161 rubriques historiques** ont désormais une qualification préliminaire (30 REPRISE + 29 ROLES) ; **102 rubriques** n'ont pas encore de classification rubrique par rubrique. Il reste à auditer les clauses dans les 161 rubriques, sans effacer ni les règles valables ni les faits.
- Nettoyage de `main` **toujours non appliqué**, proposition du premier mini-lot toujours à soumettre au propriétaire.

### Correctif de contrôle d'intégrité — même jour
Après PR #10, les deux documents V2 avaient légitimement évolué sur `main`, tandis que la branche expérimentale reposait toujours sur `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. Le vérificateur de non-perte a été adapté : il n'interprète plus une évolution **sur main seulement** comme une écriture de la branche, mais refuse toute troisième version des octets métier/infrastructure. Tests négatifs ajoutés. CI gouvernance et refonte réussies au commit `8d4fcea`. Les archives, données métier, Garmin, PR #9 et B2 ne changent pas de statut.
