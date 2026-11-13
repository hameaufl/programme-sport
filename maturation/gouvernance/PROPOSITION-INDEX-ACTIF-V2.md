# Projet d'index opérationnel V2 — proposition non activée

**Statut : non normatif, sur branche expérimentale uniquement.** Cette fiche est une ébauche de consolidation pour permettre une future lecture « current-only ». Elle ne remplace ni `AGENTS.md`, ni `docs/COACH-MODE-OPERATOIRE.md`, ni les décisions du propriétaire. Références vérifiées sur `main` `e28b8cac98d20b78fd4835392b53afeeed18c234` et historique `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. La classification initiale des 161 rubriques n'est **pas** une certification clause par clause.

## Sources et autorité
- Quatre sources canoniques séparées : `domaines/planification/donnees/` (prévu), `domaines/activites/donnees/` (confirmé), `domaines/sante/donnees/` (ressentis et événements), `domaines/coaching/donnees/` (objectifs, orientation, équipements, décisions et mémoire). Les projections ne sont pas des sources de vérité.
- Le Coach détient les décisions et faits métier avec date, provenance, nuances et incertitudes. Maturation détient modèles, ports, contrats, architecture de présentation générale, CI et publication. Le Coach n'a que l'exception **de fragment local de rendu métier** déjà définie dans `docs/ROLES.md` ; jamais une page, navigation ou contrat entier.
- « Mets-toi à jour » isolé : lecture seule, zéro commit, zéro publication et zéro écriture Garmin. Une simulation se déroule sans aucune écriture métier ou distante.

## Garmin et rendu Web
- Le nom d'un modèle Garmin, **uniquement s'il a été vérifié**, provient du champ canonique `nomEntrainementMontre`. Le préfixe suit l'objectif actif et la phase. Il est affiché dans le **même titre** que « Programme prévu » ; si le modèle n'est pas confirmé, pas de nom inventé ; activité réalisée = « Séance ».
- Création, re-création, calendrier, déplacement, suppression et envoi à la montre sont des actions distinctes et **jamais exécutées par simple mise à jour GitHub**. En l'absence d'un ordre explicite et ciblé du propriétaire, lecture/comparaison uniquement ; **INC-005** interdit de supposer une exception générale de nettoyage.
- Écriture Git métier ≠ publication Pages ; vérifier données, projections filtrées, tests, build, déploiement et `data/index.json.buildVersion` réellement servi.
- Pas de FIT local ni d'écriture dans `personnel/` ; pas de dépôt de notes brutes Santé/Coaching dans l'add-on Web ; ne pas confondre `noindex` et protection de confidentialité.

## Continuité et valeurs pédagogiques
- Ne jamais fusionner un plan avec une activité réellement accomplie ; `structuresSollicitees` doit être renseigné pour une activité confirmée, sans inventer de diagnostic.
- Préserver les blocs complets et volumes de Planification, la présentation Web Renfo épurée, la banque PNG V2 liée aux `mouvementId`, le refus des médias absents et les préférences explicites concernant le matériel.
- Conserver les archives et décisions datées comme **preuves**, non comme des instructions « dernière priorité » intemporelles ; jamais de reprogrammation d'un ancien brouillon sans demande explicite.

## Réserves avant toute adoption
Les **8 INC** ne sont pas closes ; les 26 attributions de provenance requièrent encore une analyse de pertinence clause par clause ; **REF-06** pourrait être une proposition nouvelle ; la suppression d'intermédiaires Garmin reste à arbitrer ; l'indépendance du Gardien n'est pas acquise. Ne supprimer ni résumer une obligation utile du protocole Coach lors d'une future consolidation sans preuve de conservation vérifiée.

**Prochaine transformation éventuelle :** une fiche active unique et un registre des exceptions validés séparément par le propriétaire, avec test de non-perte des clauses. Cette proposition **n'autorise pas** leur déploiement.
