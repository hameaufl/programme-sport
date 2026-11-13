# Dossier de décision du propriétaire — Coach B2

**Date : 13 novembre 2026 · État : décision à soumettre, approbation NON DONNÉE.**

## Proposition examinée

**Recommandation actuelle : conserver B2 comme candidat préféré pour un éventuel déploiement, mais le garder en test en lecture seule.** Les nouvelles règles expérimentales ne remplacent pas aujourd'hui les instructions de `main`.

| Version | Branche / SHA figé | Fonction |
| --- | --- | --- |
| A | `tests/coach-a-main` / `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4` | Référence historique |
| B | `tests/coach-b-coordinateur` / `c92d5a7c69b371bfa9ef6770363ad0c07bf53f93` | Coordinateur initial, trop long |
| **B2** | `tests/coach-b2-concis` / `0aca52ac999f3a579610edfa2106aa400518a3fc` | **Candidat** ; seulement deux fichiers Coach différents de B |
| Travail | `maturation/architecture-multiagents` | Documents, audits, scripts et PR en brouillon |

## Bénéfices effectivement étayés
- B2 réduit la longueur des réponses de **71,3 %** sur six mêmes prompts, B **1 642 mots**, B2 **471 mots**. Cette réduction est une **mesure descriptive**, pas une estimation statistique de fiabilité.
- Le premier comparatif A/B, distinct, notait provisoirement A **97/120** et B **108/120** ; **ces notes ne sont pas des notes B2**.
- Deux contre-tests B2 en conversations neuves : compte rendu complet **9/9** critères observés, publication Web **5/8** critères explicitement couverts, sans erreur bloquante observée ; les preuves de publication ne sont pas inventées.
- Les sources métier sont protégées par des contrôles Git et les branches de test restent isolées.

## Réserves à ne pas minimiser
- Trois précisions Web doivent figurer dans le travail de livraison réelle (historique, validations test/modèle, limites Coach/Maturation) ; elles sont reprises par la [checklist dédiée](CHECKLIST-LIVRAISON-WEB-B2.md), conformément aux **règles déjà existantes**.
- Pas de revue réellement indépendante du Gardien ; les appréciations qualitatives proviennent du contexte de conception, non d'un juge aveugle.
- La matrice attribue **85 familles d'exigences**, mais il manque une **vérification sémantique exhaustive** des règles historiques. **Huit incohérences restent ouvertes**.
- Pas de preuve d'une exploitation Garmin ou Web réelle par B2, puisque les essais étaient volontairement en lecture seule.

## Décision recommandée en l'état

**Option recommandée : prolonger le statut de candidat B2** pour des usages de test sans écritures réelles, sans mettre B2 en production. Conserver B comme référence et ne pas fusionner la PR.

L'**activation future** nécessite au minimum :
1. Revue de couverture **clause par clause** des obligations des huit sources historiques et identification des omissions critiques, avec remédiations tracées.
2. Revue et qualification explicite **des huit incohérences** : clôture justifiée ou démonstration de leur non-applicabilité à B2, avec escalade de tout arbitrage réellement nécessaire.
3. Relecture des deux fichiers du protocole B2 et vérification de l'absence de nouvelles permissions ; conservation stricte de `AGENTS.md`, des sources métier et de la possibilité de retour à B.
4. Avis du **Gardien** conforme au protocole de validation, **avec transparence sur la limite d'indépendance** si le même ChatGPT exerce le rôle.
5. **Approbation explicite du propriétaire** pour une fusion précise, liée à une PR, une version et des changements connus ; aucune approbation ne se déduit d'un « continue ».

**Choix disponibles au propriétaire au terme du dossier :** poursuivre les essais B2 ; demander des corrections de protocole limitées ; abandonner B2 et revenir à B/A ; autoriser ultérieurement une proposition de fusion **une fois tous les verrous levés**. Aucune option de fusion n'est actuellement exécutée.

## Observations et liens internes
- [Avis logique final du Gardien](GARDIEN-AVIS-LOGIQUE-B2-2026-11-13.md) — **favorable pour poursuite, bloqué activation**.
- [État machine du verrou d'adoption](ETAT-ADOPTION-B2.json) — **aucune autorisation accordée**.
- [Bilan B/B2](RAPPORT-OBSERVE-B2-2026-11-13.md) et [contre-tests B2](RAPPORT-CONTRETESTS-B2-2026-11-13.md) — résultats anonymisés, PDFs privés non publiés.
- [Registre des conflits](referentiel/INCOHERENCES.md) — ouvert.
- [Dossier de validation du Gardien](REVUE-GARDIEN-B2-A-VALIDER.md) — en attente.

**PR n° 9 : brouillon, pas de fusion sans demande explicite du propriétaire.**
