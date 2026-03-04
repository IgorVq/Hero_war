<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import HpBar from './HpBar.vue'
import BattleLog from './BattleLog.vue'
import { useBattleStore } from '../stores/battle'

const battleStore = useBattleStore()
const {
  heroA,
  heroB,
  heroACurrentHp,
  heroBCurrentHp,
  heroAStats,
  heroBStats,
  currentTurn,
  battleLog,
  winner,
} = storeToRefs(battleStore)

const winnerName = computed(() => {
  if (winner.value === 'heroA') return heroA.value?.name || ''
  if (winner.value === 'heroB') return heroB.value?.name || ''
  return ''
})

const currentTurnName = computed(() => {
  if (currentTurn.value === 'heroA') return heroA.value?.name || 'Hero A'
  return heroB.value?.name || 'Hero B'
})

function playTurn() {
  battleStore.playTurn()
}

function replayBattle() {
  battleStore.resetBattle()
}
</script>

<template>
  <section v-if="heroA && heroB" class="battle-arena">
    <header class="battle-header">
      <p class="battle-title">{{ heroA.name }} vs {{ heroB.name }}</p>
      <p v-if="!winner" class="turn-info">Tour actuel: {{ currentTurnName }}</p>
      <p v-else class="winner-info">Victoire de {{ winnerName }} !</p>
    </header>

    <section class="fighters">
      <article class="fighter-card">
        <h3>{{ heroA.name }}</h3>
        <img v-if="heroA?.image?.url" :src="heroA.image.url" :alt="heroA.name" />
        <div v-else class="image-fallback">Image indisponible</div>
        <HpBar :label="heroA.name" :current-hp="heroACurrentHp" :max-hp="heroAStats?.hpMax || 1" />
      </article>

      <article class="fighter-card">
        <h3>{{ heroB.name }}</h3>
        <img v-if="heroB?.image?.url" :src="heroB.image.url" :alt="heroB.name" />
        <div v-else class="image-fallback">Image indisponible</div>
        <HpBar :label="heroB.name" :current-hp="heroBCurrentHp" :max-hp="heroBStats?.hpMax || 1" />
      </article>
    </section>

    <div class="actions">
      <button type="button" :disabled="Boolean(winner)" @click="playTurn">Tour suivant</button>
      <button type="button" @click="replayBattle">Rejouer</button>
    </div>

    <BattleLog :entries="battleLog" />
  </section>
  <section v-else>
    <p>Aucun duel en cours. Retourne sur la page de selection.</p>
  </section>
</template>

<style scoped>
.battle-arena {
  display: grid;
  gap: 1rem;
}

.battle-header {
  display: grid;
  gap: 0.2rem;
}

.battle-title {
  font-size: clamp(1.5rem, 2vw, 2.1rem);
  font-weight: 700;
  margin: 0;
}

.turn-info {
  margin: 0;
  color: var(--text-muted);
}

.winner-info {
  margin: 0;
  color: #14532d;
  font-weight: 700;
}

.fighters {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.fighter-card {
  width: 100%;
  max-width: 350px;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 0.8rem;
  background: linear-gradient(180deg, #fffefb, #fffdfa);
  box-shadow: 0 8px 22px rgba(28, 20, 8, 0.05);
  justify-self: center;
}

.fighter-card h3 {
  margin: 0 0 0.65rem;
  font-size: 1.4rem;
}

.fighter-card img,
.image-fallback {
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
}

.fighter-card img {
  object-fit: cover;
  border: 1px solid #dfd7ca;
}

.image-fallback {
  display: grid;
  place-items: center;
  color: var(--text-muted);
  background: #f3eee3;
}

.actions {
  display: flex;
  gap: 0.6rem;
}

.actions button {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.55rem 0.9rem;
  background: var(--panel);
  cursor: pointer;
}

.actions button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .fighters {
    grid-template-columns: 1fr;
  }
}
</style>
