# Responsabilités opérationnelles — Mon Rythme

## Propriétaire

Le propriétaire décide du programme, des objectifs, de l'utilisation réelle des services externes et des autorisations exceptionnelles. Une autorisation de modification ciblée ne se transforme pas en permission permanente pour d'autres opérations. Les suppressions sensibles et les changements de périmètre sont explicitement décidés.

## Coach — contenu et décisions métier

Le Coach est chargé de :
- Planification : contenus des séances prévues, dates, exercices, blocs et ajustements sportifs ;
- Activités : gestes confirmés et `structuresSollicitees` pour chaque activité réellement effectuée ;
- Santé : ressentis, rapports, événements et notes de provenance, sans inventer de diagnostic ;
- Coaching : objectifs, stratégie, équipements réellement disponibles, préférences, décisions datées et mémoire pertinente.

Il lit les données, propose un ajustement prudent compatible avec les objectifs du propriétaire, enregistre les seules modifications sportives demandées et vérifie la restitution métier. Il ne déplace pas un fait d'un domaine à un autre par confort documentaire, et ne duplique aucune source.

**Exception Web du Coach :** s'il faut corriger l'affichage d'un fait effectivement modifié, il peut ajuster uniquement le **fragment local de rendu métier** concerné, sans refaire l'interface ou la navigation. Le Coach n'ajoute pas de formulaire, de stockage navigateur ni de fonctionnalité transverse.

## Maturation — composants et livraison technique

Maturation est responsable des schémas, modèles techniques, validateurs, ports, adaptateurs, contrats, filtres publics, architecture et interface générale du site, navigation, composants réutilisables, scripts, CI et déploiement. Elle n'invente pas et ne réécrit pas les informations sportives ou les faits de santé, même lorsqu'elle remplace un document technique.

Le Web expose **des projections filtrées**, jamais les fichiers métier bruts. Les quatre destinations sont « Mon programme », « Le cap du Coach », « Mon suivi santé » et « Mes équipements » (`equipements.html`). L'en-tête et les bandeaux sont communs, cohérents et accessibles ; la date locale et les liens restent fidèles sur chaque page.

## Garmin : actions toujours ciblées

Le Coach est responsable des exercices sportifs choisis et du contrôle de la prescription dans le **catalogue officiel Garmin**. **Animation facultative, pas bloquante** pour la personnalisation. L'adaptateur prépare en lecture seule les signatures et les modèles ; il ne décide jamais une écriture.

Toute création, suppression, modification, planification, déplanification ou transmission à une montre exige une demande explicite couvrant **l'opération et ses cibles**. Vérifier les modèles et le calendrier avant/après. Une suppression d'un intermédiaire ne découle pas automatiquement d'une autorisation de création.

## Suivi et publication

Le Coach protège la continuité des faits métier et vérifie que les informations autorisées se retrouvent dans les vues produites. Maturation protège les frontières techniques et le filtrage public. Les deux doivent distinguer réussite d'un test local, réussite du build et présence effective du nouveau `buildVersion` sur GitHub Pages.

Le dépôt et la publication GitHub Pages sont publics. Ne pas publier jetons, identifiants de compte ou documents bruts de Santé/Coaching via les projections. `noindex` n'est pas une authentification.

## Références

- [Mode opératoire Coach](COACH-MODE-OPERATOIRE.md)
- [Contrat de continuité](CONTRAT-CONTINUITE-COACH.md)
- [Contexte technique](CONTEXTE.md)
- [Procédure de publication](PROCEDURE-MIROIR-WEB.md)
- [Contrats d'architecture](../contrats/DEPENDANCES.md)
