# Mon Rythme — architecture modulaire V2

**État opérationnel du projet :** quatre domaines métier autonomes, des adaptateurs remplaçables et un site Web statique facultatif. Ce dépôt GitHub et la publication GitHub Pages sont **publics**. Le Web est une projection des sources métier, jamais un lieu de saisie.

## Sources métier et responsabilités

| Périmètre | Source canonique | Contenu |
| --- | --- | --- |
| Planification | `domaines/planification/donnees/` | Prescriptions à venir, cycle, blocs typés et mouvements |
| Activités réalisées | `domaines/activites/donnees/` | Exécutions réellement confirmées, mouvements réalisés et structures sollicitées |
| Santé | `domaines/sante/donnees/` | Observations, rapports et événements, avec leur provenance |
| Coaching | `domaines/coaching/donnees/` | Objectifs, stratégie, préférences, équipements, décisions et nuances |

Les identifiants de séance durables relient ces domaines sans déplacer le compte rendu d'une activité dans la prescription prévue. Les ports `adaptateurs/fichiers/` lisent les sources ; `adaptateurs/projections/` restitue **uniquement les champs autorisés** par les contrats de publication. Le contenu métier ne doit pas être copié dans des scripts, README, pages HTML ou documents de gouvernance.

**Coach** maintient les faits et décisions sportifs et vérifie leur restitution. Il peut corriger uniquement un **fragment local d'affichage métier** déjà autorisé, si la projection existante ne suffit pas. **Maturation** maintient architecture, modèles, ports, contrats, interface Web générale, validation, CI et publication. Les règles détaillées de responsabilité figurent dans `AGENTS.md`, `docs/ROLES.md` et `docs/COACH-MODE-OPERATOIRE.md`.

## Site Web : quatre pages, sans donnée canonique

L'add-on `addons/web/` fournit `index.html` (Mon programme), `coach.html` (Le cap du Coach), `sante.html` (Mon suivi santé) et `equipements.html` (Mes équipements). Les fichiers `data/` utilisés par le navigateur sont créés pendant le build dans `_site/` : ce sont des **vues filtrées**, pas des sources de vérité.

Une séance est affichée comme « Fait » uniquement si une réalisation a été confirmée. Les informations Santé et Coaching qui ne sont pas autorisées par les listes blanches ne doivent pas être publiées. La publication n'est considérée effective qu'après le **build, le déploiement GitHub Pages et la vérification du `buildVersion` réellement servi**.

Site public : https://hameaufl.github.io/programme-sport/

## Garmin Connect : MCP en bêta, sans génération FIT locale

La prescription sportive reste dans Planification. `adaptateurs/garmin/` permet la préparation et le rapprochement en **lecture seule par défaut** avec la bibliothèque et le calendrier Garmin MCP. Un modèle Garmin n'est ni une séance réellement effectuée ni une séance automatiquement programmée.

**Aucune création, modification, suppression, programmation à une date ni transmission à la montre sans demande explicite du propriétaire couvrant l'action et les cibles/dates concernées.** Une décision sportive, un commit GitHub ou un build du site ne déclenche jamais une opération Garmin par lui-même. Les modèles créés doivent être relus et vérifiés avant toute affirmation de conformité ; les suppressions restent soumises aux autorisations spécifiques et aux arbitrages en vigueur.

L'ancien `scripts/generer-garmin.cjs` et les fichiers FIT locaux sont des **procédures V1 retirées** ; ils ne constituent pas des commandes d'exploitation. Voir `adaptateurs/garmin/README.md` et `adaptateurs/garmin/MCP.md`.

## Commandes de validation et de construction

Les commandes suivantes correspondent aux fichiers réellement présents dans la V2 :

```sh
# Contrôler les sources, schémas, frontières et préconditions du site
node scripts/verifier-site.cjs
node scripts/verifier-changements.cjs
node maturation/architecture/verifier-portabilite.cjs
node maturation/architecture/verifier-frontieres.cjs

# Construire le site standard puis contrôler les vues publiques
node scripts/construire-site.cjs
node scripts/verifier-miroir-web.cjs
node maturation/architecture/verifier-publication.cjs

# Tester une projection restreinte (pas une authentification)
MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs
node maturation/architecture/verifier-publication-prive.cjs

# Vérifier l'indépendance du cœur sans add-on Web
MON_RYTHME_WEB=0 node scripts/construire-site.cjs
```

Ces commandes de build travaillent localement sur les vues générées : **elles ne publient pas GitHub Pages et n'écrivent pas dans Garmin**. Le workflow `.github/workflows/verifier-refonte.yml` exécute des contrôles **sans publication** pour les PR ; `.github/workflows/publier-pages.yml` publie sur `main` lorsqu'un chemin surveillé a changé ou lors d'un déclenchement manuel. Une modification du seul README ne prouve ni ne déclenche nécessairement une publication.

Les contrats `contrats/publication-v1.json` et `contrats/publication-prive-v1.json` restent à liste blanche (« refus par défaut »). Le mode `prive` du build simule une sortie plus restreinte : **il ne fournit aucun contrôle d'accès**.

## Historique et confidentialité

La migration antérieure depuis les sources V1 a été décrite comme portant sur **36 séances et 33 anciens FIT** : ces nombres sont une **trace historique**, pas une instruction de re-génération ou une preuve de l'état courant. Les anciennes méthodes et les contenus remplacés demeurent consultables dans les commits précédents, jusqu'à toute décision distincte d'assainissement. L'ancien test ponctuel `maturation/architecture/verifier-migration.cjs` n'est **plus un script disponible** dans l'arbre V2 actuel ; ne pas l'inclure dans la CI.

Les dépôts, anciens commits, forks, caches et publications Web peuvent garder des copies de données autrefois exposées. La directive `noindex` **n'assure pas la confidentialité**. Toute migration vers un stockage privé et toute éventuelle réécriture d'historique nécessitent un projet et une autorisation distincts : retirer un fichier du `main` ne purge pas son passé.

## Documentation de référence

- [Contexte technique V2](docs/CONTEXTE.md) · [Dépendances](contrats/DEPENDANCES.md) · [Ports](contrats/PORTS.md)
- [Mode opératoire Coach](docs/COACH-MODE-OPERATOIRE.md) · [Continuité](docs/CONTRAT-CONTINUITE-COACH.md) · [Rôles](docs/ROLES.md)
- [Contrôle de la publication Web](docs/PROCEDURE-MIROIR-WEB.md) · [Adaptateur Garmin MCP](adaptateurs/garmin/MCP.md)

L'expérimentation de gouvernance multi-agents constitue un chantier **séparé, non activé sur `main`**. Aucun protocole expérimental ne remplace les consignes opérationnelles actives sans validation explicite.
