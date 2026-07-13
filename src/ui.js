import { GAME_DB } from "./game-db.js";
import { t, UI_TEXT } from "./i18n.js";
import { getChoices, getExpeditionMeters, getJournal, getScene, getStatuses, getWorldMap } from "./game-engine.js";

const ids = [
  "gameEyebrow", "gameTitle", "languageButton", "modelStatus", "chapterLabel", "sceneTitle", "transcript",
  "choicesHeading", "choicesHint", "suggestions",
  "objectiveHeading", "objectiveText", "partyHeading", "partyHint", "partyList", "expeditionHeading", "expeditionList", "inventoryHeading", "inventoryList", "cluesHeading", "cluesList", "journalHeading", "journalHint", "peopleHeading", "peopleJournalCount", "peopleJournalList", "plotHeading", "plotJournalCount", "plotJournalList", "worldHeading", "worldList", "mapHeading", "mapHint", "mapExpandButton", "minimap", "mapDialog", "mapDialogTitle", "mapDialogHint", "mapCloseButton", "largeMap",
  "gameHeading", "saveButton", "loadButton", "restartButton", "clearButton",
];
export const elements = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));

function renderList(element, values, emptyLabel) {
  element.replaceChildren();
  if (!values.length) { const li = document.createElement("li"); li.className = "empty"; li.textContent = emptyLabel; element.append(li); return; }
  for (const value of values) { const li = document.createElement("li"); li.textContent = value; element.append(li); }
}

function renderTranscript(state) {
  elements.transcript.replaceChildren();
  for (const entry of state.transcript) { const p = document.createElement("p"); p.className = `entry ${entry.type}`; p.textContent = t(entry.text, state.language); elements.transcript.append(p); }
  requestAnimationFrame(() => { elements.transcript.scrollTop = elements.transcript.scrollHeight; });
}

function renderChoices(state, onChoice) {
  elements.suggestions.replaceChildren();
  const choices = getChoices(state);
  if (getScene(state).ending) {
    const note = document.createElement("p"); note.className = "choice-ending"; note.textContent = UI_TEXT[state.language].endingHint; elements.suggestions.append(note); return;
  }
  if (!choices.length && !getScene(state).ending) {
    const note = document.createElement("p"); note.className = "empty"; note.textContent = state.language === "fr" ? "Toutes les pistes disponibles ont été épuisées." : "Every available lead has been exhausted."; elements.suggestions.append(note);
  }
  for (const choice of choices) {
    const button = document.createElement("button"); button.type = "button"; button.textContent = t(choice.label, state.language); button.addEventListener("click", () => onChoice(choice.id)); elements.suggestions.append(button);
  }
}

function renderParty(state) {
  elements.partyList.replaceChildren();
  for (const [id, hero] of Object.entries(GAME_DB.entities.heroes)) {
    const member = document.createElement("div"); member.className = "party-member";
    const name = document.createElement("span"); const role = document.createElement("small"); const condition = state.heroConditions?.[id] ?? "steady"; const conditionLabel = t(GAME_DB.config.heroConditionLabels?.[condition] ?? condition, state.language); name.textContent = t(hero.name, state.language); role.textContent = `${t(hero.role, state.language)} · ${conditionLabel}`;
    member.append(name, role); elements.partyList.append(member);
  }
}

function renderExpeditionMeters(state) {
  elements.expeditionList.replaceChildren();
  const meters = getExpeditionMeters(state);
  if (!meters.length) return renderList(elements.expeditionList, [], UI_TEXT[state.language].empty);
  for (const meter of meters) {
    const li = document.createElement("li"); li.className = `meter${meter.max ? " has-scale" : ""}`;
    const head = document.createElement("div"); head.className = "meter-head";
    const label = document.createElement("span"); label.textContent = t(meter.label, state.language);
    const value = document.createElement("strong"); value.textContent = `${meter.value}${meter.max ? `/${meter.max}` : ""}${t(meter.suffix, state.language)}`;
    head.append(label, value); li.append(head);
    if (meter.max) { const track = document.createElement("span"); track.className = "meter-track"; const fill = document.createElement("span"); fill.style.width = `${Math.max(0, Math.min(100, (Number(meter.value) / meter.max) * 100))}%`; track.append(fill); li.append(track); }
    elements.expeditionList.append(li);
  }
}

function renderJournalList(element, entries, language, emptyLabel) {
  element.replaceChildren();
  if (!entries.length) { const li = document.createElement("li"); li.className = "empty"; li.textContent = emptyLabel; element.append(li); return; }
  for (const entry of entries) {
    const li = document.createElement("li");
    const title = document.createElement("strong"); title.textContent = t(entry.title, language);
    const text = document.createElement("p"); text.textContent = t(entry.text, language);
    li.append(title, text);
    if (entry.updates?.length) {
      const updates = document.createElement("ul"); updates.className = "journal-updates";
      for (const update of entry.updates) { const updateItem = document.createElement("li"); updateItem.textContent = `${UI_TEXT[language].journalUpdate} — ${t(update.text, language)}`; updates.append(updateItem); }
      li.append(updates);
    }
    element.append(li);
  }
}

function svgElement(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  return element;
}

function renderMap(state, target, expanded = false) {
  const map = getWorldMap(state);
  target.replaceChildren();
  if (!map?.nodes?.length) return;
  const svg = svgElement("svg", { class: expanded ? "expanded-map-svg" : "minimap-svg", viewBox: map.viewBox, role: "img", "aria-label": state.language === "fr" ? "Carte géographique de l'aventure" : "Geographic map of the adventure", preserveAspectRatio: "xMidYMid meet" });
  const nodes = new Map(map.nodes.map((node) => [node.id, node]));
  for (const region of map.regions ?? []) {
    svg.append(svgElement("rect", { class: "map-region", x: region.x, y: region.y, width: region.width, height: region.height, rx: 8 }));
    const label = svgElement("text", { class: "map-region-label", x: region.x + 8, y: region.y + 14 }); label.textContent = t(region.label, state.language); svg.append(label);
  }
  for (const edge of map.edges ?? []) {
    const from = nodes.get(edge.from); const to = nodes.get(edge.to); if (!from || !to) continue;
    svg.append(svgElement("line", { class: `map-edge${edge.available ? " available" : ""}${from.visited && to.visited ? " travelled" : ""}`, x1: from.x, y1: from.y, x2: to.x, y2: to.y }));
  }
  for (const node of map.nodes) {
    const group = svgElement("g", { class: `map-node${node.visited ? " visited" : ""}${node.current ? " current" : ""}` });
    const title = svgElement("title"); title.textContent = t(GAME_DB.scenes[node.id]?.title ?? node.id, state.language); group.append(title);
    group.append(svgElement("circle", { cx: node.x, cy: node.y, r: node.current ? 5.5 : 3.4 }));
    if (expanded || node.visited || node.current) { const label = svgElement("text", { x: node.x + 6, y: node.y - 5 }); label.textContent = t(GAME_DB.scenes[node.id]?.title ?? node.id, state.language); group.append(label); }
    svg.append(group);
  }
  target.append(svg);
}

function renderMinimap(state) {
  renderMap(state, elements.minimap);
  renderMap(state, elements.largeMap, true);
}

export function render(state, objective, onChoice) {
  const ui = UI_TEXT[state.language]; const scene = getScene(state); document.documentElement.lang = state.language;
  elements.languageButton.textContent = state.language === "fr" ? "EN" : "FR";
  document.title = t(GAME_DB.meta.title, state.language); elements.gameEyebrow.textContent = t(GAME_DB.meta.eyebrow, state.language); elements.gameTitle.textContent = t(GAME_DB.meta.title, state.language); elements.chapterLabel.textContent = t(GAME_DB.meta.chapter, state.language); elements.sceneTitle.textContent = t(scene.title, state.language); elements.choicesHeading.textContent = ui.choices; elements.choicesHint.textContent = ui.choicesHint;
  elements.objectiveHeading.textContent = ui.objective; elements.objectiveText.textContent = t(objective, state.language); elements.partyHeading.textContent = ui.party; elements.partyHint.textContent = ui.partyHint; elements.expeditionHeading.textContent = ui.expedition; elements.mapHeading.textContent = ui.map; elements.mapHint.textContent = ui.mapHint; elements.mapExpandButton.textContent = ui.expandMap; elements.mapDialogTitle.textContent = ui.map; elements.mapDialogHint.textContent = ui.mapDialogHint; elements.mapCloseButton.setAttribute("aria-label", state.language === "fr" ? "Fermer la carte" : "Close map");
  elements.inventoryHeading.textContent = ui.inventory; elements.cluesHeading.textContent = ui.clues; elements.journalHeading.textContent = ui.journal; elements.journalHint.textContent = ui.journalHint; elements.peopleHeading.textContent = ui.people; elements.plotHeading.textContent = ui.plot; elements.worldHeading.textContent = ui.world; elements.gameHeading.textContent = ui.game; elements.saveButton.textContent = ui.save; elements.loadButton.textContent = ui.load; elements.restartButton.textContent = ui.restart; elements.clearButton.textContent = ui.clear;
  elements.modelStatus.textContent = ui.scripted; elements.modelStatus.className = "status-pill offline";
  const journal = getJournal(state);
  elements.peopleJournalCount.textContent = ui.journalCount(journal.people.length); elements.plotJournalCount.textContent = ui.journalCount(journal.plot.length);
  renderExpeditionMeters(state); renderList(elements.inventoryList, state.inventory.map((id) => t(GAME_DB.entities.items[id]?.name ?? id, state.language)), ui.empty); renderList(elements.cluesList, state.clues.map((id) => t(GAME_DB.entities.clues[id] ?? id, state.language)), ui.empty); renderJournalList(elements.peopleJournalList, journal.people, state.language, ui.journalEmptyPeople); renderJournalList(elements.plotJournalList, journal.plot, state.language, ui.journalEmptyPlot); renderList(elements.worldList, getStatuses(state).map((status) => t(status, state.language)), ui.empty);
  renderTranscript(state); renderChoices(state, onChoice); renderParty(state); renderMinimap(state);
}

export function appendEntry(entry, language) { const p = document.createElement("p"); p.className = `entry ${entry.type}`; p.textContent = t(entry.text, language); elements.transcript.append(p); elements.transcript.scrollTop = elements.transcript.scrollHeight; }
export function setBusy(isBusy) { for (const button of elements.suggestions.querySelectorAll("button")) button.disabled = isBusy; for (const button of elements.partyList.querySelectorAll("button")) button.disabled = isBusy; }
