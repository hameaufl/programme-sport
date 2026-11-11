# Suivi santé — public et versionné

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

- `programme.js` porte `fait` et `sensations` **statiquement** pour chaque séance, rédigés et mis à jour par le **Coach**.
- **Pas de `localStorage`**, pas de saisie ou export depuis l'IHM. Les statuts/sensations apparaissent en lecture seule sur Mon Rythme.
- `sante/` peut conserver l'historique détaillé, sans créer de contradiction avec les résumés de `programme.js`.
- Les pièces Garmin réelles sont conservées dans `pieces-jointes/` ; procédures dans [docs/GARMIN.md](../docs/GARMIN.md).

## Règles de saisie (Coach)

- Inscrire seulement ce que l'utilisateur a fourni. Distinguer ressenti, diagnostic confirmé, hypothèse, et recommandation professionnelle.
- Dater les informations et conserver l'historique Git sans faire passer des hypothèses pour des faits.
- Retour de séance → mise à jour du programme et du journal **dans l'échange courant**, si l'agent dispose des outils GitHub. Ne pas attendre une demande répétée de publication.
- Ne pas déduire une blessure des seules séances de kiné.
- Toute modification de l'IHM, du schéma des pièces jointes ou des contrôles visuels est **interdite au Coach** : intervention Maturation seulement.
