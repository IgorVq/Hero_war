<script setup>
import { storeToRefs } from 'pinia'
import HeroCard from './HeroCard.vue'
import { useHeroesStore } from '../stores/heroes'
import { useBattleStore } from '../stores/battle'

const heroesStore = useHeroesStore()
const { results, isLoading, error, hasSearched, searchQuery } = storeToRefs(heroesStore)
const battleStore = useBattleStore()
const { heroA, heroB } = storeToRefs(battleStore)

function getSelectedSlot(heroId) {
  if (heroA.value?.id === heroId) return 'Hero A'
  if (heroB.value?.id === heroId) return 'Hero B'
  return ''
}
</script>

<template>
  <section class="results-section">
    <h2>Resultats</h2>
    <p v-if="isLoading">Chargement des heros...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="hasSearched && results.length === 0">
      Aucun resultat pour "{{ searchQuery }}".
    </p>
    <p v-else-if="!hasSearched">Lance une recherche pour voir des heros.</p>

    <div v-else class="results-grid">
      <HeroCard
        v-for="hero in results"
        :key="hero.id"
        :hero="hero"
        :selectable="true"
        :selected-slot="getSelectedSlot(hero.id)"
        @select="battleStore.assignHeroToActiveSlot"
      />
    </div>
  </section>
</template>

<style scoped>
.results-section h2 {
  font-size: clamp(1.7rem, 2.1vw, 2.3rem);
  margin-bottom: 0.55rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.95rem;
}
</style>
