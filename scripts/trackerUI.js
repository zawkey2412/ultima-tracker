// Builds & updates left-side tracker
import { getActorStats } from "./systemAdapter.js";
import { delayTurn } from "./delayTurn.js";

export function renderTrackerUI() {
  let tracker = document.getElementById("ultima-tracker");
  if (!tracker) {
    tracker = document.createElement("div");
    tracker.id = "ultima-tracker";
    document.body.appendChild(tracker);
  }
  updateTrackerUI();
}

export function updateTrackerUI() {
  const tracker = document.getElementById("ultima-tracker");
  if (!tracker) return;
  const combat = game.combat;
  if (!combat) {
    tracker.innerHTML = `<div class='ut-empty'>No combat</div>`;
    return;
  }
  const round = combat.round;
  const turn = combat.turn + 1;
  const total = combat.turns.length;
  let html = `<div class='ut-round'>🕒 Round ${round} – Turn ${turn} of ${total}</div>`;
  html += `<div class='ut-list'>`;
  for (let c of combat.turns) {
    const actor = c.actor;
    const stats = getActorStats(actor);
    html += `<div class='ut-card${
      combat.combatant === c ? " ut-active" : ""
    }' data-id='${c.id}'>`;
    html += `<div class='ut-portrait' style='background-image:url(${actor.img})'></div>`;
    html += `<div class='ut-info'><b>${actor.name}</b><br>HP: ${stats.hp}/${stats.maxHP} AC: ${stats.ac}</div>`;
    html += `<div class='ut-initiative'>${c.initiative}</div>`;
    if (c.flags["ultima-tracker.delayed"])
      html += `<span class='ut-delayed' title='Delayed'>⏳</span>`;
    html += `</div>`;
  }
  html += `</div>`;
  tracker.innerHTML = html;
  // Click/hover events
  tracker.querySelectorAll(".ut-card").forEach((card) => {
    card.onclick = (e) => {
      const id = card.getAttribute("data-id");
      const combatant = game.combat.getCombatant(id);
      if (combatant && combatant.token?.object)
        canvas.tokens.get(combatant.token.id)?.control();
    };
    card.ondblclick = (e) => {
      const id = card.getAttribute("data-id");
      const combatant = game.combat.getCombatant(id);
      if (combatant && combatant.actor) combatant.actor.sheet.render(true);
    };
    card.onmouseover = (e) => {
      card.title = "HP/AC/conditions";
    };
  });
}

export function updateActiveActor(combatant) {
  updateTrackerUI();
}
