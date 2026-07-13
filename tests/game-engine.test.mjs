import test from "node:test";
import assert from "node:assert/strict";

import { getChoices, getJournal, getWorldMap, resolveChoice } from "../src/game-engine.js";
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

test("every campaign scene receives a data-defined visual atmosphere", () => {
  const presentation = GAME_DB.presentation;
  assert.ok(presentation.sceneArt[presentation.sceneThemes.defaultTheme]);
  for (const sceneId of Object.keys(GAME_DB.scenes)) {
    const themeId = presentation.sceneThemes.themeByScene[sceneId] ?? presentation.sceneThemes.defaultTheme;
    assert.ok(presentation.sceneArt[themeId], `${sceneId} should resolve to a visual theme`);
  }
});

test("the data-defined notebook reveals people and investigation facts as they are discovered", () => {
  const state = createInitialState("en");
  const geyma = choose(state, "meet-geyma");
  assert.ok(geyma.events?.some((event) => /Notebook opened.*Geyma/i.test(event.message.en)));
  assert.deepEqual(getJournal(state).people.map((entry) => entry.id), ["geyma"]);

  choose(state, "descend-river");
  const edras = choose(state, "visit-workers");
  assert.ok(edras.events?.some((event) => /Edras/i.test(event.message.en)));
  const shields = choose(state, "study-shields");
  assert.ok(shields.events?.some((event) => /not protections/i.test(event.message.en)));
  const notebook = getJournal(state);
  assert.ok(notebook.people.some((entry) => entry.id === "edras"));
  assert.ok(notebook.plot.some((entry) => entry.id === "shield_symbols"));
});

test("the deeper lore branches reveal recurring witnesses and the erased flood doctrine", () => {
  const state = createInitialState("en");
  choose(state, "browse-lanterns");
  choose(state, "arcade-to-votive-roof");
  const sava = choose(state, "meet-sava");
  assert.ok(sava.events?.some((event) => /Sava Rhyss/i.test(event.message.en)));
  assert.ok(getJournal(state).people.some((entry) => entry.id === "sava"));

  state.currentScene = "old_customs";
  choose(state, "customs-to-mirror-archive");
  choose(state, "meet-ilyra");
  const restored = choose(state, "restore-fifth-quarter");
  assert.ok(restored.events?.some((event) => /wave's target/i.test(event.message.en)));
  assert.ok(state.clues.includes("erased_quarters"));
  assert.ok(getJournal(state).plot.some((entry) => entry.id === "erased_quarters"));

  state.currentScene = "echo_well";
  choose(state, "well-to-moonwell");
  choose(state, "meet-kos");
  choose(state, "name-fifth-ring");
  assert.ok(state.clues.includes("fifth_name"));
  assert.ok(getJournal(state).people.some((entry) => entry.id === "kos"));
});

test("Vire-Basse becomes a living witness route rather than a single archive clue", () => {
  const state = createInitialState("fr");
  state.currentScene = "exile_courtyard";
  state.flags.metMaera = true;
  choose(state, "courtyard-to-low-vire");
  choose(state, "enter-witness-kitchen");
  choose(state, "meet-marwen");
  choose(state, "kitchen-to-school");
  choose(state, "meet-letha");
  choose(state, "copy-quiet-roll");
  assert.ok(state.clues.includes("quiet_roll"));
  assert.ok(getJournal(state).people.some((entry) => entry.id === "marwen"));
  assert.ok(getJournal(state).people.some((entry) => entry.id === "letha"));

  state.currentScene = "ledger_scriptorium";
  choose(state, "meet-tovar");
  choose(state, "open-vire-proceedings");
  assert.ok(state.clues.includes("vire_proceedings"));
  choose(state, "scriptorium-to-echo-vault");
  choose(state, "read-silent-trial");
  choose(state, "vault-to-assembly");
  choose(state, "convene-vire-witnesses");
  assert.ok(state.flags.vireAssembly);
  assert.ok(state.clues.includes("vire_witnesses"));
});

test("recurring NPCs can change allegiance and leave durable civic support behind", () => {
  const state = createInitialState("en");

  state.currentScene = "courier_locker";
  choose(state, "meet-yorra");
  choose(state, "shield-yorra");
  state.currentScene = "black_lantern_pier";
  const yorra = choose(state, "yorra-breaks-chain");
  assert.equal(state.flags.yorraDefected, true);
  assert.ok(state.clues.includes("courier_chain"));
  assert.match(yorra.message.en, /break the chain/i);

  state.currentScene = "lantern_hospice";
  choose(state, "meet-hara");
  choose(state, "organize-hara-network");
  assert.equal(state.flags.haraNetwork, true);
  assert.ok(getJournal(state).people.some((entry) => entry.id === "hara"));
  assert.ok(getJournal(state).plot.some((entry) => entry.id === "care_routes"));

  state.currentScene = "city_steps";
  choose(state, "meet-othran");
  state.flags.vireAssembly = true;
  const othran = choose(state, "show-othran-vire");
  assert.equal(state.flags.othranCommitted, true);
  assert.ok(state.clues.includes("guard_warrant"));
  assert.match(othran.message.en, /protective warrant/i);
});

test("the Retention Ward forms a local aid route from civic records to the gates", () => {
  const state = createInitialState("fr");
  state.currentScene = "forgotten_causeway";
  choose(state, "causeway-to-retention");
  choose(state, "retention-to-waterkeepers");
  choose(state, "meet-miren");
  choose(state, "read-ration-marks");
  assert.ok(state.clues.includes("ration_marks"));

  state.currentScene = "names_reservoir";
  choose(state, "reservoir-to-storm-registry");
  choose(state, "meet-sera");
  choose(state, "collate-delayed-roll");
  assert.ok(state.clues.includes("delayed_roll"));
  state.currentScene = "pledge_chamber";
  choose(state, "restore-common-pledge");
  assert.ok(state.clues.includes("mutual_oath"));

  state.currentScene = "drowned_mailroom";
  state.clues.push("first_exiles");
  choose(state, "mailroom-to-relief-quay");
  choose(state, "meet-pavos");
  choose(state, "map-relief-route");
  assert.ok(state.clues.includes("relief_routes"));
  assert.ok(getJournal(state).people.some((entry) => entry.id === "miren"));
  assert.ok(getJournal(state).plot.some((entry) => entry.id === "mutual_oath"));
});

test("the Dawn Ward reconnects bells, dispatches, and public warning", () => {
  const state = createInitialState("en");
  state.currentScene = "storm_registry";
  state.clues.push("delayed_roll");
  choose(state, "registry-to-dawn-portal");
  choose(state, "portal-to-bellkeepers");
  choose(state, "meet-veyra");
  choose(state, "read-double-chime");
  assert.ok(state.clues.includes("double_chime"));

  state.currentScene = "courier_roof";
  choose(state, "meet-iven");
  choose(state, "open-night-dispatch");
  assert.ok(state.clues.includes("night_dispatch"));

  state.currentScene = "voices_cistern";
  choose(state, "restore-common-signal");
  assert.ok(state.clues.includes("common_signal"));
  choose(state, "cistern-to-tribune");
  assert.equal(state.currentScene, "civic_tribune");
  assert.ok(getJournal(state).people.some((entry) => entry.id === "veyra"));
  assert.ok(getJournal(state).plot.some((entry) => entry.id === "common_signal"));
});

test("the Makers' Basin turns forged sabotage into a worker-led repair route", () => {
  const state = createInitialState("fr");
  state.currentScene = "counterweight_loft";
  choose(state, "loft-to-makers-basin");
  choose(state, "makers-to-tool-court");
  choose(state, "meet-roul");
  choose(state, "read-forged-stamps");
  assert.ok(state.clues.includes("forged_orders"));

  state.currentScene = "bellows_loft";
  choose(state, "meet-nyma");
  choose(state, "recover-safety-verse");
  assert.ok(state.clues.includes("workers_oath"));
  state.currentScene = "worksong_chapel";
  choose(state, "renew-repair-covenant");
  assert.ok(state.clues.includes("repair_covenant"));
  choose(state, "chapel-to-gates");
  assert.equal(state.currentScene, "gate_chamber");
  assert.ok(getJournal(state).people.some((entry) => entry.id === "nyma"));
  assert.ok(getJournal(state).plot.some((entry) => entry.id === "repair_covenant"));
});

test("the second lore layer connects the warning system, civic law, and displaced families", () => {
  const state = createInitialState("fr");
  state.currentScene = "rooftop_cistern";
  choose(state, "cistern-to-aviary");
  choose(state, "meet-nival");
  const warning = choose(state, "trace-silent-route");
  assert.ok(warning.events?.some((event) => /silence des quartiers bas/i.test(event.message.fr)));
  assert.ok(state.clues.includes("unseen_bell"));

  state.currentScene = "river_shrine";
  choose(state, "shrine-to-reliquary");
  choose(state, "meet-darel");
  choose(state, "read-scratched-disc");
  assert.ok(state.clues.includes("brass_concord"));

  state.currentScene = "moss_orchard";
  choose(state, "orchard-to-exiles");
  choose(state, "meet-maera");
  choose(state, "copy-exile-keys");
  assert.ok(state.clues.includes("first_exiles"));
  assert.ok(getJournal(state).people.some((entry) => entry.id === "maera"));
  assert.ok(getJournal(state).plot.some((entry) => entry.id === "brass_concord"));
});

test("the final choice carries the discovered history into a public or protected record", () => {
  const publicState = createInitialState("en");
  publicState.currentScene = "public_reckoning";
  publicState.flags.disabledSabotage = true;
  publicState.flags.disarmedShields = true;
  publicState.clues.push("valdrick_manifest", "water_rite", "brass_concord", "first_exiles");
  const publicEnding = choose(publicState, "save-city");
  assert.equal(publicState.flags.publicRecord, true);
  assert.equal(publicState.flags.campaignResolved, true);
  assert.match(publicEnding.message.en, /Council to reopen the name of Low Vire/i);

  const quietState = createInitialState("en");
  quietState.currentScene = "public_reckoning";
  quietState.flags.disabledSabotage = true;
  quietState.flags.disarmedShields = true;
  quietState.clues.push("brass_concord", "water_rite", "valdrick_manifest");
  const quietEnding = choose(quietState, "save-quietly");
  assert.equal(quietState.flags.keptArchive, true);
  assert.equal(quietState.flags.campaignResolved, true);
  assert.match(quietEnding.message.en, /Silence is a choice of survival/i);
});

test("the twelve authored conclusions depend on distinct alliances and evidence", () => {
  const endings = [
    ["save-city", {}, [], {}, "ending_dawn"],
    ["save-quietly", {}, [], {}, "ending_silent"],
    ["end-vire-covenant", { vireAssembly: true }, ["mutual_oath"], { witnesses: "public" }, "ending_vire_covenant"],
    ["end-workers-open", {}, ["repair_covenant", "forged_orders"], { gates: "collective" }, "ending_workers_open"],
    ["end-lantern-network", { haraNetwork: true }, ["relief_routes"], { reserve: "shared" }, "ending_lantern_network"],
    ["end-civic-warrant", { othranCommitted: true }, ["guard_warrant"], {}, "ending_civic_warrant"],
    ["end-courier-truth", { yorraDefected: true }, ["courier_chain"], {}, "ending_courier_truth"],
    ["end-common-signal", {}, ["common_signal", "double_chime"], { signal: "open" }, "ending_common_signal"],
    ["end-many-hands", { vireAssembly: true, haraNetwork: true }, ["repair_covenant", "common_signal"], { witnesses: "public", reserve: "shared", signal: "open", gates: "collective" }, "ending_many_hands"],
    ["end-guarded-archive", { yorraDefected: true, metTovar: true, metIlyra: true }, [], { witnesses: "protected", signal: "covert" }, "ending_guarded_archive"],
    ["end-broken-compact", {}, ["souleyna_compact"], { embassy: "expose" }, "ending_broken_compact"],
    ["end-exile-passage", { metAvel: true }, ["hostage_passage"], { embassy: "passage" }, "ending_exile_passage"],
  ];

  for (const [choiceId, flags, extraClues, dilemmas, sceneId] of endings) {
    const state = createInitialState("en");
    state.currentScene = "public_reckoning";
    state.flags.disabledSabotage = true;
    state.flags.disarmedShields = true;
    Object.assign(state.flags, flags);
    Object.assign(state.dilemmas, dilemmas);
    state.clues.push("valdrick_manifest", "water_rite", ...extraClues);
    choose(state, choiceId);
    assert.equal(state.currentScene, sceneId);
    assert.equal(state.flags.campaignResolved, true);
  }
});

test("the embassy dilemma trades public accountability against an immediate family passage", () => {
  const expose = createInitialState("en");
  expose.currentScene = "embassy_court";
  expose.clues.push("souleyna_compact");
  choose(expose, "expose-souleyna-compact");
  assert.equal(expose.dilemmas.embassy, "expose");
  assert.ok(expose.clues.includes("public_compact"));
  assert.ok(!getChoices(expose).some((choice) => choice.id === "secure-family-passage"));

  const passage = createInitialState("en");
  passage.currentScene = "embassy_court";
  passage.flags.metAvel = true;
  passage.clues.push("hostage_passage");
  choose(passage, "secure-family-passage");
  assert.equal(passage.dilemmas.embassy, "passage");
  assert.equal(passage.expedition.wealth, 4);
  assert.ok(!getChoices(passage).some((choice) => choice.id === "expose-souleyna-compact"));
});

test("the final reckoning permits voluntary hero and NPC sacrifices before an outcome", () => {
  const state = createInitialState("en");
  state.currentScene = "public_reckoning";
  state.flags.disabledSabotage = true;
  state.flags.disarmedShields = true;
  state.flags.yorraDefected = true;
  state.dilemmas.signal = "open";
  state.clues.push("valdrick_manifest", "water_rite", "common_signal", "double_chime");

  choose(state, "aldren-holds-first-light");
  assert.equal(state.heroConditions.aldren, "fallen");
  assert.ok(state.casualties.includes("Aldren Varkel"));
  choose(state, "yorra-cuts-last-route");
  assert.equal(state.flags.yorraFallen, true);
  assert.ok(state.casualties.includes("Yorra Vale"));

  const ending = choose(state, "end-common-signal");
  assert.equal(state.currentScene, "ending_common_signal");
  assert.match(ending.message.en, /Aldren remained beneath the dome/i);
  assert.match(ending.message.en, /Yorra cut the final courier chain/i);
});

test("four irreversible pivots trade public strength, safety, speed, and control", () => {
  const state = createInitialState("fr");

  state.currentScene = "fifth_quarter_assembly";
  state.flags.vireAssembly = true;
  choose(state, "publish-vire-names");
  assert.equal(state.dilemmas.witnesses, "public");
  assert.ok(!getChoices(state).some((choice) => choice.id === "protect-vire-names"));

  state.currentScene = "waterkeepers_court";
  state.flags.metMiren = true;
  choose(state, "share-retention-reserve");
  assert.equal(state.dilemmas.reserve, "shared");
  assert.equal(state.expedition.supplies, 1);

  state.currentScene = "first_light_chamber";
  state.clues.push("common_signal");
  choose(state, "open-common-signal");
  assert.equal(state.dilemmas.signal, "open");
  assert.ok(!getChoices(state).some((choice) => choice.id === "mask-common-signal"));

  state.currentScene = "worksong_chapel";
  state.clues.push("repair_covenant");
  choose(state, "share-gate-authority");
  assert.equal(state.dilemmas.gates, "collective");
  assert.ok(state.clues.includes("collective_repair"));
});

test("a spent local hub offers data-defined recovery routes until the campaign ends", () => {
  const state = createInitialState("fr");
  state.currentScene = "public_reckoning";
  state.memory.exploredChoices = GAME_DB.fixedChoices.public_reckoning.map((choice) => choice.id);
  const choices = getChoices(state);
  assert.ok(choices.some((choice) => choice.id === "recovery-city-steps"));
  assert.ok(choices.some((choice) => choice.id === "recovery-gate-chamber"));
  assert.ok(choices.every((choice) => choice.once === false));
});

test("the campaign has no turn limit or automatic flood ending", () => {
  const state = createInitialState("en");
  state.turns = 10000;
  const result = choose(state, "browse-lanterns");
  assert.equal(state.currentScene, "festival_arcade");
  assert.equal(result.ending, false);
  assert.equal(GAME_DB.config.floodTurn, undefined);
  assert.deepEqual(GAME_DB.timers ?? [], []);
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

test("local resting choices restore the expedition without becoming reusable shortcuts", () => {
  const shrineState = createInitialState("fr");
  shrineState.currentScene = "river_shrine";
  shrineState.expedition.fatigue = 5;
  assert.ok(getChoices(shrineState).some((choice) => choice.id === "rest-at-shrine"));
  const shrineRest = choose(shrineState, "rest-at-shrine");
  assert.match(shrineRest.message.fr, /moins lourdes/i);
  assert.equal(shrineState.expedition.fatigue, 3);
  assert.equal(shrineState.heroConditions.party, "steady");
  assert.ok(!getChoices(shrineState).some((choice) => choice.id === "rest-at-shrine"));

  const hospiceState = createInitialState("en");
  hospiceState.currentScene = "lantern_hospice";
  hospiceState.expedition.fatigue = 4;
  hospiceState.expedition.wounds = 1;
  choose(hospiceState, "rest-at-hospice");
  assert.equal(hospiceState.expedition.fatigue, 2);
  assert.equal(hospiceState.expedition.wounds, 0);
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

test("the annex stories form a multi-branch route back into the main investigation", () => {
  const state = createInitialState("en");
  choose(state, "browse-lanterns");
  choose(state, "arcade-to-mask-exchange");
  choose(state, "unmask-courier");
  choose(state, "mask-to-clock");
  choose(state, "clock-to-annex");
  choose(state, "annex-to-infirmary");
  choose(state, "infirmary-to-theater");
  choose(state, "theater-to-stairs");
  choose(state, "stairs-to-gallery");
  assert.equal(state.currentScene, "gallery_procession");
  assert.ok(state.clues.includes("courier_seal"));
  assert.ok(getChoices(state).some((choice) => choice.id === "decipher-rite"));
});

test("the final sequence resolves the rite, the gate, the shields, then the public case", () => {
  const state = createInitialState("en");
  choose(state, "descend-river");
  choose(state, "follow-fissure");
  choose(state, "follow-water");
  choose(state, "light-lantern");
  choose(state, "board-barge");
  choose(state, "open-ledger");
  choose(state, "share-ledger");
  choose(state, "escort-witnesses");
  choose(state, "decipher-rite");
  choose(state, "free-poupiquet");
  choose(state, "take-poupiquet");
  choose(state, "break-rite");
  choose(state, "cross-breach");
  choose(state, "inspect-wedge");
  choose(state, "remove-wedge");
  choose(state, "disarm-shields");
  assert.equal(state.currentScene, "public_reckoning");
  assert.equal(state.flags.disabledSabotage, true);
  assert.equal(state.flags.disarmedShields, true);
  choose(state, "save-city");
  assert.equal(state.currentScene, "ending_dawn");
});

test("the forgotten outskirts add local side stories that return to established districts", () => {
  const state = createInitialState("fr");
  choose(state, "browse-lanterns");
  choose(state, "arcade-to-mask-exchange");
  choose(state, "mask-to-hospice");
  choose(state, "question-lost-messenger");
  choose(state, "hospice-to-garden");
  choose(state, "garden-to-weir");
  choose(state, "weir-to-pump-room");
  choose(state, "free-pump-crank");
  choose(state, "pumps-to-workshop");
  assert.equal(state.currentScene, "sluice_workshop");
  assert.ok(state.clues.includes("courier_seal"));
  assert.ok(state.clues.includes("gate_sabotage"));
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
  assert.ok(options.includes("ask-ferryman"));
  assert.ok(options.includes("descend-river"));
});

test("every non-final scene is authored as a meaningful decision hub", () => {
  const sparseScenes = Object.entries(GAME_DB.scenes)
    .filter(([, scene]) => !scene.ending)
    .filter(([sceneId]) => sceneId in GAME_DB.fixedChoices)
    .filter(([sceneId]) => (GAME_DB.fixedChoices[sceneId] ?? []).length < 2)
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
  assert.ok(GAME_DB.scenes.ancient_pump_room);
  assert.ok(map.nodes.some((node) => node.id === "ancient_pump_room"));
  assert.ok(GAME_DB.fixedChoices.river_gate.length >= 3);
  assert.ok(GAME_DB.fixedChoices.gate_chamber.length >= 4);
});
