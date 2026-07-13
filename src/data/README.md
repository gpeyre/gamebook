# Contrat des données de campagne

Le moteur lit deux ensembles de données : `scenes` et `fixedChoices`. Il ne contient aucun identifiant propre à Laelith.

```js
fixedChoices: {
  observatory: [
    {
      id: "read-star-chart",
      label: { fr: "Lire la carte", en: "Read the chart" },
      requires: { path: "state.flags.hasLamp", equals: true },
      effects: [{ op: "addUnique", path: "clues", value: "eclipse" }],
      to: "roof",
      result: { text: { fr: "…", en: "…" } },
    },
  ],
}
```

Une scène comprend au minimum `title` et `description`. Elle peut ajouter :

- `revisitDescription` : texte utilisé dès la deuxième entrée dans ce nœud ;
- `visitDescriptions` : variantes conditionnelles, avec le même format `requires` ;
- `ending: true` : conclusion, sans choix supplémentaire.

La campagne peut définir `config.choiceTurnEffects` (coût générique d'un choix), `scene.entryEffects` (conséquence à l'arrivée) et `narrativeLayers`. Une couche narrative est du texte bilingue avec un `when` facultatif (par exemple la scène courante) et un `requires` sur l'état : le moteur ajoute jusqu'à trois couches par arrivée, par priorité. C'est ce qui permet de faire parler les textes de fatigue, blessures, alliés sauvés, richesse, provisions et niveau d'alerte sans coder ces cas dans le moteur.

```js
{
  priority: 30,
  when: { scene: ["gallery"] },
  requires: { path: "state.expedition.fatigue", atLeast: 6 },
  text: { fr: "…", en: "…" },
}
```

Une campagne peut enfin fournir `worldMap`, avec un `viewBox`, des `regions` (`x`, `y`, `width`, `height`, `label`) et des `nodes` (`id`, `x`, `y`). Le moteur déduit et dédoublonne les liaisons de `fixedChoices`; l'interface marque la position courante, les nœuds visités et les choix de sortie disponibles, dans une mini-carte et une vue agrandie.

Un choix est disponible si `requires` est vrai et s'il n'est pas présent dans `state.memory.exploredChoices`. Tous les choix sont à usage unique par défaut; seul `once: false` rend explicitement un choix réutilisable. À l'entrée dans une scène cible, le moteur incrémente `state.memory.visitedScenes[sceneId]` avant de sélectionner sa description.

Les conditions adressent des chemins tels que `state.flags.openDoor`, `state.clues` ou `state.turns`. Les effets disponibles sont `set`, `increment`, `min`, `max`, `clamp`, `addUnique`, `remove`, `move` et `remember`.
