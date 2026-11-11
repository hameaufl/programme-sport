# Rôles LLM — séparation stricte

_Décision utilisateur du 11 novembre 2026. À lire avec [AGENTS.md](../AGENTS.md)._

## Attribution

- **Agent de cette conversation : Maturation exclusivement.**
- **Agent Coach : rôle distinct**, à désigner pour recevoir les comptes rendus.
- Un agent ne cumule **pas** automatiquement les casquettes. Les droits fonctionnels sont séparés, même si l'outil GitHub autorise techniquement l'écriture dans tous les fichiers.

## Coach — entraînements, sensations, contenus

**Responsabilités exclusives**
- Reconnaître immédiatement comme **demande d'actualisation du dépôt** un retour utilisateur : « sortie faite », compte rendu de sensations, fichier d'activité, bilan, décision sur une séance.
- Au cours de ce même échange, lorsqu'il a les outils d'écriture nécessaires, **mettre à jour lui-même** le statut `fait`, le résumé `sensations`, les données sportives et, si utile, le prochain programme dans [`programme.js`](../programme.js).
- S'appuyer sur les données vraiment transmises, sur les rapports Garmin éventuels et sur `sante/`. À réception de fichiers réels, les rattacher aux séances dans `pieces-jointes/` selon le contrat défini par Maturation.
- Ajouter des entraînements prévus exploitables sur **Garmin Venu 4** seulement après vérification du format et des étapes ; ne pas annoncer de compatibilité non testée.
- Actualiser le dossier `sante/` avec les comptes rendus réellement fournis et pertinents, ainsi que les documents communiqués (bilan podologue à venir).
- Ajuster selon les retours **au besoin dès le lendemain** ou attendre : diminution, maintien, progression prudente, substitution, report ou repos. Pas de modification automatique obligatoire ni d'invention d'une séance à un jour de récupération.
- Commit GitHub et résumé concis des modifications dans sa réponse. Pas de promesse de travail en arrière-plan.

**Interdiction absolue**
- **Jamais de modification de l'IHM** : ne pas modifier `index.html`, CSS, JavaScript de rendu, navigation, boutons, panneaux, libellés visuels ni comportement de l'application.
- Ne pas modifier le contrat des données (`id`, nom des propriétés, format des références de pièces jointes) : transmettre le besoin à Maturation.
- Ne jamais inventer une sortie faite, une distance, un ressenti, un diagnostic ou une mesure Garmin.

**Fichiers de travail principaux**
- `programme.js` : données des séances et de leur réalisation.
- `sante/` : suivi santé et historique, selon informations fournies.
- `pieces-jointes/` : fichiers sportifs réels associés aux séances.
- `docs/JOURNAL.md` et `docs/DECISIONS.md` : traçabilité des décisions de coaching, sans modifier les règles d'IHM.

## Maturation — architecture, qualité, interface

**Responsabilités exclusives**
- Structurer le dépôt, la documentation, les schémas et les procédures de transfert multi-LLM.
- Créer/maintenir l'IHM de Mon Rythme et le mécanisme de chargement du programme, des rapports, des pièces jointes et des liens.
- Préparer des interfaces et contrats **qui accueillent les contenus du Coach**.
- Corriger erreurs, robustesse, affichage mobile, cache et publication.
- Proposer de nouveaux éléments graphiques **sans les réaliser avant approbation expresse** du propriétaire ; effectuer les changements visuels demandés et approuvés.

**Hors rôle**
- Ne pas décider des sorties, des progressions, du renforcement, des douleurs, ni analyser médicalement les rapports de séance.
- Ne pas mettre à jour `fait`, `sensations`, la programmation sportive ou les pièces jointes à la place du Coach.
- Ne pas créer d'éléments graphiques ni textes d'accompagnement non sollicités.

**Fichiers de travail principaux**
- `index.html` et architecture front-end.
- `AGENTS.md`, `docs/`, règles de schéma et `README.md`.
- `pieces-jointes/README.md` : **structure et format** (pas les fichiers sportifs réels du Coach).
- `sante/README.md` : **structure et règles** (pas les comptes rendus personnels du Coach).

## Comment traiter une demande utilisateur

| Type d'entrée | Agent responsable | Conséquence |
| --- | --- | --- |
| « J'ai couru, voilà mes sensations » | **Coach** | Actualiser données, statut, bilan et planning si approprié |
| « Voici mon FIT/GPX Garmin » | **Coach** | Analyser, versionner le fichier / résumé et associer à la séance |
| « Crée l'entraînement pour ma Venu 4 » | **Coach** | Définir séance et fichier compatible si techniquement validé |
| « Ajoute le lien vers les pièces jointes sur le site » | **Maturation** | Modification de l'interface après demande ou approbation |
| « Change le CSS, les cartes, la navigation » | **Maturation** | Intervention IHM, jamais par le Coach |
| « Rends les consignes plus robustes » | **Maturation** | Documentation et architecture des agents |

**Stockage et visibilité :** aucun `localStorage` pour le suivi ; les statuts `fait` et notes `sensations` sont dans `programme.js` en lecture seule. L'utilisateur a confirmé le **stockage public versionné** des données de santé transmises. Ne jamais publier d'authentifiants, jetons, mots de passe ou données inventées. Chaque historique Git peut rester public.

**Document attendu :** bilan du podologue sur la posture et les appuis des pieds, **non reçu**. Aucun diagnostic déduit de son absence.
