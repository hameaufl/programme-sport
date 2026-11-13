# Checklist de livraison Web — rappel des obligations historiques pour B2

**Statut : aide à la vérification, non une nouvelle règle d'agent.** Ce document ne remplace pas `AGENTS.md`, `docs/ROLES.md`, `docs/COACH-MODE-OPERATOIRE.md`, `docs/CONTRAT-CONTINUITE-COACH.md` ou `docs/PROCEDURE-MIROIR-WEB.md`. Le bon chemin dépend de l'action **effectivement demandée** ; une simple simulation ou « Mets-toi à jour » reste strictement en lecture seule.

### 1. Source, historique et pertinence (Coach)
- [ ] Lire la dernière source de domaine canonique : `domaines/{planification,activites,sante,coaching}/donnees/`, ainsi que les décisions/sources historiques pertinentes.
- [ ] Distinguer faits confirmés, corrections, hypothèses, sensations et intentions. Ne pas inventer une activité faite ou une contrainte connue.
- [ ] Préserver l'identifiant, les liens, les corrections, la provenance, les nuances et le contexte nécessaire aux décisions futures ; ne pas effacer un fait historique ni créer plusieurs copies canoniques concurrentes.
- [ ] Pour une activité confirmée, conserver `structuresSollicitees` conformément à la procédure V2 ; ne pas présenter une hypothèse anatomique comme un diagnostic.

### 2. Rôles et frontières (Coach / Maturation)
- [ ] **Coach** : seules sources de faits sportifs et décisions, plus correction **minimale du fragment local** de rendu métier déjà autorisée dans `addons/web/pages/`, uniquement si nécessaire.
- [ ] **Maturation** : code transverse, modèles, ports, projections, contrats, scripts, CI, navigation, styles globaux et publication technique.
- [ ] Ne jamais recopier les données sensibles dans le HTML, ni élargir les champs du contrat public pour faire afficher un fait privé.
- [ ] Si la projection et le rendu existants suffisent, **ne pas modifier le HTML**.

### 3. Prévalidation et preuve de rendu
- [ ] Examiner le diff des données autorisées et vérifier la compatibilité modèles/projections et le rendu local ciblé.
- [ ] Suivre les validations historiques pertinentes, notamment `node scripts/verifier-site.cjs`, `node scripts/verifier-changements.cjs`, `node scripts/construire-site.cjs`, `node scripts/verifier-miroir-web.cjs` et `node maturation/architecture/verifier-publication.cjs`.
- [ ] Pour les politiques de confidentialité, suivre le contrôle privé documenté : `MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs` puis `node maturation/architecture/verifier-publication-prive.cjs`.
- [ ] Noter les résultats **réellement obtenus** et les vérifications non exécutées : ne jamais transcrire « tests OK » à partir d'une simple intention.

### 4. Déploiement et preuve de version servie
- [ ] Si une publication a été explicitement demandée et déclenchée, vérifier le SHA réellement poussé et l'exécution GitHub Actions **« Publier Mon Rythme »** correspondante.
- [ ] Confirmer indépendamment **build = success** et **deploy = success** sur cette exécution.
- [ ] Consulter l'URL réellement servie et la donnée **`data/index.json.buildVersion`**, puis vérifier la correspondance avec la version attendue de ce déploiement selon la procédure de publication.
- [ ] Si une preuve manque, rendre **« données enregistrées, publication non confirmée »** ou l'état réel correspondant ; ne jamais dire simplement « publié » en déduisant le résultat d'un commit ou d'une capture locale.

### 5. Restitution courte mais auditable
- [ ] Répondre d'abord par le **résultat véritable**, puis la **preuve minimale déterminante** et la **limite éventuelle**.
- [ ] Conserver dans les livrables techniques les détails des vérifications, sans encombrer le propriétaire quand une synthèse suffit.
- [ ] Contrôle qualité obligatoire selon les règles effectivement actives ; ne pas revendiquer d'audit indépendant par un Gardien simulé ni une validation d'activation B2.

**Aucun élément de cette checklist n'autorise une publication, un commit métier, un appel Garmin ou une fusion qui n'aurait pas été demandée/permise autrement.**
