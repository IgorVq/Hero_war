<script setup>
import HpBar from './HpBar.vue'
import BattleLog from './BattleLog.vue'
</script>

<template>
  <section>
    <p>Hero A vs Hero B</p>
    <HpBar label="Hero A" :current-hp="100" :max-hp="100" />
    <HpBar label="Hero B" :current-hp="100" :max-hp="100" />
    <button type="button">Tour suivant</button>
    <button type="button">Rejouer</button>
    <BattleLog :entries="[]" />
  </section>
</template>
