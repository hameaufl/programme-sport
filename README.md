# Mon Rythme

Application modulaire de planification et de suivi sportif, avec site Web statique et intégration Garmin facultative.

## Structure actuelle

- `domaines/planification/` : prescriptions et séances à venir.
- `domaines/activites/` : séances réellement effectuées et confirmées.
- `domaines/sante/` : observations, rapports et événements.
- `domaines/coaching/` : objectifs, orientation, inventaire des équipements et décisions métier.
- `adaptateurs/` : lecture des fichiers, projections filtrées et préparation Garmin.
- `addons/web/` : site Web, sans source de vérité métier.
- `contrats/` : dépendances, ports et politiques de publication.
- `scripts/` : construction et vérifications.

Les identifiants métier relient les domaines. La publication n'expose que les champs explicitement autorisés. Le dépôt GitHub et le site public ne constituent pas un espace confidentiel.

## Site

[Ouvrir Mon Rythme](https://hameaufl.github.io/programme-sport/) — Mon programme, Le cap du Coach, Mon suivi santé, Mes équipements.

## Vérification locale

```sh
node scripts/verifier-site.cjs
node scripts/verifier-changements.cjs
node scripts/controle/verifier-frontieres.cjs
node scripts/controle/verifier-portabilite.cjs
node scripts/construire-site.cjs
node scripts/verifier-miroir-web.cjs
node scripts/controle/verifier-publication.cjs

MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs
node scripts/controle/verifier-publication-prive.cjs

MON_RYTHME_WEB=0 node scripts/construire-site.cjs
```

Ces commandes ne publient pas GitHub Pages et n'effectuent aucune écriture Garmin. Les pull requests sont vérifiées sans déploiement ; la publication est gérée séparément sur `main`.

## Références

- [Architecture](docs/ARCHITECTURE.md) — frontières, sources et contrats.
- [Processus de développement](docs/PROCESSUS.md) — méthode commune à tous les chantiers.
- [Consignes Codex](AGENTS.md) — précautions applicables à chaque intervention.
- [Dépendances](contrats/DEPENDANCES.md) et [ports](contrats/PORTS.md).
- [Garmin MCP](adaptateurs/garmin/MCP.md) — opérations autorisées et validations.

Un changement d'architecture donne lieu à un ADR court dans `docs/decisions/`, seulement lorsqu'une décision structurante est nécessaire.
