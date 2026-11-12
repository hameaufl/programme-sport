# Première revue logique sous la casquette Gardien — 13 novembre 2026

**Dossier examiné :** branche `maturation/architecture-multiagents`, commit `36920a2154df88c5316b9230f38a434080ab1cdf`.
**Nature du contrôle :** examen documentaire effectué **séquentiellement dans la même conversation ChatGPT** selon les missions du Gardien. Ce n'est **pas une expertise indépendante d'un autre agent** ni un certificat de conformité produit par la CI. Les observations ci-dessous sont enregistrées comme un **avis logique motivé**, sans changement de règle ni visa d'activation définitive.

**Verdict : BLOQUÉ POUR ACTIVATION DES NOUVEAUX COMPORTEMENTS ET FUSION DANS MAIN.** 
Le schéma de gouvernance et les huit protocoles sont cohérents comme *proposition d'essai*, mais l'audit de couverture ne démontre pas encore l'exhaustivité clause par clause, les nouvelles règles sont encore non validées, et les tests de non-perte et les scénarios comportementaux restent à réaliser. Les documents hérités demeurent applicables à leur priorité actuelle.

## 1. Périmètre effectivement relu
- Charte, protocole coordinateur, huit fiches de rôles, matrice et correspondance des **85 familles d'exigences**, registre INC-001 à INC-008.
- Sources de référence : `AGENTS.md`, `docs/ROLES.md`, `docs/COACH-MODE-OPERATOIRE.md`, `adaptateurs/garmin/MCP.md`, `maturation/architecture/PLAN.md`, données Planification actuelles et banque de médias V2.
- Vérification ponctuelle de la prescription `renfo-2026-11-13.json` : `nomEntrainementMontre` indique `Reprise - Renfo A`. C'est **une lecture du dépôt**, pas une relecture Garmin Connect et pas une action distante.
- Les obligations de la matrice sont toutes affectées **une fois**, mais ce n'est ni la vérification exhaustive de toutes les phrases normatives ni l'exécution de tests de terrain.

## 2. Examen des contradictions — qualification provisoire, sans nouvel arbitrage sportif

| ID | Diagnostic de cohérence d'après les sources actuelles | Conséquence et suite | Statut après revue |
| --- | --- | --- | --- |
| INC-001 | **Ancienne règle remplacée** : les FIT Workout locaux et leur générateur étaient requis dans des versions historiques ; `AGENTS.md` « Garmin Connect par MCP » et `maturation/architecture/PLAN.md` entérinent leur suppression V2. | Ne jamais suivre les sections FIT pour reconstruire le système. Maturation doit créer une table de supersession, sans effacer les sources. | **Priorité documentaire identifiable ; non close** |
| INC-002 | **Ancien schéma remplacé** : `personnel/` et `personnel/programme.js` ont été remplacés par les domaines V2. `docs/COACH-MODE-OPERATOIRE.md` donne la carte opérationnelle. | Pointer les nouveaux protocoles vers les chemins V2. Toute directive historique de réécriture de `personnel/` est informative seulement. | **Priorité documentaire identifiable ; non close** |
| INC-003 | **Exception ciblée actuelle** : Coach a une autorisation permanente pour les **fragments locaux de rendu de données métier** dans `addons/web/pages/`, tandis que navigation, projections, scripts, modèle et composants généraux restent à Maturation. | Rappeler la limite exacte au Coach et au Contrôleur qualité ; ne pas appliquer l'ancienne interdiction totale ni élargir l'exception. | **Priorité documentaire identifiable ; non close** |
| INC-004 | **Règle récente dominante** : nom Garmin par objectif actif et phase courante, sans marque « Mon Rythme » ni suffixe technique. La prescription V2 lue mentionne **« Reprise - Renfo A »**, non les anciennes variantes visibles dans les documents. | Historiser les autres noms/états sans opération Garmin. Ne jamais prétendre qu'une lecture Git prouve la bibliothèque Garmin actuelle ; relire Garmin lors d'une vraie demande autorisée. | **Priorité documentaire identifiable ; non close** |
| INC-005 | **Exception étroite et conditionnelle** : la règle plus récente permet seulement de nettoyer, après contrôles et aperçu, un intermédiaire erroné créé **dans la même opération** et dont l'identité/non-utilisation sont établies. | Modèle ancien, valide, ambigu ou potentiellement planifié : **aucune suppression sans accord spécifique**. Le protocole spécialisé doit être testé sur les deux cas. | **Priorité identifiable ; autorisation à tester ; non close** |
| INC-006 | **État métier mouvant, pas règle intemporelle** : les anciennes dates/fréquences de Renfo reflètent des étapes historiques. Les sources actuelles de Planification et les dernières décisions métier priment pour connaître le programme réellement prévu. | Éviter qu'un protocole fige un état de novembre comme règle générale. Relire la branche opérationnelle au moment de la mission et ne jamais recréer des séances anciennes. | **Point de vigilance historique ; non clos** |
| INC-007 | **Correspondance V2 vérifiée dans le dépôt** : les séances Planification utilisent `blocs[].mouvementId` ; la banque d'images V2 est `addons/web/public/assets/renfo/banque.json` avec des clés `mouvementId` et des chemins `assets/renfo/png/...`. `adaptateurs/projections/lecture.cjs` associe les aides à la projection. | Les anciennes instructions qui demandent d'écrire directement `aidesExercices` dans la séance ne s'appliquent pas mécaniquement au schéma V2. Maintenir l'obligation pédagogique et tester la relation blocs → images → rendu ; Maturation possède la structure/validation. | **Correspondance technique établie ; contrôle futur requis** |
| INC-008 | **Contexte d'essai distinct** : les retours sportifs authentiques relèvent de la procédure opérationnelle courante ; les scénarios fictifs d'évaluation de l'équipe multi-agents sont **strictement en simulation sans écriture** sur la branche. | Ne pas prendre une consigne de test comme autorisation de pousser des données fictives vers `main`, Garmin ou des sources métier. Une intervention réelle sur une branche devra être explicitement cadrée. | **Frontière d'essai identifiable ; non close** |

**Aucune de ces qualifications ne crée un changement de comportement validé** : elles décrivent l'état des sources et une lecture de leurs priorités. Les entrées restent ouvertes jusqu'à traçabilité complète et clôture selon `INCOHERENCES.md`. En cas de conflit concret non résolu, choisir le blocage plutôt qu'une interprétation créant un effet externe.

## 3. Revue des frontières des huit rôles

| Rôle | Appréciation documentaire du Gardien | Réserve / action recommandée |
| --- | --- | --- |
| MATURATION | Autorité sur architecture, contrats et comportements bien distincte de l'autorité sportive Coach. | Rendre les validations exigibles et vérifiables ; ne pas modifier les règles du Gardien sans accord propriétaire. |
| GARDIEN | Cohérence, traçabilité, signalement proactif et droit de blocage clairement décrits. | Éviter toute auto-approbation ; les règles du Gardien n'ont pas été éditées pendant la présente revue. |
| COACH | Coordination séquentielle sous ChatGPT Plus, sélection des spécialistes et clôture qualité explicites. | Les relais vers les cinq rôles doivent être testés sur des cas réels simulés ; ne pas confondre séquence et sous-agents indépendants. |
| ANALYSTE | Continuité, faits versus hypothèses, `structuresSollicitees` et informations non immédiatement utiles pris en compte. | Tester la complétude d'un rapport de séance et la traçabilité des informations non liées au calendrier. |
| STRATÈGE | Objectifs canoniques, orientation conditionnelle et prudence sportive préservés. | Tester la différence entre maintien et modification d'orientation pour un même retour. |
| PLANIFICATEUR | Blocs V2, séances réalisées et données Renfo complètes protégés. | Écarter tout automatisme lié à un état de novembre figé dans la fiche ; tester le lien médias V2. |
| GARMIN | Verrou d'autorisation, relecture complète, priorité des noms et distinction calendrier/montre prévus. | Tester les cas de rejet/suppression intermédiaire et ne pas inférer l'état distant d'une donnée du dépôt. |
| CONTRÔLEUR QUALITÉ | Verdict, sources, contrôles, version et escalade prévus. | Une revue par le même modèle n'est **pas indépendante** ; privilégier scripts et preuves externes. |

**Observation supplémentaire :** la charte et les fiches restent volontairement rédigées comme des propositions ; elles ne doivent pas remplacer `AGENTS.md` et les procédures métier historiques avant clôture. Le mécanisme de validation du Gardien n'est pas encore un outil indépendant.

## 4. Conditions de levée du blocage
1. **Maturation** produit, sans supprimer les documents historiques, un index déterministe des supersessions ci-dessus et les validations de cohérence correspondantes ; toute modification des comportements passe par le Gardien selon le protocole de gouvernance et les approbations requises.
2. Vérifier la **non-perte métier sur toute la branche** depuis le SHA initial et en regard du `main` récent. Comparer aussi les anciens documents de règles, pas seulement les JSON.
3. Exécuter un **contrôle automatisé** des références de couverture (85 IDs sans doublon, huit fiches présentes, registre non silencieux, statut de visa correctement déclaré).
4. Tester des **scénarios de délégation séquentielle sans écriture** (suivi, stratégie, planification, Garmin non autorisé, conflit, lecture seule), mesurer les écarts par rapport au protocole antérieur.
5. Solliciter les arbitrages du propriétaire uniquement si une nouvelle permission, un changement de décisions métier ou une modification du Gardien lui-même est nécessaire.
6. Enregistrer l'avis de validation final lié à un **commit exact**, puis demander l'**accord explicite du propriétaire** avant toute éventuelle fusion.

## 5. Signature de statut — ce qu'elle signifie
**Rôle appliqué :** « Gardien du référentiel » dans **la même instance ChatGPT**.
**Verdict de cohérence documentaire :** priorité de plusieurs textes identifiée, **activation BLOQUÉE**.
**Visa indépendant :** **NON**.
**Autorisations de modification des comportements :** **NON ACCORDÉES PAR CET AVIS**.
**Accord de fusion de `main` :** **NON**.
**Modification de données métier/Garmin :** **AUCUNE**.
