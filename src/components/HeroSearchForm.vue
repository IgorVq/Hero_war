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
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.6rem;
  margin-bottom: 1.1rem;
}

input {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  background: var(--panel);
}

button {
  border: 1px solid var(--gold-deep);
  border-radius: 12px;
  padding: 0.75rem 1.1rem;
  background: linear-gradient(135deg, #cab188, var(--gold));
  color: #171717;
  font-weight: 700;
  cursor: pointer;
}

button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
