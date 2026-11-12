# Add-on Web — présentation remplaçable

Les seules sources d'interface sont `pages/index.html`, `pages/sante.html`, `public/` (icônes et PNG) et les archives d'images non publiées. Aucune prescription, aucun rapport de santé, aucun fait réalisé n'a de source canonique dans ce dossier.

L'extension consomme les projections `data/index.json`, `data/semaines/<lundi>.json`, `data/sante/journal/`, `data/sante/profil.md` et les URL de fichiers FIT produites par les adaptateurs. La sélection des données est `contrats/publication-v1.json`, jamais un accès direct aux dossiers privés.

- `node scripts/construire-site.cjs` produit `_site/` sans modifier les domaines.
- `MON_RYTHME_WEB=0 node scripts/construire-site.cjs` désactive l'extension.
- `MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs` produit une projection volontairement restreinte, sans ressenti, profil ou fichier FIT public.

Le HTML est indépendant des formats source : il ne reçoit que les URL publiques et les champs du contrat de lecture. Les schémas PNG et les règles de navigation appartiennent à l'add-on.
