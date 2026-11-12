# Suivi santé — public et versionné
## SOURCE CANONIQUE V2

Ce document appartient au domaine `domaines/sante/`. Les sources sont sous `domaines/sante/donnees/` (`PROFIL.md`, `SUIVI.md`, `rapports/`, `evenements/`, `ressentis/seances/`). Les observations `sensations` ont été retirées des séances prévues : elles vivent dans Santé et sont liées à la séance par `seanceId`. Les passages historiques ci-dessous évoquant `personnel/` ne sont plus des instructions d'édition. Les informations demeurent dans le dépôt public tant qu'un nouveau support confidentiel n'a pas été validé.



**Architecture actuelle prioritaire** : les rapports par séance se trouvent dans `rapports/AAAA/MM/<id>.md` et les événements datés dans `evenements/AAAA/MM/<date>-<sujet>.md`. `SUIVI.md` ne contient plus les entrées effectives : il conserve les modèles et règles. Le Coach crée ou met à jour **le fichier ciblé**, sans modifier les autres. Le site reçoit un journal paginé de 30 événements lors du build et les déroulés de séance sont reliés via leur identifiant. Les anciennes indications ci-dessous faisant de `SUIVI.md` un journal unique sont **historiques**.


**Le propriétaire a explicitement choisi la publication publique et le versionnement GitHub de ses informations de santé fournies dans le cadre de Mon Rythme.**

- Dépôt : `hameaufl/programme-sport`, **public**.
- **Rôle Coach exclusivement** pour intégrer des comptes rendus, bilans et données réelles.
- **Rôle Maturation exclusivement** pour créer/maintenir la structure, les modèles et l'interface éventuelle (avec approbation visuelle), **jamais pour rédiger les données sportives**.
- Fichiers versionnés et anciens commits potentiellement accessibles publiquement ; les traces GPS peuvent révéler des lieux personnels. Ne jamais publier de mots de passe ni jetons Garmin.

## Fichiers

- [PROFIL.md](PROFIL.md) : antécédents, aspects mécaniques et fonctionnels, bilans reçus, contraintes utiles. **Aucune donnée clinique renseignée**.
- [SUIVI.md](SUIVI.md) : modèles et règles générales seulement. Les comptes rendus réels sont sous `rapports/AAAA/MM/<id>.md` et les événements sous `evenements/AAAA/MM/`.
- `rapports/AAAA/MM/<id>.md` : un compte rendu de séance réelle par identifiant.
- `evenements/AAAA/MM/<date>-<sujet>.md` : un événement de santé réel par fichier.

**Bilan podologue attendu** : future référence initiale sur posture et appuis des pieds. Document **non reçu** ; aucune mesure ou conclusion à déduire.

## Source de vérité des séances

- Chaque fichier `personnel/seances/AAAA/MM/<id>.json` porte les champs `fait` et `sensations` de la séance, rédigés par le **Coach**.
- **Pas de `localStorage`**, pas de saisie ou export depuis l'IHM. Les statuts/sensations apparaissent en lecture seule sur Mon Rythme.
- `sante/rapports/` conserve l'historique détaillé, lié par identifiant sans recopier la séance entière.
- Les pièces Garmin réelles sont conservées dans `personnel/pieces-jointes/` ; procédures dans [docs/GARMIN.md](../GARMIN.md).

## Affichage sur la page Mon suivi santé — décision visuelle du 12 novembre 2026

- Le profil clinique et fonctionnel complet est conservé **sans perte** dans `donnees/PROFIL.md`. Il n'est plus projeté vers `_site/data/sante/profil.md` et la page ne le charge plus pour le restituer en longues cartes de texte. Les données demeurent accessibles au Coach dans son domaine, sans devoir figurer dans l'interface.
- Les rapports complets de séances restent sous `donnees/rapports/`, les ressentis dans `donnees/ressentis/seances/` et les événements datés dans `donnees/evenements/`. L'architecture, les champs métier et l'historique ne sont pas supprimés.
- `addons/web/pages/sante.html` est maintenant une **synthèse visuelle** : compteurs factuels de séances réalisées/programmées et de retours, distribution par semaine des réalisations, dernières séances confirmées et titres/dates des événements récents. Aucun diagnostic, hypothèse du Coach ni dossier clinique complet n'est affiché.
- Le build limite les événements publiés à `{date,title}` ; leurs paragraphes `lines` ne sont plus copiés dans les fichiers du site. Les informations restent conservées intégralement dans le dépôt source (toujours public, y compris ses anciens commits). En mode privé la publication santé demeure désactivée.
- Une donnée non confirmée ou indisponible n'est pas remplacée par un diagnostic, une performance ou un zéro supposé ; le Web reste une vue en lecture seule sans stockage local.

## Règles de saisie (Coach)

- Inscrire seulement ce que l'utilisateur a fourni. Distinguer ressenti, diagnostic confirmé, hypothèse, et recommandation professionnelle.
- Dater les informations et conserver l'historique Git sans faire passer des hypothèses pour des faits.
- Retour de séance → mise à jour du programme et du journal **dans l'échange courant**, si l'agent dispose des outils GitHub. Ne pas attendre une demande répétée de publication.
- Ne pas déduire une blessure des seules séances de kiné.
- Toute modification de l'IHM, du schéma des pièces jointes ou des contrôles visuels est **interdite au Coach** : intervention Maturation seulement.
