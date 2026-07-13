import { getObjective, resolveChoice } from "./game-engine.js";
import { createInitialState } from "./game-state.js";
import { UI_TEXT } from "./i18n.js";
import { clearRecentMemory } from "./memory.js";
import { autosave, loadAutosave, loadGame, saveGame } from "./storage.js";
import { appendEntry, elements, render, setBusy } from "./ui.js";

let state = loadAutosave() ?? createInitialState();
let busy = false;

function addSystem(text, type = "system") {
  const entry = { type, text };
  state.transcript.push(entry);
  appendEntry(entry, state.language);
}

function fullRender() {
  render(state, getObjective(state), submitChoice);
}

function submitChoice(choiceId) {
  if (busy) return;
  busy = true;
  setBusy(true);
  try {
    const result = resolveChoice(state, choiceId);
    const entry = { type: result.type, text: result.message };
    state.transcript.push(entry);
    appendEntry(entry, state.language);
    for (const event of result.events ?? []) {
      const eventEntry = { type: event.type, text: event.message };
      state.transcript.push(eventEntry);
      appendEntry(eventEntry, state.language);
    }
    autosave(state);
    fullRender();
  } catch (error) {
    console.error(error);
    addSystem(state.language === "fr" ? "Une erreur inattendue est survenue; votre progression précédente est conservée." : "An unexpected error occurred; your previous progress is preserved.", "error");
  } finally {
    busy = false;
    setBusy(false);
  }
}

elements.languageButton.addEventListener("click", () => {
  state.language = state.language === "fr" ? "en" : "fr";
  autosave(state);
  fullRender();
});

elements.saveButton.addEventListener("click", () => {
  saveGame(state);
  addSystem(UI_TEXT[state.language].saved);
});

elements.loadButton.addEventListener("click", () => {
  const loaded = loadGame();
  if (!loaded) return addSystem(UI_TEXT[state.language].noSave, "error");
  state = loaded;
  fullRender();
  addSystem(UI_TEXT[state.language].loaded);
});

elements.restartButton.addEventListener("click", () => {
  if (!window.confirm(UI_TEXT[state.language].confirmRestart)) return;
  state = createInitialState(state.language);
  autosave(state);
  fullRender();
});

elements.clearButton.addEventListener("click", () => {
  clearRecentMemory(state);
  addSystem(UI_TEXT[state.language].cleared);
  autosave(state);
  fullRender();
});

elements.mapExpandButton.addEventListener("click", () => elements.mapDialog.showModal());
elements.mapCloseButton.addEventListener("click", () => elements.mapDialog.close());
elements.mapDialog.addEventListener("click", (event) => {
  if (event.target === elements.mapDialog) elements.mapDialog.close();
});

fullRender();
