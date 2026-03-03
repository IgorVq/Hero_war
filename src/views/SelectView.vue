<script setup>
import HeroSearchForm from '../components/HeroSearchForm.vue'
import HeroSelectionList from '../components/HeroSelectionList.vue'
import SelectedHeroesPanel from '../components/SelectedHeroesPanel.vue'
</script>

<template>
  <section>
    <h1>Selection des super-heros</h1>
    <HeroSearchForm />
    <HeroSelectionList />
    <SelectedHeroesPanel />
  </section>
</template>
