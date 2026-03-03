import { defineStore } from 'pinia'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    heroA: null,
    heroB: null,
    heroAStats: null,
    heroBStats: null,
    heroACurrentHp: 0,
    heroBCurrentHp: 0,
    currentTurn: 'heroA',
    battleLog: [],
    winner: null,
  }),
  actions: {
    setHeroes(heroA, heroB) {
      this.heroA = heroA
      this.heroB = heroB
    },
    initBattle() {
      this.heroAStats = null
      this.heroBStats = null
      this.heroACurrentHp = 0
      this.heroBCurrentHp = 0
      this.currentTurn = 'heroA'
      this.battleLog = []
      this.winner = null
    },
    playTurn() {
      this.battleLog.push('Tour non implemente pour le moment.')
    },
    resetBattle() {
      this.initBattle()
    },
  },
})
