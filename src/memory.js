const MAX_RECENT = 6;

export function remember(state, event) {
  state.memory.recentEvents.push(event);
  state.memory.recentEvents = state.memory.recentEvents.slice(-MAX_RECENT);
  if (state.turns > 0 && state.turns % 6 === 0) summarize(state);
}

export function addPermanentFact(state, fact) {
  if (!state.memory.permanentFacts.includes(fact)) state.memory.permanentFacts.push(fact);
}

export function summarize(state) {
  const facts = state.memory.permanentFacts.slice(-4).join(" ");
  const events = state.memory.recentEvents.slice(-3).map((event) => event.fr ?? event.en ?? event).join(" ");
  state.memory.storySummary = `${facts} ${events}`.trim().slice(0, 800);
}

export function clearRecentMemory(state) {
  summarize(state);
  state.memory.recentEvents = [];
  state.transcript = state.transcript.slice(-8);
}
