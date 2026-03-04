import { defineStore } from 'pinia'
import { buildCombatStats, computeDamage } from '../utils/battleRules'

const STORAGE_KEY = 'hero_war_best_heroes_v1'

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
    winsByHeroId: {},
    heroesById: {},
  }),
  getters: {
    canLaunchDuel: (state) => Boolean(state.heroA && state.heroB),
    bestHeroesRanking: (state) =>
      Object.entries(state.winsByHeroId)
        .map(([id, wins]) => {
          const hero = state.heroesById[id]
          if (!hero) return null

          return {
            ...hero,
            wins,
          }
        })
        .filter(Boolean)
        .sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name)),
  },
  actions: {
    hydrateBestHeroes() {
      if (typeof window === 'undefined') return

      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return

        const parsed = JSON.parse(raw)
        const wins = parsed?.winsByHeroId
        const heroes = parsed?.heroesById

        if (wins && typeof wins === 'object') {
          this.winsByHeroId = wins
        }

        if (heroes && typeof heroes === 'object') {
          this.heroesById = heroes
        }
      } catch {
        this.winsByHeroId = {}
        this.heroesById = {}
      }
    },
    persistBestHeroes() {
      if (typeof window === 'undefined') return

      const payload = JSON.stringify({
        winsByHeroId: this.winsByHeroId,
        heroesById: this.heroesById,
      })
      window.localStorage.setItem(STORAGE_KEY, payload)
    },
    registerHeroForRanking(hero) {
      if (!hero?.id) return

      const key = String(hero.id)
      this.heroesById[key] = {
        id: hero.id,
        name: hero.name || 'Hero inconnu',
        imageUrl: hero?.image?.url || '',
        publisher: hero?.biography?.publisher || 'Univers inconnu',
      }
      this.persistBestHeroes()
    },
    recordWinForHero(hero) {
      if (!hero?.id) return

      const key = String(hero.id)
      this.registerHeroForRanking(hero)
      this.winsByHeroId[key] = (this.winsByHeroId[key] || 0) + 1
      this.persistBestHeroes()
    },
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
      this.registerHeroForRanking(heroA)
      this.registerHeroForRanking(heroB)
      this.clearBattleRuntime()
    },
    setHeroA(hero) {
      this.heroA = hero
      this.registerHeroForRanking(hero)
      this.clearBattleRuntime()
    },
    setHeroB(hero) {
      this.heroB = hero
      this.registerHeroForRanking(hero)
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

      this.registerHeroForRanking(hero)
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
        this.recordWinForHero(attacker)
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
