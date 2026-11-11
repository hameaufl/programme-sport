# Mon Rythme — Programme Sport

Site statique en français, adapté à l'ordinateur et au raccourci Android standalone. Dépôt **public** : [hameaufl/programme-sport](https://github.com/hameaufl/programme-sport). Site GitHub Pages attendu : https://hameaufl.github.io/programme-sport/.

## Publication plus fiable

- Incident du [run 43101058284](https://github.com/hameaufl/programme-sport/actions/runs/43101058284) : artefact Pages bien téléversé, mais introuvable par le déploiement lancé immédiatement ; problème connu [actions/deploy-pages#451](https://github.com/actions/deploy-pages/issues/451).
- Désormais deux jobs `build` → `deploy` : contrôle des fichiers/données avec `node scripts/verifier-site.cjs`, chargement de l'artefact, puis attente de sa disponibilité et publication.
- Les modifications de code et décisions sont regroupées dans un commit, sans publications successives inutiles. Vérification du statut final GitHub Actions.
- « Semaine en cours » : bouton plus visible au repos, sans autre ajout à l'interface.

## Publication et diagnostic Android

### Correctif au blocage des déploiements Pages

GitHub Actions a signalé de nombreux `startup_failure` pour le workflow **« pages build and deployment »** de la publication classique. Leur cause exacte n'est pas attestée par des logs (aucune tâche n'a démarré) ; la limite souple GitHub Pages de **10 builds/heure** peut contribuer, mais ne suffit pas à expliquer tous les cas.

**Un workflow personnalisé est désormais dans [`.github/workflows/publier-pages.yml`](.github/workflows/publier-pages.yml)** : publication des seules ressources du site, annulation des publications concurrentes et aucun déclenchement sur modification exclusive des documents. Cette voie n'est pas soumise à la limite spécifique des builds Pages classiques.

**Action manuelle requise une seule fois (si Source n'est pas déjà « GitHub Actions ») :**
1. Ouvrir [Settings → Pages](https://github.com/hameaufl/programme-sport/settings/pages).
2. Dans **Build and deployment → Source**, choisir **GitHub Actions** au lieu de **Deploy from a branch**, puis enregistrer.
3. Ouvrir [Actions → Publier Mon Rythme](https://github.com/hameaufl/programme-sport/actions/workflows/publier-pages.yml). Si aucun déploiement réussi de la dernière version : **Run workflow**, branche `main`.
4. Contrôler que le workflow aboutit à **success**, puis le [témoin de publication](https://hameaufl.github.io/programme-sport/publication.txt) et la [page](https://hameaufl.github.io/programme-sport/).

Les permissions du connecteur GitHub utilisé dans ce projet **ne permettent pas de changer directement la source Pages**. Le simple ajout du YAML ne garantit pas un déploiement. Aucun changement visuel ni aucune modification des séances.


- **Règle permanente :** chaque décision ou modification du projet est appliquée et **poussée sur `main` pendant l'échange**, puis consignée dans `docs/DECISIONS.md` et `docs/JOURNAL.md`. Les comptes rendus de sport relèvent du Coach ; architecture / IHM / règles relèvent de Maturation.
- La version cible du site est **`2026-11-11-fait-uniquement-v2`**, inscrite dans la métadonnée invisible `mon-rythme-version` de `index.html`.
- [Témoin de publication Pages](https://hameaufl.github.io/programme-sport/publication.txt?v=20261111) : doit indiquer cette version si le déploiement correspondant est disponible.
- [Version HTML sans réutilisation d'une URL déjà mise en cache](https://hameaufl.github.io/programme-sport/?v=20261111-statique-fait-sensations-v1) : doit présenter **des indicateurs « Fait » non modifiables** et les sensations seulement lorsqu'elles ont été renseignées dans `programme.js`.
- Si le témoin est absent ou si des cases interactives subsistent, contrôler [Settings → Pages](https://github.com/hameaufl/programme-sport/settings/pages) et [Actions](https://github.com/hameaufl/programme-sport/actions) (**pages build and deployment**). Le dépôt poussé **n'est pas une preuve** du site publié.
- Aucun élément visuel de diagnostic n'a été ajouté à Mon Rythme. Le cache de `index.html` et les délais de GitHub Pages restent des limites distinctes de l'anti-cache de `programme.js`.

## Reprise par un agent LLM

**Lire d'abord [AGENTS.md](AGENTS.md), puis [docs/ROLES.md](docs/ROLES.md).** La répartition des responsabilités est **stricte** :

- **Coach** : reconnaît les comptes rendus comme demandes de mise à jour, traite les sensations et fichiers Garmin, actualise **les données sportives** de `programme.js`, `sante/` et `pieces-jointes/`, adapte ou maintient les séances. **Jamais de modification de l'interface.**
- **Maturation** : structure du site, architecture, documentation, robustesse, cache et IHM prête pour les contenus. **Jamais de coaching ni de modification des retours réels.** Tout changement visuel nécessite une demande ou une approbation explicite.

Documents à lire ensuite : [reprise](docs/REPRISE.md), [contexte](docs/CONTEXTE.md), [décisions](docs/DECISIONS.md), [journal](docs/JOURNAL.md), [Garmin](docs/GARMIN.md), [santé](sante/README.md), [pièces jointes](pieces-jointes/README.md).

## Statut de réalisation visible

- **Séance sans réalisation confirmée** : aucune mention, ni carré vide.
- **Séance confirmée** : coche verte avec le texte **« Fait »**.
- Notes « Sensations » : visibles uniquement si elles ont été renseignées par le Coach.
- Statut et sensations **statiques dans `programme.js`** ; aucune saisie sur le site.

## Interface actuelle

- Bandeau **« Mon programme. »**, sans sous-titre.
- **« Mes objectifs »** : une seule puce sur le plaisir des sensations et l'absence de recherche de performance. Les objectifs à venir sont de nature trimestrielle ou à plus long terme.
- **« Mon calendrier »** : semaines du lundi au dimanche, sans description sous le titre ; navigation et retour dynamique à la semaine actuelle.
- **« Programme du jour » / « Séances de la semaine »** : détail concis en puces, statuts **« ✓ Fait » (uniquement après confirmation)** et **« Sensations : … »** lorsqu'un retour existe.
- Aucun bouton de saisie, aucune case interactive, aucun pied de page. Aucun autre élément graphique sans accord du propriétaire.

## Données sportives publiques et versionnées

**La seule source des contenus et du suivi est `programme.js` :**
- `fait: false` = absence de confirmation enregistrée ; `fait: true` = réalisation rapportée.
- `sensations: ""` = pas de retour ; sinon résumé factuel court fourni par l'utilisateur.
- `id` unique et stable par séance ; indexation du planning par le lundi de la semaine.
- `pieces_jointes` : champ futur facultatif pour fichiers réellement disponibles ; contrat dans [docs/GARMIN.md](docs/GARMIN.md).

**Aucune donnée de suivi enregistrée en local** (`localStorage` supprimé de l'application). Après un retour de sortie, **l'agent Coach** doit écrire la mise à jour dans GitHub pendant l'échange et créer le commit, sans attendre une consigne « publie aussi ». Les données apparaissent sur les appareils après déploiement.

Le propriétaire a **expressément accepté** le caractère public/versionné des données de santé qu'il transmet. Les fichiers et traces GPS rendus publics peuvent rester accessibles dans l'historique Git. Aucun secret Garmin/API dans le dépôt.

## Programme de course initial — 2026

Cycle de course : **11 novembre – 14 décembre 2026**, 15 séances. Source adaptée : *Programme fractionné I* de La Clinique du Coureur, anciennement 8 semaines. Pas de marche seule ; récupérer entre les courses.

| Mode bracelet | Déroulé | Total | Course |
| --- | --- | --- | --- |
| 2M+3C | 3 × (2 min marche + 3 min course) + 2 min marche | 17 min | 9 min |
| 2M+5C | 3 × (2 min marche + 5 min course) + 2 min marche | 23 min | 15 min |
| Option continue (seulement si aisance le 14 décembre) | 3 min marche + 21 min course + 3 min marche | 27 min | 21 min |

| Cycle initial | Dates | Modes |
| --- | --- | --- |
| 1 | 11, 13, 16 novembre | 2M+3C, 2M+3C, 2M+3C |
| 2 | 18, 20, 23 novembre | 2M+3C, 2M+3C, 2M+5C |
| 3 | 25, 27, 30 novembre | 2M+3C, 2M+5C, 2M+5C |
| 4 | 2, 4, 7 décembre | 2M+5C, 2M+5C, 2M+5C |
| 5 | 9, 11, 14 décembre | 2M+5C, 2M+5C, 2M+5C |

**Kiné · Genoux** : 4, 9 et 18 novembre 2026, horaires non communiqués. Course et kiné coexistent le 18 novembre.

Ces dates et durées sont **un programme de départ modifiable par le Coach** à partir des comptes rendus ; ne pas présumer qu'une séance a été effectuée sans retour. Priorité : sensations agréables, pas de douleur. Bilan de podologie (appuis, posture des pieds) annoncé, **pas encore reçu**.

## Garmin Venu 4 — fichiers futurs

- **Prévu** : entraînement structuré défini par le Coach et compatible Garmin Venu 4 **après vérification**.
- **Réalisé** : activité enregistrée Garmin (export original souvent `.fit`, éventuellement `.gpx`, `.tcx`, `.csv`).
- Les fichiers réellement disponibles seront versionnés par le **Coach** dans `pieces-jointes/` et reliés aux séances sans modifier l'IHM.
- **Maturation** pourra ultérieurement ajouter les liens dans l'interface **uniquement sur demande ou approbation explicite**.
- Import via fichier recommandé au départ. Intégration API/MCP Garmin éventuelle, aucune connexion garantie aujourd'hui. [Voir la documentation Garmin](docs/GARMIN.md).

## Architecture

- `index.html` : présentation **en lecture seule** ; aucune saisie de statut ou sensation.
- `programme.js` : programme, réalisation, sensations et éventuelles références de fichiers.
- `sante/` : profils, comptes rendus et bilans sportifs versionnés.
- `pieces-jointes/` : fichiers réels d'entraînement et d'activité, lorsqu'ils seront disponibles.
- `docs/` : modes de travail, suivi du projet et contrat Garmin.
- `manifest.webmanifest`, icônes, `.nojekyll` : publication et intégration mobile.

À chaque ouverture ou retour au premier plan, l'application tente de charger `programme.js` avec une URL renouvelée (`?actualisation=...`). Cela limite le risque d'ancien programme sur Android, sans supprimer les délais GitHub Pages ou le cache éventuel de `index.html`.

## Publication

GitHub Pages : [paramètres du dépôt](https://github.com/hameaufl/programme-sport/settings/pages) → `Deploy from a branch`, `main`, `/(root)`. **Commit sur main ≠ confirmation du déploiement**. Aucun travail en arrière-plan implicite : le Coach modifie le dépôt lorsqu'il reçoit un retour dans la conversation et a accès à GitHub.
