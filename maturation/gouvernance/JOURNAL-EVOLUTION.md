# Journal d'évolution — gouvernance multi-agents de Programme Sport

Journal chronologique et append-only du chantier. Les décisions du propriétaire exposées ci-dessous sont distinguées des **modalités proposées**, des **validations non encore obtenues** et des **travaux réellement effectués**. Ne pas transformer une recommandation d'architecture en règle validée sans trace.

## 12 novembre 2026 — Diagnostic à l'origine du chantier
Le rôle Coach actuel couvre le suivi de terrain, les décisions sportives, les séances, Garmin Connect, les informations métier, la lecture du dépôt et la vérification des publications. La largeur du périmètre augmente les risques d'oubli, de confusion de droits et de décalage entre données et Web. Plusieurs évolutions récentes autour du Renfo et de son nom Garmin illustrent l'intérêt de contrôles mieux séparés. Le propriétaire souhaite améliorer la **prédictibilité, la stabilité, la fiabilité et la continuité**, sans perdre d'informations ni compliquer inutilement le système.

Une spécialisation n'apporte pas, à elle seule, une garantie de fiabilité. La proposition repose sur des contrats de responsabilité exclusifs, des transmissions traçables, un contrôle final et des tests déterministes. La simple création de huit documents ne crée pas huit processus intelligents indépendants.

## 12 novembre 2026 — Décisions de gouvernance retenues avec le propriétaire

**GOV-001 — Deux agents principaux de même niveau : MATURATION et COACH.**
Le propriétaire est l'autorité finale. Maturation améliore et pilote le **fonctionnement du projet** : architecture, organisation des rôles, règles, schémas, frontières, contrôles et processus d'amélioration. Coach coordonne le **travail sportif opérationnel**, sans pouvoir se donner de nouvelles permissions structurelles. Maturation ne décide pas des programmes, observations ou arbitrages sportifs à la place de Coach. Les deux agents sont des pairs, pas dans une chaîne de commandement entre eux.

**GOV-002 — Équipe de Maturation.**
Maturation travaille avec **le Gardien du référentiel**. Ce dernier veille activement à la cohérence des décisions, des règles et de leurs versions ; il identifie contradictions, doublons, obsolescences, dépendances et omissions. Il **soulève les incohérences à corriger**, formule des pistes et demande un arbitrage à l'autorité compétente ; il ne réécrit pas de sa propre initiative une décision métier validée. Il maintient un registre de problèmes et de résolutions, en conservant la source et l'histoire des décisions.

**GOV-003 — Équipe de Coach : cinq spécialistes.**
Coach coordonne l'**Analyste du suivi** (faits et retours, Activités/Santé), le **Stratège sportif** (objectifs et adaptations), le **Planificateur** (séances et calendrier), le **Spécialiste Garmin** (catalogue, modèles et opérations autorisées) et le **Contrôleur qualité** (contrôle transversal). Coach choisit à sa discrétion les spécialistes métier utiles à chaque mission et reste responsable de la livraison de bout en bout.

**GOV-004 — Autorité exclusive de Maturation sur les comportements.**
**Seul Maturation peut modifier le comportement, les instructions et les contrats de tous les agents, sous validation préalable du Gardien du référentiel.** Coach ou ses spécialistes peuvent signaler une difficulté et demander un changement mais ne peuvent pas modifier eux-mêmes ces règles. Le Gardien peut valider, demander correction ou bloquer une proposition ; il ne l'applique pas lui-même. Une modification des règles propres au Gardien exige en plus l'accord explicite du propriétaire, afin d'éviter l'auto-validation.

**GOV-005 — Contrôle qualité rattaché à Coach, appuyé sur le Gardien.**
Le Contrôleur qualité vérifie que **le résultat livré est aligné avec les décisions et règles validées par le Gardien**, ainsi qu'avec la demande du propriétaire et les faits métier. Il inspecte selon les besoins données, Garmin, autorisations, projections, tests et publication réelle. Il rend un verdict **validé / refusé / bloqué**, avec preuves et version du référentiel ; il n'invente ni ne modifie de règle. Si une règle est absente, ambiguë ou contradictoire, il remonte l'incident au Gardien via Maturation ou à l'autorité compétente. L'exécutant ne doit pas être l'unique vérificateur de son travail ; les scripts/CI restent la preuve indépendante quand c'est techniquement possible.

**GOV-006 — Deux contrôles complémentaires, sans neuvième agent.**
Le Gardien contrôle la **cohérence des décisions et des règles** ; le Contrôleur qualité contrôle la **conformité des actions et résultats**. Le nombre cible est **huit agents logiques** : Maturation, Gardien, Coach et cinq spécialistes du Coach. Pas d'agent supplémentaire de livraison pour le lancement ; sa nécessité pourra être réévaluée. Les anomalies opérationnelles sont corrigées par Coach, les causes structurelles remontées à Maturation pour amélioration après validation du Gardien.

**GOV-007 — Contrainte économique explicite.**
Le propriétaire ne veut **aucun coût récurrent supplémentaire** au-delà de son abonnement ChatGPT Plus et de l'infrastructure GitHub déjà utilisée. **Choix retenu : pas d'API OpenAI payante, pas de serveur dédié, pas de nouvel abonnement.** Le coordinateur Coach **applique des protocoles spécialisés successivement**, en s'appuyant sur le dépôt GitHub, les contrôles automatisés existants et des tests à renforcer. On ne prétend pas exécuter huit sous-agents indépendants ; la coordination s'effectue logiquement dans un ou plusieurs échanges ChatGPT. Les limites d'accès et d'utilisation des services existants demeurent.

**GOV-008 — Déploiement en branche, pas d'activation immédiate dans `main`.**
Le propriétaire demande **une branche de travail créée avant tout premier commit**, un journal versionné et des essais comportementaux sur la branche. **Aucune fusion dans `main` sans son approbation explicite.** L'expérience doit permettre de décider si le gain de stabilité/fiabilité est réel ; la nouvelle organisation est réversible avant bascule. GitHub Pages de `main` et Garmin ne sont pas à modifier pour ce chantier de conception.

**GOV-009 — Zéro perte d'informations métier.**
Avant toute migration, constituer un état de référence et inventorier les fichiers, archives, informations et décisions métier. En phase de gouvernance, conserver intacts `domaines/*/donnees/`, archives, identifiants, prescriptions, observations, préférences, objectifs et rapports. Comparer l'intégralité de la branche à un SHA initial et au `main` récent. En cas de réorganisation documentaire ultérieure, exiger un chemin de correspondance source → cible, une conservation des nuances et une approbation. L'historique obsolète n'est pas supprimé : il reste consultable avec un statut explicite.

**GOV-010 — Vérifications réelles, non seulement déclaratives.**
Un rôle doit produire une trace d'entrée/sortie : demande, sources consultées, décisions appliquées, modifications, preuves, incertitudes et blocages. Pour chaque modification métier, conserver le principe déjà en vigueur : source canonique → projection Web autorisée → tests/build → CI → version réellement publiée. La déclaration « terminé » exige un contrôle final adapté à la mission. Une demande isolée « mets-toi à jour » reste en lecture seule ; les écritures Garmin nécessitent les autorisations existantes et ne peuvent pas être déclenchées par la simple activation du nouveau protocole.

## 12 novembre 2026 — Conclusions techniques actées
- Une simple conversation ChatGPT ou des fichiers de rôle dans GitHub **n'activent pas automatiquement des agents LLM autonomes**.
- L'API OpenAI est facturée **séparément** de ChatGPT Plus : **solution écartée** par le propriétaire pour ce projet.
- Pour l'essai, **Coach tient successivement les casquettes utiles**, avec livrables disciplinés, relecture du dernier contexte GitHub et contrôle qualité systématique. L'accès à GitHub, aux outils et aux quotas dépend des connexions et du produit ; ne promettre aucune orchestration automatisée native non vérifiée.
- Les contrôles déterministes (modèles, interdictions, cohérence de sources/projections et CI) doivent être privilégiés aux appréciations purement textuelles d'un LLM.
- Les rôles ne doivent ni dupliquer des mémoires métier, ni créer de sources de vérité concurrentes ni étendre les permissions de publication.

## 12 novembre 2026 — Proposition de chantier par phases (modalités à éprouver)
0. Créer branche, photographie du `main` initial, inventaire non-perte et journal.
1. Documenter la charte et les huit rôles avec frontières, droits et sorties attendues.
2. Créer l'index des décisions applicables, signaler les incohérences et définir la validation du Gardien.
3. Expérimenter le Coach coordinateur et la délégation séquentielle des rôles métier.
4. Renforcer les scripts/tests/CI, contrôler intégrité des sources et cohérence des règles ; ne pas confondre vérification syntaxique et validation sémantique.
5. Simuler plusieurs missions sur la branche, recueillir des mesures comparatives, corriger les anomalies ; demander une approbation avant toute éventuelle fusion.
La structure et les chemins exacts restent évolutifs sous le contrôle de Maturation ; le maintien des données métier et le gel de `main` jusqu'à approbation sont contraignants.

## 12 novembre 2026 — Premier lot de travail (statut au moment de la rédaction)
- Branche : `maturation/architecture-multiagents`, créée depuis `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`.
- Premier commit prévu : journal, charte, protocole séquentiel, plan de tests, index des décisions et point d'entrée branch-only dans `AGENTS.md`.
- **Aucun spécialiste LLM indépendant déployé**, aucune approbation fictive du Gardien, aucun contrôle de non-perte nouveau prétendu déjà exécuté.
- Les sources de vérité métier et Garmin restent inchangés. **État : prototype documentaire et comportemental en attente des essais du propriétaire.**
- Résultats des premiers tests, écarts, validations explicites du Gardien et décisions de fusion : **à consigner dans une future entrée datée**, sans réécrire cet historique.

## Références existantes à préserver
`AGENTS.md`, `docs/ROLES.md`, `docs/COACH-MODE-OPERATOIRE.md`, `docs/CONTRAT-CONTINUITE-COACH.md`, `docs/DECISIONS.md`, `docs/JOURNAL.md`, `docs/REPRISE.md`, `docs/PROCEDURE-MIROIR-WEB.md`, `domaines/coaching/donnees/DECISIONS.md`, `domaines/coaching/donnees/JOURNAL.md`, `domaines/coaching/donnees/CONTEXTE-COACH.md`, les sources de `domaines/{planification,activites,sante,coaching}/`, et les contrats/validations de `maturation/architecture/`. Leur signification et leurs contraintes de sécurité préexistantes demeurent applicables.

## 12 novembre 2026 — Audit de couverture des rôles historiques (premier passage)
- À la demande du propriétaire, audit comparatif des obligations Maturation/Coach et des nouveaux contrats séquentiels, consigné dans `AUDIT-COUVERTURE.md` et `MATRICE-COUVERTURE.md` ; inventaire des rubriques dans `INVENTAIRE-RUBRIQUES.json`.
- Résultat : **sources historiques conservées**, mais nouvelles instructions spécialisées **non encore exhaustives**. 85 familles d'exigences examinées : 17 explicites, 37 partielles, 28 non transcrites, 3 conflits à arbitrer ; 162 rubriques identifiées dans 8 sources prescriptives principales.
- Lacunes : continuité métier fine, activités/structures sollicitées, orientation, prescriptions Renfo, garanties Garmin, règles de présentation et publication. Conflits documentaires : anciens noms Garmin, nettoyage de copies, génération FIT abrogée, ancienne interdiction Web totale et chemins `personnel/` obsolètes.
- **Verdict : activation sur `main` non acceptable en l'état** ; correction, avis réel du Gardien et tests comparatifs à effectuer. L'audit n'est pas une certification clause-par-clause et ne crée aucune validation implicite du Gardien.
- Aucune donnée métier ni règle sportive modifiée lors de l'audit ; aucun appel Garmin ; branche et PR brouillon conservées sans fusion.

## 13 novembre 2026 — Phase suivante : protocoles spécialisés proposés, sans activation
- À la demande du propriétaire, Maturation a préparé **huit fiches opérationnelles dans `maturation/gouvernance/agents/`** : Maturation, Gardien, Coach, Analyste, Stratège, Planificateur, Garmin et Contrôleur qualité. Ces fiches restent explicitement au statut **brouillon**, non normatif, jusqu'à examen et validation.
- Les **85 familles d'exigences** de la matrice du 12 novembre ont toutes été attribuées exactement une fois à une fiche cible via `COUVERTURE-PROTOCOLES.json`. **Ceci est une traçabilité d'affectation, pas une preuve d'exhaustivité sémantique ni d'efficacité comportementale**.
- Huit dossiers de contradictions et d'obsolescence documentaires sont consignés dans `referentiel/INCOHERENCES.md` ; l'historique reste conservé. Le dossier `REVUE-GARDIEN-A-VALIDER.md` sollicite l'examen de la cohérence et la qualification des priorités, sans usurper un visa.
- La fonction Contrôleur qualité reste obligatoire dans le fonctionnement cible ; même modèle ChatGPT = pas de contrôle indépendant fictif. Les scripts/CI et le contrôle de publication effective restent déterminants.
- **Aucune instruction existante de `AGENTS.md` n'a été remplacée lors de cette étape**, aucune source métier changée, aucune opération Garmin, aucune fusion ou déploiement sur `main`.
- **Prochain jalon :** avis réellement tracé du Gardien / arbitrages nécessaires, puis intégration des modifications validées par Maturation, contrôles déterministes de non-perte et scénarios comparatifs.

## 13 novembre 2026 — Revue logique du Gardien (protocole séquentiel)
- Examen des huit fiches et des huit INC existantes, avec lecture des sources V2 et constat ponctuel des chemins PNG et du nom Garmin dans Planification ; résultat dans `referentiel/REVUE-LOGIQUE-GARDIEN-2026-11-13.md`.
- Avis : **cohérence du découpage jugée plausible, activation BLOQUÉE** tant que couverture clause-par-clause, vérifications automatiques de non-perte et tests comportementaux manquent.
- La fonction Gardien a été exercée **logiquement dans le même ChatGPT** ; aucun agent réellement indépendant n'a été exécuté, aucune signature de conformité indépendante ni autorisation de modifier les comportements n'est revendiquée.
- Les huit incohérences restent ouvertes mais disposent d'une qualification documentaire motivée, sans effacement d'historique ni nouvelle décision sportive.
- **Aucune donnée métier ou opération Garmin modifiée**, aucun déploiement de gouvernance dans `main` ; fusion toujours interdite sans accord explicite du propriétaire.

## 13 novembre 2026 — Garde-fous déterministes et préparation des simulations
- Ajout de `verifier-integrite-metier.cjs` et `verifier-referentiel.cjs` avec tests négatifs et nouveau workflow `.github/workflows/verifier-gouvernance.yml` (PR et push de la branche ; **aucune publication**). Le workflow historique `verifier-refonte.yml` reste inchangé.
- **Première exécution CI réellement réussie** sur le commit `06bdd875e8af50c75627e60cc7369fe9566d4b46` : vérifications de gouvernance PR [43327836528](https://github.com/hameaufl/programme-sport/actions/runs/43327836528), push [43327827607](https://github.com/hameaufl/programme-sport/actions/runs/43327827607), refonte PR [43327836493](https://github.com/hameaufl/programme-sport/actions/runs/43327836493). Les tests constatent la conservation des sources sur ce commit, sans prouver l'exhaustivité sémantique des procédures.
- Inventaire reproductible de **143 objets fichiers** (chemin, taille et SHA Git) du commit initial, enregistré sous `references/inventaire-base.json` et revérifiable par le verrou.
- **Dix scénarios** sans écritures réelles préparés ; leurs résultats comparatifs sont **en attente d'exécution**. Un gain de fiabilité du Coach ne peut pas être revendiqué à ce stade.
- La revue logique Gardien conserve son statut **bloqué**, aucun visa indépendant, aucune fusion dans `main` et aucune opération Garmin.
