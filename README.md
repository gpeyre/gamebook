# Le Grand Assèchement

Une aventure bilingue français/anglais, entièrement écrite à l'avance et jouable dans le navigateur. Il n'y a ni modèle de langage, ni saisie libre, ni interprétation automatique : le joueur ne voit que les choix réellement possibles dans l'état courant du récit.

## Lancer localement

```bash
python3 -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`. Aucun paquet ni serveur applicatif n'est requis.

## Ce qui structure l'aventure

Le chapitre est un vaste graphe d'enquête, de sauvetage et de confrontation : les portes de Laelith, les ouvriers imposteurs, le marché des lanternes, la cour des verriers, les quais sous les vannes, le Poisson-Lune, le pont de papier, les douanes et leur chambre des sceaux, la sacristie de l'ambassade, le sanctuaire des rives, le verger sous la vase, les bains effondrés, la fissure, le tunnel noyé, la barge des captifs, la galerie d'Utruz, la prison de Poupiquet, la chapelle, l'observatoire, les toits, les niveaux mécaniques des portes, les archives, le Tribunal, le Conseil et le retour à la ville. Les embranchements conduisent à des itinéraires et des conclusions distincts.

Chaque choix possède un identifiant unique et est consommé après usage. À un carrefour déjà visité, les pistes épuisées ont disparu; seules les pistes non tentées, ou rendues possibles par une découverte, sont proposées. Les scènes peuvent aussi contenir un `revisitDescription`, une description de retour explicitement écrite pour refléter les traces laissées, les informations apprises et le temps passé.

L'état de l'expédition évolue avec les choix : fatigue, blessures, provisions, richesse, cohésion, niveau d'alerte ennemi et condition de chaque héros. Ces valeurs sont visibles dans la barre latérale et déclenchent des couches de récit écrites (`narrativeLayers`) : un retour dans la faille n'a pas le même texte avec Kiki, les voyageurs sauvés, un groupe blessé, peu de provisions ou des mercenaires sur le qui-vive.

La barre latérale inclut aussi une mini-carte géographique pilotée par `worldMap`. Elle affiche les secteurs de la ville, du lit asséché, des galeries et des mécanismes; l'or marque la scène actuelle, le turquoise les lieux déjà visités et les traits dorés les routes actuellement possibles. Le bouton **Agrandir** ouvre une carte complète avec tous les noms de lieux et un défilement adapté aux petits écrans.

```text
clic sur un choix
  → vérification de ses conditions
  → application de ses conséquences
  → enregistrement du choix et de la visite
  → texte de transition + description d'arrivée adaptée à l'historique
  → événements de temps éventuels
```

## Architecture

- [src/data/laelith-db.js](/Users/gpeyre/Dropbox/github/gamebook/src/data/laelith-db.js) contient l'état initial, les entités, les conditions, effets, objectifs et événements de campagne.
- [src/data/fixed-campaign.js](/Users/gpeyre/Dropbox/github/gamebook/src/data/fixed-campaign.js) contient le graphe de choix fixe, les scènes détaillées et les couches narratives conditionnelles.
- [src/game-engine.js](/Users/gpeyre/Dropbox/github/gamebook/src/game-engine.js) est générique : il ne connaît aucun personnage ni lieu de Laelith. Il expose `getChoices(state)` et `resolveChoice(state, id)`.
- [src/game-state.js](/Users/gpeyre/Dropbox/github/gamebook/src/game-state.js) sérialise le progrès, dont `memory.exploredChoices` et `memory.visitedScenes`.
- [src/ui.js](/Users/gpeyre/Dropbox/github/gamebook/src/ui.js) rend exclusivement les boutons de choix actuellement disponibles.

Les données utilisent des opérations génériques (`set`, `increment`, `addUnique`, `remove`, `move`, `remember`) et des conditions sur l'état. Une autre campagne peut donc remplacer les fichiers de données sans modifier le moteur.

## Vérifier

```bash
node --test tests/*.test.mjs
```

Les tests vérifient notamment la disparition définitive d'un choix consommé, les descriptions de retour, les conditions qui ouvrent une route, les couches liées à la fatigue/Kiki, les ressources et la condition des héros.
