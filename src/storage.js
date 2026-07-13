import { hydrateState, STATE_VERSION } from "./game-state.js";

const SAVE_KEY = "grand-assechement-save-v1";
const AUTO_KEY = "grand-assechement-autosave-v1";

function validState(value) {
  // Version 10 changes the interaction model itself (free commands → fixed
  // choices), so old autosaves cannot represent a valid point in this graph.
  return value && value.version === STATE_VERSION && typeof value.currentScene === "string" && Array.isArray(value.inventory);
}

function read(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return validState(value) ? hydrateState(value) : null;
  } catch {
    return null;
  }
}

export function saveGame(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function autosave(state) {
  try { localStorage.setItem(AUTO_KEY, JSON.stringify(state)); } catch { /* Storage may be disabled. */ }
}

export function loadGame() {
  return read(SAVE_KEY);
}

export function loadAutosave() {
  return read(AUTO_KEY);
}
