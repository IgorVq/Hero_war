<script setup>
defineProps({
  entries: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section>
    <h3>Journal de combat</h3>
    <p v-if="entries.length === 0">Aucune action pour le moment.</p>
    <ul v-else>
      <li v-for="(entry, index) in entries" :key="index">{{ entry }}</li>
    </ul>
  </section>
</template>
