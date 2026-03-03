import { normalizePowerstats } from './powerstats'

export function buildCombatStats(powerstats) {
  const stats = normalizePowerstats(powerstats)

  return {
    hpMax: 50 + stats.durability * 2,
    attack: stats.strength + Math.floor(stats.power / 2),
    defense: Math.floor((stats.durability + stats.combat) / 2),
    speed: stats.speed,
  }
}

export function computeDamage(attackerAttack, defenderDefense) {
  return Math.max(1, attackerAttack - Math.floor(defenderDefense / 2))
}
