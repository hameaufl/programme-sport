# Continuité du Coach — contrat opérationnel

**Finalité :** un autre échange ou agent doit pouvoir reprendre le programme personnalisé sans perdre un fait, une nuance, une préférence ou une décision utile et sans inventer d'actions.

## Avant de travailler

Lire `AGENTS.md`, `docs/COACH-MODE-OPERATOIRE.md`, puis les sources pertinentes :
- `domaines/coaching/donnees/CONTEXTE-COACH.md`, `DECISIONS.md`, `JOURNAL.md`, `objectifs.json`, `orientation.json`, `equipements.json` ;
- séances structurées prévues dans Planification, activités confirmées dans Activités ;
- profil, ressentis, événements et rapports complets dans Santé ;
- contrats de lecture, vérificateurs et procédures techniques si la demande implique le site.

Une phrase isolée « Mets-toi à jour » ne demande **aucune écriture** ; ne pas confondre lecture, proposition, décision sportive, commit, publication ou opération Garmin.

## Mémoire et précision à conserver

La mémoire du Coach doit conserver, lorsqu'ils sont utiles aux décisions :
- **Objectifs et motivations** : objectif personnel, phase en cours, progrès souhaités ou explicitement refusés, priorités, choix et raisons de chaque ajustement.
- **Contexte physique rapporté** : tolérance à l'effort, douleurs, déclencheurs, limitations, mobilité, récupération et conseils réellement reçus de professionnels ; ne pas inventer de constat clinique.
- **Activités** : séances prévues et réellement faites, durées et chiffres déclarés, exercices, sensations, résultats, contre-exemples, progrès et hésitations.
- **Contraintes pratiques** : temps disponible, matériel confirmé, préférences d'exercices, exercices refusés, pédagogie souhaitée, contexte de disponibilité.
- **Provenance et incertitude** : dates, auteur du constat, source, degré de confirmation, conclusions du Coach distinctes des propos rapportés, raisons d'un changement de stratégie.

Ne pas réduire la mémoire aux seuls champs visibles sur le site. Un résumé public ne remplace jamais un récit daté ou un rapport complet. Conserver les corrections de faits avec leur justification, sans dupliquer un même fait dans plusieurs domaines.

## Où écrire

| Type de contenu | Emplacement |
| --- | --- |
| Prescriptions, cycle et blocs | `domaines/planification/donnees/` |
| Réalisation confirmée et `structuresSollicitees` | `domaines/activites/donnees/` |
| Ressentis, rapports, événements, profil | `domaines/sante/donnees/` |
| Décisions, orientation, objectifs, équipements et mémoire | `domaines/coaching/donnees/` |

Chaque séance est reliée par `id`/`seanceId`; garder les données originales et la distinction prévu/réalisé. Les rapports de Santé possèdent leur propre provenance et ne sont pas recopiés dans Planification. Les notes Coaching ne doivent pas devenir des faits Santé.

## Règles de mise à jour

1. Déterminer la portée de la demande et les fichiers concernés ; distinguer ce qui est dit de ce qui est seulement supposé.
2. Appliquer uniquement les faits, décisions ou corrections explicitement appuyés. Une nouvelle proposition de séance n'est pas une réalisation ; une planification Garmin n'est pas une activité effectuée.
3. Vérifier les modèles métier, les structures sollicitées, les équipements disponibles, les aides PNG et les projections autorisées. Ne jamais considérer l'absence d'une donnée comme une valeur implicite.
4. Contrôler le diff, la non-perte et la bonne liaison des identifiants ; ne pas écraser les décisions datées pour raccourcir un fichier.
5. Exécuter la CI appropriée ; si le site a été publié, confirmer le build, le déploiement et `data/index.json.buildVersion` réellement disponible. Informer clairement de ce qui a été fait et de ce qui reste non confirmé.

## Rendement public et responsabilités

La vue « Le cap du Coach » est produite **uniquement** à partir de `domaines/coaching/donnees/orientation.json` et des objectifs par `adaptateurs/projections/coaching.cjs`, sous la liste blanche de `contrats/publication-v1.json`. Elle ne copie ni journal, ni mémoire, ni décisions complètes. La page `equipements.html` reflète seulement les équipements disponibles et les informations publiques permises, pas les absences ou notes privées.

Le Coach peut corriger le **fragment local d'affichage métier** concerné, jamais la navigation ou l'interface générale ; Maturation gère ces composants et les contrats. Aucune écriture Garmin sans demande actuelle, ciblée et précise ; un nom de modèle, une date programmée et une synchronisation sur la montre sont des faits différents.

## Confidentialité et reprise

Le dépôt et la publication du site sont publics. Les projections filtrées réduisent les données affichées, mais les fichiers versionnés restent accessibles selon les permissions du dépôt. Ne jamais verser secrets, identifiants privés ou données brutes supplémentaires dans les artefacts Web ; `noindex` n'est pas un contrôle d'accès.

Pour transmettre le travail à un autre agent : indiquer la demande, les sources consultées, les décisions effectives, les fichiers modifiés, les actions **non** autorisées, les contrôles réellement passés et les incertitudes. Les sources du domaine restent la mémoire de référence : ne pas créer un second journal métier dans une documentation technique.
