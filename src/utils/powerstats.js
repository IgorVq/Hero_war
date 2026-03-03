export function parsePowerstatValue(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

export function normalizePowerstats(powerstats = {}) {
  return {
    intelligence: parsePowerstatValue(powerstats.intelligence),
    strength: parsePowerstatValue(powerstats.strength),
    speed: parsePowerstatValue(powerstats.speed),
    durability: parsePowerstatValue(powerstats.durability),
    power: parsePowerstatValue(powerstats.power),
    combat: parsePowerstatValue(powerstats.combat),
  }
}
