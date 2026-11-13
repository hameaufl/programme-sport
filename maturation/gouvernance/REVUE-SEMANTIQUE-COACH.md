# Revue sémantique du mode opératoire Coach — 15 rubriques

**13 novembre 2026 — audit préparatoire, aucune règle de production modifiée.**
Document analysé : `docs/COACH-MODE-OPERATOIRE.md` au commit historique `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. La fusion documentaire PR n°10 a conduit `main` à `e28b8cac98d20b78fd4835392b53afeeed18c234`, sans modifier ce document Coach. [Index exact des 15 rubriques](REVUE-COACH-15-RUBRIQUES.json).

| Qualification préliminaire | Rubriques |
| --- | ---: |
| Principes V2 plausiblement actuels, à confirmer | **8** |
| Obligations utiles mêlées à des états ou permissions historiques, à scinder | **5** |
| Photographies datées dépassées, non prescriptives | **2** |
| **Total** | **15** |

Avec les **30** rubriques de `docs/REPRISE.md` et les **29** de `docs/ROLES.md`, **74/161 rubriques** ont désormais une qualification de premier passage ; **87** attendent encore une revue rubrique par rubrique. **Ce chiffre ne mesure pas la conformité** et aucun examen exhaustif des clauses n'est acquis.

## Contradictions prioritaires

1. **Noms Garmin et titre Web (COM-01 à COM-04).** Les priorités placées au début du document prescrivent un nom lié à l'objectif actif et le titre unique `Programme prévu · <nom exact>`. Des sections suivantes citent des noms plus anciens avec « Mon Rythme », un suffixe de correction ou un « encart séparé ». Ces états restent des faits datés, **pas une règle autorisant à rétablir les anciennes valeurs ou l'ancien emplacement**. Une citation du dépôt ne vérifie pas la bibliothèque Garmin du jour.
2. **Nettoyage Garmin (COM-03, COM-05).** Les passages mentionnant une suppression de brouillons sont limités aux intermédiaires identifiés de la même opération, après validation du remplacement et contrôle du risque. Ils ne confèrent **aucun pouvoir général de suppression**, ni aucune autorisation actuelle de créer, programmer ou envoyer un entraînement. La priorité des consignes en tension doit être éclaircie par le propriétaire et le Gardien, sans action Garmin dans ce chantier.
3. **Chronologie Renfo (COM-06 à COM-09).** Plusieurs « dernier état », « priorité actuelle » et « priorité la plus récente » concernent des états successifs d'une même prescription et se contredisent lorsqu'on les lit simultanément. **Ne pas déduire de ce document l'état sportif ou Garmin courant**, ni recréer une ancienne date ou un brouillon. Conserver les faits, décisions et pièces historiques dans leurs sources, sans les effacer pour assainir la lecture.
4. **Obligations à préserver (COM-10 à COM-15).** Traçabilité de faits déclarés, quatre domaines canoniques distincts, `structuresSollicitees` pour une activité confirmée, frontière Coach/Maturation limitée au rendu HTML local, contrôles CI et version du site réellement servie, protection de la santé, commande « Mets-toi à jour » en lecture seule. Leur existence dans un paragraphe ne prouve pas leur certification clause par clause.

## Portée et verrous

- Aucun remplacement de `docs/COACH-MODE-OPERATOIRE.md`, de `AGENTS.md` ou de `docs/ROLES.md` sur `main`. Aucune donnée métier, archive, page Web ou intégration Garmin modifiée.
- Les descriptions historiques ne sont pas considérées comme des consignes à appliquer. La classe « courant » signifie seulement **plausible à vérifier**.
- Les huit incohérences INC-001 à INC-008 restent ouvertes ; pas de visa indépendant du Gardien, pas d'adoption B2 ni de validation de fusion de la PR n°9.
- Le mini-lot documentaire n°1 a été intégré séparément par [PR n°10](https://github.com/hameaufl/programme-sport/pull/10), après autorisation du propriétaire, sans effet sur le présent audit.

## Travail suivant

Examiner les clauses et leurs priorités dans COM-03 à COM-09 contre les sources V2 et les décisions datées, rechercher les permissions réellement accordées, puis proposer une consolidation **sans exécuter d'écriture Garmin**. Poursuivre la revue des **87 rubriques** restantes, puis vérifier les clauses utiles une à une. Toute modification normative devra être explicitement autorisée.
