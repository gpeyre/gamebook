import { GAME_DB } from "./game-db.js";

export const STATE_VERSION = 20;

export function createInitialState(language = "fr", database = GAME_DB) {
  return {
    version: STATE_VERSION,
    language,
    ...structuredClone(database.initialState),
    transcript: [{ type: "narration", text: database.intro }],
  };
}

/** Adds fields introduced by a newer campaign without discarding a saved run. */
export function hydrateState(savedState, database = GAME_DB) {
  const fresh = createInitialState(savedState?.language ?? "fr", database);
  if (!savedState) return fresh;
  return {
    ...fresh,
    ...savedState,
    version: STATE_VERSION,
    flags: { ...fresh.flags, ...savedState.flags },
    relationships: { ...fresh.relationships, ...savedState.relationships },
    dilemmas: { ...fresh.dilemmas, ...savedState.dilemmas },
    quests: { ...fresh.quests, ...savedState.quests },
    expedition: { ...fresh.expedition, ...savedState.expedition },
    heroConditions: { ...fresh.heroConditions, ...savedState.heroConditions },
    casualties: Array.isArray(savedState.casualties) ? savedState.casualties : fresh.casualties,
    memory: { ...fresh.memory, ...savedState.memory, exploredChoices: savedState.memory?.exploredChoices ?? [], visitedScenes: savedState.memory?.visitedScenes ?? {} },
    transcript: Array.isArray(savedState.transcript) ? savedState.transcript : fresh.transcript,
  };
}

export function cloneState(state) {
  return structuredClone(state);
}
