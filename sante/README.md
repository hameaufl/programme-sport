# Suivi santé — espace versionné

**Statut : structure créée, aucun dossier médical personnel renseigné.**

Ce répertoire est destiné au contexte de santé utile à l'accompagnement sportif : antécédents, aspects mécaniques et fonctionnels, rééducation, éventuelles contraintes, retours d'entraînement.

## Fichiers

- [`PROFIL.md`](PROFIL.md) : synthèse **à renseigner** des antécédents et contraintes utiles.
- [`SUIVI.md`](SUIVI.md) : modèle de journal chronologique des sensations, séances et ajustements ; **aucun compte rendu saisi pour l'instant**.
- Les nouvelles entrées peuvent aussi être créées sous `sante/journal/AAAA-MM-JJ.md` si la granularité quotidienne devient utile.

## Visibilité et versionnement — essentiel

Le dépôt GitHub `hameaufl/programme-sport` est **public** et sert à **GitHub Pages**. Un futur contenu médical ajouté à ce dossier pourrait être **public sur GitHub et accessible directement depuis le site**, même sans lien visible dans l'IHM. Sa suppression d'une version ultérieure ne garantit pas la disparition de l'historique Git, des copies ou des forks.

Le propriétaire souhaite un **suivi de santé versionné** ; sa volonté de versionner des données ne doit pas être interprétée automatiquement comme un accord pour les rendre publiques. **Ne pas déposer de données médicales réelles ici avant confirmation explicite de la visibilité du dépôt choisi.** Une alternative adaptée est un **dépôt privé séparé** contenant le dossier santé. Les agents autorisés pourront le consulter, sous réserve d'avoir accès à ce dépôt.

## Document de référence attendu

**Bilan du podologue : à recevoir ultérieurement.** Objet annoncé : état initial des paramètres physiques relatifs à la posture et aux appuis des pieds. **Document absent**, aucune mesure, conclusion ou recommandation disponible. Il pourra servir au Coach une fois transmis et analysé, après choix explicite d'un emplacement de versionnement adapté à sa confidentialité.

**Journal « Sensations » de Mon Rythme** : les notes éventuellement saisies dans la page résident uniquement dans le stockage du navigateur (`mon-rythme-sensations-v1`). Elles ne sont pas synchronisées avec le dossier `sante/` ni avec GitHub.

## Règles de saisie

- Respecter les mots utilisés par le propriétaire, distinguer **ressenti**, **diagnostic confirmé**, **hypothèse** et **recommandation professionnelle**.
- Dater et sourcer les informations ; ne jamais inventer un symptôme, un antécédent, une prescription ou une mesure.
- Mettre à jour l'historique sans masquer les évolutions. Git conserve déjà la chronologie des modifications.
- Ne pas déduire une douleur des seules séances « Kiné · Genoux ».
- Les coches « Fait » de l'application restent dans le navigateur ; elles ne sont pas importées automatiquement dans ce dossier.
- Une sortie sportive peut mener à une adaptation du programme sans qu'une donnée clinique soit nécessairement publiée dans GitHub.
