# Contrat de continuité du Coach — mémoire métier intégrale

**Règle prioritaire au 12 novembre 2026.** Le dépôt GitHub `hameaufl/programme-sport`, branche `main`, est la **mémoire métier persistante et transmissible** de la personnalisation. Aucune connaissance nécessaire à un futur programme adapté ne doit dépendre de la seule mémoire d'une conversation ou d'un agent. Cette exigence dépasse la reprise sportive et dépasse les informations affichées dans les pages web.

## 1. Ce que le Coach doit conserver

Enregistrer **toute information utile, explicite ou contextualisée, pouvant influencer directement ou indirectement le programme personnalisé**, même si elle n'entraîne aucune modification immédiate du calendrier et même si elle paraît secondaire à court terme :

- **Intentions et trajectoire** : objectifs, priorités, motivations, critères de réussite, objectifs évolutifs, compromis acceptés/refusés, horizon et raison des changements.
- **Contraintes et possibilités** : temps disponible, horaires, routine, sommeil, récupération, fatigue, conditions de vie et de travail pertinentes, déplacements, accessibilité, environnement de pratique, météo/terrain habituel, cadence souhaitée.
- **Préférences et vécu** : activités appréciées ou évitées, acceptabilité des exercices et des charges, préférences de progression, sensations, appréhensions et limites, mode de communication ou d'explication préféré, réaction aux adaptations antérieures.
- **Équipement et organisation** : chaussures/semelles, matériel, montre/Garmin, terrains, accès aux installations, échéances et disponibilités professionnelles **si pertinentes pour l'entraînement**.
- **Santé et contexte physique lié à la personnalisation** : antécédents rapportés, bilans réellement reçus, recommandations de professionnels, douleurs et déclencheurs, capacités, limitations, tolérance, récupération, historique de reprise. Ne pas inventer un diagnostic ou transformer une hypothèse en preuve.
- **Historique d'entraînement et logique du Coach** : activités prévues et réalisées, résultats, changements de plan, motifs, essais infructueux, points à surveiller, tendances, données de mesures réellement disponibles, hypothèses de travail et leur degré de confirmation.
- **Informations incomplètes et questions ouvertes** : référence d'équipement attendue, compte rendu annoncé mais non reçu, inconnues qui conditionnent un ajustement, prochaines vérifications et critères de réévaluation.

Le Coach **ne trie pas ces éléments uniquement selon ce qui est visible sur le site**. Une information pertinente pour une décision future doit subsister même si elle n'entre pas dans le résumé court d'une séance. Ne pas se limiter à la santé, aux séances, aux fichiers FIT ou aux objectifs actuels.

## 2. Où écrire, sans doublons ni réécriture globale

Le Coach est **le seul auteur des faits personnels** sous `personnel/`. Il actualise la source adaptée et conserve les liens vers celle-ci :

| Nature de l'information | Source canonique |
| --- | --- |
| Profil durable et nuances transversales influençant la personnalisation (préférences, habitudes, contraintes, motivations, contexte de vie utile, stratégies de personnalisation) | **`personnel/CONTEXTE-COACH.md`**, à créer et à maintenir par le Coach, s'il n'existe pas |
| Objectifs et paramètres de cycle structurés | `personnel/config.json` ; leur justification et évolution dans `personnel/DECISIONS.md` |
| Séance précise, prévu/réalisé, ressenti court, groupes sollicités | `personnel/seances/AAAA/MM/<id>.json` |
| Récit et nuances détaillés d'une séance | `personnel/sante/rapports/AAAA/MM/<id>.md` |
| Profil santé durable | `personnel/sante/PROFIL.md` |
| Événement de santé ou d'équipement daté, non lié à une séance | `personnel/sante/evenements/AAAA/MM/<date>-<sujet>.md` |
| Décisions longitudinales, raisons, alternatives et révisions | `personnel/DECISIONS.md` |
| Chronologie des nouveaux apports, actions, hypothèses et points en attente | `personnel/JOURNAL.md` |
| Contraintes de fichiers, modèle Garmin et liens vers les originaux | `personnel/GARMIN.md` et `personnel/pieces-jointes/` |

**Ne pas créer plusieurs vérités concurrentes.** Une synthèse durable peut **pointer vers** une séance, un rapport, une décision ou une pièce jointe ; elle n'en recopie pas les données chiffrées ou médicales. Les résumés doivent conserver l'accès aux détails et ne jamais les remplacer. `personnel/CONTEXTE-COACH.md` est un **répertoire de connaissances transversales**, pas une copie de tous les fichiers ; le Coach le crée avec des rubriques de son choix à la première information ne disposant pas déjà d'une source canonique.

## 3. Niveau de finesse exigé

Pour chaque nouvelle donnée métier pertinente, conserver **autant de précision utile à une future décision** que l'agent courant en possède :

- **Contenu exact** de l'information, nuance, valeurs/unités et contexte d'apparition ; éviter une compression qui rendrait le futur arbitrage impossible.
- **Origine** (déclaration utilisateur, bilan professionnel, mesure, analyse du Coach), **date/période** et **statut** : confirmé, rapporté, hypothèse, à vérifier, remplacé.
- **Portée** (durable, transitoire, lié à une séance ou à un équipement), **conséquence sur la personnalisation**, **raison** d'une décision, contraintes et compromis.
- **Relation au passé** : évolution par rapport aux données précédentes, contradiction éventuelle, correction explicite, lien vers le fichier source. Préserver l'historique utile et la possibilité de remonter aux faits antérieurs.

Conserver la **formulation d'origine seulement lorsqu'elle porte une nuance indispensable** ; sinon la reformuler de manière fidèle et exploitable. Distinguer les paroles de l'utilisateur des interprétations techniques du Coach. Ne pas affirmer une mesure, un diagnostic, un résultat ou une motivation non fournis.

Pour un élément transversal, le Coach peut employer cette structure **indicative**, en adaptant les rubriques à la réalité, sans créer de données fictives :

```text
### AAAA-MM-JJ — Sujet
- Nature : fait rapporté / préférence / contrainte / objectif / hypothèse / décision
- Source et date : ...
- Information et nuances : ...
- Portée et effet sur la personnalisation : ...
- Statut : en vigueur / à confirmer / remplacé
- Lien vers l'historique ou le document détaillé : ...
```

## 4. Protocole obligatoire à chaque échange métier

1. **Relire l'état actuel de `main` et les sources pertinentes** avant de conseiller, d'adapter ou d'archiver, en particulier le contexte transversal, les décisions, le journal, le profil, les séances/rapports utiles.
2. **Repérer tous les nouveaux faits, nuances, préférences, contraintes, hypothèses et décisions** issus du message, y compris ceux qui ne changent pas une séance aujourd'hui.
3. **Écrire dans le même échange** chaque élément pertinent dans sa source canonique, en modifiant seulement les fichiers nécessaires ; ne pas supprimer un ancien fait pour raccourcir une synthèse. Consigner la raison des ajustements et les questions encore ouvertes.
4. **Vérifier le diff** : données précédentes préservées, données nouvelles retrouvables, dates/identifiants corrects, pas de doublon, aucune inférence présentée comme un fait. Exécuter les validations applicables.
5. **Commit/push GitHub, puis relire la version distante** ; contrôler GitHub Actions lorsqu'une publication est déclenchée. Une réponse concise au propriétaire peut suivre, mais **la réponse ne remplace jamais la mise à jour GitHub**.
6. Si une écriture est **impossible**, le signaler clairement comme une **information non encore enregistrée**. Ne jamais affirmer que le contexte est sauvegardé sans preuve de commit. Réessayer uniquement avec les outils disponibles dans la conversation.

**Exception intentionnelle déjà établie** : si le propriétaire demande seulement « Mets-toi à jour », il s'agit d'une **lecture seule** et aucun commit ne doit être créé. La règle d'enregistrement s'applique aux **nouveaux apports métier** et non à la seule demande d'actualisation des connaissances.

## 5. Reprise par un autre agent LLM

Avant toute recommandation personnalisée, le nouveau Coach doit :

1. Consulter `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et **ce contrat**.
2. Lire `personnel/README.md`, puis `personnel/CONTEXTE-COACH.md` **s'il existe**, `personnel/DECISIONS.md`, `personnel/JOURNAL.md`, `personnel/sante/PROFIL.md`, `personnel/config.json` et les données pertinentes du cycle actuel.
3. Recouper les rapports de séance, événements, mesures, équipements, pièces jointes et derniers commits ; ne pas conclure à l'absence d'un fait simplement parce qu'il n'apparaît pas dans une synthèse.
4. Distinguer **faits durables**, **état actuel**, **hypothèses**, **décisions remplacées** et **points encore à éclaircir**. **Ne pas demander à l'utilisateur de répéter une information déjà documentée.**
5. Vérifier qu'il connaît les contraintes et raisons des choix qui conditionnent le programme **avant** de proposer une adaptation.

**Limite explicite :** un contexte qui n'a jamais été enregistré ou qui n'est plus accessible ne peut pas être récupéré magiquement par le nouvel agent. Il faut archiver systématiquement les apports **au moment où ils sont reçus**. Ce protocole n'établit pas, à lui seul, que des informations de conversations antérieures ont toutes déjà été récupérées.

## 6. Confidentialité et périmètre

Le dépôt `hameaufl/programme-sport` est **public**. Les fichiers personnels qu'il contient peuvent être consultés même si les pages sont `noindex`. Le Coach doit le rappeler lorsqu'un nouvel apport particulièrement sensible risque d'être publié ; il ne doit jamais versionner un secret, un jeton, un identifiant d'accès ou des données de tiers non nécessaires. Toute demande de confidentialité stricte exige une autre architecture d'accès : **GitHub public n'est pas un coffre-fort**.

Cette continuité concerne la **personnalisation du programme**, pas une collecte indifférenciée de toute conversation privée. Les données sans utilité métier, les suppositions gratuites et le texte intégral des échanges ne sont pas des obligations d'archivage.

**Responsabilités :** Maturation définit ce contrat et les interfaces ; **seul le Coach** consigne et met à jour les faits de personnalisation dans `personnel/`. Aucune refonte de la navigation du site n'est induite par ce contrat.
