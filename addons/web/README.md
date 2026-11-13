# Mon Rythme — application Web statique

L'add-on `addons/web/` affiche le programme, les réalisations, une synthèse Santé, l'orientation du Coach et les équipements publics. Les données sont produites par le build sous `_site/data/` et ne sont **jamais canoniques** dans ce dossier.

## Pages

- `pages/index.html` — Mon programme : calendrier hebdomadaire, séances prévues et faits confirmés.
- `pages/coach.html` — Le cap du Coach : orientation projetée depuis Coaching, sans journal interne.
- `pages/sante.html` — Mon suivi santé : compteurs, résultats confirmés et dates/titres d'événements autorisés, sans profil clinique brut.
- `pages/equipements.html` — Mes équipements : matériel confirmé disponible et champs explicitement publiables.

L'en-tête et le menu de ces pages sont créés par `composants/en-tete.cjs` ; les quatre destinations sont les mêmes partout. Les séances prévues peuvent afficher leur nom Garmin confirmé **dans le titre unique « Programme prévu · nom »** ; le détail d'une activité effectuée se nomme « Séance ». Les prescriptions Renfo sont présentées avec des étapes concises et des aides PNG validées.

## Production et confidentialité

Les sorties publiques dépendent de `contrats/publication.json`, et la projection restreinte de `contrats/publication-restreinte.json`. Les listes blanches interdisent les champs non autorisés. Le mode restreint réduit les données **mais ne fournit pas d'authentification**.

```sh
node scripts/construire-site.cjs
node scripts/verifier-miroir-web.cjs
node scripts/controle/verifier-publication.cjs
```

`MON_RYTHME_WEB=0` désactive la génération du site. `MON_RYTHME_POLITIQUE=prive` construit la projection restreinte. Le déploiement GitHub Pages et le contrôle de la version réellement servie relèvent du workflow de publication.

Les sources métier ne sont jamais copiées en bloc dans le site et aucune entrée du navigateur ne modifie les domaines.
