// Handles initiative reroll, round logic
import { clearDelayedFlags } from "./delayTurn.js";

export function rerollInitiative(
  combat,
  { staticBosses = false, preserveOrder = false } = {}
) {
  if (!combat) return;
  let order = combat.turns.map((c) => c.id);
  for (let c of combat.turns) {
    if (staticBosses && c.actor.getFlag("ultima-tracker", "static")) continue;
    c.update({ initiative: Math.floor(Math.random() * 20) + 1 });
  }
  if (preserveOrder) {
    combat.turns.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }
  ChatMessage.create({
    content: `🎲 Initiative rerolled for Round ${combat.round}`,
  });
}

Hooks.on("endOfRound", (combat) => {
  // Move delayed actors to act before new round
  let delayed = combat.turns.filter((c) => c.flags["ultima-tracker.delayed"]);
  if (delayed.length) {
    combat.turns = delayed.concat(
      combat.turns.filter((c) => !c.flags["ultima-tracker.delayed"])
    );
    clearDelayedFlags(combat);
    combat.update({ turn: 0 });
  }
});
