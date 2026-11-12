# Ports de lecture par domaine

Les dépendances sont injectables dans `adaptateurs/projections/lecture.cjs` :

- `planification.cycle()`, `planification.mouvements()`, `planification.seances()`, `planification.parId(id)`;
- `activites.seances()`, `activites.estRealisee(id)`;
- `sante.observations()`, `sante.rapports()`, `sante.evenements()`, `sante.profil()`;
- `coaching.objectifs()`, `coaching.equipements()` (matériel confirmé, non publié), `coaching.orientation()` (synthèse métier des intentions et points de vigilance).
- `medias.images(catalogue)` est un port d’illustration facultatif. La gestion des entraînements connectés relève d’un adaptateur distinct, jamais des vues Web.

La première implémentation de ces ports se trouve sous `adaptateurs/fichiers/depots.cjs`; un remplacement du stockage Santé exige **seulement** une nouvelle implémentation de `sante`, pas de changement dans Planification, Coaching ou l'add-on Web.

L'interface affiche un **contrat de lecture versionné**, généré après jointure explicite par `seanceId` et filtrage avec `contrats/publication-v1.json`. Le domaine Santé n'importe jamais une définition de page et le domaine Planification n'importe jamais de format ou identifiant de synchronisation externe.

**Projection de stratégie du Coach :** `adaptateurs/projections/coaching.cjs` lit exclusivement les ports Coaching, valide les modèles du domaine, construit un objet nouveau contenant uniquement l'objectif personnel, le cap, les tendances conditionnelles et les vigilances autorisées. Les références aux documents métier et les notes détaillées n'entrent jamais dans le JSON Web. Aucune dépendance inverse du domaine vers le site.
