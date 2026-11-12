# Audit de couverture — rôles historiques Maturation et Coach

**Date :** 12 novembre 2026. **État :** premier audit documentaire sur `maturation/architecture-multiagents`, base `7a8016955cf74f312e40fc7b82bccca84020c9eb`. **Aucune fusion dans main.**

## Verdict

- **Conservation physique : confirmée** pour les consignes historiques de la PR initiale : `AGENTS.md` ajoutait uniquement une section expérimentale en tête et les autres fichiers de procédure déjà présents sur `main` n'étaient pas modifiés.
- **Couverture par les nouveaux rôles : INCOMPLÈTE.** Les huit rôles et leur séparation sont clairs, mais les fiches nouvelles sont des contrats de haut niveau. Elles ne suffisent pas comme unique mode opératoire.
- **Conflits historiques : avérés.** La priorité doit être qualifiée par le Gardien, sans effacer le passé.
- **Certification d'exhaustivité métier : NON OBTENUE.** L'inventaire de rubriques et la matrice fonctionnelle ne valent pas encore audit clause-par-clause de toutes les archives ; aucun essai comportemental comparatif n'a encore été exécuté.

## Périmètre et chiffres vérifiables

- **8 documents normatifs de référence** effectivement lus et inventoriés dans `INVENTAIRE-RUBRIQUES.json` : `AGENTS.md` (54), `docs/ROLES.md` (29), `docs/COACH-MODE-OPERATOIRE.md` (15), `docs/CONTRAT-CONTINUITE-COACH.md` (14), `docs/REPRISE.md` (30), `docs/PROCEDURE-MIROIR-WEB.md` (5), `adaptateurs/garmin/MCP.md` (11), `contrats/DEPENDANCES.md` (4).
- **162 rubriques Markdown** de niveau 2 à 4 relevées à l'identique, avec emplacement et SHA Git de leur source ; toutes les rubriques de ces huit fichiers sont répertoriées. Ce nombre n'est **pas** le nombre de décisions.
- **85 familles d'exigences** définies avec source, rôle cible, degré de transcription et contrôle attendu. Statuts : **17 explicites, 37 partielles, 28 non transcrites, 3 conflits à arbitrer**. Les regroupements ne couvrent pas encore chaque phrase normative.
- **Pas de données métier changées** par cet audit ; les références vers les domaines existants sont des liens et non des copies.

Le dénombrement des statuts caractérise la **transcription opérationnelle dans les nouveaux protocoles**, pas la conservation des fichiers. Les règles originales sont toujours consultables.

## Points critiques révélés

### CRIT-01 — Les protocoles spécialisés sont encore trop génériques
Le [protocole Coach](PROTOCOLE-COACH.md) donne la séquence de délégation et les exigences générales du contrôleur, mais pas les checklists précises pour chacun des cinq spécialistes. La [charte](CHARTE.md) n'intègre pas toutes les obligations de `AGENTS.md`, `docs/COACH-MODE-OPERATOIRE.md`, `docs/CONTRAT-CONTINUITE-COACH.md` et `adaptateurs/garmin/MCP.md`. **Risque :** qu'un rôle n'applique pas une obligation présente seulement dans un ancien fichier.

**Correction proposée, à valider par le Gardien :** une fiche exécutable par spécialiste (entrée, documents à relire, autorisations, procédure, interdictions, sortie, contrôles) et une obligation explicite de consultation des sources détaillées.

### CRIT-02 — Garmin : plusieurs directives de nommage restent intitulées prioritaires
`AGENTS.md` en tête et `adaptateurs/garmin/MCP.md` imposent pour la phase courante **« Reprise - Renfo A »**, alors que leurs sections historiques suivantes mentionnent **« Mon Rythme - Renfo A »** et **« Mon Rythme - Renfo A (corrigé) »** avec des titres eux aussi prioritaires. La source actuelle et les décisions plus récentes doivent primer, mais les entrées anciennes ne sont pas étiquetées assez visiblement comme remplacées.

**Correction :** liens décision actuelle → anciens noms et dates de remplacement ; règle de priorité non ambiguë, sans réécrire l'historique ni provoquer d'opération Garmin.

### CRIT-03 — Garmin : suppression d'un brouillon erroné
`adaptateurs/garmin/MCP.md` § « Retour d'expérience » impose de **ne pas supprimer sans demande explicite**, puis la règle ultérieure « nettoyage intermédiaire autorisé » donne un consentement borné pour une **copie créée par Coach dans la même opération**, non conforme, dont l'identité et l'absence d'usage sont vérifiées. La permission bornée est la plus précise et récente, mais doit être mise en évidence pour éviter une interprétation de suppression générale.

**Correction :** tableau explicite « copie de la même opération et vérifiée / modèle historique ou douteux », avec les actions autorisées et l'obligation d'arrêt.

### CRIT-04 — FIT historiques versus contrat Garmin MCP V2
`AGENTS.md` et `docs/ROLES.md` conservent des obligations anciennes de créer des FIT Workout et lier des fichiers aux séances, alors que `AGENTS.md` § « Garmin Connect par MCP » et `maturation/architecture/PLAN.md` établissent l'abrogation de la génération locale, le retrait des binaires et l'absence de téléchargement Web.

**Correction :** rattacher les directives FIT au statut « historique / remplacé par Garmin MCP », sans tenter de régénérer des fichiers ni de restaurer l'ancien générateur.

### CRIT-05 — Frontières du Coach : interdiction Web ancienne versus exception locale plus récente
Les anciennes sections « deux casquettes » interdisent toute écriture Web au Coach, alors que le périmètre actuel l'autorise **strictement pour un fragment local d'affichage de données métier concernées**. La charte reprend le principe mais pas tout le détail des zones interdites et de l'obligation de vérifier le miroir Web à chaque mise à jour métier.

**Correction :** reproduire le périmètre exact sous une procédure d'autorisation testable et faire vérifier le diff par le contrôleur.

### CRIT-06 — Monolithe historique et architecture V2
Plusieurs règles anciennes demandent des écritures dans `personnel/` et `programme.js`, alors que l'architecture V2 a remplacé ces sources par quatre domaines `domaines/*/donnees/`. La seule reprise des anciennes consignes sans qualification de statut peut conduire un nouveau rôle à écrire au mauvais endroit.

**Correction :** créer une table de correspondance et pointer systématiquement vers `docs/COACH-MODE-OPERATOIRE.md` et les quatre domaines V2.

### CRIT-07 — La continuité métier fine n'est pas attribuée dans un protocole détaillé
Le contrat historique impose de conserver préférences, circonstances, motivations, contraintes, provenance, unités, hésitations, décisions et points ouverts **même sans révision du programme** ; la version nouvelle parle de faits, suivi et continuité mais ne spécifie pas encore cette extraction exhaustive.

**Correction :** checklist Analyste et Coach de « tout apport pertinent », avec confirmation des écritures au bon domaine et preuve de non-perte. Ne pas transformer des rapports personnels en contenu de gouvernance.

### CRIT-08 — Exigences spécialisées peu visibles dans la nouvelle équipe
Manquent comme clauses dédiées : `structuresSollicitees` obligatoire sur **toute** activité confirmée ; en-têtes Santé stricts ; mise à jour conditionnelle `orientation.json` ; équipement uniquement confirmé ; intégrité des cinq blocs du Renfo ; catalogue Garmin exact ; relecture distante complète ; limites précises de publication et version réellement publiée. Voir `MATRICE-COUVERTURE.md` pour les propriétaires proposés et les preuves attendues.

**Correction :** rendre ces obligations incontournables dans les protocoles spécialisés, avec tests bloquants lorsque réalisables.

### CRIT-09 — Contrôle qualité et validation du Gardien non attestés
La charte décrit un Contrôleur qualité fondé sur des règles « validées par le Gardien », mais **le Gardien n'a pas encore audité ni validé ce premier référentiel**. Un même modèle jouant plusieurs rôles n'est pas une preuve de relecture indépendante.

**Correction :** un journal de visa explicite, versionné, associé à la version du référentiel et aux écarts ; conserver les tests déterministes comme preuve indépendante. Ne pas déclarer « conforme au Gardien » sans sa validation réelle.

### CRIT-10 — Pas encore de preuve automatisée globale de non-perte sur ce chantier
`scripts/verifier-changements.cjs` contrôle utilement des changements du dernier commit, mais pas toute l'évolution depuis le SHA initial. La matrice de gouvernance ne vérifie pas encore, seule, les modifications cumulées ou le maintien des archives.

**Correction :** script comparant le diff complet depuis la référence initiale, puis comparaison au `main` récent avant toute fusion, y compris les archives et les documents historiques.

## Décision de passage de phase

**Avis de l'audit : BLOQUÉ POUR UNE ACTIVATION SUR `main`**, non parce que les sources ont disparu, mais parce que les règles sont incomplètement redistribuées et que plusieurs conflits historiques ne sont pas encore explicitement qualifiés. Les essais documentaires sur la branche peuvent continuer.

Ordre proposé : (1) consultation/validation de l'audit par le Gardien, (2) résolution des conflits historiques avec statut visible sans supprimer les sources, (3) fiches de procédures spécialisées couvrant les exigences, (4) contrôles de non-perte et de périmètre, (5) scénarios comparatifs, (6) accord explicite du propriétaire pour une éventuelle fusion.

**Aucune approbation du Gardien ou du propriétaire n'est considérée comme acquise.** La PR reste en brouillon et `main` n'est pas modifiée.
