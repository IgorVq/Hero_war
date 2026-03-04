import { defineStore } from 'pinia'
import { buildCombatStats, computeDamage } from '../utils/battleRules'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    heroA: null,
    heroB: null,
    activeSlot: 'heroA',
    heroAStats: null,
    heroBStats: null,
    heroACurrentHp: 0,
    heroBCurrentHp: 0,
    currentTurn: 'heroA',
    battleLog: [],
    winner: null,
  }),
  getters: {
    canLaunchDuel: (state) => Boolean(state.heroA && state.heroB),
  },
  actions: {
    clearBattleRuntime() {
      this.heroAStats = null
      this.heroBStats = null
      this.heroACurrentHp = 0
      this.heroBCurrentHp = 0
      this.currentTurn = 'heroA'
      this.battleLog = []
      this.winner = null
    },
    setHeroes(heroA, heroB) {
      this.heroA = heroA
      this.heroB = heroB
      this.clearBattleRuntime()
    },
    setHeroA(hero) {
      this.heroA = hero
      this.clearBattleRuntime()
    },
    setHeroB(hero) {
      this.heroB = hero
      this.clearBattleRuntime()
    },
    clearHeroA() {
      this.heroA = null
    },
    clearHeroB() {
      this.heroB = null
    },
    setActiveSlot(slot) {
      if (slot === 'heroA' || slot === 'heroB') {
        this.activeSlot = slot
      }
    },
    assignHeroToSlot(slot, hero) {
      if (!hero) return
      if (slot !== 'heroA' && slot !== 'heroB') return

      if (slot === 'heroA') {
        this.heroA = hero
        if (this.heroB?.id === hero.id) this.heroB = null
      } else {
        this.heroB = hero
        if (this.heroA?.id === hero.id) this.heroA = null
      }

      this.clearBattleRuntime()
    },
    assignHeroToActiveSlot(hero) {
      if (!hero) return

      this.assignHeroToSlot(this.activeSlot, hero)
      if (this.activeSlot === 'heroA') this.activeSlot = 'heroB'
    },
    removeHeroFromSlot(slot) {
      if (slot === 'heroA') {
        this.clearHeroA()
        this.activeSlot = 'heroA'
      }
      if (slot === 'heroB') {
        this.clearHeroB()
        this.activeSlot = 'heroB'
      }
    },
    initBattle() {
      if (!this.heroA || !this.heroB) return

      this.heroAStats = buildCombatStats(this.heroA.powerstats)
      this.heroBStats = buildCombatStats(this.heroB.powerstats)
      this.heroACurrentHp = this.heroAStats.hpMax
      this.heroBCurrentHp = this.heroBStats.hpMax
      this.currentTurn = this.heroAStats.speed >= this.heroBStats.speed ? 'heroA' : 'heroB'
      this.battleLog = []
      this.winner = null
      this.battleLog.push(
        `Debut du duel: ${this.heroA.name} vs ${this.heroB.name}. ${this.currentTurn === 'heroA' ? this.heroA.name : this.heroB.name} commence.`,
      )
    },
    playTurn() {
      if (!this.heroA || !this.heroB) return
      if (this.winner) return
      if (!this.heroAStats || !this.heroBStats) this.initBattle()
      if (!this.heroAStats || !this.heroBStats || this.winner) return

      const attackerKey = this.currentTurn
      const defenderKey = attackerKey === 'heroA' ? 'heroB' : 'heroA'

      const attacker = attackerKey === 'heroA' ? this.heroA : this.heroB
      const defender = defenderKey === 'heroA' ? this.heroA : this.heroB
      const attackerStats = attackerKey === 'heroA' ? this.heroAStats : this.heroBStats
      const defenderStats = defenderKey === 'heroA' ? this.heroAStats : this.heroBStats

      const damage = computeDamage(attackerStats.attack, defenderStats.defense)

      if (defenderKey === 'heroA') {
        this.heroACurrentHp = Math.max(0, this.heroACurrentHp - damage)
      } else {
        this.heroBCurrentHp = Math.max(0, this.heroBCurrentHp - damage)
      }

      const defenderHpAfter = defenderKey === 'heroA' ? this.heroACurrentHp : this.heroBCurrentHp

      this.battleLog.push(`${attacker.name} attaque ${defender.name} et inflige ${damage} degats.`)

      if (defenderHpAfter <= 0) {
        this.winner = attackerKey
        this.battleLog.push(`Victoire de ${attacker.name} !`)
        return
      }

      this.currentTurn = defenderKey
    },
    resetBattle() {
      this.initBattle()
    },
  },
})
