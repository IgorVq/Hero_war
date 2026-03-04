<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import BattleArena from '../components/BattleArena.vue'
import { useBattleStore } from '../stores/battle'

const router = useRouter()
const battleStore = useBattleStore()
const { heroA, heroB } = storeToRefs(battleStore)

watch(
  [heroA, heroB],
  ([nextHeroA, nextHeroB]) => {
    if (!nextHeroA || !nextHeroB) {
      router.replace('/select')
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (battleStore.heroA && battleStore.heroB && (!battleStore.heroAStats || !battleStore.heroBStats)) {
    battleStore.initBattle()
  }
})
</script>

<template>
  <section>
    <BattleArena />
  </section>
</template>
