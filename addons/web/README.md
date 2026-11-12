# Add-on Web — présentation remplaçable

L'application Mon Rythme présente le calendrier, les séances, le suivi et les aides PNG, mais ne crée, ne stocke et ne distribue **aucun fichier d'entraînement pour une montre**. Les prescriptions et faits ne sont jamais canoniques dans ce dossier.

- Pages : `pages/index.html`, `pages/sante.html` ; ressources : `public/`.
- Données : `data/index.json`, `data/semaines/<lundi>.json`, `data/sante/journal/`, `data/sante/profil.md`.
- Publication filtrée par `contrats/publication-v1.json` ou `contrats/publication-prive-v1.json`.
- Construction : `node scripts/construire-site.cjs`. `MON_RYTHME_WEB=0` désactive l'add-on et `MON_RYTHME_POLITIQUE=prive` choisit une projection restreinte.

Les connexions et synchronisations externes restent indépendantes de l'application. Aucun lien de téléchargement de programme, référence de service tiers ni binaire n'est exposé.
