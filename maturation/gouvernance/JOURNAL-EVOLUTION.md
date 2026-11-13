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

## 13 novembre 2026 — Première simulation dirigée du Coach coordinateur
- Dix scénarios `SC-01` à `SC-10` parcourus **sous les rôles successifs du même ChatGPT**, avec réponses et trois observations d'auto-revue par scénario, consignées dans `RESULTATS-ESSAIS-COACH.json` et `ESSAI-DIRIGE-2026-11-13.md`.
- Aucun sous-agent indépendant ni deuxième conversation « Coach historique » n'a été exécuté. Les attentes étaient connues lors de la rédaction : **pas de mesure A/B, pas de taux de fiabilité comparable, pas de visa indépendant**.
- Cas non réellement éprouvés : validité d'une vraie activité incomplète, déplacement avec date cible, permissions Garmin via un outil, livraison Web réelle. La prochaine campagne doit isoler les deux conditions, ajouter des scénarios cachés et comparer les preuves observables.
- Ajout d'un contrôle CI de cohérence **du journal des simulations uniquement**, qui refuse un gain inventé ou un visa Gardien fictif ; il n'évalue pas les réponses LLM.
- Aucun changement dans les faits ou prescriptions métier, aucune opération Garmin et aucune fusion dans `main`.

## 13 novembre 2026 — Guide des tests A/B isolés dans ChatGPT Plus
- Ajout du protocole `GUIDE-ESSAIS-ISOLES.md`, avec deux textes d'initialisation distincts, SHAs fixes `main` et branche, et règles pour garder les critères d'évaluation invisibles aux conversations A/B.
- Ce guide n'exécute aucun nouvel agent : les expériences croisées doivent encore être menées dans des conversations séparées, en lecture seule. **Aucun résultat A/B ni gain non observé n'est revendiqué.**
- Les tests dirigés enregistrés précédemment ne sont pas réétiquetés comme « indépendants ». Aucune donnée métier/Garmin et aucun `main` modifiés.

## 13 novembre 2026 — Contrôles des permissions et préparation du dépouillement A/B
- **20 cas fictifs** de préconditions (opérations Garmin, date exacte, modèle relu, envoi montre, suppressions, droits Coach/Maturation/Gardien) ont été ajoutés via `verifier-autorisations.cjs` et `tests/cas-autorisations.json`, avec tests unitaires. **Ils ne déclenchent aucune action réelle et ne sont pas interposés techniquement devant les connecteurs ChatGPT.**
- Le workflow de gouvernance PR [43329967634](https://github.com/hameaufl/programme-sport/actions/runs/43329967634), le push [43329957889](https://github.com/hameaufl/programme-sport/actions/runs/43329957889) et la refonte PR [43329967757](https://github.com/hameaufl/programme-sport/actions/runs/43329967757) ont réussi sur `112de20714bb203bcb4398b37b239996aa077922`.
- Un **dépouillement A/B vérifiable sur le plan de la forme** a été préparé via `EVALUATION-AB.json` (toutes les observations à `null`), `verifier-evaluation-ab.cjs` et tests négatifs. Le script refuse tout gain chiffré avant d'avoir des observations des dix paires ; même complet, le score nécessite validation humaine et examen des erreurs critiques.
- **Statut A/B réel : non exécuté ; aucun gain démontré.** Aucune fusion `main`, aucune action Garmin, aucune modification de données métier.

## 13 novembre 2026 — Correction d'un test A/B détectée par la CI
- La première exécution du dépouillement A/B sur `201d1f27b52b7c449580741a4d51b0bed01c9462` a **échoué** dans les tests unitaires : un raccourci d'objet JavaScript utilisait `paires` alors que le compteur local s'appelle `pairs`, uniquement lorsque les dix paires fictives de test sont complètes.
- La CI a correctement refusé cette livraison ; l'erreur est corrigée dans `verifier-evaluation-ab.cjs`. Le tableau public d'observations reste **intégralement vide** et aucun gain A/B n'est déclaré.
- Aucun fichier de domaine métier, aucun adaptateur, ni aucune opération Garmin n'ont été affectés ; cette correction reste sur la PR brouillon.

## 13 novembre 2026 — Audit anti-contournement des références historiques et de la charte
- Découverte : les liens de la matrice utilisaient des numéros de ligne sur la branche ; l'ajout du préambule a décalé `AGENTS.md`. La vérification existante contrôlait seulement que la ligne existait, pas la version exacte qui lui correspondait.
- **85 liens épinglés** au commit historique immuable `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. Le script vérifie le SHA, le chemin, le numéro de ligne et l'existence dans le fichier **au commit de référence**, pas sur la branche décalée.
- **Verrou exact du préambule** : `AGENTS.md` sur la branche doit rester octet par octet identique à celui du premier commit expérimental `7a8016955cf74f312e40fc7b82bccca84020c9eb`. Une permission glissée dans le préambule fait échouer la CI. Toute modification future volontaire de ce verrou demanderait une revue et les validations de gouvernance correspondantes.
- Tests négatifs pour source au faux SHA, référence de ligne impossible et préambule altéré. Aucune donnée métier ni opération Garmin modifiée.
- **Limite :** une référence existante ne démontre pas à elle seule que la règle est sémantiquement bien couverte ; la revue du Gardien et les essais A/B demeurent requis.

## 13 novembre 2026 — Première analyse A/B des deux conversations réellement exécutées
- Deux PDF de tests réels fournis **dans la conversation privée** : 10 réponses A (`d88a202`) et 10 réponses B (`c92d5a7`). **PDF et liens privés non publiés**. Observations anonymisées et rapport `RAPPORT-AB-2026-11-13.md` ajoutés à cette branche de travail uniquement.
- Grille manuelle provisoire : **A 97/120 ; B 108/120**, soit **+11/120** pour B, sans preuve statistique de supériorité et sans juge indépendant. Une alerte majeure de cohérence dans la proposition A au scénario SC-04 ; aucune action externe interdite visible dans les traces.
- Différence de charge notable : 7 pages PDF pour A et 16 pour B, environ 2,08× de texte extrait pour B (y compris les consignes). A reste déjà conforme aux refus Garmin/écriture ; B apporte surtout gestion de l'incertitude, vérifications et traçabilité.
- Méthode limitée : une conversation par branche, dix scénarios **enchaînés**, évaluation non aveugle, scénario Gardien structurellement asymétrique. Ne pas assimiler les scores à un gain réel généralisable ni à un visa Gardien.
- Correctif technique du dépouillement : le SHA B attendu était resté sur un commit de travail `c6f5b58` et non le **SHA de test réel `c92d5a7`** ; il est mis à jour, avec tests reprenant les vingt observations et cas de données manquantes. Le guide A/B précédemment corrompu (« undefined ») est rétabli.
- **main inchangée, branches de test figées, aucune opération Garmin, aucune fusion, aucune activation de la gouvernance.**

## 13 novembre 2026 — Proposition expérimentale B2, concision proportionnée
- Suite au premier A/B privé (B `108/120` mais `10/20` en clarté contre `20/20` pour A), formulation d'un correctif sous **rôle Maturation** dans `PROPOSITION-B2-CONCISION.md`.
- Deux seuls protocoles de restitution Coach concernés : `agents/COACH.md` et `PROTOCOLE-COACH.md`. Les contrôles en interne restent obligatoires ; trois niveaux de réponse : court, conditionnel, justificatif ; vigilance dates et créneaux non vérifiés.
- Avis logique du Gardien documenté mais **non indépendant, visa d'activation BLOQUÉ**. Aucune règle du Gardien, aucune donnée métier, aucun adaptateur ni `AGENTS.md` n'est modifié.
- Objectif : branche `tests/coach-b2-concis` séparée de B et tests ciblés ; mesurer la longueur sans masquer les incertitudes, non produire un faux test comportemental indépendant.

## 13 novembre 2026 — Tests de concision didactiques B2
- Huit scénarios ciblés fixés dans `CAS-CIBLES-B2.json` : 6 issus du jeu A/B existant et 2 nouveaux sur les autorisations Garmin et l'absence de visa Gardien.
- Huit **exemples didactiques**, non issus de conversations B2, enregistrés sous `REPONSES-EXEMPLES-B2.json`. Leur longueur et des notions de sécurité sont contrôlées par `verifier-concision-b2.cjs`, avec tests négatifs de suppression de vérification, perte d'incertitude et violation de budget.
- Ancien B : longueurs de référence d'environ 217 à 414 mots par réponse sur ces six scénarios, tirées des PDF privés du premier A/B. Aucun texte privé n'est publié.
- **Gain de concision réellement constaté dans une conversation B2 : NON ÉVALUÉ.** La vérification de fixtures et la CI ne remplacent pas l'expérimentation indépendante. Autorisation d'activation toujours bloquée.

## 13 novembre 2026 — Isolation du vrai essai B2
- Le premier snapshot B2 incluait les rapports A/B et les réponses modèles de la branche de travail : **risque de contamination du test**. La branche de test finale doit être reconstruite à partir de B, en ne conservant que les deux protocoles modifiés.
- Nouveau garde-fou sur l'amorçage B2 : pas d'exercices fictifs spontanés ni d'audit narratif si l'utilisateur demande seulement d'adopter la casquette ; tests négatifs ajoutés.
- Le rapport de conception et les fixtures restent réservés à `maturation/architecture-multiagents` ; la branche B2 n'hérite ni des corrigés ni des notes de l'évaluation A/B.

## 13 novembre 2026 — Branche B2 isolée et contrôles finalisés
- **B2 final :** `0aca52ac999f3a579610edfa2106aa400518a3fc`, branche `tests/coach-b2-concis`, reconstruite depuis le commit B `c92d5a7` avec **seulement deux protocoles Coach modifiés**. Diff vérifié via GitHub, SHA des deux fichiers identiques aux fichiers approuvés pour essai par la CI de la branche de travail.
- **A, B et main inchangés** ; aucune opération Garmin. La PR n°9 reste en brouillon.
- La CI du commit de travail `0023d046` réussit les contrôles de gouvernance, refonte, non-perte et exemples didactiques ; **aucune mesure réelle de B2 conversationnel**.
- [RAPPORT-B2-2026-11-13.md](RAPPORT-B2-2026-11-13.md) trace les preuves et [GUIDE-ESSAI-B2-PRET.md](GUIDE-ESSAI-B2-PRET.md) donne les instructions à copier dans une conversation neuve. Visa Gardien d'activation toujours non acquis.

## 13 novembre 2026 — Huit réponses B2 réellement observées
- Réception en conversation privée d'un PDF B2 de **4 pages**, avec les 8 prompts ciblés et le SHA `0aca52ac999f3a579610edfa2106aa400518a3fc`. Aucun fichier PDF, lien privé ni transcription intégrale versé au dépôt public.
- Mesure sur **6 demandes identiques** à l'ancien B : `1642` mots B contre `471` B2, soit **−71,3 %** ; extraction des messages hors amorçage. **Deux nouveaux scénarios** réussissent textuellement leurs refus, mais sans comparateur B.
- Qualité manuelle non indépendante : aucun contournement évident des permissions dans les réponses ; réserves de précision sur données inconnues et preuves CI/version Web dans les réponses condensées. L'absence de traces d'outil Garmin ne prouve pas l'état distant.
- Rapport anonymisé `RAPPORT-OBSERVE-B2-2026-11-13.md`, données agrégées `RESULTATS-B2-OBSERVES.json` et contrôle arithmétique `verifier-resultats-b2.cjs` ajoutés. Les scripts ne certifient pas les réponses du modèle.
- **B, B2 et main restent figés ; aucune opération Garmin ni fusion**. Le visa Gardien reste à obtenir avant activation.

## 13 novembre 2026 — Préparation des deux contre-tests de non-régression B2
- Deux scénarios entièrement fictifs, sans écriture, préparés sous `CONTRETESTS-B2-PROMPTS.json` : **CT-B2-01** fidélité d'un compte rendu multi-faits avec correction de durée/volumes et distinction symptôme/hypothèse ; **CT-B2-02** refus d'une publication annoncée sans preuve CI, deploy ni `data/index.json.buildVersion` réellement servi.
- Critères bloquants et attendus documentés **sur la branche de travail seulement** dans `CONTRETESTS-B2-CRITERES.json`. Les réponses du Coach B2 n'ont pas été générées ; `CONTRETESTS-B2-OBSERVATIONS.json` contient deux observations **nulles / non exécutées**.
- Vérificateur et tests de refus intégrés à la CI : identifiants, SHA B2, protection du mode simulation, absence de faux visa, de réponses inventées ou de notes prématurées. **Ce script ne teste pas le comportement du modèle.**
- Guide d'amorçage de **deux conversations neuves** dans `CONTRETESTS-B2-GUIDE.md`, sans divulguer les grilles de notation aux conversations testées. `main`, A, B et B2 inchangées ; aucune action Garmin ni publication.
