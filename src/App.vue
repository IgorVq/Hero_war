<script setup>
import { onMounted } from 'vue'
import AppNav from './components/AppNav.vue'
import { useBattleStore } from './stores/battle'

const battleStore = useBattleStore()

onMounted(() => {
  battleStore.hydrateBestHeroes()
})
</script>

<template>
  <div class="app-shell">
    <AppNav />
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-shell {
  max-width: var(--app-max-width);
  margin: 0 auto;
  padding: 0 var(--app-padding) var(--app-padding);
}

.page-content {
  margin-top: 1.15rem;
}
</style>
