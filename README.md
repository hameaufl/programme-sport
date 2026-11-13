# Mon Rythme — programme sportif personnalisé

Mon Rythme regroupe un programme de séances, des activités réellement confirmées, des informations de suivi et la stratégie du Coach. Les **données des quatre domaines** sont les seules sources de vérité. Le site public est une projection filtrée, pas un outil de saisie.

## Organisation

| Domaine | Source | Usage |
| --- | --- | --- |
| Planification | `domaines/planification/donnees/` | Séances prévues, cycle et blocs structurés |
| Activités | `domaines/activites/donnees/` | Séances réalisées, gestes et structures sollicitées |
| Santé | `domaines/sante/donnees/` | Ressentis, événements, rapports et profil |
| Coaching | `domaines/coaching/donnees/` | Objectifs, orientation, équipements, décisions et mémoire |

Les identifiants stables relient les domaines sans créer de copies parallèles. **Coach** est responsable des faits et décisions métier, **Maturation** des structures, adaptateurs, contrats, contrôles et de l'interface générale du Web. Les fichiers de données datés restent préservés.

## Site public

`addons/web/` contient les pages **Mon programme**, **Le cap du Coach**, **Mon suivi santé** et **Mes équipements**. `scripts/construire-site.cjs` crée les projections autorisées dans `_site/`; `contrats/publication-v1.json` filtre les champs publiés. Les pages n'enregistrent pas de faits par le navigateur.

Site : https://hameaufl.github.io/programme-sport/

## Garmin Connect

`adaptateurs/garmin/` prépare les séances et peut être associé à Garmin MCP, **en lecture seule par défaut**. La bibliothèque de modèles, le calendrier et la montre sont distincts. Toute création, programmation, modification, suppression ou transmission requiert un **accord explicite du propriétaire pour l'action et les cibles exactes**. Aucune opération Garmin n'est déclenchée par le build ou par un commit. Le Web ne propose aucun téléchargement d'entraînement.

## Vérifier et construire

```sh
node scripts/verifier-site.cjs
node scripts/verifier-changements.cjs
node maturation/architecture/verifier-portabilite.cjs
node maturation/architecture/verifier-frontieres.cjs

node scripts/construire-site.cjs
node scripts/verifier-miroir-web.cjs
node maturation/architecture/verifier-publication.cjs

MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs
node maturation/architecture/verifier-publication-prive.cjs

MON_RYTHME_WEB=0 node scripts/construire-site.cjs
```

Le build local et les tests ne publient pas le site. Sur `main`, le workflow `.github/workflows/publier-pages.yml` publie seulement quand un chemin surveillé change ou lors d'un déclenchement manuel. Un déploiement n'est confirmé qu'après succès des étapes **build, déploiement et contrôle de `data/index.json.buildVersion` réellement servi**.

La politique restreinte du build sélectionne moins de données publiques mais **ne constitue pas une authentification**. Le dépôt et GitHub Pages sont publics ; `noindex` ne protège pas les informations personnelles. Ne pas y ajouter de secrets ou de documents bruts privés.

## Références opérationnelles

- [Consignes de travail](AGENTS.md) · [Mode opératoire Coach](docs/COACH-MODE-OPERATOIRE.md) · [Rôles](docs/ROLES.md)
- [Continuité du Coach](docs/CONTRAT-CONTINUITE-COACH.md) · [Contexte technique](docs/CONTEXTE.md)
- [Contrats de dépendances](contrats/DEPENDANCES.md) · [Ports](contrats/PORTS.md) · [Publication Web](docs/PROCEDURE-MIROIR-WEB.md)
- [Garmin MCP](adaptateurs/garmin/MCP.md)
