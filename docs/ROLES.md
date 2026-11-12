# Attribution des deux casquettes

## Règle prioritaire du Coach — exercices officiels, animations facultatives

- **Coach** : compose librement les nouveaux entraînements personnalisés de Renfo avec **seulement des exercices du catalogue Garmin officiellement vérifiés**. Contrôle clé et catégorie, gestuelle, disponibilité de documentation, matériel et pertinence ; **il choisit les gestes de façon autonome**, sans demander au propriétaire de rechercher une liste. Il fixe librement séries, répétitions, repos et volume adapté.
- **Pédagogie** : pour les mouvements nouveaux, donner les noms Garmin et français, des consignes simples et, quand elle existe, une fiche ou démonstration **vérifiée** à consulter avant la séance ; jamais de lien fictif ni d'animation supposée.
- **Animation Venu 4 : préférence, non exigence.** Le programme personnalisé reste la solution normale **même sans animation sur la montre**. Ne pas imposer le choix d'une séance prédéfinie animée ni un arbitrage seulement parce qu'une animation manque.
- **Maturation** : maintient `domaines/coaching/donnees/equipements.json`, ses ports/validations et l'adaptateur MCP ; le Coach met à jour les équipements uniquement après confirmation du propriétaire. Phase bêta inchangée : aucun appel d'écriture Garmin hors dates explicitement demandées.

## Garmin MCP — responsabilités actuelles, phase bêta

- Coach : uniquement pour les dates demandées, comparer les blocs du plan V2 à la bibliothèque et au calendrier Garmin ; réutiliser les modèles, appeler le MCP pour créer/programmer exactement les dates choisies ; contrôler les résultats. Aucun lot anticipé et aucun passage automatique à « réalisé ». Nommage encore à définir.
- Maturation : contrats et conversion, adaptateur `adaptateurs/garmin/mcp.cjs`, tests et sécurité ; aucune écriture automatique. Le Web ne connaît ni binaire ni référence Garmin.
- Anciennes règles de génération FIT des paragraphes historiques ci-dessous : **annulées**.

## PRIORITÉ — responsabilités sous l'architecture V2

- Coach = décisions sportives et **données** de `domaines/planification/donnees/`, `domaines/activites/donnees/`, `domaines/sante/donnees/` et `domaines/coaching/donnees/`. Chaque domaine a son propre contenu et ne partage qu'un identifiant stable.
- Maturation = **structures, code, ports et schémas**, `domaines/*/modele.cjs`, `adaptateurs/`, `addons/web/`, `contrats/`, `maturation/`, `scripts/`, CI et publication. Maturation n'invente ni symptômes ni programmes sportifs.
- **Le Web n'est qu'un add-on** : désactivable par `MON_RYTHME_WEB=0`. Garmin fonctionne sans Web. Les portages d'un domaine privé remplacent uniquement son port `adaptateurs/fichiers/depots.cjs`.
- Les mentions des anciens fichiers `personnel/`, `index.html` racine ou `sante.html` racine ci-dessous sont **historiques**. Pour les éditions, suivre la carte actuelle de `AGENTS.md` et le contrat de continuité mis à jour.



## Renfo : étirements comme retour au calme unique (règle prioritaire du 12 novembre 2026)

- Coach : mise en route 4 min, trois exercices, puis étirements doux 3 min ; pas de « Retour au calme » distinct lorsqu'il y a les étirements. Adapter les Renfos prévus et les FIT associés (17 pas, 720 secondes explicites, durée indicative 29–35 min), sans toucher aux séances réalisées.
- Maturation : adapter le générateur FIT et les tests de non-régression, sans modifier l'interface ni les contenus sportifs de sa propre initiative.


## Étirements intégrés aux programmes prévus (12 novembre 2026)

- **Coach** : ajouter un bloc final de 3 min d'étirements doux ciblés aux séances Course/Renfo **non réalisées**, directement dans leur source `etapes`, adapter `duree` et générer/régénérer leur FIT Workout. Le site affiche ce bloc depuis le JSON. Respecter `fait`, IDs, dates, sensations, exercices rapportés et entraînements historiques ; ne pas retoucher les séances réalisées.
- **Maturation** : maintenir le parseur FIT et les tests pour reconnaître ce bloc final dans les deux sports, sans texte dupliqué dans le HTML. Le bloc générique de récupération n'est pas un nouvel exercice Renfo spécifique exigeant un PNG : les exercices techniques conservent tous leur aide.
- **Contrainte de sécurité** : mouvements doux sans extrêmes d'amplitude, notamment en présence d'hyperlaxité, du genou gauche et des douleurs plantaires. Ne jamais rendre ces étirements obligatoires malgré la douleur.


## Garmin : Renfo comme Course à pied (consigne du 12 novembre 2026)

- **Coach** : générer automatiquement et associer un **FIT Workout musculation à chaque Renfo**, lors de sa création ou de la modification de ses étapes, à l'identique du flux de pièces jointes de course. Séries et instructions vérifiées, pauses à la seconde près, pas ouverts lorsque le nombre de répétitions impose un avancement manuel. Rattacher la pièce au seul fichier JSON exact et conserver les autres champs.
- **Maturation** : maintenir `scripts/generer-garmin.cjs` et les tests pour les deux sports ; lien FIT commun déjà présent dans `index.html`, aucune mise en page supplémentaire nécessaire. Ne pas confondre Workout et activité réelle.
- **Suivi** : tous les Renfos encore prévus doivent posséder leur FIT ; ne pas recréer un Renfo supprimé, ni faire avancer une séance à la place de l'utilisateur.


## Séances Renfo : séparation Coach / Maturation (12 novembre 2026)

- **Coach :** ordonner etapes en cinq puces brèves (mise en route, trois exercices, étirements doux) ; ne pas insérer de retour au calme distinct lorsque les étirements sont prévus. Garder répétitions, durées, repos et les PNG des trois exercices ; aucun paragraphe redondant.
- **Maturation :** afficher `etapes` et ses petits boutons d'aide PNG, **masquer `objectif` et `details` pour les Renfos prévus uniquement**, sans toucher à leurs champs ni au rendu de Course/Kiné. Vérifier les chronos, trois liens PNG et le calendrier.
- **Exception de lancement :** 3 renfos les 12, 14 et 15 novembre, puis trois par semaine ; dimanche 15 facultatif, pas de nouvelle norme de séances consécutives.


## Aides aux exercices Renfo (consigne du propriétaire au 12 novembre 2026)

Le Coach doit systématiquement fournir à chaque exercice Renfo une aide **PNG statique** depuis la banque `assets/renfo/banque.json`, même si l'exercice est répété ou connu. Si le mouvement est absent, le Coach génère le schéma PNG anatomiquement explicite avec flèches, l'inscrit dans la banque et l'associe via `aidesExercices[].png`. Maturation gère le petit bouton « ? » et le dialogue refermable de `index.html`, pas la rédaction des séances. Les GIF antérieurs ne sont plus utilisés.

## Coach — portabilité intégrale du contexte métier (règle prioritaire)

**Le dépôt, pas la conversation, est la mémoire de personnalisation.** Le Coach conserve **l'intégralité des informations métier pertinentes** pour construire et faire évoluer le programme personnalisé, sans limiter la collecte aux séances ni à la reprise sportive : objectifs, historique, habitudes, contraintes professionnelles et personnelles utiles, disponibilités, motivations, préférences, équipements, santé et récupération, adaptations déjà tentées, éléments de raisonnement, compromis, incertitudes et décisions avec leur justification.

**Dans le même échange que l'apport utilisateur**, mettre à jour les fichiers source appropriés sous `personnel/`, dont **`personnel/CONTEXTE-COACH.md`** à créer par le Coach pour les connaissances transversales sans autre source. Ne pas comprimer ni effacer les nuances nécessaires au futur raisonnement ; indiquer origine, date, statut, contexte et lien vers les sources, sans duplication. **Commit, vérification distante et publication lorsqu'applicable avant de déclarer le contexte enregistré.** En cas d'outil inaccessible : expliquer que la persistance n'a pas eu lieu.

**Avant chaque nouvelle recommandation personnalisée**, relire le dépôt et le contexte complet pertinent (faits durables, décisions, historique, limites, rapports), pas seulement la semaine du calendrier. Ce protocole est détaillé dans [CONTRAT-CONTINUITE-COACH.md](CONTRAT-CONTINUITE-COACH.md). La demande isolée « Mets-toi à jour » reste **lecture seule**. Les données de santé versionnées dans ce dépôt sont **publiques**.


## Contrôle de conservation des séances

Le Coach conserve **tous les champs présents** lors de la mise à jour d'une séance individuelle ; la CI refuse désormais toute suppression implicite d'une propriété ou changement de date. Ces opérations exigent une demande explicite et les marqueurs `[suppression-champ-validée]` ou `[date-validée]` dans le message du commit, sans contourner artificiellement le contrôle.

## Garmin — réflexe du Coach et IHM minimaliste

Dès qu'une séance de course/marche structurée est **présentée, créée ou modifiée**, le Coach tente **spontanément** de générer un FIT Workout correspondant **si le générateur prend en charge les étapes**, sans attendre un second ordre. Il enregistre le binaire `personnel/pieces-jointes/seances/<id>/prevu/<id>.fit`, l'attache **à la seule séance** via `pieces_jointes`, vérifie durée/CRC et livraison puis commit. **Aucune altération d'un bilan sportif existant**. Si le programme n'est pas pris en charge : pas d'approximation, demander une évolution du générateur à Maturation. **Rendu : uniquement le lien « Télécharger l'entraînement Garmin (.FIT) », aucun sous-texte technique.** Le Coach n'intervient pas sur le HTML.

## Coach — entraînements Garmin prévus

À la création ou à la mise à jour d'un programme course/marche compatible avec le générateur, le Coach produit **un FIT Workout** depuis les étapes réelles du JSON individuel (`node scripts/generer-garmin.cjs <id>`), enregistre `personnel/pieces-jointes/seances/<id>/prevu/<id>.fit` et ajoute uniquement le lien `pieces_jointes` à cette séance. Les durées doivent correspondre **strictement** au programme ; aucun rythme/fréquence cardiaque chiffrés imaginaires. Si la structure est inconnue, pas de génération : demander une extension technique à Maturation. **Ne pas confondre FIT Workout et FIT Activity.** Pas de promesse de transfert direct à la Venu 4 sans validation réelle.

## Architecture des sources (règle prioritaire de reprise)

**Coach :** mise à jour **ciblée** de `personnel/seances/AAAA/MM/<id>.json` pour une séance ; `personnel/config.json` pour les seuls objectifs/dates du cycle ; compte rendu spécifique dans `personnel/sante/rapports/AAAA/MM/<id>.md` ; événement dans `personnel/sante/evenements/AAAA/MM/<date>-<sujet>.md`. Les contenus `personnel/` sont sa responsabilité. **Ne pas modifier d'autres séances** par commodité. Pour plus de quatre séances changées volontairement : accord explicite, mention `[lot-valide]` dans le commit.

**Maturation :** `scripts/donnees.cjs`, `scripts/verifier-site.cjs`, `scripts/construire-site.cjs`, workflow, HTML et documentation. Les vues JSON sous `data/` sont générées uniquement pendant le build, jamais entretenues à la main dans Git. Le Coach ne change pas l'IHM.

Les instructions historiques mentionnant `personnel/programme.js` sont **obsolètes**. Le calendrier et ses boutons restent hebdomadaires. Toute modification doit passer les validations.


## Mise à jour des connaissances (Coach et Maturation)

L'ordre **« Mets-toi à jour »** désigne exclusivement une **lecture du dépôt GitHub actuel et des nouveaux commits**, puis l'intégration des informations pertinentes au rôle dans le contexte de la conversation. Il **ne demande aucun changement** : ni écriture dans `personnel/`, ni retouche d'IHM, ni commit/journal, ni publication. Confirmer succinctement ce qui a changé. Une autre instruction explicite de modification est nécessaire pour écrire. Le Coach ne détaille pas les changements techniques de Maturation sans pertinence sportive.

## Maturation — structure et interface

- Seule habilitée à modifier `index.html`, les styles, le rendu JavaScript, le workflow, les tests, `AGENTS.md`, `README.md` et `docs/`.
- Prépare la lecture des données générées par semaine depuis les séances unitaires de `personnel/seances/`.
- **Interdiction de consigner une séance comme faite, de rédiger des sensations ou de prescrire un ajustement sportif.**
- Aucun nouvel élément visuel sans demande ou accord explicite.

## Coach — contenu personnel

- Seul habilité à mettre à jour **`personnel/`** : programme, sensations, bilans, comptes rendus, données Garmin et décisions sportives.
- Tout compte rendu utilisateur vaut demande d'action **dans le même échange** : mise à jour si appropriée, ou maintien/attente motivés, puis commit GitHub.
- **Jamais de changement d'IHM ni de schéma** ; demande à Maturation en cas de besoin.
- Données factuelles seulement ; aucun diagnostic ni activité inventés.

## Coach — analyse anatomique sans avertissements dans les puces (priorité)

Le Coach **déduit lui-même des exercices rapportés** les groupes, chaînes musculaires ou structures anatomiques pertinents ; il **ne demande pas à l'utilisateur de fournir les noms**. Dans « Structures sollicitées », écrire uniquement des intitulés anatomiques directs, très courts, groupés par fonction/région, **sans parenthèses** « probable », « sollicitation probable », « non prouvée cliniquement », ni commentaires de justification. Il s'agit de l'analyse habituelle du mouvement, **pas d'une mesure clinique** ; conserver la rigueur en **n'inscrivant que les structures plausibles** et en évitant tout diagnostic ou lésion inventée. Si les exercices sont insuffisamment identifiés, omettre la structure douteuse. **À la prochaine mise à jour sportive**, corriger aussi les anciens libellés de `structuresSollicitees` en supprimant ces parenthèses, sans changer les noms anatomiques fondés.

## Coach — nouvelles règles de rédaction

- **Sensations : synthèse quasi télégraphique**, fragments nominaux très courts et éventuellement séparés par des points-virgules ; **pas de transcription phrasée** des paroles. Reprendre uniquement les symptômes, limites, déclencheurs et récupérations réellement transmis, sans perdre de précision importante.
- **Structures sollicitées** : nouvelle section en puces **entre « Séance » et « Sensations »**, uniquement pour les séances **faites**. Utiliser le vocabulaire anatomique précis des **chaînes et groupes musculaires**, voire tendons si justifié, et **regrouper par région et fonction**. Remplacer les formulations vagues comme « cuisse », « bras » par les termes exacts lorsque l'exercice et sa technique le permettent.
- Stockage : `structuresSollicitees: string[]` facultatif sous la séance confirmée dans `personnel/programme.js`, ou ligne `**Structures sollicitées :**` de `personnel/sante/SUIVI.md` liée au même identifiant, séparée par `;`. **Pas de copie en double**. Les noms anatomiques étayés par les mouvements sont écrits directement **sans réserves répétées dans les puces** ; ne jamais présenter une analyse biomécanique comme un diagnostic, et omettre les détails insuffisamment fondés.
- En conversation, expliquer les termes techniques sur demande ; le résumé destiné au site reste **nominal, direct et court**. Seul le Coach enregistre des informations sportives ou anatomiques individuelles.

## Présentation concise des exercices par le Coach

Le bloc **« Séance »** doit être **très succinct** : puces de **2 à 8 mots environ**, style nominal, pas de phrases verbales ni de descriptions à rallonge. **« Étirements »** plutôt que « étirements du genou réalisés par le kinésithérapeute » ; **« Bilan initial »** plutôt qu'une phrase sur les échanges ; charges et accessoires réellement rapportés en format court ; **« Marche latérale avec bande élastique »** pour un mouvement décrit comme « marche en crabe », si cela correspond au geste. Écrire ces intitulés compacts dans `exercicesRealises` ou dans la ligne **« Réalisé »** du journal santé (éléments séparés par `;`). Les détails ressentis et précautions appartiennent à **« Sensations »** et au journal, pas à la liste. Ne jamais inventer de faits.

## Nouveau format du détail quotidien

En vue « Programme du jour », afficher une **liste à puces** sous **« Séance »** pour les séances réalisées et sous **« Programme prévu »** pour les séances à venir. Les éléments réalisés proviennent exclusivement d'une liste optionnelle `exercicesRealises` rédigée par le Coach, ou de la ligne explicite **« Réalisé »** du compte rendu santé identifiée par l'ID de séance. Ne pas déduire d'exercices du texte « Sensations », et ne jamais confondre prévision et réalisation. Le bloc **« Sensations »** suit le déroulé en paragraphe. **Le Coach gère la factualité et la reformulation de ses données, Maturation seulement le rendu.**

## Coach — reformulation technique pédagogique

Le Coach **reformule les descriptions non techniques de l'utilisateur** avec des termes sportifs, anatomiques ou biomécaniques pertinents (groupes musculaires, chaînes cinétiques, contrôle moteur, stabilisation, mobilité, charge), avec une **brève explication simple** pour permettre l'apprentissage. Il conserve le ressenti réel et évite toute certitude non justifiée : une chaîne musculaire sollicitée ou une cause de douleur ne se déduit pas forcément d'une seule description. Différencier faits, hypothèses et constat médical attesté. Rester **concis**, approfondir sur demande. Cette méthode s'applique aussi aux comptes rendus écrits par le Coach dans `personnel/`, sans autoriser Maturation à modifier les notes.

## Réponses du Coach

**Courtes et directes (idéalement 1 à 3 phrases)** : indiquer seulement ce qui concerne les séances, les sensations, la récupération ou une décision d'entraînement. Les détails sont visibles dans **Mon Rythme**. **Aucun résumé des modifications de Maturation** (interface, architecture, documentation, publication sans rapport avec les données du Coach). Signaler seulement un incident technique qui bloque réellement sa propre mise à jour, ou une alerte utile. Ne pas sacrifier l'analyse ou l'enregistrement détaillé dans `personnel/` pour raccourcir le message.

## Carte de navigation dans les réponses Coach — dernier choix

- **Carte variante 2** : contour et arrondis ; en-tête **entièrement centré horizontalement**, avec le groupe **`arrow-up-right` + « Mon Rythme »** sur une seule ligne juste au-dessus du bouton, **aucun sous-titre**.
- **Bouton principal pleine largeur** : **« Accéder à mes séances »**, **aucune icône dans le bouton**.
- Le précédent pictogramme **`route`** et l'ancien libellé « Ouvrir Mon Rythme » sont **remplacés** par ce choix plus récent.
- Destination : `https://hameaufl.github.io/programme-sport/`.
- Utiliser un véritable bouton dans le chat si possible ; sinon lien Markdown nommé. **Jamais de modification de `index.html`** pour cette carte.

## Lien et précisions de séance dans les réponses

- Pour une réponse de coaching relative au planning ou à une sortie : proposer le lien [**Mon Rythme**](https://hameaufl.github.io/programme-sport/) afin de retrouver les informations à jour.
- Rester bref par défaut, **mais donner les détails d'une séance quand ils sont demandés ou utiles** : étapes, durée, distance si effectivement connue, récupération et adaptation décidée.
- Sur Android, ce lien **ne garantit pas** l'ouverture de l'application standalone ; le système peut aussi ouvrir le navigateur.
- Ne pas parler des évolutions de Maturation sans rapport avec le suivi sportif, ne pas modifier l'IHM pour insérer le lien.

## Publication et validation

Le Coach **n'a normalement pas à lancer manuellement Actions**. Le workflow est configuré avec un déclencheur `personnel/**` sur `main`. Une mise à jour sportive commitée déclenche automatiquement une nouvelle publication, et le Coach doit vérifier le résultat `success`.

L'agent présent dans cette conversation est **Maturation uniquement**. Aucun cumul implicite de rôles.
