Hooks.once("init", () => {
  console.log("Ultima Tracker | Initializing module");
});

// Setup + hooks for Ultima Tracker
import { renderTrackerUI, updateActiveActor } from "./trackerUI.js";
import { startTurnTimer } from "./turnTimer.js";
import { showGMPanel } from "./gmPanel.js";

window.ultimaTracker = {
  trackerUI: { renderTrackerUI, updateActiveActor },
  turnTimer: { start: startTurnTimer },
  gmPanel: { show: showGMPanel },
};

Hooks.once("init", () => {
  console.log("Ultima Tracker | Initializing module");
});

Hooks.on("ready", () => {
  // Render the tracker UI on the left sidebar
  renderTrackerUI();
  // Optionally, show GM panel for GMs
  if (game.user.isGM) showGMPanel();
});

Hooks.on("updateCombat", (combat, data) => {
  if (data.turn !== undefined) {
    updateActiveActor(combat.combatant);
    startTurnTimer(combat.combatant.token);
  }
});
