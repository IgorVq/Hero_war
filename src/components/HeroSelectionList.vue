<script setup>
import { storeToRefs } from 'pinia'
import HeroCard from './HeroCard.vue'
import { useHeroesStore } from '../stores/heroes'

const heroesStore = useHeroesStore()
const { results, isLoading, error, hasSearched, searchQuery } = storeToRefs(heroesStore)
</script>

<template>
  <section>
    <h2>Resultats</h2>
    <p v-if="isLoading">Chargement des heros...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="hasSearched && results.length === 0">
      Aucun resultat pour "{{ searchQuery }}".
    </p>
    <p v-else-if="!hasSearched">Lance une recherche pour voir des heros.</p>

    <div v-else class="results-grid">
      <HeroCard v-for="hero in results" :key="hero.id" :hero="hero" />
    </div>
  </section>
</template>

<style scoped>
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
</style>
