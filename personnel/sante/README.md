# Suivi santé — public et versionné

**Architecture actuelle prioritaire** : les rapports par séance se trouvent dans `rapports/AAAA/MM/<id>.md` et les événements datés dans `evenements/AAAA/MM/<date>-<sujet>.md`. `SUIVI.md` ne contient plus les entrées effectives : il conserve les modèles et règles. Le Coach crée ou met à jour **le fichier ciblé**, sans modifier les autres. Le site reçoit un journal paginé de 30 événements lors du build et les déroulés de séance sont reliés via leur identifiant. Les anciennes indications ci-dessous faisant de `SUIVI.md` un journal unique sont **historiques**.


**Le propriétaire a explicitement choisi la publication publique et le versionnement GitHub de ses informations de santé fournies dans le cadre de Mon Rythme.**

- Dépôt : `hameaufl/programme-sport`, **public**.
- **Rôle Coach exclusivement** pour intégrer des comptes rendus, bilans et données réelles.
- **Rôle Maturation exclusivement** pour créer/maintenir la structure, les modèles et l'interface éventuelle (avec approbation visuelle), **jamais pour rédiger les données sportives**.
- Fichiers versionnés et anciens commits potentiellement accessibles publiquement ; les traces GPS peuvent révéler des lieux personnels. Ne jamais publier de mots de passe ni jetons Garmin.

## Fichiers

- [PROFIL.md](PROFIL.md) : antécédents, aspects mécaniques et fonctionnels, bilans reçus, contraintes utiles. **Aucune donnée clinique renseignée**.
- [SUIVI.md](SUIVI.md) : historique des comptes rendus et décisions du Coach, après réception des retours. **Aucun retour réel consigné**.
- `journal/AAAA-MM-JJ.md` : format futur facultatif par compte rendu (créer uniquement pour des données réelles).

**Bilan podologue attendu** : future référence initiale sur posture et appuis des pieds. Document **non reçu** ; aucune mesure ou conclusion à déduire.

## Source de vérité des séances

- `personnel/programme.js` porte `fait` et `sensations` **statiquement** pour chaque séance, rédigés et mis à jour par le **Coach**.
- **Pas de `localStorage`**, pas de saisie ou export depuis l'IHM. Les statuts/sensations apparaissent en lecture seule sur Mon Rythme.
- `sante/` peut conserver l'historique détaillé, sans créer de contradiction avec les résumés de `personnel/programme.js`.
- Les pièces Garmin réelles sont conservées dans `personnel/pieces-jointes/` ; procédures dans [docs/GARMIN.md](../GARMIN.md).

## Affichage sur la page Mon suivi santé

- La page `sante.html` lit ce répertoire **en lecture seule** lors du chargement ; la source unique reste dans GitHub, sans copie de contenu.
- Les rubriques `##` de `PROFIL.md` alimentent les cartes « Mes repères de santé ». Les rubriques non renseignées restent vides sur la page.
- Les comptes rendus effectifs dans `SUIVI.md` peuvent être datés par un titre `### AAAA-MM-JJ — titre` ; la page ignore le modèle `### AAAA-MM-JJ` sans vraie date et affiche uniquement les entrées réelles.
- Le Coach renseigne **seulement** les informations transmises ; Maturation ne modifie pas les observations du profil ni le journal.
- `personnel/programme.js` reste la référence pour `fait`, `sensations` et les compteurs de séances affichés.

## Règles de saisie (Coach)

- Inscrire seulement ce que l'utilisateur a fourni. Distinguer ressenti, diagnostic confirmé, hypothèse, et recommandation professionnelle.
- Dater les informations et conserver l'historique Git sans faire passer des hypothèses pour des faits.
- Retour de séance → mise à jour du programme et du journal **dans l'échange courant**, si l'agent dispose des outils GitHub. Ne pas attendre une demande répétée de publication.
- Ne pas déduire une blessure des seules séances de kiné.
- Toute modification de l'IHM, du schéma des pièces jointes ou des contrôles visuels est **interdite au Coach** : intervention Maturation seulement.
