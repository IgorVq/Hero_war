import { defineStore } from 'pinia'
import { getHeroById, searchHeroesByName } from '../services/superheroApi'

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    searchQuery: '',
    results: [],
    isLoading: false,
    error: null,
    hasSearched: false,
  }),
  actions: {
    buildRandomIds(count, min, max) {
      const ids = new Set()

      while (ids.size < count) {
        const id = Math.floor(Math.random() * (max - min + 1)) + min
        ids.add(id)
      }

      return Array.from(ids)
    },
    async searchHeroes(name) {
      const query = String(name || '').trim()
      this.searchQuery = query
      this.hasSearched = true
      this.isLoading = true
      this.error = null
      this.results = []

      try {
        if (!query) {
          throw new Error('Entre un nom avant de rechercher')
        }

        const data = await searchHeroesByName(query)
        this.results = Array.isArray(data.results) ? data.results : []
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Erreur pendant la recherche'
      } finally {
        this.isLoading = false
      }
    },
    async fetchRandomHeroes(count = 12) {
      this.searchQuery = 'aleatoire'
      this.hasSearched = true
      this.isLoading = true
      this.error = null
      this.results = []

      try {
        const randomIds = this.buildRandomIds(count, 1, 731)
        const requests = await Promise.allSettled(randomIds.map((id) => getHeroById(id)))
        const heroes = requests
          .filter((item) => item.status === 'fulfilled')
          .map((item) => item.value)

        if (heroes.length === 0) {
          throw new Error('Aucun hero recupere. Reessaie.')
        }

        this.results = heroes
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Erreur pendant la recherche aleatoire'
      } finally {
        this.isLoading = false
      }
    },
  },
})
