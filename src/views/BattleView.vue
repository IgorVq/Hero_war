<script setup>
import { onMounted } from 'vue'
import BattleArena from '../components/BattleArena.vue'
import { useBattleStore } from '../stores/battle'

const battleStore = useBattleStore()

onMounted(() => {
  if (battleStore.heroA && battleStore.heroB && (!battleStore.heroAStats || !battleStore.heroBStats)) {
    battleStore.initBattle()
  }
})
</script>

<template>
  <section>
    <h1>Combat</h1>
    <BattleArena />
  </section>
</template>
