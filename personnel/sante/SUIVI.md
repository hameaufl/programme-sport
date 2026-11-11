# Suivi santé chronologique — modèle public et versionné

**Premier compte rendu réel consigné : séance de kiné du 4 novembre 2026 (retour reçu le 11 novembre).** Le propriétaire accepte la publication publique des informations de santé qu'il transmet au projet.

**Seul le Coach** renseigne les retours et la suite sportive ; **Maturation ne rédige jamais les comptes rendus** ni les programmes.

## 4 novembre 2026 — Première séance de kiné · Genoux

- **Identifiant :** `kine-2026-11-04`
- **Prévu :** première séance de kinésithérapie des genoux.
- **Réalisé :** Bilan initial ; Étirements ; Presse · 40 et 50 kg ; Marche latérale avec bande élastique ; Étirements.
- **Durée :** non précisée.
- **Sensations :** À la presse, j'ai eu des douleurs à partir de 60-70 kilos, donc je suis resté sur 50 kilos.
- **Après la séance / récupération :** non renseignées.
- **Décision Coach au 11 novembre :** marquer la séance comme réalisée ; maintenir provisoirement le programme de course, sans augmentation sur ce seul compte rendu ancien, dans l'attente des sensations actuelles et des retours des autres séances. Ne pas forcer en présence de douleur ; discuter des charges douloureuses avec le kinésithérapeute.
- **Source :** compte rendu oral de l'utilisateur transmis le 11 novembre 2026 sur la séance du 4 novembre.

## Équipement de reprise — événements datés

### 2026-11-09 — Nouvelles semelles orthopédiques

- **Fait rapporté :** nouvelles semelles orthopédiques obtenues le lundi 9 novembre 2026.
- **Tolérance / effets :** non renseignés.
- **Source :** information transmise par l'utilisateur le 12 novembre 2026.

### 2026-11-02 — Chaussures de running

- **Fait rapporté :** achat de chaussures de course le lundi précédent, soit le 2 novembre 2026.
- **Marque et modèle :** référence à communiquer.
- **Source :** information transmise par l'utilisateur le 12 novembre 2026.

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
