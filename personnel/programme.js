/* Programme Sport — cycle de 5 semaines, démarrage MERCREDI 11 novembre 2026.
 *
 * 3 séances de course par semaine, sans sortie de marche seule.
 * Kinésithérapie : 4, 9 et 18 novembre 2026. Les séances de kiné sont
 * affichées comme rendez-vous distincts des sorties de course.
 * L'interface regroupe les séances par SEMAINES CIVILES (lundi-dimanche),
 * sans déplacer les dates de course ou de kiné. Le cycle de course reste
 * du 11 novembre au 14 décembre. Les statuts fait et les sensations sont publics et versionnés dans ce fichier, sans stockage local.
 *
 * Modes EXACTS disponibles sur le bracelet :
 *  2M+3C : 3 × (2 min M + 3 min C) + 2 min M = 17 min, 9 min de course.
 *  2M+5C : 3 × (2 min M + 5 min C) + 2 min M = 23 min, 15 min de course.
 *  C : 3 min M + 21 min C + 3 min M = 27 min, 21 min de course.
 *
 * Le mode C n'est pas obligatoire et n'est mentionné que comme OPTION
 * à la toute dernière séance ; les programmes 30 et 40 min sont exclus
 * de ce cycle. Ce programme accéléré n'est pas une prescription médicale :
 * répéter le 2M+3C / 2M+5C si besoin et garder au moins 1 jour sans course
 * entre les séances. Ne pas forcer si une douleur ou une gêne survient.
 */
window.MON_RYTHME_OBJECTIFS = ["La priorité est de retrouver des sensations agréables, sans recherche de performance."];
window.MON_RYTHME_DEBUT_CYCLE = "2026-11-11";
window.MON_RYTHME_PROGRAMMES = {
  "2026-11-02": [
    {
      "date": "2026-11-04",
      "titre": "Kiné · Genoux",
      "type": "kine",
      "id": "kine-2026-11-04",
      "fait": true,
      "sensations": "Première séance : étirements du genou, échanges sur les ressentis et renforcement. Presse à 40 et 50 kg, douleurs aux charges supérieures ; marche en crabe avec gros élastique autour des cuisses."
    }
  ],
  "2026-11-09": [
    {
      "date": "2026-11-09",
      "titre": "Kiné · Genoux",
      "type": "kine",
      "id": "kine-2026-11-09",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-11-11",
      "titre": "Séance 1 · 2M+3C",
      "duree": "17 min",
      "etapes": [
        "3 × (2 min marche + 3 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-11",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-11-13",
      "titre": "Séance 2 · 2M+3C",
      "duree": "17 min",
      "etapes": [
        "3 × (2 min marche + 3 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-13",
      "fait": false,
      "sensations": ""
    }
  ],
  "2026-11-16": [
    {
      "date": "2026-11-16",
      "titre": "Séance 3 · 2M+3C",
      "duree": "17 min",
      "etapes": [
        "3 × (2 min marche + 3 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-16",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-11-18",
      "titre": "Séance 1 · 2M+3C",
      "duree": "17 min",
      "etapes": [
        "3 × (2 min marche + 3 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-18",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-11-18",
      "titre": "Kiné · Genoux",
      "type": "kine",
      "id": "kine-2026-11-18",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-11-20",
      "titre": "Séance 2 · 2M+3C",
      "duree": "17 min",
      "etapes": [
        "3 × (2 min marche + 3 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-20",
      "fait": false,
      "sensations": ""
    }
  ],
  "2026-11-23": [
    {
      "date": "2026-11-23",
      "titre": "Séance 3 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-23",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-11-25",
      "titre": "Séance 1 · 2M+3C",
      "duree": "17 min",
      "etapes": [
        "3 × (2 min marche + 3 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-25",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-11-27",
      "titre": "Séance 2 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-27",
      "fait": false,
      "sensations": ""
    }
  ],
  "2026-11-30": [
    {
      "date": "2026-11-30",
      "titre": "Séance 3 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-11-30",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-12-02",
      "titre": "Séance 1 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-12-02",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-12-04",
      "titre": "Séance 2 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-12-04",
      "fait": false,
      "sensations": ""
    }
  ],
  "2026-12-07": [
    {
      "date": "2026-12-07",
      "titre": "Séance 3 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-12-07",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-12-09",
      "titre": "Séance 1 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-12-09",
      "fait": false,
      "sensations": ""
    },
    {
      "date": "2026-12-11",
      "titre": "Séance 2 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile"
      ],
      "id": "course-2026-12-11",
      "fait": false,
      "sensations": ""
    }
  ],
  "2026-12-14": [
    {
      "date": "2026-12-14",
      "titre": "Séance 3 · 2M+5C",
      "duree": "23 min",
      "etapes": [
        "3 × (2 min marche + 5 min course)",
        "2 min de marche finale",
        "Allure facile",
        "Option si très à l'aise : 3 min marche + 21 min course continue + 3 min marche"
      ],
      "id": "course-2026-12-14",
      "fait": false,
      "sensations": ""
    }
  ]
};
