import { defineStore } from 'pinia'
import { searchHeroesByName } from '../services/superheroApi'

export const useHeroesStore = defineStore('heroes', {
  state: () => ({
    searchQuery: '',
    results: [],
    isLoading: false,
    error: null,
    hasSearched: false,
  }),
  actions: {
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
  },
})
