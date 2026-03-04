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
