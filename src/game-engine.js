import { GAME_DB } from "./game-db.js";
import { remember } from "./memory.js";

const localized = (fr, en) => ({ fr, en });
let activeDatabase = GAME_DB;

function withDatabase(database, operation) {
  const previous = activeDatabase;
  activeDatabase = database;
  try { return operation(); } finally { activeDatabase = previous; }
}

function getPath(root, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => value?.[key], root);
}

function setPath(root, dottedPath, value) {
  const keys = dottedPath.split(".");
  const leaf = keys.pop();
  const parent = keys.reduce((object, key) => object[key], root);
  parent[leaf] = value;
}

function matchesValue(actual, expected) {
  const values = Array.isArray(expected) ? expected : [expected];
  return Array.isArray(actual) ? actual.some((value) => values.includes(value)) : values.includes(actual);
}

/** Evaluates declarative requirements in GAME_DB against state and parsed input. */
export function matchesRequirements(requirements, context) {
  if (requirements === undefined || requirements === true) return true;
  if (requirements === false) return false;
  if (requirements.all) return requirements.all.every((requirement) => matchesRequirements(requirement, context));
  if (requirements.any) return requirements.any.some((requirement) => matchesRequirements(requirement, context));
  if (requirements.not && typeof requirements.not === "object") return !matchesRequirements(requirements.not, context);

  const actual = getPath(context, requirements.path);
  if ("equals" in requirements && actual !== requirements.equals) return false;
  if ("not" in requirements && actual === requirements.not) return false;
  if ("in" in requirements && !requirements.in.includes(actual)) return false;
  if ("atLeast" in requirements && !(Number(actual) >= requirements.atLeast)) return false;
  if ("atMost" in requirements && !(Number(actual) <= requirements.atMost)) return false;
  if ("lengthAtLeast" in requirements && !(Array.isArray(actual) && actual.length >= requirements.lengthAtLeast)) return false;
  if ("lengthAtMost" in requirements && !(Array.isArray(actual) && actual.length <= requirements.lengthAtMost)) return false;
  if ("includes" in requirements && !(Array.isArray(actual) && actual.includes(requirements.includes))) return false;
  if ("lacks" in requirements && Array.isArray(actual) && actual.includes(requirements.lacks)) return false;
  return true;
}

function matchesWhen(when = {}, context) {
  return Object.entries(when).every(([field, expected]) => {
    const actual = field === "scene" ? context.state.currentScene : context.input?.[field];
    return matchesValue(actual, expected);
  });
}

function resolveDataValue(effect, context) {
  if (!effect.valueFrom) return effect.value;
  const source = getPath(context, effect.valueFrom);
  return effect.map?.[source] ?? effect.map?.default ?? source;
}

function interpolate(value, variables) {
  if (typeof value === "string") return value.replace(/\{\{(\w+)\}\}/g, (_, key) => String(variables[key] ?? ""));
  if (Array.isArray(value)) return value.map((entry) => interpolate(entry, variables));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, interpolate(entry, variables)]));
  return value;
}

function materializeResult(result, state, historyKey, variables = {}) {
  const variants = result?.variants;
  if (!Array.isArray(variants) || !variants.length) return interpolate(result, variables);
  state.memory ??= {};
  state.memory.resultVariantCounts ??= {};
  const index = state.memory.resultVariantCounts[historyKey] ?? 0;
  state.memory.resultVariantCounts[historyKey] = index + 1;
  return interpolate({ ...result, text: variants[index % variants.length] }, variables);
}

/** Applies generic database effects. No world-specific ids are interpreted here. */
export function applyEffects(state, effects = [], input = {}) {
  const context = { state, input };
  for (const effect of effects) {
    const value = resolveDataValue(effect, context);
    const current = effect.path ? getPath(state, effect.path) : undefined;
    switch (effect.op) {
      case "set": setPath(state, effect.path, value); break;
      case "increment": setPath(state, effect.path, Number(current ?? 0) + Number(value)); break;
      case "min": setPath(state, effect.path, Math.min(Number(current ?? 0), Number(value))); break;
      case "max": setPath(state, effect.path, Math.max(Number(current ?? 0), Number(value))); break;
      case "clamp": setPath(state, effect.path, Math.min(Number(effect.max ?? Infinity), Math.max(Number(effect.min ?? -Infinity), Number(current ?? 0)))); break;
      case "addUnique": if (!current.includes(value)) current.push(value); break;
      case "remove": setPath(state, effect.path, current.filter((entry) => entry !== value)); break;
      case "move": state.currentScene = effect.to; break;
      case "remember":
        if (!state.memory.permanentFacts.includes(value)) state.memory.permanentFacts.push(value);
        break;
      default: throw new Error(`Unknown database effect: ${effect.op}`);
    }
  }
}

function outputFrom(result, state) {
  if (result?.sceneDescription) return { message: activeDatabase.scenes[state.currentScene].description, type: "narration", consumesTurn: true };
  return {
    message: result?.text ?? localized("", ""),
    type: result?.type ?? "narration",
    success: result?.success,
    ending: result?.ending ?? false,
    consumesTurn: result?.consumesTurn ?? true,
    repetition: result?.repetition ?? null,
  };
}

function sceneDescription(state) {
  const scene = activeDatabase.scenes[state.currentScene];
  const visits = state.memory?.visitedScenes?.[state.currentScene] ?? 0;
  const context = { state, input: {} };
  const conditional = (scene.visitDescriptions ?? []).find((entry) => matchesRequirements(entry.requires, context));
  if (conditional?.text) return conditional.text;
  return visits > 1 && scene.revisitDescription ? scene.revisitDescription : scene.description;
}

function narrativeLayers(state) {
  const scene = activeDatabase.scenes[state.currentScene];
  const context = { state, input: {} };
  const candidates = [...(activeDatabase.narrativeLayers ?? []), ...(scene.narrativeLayers ?? [])];
  return candidates
    .filter((layer) => matchesWhen(layer.when, context) && matchesRequirements(layer.requires, context))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .slice(0, activeDatabase.config.narrativeLayerLimit ?? 3)
    .map((layer) => layer.text);
}

function journalEntries(section, state) {
  const context = { state, input: {} };
  return (activeDatabase.journal?.[section] ?? [])
    .filter((entry) => matchesRequirements(entry.requires, context))
    .map((entry) => ({
      ...entry,
      updates: (entry.updates ?? []).filter((update) => matchesRequirements(update.requires, context)),
    }));
}

/** Returns campaign-authored notebook entries whose conditions are now known. */
export function getJournal(state) {
  const people = journalEntries("people", state);
  const plot = journalEntries("plot", state);
  return { people, plot, all: [...people, ...plot] };
}

function journalIds(state) {
  return new Set(getJournal(state).all.map((entry) => entry.id));
}

function journalDiscoveryEvents(previousIds, state) {
  return getJournal(state).all
    .filter((entry) => !previousIds.has(entry.id) && entry.discovery)
    .map((entry) => outputFrom({ text: entry.discovery, type: "system", consumesTurn: false }, state));
}

function fixedChoiceAvailable(choice, state) {
  if (!matchesRequirements(choice.requires, { state, input: {} })) return false;
  return choice.once === false || !(state.memory?.exploredChoices ?? []).includes(choice.id);
}

/** Returns only authored choices that have not already been consumed. */
export function getChoices(state) {
  const authored = (activeDatabase.fixedChoices?.[state.currentScene] ?? []).filter((choice) => fixedChoiceAvailable(choice, state));
  if (authored.length || activeDatabase.scenes[state.currentScene]?.ending) return authored;
  return (activeDatabase.recoveryChoices ?? []).filter((choice) => fixedChoiceAvailable(choice, state));
}

function mergeNarration(first, second) {
  if (!first) return second;
  if (!second) return first;
  return localized(`${first.fr}\n\n${second.fr}`, `${first.en}\n\n${second.en}`);
}

/** Resolves a single fixed choice.  Choice IDs, conditions and consequences all live in data. */
export function resolveChoice(state, choiceId) {
  const choice = getChoices(state).find((entry) => entry.id === choiceId);
  if (!choice) return outputFrom(activeDatabase.defaults.other.result, state);
  const journalBefore = journalIds(state);
  state.memory ??= {};
  state.memory.exploredChoices ??= [];
  state.memory.visitedScenes ??= {};
  state.memory.visitedScenes[state.currentScene] ??= 1;
  if (choice.once !== false) state.memory.exploredChoices.push(choice.id);
  state.turns += choice.consumesTurn === false ? 0 : 1;
  applyEffects(state, choice.effects ?? [], { choiceId });
  if (choice.to) state.currentScene = choice.to;
  if (choice.to) {
    state.memory.visitedScenes[state.currentScene] = (state.memory.visitedScenes[state.currentScene] ?? 0) + 1;
    applyEffects(state, activeDatabase.scenes[state.currentScene]?.entryEffects ?? [], { choiceId });
  }
  if (choice.consumesTurn !== false) applyEffects(state, activeDatabase.config.choiceTurnEffects ?? [], { choiceId });
  const narrative = choice.result ? outputFrom(choice.result, state).message : null;
  const arrival = choice.to ? sceneDescription(state) : null;
  let result = {
    message: [narrative, arrival, ...narrativeLayers(state)].filter(Boolean).reduce(mergeNarration, null) ?? localized("", ""),
    type: choice.result?.type ?? "narration",
    success: choice.result?.success,
    ending: activeDatabase.scenes[state.currentScene]?.ending ?? false,
    consumesTurn: choice.consumesTurn !== false,
  };
  result = runTimers(state, { choiceId }, result);
  const discoveries = journalDiscoveryEvents(journalBefore, state);
  if (discoveries.length) result = { ...result, events: [...(result.events ?? []), ...discoveries] };
  remember(state, result.message);
  for (const event of result.events ?? []) remember(state, event.message);
  return result;
}

function localizedSuggestions(state) {
  const scene = activeDatabase.scenes[state.currentScene];
  const suggestions = {
    fr: [...(scene.suggestions?.fr ?? [])],
    en: [...(scene.suggestions?.en ?? [])],
  };
  const context = { state, input: {} };
  for (const rule of activeDatabase.suggestionRules) {
    if (!matchesRequirements(rule.requires, context)) continue;
    suggestions.fr.push(...rule.values.fr);
    suggestions.en.push(...rule.values.en);
  }
  const heroSuggestion = activeDatabase.heroSuggestions[state.currentScene]?.[state.activeHero];
  if (heroSuggestion) {
    suggestions.fr.unshift(heroSuggestion.fr);
    suggestions.en.unshift(heroSuggestion.en);
  }
  return { fr: [...new Set(suggestions.fr)], en: [...new Set(suggestions.en)] };
}

function contextualOutput(state, result) {
  const suggestions = localizedSuggestions(state);
  const decorate = (prefix, values, quoteLeft, quoteRight) => `${prefix}${values.length ? ` ${values.map((value) => `${quoteLeft}${value}${quoteRight}`).join(", ")}.` : ""}`;
  return outputFrom({
    ...result,
    text: localized(
      decorate(result.contextual.fr, suggestions.fr, "« ", " »"),
      decorate(result.contextual.en, suggestions.en, "“", "”"),
    ),
  }, state);
}

function runEnterTriggers(state, input) {
  const context = { state, input };
  const trigger = activeDatabase.enterTriggers.find((rule) => matchesWhen(rule.when, context) && matchesRequirements(rule.requires, context));
  if (!trigger) return null;
  applyEffects(state, trigger.effects, input);
  return outputFrom(trigger.result, state);
}

function resolveMove(state, input) {
  const scene = activeDatabase.scenes[state.currentScene];
  const exit = Object.values(scene.exits ?? {}).find((candidate) => candidate.to === input.destination);
  if (!exit) return contextualOutput(state, activeDatabase.defaults.move.result);
  if (!matchesRequirements(exit.requires, { state, input })) return contextualOutput(state, exit.blockedResult ?? activeDatabase.defaults.move.result);
  applyEffects(state, exit.effects, input);
  state.currentScene = exit.to;
  return runEnterTriggers(state, input) ?? outputFrom({ sceneDescription: true }, state);
}

function resolveInteraction(state, input) {
  const context = { state, input };
  const interaction = activeDatabase.interactions.find((rule) => matchesWhen(rule.when, context) && matchesRequirements(rule.requires, context));
  if (!interaction) return null;
  state.memory ??= {};
  state.memory.interactionCounts ??= {};
  const seen = state.memory.interactionCounts[interaction.id] ?? 0;
  state.memory.interactionCounts[interaction.id] = seen + 1;
  const repeatPolicy = seen > 0 ? activeDatabase.config.repeatedActions?.[input.action] : null;
  if (repeatPolicy) {
    const repeatResult = materializeResult(repeatPolicy, state, `repeat:${interaction.id}`, { count: seen + 1 });
    return outputFrom({ ...repeatResult, repetition: { interactionId: interaction.id, count: seen + 1 } }, state);
  }
  applyEffects(state, interaction.effects, input);
  return outputFrom(materializeResult(interaction.result, state, interaction.id), state);
}

function runTimers(state, input, previousResult) {
  if (previousResult.ending || previousResult.consumesTurn === false) return previousResult;
  let result = previousResult;
  for (const timer of activeDatabase.timers ?? []) {
    const context = { state, input };
    if (!matchesRequirements(timer.requires, context)) continue;
    applyEffects(state, timer.effects, input);
    const event = outputFrom(timer.result, state);
    // Endings replace the action outcome. Other timer events are delivered
    // alongside it, so an evolving world never hides the player's result.
    if (event.ending) return event;
    result = { ...result, events: [...(result.events ?? []), event] };
  }
  return result;
}

export function getObjective(state) {
  const context = { state, input: {} };
  return activeDatabase.objectives.find((objective) => matchesRequirements(objective.requires, context))?.text ?? localized("", "");
}

export function getSuggestions(state, language) {
  return localizedSuggestions(state)[language] ?? [];
}

/** Returns campaign-defined, currently relevant world facts for the UI. */
export function getStatuses(state) {
  const context = { state, input: {} };
  return (activeDatabase.statuses ?? [])
    .filter((status) => matchesRequirements(status.requires, context))
    .map((status) => status.text);
}

/** Returns campaign-defined expedition meters for the UI, without knowing their paths. */
export function getExpeditionMeters(state) {
  return (activeDatabase.config.expeditionMeters ?? []).map((meter) => ({
    ...meter,
    value: getPath(state, meter.path),
  }));
}

/** Returns a campaign-defined map plus links derived from the fixed choice graph. */
export function getWorldMap(state) {
  const map = activeDatabase.worldMap;
  if (!map) return null;
  const nodeIds = new Set((map.nodes ?? []).map((node) => node.id));
  const availableIds = new Set(getChoices(state).map((choice) => choice.id));
  const visited = new Set(Object.keys(state.memory?.visitedScenes ?? {}));
  visited.add(state.currentScene);
  const edgeIndex = new Map();
  for (const [from, choices] of Object.entries(activeDatabase.fixedChoices ?? [])) {
    for (const choice of choices) {
      if (!choice.to || !nodeIds.has(from) || !nodeIds.has(choice.to)) continue;
      const key = [from, choice.to].sort().join(":");
      const existing = edgeIndex.get(key) ?? { from, to: choice.to, available: false };
      existing.available ||= from === state.currentScene && availableIds.has(choice.id);
      edgeIndex.set(key, existing);
    }
  }
  return {
    ...map,
    nodes: (map.nodes ?? []).map((node) => ({ ...node, visited: visited.has(node.id), current: node.id === state.currentScene })),
    edges: [...edgeIndex.values()],
  };
}

export function getScene(state) {
  return activeDatabase.scenes[state.currentScene];
}

export function resolveAction(state, interpretation) {
  if (activeDatabase.scenes[state.currentScene].ending) return contextualOutput(state, activeDatabase.defaults.other.result);

  const input = { ...interpretation, actor: interpretation.actor ?? state.activeHero ?? "party" };
  state.turns += 1;
  let result;
  if (input.action === "move") result = resolveMove(state, input);
  else if (input.action === "look") result = outputFrom(activeDatabase.defaults.look.result, state);
  else result = resolveInteraction(state, input) ?? contextualOutput(state, activeDatabase.defaults[input.action]?.result ?? activeDatabase.defaults.other.result);

  if (result.consumesTurn === false) state.turns = Math.max(0, state.turns - 1);
  result = runTimers(state, input, result);
  remember(state, result.message);
  for (const event of result.events ?? []) remember(state, event.message);
  return result;
}

export function visibleContext(state) {
  const scene = getScene(state);
  return {
    scene: state.currentScene,
    exits: Object.values(scene.exits ?? {}).map((exit) => exit.to),
    objects: scene.objects ?? [],
    characters: scene.characters ?? [],
    inventory: state.inventory,
    heroes: Object.keys(activeDatabase.entities.heroes),
    dialogueTopics: Object.keys(activeDatabase.entities.topics),
    activeHero: state.activeHero,
    flags: Object.fromEntries(Object.entries(state.flags).filter(([, value]) => value)),
  };
}

/** Creates an engine bound to a database without changing the engine code. */
export function createGameEngine(database) {
  return {
    resolveAction: (state, interpretation) => withDatabase(database, () => resolveAction(state, interpretation)),
    getObjective: (state) => withDatabase(database, () => getObjective(state)),
    getScene: (state) => withDatabase(database, () => getScene(state)),
    getSuggestions: (state, language) => withDatabase(database, () => getSuggestions(state, language)),
    getStatuses: (state) => withDatabase(database, () => getStatuses(state)),
    getExpeditionMeters: (state) => withDatabase(database, () => getExpeditionMeters(state)),
    getWorldMap: (state) => withDatabase(database, () => getWorldMap(state)),
    getJournal: (state) => withDatabase(database, () => getJournal(state)),
    getChoices: (state) => withDatabase(database, () => getChoices(state)),
    resolveChoice: (state, choiceId) => withDatabase(database, () => resolveChoice(state, choiceId)),
    isDeadlineSecured: (state) => withDatabase(database, () => isDeadlineSecured(state)),
    visibleContext: (state) => withDatabase(database, () => visibleContext(state)),
  };
}
