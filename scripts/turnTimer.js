// Timer logic + warning/end
let timerInterval = null;
let timerSeconds = 0;
let timerCombatantId = null;

function getTimerDuration(combatant) {
  // Default: PCs 60s, NPCs 30s
  return combatant.actor.hasPlayerOwner ? 60 : 30;
}

export function startTurnTimer(combatant) {
  if (!combatant) return;
  clearInterval(timerInterval);
  timerSeconds = getTimerDuration(combatant);
  timerCombatantId = combatant.id;
  updateTimerUI();
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerUI();
    if (timerSeconds === 10) {
      // Audio warning
      ui.notifications.info("10 seconds remaining!");
    }
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      ChatMessage.create({
        content: `⏳ ${combatant.name}'s turn expired. Auto-ended.`,
      });
      game.combat.nextTurn();
    }
  }, 1000);
}

function updateTimerUI() {
  let el = document.getElementById("ut-timer");
  if (!el) {
    el = document.createElement("div");
    el.id = "ut-timer";
    document.body.appendChild(el);
  }
  if (timerCombatantId && timerSeconds > 0) {
    el.innerHTML = `⏱️ ${timerSeconds}s`;
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}
