# Pièces jointes de séances

**Statut : structure documentaire uniquement.** Aucun entraînement Garmin ou export réel enregistré à cette date.

## Responsabilité

- **Coach** : dépose, analyse et rattache les fichiers réels associés aux séances.
- **Maturation** : maintient les conventions de stockage et l'IHM. Toute modification visuelle nécessite une demande ou approbation explicite.
- **Interdiction absolue au Coach de modifier `index.html`, CSS et JavaScript**.

## Organisation future

```
personnel/pieces-jointes/seances/<id-stable-de-seance>/prevu/<fichier>
personnel/pieces-jointes/seances/<id-stable-de-seance>/realise/<fichier>
```

- `prevu/` : entraînement programmé pour la **Garmin Venu 4**, après vérification réelle de compatibilité.
- `realise/` : export de l'activité Garmin effectivement réalisée (`.fit`, `.gpx`, `.tcx`, `.csv`, suivant les données disponibles).
- Aucun fichier fictif ou vide ; ne pas changer l'`id` de la séance.

## Références

Voir [docs/GARMIN.md](../GARMIN.md) pour les formats, le contrat facultatif `pieces_jointes` et les procédures Garmin.

Le propriétaire a validé un **dépôt public** pour les données versionnées. Les fichiers GPS peuvent dévoiler des trajets et des lieux personnels ; une fois poussés, ils peuvent rester accessibles dans l'historique Git. Ne jamais mettre de mot de passe ou token Garmin dans ce dépôt.

Pas de contrôle de pièce jointe ajouté à Mon Rythme sans approbation de l'utilisateur.
