// Optional GM override panel
import { rerollInitiative } from "./roundManager.js";
import { delayTurn } from "./delayTurn.js";

export function showGMPanel() {
  let panel = document.getElementById("ultima-gm-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "ultima-gm-panel";
    document.body.appendChild(panel);
  }
  panel.innerHTML = `
    <button id='ut-skip'>Skip Actor</button>
    <button id='ut-end'>Force End Turn</button>
    <button id='ut-delay'>Delay Turn</button>
    <button id='ut-timer'>Change Timer</button>
    <button id='ut-reroll'>Reroll Initiative</button>
    <button id='ut-lock'>Lock/Unlock Actor</button>
  `;
  panel.querySelector("#ut-skip").onclick = () => game.combat.nextTurn();
  panel.querySelector("#ut-end").onclick = () => game.combat.nextTurn();
  panel.querySelector("#ut-delay").onclick = () =>
    delayTurn(game.combat.combatant);
  panel.querySelector("#ut-timer").onclick = () =>
    ui.notifications.info("Change timer not implemented");
  panel.querySelector("#ut-reroll").onclick = () =>
    rerollInitiative(game.combat);
  panel.querySelector("#ut-lock").onclick = () =>
    ui.notifications.info("Lock/unlock not implemented");
  panel.style.display = "block";
}
