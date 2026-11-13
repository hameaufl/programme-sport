# Contexte technique — Maturation (architecture V2)

## Sources de vérité

Mon Rythme est un site statique francophone publié par GitHub Actions / GitHub Pages depuis `main`. **Le site n'est pas une source métier.** Les données canoniques sont séparées en quatre domaines :
- `domaines/planification/donnees/` : séances prévues, blocs structurés, mouvements et cycle ;
- `domaines/activites/donnees/` : séances effectivement réalisées et confirmées ;
- `domaines/sante/donnees/` : observations, rapports et événements de santé ;
- `domaines/coaching/donnees/` : objectifs, décisions, préférences, équipements et mémoire de personnalisation.

Les identifiants durables relient les domaines sans mélanger prescription, réalisation et santé. Les ports de `adaptateurs/fichiers/` lisent ces sources ; les projections de `adaptateurs/projections/` ne font qu'en restituer les champs autorisés. Références techniques : `contrats/DEPENDANCES.md`, `contrats/PORTS.md` et les politiques `contrats/publication-v1.json` / `contrats/publication-prive-v1.json`.

## Web : projection remplaçable

L'add-on `addons/web/` contient les pages `index.html` (programme), `sante.html` (suivi synthétique), `coach.html` (orientation) et `equipements.html` (matériel disponible), avec leurs médias. Le calendrier conserve la navigation hebdomadaire et ne charge que les données utiles à la période consultée. Le suivi Santé public ne publie pas le profil médical brut ni le texte intégral des événements.

Les vues `data/index.json`, `data/semaines/<lundi>.json`, `data/sante/journal/` et les projections Coaching sont **générées dans `_site/`**, jamais modifiées comme sources canoniques. Les rendus doivent rester fidèles aux données filtrées. Une séance n'est « Fait » que si sa réalisation est confirmée (`fait: true`) ; le détail de l'activité restitue « Séance », « Structures sollicitées » et « Sensations », selon les champs disponibles et les validateurs en vigueur.

Pas de saisie métier par le navigateur, de `localStorage` servant de vérité métier, ni de nouvel élément visuel sans demande ou approbation. Les anciens exports de compatibilité Web, s'ils existent, ne sont pas des sources Coach et ne justifient pas de réactiver un mode ancien. Le Web peut être désactivé sans supprimer le cœur : `MON_RYTHME_WEB=0`.

## Garmin : MCP bêta, aucune fabrication FIT locale

`adaptateurs/garmin/` fournit l'intégration Garmin MCP et les contrôles associés. Le Coach peut préparer et comparer des modèles en lecture seule. **Aucune création, programmation à une date, modification, suppression ni transmission à une montre n'est permise sans demande explicite couvrant l'opération et les dates ou cibles exactes.** Un modèle en bibliothèque n'est ni une séance effectuée ni une séance programmée. Un retour d'upload positif ne dispense jamais de relire le modèle.

La source de prescription reste Planification ; le générateur historique de fichiers FIT locaux et les téléchargements FIT du Web ne sont pas le processus V2. Les identifiants privés ou binaires Garmin ne doivent pas entrer dans la publication. Consulter `adaptateurs/garmin/MCP.md` et `docs/COACH-MODE-OPERATOIRE.md` pour les contraintes détaillées.

## Responsabilités et continuité

- **Coach** : faits et décisions sportifs, mémoire nuancée et traçable dans les domaines, contrôle du rendu métier. Il peut seulement corriger un fragment HTML **local d'affichage métier** lorsque les projections existantes ne suffisent pas, sans toucher à l'interface générale, aux contrats, aux scripts ni à la navigation.
- **Maturation** : architecture, schémas, adaptateurs, projections, interface Web générale, tests, workflows et déploiement technique ; sans réinterpréter ni réécrire les faits du Coach.
- **Propriétaire** : autorise les actions sensibles et les changements de périmètre.

Conserver la source, les nuances, l'évolution et la justification des faits utiles à la personnalisation, sans dupliquer séances et rapports entre domaines. Pour une reprise, lire `AGENTS.md`, `docs/COACH-MODE-OPERATOIRE.md`, `docs/ROLES.md` et `docs/CONTRAT-CONTINUITE-COACH.md` selon leurs priorités en vigueur. **« Mets-toi à jour » seul signifie lecture seule : aucun commit, aucune écriture Garmin.**

## Vérification, publication et confidentialité

Avant une livraison métier ou Web, effectuer les contrôles de modèles, frontières, site, publication et non-fuite prévus par `docs/PROCEDURE-MIROIR-WEB.md`. Un push ou une CI verte ne prouve pas à lui seul que le site est publié : vérifier le build, le déploiement et la valeur `data/index.json.buildVersion` réellement servie. Les workflows existants de publication sur `main` sont la référence ; une branche documentaire isolée ne constitue pas une mise en production.

**Dépôt et site publics.** `noindex` et une projection restreinte ne rendent pas privées des données déjà inscrites dans Git, dans des caches ou dans de précédentes publications. Ne publier ni secrets, identifiants de compte, données personnelles non autorisées ni notes brutes de Santé/Coaching. Une migration vers un stockage privé et un traitement de l'historique public constituent des projets distincts, soumis à décision explicite.

## Documentation historique

Les anciens chemins `personnel/`, les anciennes sources santé et le générateur local `scripts/generer-garmin.cjs` décrivent la V1 : **ils ne sont pas des destinations d'écriture ou des automatisations actives**. Les décisions et contraintes toujours applicables doivent être conservées dans leurs sources V2 avant tout retrait d'archives. Ne pas effacer des faits ou une preuve historique simplement parce qu'une procédure V1 est dépassée.
