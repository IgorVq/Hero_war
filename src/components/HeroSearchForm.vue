<script setup>
import { ref } from 'vue'
import { useHeroesStore } from '../stores/heroes'

const heroesStore = useHeroesStore()
const query = ref('')

function onSubmit() {
  heroesStore.searchHeroes(query.value)
}
</script>

<template>
  <form class="search-form" @submit.prevent="onSubmit">
    <input
      v-model="query"
      type="text"
      placeholder="Rechercher un hero"
      :disabled="heroesStore.isLoading"
    />
    <button type="submit" :disabled="heroesStore.isLoading">
      {{ heroesStore.isLoading ? 'Recherche...' : 'Rechercher' }}
    </button>
  </form>
</template>

<style scoped>
.search-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
}
</style>
