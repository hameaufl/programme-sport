# Add-on Web — présentation remplaçable

L'application Mon Rythme présente le calendrier, les séances, le suivi et les aides PNG, mais ne crée, ne stocke et ne distribue **aucun fichier d'entraînement pour une montre**. Les prescriptions et faits ne sont jamais canoniques dans ce dossier.

- Pages : `pages/index.html`, `pages/sante.html`, `pages/coach.html`, `pages/equipements.html` ; ressources : `public/`.
- Données : `data/index.json`, `data/semaines/<lundi>.json`, `data/sante/journal/`, `data/sante/profil.md`.
- Publication filtrée par `contrats/publication-v1.json` ou `contrats/publication-prive-v1.json`.
- Construction : `node scripts/construire-site.cjs`. `MON_RYTHME_WEB=0` désactive l'add-on et `MON_RYTHME_POLITIQUE=prive` choisit une projection restreinte.

Les connexions et synchronisations externes restent indépendantes de l'application. Aucun lien de téléchargement de programme, référence de service tiers ni binaire n'est exposé.

**Suivi santé (version simplifiée)** : la page `sante.html` ne restitue plus le profil médical textuel. Elle montre les compteurs, la progression hebdomadaire et les jalons datés. Les sources intégrales restent dans `domaines/sante/donnees/`, le raisonnement du Coach dans `domaines/coaching/donnees/`. Le contrat `contrats/publication-v1.json` et le build ne publient plus le profil brut ni les paragraphes des événements dans l'artefact web.

**Le cap du Coach :** `addons/web/pages/coach.html` lit exclusivement `data/coaching/orientation.json`, **projeté** depuis `domaines/coaching/donnees/orientation.json` et l'objectif personnel par `adaptateurs/projections/coaching.cjs`. Le Web ne lit pas les Markdown de mémoire, ne contient pas de logique sportive et n'écrit pas dans un domaine. L'édition métier de cette orientation appartient au Coach ; la liste blanche au contrat `contrats/publication-v1.json` empêche la fuite d'autres champs ; mode restreint = aucune projection Coaching. Cette page est distincte du suivi factuel Santé et du calendrier.

**Mon équipement (12 novembre 2026)** : `pages/equipements.html` lit uniquement `data/coaching/equipements.json`, construit par une projection indépendante de `domaines/coaching/donnees/equipements.json`. La vue montre le matériel réellement **disponible** et l'éventuel diamètre, sans notes, absences ni informations incertaines. La maintenance de l'inventaire reste exclusivement dans le domaine Coaching ; aucune saisie ni duplication dans le HTML. En politique restreinte, la projection n'existe pas.

**Présentation « Le cap du Coach » (12 novembre 2026)** : le bandeau vert est limité au titre. L'objectif personnel apparaît avant une section distincte « L'orientation du Coach » (phase, cap courant et date de révision). Viennent ensuite « Ce qu'il envisage » et « Ses points d'attention », sans sous-titres explicatifs. Cette disposition ne modifie pas les sources de Coaching ni la projection autorisée ; toute nouvelle vue conserve la même séparation.
