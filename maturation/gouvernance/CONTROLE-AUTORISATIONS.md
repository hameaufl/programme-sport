# Banc de décisions sensibles — simulation déterministe

**Statut : prototype de contrôle, non intégré aux outils Garmin/GitHub de ChatGPT.** Le script n'envoie **aucune** commande à Garmin, GitHub, Pages ni OpenAI. Il ne contrôle pas l'exécution réelle par un modèle : il vérifie uniquement que les préconditions **déclarées dans des cas fictifs structurés** sont cohérentes avec les interdictions du chantier.

## Exécution locale ou CI
`node maturation/gouvernance/verifier-autorisations.cjs`
`node --test maturation/gouvernance/tests/autorisations.test.cjs`

Les cas sont dans `tests/cas-autorisations.json` : lecture, programmation sans date précise, date différente, confusion programmer/envoyer, modèle non relu, suppression ambiguë ou planifiée, tentative d'écriture métier sur branche, modification de règles par Coach et changement des droits du Gardien sans accord propriétaire.

Le retour **admissible_sur_papier** signifie *uniquement* que les hypothèses structurées de cet exemple ne contredisent pas les préconditions contrôlées : **ce n'est jamais une autorisation effective**. Les champs `accordProprietaire:true` et `avisGardien.verdict:"valide"` sont des **données fictives** de test ; en exploitation, les preuves d'autorisation réelles devraient être validées par un composant distinct, sans faire confiance aux déclarations du modèle.

### Limite importante
Ce contrôleur n'est **pas branché sur les actions GitHub ou Garmin disponibles dans ChatGPT** et ne peut pas empêcher un ChatGPT d'utiliser directement un connecteur en dehors de ce protocole. Il teste le **contrat de décision** et aide à découvrir les ambiguïtés, pas à garantir l'interception de toutes les actions. Pour rester sans infrastructure payante, les essais réels sont limités aux simulations, à l'inventaire Git et aux preuves de CI, avec autorisations humaines explicites.

Les règles historiques de Garmin, du propriétaire et du Gardien restent prioritaires. La version expérimentale ne crée **aucun droit supplémentaire**. La fusion dans `main` reste soumise à approbation explicite.
