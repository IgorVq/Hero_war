<script setup>
import { computed } from 'vue'
import { buildCombatStats } from '../utils/battleRules'

const props = defineProps({
  hero: {
    type: Object,
    default: null,
  },
})

const combatStats = computed(() => {
  if (!props.hero?.powerstats) return null
  return buildCombatStats(props.hero.powerstats)
})
</script>

<template>
  <article class="hero-card">
    <p v-if="!hero">Aucun hero</p>
    <template v-else>
      <h3 class="hero-name">{{ hero.name }}</h3>
      <img
        v-if="hero?.image?.url"
        :src="hero.image.url"
        :alt="`Image de ${hero.name}`"
        loading="lazy"
      />
      <p class="full-name">{{ hero?.biography?.['full-name'] || 'Identite inconnue' }}</p>
      <p class="publisher">{{ hero?.biography?.publisher || 'Univers inconnu' }}</p>

      <div v-if="combatStats" class="stats">
        <div class="stat" title="Points de vie maximum">
          <span class="stat-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s-6.8-4.35-9.4-8.17C.8 10.2 1.5 6.9 4.2 5.2c2.2-1.4 4.8-.67 6.25 1.02L12 8l1.55-1.78c1.45-1.69 4.05-2.42 6.25-1.02 2.7 1.7 3.4 5 1.6 7.63C18.8 16.65 12 21 12 21Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="stat-value">{{ combatStats.hpMax }}</span>
        </div>

        <div class="stat" title="Attaque">
          <span class="stat-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 20 14.5 9.5m0 0 2.2-5.2 2 2-5.2 2.2M14.5 9.5 8 16m0 0-1.5 3.5L10 18l-2-2Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="stat-value">{{ combatStats.attack }}</span>
        </div>

        <div class="stat" title="Defense">
          <span class="stat-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3 4 6v6c0 5.2 3.4 8.4 8 9 4.6-.6 8-3.8 8-9V6l-8-3Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="stat-value">{{ combatStats.defense }}</span>
        </div>

        <div class="stat" title="Vitesse">
          <span class="stat-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M13 4 6 13h5l-1 7 8-11h-5l0-5Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="stat-value">{{ combatStats.speed }}</span>
        </div>
      </div>
    </template>
  </article>
</template>

<style scoped>
.hero-card {
  border: 1px solid #d7d7d7;
  padding: 0.9rem;
  border-radius: 12px;
  background: #fff;
}

.hero-name {
  margin: 0 0 0.75rem;
}

img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
}

.full-name {
  margin: 0.85rem 0 0.2rem;
  font-size: 1.05rem;
  line-height: 1.2;
}

.publisher {
  display: inline-block;
  margin: 0;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.85rem;
  background: #f1f3f5;
  color: #374151;
}

.stats {
  margin-top: 0.9rem;
  padding-top: 0.75rem;
  border-top: 1px solid #ececec;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.25rem;
  border-radius: 8px;
  background: #f8fafc;
  color: #1f2937;
}

.stat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
}

.stat-icon svg {
  width: 100%;
  height: 100%;
}

.stat-value {
  font-weight: 700;
  line-height: 1;
}
</style>
