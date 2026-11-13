# Proposition de remplacement de docs/CONTEXTE.md — état technique V2

**Brouillon pour la vague 1 d'assainissement.** Ce texte **n'a pas remplacé** `docs/CONTEXTE.md` dans `main`. Il faut vérifier les dépendances et obtenir l'accord du propriétaire pour l'application.

## État opérationnel

Le cœur métier est organisé en domaines indépendants : `domaines/planification` (prescriptions structurées), `domaines/activites` (faits confirmés), `domaines/sante` (ressentis et rapports) et `domaines/coaching` (objectifs, décisions, préférences, équipements et mémoire d'adaptation). Chaque domaine est une source unique de vérité pour son périmètre. Les connexions entre domaines utilisent des identifiants durables et des ports, pas des copies de faits ou des chemins internes.

Le Web Mon Rythme est un **add-on** sous `addons/web/` et ne possède pas de faits métier. Le build consomme exclusivement les vues produites par `adaptateurs/projections/`, filtrées par `contrats/publication-v1.json`. Les scripts et workflows sont les moyens techniques de construction et de vérification, pas une preuve suffisante de publication effective. Contrôler le déploiement et la version `data/index.json.buildVersion` réellement servie.

Garmin est intégré comme adaptateur bêta sous `adaptateurs/garmin/`. Le Coach peut préparer et comparer en lecture seule ; **aucune création, programmation, suppression, déplacement ou envoi sans autorisation explicite et ciblée**. Il n'existe aucune source d'entraînement FIT locale à générer pour la vue Web.

La responsabilité des décisions sportives et des données personnelles appartient au Coach ; l'architecture, les modèles, contrats et publication générale à Maturation. Le Coach ne touche à un rendu HTML métier local que dans les limites historiques de son exception, si les projections existantes ne suffisent pas.

L'entrée opérationnelle actuelle reste `AGENTS.md` et `docs/COACH-MODE-OPERATOIRE.md`, puis les sources canoniques et `docs/PROCEDURE-MIROIR-WEB.md`. Les prescriptions V2 remplacent les anciennes sources `personnel/` et les anciens générateurs FIT ; **aucune ancienne instruction ne doit réactiver un stockage ou une automatisation abrogés**.

**Confidentialité :** le dépôt et le site sont publics. `noindex` et l'option d'affichage restreint ne protègent pas les données déjà présentes dans les commits ni les caches. Une migration véritablement privée serait un projet distinct, à approuver.

## Adoption éventuelle
- Remplacer uniquement `docs/CONTEXTE.md` après approbation du fichier et examen de son unique lien entrant connu depuis `AGENTS.md`.
- Préserver les obligations réellement encore actives et ne pas importer des faits personnels dans une fiche technique.
- Exécuter les tests de documentation, frontières, build, confidentialité et non-perte ; ne pas déclarer le résultat « livré » sans contrôle CI après push.
