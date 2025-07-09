// Pulls HP, AC, etc. from any system
export function getActorStats(actor) {
  if (!actor) return { hp: "?", maxHP: "?", ac: "?" };
  // D&D 5e
  if (actor.system?.attributes?.hp) {
    return {
      hp: actor.system.attributes.hp.value,
      maxHP: actor.system.attributes.hp.max,
      ac: actor.system.attributes.ac?.value || "?",
    };
  }
  // Pathfinder 2e
  if (actor.system?.attributes?.hp && actor.system?.attributes?.ac) {
    return {
      hp: actor.system.attributes.hp.value,
      maxHP: actor.system.attributes.hp.max,
      ac: actor.system.attributes.ac.value,
    };
  }
  // SWADE (example)
  if (actor.system?.stats?.toughness) {
    return {
      hp: actor.system.stats.toughness.value,
      maxHP: actor.system.stats.toughness.value,
      ac: actor.system.stats.parry.value,
    };
  }
  // Fallback
  return { hp: "?", maxHP: "?", ac: "?" };
}
