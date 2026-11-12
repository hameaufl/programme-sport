# Coach — procédure active et vérifiable

**Version opérationnelle : 12 novembre 2026.** Document d'entrée à lire en priorité sous casquette **Coach**. Les documents volumineux `AGENTS.md`, `docs/ROLES.md`, `docs/REPRISE.md` et `docs/CONTRAT-CONTINUITE-COACH.md` contiennent aussi des règles et décisions historiques conservées **sans effacement**. Les passages renvoyant à l'ancien `personnel/`, aux FIT locaux ou à une interdiction absolue du rendu Web sont historiques lorsqu'ils contredisent les règles prioritaires V2.

## 1. Vérification avant de conseiller ou d'écrire

1. Relire le dernier `main`, `domaines/coaching/donnees/objectifs.json`, `orientation.json`, le contexte `CONTEXTE-COACH.md`, les dernières décisions `DECISIONS.md` et les sources utiles du jour.
2. Séparer clairement **fait réalisé**, **ressenti déclaré**, **hypothèse personnelle**, **analyse du Coach**, **décision sportive**, **intention conditionnelle**. Conserver date, chiffres, unités, provenance et incertitudes.
3. `Mets-toi à jour` **isolé** = lecture seule. Toute nouvelle déclaration métier utile = mettre à jour les sources dans l'échange courant. Ne jamais supposer une activité effectuée du seul planning.
4. Respecter l'objectif personnel canonique : retrouver des sensations agréables, **sans recherche de performance** ; ne pas progresser automatiquement en cas de douleurs.

## 2. Route de chaque information, sans doublon

| Information | Seule source canonique opérationnelle |
| --- | --- |
| Programme prévu, blocs et durée prévisionnelle | `domaines/planification/donnees/seances/AAAA/MM/<id>.json` |
| **Activité réalisée, exercices réalisés, structures sollicitées** | `domaines/activites/donnees/seances/AAAA/MM/<id>.json` |
| Ressentis de séance, douleurs et récupération rapportés | `domaines/sante/donnees/ressentis/seances/AAAA/MM/<id>.json` |
| Nuances d'un retour précis et récit source | `domaines/sante/donnees/rapports/AAAA/MM/<id>.md` |
| Événement daté | `domaines/sante/donnees/evenements/AAAA/MM/<date>-sujet.md` |
| Objectif, stratégie, matériel et décisions transversales | `domaines/coaching/donnees/{objectifs.json,orientation.json,equipements.json,CONTEXTE-COACH.md,DECISIONS.md,JOURNAL.md}` |

Identifiants, dates, séances effectuées et historiques sont à **préserver**. Un essai réellement effectué mais hors cycle peut posséder une entrée minimale de référence dans Planification **uniquement si nécessaire à la liaison** avec Activités, sans inventer un entraînement prescrit antérieurement. Ne pas dupliquer les faits entre couches ; un rapport peut pointer vers l'analyse anatomique du fichier Activités. Pour le journal Santé public, en-tête strict : `### AAAA-MM-JJ — Intitulé`.

## 3. Checklist impérative pour **chaque activité confirmée** — avant le commit

- [ ] `seanceId` stable, `fait: true`, date et nature confirmées, sans déduire une durée réelle du programme prévu.
- [ ] `exercicesRealises` : reprendre uniquement les exercices ou étapes effectivement rapportés, avec volumes et unités connus ; pas d'invention à partir du planning.
- [ ] **`structuresSollicitees: string[]` : champ obligatoire non vide pour chaque activité réalisée**, y compris une sortie non planifiée sur tapis. C'est **au Coach de le renseigner spontanément** à partir des gestes déclarés ; ne pas attendre que l'utilisateur le demande.
- [ ] Regrouper en puces nominales brèves `Région / fonction — structures anatomiques` : `Jambe / propulsion — quadriceps fémoral, triceps sural`, `Hanche / stabilisation — moyen fessier`. Ce sont des **exemples de forme**, jamais un modèle à recopier sans adéquation des gestes.
- [ ] Ne pas écrire `(sollicitation probable…)` ou des réserves répétées **dans les puces**. Il s'agit d'une interprétation biomécanique usuelle, **pas** d'une mesure clinique, ni d'un diagnostic de lésion. Écarter les muscles non fondés ; si le mouvement n'est pas assez décrit, indiquer `À préciser par le Coach — mouvements non décrits`, sans inventer.
- [ ] Ressentis **distincts** dans Santé, concis et fidèles ; rapport narratif si nécessaire. `orientation.json` seulement si phase, tendances ou vigilances évoluent, et sans doubler l'objectif canonique.
- [ ] Vérifier que le détail de la séance dans **Mon programme** présente dans l'ordre **Séance → Structures sollicitées → Sensations**, et que les réalisations apparaissent correctement dans **Mon suivi santé**. La page ne devine aucun muscle et ne convertit aucun plan en fait.

## 4. Mode d'intervention Web et tests

**Un seul processus de livraison** : modifier les sources de vérité → contrôler les projections publiques autorisées → corriger **uniquement un fragment local de rendu métier** si nécessaire → valider/build → créer de préférence **un seul commit** → contrôler GitHub Actions **et** la version réellement servie.

- Contrôles principaux : `node scripts/verifier-site.cjs`, `node scripts/verifier-changements.cjs`, `node scripts/construire-site.cjs`, `node scripts/verifier-miroir-web.cjs`, `node maturation/architecture/verifier-publication.cjs`.
- `domaines/activites/modele.cjs` rejette désormais une activité réalisée sans `structuresSollicitees`. Les tests doivent échouer avant publication si le champ manque, est vide ou n'est pas projeté fidèlement.
- Politique privée : `MON_RYTHME_POLITIQUE=prive node scripts/construire-site.cjs` et `node maturation/architecture/verifier-publication-prive.cjs`.
- Vérifier le workflow **« Publier Mon Rythme »**, build + déploiement + `data/index.json.buildVersion` égal au SHA voulu. Un **commit seul ne vaut pas publication**. Si non confirmé : l'annoncer explicitement.
- HTML, CSS, navigation générale, schémas, adaptateurs, contrats, scripts et workflows : responsabilité **Maturation**, sauf la dérogation du Coach sur **un fragment de rendu métier local**. Ne pas copier des valeurs métier en dur dans les pages. Procédure détaillée : `docs/PROCEDURE-MIROIR-WEB.md`.

## 5. Garde-fous prioritaires

- **Aucune perte de données métier :** ne supprimer ni écraser les faits, séances, rapports, décisions et anciens contextes ; préférer les compléments datés. Vérifier le diff, l'identité des séances et l'absence de suppressions avant publication.
- **Confidentialité :** dépôt GitHub et site standard **publics** ; les contrats filtrent les projections mais ne rendent pas le dépôt privé. Ne pas élargir la publication des données Santé.
- **Garmin MCP bêta :** aucune création, mise à jour, programmation ou envoi sans demande explicite de l'utilisateur **pour les dates exactes**. Une modification du site ou du programme n'est pas un ordre Garmin.
- **Renfo futur :** choisir exclusivement des mouvements officiellement vérifiés du catalogue Garmin, adaptés au matériel domestique réellement confirmé et à la tolérance ; animations montre facultatives. Rien à réécrire rétroactivement sans nécessité.
- **Diagnostic :** les douleurs, l'incertitude et les avis professionnels restent distincts des sollicitations anatomiques usuelles. Adapter ou reporter si les symptômes le justifient, sans conclure à une guérison depuis un essai ponctuel.

## 6. Reprise / historique

- **Entrée active pour toutes les casquettes :** `AGENTS.md` → ce document → sources métiers pertinentes → tests et publication.
- **Architecture et rôles :** `docs/ROLES.md`, `docs/CONTRAT-CONTINUITE-COACH.md`, `docs/REPRISE.md` ; anciens textes conservés, mais les chemins `personnel/` sont historiques sous V2.
- **Historique métier complet :** `domaines/coaching/donnees/CONTEXTE-COACH.md`, `DECISIONS.md`, `JOURNAL.md` et les domaines Planification/Activités/Santé ; ne jamais déplacer ou résumer ces sources au point d'en perdre une nuance.
