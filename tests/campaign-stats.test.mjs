import test from "node:test";
import assert from "node:assert/strict";

import { getCampaignStats } from "../src/campaign-stats.js";
import { GAME_DB } from "../src/game-db.js";

test("campaign statistics are derived from authored campaign data", () => {
  const stats = getCampaignStats(GAME_DB);

  assert.ok(stats.sceneCount < Object.keys(GAME_DB.scenes).length);
  assert.equal(stats.endingCount, new Set(Object.values(GAME_DB.fixedChoices).flat().map((choice) => choice.to).filter((sceneId) => GAME_DB.scenes[sceneId]?.ending)).size);
  assert.equal(stats.choiceCount, Object.values(GAME_DB.fixedChoices).flat().length);
  assert.equal(stats.characterCount, Object.keys(GAME_DB.entities.characters).length);
  assert.equal(stats.regionCount, GAME_DB.worldMap.regions.length);
  assert.ok(stats.wordCount.fr > 1000);
  assert.ok(stats.wordCount.en > 1000);
});
