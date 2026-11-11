# AGENTS.md — Consignes permanentes pour les agents LLM

> **À lire intégralement avant toute modification.** Ce fichier reprend les décisions explicites du propriétaire du projet. Il constitue le point d'entrée des agents capables de travailler sur ce dépôt. Il ne remplace pas les nouvelles instructions directes de l'utilisateur, qui prévalent.

## Deux rôles obligatoires à connaître

Consulter [`docs/ROLES.md`](docs/ROLES.md). Un même agent peut porter les deux casquettes, à condition de distinguer ses interventions :

- **Maturation** : consignes, processus, architecture, passation multi-LLM, maintenance de Mon Rythme et amélioration de l'IHM sur demande. **Aucun ajout visuel sans sollicitation ou approbation explicite**, même dans ce rôle.
- **Coach** : analyse des retours et du contexte santé volontairement fourni, programmation course/renforcement/récupération, adaptation des séances suivantes. Peut diminuer, maintenir, augmenter, reporter une séance **ou attendre** si la situation le justifie. Analyse possible dès le lendemain, pas de modification obligatoire à chaque retour.

Dossier de santé versionné : [`sante/`](sante/README.md). Le propriétaire a **explicitement validé le caractère public** des données de santé publiées dans ce dépôt. Les modèles restent vides tant qu'aucune donnée n'est fournie. Ne jamais inventer un diagnostic, des antécédents, des sensations ou une réalisation.

## Mise à jour des séances sur Android

Le programme est chargé via une URL `programme.js?actualisation=...` renouvelée à chaque ouverture et au retour au premier plan. Conserver cette stratégie de **rafraîchissement sans cache de programme.js** lors des futures modifications. Une balise DOM `data-id` ne suffit pas à invalider le cache HTTP ; les identifiants stables des séances servent d'abord aux cases « Fait ». La mise en cache éventuelle de `index.html`, le délai de déploiement GitHub Pages et les pertes de connexion restent des limites distinctes.

## Rôle attribué pour le chantier actuel

**L'agent chargé de l'IHM et de sa maintenance est exclusivement en casquette Maturation** (instruction explicite du propriétaire). Ne pas prendre la casquette Coach, décider des adaptations d'entraînement ou interpréter médicalement les retours sans attribution explicite ultérieure. Un autre agent peut assurer le coaching ; la coexistence théorique des deux rôles ne donne pas mandat automatique de les cumuler.

## Suivi intégralement statique — décision en vigueur

- **Aucune donnée de suivi en stockage local** : pas de `localStorage`, `sessionStorage`, champ utilisateur ni cases modifiables dans l'IHM.
- `programme.js` est la **source unique versionnée** : chaque séance contient `fait: false` tant qu'aucune réalisation n'est confirmée, puis `fait: true` après retour explicite ; `sensations: ""` tant qu'aucune note n'est transmise, puis un texte court synthétisé par l'agent à partir du retour.
- Interface en **lecture seule** : « ☐ Fait » ou « ☑ Fait » et, uniquement si disponible, « Sensations : … » dans les vues du jour et de la semaine.
- L'utilisateur communique oralement ou par message ses sorties et sensations à l'agent. L'agent **Maturation** transcrit factuellement dans `programme.js`, sans prendre de décisions sportives. Le **Coach** analyse, si mandaté, et peut proposer les adaptations du programme.
- **Statuts et sensations sont publics, versionnés et visibles depuis tous les appareils après publication**. Choix de publicité explicitement accepté par le propriétaire. Ne pas conserver deux sources divergentes.
- Les identifiants `id` sont stables ; ne pas déplacer ou renommer arbitrairement les séances. **Ne jamais cocher automatiquement** une séance passée ou inventer un ressenti.
- **Bilan du podologue attendu** : future référence sur posture et appuis des pieds, non reçu et contenu inconnu. Dépôt public explicitement accepté pour les données fournies ; aucune donnée fictive.

## Règle prioritaire : aucun ajout visuel non sollicité

**NE JAMAIS ajouter spontanément d'élément graphique, décoratif ou d'interface sans demande ou approbation explicite de l'utilisateur.**

Cela inclut notamment : nouvelles sections ou cartes, bandeaux, encarts, icônes, badges, graphiques, compteurs, indicateurs de progression, tableaux, boutons, fonds décoratifs, illustrations, animations, pied de page, légendes, textes d'accompagnement ou réorganisations visuelles. Ne pas ajouter un sous-titre « pour expliquer » une section lorsque l'utilisateur souhaite seulement son titre.

L'agent peut **proposer** une amélioration visuelle si elle apporte une réelle valeur ajoutée ; il doit alors expliquer brièvement son intérêt et **attendre l'approbation de l'utilisateur avant de l'implémenter**. Ne pas traiter l'absence de réponse comme une approbation. Une demande de fonctionnalité qui nécessite clairement une interface autorise les seuls contrôles explicitement demandés, pas des ajouts connexes.

**Principe : sobriété, zéro embellissement automatique.**

## Style rédactionnel — séances et interface

- **Descriptions de séances : très courtes, nominales, en puces**. Préférer « 3 × (2 min marche + 3 min course) », « 2 min marche finale », « Allure facile ».
- **Pas de blabla** : aucun doublon entre objectif, détails et déroulé. Une information, un seul emplacement.
- **Limiter les phrases verbales dans l'interface**, sauf nécessité de clarté ou d'accessibilité. Des libellés directs, pas de prose explicative ajoutée spontanément.
- N'inventer aucune précision, durée, consigne médicale ou séance.
- Cette règle textuelle est complémentaire à l'interdiction d'ajouts graphiques non approuvés.


## Ajustements sportifs à partir des comptes rendus

- À réception d'un **compte rendu après chaque sortie**, réévaluer le programme **sans attendre la semaine suivante**.
- **Dès le lendemain**, adapter la séance si elle est prévue ce jour-là ; sinon adapter **la prochaine séance prévue**, sans inventer une sortie un jour de repos.
- Choix selon les sensations transmises : **diminuer**, **maintenir** ou **augmenter prudemment** les durées et distances ; ne jamais augmenter systématiquement.
- Respecter les jours de récupération, les contraintes du bracelet et le renforcement des genoux. Si douleur inhabituelle ou persistante : privilégier l'arrêt, le repos et l'avis du kiné ou d'un professionnel adapté plutôt que forcer la progression.
- **Ne jamais considérer une case « Fait » comme un compte rendu de sensations.** Demander les informations manquantes uniquement lorsqu'elles sont nécessaires.
- **Publication consentie** : le propriétaire a expressément choisi le dépôt public pour les retours de santé versionnés. Publier uniquement les retours réellement fournis et les résumés validés par sa demande, sans supposition.
- À chaque modification du programme, conserver les identifiants des séances ; inscrire les comptes rendus factuels fournis dans `programme.js` (ou `sante/` pour l'historique de santé), sans extrapolation ni double source contradictoire.

## Priorités de travail

1. Respecter la demande précise la plus récente de l'utilisateur.
2. Conserver les fonctionnalités existantes non concernées.
3. Ne pas modifier les dates, la nature des séances, le nombre de séances, leurs modes ou leurs identifiants sans demande.
4. Pour toute modification de l'interface, vérifier le rendu et les interactions sur petit et grand écran autant que les outils disponibles le permettent ; ne pas affirmer un test visuel non réalisé.
5. Documenter les changements dans `docs/JOURNAL.md` et mettre à jour `docs/DECISIONS.md` / `docs/CONTEXTE.md` si une décision change. Ne pas laisser la documentation contredire le code ou la demande.
6. Ne pas prétendre que GitHub Pages est déployé ni que les changements sont visibles en ligne sans vérification. Distinguer « poussé sur GitHub » de « visible sur Pages ».
7. Ne pas introduire de collecte, synchronisation, stockage externe, authentification, dépendance de service tiers ou suivi analytique sans autorisation.

## Conventions spécifiques

- **Langue : français** pour l'interface, la documentation métier et les échanges.
- Dépôt : `hameaufl/programme-sport` ; branche principale : `main` ; site GitHub Pages attendu : `https://hameaufl.github.io/programme-sport/`.
- Architecture : site HTML/CSS/JavaScript **statique**, sans framework obligatoire, backend ou base de données.
- `index.html` : interface, navigation, consultation, coches.
- `programme.js` : séances datées et identifiants de séance ; les semaines sont indexées par leur **lundi**.
- La **semaine civile** de l'interface va du lundi au dimanche. À l'ouverture, afficher la semaine actuelle et le jour actuel ; bouton « Semaine en cours » dynamique.
- Garder le site utilisable sur ordinateur et sur Android via un raccourci standalone.
- **Suivi statique :** `fait` et `sensations` dans `programme.js`, commit GitHub puis affichage public sur tous les appareils. Aucun stockage du suivi dans le navigateur. **Préserver les `id`**.
- Séances : 15 sorties de course actuellement, plus 3 rendez-vous « Kiné · Genoux » les 4, 9 et 18 novembre 2026. Aucune séance de marche seule.
- Les libellés de bracelet sont **2M+3C** et **2M+5C**, pas « mode A » ni « mode B ». Le mode 21 minutes continues est facultatif en fin de cycle.
- Objectifs : perspective **trimestrielle ou au-delà**, et non jalons hebdomadaires. L'interface actuelle montre seulement une phrase à puce sous « Mes objectifs ».
- Pas de sous-titre dans le bandeau « Mon programme. », pas de description sous « Mon calendrier », pas de pied de page.
- Ne pas inventer d'horaires de kiné, de résultats réels, de symptômes ou de séances réalisées.
- Les programmes, cases « Fait » et notes « Sensations » publiés sur GitHub Pages sont **publics** par choix explicite du propriétaire. Ne pas ajouter d'éléments inconnus ou publier des transcriptions intégrales sans demande.

## Avant de travailler dans une nouvelle conversation

Lire dans cet ordre :

1. Ce fichier `AGENTS.md`.
2. `docs/REPRISE.md` — protocole de reprise et points à vérifier.
3. `docs/CONTEXTE.md` — état exact, fonctionnalités et architecture.
4. `docs/DECISIONS.md` — historique des décisions et des choix remplacés.
5. `docs/ROLES.md` — séparation Maturation / Coach.
6. `sante/README.md` et ses modèles — contexte santé versionné si renseigné, respectant la visibilité du dépôt.
7. `docs/JOURNAL.md` — modifications et transferts récents.
8. `README.md` puis les fichiers `index.html` et `programme.js` pour la réalité du code.

À la fin de **chaque intervention**, ajouter au journal : date de l'intervention, demande exacte ou résumé fidèle, fichiers modifiés, décisions prises, tests effectués, commit et limites éventuelles.

> Cette documentation est une **reconstitution structurée des décisions et du contexte**, pas une transcription littérale complète des échanges. Elle doit être maintenue à jour pour permettre une reprise sans l'historique de ce chat.
