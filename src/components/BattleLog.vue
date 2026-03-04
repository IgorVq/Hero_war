<script setup>
import { computed } from 'vue'

const props = defineProps({
  entries: {
    type: Array,
    default: () => [],
  },
})

const entriesNewestFirst = computed(() => [...props.entries].reverse())
</script>

<template>
  <section>
    <h3>Journal de combat</h3>
    <p v-if="entries.length === 0">Aucune action pour le moment.</p>
    <ul v-else>
      <li v-for="(entry, index) in entriesNewestFirst" :key="index">{{ entry }}</li>
    </ul>
  </section>
</template>
