# Premier audit sémantique ciblé — provenances et rubriques historiques

**Date : 13 novembre 2026.** Source immuable : `main` au SHA `d88a202ae79e8afb61e9984f0b5bc95a1c5c46b4`. **Ce rapport n'est pas une certification exhaustive.**

## Défauts d'ancrage identifiés

- Le nombre **162** dans l'inventaire antérieur recense les titres de la branche expérimentale, dont le titre supplémentaire du préambule `AGENTS.md`. **Les huit fichiers de `main` contiennent exactement 161 titres de niveaux H2–H4** au SHA examiné. On conserve l'inventaire original pour audit, et on ajoute la nouvelle [référence à 161 rubriques](INVENTAIRE-RUBRIQUES-MAIN.json).
- Les 85 exigences ont des liens dont le SHA et la ligne existent, mais **l'existence de la ligne ne signifie pas que la ligne justifie l'exigence**. Le [relevé préliminaire](AUDIT-ANCRAGES-SEMANTIQUES.json) identifie **12 familles de gouvernance nouvelle** faussement présentées comme issues de `AGENTS.md#L3` (en réalité le nommage Garmin), **13 lignes clairement hors sujet** et **13 citations seulement approximatives**.
- **47 autres citations** ne sont pas signalées par ce premier passage : cela ne prouve **pas** leur justesse sémantique. **42/161 rubriques historiques** ont au moins un lien d'exigence dans leur section, **119 n'en ont aucun** ; l'absence de lien n'est **pas** la disparition de la règle.
- `docs/REPRISE.md` contient **30 rubriques historiques** sans ancrage dans les 85 liens. Plusieurs procédures y sont redondantes avec d'autres sources, et certaines anciennes FIT sont abrogées par V2 ; il faut les classer une par une avant de conclure.
- L'ancien `source_historique` des 12 familles nouveaux rôles `COO/REF/QUA` ne doit plus être considéré comme un précédent métier du `main` : leur **provenance est la proposition de gouvernance de la branche**, non une instruction Garmin du 12 novembre.
- **Aucun lien original n'est effacé ni corrigé sans vérification de sa clause de remplacement.** La matrice et les 85 attributions gardent leur statut `proposée_non_validée`.

## Risque et mesures immédiates

**Criticité pour une fusion : BLOQUANT.** Tant que les nouveaux rôles citent une règle de nommage Garmin comme preuve de l'autorité du Gardien, la matrice ne justifie pas sémantiquement la gouvernance proposée. Une validation automatique des liens ne suffit pas.

Le bon traitement est (1) de distinguer le **fondement historique** des règles métier et la **proposition de gouvernance créée sur la branche**, (2) de corriger les références trompeuses après vérification, en versionnant la justification, (3) de passer les rubriques sans ancrage en revue clause par clause, notamment FIT, images, calendrier, confidentialité et suivi, puis (4) de faire relire les arbitrages au Gardien sans faire croire à une indépendance.

Les huit conflits INC restent ouverts jusqu'à leur instruction séparée. Aucun `main`, fait sportif ni compte Garmin ne doit être modifié.
