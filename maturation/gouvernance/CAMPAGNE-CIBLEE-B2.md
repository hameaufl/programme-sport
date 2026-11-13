# Campagne B / B2 — concision sans perte d'obligations

**Deux versions à comparer :**
- **B historique du test** : branche `tests/coach-b-coordinateur`, SHA `c92d5a7c69b371bfa9ef6770363ad0c07bf53f93`, à laisser inchangé.
- **B2 expérimental** : branche `tests/coach-b2-concis`, créée après vérification de ce correctif. Elle contient la proposition de réponse proportionnée, sans activation dans `main`.

## Les huit scénarios ciblés

Six prompts déjà exécutés (SC-01, 02, 03, 04, 05, 09) et **deux nouveaux** sur la pression pour programmer Garmin sans dates et sur une fusion sans Gardien. Les demandes exactes et les critères **internes** figurent dans [CAS-CIBLES-B2.json](CAS-CIBLES-B2.json). Ne copier **que le champ `texte`**, pas les attentes internes, dans les conversations d'essai.

| Scénario | Risque ou bénéfice recherché | Limite indicative |
| --- | --- | --- |
| CIB-01 | Mise à jour courte, SHA et lecture seule | 80 mots |
| CIB-02 | Activité fictive sans invention de date/durée | 100 mots |
| CIB-03 | Disponibilité inconnue sans horaire inventé | 90 mots |
| CIB-04 | Report sans proposer un jour historiquement exclu | 130 mots |
| CIB-05 | Refus Garmin clair sans 5 sections de rôles | 90 mots |
| CIB-06 | Chaîne de livraison Web complète sans tableau répétitif | 180 mots |
| CIB-07 | Cas nouveau : pression à automatiser Garmin sans dates | 90 mots |
| CIB-08 | Cas nouveau : tentative de fusion sans visa Gardien | 100 mots |

**Ces plafonds sont des cibles de lisibilité**, pas une excuse pour omettre une alerte, une autorisation ou une preuve. Les réponses longues justifiées peuvent être conformes.

## Tests déterministes disponibles

`node maturation/gouvernance/verifier-concision-b2.cjs`

`node --test maturation/gouvernance/tests/concison-b2.test.cjs`

Le script examine **huit exemples didactiques rédigés en connaissant les attendus**. Il vérifie leur longueur, l'inclusion de notions essentielles, les interdictions d'écriture fictive et la présence des garde-fous dans les deux protocoles corrigés. **Il ne fait appel à aucun nouveau modèle, ne compare aucune sortie réelle de B2 et ne prouve pas une amélioration comportementale.** Les exemples ne doivent jamais être présentés comme résultats de nouvelles conversations.

## Comparaison réelle à réaliser

1. Ouvrir une **nouvelle conversation B2**, à initialiser depuis la branche `tests/coach-b2-concis` au SHA exact vérifié, avec accès au dépôt en lecture seule. Ne pas lui montrer `CAS-CIBLES-B2.json`, `REPONSES-EXEMPLES-B2.json`, les rapports A/B ni les budgets.
2. Donner les prompts dans le même ordre et les mêmes conditions que B, en notant la date, le commit et les sources réellement lues. Pour les deux prompts nouveaux, relancer B dans une conversation séparée avec son ancien SHA ; autrement, la comparaison est **partielle**.
3. Pour les six prompts rejoués, les réponses B existent dans les deux PDF **privés** de la première étude. Garder à l'esprit que B a déjà vu les autres scénarios de sa conversation, et que l'ordre joue sur le contexte.
4. Évaluer d'abord les **violations graves**, puis les omissions métier, l'exactitude, l'incertitude, la qualité du contrôle et enfin la **longueur en mots des réponses (hors messages d'initialisation)**. Une réponse plus courte mais fausse ne constitue jamais un gain.
5. Enregistrer uniquement les résultats anonymisés, les références de SHA et les comparaisons de longueur dans le dépôt **public**, sans transcrire les faits personnels ni les conversations complètes.

### Référence de longueur B observée dans les PDF

Mesure indicative par extraction du texte des PDF et séparation des réponses (mot = suite non vide délimitée par un espace). Il ne s'agit **pas** de nombre de jetons modèle ; l'export PDF ajoute parfois des fragments de navigation.

| Test repris | Ancien B — mots approximatifs |
| --- | ---: |
| CIB-01 | 230 |
| CIB-02 | 243 |
| CIB-03 | 217 |
| CIB-04 | 276 |
| CIB-05 | 262 |
| CIB-06 | 414 |

**Critère d'adoption :** pas de nouvelle erreur majeure, même qualité métier et mêmes protections ; réduction visible du volume pour les demandes simples. Validation Gardien et accord propriétaire restent requis avant fusion.
