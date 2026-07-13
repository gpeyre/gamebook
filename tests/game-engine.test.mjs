import test from "node:test";
import assert from "node:assert/strict";

import { getChoices, getWorldMap, resolveChoice } from "../src/game-engine.js";
import { GAME_DB } from "../src/game-db.js";
import { createInitialState } from "../src/game-state.js";

function choose(state, id) {
  assert.ok(getChoices(state).some((choice) => choice.id === id), `choice ${id} should be available`);
  return resolveChoice(state, id);
}

test("a consumed authored choice is permanently removed", () => {
  const state = createInitialState("en");
  choose(state, "read-notice");
  assert.ok(!getChoices(state).some((choice) => choice.id === "read-notice"));
  assert.ok(getChoices(state).some((choice) => choice.id === "descend-river"));
});

test("a revisited node uses its scripted historical description", () => {
  const state = createInitialState("en");
  choose(state, "descend-river");
  choose(state, "search-silt");
  const result = choose(state, "keep-tablet");
  assert.equal(state.currentScene, "dry_bed");
  assert.match(result.message.en, /first descent/i);
  assert.equal(state.memory.visitedScenes.dry_bed, 2);
});

test("the graph contains distinct authored rescue, investigation, and rite routes", () => {
  const state = createInitialState("fr");
  choose(state, "descend-river");
  choose(state, "follow-fissure");
  choose(state, "follow-water");
  choose(state, "light-lantern");
  const options = getChoices(state).map((choice) => choice.id);
  assert.ok(options.includes("board-barge"));
  assert.ok(options.includes("read-glyphs"));
  choose(state, "read-glyphs");
  choose(state, "decipher-rite");
  choose(state, "free-poupiquet");
  assert.equal(state.flags.freedPoupiquet, true);
  choose(state, "take-poupiquet");
  assert.ok(getChoices(state).some((choice) => choice.id === "break-rite"));
});

test("conditions reveal the maintenance route only after the workers are exposed", () => {
  const state = createInitialState("en");
  choose(state, "descend-river");
  assert.ok(!getChoices(state).some((choice) => choice.id === "use-maintenance"));
  choose(state, "visit-workers");
  choose(state, "study-shields");
  choose(state, "reach-sluice");
  choose(state, "retreat-sluice");
  assert.ok(getChoices(state).some((choice) => choice.id === "use-maintenance"));
});

test("state-driven narrative layers describe fatigue and companions on arrival", () => {
  const state = createInitialState("en");
  state.expedition.fatigue = 6;
  state.flags.befriendedKiki = true;
  const result = choose(state, "descend-river");
  assert.match(result.message.en, /Fatigue has stopped/i);
  assert.match(result.message.en, /Kiki moves at your pace/i);
  assert.equal(state.expedition.fatigue, 7);
});

test("the flooded route consumes supplies and changes a hero's condition", () => {
  const state = createInitialState("fr");
  state.currentScene = "flooded_tunnel";
  const result = choose(state, "light-lantern");
  assert.equal(state.currentScene, "lantern_landing");
  assert.equal(state.expedition.supplies, 1);
  assert.equal(state.heroConditions.aldren, "tired");
  assert.match(result.message.fr, /provisions ne font plus de bruit/i);
});

test("a high-fatigue party can take a scripted breather without reopening spent choices", () => {
  const state = createInitialState("en");
  state.currentScene = "gate_chamber";
  state.expedition.fatigue = 6;
  const result = choose(state, "catch-breath");
  assert.match(result.message.en, /few breaths/i);
  assert.equal(state.expedition.fatigue, 4);
  assert.ok(!getChoices(state).some((choice) => choice.id === "catch-breath"));
});

test("the expanded city route joins festival, underground orchard, baths, and investigation", () => {
  const state = createInitialState("en");
  choose(state, "browse-lanterns");
  choose(state, "buy-secret-map");
  choose(state, "map-to-orchard");
  choose(state, "orchard-to-baths");
  choose(state, "read-bath-frieze");
  choose(state, "baths-to-dry-bed");
  assert.equal(state.currentScene, "dry_bed");
  assert.ok(state.clues.includes("old_flood_map"));
  assert.ok(state.clues.includes("white_boot_order"));
  assert.ok(state.memory.exploredChoices.includes("browse-lanterns"));
});

test("the second expansion links workshops, tavern, archives, tribunal, and Council", () => {
  const state = createInitialState("fr");
  choose(state, "browse-lanterns");
  choose(state, "visit-glasswrights");
  choose(state, "follow-glass-courier");
  choose(state, "tavern-to-paper-bridge");
  choose(state, "bridge-to-cloister");
  choose(state, "open-hidden-scriptorium");
  choose(state, "scriptorium-to-tribunal");
  choose(state, "enter-council-hatch");
  assert.equal(state.currentScene, "council_antechamber");
  assert.equal(state.heroConditions.eryndor, "tired");
  assert.ok(state.memory.exploredChoices.includes("scriptorium-to-tribunal"));
});

test("the eastern canal route exposes the signal network and rejoins the gates", () => {
  const state = createInitialState("fr");
  choose(state, "visit-salt-market");
  choose(state, "descend-drowned-post");
  choose(state, "open-tide-library");
  choose(state, "ask-ferrymen-house");
  choose(state, "buy-mooring-sigil");
  choose(state, "lower-underbridge");
  choose(state, "turn-service-wheel");
  choose(state, "silence-white-bell");
  const result = choose(state, "bell-to-gates");
  assert.equal(state.currentScene, "gate_chamber");
  assert.equal(state.flags.disabledSignal, true);
  assert.ok(state.clues.includes("flood_schedule"));
  assert.match(result.message.fr, /cloche de l'heure blanche est muette/i);
});

test("a return to a familiar hub reveals unused routes without reopening spent ones", () => {
  const state = createInitialState("en");
  choose(state, "browse-lanterns");
  choose(state, "watch-festival");
  assert.equal(state.currentScene, "river_gate");
  assert.equal(state.memory.visitedScenes.river_gate, 2);
  const options = getChoices(state).map((choice) => choice.id);
  assert.ok(!options.includes("browse-lanterns"));
  assert.ok(options.includes("visit-salt-market"));
  assert.ok(options.includes("gate-to-customs"));
  assert.ok(options.includes("gate-to-city"));
});

test("every non-final scene is authored as a meaningful decision hub", () => {
  const sparseScenes = Object.entries(GAME_DB.scenes)
    .filter(([, scene]) => !scene.ending)
    .filter(([sceneId]) => sceneId in GAME_DB.fixedChoices)
    .filter(([sceneId]) => (GAME_DB.fixedChoices[sceneId] ?? []).length < 8)
    .map(([sceneId]) => sceneId);
  assert.deepEqual(sparseScenes, []);

  const ids = Object.values(GAME_DB.fixedChoices).flat().map((choice) => choice.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("the data-driven minimap marks the current place, visited places, and available routes", () => {
  const state = createInitialState("en");
  let map = getWorldMap(state);
  assert.ok(map.nodes.find((node) => node.id === "river_gate")?.current);
  assert.ok(map.edges.some((edge) => edge.from === "river_gate" && edge.to === "festival_arcade" && edge.available));
  choose(state, "browse-lanterns");
  map = getWorldMap(state);
  assert.ok(map.nodes.find((node) => node.id === "river_gate")?.visited);
  assert.ok(map.nodes.find((node) => node.id === "festival_arcade")?.current);
});

test("every fixed route endpoint is represented on the campaign map without duplicate lines", () => {
  const map = getWorldMap(createInitialState("en"));
  const nodes = new Set(map.nodes.map((node) => node.id));
  const missing = Object.values(GAME_DB.fixedChoices).flat().filter((choice) => choice.to && !nodes.has(choice.to));
  assert.deepEqual(missing, []);
  const edgeKeys = map.edges.map((edge) => [edge.from, edge.to].sort().join(":"));
  assert.equal(new Set(edgeKeys).size, edgeKeys.length);
  assert.ok(GAME_DB.scenes.signal_bell);
  assert.ok(map.nodes.some((node) => node.id === "signal_bell"));
  assert.ok(GAME_DB.fixedChoices.river_gate.length >= 8);
  assert.ok(GAME_DB.fixedChoices.gate_chamber.length >= 8);
});
