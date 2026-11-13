# Contexte technique actuel — Mon Rythme

## Architecture et sources de vérité

Mon Rythme se compose de quatre domaines indépendants : `domaines/planification/` (prescriptions), `domaines/activites/` (réalisations confirmées), `domaines/sante/` (suivi déclaré et rapports) et `domaines/coaching/` (orientation, objectifs, équipement et mémoire). Les faits sont écrits dans `donnees/` et reliés par des identifiants stables.

Les ports `adaptateurs/fichiers/` fournissent l'accès aux données ; `adaptateurs/projections/` compose des vues filtrées. Le Web est un **consommateur optionnel**, pas un référentiel métier. Les frontières et permissions sont spécifiées par `contrats/DEPENDANCES.md`, `contrats/PORTS.md` et les listes blanches de publication.

## Site et publication

Le site statique de `addons/web/` contient quatre pages : `index.html`, `coach.html`, `sante.html` et `equipements.html`. Les vues `_site/data/` sont **générées au build**, et la santé publique n'expose que les champs expressément autorisés. Les rapports et informations internes de Santé/Coaching ne sont jamais copiés comme fichiers Web.

Le titre « Programme prévu » peut inclure `nomEntrainementMontre` lorsque celui-ci correspond à un modèle confirmé ; une activité effectuée est intitulée « Séance ». Le Renfo public présente des étapes allégées, tandis que les blocs numériques restent intégralement dans Planification. Les aides PNG proviennent de la banque `mouvementId`.

Le navigateur n'est pas une source de données : pas de `localStorage` métier, de formulaire de suivi ni d'écriture dans les domaines à partir de l'interface. Aucun changement de navigation ou d'aspect global n'est réalisé sans autorisation. Les scripts construisent le site ; le workflow GitHub Pages publie depuis `main` pour les chemins surveillés. Pour constater une livraison, vérifier build, déploiement et valeur `data/index.json.buildVersion` réellement servie.

## Garmin Connect

L'adaptateur Garmin MCP prépare les modèles à partir des blocs de Planification en **lecture seule par défaut**. Bibliothèque, calendrier, appareil et activité accomplie ne sont pas synonymes. Toute création, modification, suppression, programmation, déplacement ou transmission à une montre exige une demande explicite couvrant **l'action et sa cible exacte**. Après une écriture autorisée, relire le modèle et confirmer le résultat observable.

Les noms de modèle confirmés proviennent de la source Planification. Les identifiants et détails privés Garmin ne sont jamais publiés sur le site. Le Web n'émet pas de fichier d'entraînement. Pour la séquence détaillée et les validations, voir `adaptateurs/garmin/MCP.md`.

## Rôles et continuité

Le **Coach** conserve les faits et décisions métier, avec provenance et nuances, et vérifie leur projection. Son droit d'intervention Web est limité au **fragment de rendu métier local**. **Maturation** maintient architecture, adaptateurs, schémas, interface générale, scripts, CI et déploiement, sans inventer ou réécrire le contenu sportif.

« Mets-toi à jour » seul est une demande de **lecture seule**. Ne pas confondre une décision sportive, un commit Git, une publication et une écriture Garmin. Protéger toutes les données et comptes rendus du Coach, même lorsqu'ils ne sont pas affichés publiquement.

## Confidentialité

Le dépôt et la publication GitHub Pages sont publics. Les fichiers source, les commits accessibles et les copies d'une page publiée peuvent contenir des données sensibles ; `noindex` ne constitue aucune protection d'accès. Ne jamais publier de secret ni introduire un nouveau champ sensible dans les projections sans décision sur sa diffusion. Tout changement d'hébergement ou de contrôle d'accès exige une démarche distincte.
