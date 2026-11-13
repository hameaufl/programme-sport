# Santé — données et suivi déclarés

Le domaine `domaines/sante/` conserve les informations de Santé fournies ou confirmées par le propriétaire, avec date, provenance et nuances. Il ne conclut jamais à un diagnostic sur la seule base d'une séance, d'une douleur ou d'un rendez-vous de kinésithérapie.

## Fichiers canoniques

- `donnees/PROFIL.md` : contexte physique rapporté, antécédents, capacités, limitations, recommandations effectivement reçues et repères de personnalisation.
- `donnees/SUIVI.md` : conventions et trame des entrées de suivi, pas un journal unique de faits.
- `donnees/rapports/AAAA/MM/<id>.md` : compte rendu détaillé par activité confirmée.
- `donnees/ressentis/seances/AAAA/MM/<id>.json` : douleurs, sensations et récupération déclarées, par `seanceId`.
- `donnees/evenements/AAAA/MM/<date>-<sujet>.md` : événement de santé daté et attribué.

Les séances réellement effectuées et les structures anatomiques sollicitées figurent dans `domaines/activites/donnees/`, **pas** dans une prescription Planification. Les liens sont établis par identifiant sans copier le même fait. Les notes ou hypothèses du Coach demeurent distinctes des affirmations rapportées.

## Mise à jour et non-perte

Le Coach est responsable du contenu métier : une déclaration de séance actualise les fichiers concernés dans l'échange courant, avec le niveau de précision et la provenance nécessaires. Conserver les comptes rendus complets et le contexte physique utile ; ne pas attribuer des symptômes ou des conclusions aux séances non confirmées. Maturation gère schémas, contraintes de projection et interface, sans modifier les informations de santé.

## Restitution publique

`addons/web/pages/sante.html` restitue une **synthèse visuelle** : compteurs factuels, progression hebdomadaire, activités confirmées et dates/titres d'événements autorisés. Le profil complet et les paragraphes détaillés des événements **ne sont pas publiés dans les fichiers du site**. La politique `contrats/publication-v1.json` définit les champs admis ; la projection restreinte peut supprimer la vue Santé.

**Le dépôt reste public** : les fichiers versionnés de Santé peuvent être accessibles même s'ils ne sont pas inclus dans GitHub Pages. Ne jamais verser de secret, de jeton ni de nouvelle information sensible sur le site par simple ajout de champ. `noindex` ne fournit aucun contrôle d'accès.
