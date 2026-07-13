# Project brief: browser-based AI gamebook

Build a browser-based textual adventure game inspired by gamebooks and interactive fiction.

The game should be written in JavaScript and deployable as a static website, ideally through GitHub Pages. The player reads narrative passages, then enters free-form text into an input field instead of selecting from predefined choices.

A small language model should interpret the player’s input and make the interaction feel more natural. The model may run locally in the browser when possible, using technologies such as WebGPU, WebAssembly, WebLLM, Transformers.js, or ONNX Runtime Web.

## Core design principle

The language model must not control the game rules or world state directly.

The application should separate:

1. Player-input interpretation
2. Deterministic game logic
3. Narrative generation

The JavaScript game engine remains the source of truth for:

- current scene;
- available locations;
- inventory;
- characters;
- quests;
- relationships;
- discovered information;
- locked or unlocked paths;
- success and failure conditions;
- permanent world facts.

The LLM should mainly be used to:

- interpret natural-language commands;
- identify player intent;
- extract targets, objects, tone, and approach;
- adapt narration to the player’s actions;
- vary scene descriptions;
- reference relevant previous events;
- make dialogue feel more natural.

## Example interaction

The player enters:

“I cautiously try the old key on the cellar door while listening for movement.”

The model should convert this into structured data such as:

```json
{
  "action": "use",
  "target": "cellar_door",
  "item": "rusty_key",
  "approach": "cautious",
  "secondary_action": "listen"
}
```

The JavaScript game engine then checks:

- whether the player owns the rusty key;
- whether the cellar door exists in the current scene;
- whether that key can unlock the door;
- whether listening reveals anything.

The engine produces a validated outcome.

The LLM may then turn that outcome into natural prose, but it must not invent unsupported rewards, objects, characters, locations, or successful actions.

## Suggested architecture

Use a pipeline similar to:

```text
Player input
→ LLM intent interpretation
→ JSON validation
→ deterministic game engine
→ state update
→ LLM narrative generation
→ interface update
```

Prefer two separate model calls.

### First call: input interpretation

The model receives:

- the current scene;
- visible objects;
- nearby characters;
- allowed action categories;
- relevant inventory items;
- the player’s input.

It returns JSON only.

Possible action categories:

- look;
- move;
- talk;
- ask;
- take;
- use;
- give;
- open;
- close;
- attack;
- defend;
- hide;
- wait;
- inspect;
- unknown.

The response must be validated before use.

### Second call: narration

After the engine resolves the action, the model receives:

- the validated action;
- the deterministic result;
- the current scene;
- relevant story facts;
- recent events;
- tone instructions.

It generates a short narrative response consistent with the game state.

## Game-state structure

Use a structured state object similar to:

```js
const gameState = {
  currentScene: "village_square",

  inventory: [
    "rusty_key"
  ],

  flags: {
    metInnkeeper: true,
    cellarUnlocked: false,
    foundHiddenLetter: false
  },

  relationships: {
    innkeeper: 2
  },

  quests: {
    investigateDisappearances: "active"
  },

  knownFacts: [
    "The old mill has been abandoned for ten years."
  ]
};
```

Game content should be data-driven rather than hardcoded throughout the interface.

Scenes could use a structure such as:

```js
const scenes = {
  village_square: {
    title: "Village Square",
    description: "A rain-darkened square surrounded by shuttered houses.",
    exits: {
      north: "old_inn",
      east: "forest_path"
    },
    objects: [
      "dry_fountain",
      "notice_board"
    ],
    characters: [
      "village_guard"
    ]
  }
};
```

## Memory and story history

Do not continuously include the complete conversation transcript in every prompt.

Maintain several memory layers:

```js
const memory = {
  permanentFacts: [
    "The player is called Elian.",
    "The innkeeper trusts the player."
  ],

  recentEvents: [
    "The player entered the cellar.",
    "A scraping sound came from behind the barrels."
  ],

  storySummary:
    "Elian arrived in Greymoor, helped the innkeeper, and discovered a hidden cellar."
};
```

Each prompt should contain only:

- the current scene;
- relevant game-state facts;
- relevant permanent facts;
- a compact story summary;
- the last few interactions;
- the new player input.

Periodically update the story summary to keep the prompt compact.

Save the game state and memory in `localStorage`.

## Interface requirements

Create a simple responsive interface containing:

- game title;
- narrative transcript;
- current scene title;
- text input;
- submit button;
- loading indicator while the model responds;
- inventory display;
- optional quest or status panel;
- save, load, restart, and clear-history controls;
- optional suggested actions;
- error and fallback messages.

The interface should work on desktop and mobile browsers.

Pressing Enter should submit the command.

The transcript should visually distinguish:

- narration;
- player input;
- character dialogue;
- system or error messages.

## Local model support

Explore running a small quantized LLM directly in the browser.

Possible runtimes include:

- WebLLM;
- Transformers.js;
- ONNX Runtime Web.

The implementation should account for:

- WebGPU availability;
- initial model download time;
- browser memory limitations;
- mobile-device limitations;
- model-loading progress;
- unsupported browsers;
- generation timeouts;
- malformed structured output.

Provide a fallback mode when the local model cannot load.

The fallback may use:

- keyword matching;
- regular expressions;
- a deterministic command parser;
- suggested actions;
- predefined narration templates.

The rest of the game should remain playable without the LLM.

## Model-output validation

Never trust model output directly.

For interpretation responses:

- parse JSON safely;
- validate it against a known schema;
- reject unsupported actions;
- reject unknown objects or locations;
- normalize aliases;
- limit string lengths;
- handle incomplete or malformed responses;
- retry once with a corrective prompt when useful;
- otherwise use the fallback parser.

Example:

```js
function isValidInterpretation(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.action === "string" &&
    allowedActions.includes(value.action)
  );
}
```

Consider using a schema-validation library such as Zod or implementing a lightweight custom validator.

## Narrative constraints

The narrative-generation prompt should explicitly require the model to:

- respect the supplied outcome;
- avoid changing game-state facts;
- avoid inventing inventory items;
- avoid inventing exits or locations;
- avoid resolving unfinished quests;
- avoid revealing secret information unless the engine marks it as discovered;
- keep responses concise;
- reflect the player’s approach and tone;
- reference relevant history only when natural;
- avoid telling the player what they decide or feel.

The player should retain agency.

## Initial prototype scope

Create a small but complete vertical slice containing:

- 10 to 20 authored scenes;
- one village or isolated-location setting;
- several explorable locations;
- at least three non-player characters;
- one main mystery or quest;
- one locked area;
- several usable inventory objects;
- multiple possible approaches to some situations;
- at least two endings;
- save and restore through `localStorage`;
- local LLM integration;
- deterministic fallback parser.

The story may use a dark fantasy, mystery, or atmospheric adventure setting.

## Technical requirements

Use a straightforward project structure.

Suggested files:

```text
index.html
styles.css
src/
  main.js
  game-engine.js
  game-state.js
  scenes.js
  characters.js
  parser.js
  llm-provider.js
  narrator.js
  memory.js
  storage.js
  ui.js
```

The application should:

- run without a backend;
- be deployable to GitHub Pages;
- avoid exposing private API keys;
- use ES modules;
- have readable, documented code;
- separate UI, game logic, storage, and LLM integration;
- handle model and browser errors gracefully.

If an external API mode is added, it must be optional and must not require embedding secret keys in the public repository.

## Development order

Implement the project in stages:

1. Build the deterministic game engine.
2. Create a small playable story using predefined commands.
3. Add the browser interface.
4. Add save and load support.
5. Implement the fallback natural-language parser.
6. Add the local LLM provider.
7. Add structured input interpretation.
8. Add adaptive narration.
9. Add memory summarization.
10. Test unsupported browsers and low-memory conditions.
11. Prepare GitHub Pages deployment.

## Expected deliverables

Provide:

- a complete working codebase;
- setup and local-run instructions;
- GitHub Pages deployment instructions;
- a clear README;
- explanation of the architecture;
- instructions for changing the story content;
- instructions for replacing the model;
- notes about browser compatibility;
- known limitations;
- a fallback mode that works without an LLM.

Prioritize a reliable playable prototype over complex generative behavior. The game engine must always remain authoritative, while the model improves interpretation, dialogue, and narrative variation.
