# Instruction documentée des huit incohérences — sans clôture ni nouveau droit

**13 novembre 2026.** Texte de référence des sources : `main` au SHA `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. **Examen logique non indépendant**, réalisé dans le contexte Maturation/Gardien du même ChatGPT. Les arbitrages ci-dessous sont des **propositions de priorité documentaire**, pas des décisions métier nouvelles ni une validation d'activation.

## Synthèse

| Dossier | Qualification proposée | Statut | Risque principal |
| --- | --- | --- | --- |
| INC-001 | ancienne generation FIT abrogee par V2 | **Ouvert — avis provisoire** | Réinstaller un générateur FIT ou faire un envoi non autorisé. |
| INC-002 | sources personnel remplacees par quatre domaines V2 | **Ouvert — avis provisoire** | Écriture dans un répertoire disparu, duplication de faits ou perte de provenance. |
| INC-003 | exception HTML metier bornee active | **Ouvert — avis provisoire** | Coach dépasse son mandat et modifie une page générale, une projection ou un contrat de publication. |
| INC-004 | nom Garmin relie objectif actif regle recente | **Ouvert — avis provisoire** | Faire persister une ancienne marque, annoncer une métadonnée Web non vérifiée ou changer des modèles Garmin sans accord. |
| INC-005 | exception nettoyage intermediaire conditionnelle mais risque eléve | **Ouvert — avis provisoire** | Supprimer un modèle historique, planifié, utilisé ou mal identifié ; confondre nettoyage du modèle et suppression du calendrier. |
| INC-006 | chronologie de seances et etats mouvants | **Ouvert — avis provisoire** | Reporter une séance sur une date obsolète, effacer des archives ou inventer l'état du calendrier. |
| INC-007 | migration images PNG vers blocs et projection V2 | **Ouvert — avis provisoire** | Omettre une illustration, injecter un média dans le plan, exposer des détails interdits sur le Web ou réintroduire etapes. |
| INC-008 | distinction mode essai read only versus ecriture metier reelle | **Ouvert — avis provisoire** | Publier des faits inventés ou utiliser une règle de production pour pousser depuis une session de test. |

**Huit dossiers ouverts ; zéro clôture effective.** Les sources historiques contradictoires sont conservées intégralement. Le document de qualification machine est [QUALIFICATIONS-INC-001-008.json](QUALIFICATIONS-INC-001-008.json) ; il comporte les fragments de preuve et les conditions exactes d'arbitrage.

## Instruction par dossier

### INC-001 — ancienne generation FIT abrogee par V2

**Priorité documentaire proposée :** La règle explicite Garmin MCP/V2 prévaut sur les automatismes historiques de FIT locaux ; les instructions FIT restent archives documentaires seulement.

**Risque :** Réinstaller un générateur FIT ou faire un envoi non autorisé.

**Autorité / arbitrage :** Maturation clarifie la supersession documentaire ; Gardien vérifie la cohérence ; propriétaire requis pour tout changement effectif de règle.

**Clôture (NON réalisée) :** Tracer la supersession dans l'index, vérifier l'absence de build FIT actif et un test de refus d'écriture Garmin non demandée ; visa requis.

**Sources vérifiables au `main` historique :** [AGENTS.md L156](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L156) ; [AGENTS.md L207](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L207).

### INC-002 — sources personnel remplacees par quatre domaines V2

**Priorité documentaire proposée :** Les écritures métier sont dans les quatre domaines canoniques et non dans l'ancien dossier personnel/ ; le passé est conservé comme documentation.

**Risque :** Écriture dans un répertoire disparu, duplication de faits ou perte de provenance.

**Autorité / arbitrage :** Coach conserve les faits et les identifiants ; Maturation vérifie ports/tests ; Gardien valide les références de remplacement.

**Clôture (NON réalisée) :** Prouver le lien source ancienne → canonique V2, vérifier scripts de non-perte et absence d'écriture dans personnel/ ; visa requis.

**Sources vérifiables au `main` historique :** [AGENTS.md L167](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L167) ; [AGENTS.md L169](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L169).

### INC-003 — exception HTML metier bornee active

**Priorité documentaire proposée :** Coach peut toucher uniquement un fragment de rendu de faits métier déjà autorisé et nécessaire ; la structure, les modèles et le Web général restent à Maturation, malgré l'interdiction totale historique.

**Risque :** Coach dépasse son mandat et modifie une page générale, une projection ou un contrat de publication.

**Autorité / arbitrage :** Gardien examine le conflit, Maturation reste responsable du technique transverse ; propriétaire valide toute extension nouvelle.

**Clôture (NON réalisée) :** Conserver l'exception ciblée dans la matrice des droits et tester un changement HTML local autorisé et un changement global refusé ; visa requis.

**Sources vérifiables au `main` historique :** [docs/ROLES.md L10](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/docs/ROLES.md#L10) ; [docs/ROLES.md L117](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/docs/ROLES.md#L117).

### INC-004 — nom Garmin relie objectif actif regle recente

**Priorité documentaire proposée :** Le nom définitif dépend de l'objectif/phase actuels, sans marque du site ni suffixe technique ; conserver les anciens noms comme historique et ne jamais renommer rétroactivement sans demande explicite.

**Risque :** Faire persister une ancienne marque, annoncer une métadonnée Web non vérifiée ou changer des modèles Garmin sans accord.

**Autorité / arbitrage :** Coach propose un nom à partir des sources canoniques, Gardien documente supersession, propriétaire arbitre les nouveautés nécessitant accord.

**Clôture (NON réalisée) :** Qualifier la règle ancienne comme remplacée, vérifier un modèle réel seulement dans une opération Garmin expressément autorisée ; visa requis.

**Sources vérifiables au `main` historique :** [AGENTS.md L6](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L6) ; [AGENTS.md L44](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L44).

### INC-005 — exception nettoyage intermediaire conditionnelle mais risque eléve

**Priorité documentaire proposée :** Le texte récent décrit une exception très étroite à l'interdiction de suppression, pour une copie non conforme créée dans la même opération, identifiée et non utilisée, après version conforme relue. Ce chantier ne confère AUCUNE permission Garmin réelle.

**Risque :** Supprimer un modèle historique, planifié, utilisé ou mal identifié ; confondre nettoyage du modèle et suppression du calendrier.

**Autorité / arbitrage :** Gardien doit explicitement arbitrer la portée entre les deux textes ; tout appel réel destructif reste soumis à autorisation propriétaire précise d'action/date/cible.

**Clôture (NON réalisée) :** Revue documentaire détaillée, cas positifs/négatifs sans action distante, traçage du statut de chaque preuve et autorisation avant toute suppression. Ne pas clore sur la seule interprétation logique.

**Sources vérifiables au `main` historique :** [AGENTS.md L39](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L39) ; [adaptateurs/garmin/MCP.md L51](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/adaptateurs/garmin/MCP.md#L51).

### INC-006 — chronologie de seances et etats mouvants

**Priorité documentaire proposée :** Les états datés successifs du Renfo sont des instantanés du contexte ; seule la source Planification actuelle et les décisions réellement actives permettent de conclure sur une séance future.

**Risque :** Reporter une séance sur une date obsolète, effacer des archives ou inventer l'état du calendrier.

**Autorité / arbitrage :** Coach vérifie les données canoniques actuelles et décisions ; Gardien qualifie le statut des instantanés ; propriétaire arbitre les adaptations réelles.

**Clôture (NON réalisée) :** Prouver le lien archive/plan courant, distinguer prévu/réalisé, vérifier la date et la récupération au moment de chaque demande réelle ; pas de clôture globale intemporelle.

**Sources vérifiables au `main` historique :** [docs/COACH-MODE-OPERATOIRE.md L48](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/docs/COACH-MODE-OPERATOIRE.md#L48) ; [docs/COACH-MODE-OPERATOIRE.md L52](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/docs/COACH-MODE-OPERATOIRE.md#L52).

### INC-007 — migration images PNG vers blocs et projection V2

**Priorité documentaire proposée :** L'obligation pédagogique d'aide PNG demeure ; les plans V2 portent des blocs avec mouvementId, et la projection relie les images à partir de la banque, pas d'un champ ancien à recopier.

**Risque :** Omettre une illustration, injecter un média dans le plan, exposer des détails interdits sur le Web ou réintroduire etapes.

**Autorité / arbitrage :** Maturation vérifie banque/ports/rendu et modèle V2 ; Coach sélectionne les gestes et leur pédagogie ; Gardien confirme la portée de la migration.

**Clôture (NON réalisée) :** Test bloc→mouvementId→banque PNG→projection, contrôle du contrat public, cas d'exercice absent refusé, visa de cohérence ; ne pas modifier les sources historiques.

**Sources vérifiables au `main` historique :** [AGENTS.md L229](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L229) ; [adaptateurs/projections/lecture.cjs L46](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/adaptateurs/projections/lecture.cjs#L46).

### INC-008 — distinction mode essai read only versus ecriture metier reelle

**Priorité documentaire proposée :** Une simulation de gouvernance sur une branche n'autorise aucune écriture. Les retours authentiques suivent la procédure opérationnelle et les permissions actuelles dans leur contexte, sans être confondus avec les tests fictifs.

**Risque :** Publier des faits inventés ou utiliser une règle de production pour pousser depuis une session de test.

**Autorité / arbitrage :** Coach qualifie la demande et son mode ; Gardien vérifie l'interprétation ; propriétaire fixe le périmètre d'une éventuelle opération réelle.

**Clôture (NON réalisée) :** Tester le mode lecture seule même sous demande de livraison, vérifier absence de commit/écriture Garmin et définir la règle de branche du prochain déploiement avec autorisation explicite.

**Sources vérifiables au `main` historique :** [docs/ROLES.md L14](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/docs/ROLES.md#L14) ; [AGENTS.md L307](https://github.com/hameaufl/programme-sport/blob/d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4/AGENTS.md#L307).


## État et interdits
- Les cas INC-001/002 contiennent des **supersessions V2 explicites**. Les cas 003/004/007 ont une priorité plausible avec une portée à vérifier ; INC-005 exige une vigilance destructive et un arbitrage formel ; INC-006 dépend de l'état métier à la date de la demande ; INC-008 distingue les modes d'exploitation et de simulation.
- **La priorité proposée ne ferme aucun dossier.** Le Gardien doit valider les liens source→remplacement, et les responsables doivent produire les preuves prévues. Une règle de gouvernement B2 ne peut acquérir autorité sur les anciennes décisions sans validation et approbation.
- Les mentions de modèles ou données historiques ne prouvent **aucun état Garmin actuel**. Le dépôt public ne doit recevoir ni identifiant de compte Garmin, ni élément personnel supplémentaire.
- Aucune opération Garmin ni publication ni fusion `main` n'a été exécutée. Les huit conflits restent explicitement à arbitrer/fermer selon leur procédure et la compétence du propriétaire.
