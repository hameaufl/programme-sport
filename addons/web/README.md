# Add-on Web — présentation remplaçable

L'application Mon Rythme présente le calendrier, les séances, le suivi et les aides PNG, mais ne crée, ne stocke et ne distribue **aucun fichier d'entraînement pour une montre**. Les prescriptions et faits ne sont jamais canoniques dans ce dossier.

- Pages : `pages/index.html`, `pages/sante.html` ; ressources : `public/`.
- Données : `data/index.json`, `data/semaines/<lundi>.json`, `data/sante/journal/`, `data/sante/profil.md`.
- Publication filtrée par `contrats/publication-v1.json` ou `contrats/publication-prive-v1.json`.
- Construction : `node scripts/construire-site.cjs`. `MON_RYTHME_WEB=0` désactive l'add-on et `MON_RYTHME_POLITIQUE=prive` choisit une projection restreinte.

Les connexions et synchronisations externes restent indépendantes de l'application. Aucun lien de téléchargement de programme, référence de service tiers ni binaire n'est exposé.

**Suivi santé (version simplifiée)** : la page `sante.html` ne restitue plus le profil médical textuel. Elle montre les compteurs, la progression hebdomadaire et les jalons datés. Les sources intégrales restent dans `domaines/sante/donnees/`, le raisonnement du Coach dans `domaines/coaching/donnees/`. Le contrat `contrats/publication-v1.json` et le build ne publient plus le profil brut ni les paragraphes des événements dans l'artefact web.

**Le cap du Coach :** `addons/web/pages/coach.html` lit exclusivement `data/coaching/orientation.json`, **projeté** depuis `domaines/coaching/donnees/orientation.json` et l'objectif personnel par `adaptateurs/projections/coaching.cjs`. Le Web ne lit pas les Markdown de mémoire, ne contient pas de logique sportive et n'écrit pas dans un domaine. L'édition métier de cette orientation appartient au Coach ; la liste blanche au contrat `contrats/publication-v1.json` empêche la fuite d'autres champs ; mode restreint = aucune projection Coaching. Cette page est distincte du suivi factuel Santé et du calendrier.
