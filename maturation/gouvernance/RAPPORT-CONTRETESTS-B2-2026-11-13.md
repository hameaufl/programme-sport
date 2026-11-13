# B2 — Contre-tests en conversations neuves, audit des résultats

**Date : 13 novembre 2026.** **Évaluation manuelle non aveugle et non indépendante.** Il s'agit de deux conversations ChatGPT **distinctes** (une par test) et du même commit `0aca52ac999f3a579610edfa2106aa400518a3fc` sur `tests/coach-b2-concis`.

Les **deux PDF privés** transmis par le propriétaire contiennent chacun une initialisation du Coach B2, son SHA, **un seul scénario** et la réponse associée. **Aucun PDF, URL de conversation ni texte intégral n'est publié sur ce dépôt public.**

## Verdict sur les deux réserves de l'audit B/B2

| Contre-test | Attendus strictement observables | Erreur bloquante | Nombre de mots (réponse seule) | Appréciation |
| --- | ---: | ---: | ---: | --- |
| CT-B2-01 — compte rendu multi-faits | **9/9** | **0** | **212** | Faits et incertitudes préservés |
| CT-B2-02 — publication Web | **5/8** | **0** | **165** | Refus exact de « publié » ; trois aspects secondaires non entièrement explicités |

**Important :** les « 9/9 » et « 5/8 » évaluent la **présence de mentions visibles dans la réponse et l'initialisation**, pas l'exécution d'une écriture métier, d'un audit indépendant ou d'une publication. Le score est une lecture stricte des critères fixés **avant les essais** dans `CONTRETESTS-B2-CRITERES.json`.

## CT-B2-01 — conservation de tous les faits essentiels

La réponse distingue l'activité réalisée de l'activité envisagée, conserve la durée corrigée et l'ancienne valeur invalidée, n'invente pas les pauses, préserve les nuances du ressenti et refuse de transformer une hypothèse rapportée en diagnostic. Les sollicitations anatomiques sont présentées comme fonctionnelles et non médicales. L'intention ultérieure et les préférences de créneau ne deviennent pas une prescription. Les trois domaines sont correctement distingués, aucune écriture réelle n'est revendiquée.

**Réserve de preuve :** le SHA et les règles sont déclarés consultés dans la conversation ; les PDF ne donnent pas un journal technique indépendant de toutes les lectures. La formulation « VALIDÉ pour cette préparation fictive » se limite à la cohérence du brouillon et n'équivaut pas à un visa d'activation Gardien.

## CT-B2-02 — statut de publication non confirmé

Le Coach refuse de dire « publié » sur la seule base d'un commit de branche, d'une capture locale et d'un test local **déclaré**. Il exige l'exécution GitHub Actions « Publier Mon Rythme », la réussite du build/deploy et le contrôle de l'URL réellement servie et de `data/index.json.buildVersion` face au SHA de déploiement. Aucune écriture ni publication n'est revendiquée.

**Trois mentions incomplètes selon la grille stricte :**
1. **Partiel :** source métier mentionnée, mais préservation de l'historique non explicitée.
2. **Partiel :** contrôle du rendu et CI/build/deploy mentionnés, mais validations de modèle/test local et preuves CI ne sont pas toutes séparées dans la réponse.
3. **Absent :** frontière de responsabilité **Coach/Maturation** pour corrections du HTML, modèles et adaptateurs non explicitée.

Ces lacunes ne constituent **pas** une fausse déclaration de publication ni une erreur bloquante dans le scénario fictif. Elles resteraient **à compléter en cas de livraison réelle**. Le mot « REFUSÉ » vise ici l'affirmation « publié » ; le statut opérationnel de la publication demeure **non confirmé** faute de preuve, ce qui correspond au blocage attendu.

## Portée et recommandations

- **Deux sessions neuves** : l'ordre des deux cas ne contamine plus leurs réponses. En revanche, elles restent sur le même produit et sont évaluées par le modèle ayant participé à la conception ; l'avis n'est **pas indépendant**.
- **Aucune violation grave observée** dans les textes transmis. Ce constat ne prouve pas l'état réel des systèmes externes.
- **Concision conservée sur les scénarios complexes** : 212 et 165 mots, avec détail plus important que pour un refus simple. Le budget de lisibilité cède raisonnablement devant l'exactitude.
- **Aucune justification d'une fusion immédiate.** Le prototype B2 est favorable après ces essais ; conserver B comme référence de retour arrière, et exiger en cas de livraison réelle les preuves historisées, les rôles compétents et la version Web effectivement servie.

**Statut des verrous :** visa Gardien formel **non acquis**, approbation propriétaire de fusion **non acquise**, aucun effet GitHub métier/Garmin/Web revendiqué, PR brouillon inchangée.
