# Planification — domaine métier autonome

Les fichiers `donnees/seances/AAAA/MM/<id>.json` décrivent uniquement les séances **prévues**, via des `blocs` structurés. `donnees/cycle.json` contient le début du cycle; `donnees/mouvements.json` les identifiants de mouvement et leurs titres métier. Aucun état réalisé, symptôme, PNG, chemin FIT ou information du navigateur ne doit figurer ici.

Les formats visibles (puces et durée) sont produits par `modele.cjs`. L'adaptateur Garmin MCP prépare ses opérations à partir des `blocs`, sans dépendre du Web. Aucun fichier d'entraînement local n'est généré ni publié ; toute création/programmation distante exige les dates explicitement demandées par l'utilisateur pendant la bêta. Toute séance `renfo` avec étirements se termine par ceux-ci, sans retour au calme supplémentaire. Les modifications de prescriptions sont du ressort du Coach; le modèle technique du ressort de Maturation.

## 12 novembre 2026 — Premier nouveau Renfo

14 anciennes prescriptions sorties du calendrier, chacune conservée **intégralement** en archive sous `archives/2026-11-12/`. Une seule séance nouvelle prévue provisoirement le 14 novembre, non réalisée, et à faire valider avant tout appel d'écriture Garmin. Ne pas relancer automatiquement le cycle antérieur.

## 12 novembre 2026 au soir — Rectification prioritaire du premier Renfo

Sur demande du propriétaire, le seul brouillon actif est déplacé du 14 au **12 novembre** (`renfo-2026-11-12`), sans être marqué réalisé ni créer de modèle Garmin. L'ancien fichier du brouillon 14 est archivé intégralement dans `domaines/planification/archives/2026-11-12/brouillon-renfo-2026-11-14-avant-report.json`. Mise en route dansée douce 5 min et étirements détaillés 3 min ; durée indicative 31–34 min. Les anciennes prescriptions archivées ainsi que les séances Course/Kiné et activités confirmées sont inchangées.

## 12 novembre 2026 au soir — Nouveau report du premier Renfo

La seule séance active est désormais `renfo-2026-11-13` (**vendredi 13 novembre**) au lieu du brouillon `renfo-2026-11-12`, conservé intégralement dans `domaines/planification/archives/2026-11-12/brouillon-renfo-2026-11-12-avant-report.json`. Échauffement libre de **4 min**, étirements doux de **3 min** sans vidéo fixée ; exercices et séries inchangés. Séance non réalisée et sans modèle Garmin créé. Une course existe déjà ce même jour et reste inchangée sous réserve d'un réexamen du confort à l'appui ; les archives et activités passées sont conservées.

## 12 novembre 2026 — Nom exact de l'entraînement à charger

Pour **toute séance associée à un modèle Garmin créé et relu**, enregistrer obligatoirement son nom textuel exact dans `nomEntrainementMontre` de la source Planification correspondante. La projection publique sous contrat `publication-v1.json` affiche alors le nom exact **dans le même titre que « Programme prévu »** : « Programme prévu · <nom> », sans seconde ligne ou paragraphe. Aucune référence chiffrée, aucun lien ni détail du modèle Garmin n'est publié ; le contrat privé n'expose pas ce nom. Le modèle canonique vérifie la validité du champ ; si aucun entraînement n'existe encore, **ne pas inventer de nom**. Les prescriptions restent intégrales dans les blocs métier et la programmation distante reste une action séparée soumise à autorisation.

## RÈGLE MÉTIER PRIORITAIRE — Nom Garmin dans le titre « Programme prévu » (12 novembre 2026)

**Dernière consigne explicite du propriétaire :** lorsqu'une séance prévue est associée à un entraînement Garmin créé et vérifié, le nom `nomEntrainementMontre` doit être affiché **sur la même ligne et dans le même en-tête** que `Programme prévu`, avec le format exact **« Programme prévu · <nom exact du modèle Garmin> »**. Cas courant : **« Programme prévu · Mon Rythme - Renfo A »**. Ne pas créer de second paragraphe, cartouche, note ou ligne « Entraînement à charger sur la montre » : l'en-tête unique suffit. S'il n'existe pas de modèle Garmin confirmé, afficher simplement « Programme prévu » sans deviner de nom. Une séance déjà réalisée conserve le titre « Séance », sans faire passer un entraînement planifié pour une activité effectuée.

Cette règle s'applique **systématiquement à toutes les séances prévues disposant d'un modèle Garmin**, pas seulement au Renfo. Conserver le nom réel vérifié en bibliothèque, les cinq lignes Renfo épurées, toutes les séries/répétitions/tempos/repos dans la prescription et Garmin, et l'absence de données Garmin sensibles sur le Web. Le contrôle CI doit tester **le même en-tête**, l'absence de paragraphe redondant, le cas sans modèle et le cas réalisé, puis vérifier la publication Pages. **Règle d'affichage prioritaire**, qui remplace les consignes antérieures proposant une ligne dédiée au-dessus des étapes.

## 12 novembre 2026 — Contexte objectif dans le nom Garmin

Le champ public `nomEntrainementMontre` est le **nom exact du modèle vérifié dans Garmin**, et non le nom du site. Le Coach détermine son préfixe lisible à partir de l'objectif principal en cours (`domaines/coaching/donnees/objectifs.json`) et de la phase (`orientation.json`), sans supposer de performance ni réutiliser un contexte périmé. Exemple actuel : **« Reprise - Renfo A »**, affiché sur la même ligne que « Programme prévu ». Les blocs métier, la projection minimaliste, le statut prévu et les contraintes de programmation restent inchangés.
