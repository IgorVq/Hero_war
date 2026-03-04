<script setup>
import { storeToRefs } from 'pinia'
import { useBattleStore } from '../stores/battle'

const battleStore = useBattleStore()
const { bestHeroesRanking } = storeToRefs(battleStore)
</script>

<template>
  <section class="best-heroes">
    <h1>Best Heroes</h1>

    <p v-if="bestHeroesRanking.length === 0" class="empty-state">
      Aucun combat termine pour le moment.
    </p>

    <div v-else class="ranking-grid">
      <article v-for="hero in bestHeroesRanking" :key="hero.id" class="ranking-card">
        <img v-if="hero.imageUrl" :src="hero.imageUrl" :alt="hero.name" />
        <div v-else class="image-fallback">Image indisponible</div>
        <div class="card-body">
          <h3>{{ hero.name }}</h3>
          <p class="publisher">{{ hero.publisher }}</p>
          <p class="wins">{{ hero.wins }} victoire<span v-if="hero.wins > 1">s</span></p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.best-heroes h1 {
  font-size: clamp(2rem, 3vw, 2.8rem);
  margin-bottom: 1rem;
}

.empty-state {
  color: var(--text-muted);
}

.ranking-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.ranking-card {
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(180deg, #fffefb, #fffdfa);
}

.ranking-card img,
.image-fallback {
  width: 100%;
  aspect-ratio: 3 / 4;
}

.ranking-card img {
  object-fit: cover;
}

.image-fallback {
  display: grid;
  place-items: center;
  color: var(--text-muted);
  background: #f3eee3;
}

.card-body {
  padding: 0.8rem;
}

.card-body h3 {
  margin: 0;
}

.publisher {
  margin: 0.25rem 0 0;
  color: var(--text-muted);
  font-size: 0.92rem;
}

.wins {
  margin: 0.65rem 0 0;
  font-weight: 700;
}
</style>
