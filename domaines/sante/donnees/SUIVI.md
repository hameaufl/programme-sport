# Suivi santé — conventions et trame des comptes rendus

Les comptes rendus effectivement reçus sont enregistrés dans `domaines/sante/donnees/rapports/AAAA/MM/<id>.md`, les ressentis par `seanceId` dans `domaines/sante/donnees/ressentis/seances/` et les événements datés dans `domaines/sante/donnees/evenements/`. Ce document donne la **trame de rédaction** ; il n'est pas un journal unique des activités.

**Le Coach** maintient les faits de Santé et les décisions sportives, en distinguant déclarations, hypothèses et avis professionnels. **Maturation** maintient les schémas et l'interface sans écrire de compte rendu personnel.

## Trame pour une séance réellement confirmée

### AAAA-MM-JJ — Activité liée à `seanceId`

- **Prévu :** éléments de Planification, à comparer sans les recopier intégralement.
- **Réalisé :** gestes et exercices explicitement confirmés, enregistrés dans Activités.
- **Durée / distance :** chiffres réellement rapportés et unités.
- **Structures sollicitées :** libellés anatomiques non vides dans Activités, sans diagnostic inventé.
- **Sensations :** ressentis du propriétaire tels qu'il les décrit, rangés dans Santé.
- **Gêne / douleur :** localisation, intensité et chronologie seulement si déclarées.
- **Récupération :** faits observés ou inconnues explicites.
- **Décision Coach :** maintenir, alléger, adapter, reporter, attendre ou demander des précisions, avec justification.
- **Source :** retour daté du propriétaire ou document réellement reçu.

## Règles

- Aucune activité n'est marquée `fait:true` sur la seule base d'un planning.
- Mettre à jour la réalisation dans `domaines/activites/donnees/seances/` et les sensations dans `domaines/sante/donnees/ressentis/seances/`. Ne pas recopier le rapport complet dans Planification.
- Préserver la provenance et les nuances, sans déduire une blessure ou une causalité clinique.
- Un document d'activité Garmin, s'il est réellement reçu, ne doit être cité qu'avec un fichier et une provenance vérifiés ; ne pas inventer de pièce jointe.
- Les pages Web restent en lecture seule. Le Coach peut corriger un fragment local de restitution métier ; la navigation et la structure générale appartiennent à Maturation.
- Après une modification métier demandée, contrôler les fichiers, les projections et la publication si elle a été déclenchée.
