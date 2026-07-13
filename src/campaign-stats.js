function countWords(text) {
  return (String(text).match(/[\p{L}\p{N}]+(?:[’'\-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

function countLocalizedWords(value, language) {
  if (typeof value === "string") return countWords(value);
  if (!value || typeof value !== "object") return 0;
  if (Object.hasOwn(value, "fr") || Object.hasOwn(value, "en")) return countLocalizedWords(value[language] ?? value.fr, language);
  if (Array.isArray(value)) return value.reduce((total, item) => total + countLocalizedWords(item, language), 0);
  return Object.values(value).reduce((total, item) => total + countLocalizedWords(item, language), 0);
}

/**
 * Campaign-scale information is derived from the same data used by the game.
 * It lets the project page remain accurate when authors add scenes or prose.
 */
export function getCampaignStats(database) {
  const sceneEntries = Object.entries(database.scenes ?? {});
  const choiceGroups = Object.values(database.fixedChoices ?? {});
  const choices = choiceGroups.flat();
  const sceneIds = new Set([database.initialState?.currentScene]);
  for (const choice of choices) if (choice.to) sceneIds.add(choice.to);
  for (const scene of Object.values(database.scenes ?? {})) {
    for (const exit of Object.values(scene.exits ?? {})) if (exit.to) sceneIds.add(exit.to);
  }
  const reachableScenes = sceneEntries.filter(([id]) => sceneIds.has(id));
  const endingIds = new Set(choices.map((choice) => choice.to).filter((sceneId) => database.scenes?.[sceneId]?.ending));
  const narrativeSources = [database.intro, database.scenes, database.fixedChoices, database.narrativeLayers, database.journal];

  return {
    sceneCount: reachableScenes.length,
    endingCount: endingIds.size,
    choiceCount: choices.length,
    characterCount: Object.keys(database.entities?.characters ?? {}).length,
    regionCount: (database.worldMap?.regions ?? []).length,
    wordCount: {
      fr: narrativeSources.reduce((total, source) => total + countLocalizedWords(source, "fr"), 0),
      en: narrativeSources.reduce((total, source) => total + countLocalizedWords(source, "en"), 0),
    },
  };
}
