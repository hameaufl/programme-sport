# Mon Rythme — architecture modulaire et données fortement ségrégées

## Situation actuelle

Le projet dispose de **quatre domaines métier autonomes**, d'adaptateurs remplaçables et d'un add-on Web. Le dépôt et la publication GitHub Pages restent **publics** tant qu'un hébergement privé et une authentification n'ont pas été approuvés.

| Périmètre | Sources canoniques | Responsabilité |
| --- | --- | --- |
| Planification | `domaines/planification/donnees/` | Prescriptions et mouvements typés, calendrier, cycle |
| Activités réalisées | `domaines/activites/donnees/` | Exécution réellement confirmée, compte rendu sportif |
| Santé personnelle | `domaines/sante/donnees/` | Observations, profil, rapports et événements |
| Coaching personnalisé | `domaines/coaching/donnees/` | Objectifs, préférences, décisions, motivations et nuances |
| Adaptateurs | `adaptateurs/` | Stockage, projections autorisées, génération et fichiers FIT |
| Site Web optionnel | `addons/web/` | Deux pages et médias, aucune donnée métier canonique |
| Maturation | `maturation/`, `contrats/`, `scripts/`, `.github/` | Architecture, contrats, migrations et CI |

Un identifiant de séance stable relie ces périmètres. Il n'existe **pas de source de santé ni de réalisation à l'intérieur d'une séance prévue** : les programmes sont des blocs structurés, rendus en phrases uniquement pour les consommateurs. Le générateur FIT consomme les blocs numériques plutôt que les phrases du site.

## Commandes utiles

```sh
node scripts/verifier-site.cjs
node scripts/verifier-changements.cjs
node maturation/architecture/verifier-portabilite.cjs
node scripts/construire-site.cjs

# Construire une publication restreinte (simulation sans Santé, Coaching ni FIT)
MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs
node maturation/architecture/verifier-publication-prive.cjs

# Désactiver entièrement l'add-on Web
MON_RYTHME_WEB=0 node scripts/construire-site.cjs

# FIT depuis une prescription structurée, sans dépendre du Web
node scripts/generer-garmin.cjs renfo-2026-11-12
```

## Contrats et ports

La lecture des données est injectée par `adaptateurs/fichiers/depots.cjs`, avec un port indépendant par domaine. `adaptateurs/projections/lecture.cjs` compose les informations autorisées sans être une source de vérité. Pour passer Santé sur un stockage privé, remplacer **seulement** le port Santé; ne pas modifier Planification ni l'add-on Web.

Le fichier `contrats/publication-v1.json` décrit **explicitement** les données autorisées sur le site courant. L'exemple `contrats/publication-prive-v1.json` permet de générer une version sans données de santé, sans commentaires privés et sans FIT. Les sélections sont en **liste blanche, refus par défaut**. Le mode privé du build n'est **pas** un mécanisme d'authentification.

## Fiabilité de la migration

La refonte a séparé 36 séances et 33 FIT. Les prescriptions historiques ont été converties en blocs typés avec vérification aller-retour des textes. `maturation/architecture/verifier-migration.cjs` compare la migration au commit de référence : tous les champs, les FIT octet par octet, les documents de santé et de coaching déplacés. Ce test est **ponctuel** : il ne doit pas bloquer les modifications sportives ultérieures.

La CI du dépôt teste les modèles, leurs frontières, l'absence de fuite dans les projections, le générateur FIT et le build. Les pages ne sont servies que comme projection de données. Les ressources historiques de compatibilité Android ne sont plus publiées automatiquement (opt-in `MON_RYTHME_LEGACY=1` seulement en politique courante, après évaluation du risque d'exposition).

## Confidentialité et limites

**Important :** le dépôt a été public, ses commits anciens et les publications précédentes ont contenu des données personnelles. Même après déplacement vers un stockage privé, les anciennes copies, URLs, caches, forks et historiques peuvent rester accessibles. Les directives `noindex` n'apportent aucune confidentialité. Une migration privée réelle devra inclure contrôle d'accès, politique d'export, assainissement des anciennes expositions et stratégie de révocation. Aucune information de santé nouvelle ne doit être publiée par simple ajout de champ.

## Exploitation et responsabilité

- **Coach** tient les seules données métier dans `domaines/*/donnees/`, vérifie les identifiants et la traçabilité, puis contrôle systématiquement leur restitution sur le site. Il peut corriger **uniquement les fragments Web qui affichent ces données métier**, si les projections existantes ne suffisent pas, sans toucher à l'interface générale. Aucun entraînement Garmin n'est créé/programmé automatiquement : les écritures MCP exigent des dates explicitement demandées.
- **Maturation** gère les modules purs, contrats, adaptateurs, **l'architecture et l'interface générale du Web**, schémas, migration et validation, mais pas les faits sportifs ni les décisions cliniques. Les corrections de rendu local métier constituent la seule exception Web attribuée au Coach.
- **Web** demeure supprimable sans affecter la création de séances ou la génération Garmin.

[Contrat d'architecture](contrats/DEPENDANCES.md) · [Ports](contrats/PORTS.md) · [Plan de refonte](maturation/architecture/PLAN.md) · [Consignes Coach](docs/CONTRAT-CONTINUITE-COACH.md) · [Rôles](docs/ROLES.md)

Site public existant : https://hameaufl.github.io/programme-sport/
