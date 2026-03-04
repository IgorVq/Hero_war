<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import HeroSearchForm from '../components/HeroSearchForm.vue'
import HeroSelectionList from '../components/HeroSelectionList.vue'
import SelectedHeroesPanel from '../components/SelectedHeroesPanel.vue'
import { useHeroesStore } from '../stores/heroes'

const heroesStore = useHeroesStore()
const { hasSearched, results, isLoading } = storeToRefs(heroesStore)

onMounted(() => {
  if (!hasSearched.value && results.value.length === 0 && !isLoading.value) {
    heroesStore.fetchRandomHeroes(12)
  }
})
</script>

<template>
  <section class="select-layout">
    <h1>Selection des super-heros</h1>
    <HeroSearchForm />
    <HeroSelectionList />
    <SelectedHeroesPanel />
  </section>
</template>

<style scoped>
.select-layout {
  min-width: 0;
  padding-bottom: 235px;
}

.select-layout h1 {
  font-size: clamp(2rem, 3.1vw, 3rem);
  margin-bottom: 1rem;
}

@media (max-width: 1100px) {
  .select-layout {
    padding-bottom: 250px;
  }
}
</style>
