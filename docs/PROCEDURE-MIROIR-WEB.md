# Miroir Web de Mon Rythme — procédure de livraison Coach / Maturation

## Principe durable

Les domaines métier de `domaines/*/donnees/` sont la **seule source de vérité**. Mon Rythme affiche les données pertinentes à travers des projections à liste blanche, sous `adaptateurs/projections/` et `contrats/publication-v1.json`. Le site ne reçoit jamais une copie libre des notes de Coaching ni des rapports de Santé. Le dépôt et le site standard sont publics ; une information intégrale dans Git n'est pas nécessairement autorisée dans la page.

**Un commit GitHub ne prouve pas une publication réussie.** La réussite de GitHub Actions et le contrôle de version de la page publiée sont deux étapes distinctes.

## Procédure à chaque nouveau fait métier

1. **Lire `main`, puis écrire les faits confirmés** dans Planification, Activités, Santé ou Coaching uniquement selon leur nature. Réviser `orientation.json` si l'orientation ou une vigilance change. Respecter les hypothèses et inconnues ; ne jamais créer une séance réalisée ou un diagnostic par déduction.
2. **Préparer un changement cohérent** et si possible **un seul commit** regroupant les fichiers métier, afin de n'avoir qu'une exécution de publication à vérifier. Ne pas pousser en parallèle une succession de commits pour les mêmes retours : le workflow annule volontairement les exécutions précédentes.
3. **Vérifier la compatibilité des sources** avant commit, puis lancer :
   - `node scripts/verifier-site.cjs`
   - `node scripts/verifier-changements.cjs`
   - `node scripts/construire-site.cjs`
   - `node scripts/verifier-miroir-web.cjs`
   - `node maturation/architecture/verifier-publication.cjs`
   - `MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs` suivi de `node maturation/architecture/verifier-publication-prive.cjs` pour l'absence de fuite.
4. **Contrôler la correspondance vue/source :** calendrier depuis Planification et Activités ; compteurs et repères datés depuis Santé ; « Le cap du Coach » depuis `orientation.json` filtré ; équipement depuis `equipements.json` filtré. Si le rendu actuel consomme déjà correctement les projections, **ne pas modifier de HTML**.
5. **Pousser et contrôler GitHub Actions** « Publier Mon Rythme » pour le SHA publié. Vérifier **build = success**, **deploy = success** et le contrôle final de version. Le workflow compare la propriété `buildVersion` servie sur `data/index.json` au préfixe du SHA de la publication. Les pages sont disponibles à <https://hameaufl.github.io/programme-sport/>.
6. **Informer clairement :** « données enregistrées et site publié » seulement si la publication est confirmée ; sinon « données enregistrées, publication en échec / en cours / non confirmée », avec cause et suite à donner. Ne jamais confondre statut du dépôt et affichage public.

## Contrôle systématique des structures sollicitées

À **chaque activité sportive réellement confirmée**, le Coach doit remplir dans `domaines/activites/donnees/seances/AAAA/MM/<id>.json` le tableau non vide `structuresSollicitees`, même pour un test sur tapis, une séance de kiné ou une activité hors cycle. Le champ vient de l'analyse des mouvements déclarés, pas d'une donnée clinique mesurée. Pour les gestes inconnus, une mention explicite « À préciser par le Coach » vaut mieux qu'une liste anatomique inventée. Le détail « Mon programme » doit afficher **Séance → Structures sollicitées → Sensations** avec les champs projetés.

Les validations `domaines/activites/modele.cjs` et `scripts/verifier-site.cjs` rendent cette omission bloquante **avant** déploiement et comparent la projection aux activités canoniques. Toute écriture métier inclut aussi le contrôle de publication et de version servie. Checklist complète : `docs/COACH-MODE-OPERATOIRE.md`.

## Erreur évitée le 12 novembre 2026

La ligne de titre d'un événement Santé doit commencer **exactement** par `### AAAA-MM-JJ — Titre`. Un titre tel que `### 2026-11-12 au soir — …` est invalide : le parseur attend le tiret immédiatement après la date et le build s'arrête avant la génération du site. Les nuances horaires se notent **dans le contenu de l'événement** et ne modifient pas le format canonique.

## Partage des rôles

Le **Coach** maintient les données, la stratégie et, si indispensable, les **seuls fragments locaux d'affichage métier** autorisés par `AGENTS.md` et `docs/ROLES.md`. **Maturation** maintient les modèles, adaptateurs, projections, politiques de publication, scripts, workflows et architecture visuelle générale. La demande explicite du propriétaire peut solliciter les deux rôles, en conservant leurs responsabilités distinctes.

La commande isolée « Mets-toi à jour » reste en lecture seule. Une demande d'actualisation du site explicite autorise la livraison de ce qui a été demandé. L'absence d'ordre Garmin précis interdit toujours toute écriture Garmin.
