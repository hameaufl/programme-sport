# Proposition Maturation B2 — réduire la surcharge sans perdre les garde-fous

**Statut : PROPOSITION NON VALIDÉE DE GOUVERNANCE, strictement pour essai B2.** Demande du propriétaire le 13 novembre 2026 : corriger la surcharge observée dans le Coach B et réaliser des tests ciblés. Aucun droit de fusion `main`, de modification des règles du Gardien ni d'écriture Garmin n'est accordé.

## Diagnostic documenté
Le rapport [RAPPORT-AB-2026-11-13.md](RAPPORT-AB-2026-11-13.md) attribue à B **108/120** et à A **97/120** sur dix scénarios ; mais la dimension de clarté/concision est **10/20 pour B contre 20/20 pour A**. Les PDFs privés occupent 16 pages B et 7 pages A (consignes et réponses incluses). Il s'agit de notes manuelles, non indépendantes, et non d'une preuve de gain statistique.

**Cause probable** (inférence de conception) : le format « spécialistes appliqués → tableaux de contrôles → verdict détaillé » donne trop de place aux étapes internes, y compris quand le résultat est simple. Dans l'essai de B, la phase d'initialisation a produit des exercices fictifs supplémentaires non demandés.

## Diff proposé — périmètre strictement ciblé
- **Ancien fonctionnement B :** le Coach et le Contrôleur qualité conservent des traces et exposent fréquemment leurs étapes séquentielles, preuves et verdicts en détail.
- **Comportement B2 proposé :** les mêmes vérifications sont **obligatoires en interne**, mais la réponse utilisateur est compacte par défaut, de trois niveaux : **court / conditionnel / justificatif**. Pas de tableaux de rôles en routine, pas d'exercices fictifs improvisés lors de l'initialisation. Limites de longueur **indicatives**, jamais au détriment de l'information nécessaire.
- **Renforcement de précision, déjà prescrit historiquement :** ne jamais supposer les disponibilités horaires ni proposer un jour explicitement exclu sans une vraie vérification de calendrier.
- **Fichiers de protocole ajustés** : `agents/COACH.md` et `PROTOCOLE-COACH.md` uniquement ; `agents/GARDIEN.md`, la charte, les règles de sécurité et `AGENTS.md` demeurent inchangés.

## Avis logique du Gardien — sans visa formel
**Revue dans le même ChatGPT ayant conçu le changement**, donc **non indépendante**. Constat : les règles historiques du Coach demandent déjà des réponses **courtes et directes (idéalement 1 à 3 phrases)** dans `docs/ROLES.md`. B2 vise à mieux respecter cette priorité, sans supprimer le contrôle qualité. Aucune contradiction de permission identifiée dans cette proposition ; le risque majeur est de **confondre brièveté et suppression de vérifications**.

**Verdict d'activation : BLOQUÉ (Gardien indépendant/formel non acquis).** Le prototype peut être évalué **sur sa branche de test** conformément à la demande du propriétaire, sans préjuger du visa d'activation. Ne pas modifier les règles du Gardien ; toute adoption réelle après tests suit le protocole de validation.

## Tests et retour arrière
- Vérifier statiquement les passages pertinents des protocoles et les exemples de réponse courte, avec cas négatifs qui doivent échouer si une limite de sûreté disparaît.
- Reproduire des cas ciblés sur **B figé versus B2**, dans des conversations séparées, en gardant à l'aveugle les attentes internes ; calculer la longueur des réponses **hors initialisation** et noter les pertes de sens.
- **Annulation simple** : B de référence reste figé sous `tests/coach-b-coordinateur` au SHA `c92d5a7`. La branche B2 peut être abandonnée sans rien changer à B, A ni `main`.

## Précaution d'équité ajoutée
La branche B2 utilisée en test doit être créée à partir du **commit B de référence**, par application des deux seuls protocoles modifiés. La branche de travail, qui héberge les réponses d'exemple, rapports et grilles, ne doit pas être la source directe de la branche B2 isolée. L'initialisation B2 ne doit pas créer spontanément de cas fictifs ou de longs rapports.
