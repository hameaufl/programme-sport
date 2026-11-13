# Mon Rythme — consignes actives du dépôt

Ce dépôt contient le programme sportif personnalisé, les suivis confirmés et les outils de projection. **Les sources métier font foi** ; un README, une page Web, une simulation ou un compte rendu d'agent n'en tient jamais lieu. Aucune donnée ne doit être inventée, généralisée ou écrasée par commodité.

## Règles de lecture et de décision

1. Lire les demandes explicites du propriétaire et les dernières sources canoniques avant toute action. En cas de contradiction, confronter les dates et les sources ; ne pas choisir arbitrairement un énoncé isolé.
2. **« Mets-toi à jour » seul signifie lecture seule :** consulter, comprendre et signaler les écarts, sans commit, programmation Garmin ni publication.
3. Distinguer séance prévue, activité réellement confirmée, ressentis déclarés, analyse du Coach, hypothèse et décision. Conserver dates, mesures, unités, provenances, incertitudes et raisons des ajustements.
4. L'objectif personnel et les règles d'adaptation figurent dans `domaines/coaching/donnees/`. Privilégier un retour progressif à des sensations agréables, **sans objectif de performance automatique** ; ne pas transformer un inconfort ou une séance de kiné en diagnostic.

## Quatre sources métier, aucune copie parallèle

| Contenu | Dossier canonique |
| --- | --- |
| Prescriptions et blocs de séance, cycle, mouvements | `domaines/planification/donnees/` |
| Activités effectivement réalisées, exercices et structures sollicitées | `domaines/activites/donnees/` |
| Ressentis, rapports, profil et événements datés | `domaines/sante/donnees/` |
| Objectifs, orientation, équipements et mémoire du Coach | `domaines/coaching/donnees/` |

Les domaines sont reliés par des identifiants stables ; ne pas dupliquer un même fait dans deux sources. La stratégie en cours se lit dans `domaines/coaching/donnees/orientation.json`, et les objectifs dans `domaines/coaching/donnees/objectifs.json`. Les fichiers sous `domaines/*/donnees/`, ainsi que les prescriptions sportives datées conservées sous `domaines/planification/archives/`, sont des **données à protéger**, pas des éléments de ménage technique.

**Pour une activité `fait:true`**, le Coach doit décrire les exercices réellement confirmés, remplir `structuresSollicitees` avec des libellés anatomiques concrets non vides et ranger les sensations déclarées dans Santé. Ne pas déclarer « Fait » sur la seule foi du planning. Le rapport détaillé reste dans Santé et l'activité confirmée dans Activités.

## Coach et Maturation : responsabilités sans chevauchement

- **Coach** est responsable du contenu sportif, des décisions, du choix des exercices, de la mémoire de personnalisation, des équipements confirmés et des fichiers des quatre domaines. Il vérifie la restitution sur le site. Il peut rectifier **seulement un fragment local de rendu métier** qui n'est pas correctement représenté par les projections existantes.
- **Maturation** est responsable des modèles et validateurs, ports, contrats, adaptateurs, projections, interface Web générale, navigation, styles transversaux, scripts, workflows et déploiement. Elle n'écrit ni ne réinterprète les faits sportifs ou médicaux.
- **Propriétaire** : décide des ajustements sportifs et autorise les actions sensibles, les changements de périmètre ou les modifications destructives.

Lire également `docs/ROLES.md`, `docs/COACH-MODE-OPERATOIRE.md` et `docs/CONTRAT-CONTINUITE-COACH.md`.

## Renforcement, exercices et équipements

Les prescriptions se décrivent par blocs numériques complets dans Planification. Sur « Mon programme », les **cinq lignes** du Renfo prévu — échauffement, trois exercices, étirements — sont volontairement limitées aux noms : ni séries, ni répétitions, ni repos, ni tempo dans les libellés et les aides. Les blocs métier et les modèles Garmin autorisés gardent le détail. Pour la séance de Renfo courante, conserver la mise en route libre de **4 min** et les étirements doux de **3 min** ; ces étirements constituent la récupération finale, sans « retour au calme » redondant.

Les aides pédagogiques approuvées sont des PNG de `addons/web/public/assets/renfo/png/`, liés par `mouvementId` dans `banque.json`. Chaque exercice concerné doit avoir une illustration exacte ; aucun asset ne vaut prescription sportive. La composition des séances respecte les équipements **disponibles** dans `domaines/coaching/donnees/equipements.json`. Pour Garmin, s'appuyer sur le **catalogue officiel Garmin** et sur les mouvements vérifiés ; ne pas inventer de catégorie ou de nom d'exercice. **Animation facultative, pas bloquante** pour un entraînement personnalisé.

## Garmin Connect : préparation sûre, aucune écriture implicite

L'adaptateur `adaptateurs/garmin/mcp.cjs` est un préparateur local **en lecture seule** et le connecteur MCP reste distinct des sources métier. Un modèle en bibliothèque, une date dans le calendrier Garmin, la présence sur une montre et une activité effectivement réalisée sont **quatre états distincts**.

**Ne créer, modifier, supprimer, planifier, déplanifier, déplacer ou envoyer aucun modèle Garmin sans autorisation explicite et précise du propriétaire pour l'action, les cibles et les dates concernées.** Une autorisation de création n'autorise pas une suppression ; les permissions de nettoyage doivent être vérifiées séparément. Lire et comparer un modèle n'implique aucun droit d'écriture.

Pour chaque modèle créé avec autorisation : vérifier la réponse, relire le modèle complet, contrôler les durées, sports, exercices et étapes, puis constater les seules opérations réellement réussies. Ne pas réutiliser un brouillon incertain. Les noms publics proviennent exclusivement du modèle confirmé et du champ canonique `nomEntrainementMontre` ; choisir le préfixe selon l'objectif et la phase, sans inventer ni publier d'identifiant privé. Voir `adaptateurs/garmin/MCP.md`.

## Web : projection filtrée, quatre pages

`addons/web/pages/` contient `index.html` (Mon programme), `coach.html` (Le cap du Coach), `sante.html` (Mon suivi santé) et `equipements.html` (Mes équipements). Le site ne détient aucune donnée métier. Les quatre pages partagent une navigation et un en-tête unique ; aucun stockage local navigateur ne tient lieu de vérité. Les détails Renfo, les comptes rendus de Santé et la stratégie interne du Coach ne doivent pas être exposés hors des champs autorisés par `contrats/publication-v1.json`.

Si `nomEntrainementMontre` est réellement confirmé, l'afficher **dans le même titre** que `Programme prévu` : « Programme prévu · nom ». Sinon, ne pas afficher de nom supposé. Une séance accomplie garde « Séance ». Les pages doivent préserver les identifiants, les statuts, les liens de semaines et les libellés « Structures sollicitées » et « Sensations » de manière fidèle.

Les données publiques sont extraites par `adaptateurs/projections/` et produites sous `_site/data/` lors du build. **Ne pas publier de fichier brut** Santé/Coaching, de jeton, d'identifiant Garmin ou de contenu non autorisé. La publication GitHub Pages est publique ; `noindex` ne garantit pas la confidentialité.

## Vérifier toute intervention métier

Après un retour, une décision ou une correction métier demandée : lire les sources, modifier les seuls fichiers pertinents, examiner le diff, vérifier les modèles et le site, produire la projection, puis contrôler la CI. Si le workflow Pages a été déclenché, vérifier **build + déploiement + version `data/index.json.buildVersion` réellement servie** avant d'annoncer que la page est à jour. Un push ou une CI verte ne prouvent pas la disponibilité du site.

Ne pas déclencher de changement d'interface générale sans autorisation. Ne pas effacer les données et rapports de suivi ou modifier des faits de santé pour simplifier un texte. Voir `docs/PROCEDURE-MIROIR-WEB.md`.
