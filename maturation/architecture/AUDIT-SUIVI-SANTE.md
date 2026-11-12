# Audit de conservation — refonte visuelle « Mon suivi santé »

**Décision du 12 novembre 2026.** Il s'agit uniquement d'une simplification de la **présentation et de la projection Web**, sans déplacement d'une source métier ni réécriture d'une information personnelle. Contrôle fait avant retrait des longues cartes textuelles.

| Catégorie qui était visible sur la page | Source de vérité conservée | Rôle du Coach | Présentation après refonte |
| --- | --- | --- | --- |
| Antécédents rapportés, douleurs, symptômes et évolution | `domaines/sante/donnees/PROFIL.md` | Consulte les faits, sans diagnostic inventé | Non affichés sous forme de profil textuel |
| Pieds, appuis, chaussures, semelles et hypothèses non confirmées | `domaines/sante/donnees/PROFIL.md` + `domaines/sante/donnees/evenements/` | Garde distinction faits / hypothèses | Date et titre de certains événements, pas les paragraphes |
| Mécanique, articulations, limitations de mouvement | `domaines/sante/donnees/PROFIL.md` | Relie ces observations à la stratégie de séance | Non affichées comme fiches narratives |
| Suivi kiné, avis ou examens envisagés et données manquantes | `domaines/sante/donnees/PROFIL.md` et `domaines/sante/donnees/rapports/` | Ne présume pas qu'un rendez-vous ou un examen est réalisé | Seulement les séances effectivement confirmées dans les indicateurs |
| Effort, douleur, récupération et ressenti de séance | `domaines/sante/donnees/rapports/`, `domaines/sante/donnees/ressentis/seances/` | Interprète prudemment pour adapter les prochaines séances | Nombre de retours, aucun long compte rendu |
| Choix pédagogiques, adaptations et motivations | `domaines/coaching/donnees/CONTEXTE-COACH.md`, `DECISIONS.md`, `JOURNAL.md`, `objectifs.json` | Maintient explicitement le raisonnement métier | Non affichés sur la page Santé |
| Dates et statuts de séance (prescription / réalisation) | `domaines/planification/donnees/seances/` et `domaines/activites/donnees/seances/` | Utilise les sources distinctes, sans inventer une réalisation | Indicateurs, barres hebdomadaires, dernières réalisations |

**Limites et garanties :** les sources Santé et Coaching sont conservées dans le dépôt GitHub public. Arrêter de projeter le profil et les paragraphes du journal vers le site n'efface ni l'historique Git ni d'éventuelles anciennes publications/caches. `noindex` ne signifie pas confidentialité. Un vrai retrait public de données de santé nécessiterait une décision et une opération séparées.

**Périmètre de développement :** `addons/web/pages/sante.html`, version publiée, contrat standard de projection et ses tests/documentation. Pas de modification du programme, des données de santé, de la mémoire de coaching, de Garmin ou des frontières d'architecture.
