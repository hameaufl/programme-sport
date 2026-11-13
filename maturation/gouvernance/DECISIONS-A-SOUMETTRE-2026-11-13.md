# Décisions restant à soumettre au propriétaire — dossier après premier passage des 161 rubriques

**13 novembre 2026.** Document de préparation **sans effet normatif**. Sur la PR #9 en brouillon uniquement. Il ne vaut ni visa indépendant du Gardien, ni permission Garmin, ni autorisation de fusion. Les décisions sportives et les faits personnels ne sont pas réécrits.

## A. Mini-lot documentaire n°2 : deux chemins exacts

**PR de préparation :** https://github.com/hameaufl/programme-sport/pull/11 — branche `maturation/minilot-assainissement-02`, tirée de `main` au SHA `e28b8cac98d20b78fd4835392b53afeeed18c234`.

- `docs/CONTRAT-CONTINUITE-COACH.md` : deux corrections de renvoi (nommage Garmin V2 déjà prioritaire ; suppression de la destination opérationnelle `personnel/README.md`).
- `adaptateurs/garmin/MCP.md` : deux corrections de rédaction (titre unique « Programme prévu · nom » ; renvoi à la convention de nommage déjà prioritaire).
- **Deux fichiers, quatre lignes remplacées, sans droit Garmin ajouté ou retiré.** Anciennes opérations, historique et clauses de suppression conservés.
- **Validation technique :** CI « Vérifier la refonte modulaire (sans publier) » réussie, https://github.com/hameaufl/programme-sport/actions/runs/43457442287.

**Décision nécessaire avant toute fusion :** accord explicite du propriétaire pour chacun des deux documents. En cas d'accord, retirer le brouillon, fusionner séparément en conservant les mécanismes GitHub, puis contrôler build, déploiement et version réellement servie (la publication Pages est déclenchée par `adaptateurs/**`). **Aucune fusion automatique prévue.**

## B. INC-005 : portée de la suppression Garmin

Les prescriptions historiques contiennent à la fois une *exception conditionnelle* de nettoyage d'un modèle intermédiaire créé dans la même opération et une *interdiction générale* de suppression sans accord spécifique (voir `docs/COACH-MODE-OPERATOIRE.md` lignes 22/39 et `adaptateurs/garmin/MCP.md` ligne 67, source `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`). Les avis de gouvernance non indépendants ne lèvent pas l'ambiguïté.

**Choix à arbitrer :**
1. **Option conservatoire proposée :** toute suppression future, même d'une copie créée pendant l'opération en cours, exige une autorisation actuelle précisant la cible et l'action. Conserver le droit de présenter un aperçu et de relire en lecture seule.
2. **Option exception étroite :** maintenir une possibilité d'effacer dans la même opération après autorisation de cette opération, remplacement validé, identité prouvée, absence de calendrier ou usage, aperçu et confirmation. **Jamais applicable à un ancien modèle ou à une opération ultérieure.**

**En attendant la décision : aucune suppression, création, programmation ou transmission Garmin par ce chantier.** L'accord historique d'un ancien nettoyage ne peut être invoqué comme nouvel ordre. Une fois arbitrée, rédiger une clause V2 testable et faire viser sa portée ; aucune modification rétroactive du compte.

## C. REF-06 : obligation historique ou nouvelle règle de gouvernance ?

Le candidat `REF-06` (« registre du Gardien = index ») n'a pas de ligne historique probante dans `contrats/DEPENDANCES.md`. La revue propose de le traiter comme **proposition nouvelle** d'organisation expérimentale et non comme décision antérieure du propriétaire.

- Si retenu **avec preuve et arbitrage**, la matrice passerait de **73 obligations historiques + 12 propositions nouvelles** à **72 + 13**, en conservant la trace des anciennes attributions.
- Sinon, rester en litige et rechercher une source réellement pertinente avant toute correction de provenance.
- **Aucune requalification ni aucune adoption déjà exécutée.** L'analyse croisée des 26 candidats comporte cinq ancrages dans des rubriques mixtes/obsolètes et un ancrage insuffisant supplémentaire.

## D. Autres verrous : INC, B2 et confidentialité

Les dossiers **INC-001 à INC-008 demeurent tous ouverts**. Les preuves mécaniques FIT, `personnel/`, PNG et simulation sont maintenant présentes et testées, mais ne constituent pas un visa d'agent indépendant ni une preuve d'exécution comportementale. La couverture des **161 rubriques** est **préliminaire** et ne certifie pas chacune de leurs clauses.

**La PR #9 n'est pas approuvée pour fusion.** B2 reste candidat en lecture seule, avec trois lacunes de restitution Web déjà consignées ; les branches A, B, B2 demeurent non activées. La confidentialité du dépôt et de son historique public est un chantier distinct : pas de purge ni déplacement de données personnelles sans un plan et une autorisation adaptés.

## Frontière de décision

Le présent dossier marque ce qui **nécessite désormais un choix du propriétaire**, sans suspendre les revues non normatives qui seraient encore possibles. Ne déduire d'une approbation de la PR #11 **ni** l'option B sur la suppression Garmin, **ni** la requalification de `REF-06`, **ni** une approbation de la PR #9, **ni** une purge d'historique.
