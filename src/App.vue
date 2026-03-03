<script setup>
import AppNav from './components/AppNav.vue'
</script>

<template>
  <div class="app-shell">
    <AppNav />
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.page-content {
  margin-top: 1rem;
}
</style>
