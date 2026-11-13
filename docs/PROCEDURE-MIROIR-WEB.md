# Mon Rythme — procédure de mise à jour et de publication

## Une source métier, des projections filtrées

Les seuls faits canoniques se trouvent dans les quatre domaines `domaines/*/donnees/`. `adaptateurs/projections/` produit les sorties autorisées par `contrats/publication-v1.json`, sans recopier les journaux Coaching ni les rapports Santé dans le site. Le dépôt et la publication standard restent publics.

**Un commit GitHub ou un build local réussi ne suffit pas à prouver que la publication est visible.**

## Procédure de livraison

1. Lire le `main` courant et les données pertinentes. Appliquer uniquement les faits, demandes et décisions confirmés : Planification pour le prévu, Activités pour le réalisé, Santé pour les ressentis/rapports et Coaching pour les objectifs/stratégie. Ne pas créer un diagnostic ni une activité par déduction.
2. Examiner les changements et leurs identifiants, regrouper si possible les fichiers d'une même demande dans une livraison cohérente, et ne pas effacer de source métier.
3. Exécuter les contrôles adaptés :
   ```sh
   node scripts/verifier-site.cjs
   node scripts/verifier-changements.cjs
   node maturation/architecture/verifier-portabilite.cjs
   node maturation/architecture/verifier-frontieres.cjs
   node scripts/construire-site.cjs
   node scripts/verifier-miroir-web.cjs
   node maturation/architecture/verifier-publication.cjs

   MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs
   node maturation/architecture/verifier-publication-prive.cjs
   ```
   Reconstruire la sortie standard avant une vérification de publication standard si nécessaire.
4. Contrôler la **fidélité des projections** : calendrier depuis Planification/Activités ; comptes de Santé depuis les faits confirmés ; orientation Coaching filtrée ; équipements disponibles uniquement. Lorsque le rendu est correct, ne pas modifier les pages.
5. Après un push ou une fusion qui déclenche `.github/workflows/publier-pages.yml`, vérifier les étapes **build**, **deploy** et **contrôle final de `buildVersion`** sur `data/index.json` au SHA concerné. Le site est à <https://hameaufl.github.io/programme-sport/>.
6. Informer le propriétaire de ce qui est enregistré, de ce qui est réellement publié et de tout contrôle non terminé. Ne jamais présenter une projection locale comme une page déjà servie.

## Activités confirmées et Santé

Pour chaque activité réellement confirmée, `domaines/activites/donnees/seances/AAAA/MM/<id>.json` doit contenir un tableau `structuresSollicitees` **non vide**, composé de libellés anatomiques raisonnables fondés sur les mouvements connus. En cas d'insuffisance d'informations, compléter l'analyse du Coach plutôt que d'inventer un diagnostic.

La page « Mon programme » présente « Séance », « Structures sollicitées » et « Sensations » suivant les champs confirmés et autorisés. Les validations du domaine et du site contrôlent l'intégrité de la projection.

Les événements Santé utilisent **exactement** le titre `### AAAA-MM-JJ — Intitulé`. Les heures ou qualificatifs complémentaires figurent dans le corps du fichier, sans modifier la séquence de date reconnue par le parseur.

## Rôles et confidentialité

Le Coach est responsable des faits et de leur restitution métier, dans la limite d'un **fragment local d'affichage**. Maturation maintient l'interface générale, les contrats, modèles, projections et workflows. Une demande isolée « Mets-toi à jour » signifie **lecture seule**, sans commit ni écriture Garmin.

`noindex` ne restreint pas l'accès à GitHub ou GitHub Pages. Ne publier que les champs explicitement autorisés ; aucune donnée privée, aucun secret et aucun identifiant de compte ne doivent être ajoutés aux projections.
