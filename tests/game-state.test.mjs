import test from "node:test";
import assert from "node:assert/strict";

import { createInitialState, hydrateState, STATE_VERSION } from "../src/game-state.js";

test("hydrating a saved state preserves progress and adds newly introduced campaign fields", () => {
  const oldSave = createInitialState("en");
  oldSave.version = STATE_VERSION - 1;
  oldSave.currentScene = "utruz_gallery";
  oldSave.flags.lanternLit = true;
  delete oldSave.memory.exploredChoices;
  delete oldSave.memory.visitedScenes;
  delete oldSave.expedition;
  delete oldSave.heroConditions;
  const state = hydrateState(oldSave);
  assert.equal(state.version, STATE_VERSION);
  assert.equal(state.currentScene, "utruz_gallery");
  assert.equal(state.flags.lanternLit, true);
  assert.equal(state.flags.disarmedShields, false);
  assert.equal(state.flags.metNeris, false);
  assert.equal(state.relationships.ysilde, 0);
  assert.equal("workersAlerted" in state.flags, false);
  assert.equal("riverRumbling" in state.flags, false);
  assert.deepEqual(state.memory.exploredChoices, []);
  assert.deepEqual(state.memory.visitedScenes, {});
  assert.equal(state.expedition.supplies, 3);
  assert.equal(state.heroConditions.bashkar, "steady");
});
