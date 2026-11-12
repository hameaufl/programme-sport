# Banque d’images pour les exercices de renfo

Les cinq PNG approuvés par l'utilisateur le 12 novembre 2026 sont conservés dans `assets/renfo/png/`, sans changement de dessin. Le fichier `banque.json` référence leur identité et le geste associé.

**Règle pour tout Coach :** consulter `banque.json` à chaque création ou modification d'un Renfo. Chaque mouvement de `etapes`, même déjà connu ou répété, possède obligatoirement une entrée dans `aidesExercices` avec le libellé exact et le chemin `png`. Réutiliser le PNG existant pour le même mouvement ; s'il manque, générer un PNG statique montrant corps, positions et flèches, le déposer sous `png/<slug>.png` et l'ajouter à `banque.json` avant publication.

Le bouton `?` et la fenêtre avec une croix relèvent de l'affichage (Maturation), pas du contenu sportif. Les anciennes animations GIF ne sont plus utilisées ni publiées par le build. Éviter les liens externes et toute dépendance réseau.
