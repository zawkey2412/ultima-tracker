// Manages delay queue
export function delayTurn(combatant) {
  if (!combatant) return;
  // Mark as delayed for this round
  combatant.setFlag("ultima-tracker", "delayed", true);
  // Move to end of current round
  const combat = game.combat;
  if (!combat) return;
  const idx = combat.turns.findIndex((c) => c.id === combatant.id);
  if (idx >= 0) {
    const delayed = combat.turns.splice(idx, 1)[0];
    combat.turns.push(delayed);
    combat.update({ turn: combat.turn });
  }
}

export function clearDelayedFlags(combat) {
  for (let c of combat.turns) {
    c.unsetFlag("ultima-tracker", "delayed");
  }
}
