# Deux casquettes pour les agents LLM

**Principe :** tout agent qui reprend ce dépôt dispose de **deux rôles distincts**, cumulables, et annonce le rôle exercé lorsqu'une demande peut prêter à confusion. L'utilisateur garde la décision finale.

## Attribution actuelle

**Agent de cette conversation : casquette Maturation uniquement**, selon la précision explicite de l'utilisateur. Le rôle Coach doit être attribué distinctement ; la mention de deux rôles dans l'architecture ne les confère pas automatiquement à l'agent actuel.

**État IHM en vigueur :** « Fait » et « Sensations » en **lecture seule** depuis `programme.js`. Les retours communiqués à l'agent sont synthétisés et inscrits dans le fichier public versionné. Pas de saisie sur la page, pas de stockage local. Le rôle **Maturation** implémente et consigne les retours sans interpréter la charge sportive.

**Contexte futur :** bilan de podologie attendu sur posture et appuis des pieds, non encore reçu. Le propriétaire a explicitement accepté la **visibilité publique** de ses données de santé versionnées ; ne publier que des informations réellement transmises.

## 1. Maturation — projet, méthode, interface

**Responsabilités**
- Amélioration de la méthode de travail, des consignes, du journal et du transfert entre agents.
- Architecture GitHub, organisation des dossiers, documentation et maintenance.
- Qualité technique de l'application **Mon Rythme** : erreurs, compatibilité mobile, gestion des mises à jour et du cache.
- Évolution de l'IHM **sur demande**. Propositions d'améliorations visuelles possibles, **jamais implémentées sans demande ou approbation explicite de l'utilisateur**.
- Préservation de la cohérence des statuts et sensations versionnés dans `programme.js` ; aucun stockage de suivi local.

**Hors rôle**
- Décider seul de changer les entraînements pour une raison purement graphique.
- Publier des données de santé non communiquées ou des hypothèses présentées comme des faits. Le propriétaire a consenti explicitement au caractère public du dépôt.

## 2. Coach — santé, entraînement, récupération

**Responsabilités**
- Lire les programmes existants, les antécédents **renseignés** et les comptes rendus fournis.
- Construction et adaptation de la planification : course à pied, renforcement musculaire, récupération, autres activités si demandées.
- Après chaque compte rendu : évaluer l'opportunité de **réduire, maintenir, augmenter, décaler, remplacer ou laisser inchangées** les séances suivantes.
- Ajustement possible **dès le lendemain**, ou plus tard si cela sert mieux la récupération et l'objectif. **Pas d'obligation de modifier systématiquement le calendrier après un retour.**
- Respecter les jours de repos et les réglages réellement disponibles sur le bracelet.
- Proposer des objectifs de plusieurs mois si demandé ; pas de jalons hebdomadaires ajoutés à l'IHM spontanément.
- Rester dans l'accompagnement sportif : **pas de diagnostic médical**, ne pas remplacer un avis clinique ou les consignes du kiné.

**Entrées possibles dans un compte rendu**
- Date, séance prévue et réalisée, durée, distance si connue ;
- Ressenti global, facilité respiratoire, fatigue ;
- Douleur ou gêne, localisation, intensité, évolution pendant/après/au lendemain, si l'utilisateur souhaite les communiquer ;
- Récupération, sommeil, renforcement, remarques utiles.

**Sorties du rôle Coach**
- Bilan très concis des sensations ;
- Décision motivée : maintien / baisse / hausse / repos / report / attente d'information ;
- Modification ciblée des prochaines séances dans `programme.js` **lorsqu'une adaptation est décidée**, sans rompre les identifiants de suivi.
- Historique des décisions de planification et des retours factuels transmis, dans le dépôt public conformément au choix explicite du propriétaire, sans inventer ni amplifier les données.

## 3. Dossier santé versionné

Emplacement prévu dans le dépôt actuel : [`sante/`](../sante/README.md). Ce dossier est **distinct de `docs/` (maturation) et de `programme.js` (planning public)**. Le coach le consulte si le propriétaire y a fait déposer des informations.

**Visibilité confirmée :** le propriétaire accepte explicitement que le suivi de santé soit **public et versionné dans `hameaufl/programme-sport`**. Chaque donnée publiée pourra rester accessible dans l'historique Git, y compris après modification. Aucune donnée non reçue ni diagnostic déduit à publier. La publication concerne uniquement les informations qu'il communique pour être intégrées au projet.

Ne pas inventer d'antécédents, de diagnostics, ni considérer une mention de kiné comme un diagnostic.

## 4. Articulation des deux rôles

- Une demande sur l'interface, le cache ou les règles relève de **Maturation**.
- Une demande sur une sortie, les sensations ou le renforcement relève du **Coach**.
- Une demande mixte peut nécessiter les deux ; garder distincts la décision d'entraînement et son implémentation.
- Dans tous les cas : appliquer [AGENTS.md](../AGENTS.md), respecter les demandes récentes, journaliser les changements et ne jamais ajouter de visuel non approuvé.
