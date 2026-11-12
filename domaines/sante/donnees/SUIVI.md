# Suivi santé chronologique — modèle public et versionné

**Premier compte rendu réel consigné : séance de kiné du 4 novembre 2026 (retour reçu le 11 novembre).** Le propriétaire accepte la publication publique des informations de santé qu'il transmet au projet.

**Seul le Coach** renseigne les retours et la suite sportive ; **Maturation ne rédige jamais les comptes rendus** ni les programmes.

## Équipement de reprise — événements datés

## Modèle d'entrée (à compléter pour un retour effectivement reçu)

### AAAA-MM-JJ — activité / séance identifiée par `id`

- **Prévu :** …
- **Réalisé :** …
- **Durée / distance :** …
- **Sensations :** …
- **Gêne / douleur éventuelle :** …
- **Évolution après la séance / au lendemain :** …
- **Récupération :** …
- **Décision Coach :** maintien / réduction / augmentation / report / repos / attente
- **Séances concernées :** …
- **Pièce jointe Garmin si reçue :** `personnel/pieces-jointes/seances/<id>/realise/<fichier>`
- **Source :** retour daté de l'utilisateur / document fourni.

## Règles

- Distinguer faits transmis, décisions d'entraînement et hypothèses.
- Mettre à jour les champs `fait` et `sensations` **dans `personnel/programme.js`**, source de l'affichage du site.
- Fichiers réels Garmin dans `pieces-jointes/`, jamais de lien fictif.
- Aucun stockage local sur la page Mon Rythme, aucun champ à remplir.
- Compte rendu utilisateur = demande d'action pour le Coach **dans l'échange**, sans requête supplémentaire « publie sur GitHub ».
- **Aucune modification d'interface par le Coach**.
