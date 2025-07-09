# ⚔️ **Ultima Tracker**

> *“Turn-Based Combat Evolved”*

**Ultima Tracker** is a **system-agnostic, combat-enhancing module** that replaces Foundry’s default combat tracker with a powerful, customizable, sidebar HUD. It introduces a sleek UI, round/turn awareness, time control, and player-friendly features designed to streamline and gamify TTRPG combat.

---

## 🧩 Core Design Goals

| Goal                       | What It Means                                                   |
| -------------------------- | --------------------------------------------------------------- |
| 🎮 Game-like Interface     | Side-mounted rectangular tracker, actor portraits, round labels |
| ⏱️ Turn Time Management    | Per-actor timer with countdown and visual/audio cues            |
| 🧠 Tactical Utility        | Delay turn mechanic, initiative reroll per round                |
| 🛠️ System-Agnostic Core   | Clean adapters for any game system                              |
| 🧼 Minimal GM Overhead     | Optional automation + override controls                         |
| 🧱 Modular Ecosystem Ready | Built to work alongside AI, music, HUD, and analytics modules   |

---

## 🗂️ Folder Structure

```
ultima-tracker/
├── module.json
├── scripts/
│   ├── init.js               ← Setup + hooks
│   ├── trackerUI.js          ← Builds & updates left-side tracker
│   ├── turnTimer.js          ← Timer logic + warning/end
│   ├── delayTurn.js          ← Manages delay queue
│   ├── roundManager.js       ← Handles initiative reroll, round logic
│   ├── gmPanel.js            ← Optional GM override panel
│   ├── systemAdapter.js      ← Pulls HP, AC, etc. from any system
├── templates/
│   ├── tracker.html
│   ├── gmPanel.html
├── styles/
│   ├── tracker.css
│   └── gmPanel.css
├── lang/
│   └── en.json
└── README.md
```

---

## 🎯 Core Features

### 1. 🧱 Tracker UI

* Left-mounted sidebar with initiative order
* Actor cards include:
  * **Portrait background**
  * HP / AC / THP bar
  * Rolled initiative
  * Visual highlight if it's the current actor
* Optional hover to show:
  * Status icons (burning, stunned, etc.)
  * Active effects

---

### 2. ⏱️ Turn Timer

* Timer starts automatically when a combatant's turn begins
* Defaults (can be configured):
  * PCs: 60s
  * NPCs: 30s
* Optional:
  * Audio warning at 10s
  * Auto-end turn if time expires
  * Chat log:  
    > ⏳ Arin Ilejay's turn expired. Auto-ended.
* Timer visible to players and GM (toggle)

---

### 3. ⏮️ Delay Turn System

* “Delay Turn” button available for PCs
* Actor is moved to **end of current round**
* Tracked in a separate "delayed" queue
* Delayed actors marked with ⏳ icon on tracker
* FIFO priority among delayed actors
* At round end, delayed actors act before new round starts

---

### 4. 🎲 Initiative Reroll Option

* Toggleable in settings or GM panel
* Re-roll all initiative scores at start of each round
* Optional rules:
  * Static values for bosses
  * Preserve original actor order
* Logged to chat:  
  > 🎲 Initiative rerolled for Round 4

---

### 5. 🧠 System-Agnostic Adapter

* Auto-detects:
  * HP / Max HP / THP
  * AC / Defense / Armor
  * Conditions / Status Effects
* Built to support:
  * D&D 5e
  * Pathfinder 2e
  * SWADE
  * Any custom system (via adapter extension)

---

### 6. 🛠️ GM Panel (Optional UI)

* Floating panel GM can toggle
* Controls:
  * Skip actor
  * Force end turn
  * Delay turn
  * Change timer
  * Toggle initiative reroll
  * Lock/unlock actor position

---

### 7. 📊 Round Info

* Top of sidebar:
  * `🕒 Round 3 – Turn 5 of 7`
* Updates live
* Option to show on canvas (top banner)

---

### 8. 🖱️ Click Features

* Click actor card: center on token
* Double-click: open sheet
* Hover: show tooltip (HP/AC/conditions)
* GM can pin tracker in place

---

## ⚙️ Settings Panel

| Setting                  | Description                      |
| ------------------------ | -------------------------------- |
| Enable Turn Timers       | Yes/No                           |
| PC Timer Duration        | In seconds (default: 60)         |
| NPC Timer Duration       | Default 30                       |
| Auto-End Turn on Timeout | Toggle                           |
| Enable Delay Turn Button | Show/hide per player             |
| Enable Reroll Initiative | Per round toggle                 |
| Show Round Header        | On tracker / top of canvas / off |
| Compact Tracker Mode     | Use icons instead of portraits   |

---

## 🔩 Dependencies / Compatibility

| System        | Supported?          |
| ------------- | ------------------- |
| D&D 5e        | ✅ Full support      |
| Pathfinder 2e | ✅ via adapter       |
| SWADE         | ✅ via adapter       |
| Other         | 🟡 Adapter required |

Compatible with:

* Drag Ruler
* Midi-QOL
* Token Action HUD
* Combat Utility Belt *(can replace some of it)*

---

## 🔗 Future-Proofed for:

* Plug-in modules like:
  * Tactical AI (auto-targeting)
  * Atmosphere Director (music triggers)
  * Combat HUD (top-center boss bars, etc.)
  * Combat Analytics (DPR, turn averages, log export)

---

## 🧠 Sample Hook Usage

```js
Hooks.on("updateCombat", (combat, data) => {
  if (data.turn !== undefined) {
    ultimaTracker.trackerUI.updateActiveActor(combat.combatant);
    ultimaTracker.turnTimer.start(combat.combatant.token);
  }
});
```

---# ultima-tracker
