# Premier passage complet des 87 rubriques restantes — aucune certification de clauses

**13 novembre 2026. Référence historique fixe :** `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`.
**Source structurée :** [REVUE-87-RUBRIQUES-RESTANTES.json](REVUE-87-RUBRIQUES-RESTANTES.json). Les titres et bornes des rubriques H2 à H4 sont vérifiés sur le Git historique par `verifier-161-rubriques.cjs`. Cette revue **ne prouve aucune conformité sémantique exhaustive**, aucun visa, aucune suppression autorisée ni aucune activation d'agent.

| Source | Rubriques | V2 plausibles à contrôler | Mixtes | Anciennes V1 remplacées | États datés |
| --- | ---: | ---: | ---: | ---: | ---: |
| `AGENTS.md` | 53 | 28 | 17 | 5 | 3 |
| `docs/CONTRAT-CONTINUITE-COACH.md` | 14 | 12 | 2 | 0 | 0 |
| `docs/PROCEDURE-MIROIR-WEB.md` | 5 | 5 | 0 | 0 | 0 |
| `adaptateurs/garmin/MCP.md` | 11 | 5 | 5 | 0 | 1 |
| `contrats/DEPENDANCES.md` | 4 | 4 | 0 | 0 | 0 |
| **Sous-total nouvellement classé** | **87** | **54** | **24** | **5** | **4** |

Les **74 rubriques** de `docs/REPRISE.md`, `docs/ROLES.md` et `docs/COACH-MODE-OPERATOIRE.md` avaient déjà une première qualification : les **161 rubriques du corpus historique sont maintenant classées une seule fois**. Ce décompte est **une couverture de l'inventaire, pas une couverture des obligations ni des sous-clauses**.

## Points relevés par dossier

### AGENTS : règles actuelles mêlées à cinq anciennes procédures
- **AGN-26 et AGN-33 à AGN-35 :** ancienne production locale de fichiers FIT, déclencheurs automatiques et chemins `personnel/`. Les principes utiles doivent migrer dans les sources V2 ; **aucune commande FIT historique ne doit redevenir exécutable**.
- **AGN-50 :** séparation monolithique dans `personnel/programme.js`, remplacée par les quatre domaines ; la consigne de non-duplication est toujours pertinente mais doit être prouvée dans les contrats actifs, sans restaurer le monolithe.
- **AGN-06, AGN-10 et AGN-27 :** états datés successifs d'un Renfo ou de sa programmation. Ils gardent une valeur de preuve, pas celle d'un plan courant à recréer.
- **AGN-03 à AGN-05 :** premières règles de nommage et rendu V2 mêlées à des opérations Garmin destructives historiques. **Ne pas convertir l'exception conditionnelle d'une séance ancienne en permission générale**.
- **AGN-29, AGN-32, AGN-44, AGN-49, AGN-51 à AGN-53 :** aides PNG, compatibilité d'anciens caches, limites Coach/Web et index de reprise à séparer de leurs chemins V1. Toute obligation pédagogique ou de conservation doit être maintenue dans un emplacement V2 vérifié.
- **AGN-38, AGN-40 à AGN-46 :** lecture seule et règles de présentation à examiner contre les tests existants ; `noindex` reste une instruction d'indexation, **pas une protection de confidentialité**.

### Continuité Coach : fidélité de la mémoire, pas reproduction des chemins dépassés
Les quatorze rubriques relèvent surtout de la conservation des faits et de la continuité LLM : provenance, incertitude, objectifs, stratégie, quatre domaines et publication fidèle. **CON-06** conserve une formulation dépassée (« nommage reste à définir ») tandis que **CON-13** renvoie à un ancien `personnel/README.md`. Corriger les renvois sans retirer les exigences de finesse et de non-perte.

### Miroir Web : 5 rubriques de contrôle
La procédure Web précise les projections à liste blanche, les validations après un retour métier, les `structuresSollicitees` et le contrôle effectif de déploiement. L'erreur de format d'événement Santé est datée mais demeure une explication de validateur : **elle n'est pas une autorisation d'inventer une observation médicale**.

### Garmin MCP : 11 rubriques, plusieurs priorités contradictoires
Les règles de nom final, d'en-tête Web et de prudence avant toute écriture sont plausiblement applicables. Les **MCP-03, MCP-04, MCP-07, MCP-08 et MCP-11** mélangent des anciennes valeurs, des conditions d'action ou des conventions non synchronisées avec les premiers paragraphes. Le récit de l'ancien upload (**MCP-06**) est un retour d'expérience, **pas un état distant actuel**. Aucun changement de bibliothèque n'a été demandé.

### Contrats de dépendances : 4 rubriques
Frontières de domaine, flux permis, publication filtrée, politique de confidentialité. Ces clauses doivent être confrontées aux ports, schémas, appels de build et cas de refus ; la qualification par titre ne vaut pas démonstration d'exécution.

## Travaux non achevés

- Revoir **les clauses individuelles** de chaque source, dont les sections mixtes et les exceptions ; la CI garantit désormais la structure historique, pas l'interprétation.
- Poursuivre les **8 INC ouvertes**, particulièrement INC-005 (suppression Garmin), INC-007 (banque PNG/projections) et INC-008 (essai lecture seule / vraie demande d'écriture).
- Reprendre **les 26 liens de provenance**, notamment les candidats issus d'anciennes rubriques (AGN-32/AGN-50) et REF-06 ; **aucune correction définitive de matrice**.
- Préparer des mini-lots de propositions, avec diff, preuve de non-perte et arbitrages ciblés. **Ne modifier ni `AGENTS.md` ni les règles de production pour les activer sans approbation.**

**État à cette revue :** `main` `e28b8ca` après PR #10, PR #9 expérimentale toujours brouillon. Aucun fichier métier, archive, compte Garmin ou site n'est modifié par ce classement.
