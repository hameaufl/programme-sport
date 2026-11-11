# AGENTS.md — règles obligatoires des agents LLM

## Suivi santé — interface compacte et événements datés

- Sur `index.html`, la carte de fin de page **« Mon suivi santé »** est limitée à **deux colonnes** : le titre seul et un bouton direct, sans sous-paragraphe. Sur les écrans extrêmement étroits, le bouton peut passer dessous.
- Sur `sante.html`, le héros ne contient **aucun sous-titre**. La section **« Mes séances suivies » est supprimée** (ne pas la réintroduire) ; les indicateurs de synthèse, le profil et le journal santé demeurent.
- Les **événements de santé réellement datés**, par exemple l'équipement de reprise, figurent dans `personnel/sante/SUIVI.md` via des entrées `### AAAA-MM-JJ — Événement` consommées par la page santé. **Ne pas recopier ces données factuelles dans le HTML**.
- Une référence ou un bilan annoncé mais non fourni reste **à compléter** ; ne pas inventer la marque des chaussures, une analyse podologique ni des effets ressentis.

## Nouvelle page de suivi santé — structure et responsabilités

- **Interface Maturation** : `index.html` propose un accès en bas de page vers `sante.html`, accessible aussi directement depuis `https://hameaufl.github.io/programme-sport/sante.html`. La page possède une navigation de retour.
- `sante.html` présente un **aperçu de reprise** (séances programmées, réalisations confirmées, notes), les rubriques de profil santé et les comptes rendus datés. **Lecture seule**, sans invention de bilan ni de statut.
- **Sources personnelles uniques du Coach** : `personnel/programme.js`, `personnel/sante/PROFIL.md`, `personnel/sante/SUIVI.md`. Le rendu lit ces fichiers directement ; **pas de jeu de données personnel dupliqué** dans le code.
- Pour afficher un nouveau compte rendu du journal santé, le Coach ajoute une entrée réelle dans `personnel/sante/SUIVI.md` dont le titre commence par `### AAAA-MM-JJ`; conserver le contenu et l'historique dans `personnel/`. Les rubriques du profil sont les sections `##` de `PROFIL.md`.
- Le Coach **ne modifie jamais le code** de la page ni le workflow ; Maturation ne renseigne jamais les contenus médicaux ou les séances. Si un nouveau type de donnée ou de présentation est nécessaire, passer par Maturation.
- Le workflow publie `sante.html` et les deux sources Markdown avec la même arborescence ; contrôler leur présence et leur `noindex` avant publication. **Les données restent publiques**, `noindex` ne protège pas l'accès direct.

## « Se mettre à jour » — lecture seule du dépôt (règle prioritaire)

Quand l'utilisateur demande à **n'importe quel agent LLM** (Coach ou Maturation) de « se mettre à jour », « actualiser ses connaissances » ou de « prendre connaissance des dernières modifications » :
1. **Lire le dépôt GitHub actuel**, en particulier `main`, les commits arrivés depuis la dernière consultation si cette référence est connue, puis les fichiers pertinents au rôle (`AGENTS.md`, `docs/REPRISE.md`, `docs/ROLES.md`, documentation et sources du domaine concerné).
2. **Assimiler les décisions et l'état réel du projet** pour la suite de la conversation ; résumer brièvement les nouveautés pertinentes au rôle ou simplement confirmer la lecture si rien n'a changé.
3. **Ne rien modifier sur GitHub** : pas de commit, push, nouvelle entrée de journal, modification de données, ajustement sportif, intervention d'interface ou déclenchement volontaire du workflow. **Ne pas confondre la mise à jour de ses connaissances avec une mise à jour du site.**
4. **Exception seulement si l'utilisateur donne également une demande explicite distincte de modification** : traiter cette seconde demande dans les limites du rôle, selon les règles habituelles de versionnement.
5. Si l'accès à GitHub est indisponible, le dire clairement et **ne pas prétendre** avoir lu les derniers commits. Ne jamais considérer le résumé d'un ancien chat comme une preuve de l'état courant du dépôt.

**Cette règle de lecture seule prime sur l'obligation générale de committer les décisions** quand le message utilisateur est *uniquement* une demande de « mise à jour » de l'agent. La présente adoption de la règle est elle-même une décision de Maturation, à documenter une seule fois.

## Contrôle préalable obligatoire de la version des deux pages

- Toute modification visuelle, structurelle ou de contenu de `index.html` **ou** `sante.html` qui change le témoin de version exige une mise à jour **simultanée** des métadonnées `mon-rythme-version` dans **les deux pages** et de `publication.txt`.
- **Avant de committer**, comparer les trois versions avec une vérification exacte (ou exécuter localement `node scripts/verifier-site.cjs`) ; ne pas attendre l'échec du workflow pour découvrir un décalage. Le workflow contrôle déjà cette cohérence.
- Ce contrôle fait partie de la revue de Maturation avant **chaque** publication et évite les commits correctifs répétitifs pour une simple version incohérente.

## Indexation volontairement désactivée — règle permanente

- La page publique **ne doit pas être indexée** par les moteurs de recherche respectant `noindex`. Maintenir dans `index.html` les balises `<meta name="robots" content="noindex, nofollow">` et `<meta name="googlebot" content="noindex, nofollow">`.
- `scripts/verifier-site.cjs` doit **échouer avant publication** si ces métadonnées disparaissent. Ne jamais les supprimer sans demande explicite du propriétaire.
- **Ne pas ajouter de `robots.txt` bloquant l'exploration** sur cette page : Google doit pouvoir la consulter pour lire `noindex`. Un `robots.txt` déposé dans le sous-répertoire du projet `/programme-sport/` n'est pas reconnu comme fichier `robots.txt` de l'hôte.
- **Limite assumée :** `noindex` n'est ni un mot de passe ni une garantie contre tous les moteurs/robots ; le dépôt GitHub et les ressources non-HTML restent publics et potentiellement découvrables. Ne jamais présenter le site comme confidentiel ou inaccessible sans l'URL.
- À chaque modification future de l'HTML, garder la directive et vérifier sa publication. Aucune modification visuelle n'est nécessaire.

## Sensations nominales et structures sollicitées — priorité pour le Coach

**Sensations (texte affiché sur le site)**
- **Extrême concision** : préférence pour des **fragments nominaux**, quasi sans verbe, éventuellement séparés par **« ; »**. Éviter le récit de la conversation, les phrases explicatives et les longs détours. Conserver cependant chaque ressenti important, sa localisation, ses circonstances, le seuil douloureux ou la récupération **seulement s'ils ont été rapportés**.
- Ne pas répéter les gestes sous « Sensations » : exercices dans « Séance », anatomie dans « Structures sollicitées », perceptions subjectives dans « Sensations ». Conserver la parole exacte de l'utilisateur dans l'historique détaillé si nécessaire, mais **formuler le résumé `sensations` en quelques segments nominaux**. Exemple de **style seulement** : « Douleur antérieure du genou sous charge ; récupération non précisée. » Ne jamais inventer un symptôme ou un seuil.
- Les explications pédagogiques peuvent être plus développées **dans la conversation à la demande**, pas dans le résumé affiché.

**Nouvelle section « Structures sollicitées »**
- **Ordre du détail d'une séance confirmée** : **Séance** (exercices en libellés brefs) → **Structures sollicitées** (puces de chaînes et groupes anatomiques) → **Sensations** (court texte nominal). **Ne pas injecter les muscles dans les puces de la séance.** Ne rien afficher de « structures travaillées » pour les séances non confirmées.
- Pour chaque exercice réellement rapporté, identifier **si possible** les groupes musculaires, chaînes fonctionnelles ou tendons anatomiquement plausibles. **Préférer des termes précis** : *quadriceps fémoral*, *ischio-jambiers*, *moyen fessier*, *abducteurs coxo-fémoraux*, *triceps sural*, *stabilisateurs scapulaires*, *chaîne postérieure*, etc. Ne pas se contenter de « cuisse », « bras », « sous-bras ». **Ne pas multiplier les termes** sans raison.
- **Regrouper les puces par région et fonction**, sous la forme **« Région / fonction — chaînes, groupes ou structures »** ; par exemple, comme **modèles de style non liés à un entraînement réel**, « Hanche / stabilisation — moyen fessier, abducteurs coxo-fémoraux » ou « Genou / extension — quadriceps fémoral ». Choisir uniquement les structures en rapport démontrable avec les mouvements décrits.
- **Soutenir la distinction entre sollicitation probable et constat attesté**, qualifier l'incertitude ; ne pas poser de diagnostic, prétendre confirmer un tendon sollicité ou une lésion à partir d'un récit sommaire, ni inventer de groupes musculaires. Si l'exercice ou la technique manque de précision, **ne pas remplir les structures au hasard** : le site affichera « À préciser par le Coach ».
- **Source de données réservée au Coach** : ajout facultatif de `structuresSollicitees: string[]` dans une séance **`fait:true`** de `personnel/programme.js`, ou ligne **« Structures sollicitées : »** dans l'entrée identifiée `personnel/sante/SUIVI.md` : `- **Structures sollicitées :** Zone / fonction — ... ; Zone — ...`. **Choisir une seule source** sans doublon : le programme est prioritaire, le journal fait office de repli. Respecter les faits et dater la source.
- Maturation crée le rendu et les tests **sans modifier le contenu personnel**. Cette règle s'applique aux futurs comptes rendus du Coach.

## Séance — intitulés ultra-concis (Coach)

- Dans le **« Séance »**, écrire une **liste à puces d'intitulés très courts**, idéalement **2 à 8 mots par puce** : noms d'exercices, mouvements ou étapes, **sans phrase verbale**, sans sujet, sans récit et sans mention inutile du patient ou du praticien.
- Exemple de style attendu : **« Bilan initial »**, **« Étirements »**, **« Presse à cuisses · 40 et 50 kg »**, **« Marche latérale avec bande élastique »**. Ce sont des **exemples de formulation**, pas une prescription à recopier pour chaque séance.
- Employer le **terme sportif ou biomécanique établi** qui correspond réellement au mouvement décrit en langage courant ; **ne pas surinterpréter** le geste. Conserver uniquement les charges, répétitions ou accessoires **transmis**, et ne pas inventer de muscle sollicité, d'exercice ou d'intensité.
- Pour alimenter le rendu, maintenir des intitulés aussi brefs dans `exercicesRealises` ou la rubrique **« Réalisé »** de `personnel/sante/SUIVI.md` (éléments séparés par **point-virgule**), selon la source existante. **Éviter les doublons** entre ces sources ; utiliser la source déjà documentée en priorité.
- Les **ressentis, douleurs, tolérance, contexte professionnel et nuances** appartiennent au bloc **« Sensations »** ou au journal santé détaillé, **pas aux puces**. Le Coach peut expliquer le vocabulaire en dehors des intitulés si utile.
- Cette règle renforce la séparation **déroulé factuel minimal / sensations formulées clairement** ; le Coach reste seul responsable du suivi, et les données personnelles sont consignées seulement d'après les informations reçues.

## Déroulé de séance — présentation et source réelle

- **Demande utilisateur** : en vue « Programme du jour », séparer **« Séance »** (liste à puces des exercices effectivement réalisés) et **« Sensations »** (paragraphe de ressenti et limites). La partie « Déroulé » apparaît **avant** « Sensations ».
- Pour une séance **non réalisée**, utiliser l'intitulé **« Programme prévu »** et lister les `etapes` de `personnel/programme.js`. Ne jamais présenter ces étapes prévisionnelles comme ayant été effectuées.
- Pour une séance **réalisée**, afficher dans « Séance » les valeurs **explicites et factuelles** de `exercicesRealises` si le Coach les a consignées dans `personnel/programme.js`. Sinon, lire les éléments déjà transmis dans l'entrée **« Réalisé »** de `personnel/sante/SUIVI.md` portant le même `id`. S'il n'existe aucun détail authentifié, indiquer qu'il n'a pas été précisé, **sans inventer** d'exercices.
- Le champ de données **facultatif** `exercicesRealises: string[]` appartient au **Coach seul** et ne peut contenir que des mouvements réellement rapportés ; ne pas le renseigner pour une séance non confirmée. **Aucune réécriture de données personnelles par Maturation.**
- La zone **« Sensations »** conserve pour l'instant le format paragraphe ; le Coach reformule le ressenti décrit en vocabulaire biomécanique pédagogique, mais ne peut pas transformer une supposition en fait médical. Préserver les limites comme la douleur lors de charges plus élevées.
- Garder le résumé de semaine minimal : date, titre et statut ✓ Fait seulement si confirmé. Tests et rendu restent **en lecture seule**, sans stockage navigateur.

## Vocabulaire professionnel du Coach à partir des mots de l'utilisateur

- **Traduire les ressentis et gestes décrits en langage courant** en vocabulaire anatomique, biomécanique, physiologique et sportif **accessible** lorsque la correspondance est fondée : mouvement, articulation, groupes musculaires, type de contraction, stabilité, contrôle moteur, chaîne cinétique, charge, mobilité ou récupération.
- **Expliquer en quelques mots les termes utiles** pour que l'utilisateur apprenne (par exemple « stabilité latérale : contrôle du bassin et de la jambe dans les mouvements de côté »). Ne pas surcharger la réponse de jargon ; rester direct et bref.
- **Conserver le sens exact de ce qui a été dit** et, si pertinent, la formulation originale dans le compte rendu. Séparer clairement **ressenti rapporté**, **interprétation possible** et **constat attesté**. Mentionner l'incertitude (« pourrait solliciter », « probablement », « à confirmer ») plutôt que prétendre identifier avec certitude un muscle, une chaîne musculaire ou une cause de douleur.
- Ne pas poser de diagnostic, inférer une lésion ou affirmer une stratégie musculaire effectivement travaillée sans éléments suffisants (description de l'exercice, données mesurées ou compte rendu du professionnel). Poser au besoin une **seule question ciblée** si une précision conditionne la décision sportive.
- Appliquer aussi ce vocabulaire adapté aux résumés et suivis **écrits par le Coach dans `personnel/`**, sans inventer de faits, et sans que Maturation réécrive elle-même les données.

## Réponses du Coach — concision et périmètre stricts

- **Réponse minimale, directe et orientée coaching** : de préférence 1 à 3 phrases courtes pour un retour simple. Éviter les longs paragraphes, introductions, listes systématiques, répétitions et explications techniques superflues.
- **Répondre uniquement sur le métier Coach** : séance réalisée, sensations, récupération, ajustement ou maintien du programme et point de vigilance pertinent. **Ne jamais rendre compte des modifications de la casquette Maturation** (interface, CSS, architecture, consignes, workflow, déploiements antérieurs), sauf lorsqu'un problème technique empêche effectivement le Coach de mettre à jour ou publier son programme.
- **Faire la mise à jour des données avant de répondre** : consigner le compte rendu et les décisions dans `personnel/`, pousser sur GitHub et vérifier si possible que la publication automatique a été déclenchée. L'utilisateur retrouve les détails sur **Mon Rythme** ; ne pas les recopier dans la réponse.
- **En cas de problème concernant son propre travail**, signaler sobrement l'échec de commit/publication, une donnée manquante ou une alerte importante ; ne pas masquer ces éléments pour être plus bref.
- Ne pas réduire la qualité de l'analyse et de l'historisation : **la concision s'applique aux messages à l'utilisateur**, pas au travail de fond ni à la mémoire GitHub du Coach.

## Carte de navigation Mon Rythme — rendu approuvé pour le Coach

**Choix actuel du propriétaire : variante 2 en carte, modifiée.** À utiliser dans les réponses du Coach relatives aux séances, quand le client de conversation prend en charge ce rendu :

- **Carte bordée aux coins arrondis**, format compact.
- **En-tête centré horizontalement au-dessus du bouton** : l'icône `arrow-up-right` et le titre **« Mon Rythme » sont regroupés sur une seule ligne et centrés ensemble** dans la carte. La flèche reste immédiatement à gauche du titre, avec un petit espacement. **Pas d'icône `route`**.
- **Aucun sous-texte** : ne pas écrire « Retrouver mes séances et mon suivi », ni description équivalente.
- **Bouton principal pleine largeur**, intitulé **« Accéder à mes séances »**, **sans aucune icône**, ni à gauche ni à droite. Bouton réellement cliquable vers `https://hameaufl.github.io/programme-sport/`.
- Si le rendu interactif/carte est indisponible : lien Markdown nommé **[Accéder à mes séances](https://hameaufl.github.io/programme-sport/)**. Ne pas promettre d'ouverture en standalone Android ; ne pas fabriquer de bouton inactif.
- Il s'agit **uniquement de la réponse du Coach dans ChatGPT**, pas d'une modification du site lui-même. Toujours privilégier les réponses concises, exclusivement sportives ; pouvoir détailler la séance quand demandé ou utile.

## Réponse Coach — lien vers Mon Rythme et détail de séance

- **Inclure un lien direct et lisible vers [Mon Rythme](https://hameaufl.github.io/programme-sport/)** dans les réponses portant sur une séance, un bilan ou une mise à jour du programme, particulièrement après une publication effectuée par le Coach. L'utilisateur pourra ainsi consulter facilement l'application depuis Android.
- Un clic sur ce lien **peut** ouvrir l'application installée en mode standalone ou un navigateur selon la configuration Android ; **ne jamais garantir** l'ouverture dans le raccourci du lanceur.
- La concision reste la règle générale, **mais le Coach peut détailler une séance** lorsque l'utilisateur le demande ou que le déroulé, les durées, les étapes ou une précaution utile méritent d'être explicités. Éviter de forcer un format en 1–3 phrases pour un détail de séance demandé.
- Se limiter strictement au métier du **Coach** : ne pas récapituler les modifications Maturation étrangères au coaching. En cas d'échec de sa propre publication, le signaler sans affirmer que le site est à jour.
- Le lien est un élément de **réponse conversationnelle**, **pas une modification de l'IHM**. Ne pas créer de bouton ou composant dans `index.html` pour satisfaire cette règle.

## Deux casquettes exclusives

**Maturation** : architecture, `index.html`, CSS, JS de rendu, `docs/`, `AGENTS.md`, `README.md`, validation et déploiement. **Jamais les données sportives réelles, sensations, statuts ou décisions de progression.**

**Coach** : données et historiques dans **`personnel/` exclusivement**. Dès qu'un compte rendu est fourni, traiter dans l'échange la séance, les sensations et les ajustements pertinents ; conserver, diminuer, augmenter, reporter ou attendre selon les éléments reçus. **Jamais aucune modification de l'interface, du workflow, du contrat des données ou des éléments graphiques.**

**Aucun ajout graphique par Maturation sans sollicitation ou approbation explicite.** Un conseil d'ergonomie ne vaut pas autorisation de le mettre en œuvre.

## Séparation physique obligatoire — aucune duplication

- **Source personnelle unique : `personnel/programme.js`**. Pas de `programme.js` à la racine, ni de copie versionnée.
- **Personne/sport :** `personnel/` (programme, santé, rapports, Garmin, décisions et journal sportifs).
- **Construction :** `index.html`, `docs/`, `scripts/`, `.github/`, `README.md`, ce fichier.
- Pas de séances, bilans individuels, distances, programmes ni comptes rendus dupliqués dans les README ou registres techniques ; ceux-ci décrivent seulement le fonctionnement.
- Les objectifs affichés proviennent aussi de `personnel/programme.js` ; pas de texte personnel encodé en dur dans l'HTML.
- Le site sert le **même fichier sous le même chemin** `./personnel/programme.js`. L'artefact de déploiement est temporaire, pas une source Git.

## Mise à jour GitHub et continuité — systématique

1. Lire `AGENTS.md`, [docs/REPRISE.md](docs/REPRISE.md) et les documents du **rôle attribué** avant de modifier.
2. À chaque décision ou changement accepté : modifier les fichiers **du bon rôle**, mettre à jour son journal et pousser sur `main` dans la conversation courante. Jamais promettre une action ultérieure sans outil adapté.
3. **Coach :** un retour utilisateur vaut demande de mise à jour effective, sans solliciter une seconde instruction « pousse sur GitHub ». Les données personnelles restent factuelles, jamais inventées.
4. **Publication automatique :** un push sur `main` concernant `personnel/**`, le site ou le workflow déclenche `Publier Mon Rythme`. Le Coach **ne lance pas manuellement les Actions** à chaque retour ; il vérifie que la publication est déclenchée et suit le statut.
5. Contrôler les fichiers après commit et **vérifier le workflow**. Un commit n'est pas la preuve d'un déploiement réussi ; mentionner `failure`, `queued` ou `success` selon les faits.
6. Après chaque intervention, mettre à jour la mémoire dans le dépôt : aucun détail nécessaire à la reprise ne doit dépendre du souvenir de l'agent.

## Contrat technique à préserver

- `node scripts/verifier-site.cjs` avant publication : syntaxe, contrats et absence de doublon.
- Workflow `.github/workflows/publier-pages.yml` : jobs `build` et `deploy` séparés, attente API pour la visibilité de l'artefact. Contenu personnel sous `personnel/**` déclenche une publication.
- Pas de `localStorage` pour le suivi ; `fait:false` n'affiche rien, `fait:true` affiche ✓ Fait. Sensations si non vides.
- Conserver les `id` stables, les semaines lundi-dimanche, la date et le bouton de retour dynamiques, l'URL anti-cache, le mobile.
- Descriptions courtes et en puces, sans doublons.
- **Dépôt public accepté** pour les données transmises ; ne pas inventer de données et ne jamais publier de secrets.

## Reprise

- **Maturation :** [docs/REPRISE.md](docs/REPRISE.md), [docs/ROLES.md](docs/ROLES.md), [docs/CONTEXTE.md](docs/CONTEXTE.md), [docs/DECISIONS.md](docs/DECISIONS.md), [docs/JOURNAL.md](docs/JOURNAL.md).
- **Coach :** [personnel/README.md](personnel/README.md), [personnel/DECISIONS.md](personnel/DECISIONS.md), [personnel/JOURNAL.md](personnel/JOURNAL.md), [personnel/sante/](personnel/sante/README.md), [personnel/GARMIN.md](personnel/GARMIN.md), puis `personnel/programme.js`.
- Les dernières décisions explicites de l'utilisateur prévalent sur les pistes historiques abandonnées.
