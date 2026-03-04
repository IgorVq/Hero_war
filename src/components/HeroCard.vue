<script setup>
import { computed, ref, watch } from 'vue'
import { buildCombatStats } from '../utils/battleRules'

const props = defineProps({
  hero: {
    type: Object,
    default: null,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  selectedSlot: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['select'])
const imageLoadError = ref(false)

watch(
  () => props.hero?.id,
  () => {
    imageLoadError.value = false
  },
)

const combatStats = computed(() => {
  if (!props.hero?.powerstats) return null
  return buildCombatStats(props.hero.powerstats)
})

const hasImage = computed(() => Boolean(props.hero?.image?.url) && !imageLoadError.value)
const displayFullName = computed(() => props.hero?.biography?.['full-name'] || 'Identite inconnue')
const displayPublisher = computed(() => props.hero?.biography?.publisher || 'Univers inconnu')

function handleImageError() {
  imageLoadError.value = true
}
</script>

<template>
  <article
    class="hero-card"
    :class="{ selectable, selected: Boolean(selectedSlot) }"
    @click="selectable && emit('select', hero)"
  >
    <p v-if="!hero">Aucun hero</p>
    <template v-else>
      <div class="hero-media">
        <img
          v-if="hasImage"
          :src="hero.image.url"
          :alt="`Image de ${hero.name}`"
          loading="lazy"
          @error="handleImageError"
        />
        <div v-else class="image-placeholder" aria-hidden="true">Image indisponible</div>
        <p class="publisher">{{ displayPublisher }}</p>
      </div>
      <div class="card-body">
        <header class="hero-header">
          <h3 class="hero-name">{{ hero.name }}</h3>
          <span v-if="selectedSlot" class="selected-badge">{{ selectedSlot }}</span>
        </header>
        <p class="full-name">{{ displayFullName }}</p>

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
      </div>
    </template>
  </article>
</template>

<style scoped>
.hero-card {
  border: 1px solid var(--line);
  padding: 0;
  border-radius: 14px;
  background: linear-gradient(180deg, #fffefb, #fffdfa);
  box-shadow: 0 8px 22px rgba(28, 20, 8, 0.05);
  overflow: hidden;
}

.card-body {
  padding: 0.9rem;
}

.hero-media {
  position: relative;
  aspect-ratio: 3 / 2.5;
  overflow: hidden;
}

.hero-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.hero-name {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1;
}

.selected-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--ink);
  color: #fff;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  border: 0;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #7a6d58;
  font-size: 0.95rem;
  background:
    linear-gradient(145deg, #f2eadb, #e8dcc7),
    #eee3d1;
}

.full-name {
  margin: 0;
  font-size: 0.9rem;
  font-style: italic;
  line-height: 1.2;
}

.publisher {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  margin: 0;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(19, 29, 44, 0.9);
  color: #fff;
  backdrop-filter: blur(2px);
}

.stats {
  margin-top: 0.9rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e9e1d5;
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
  border-radius: 10px;
  background: #f5efe3;
  color: #2a241b;
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
  font-size: 1.2rem;
  line-height: 1;
}

.selectable {
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;
}

.selectable:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 26px rgba(28, 20, 8, 0.12);
  border-color: #c3ad83;
}

.selected {
  border-color: var(--gold-deep);
  box-shadow: 0 0 0 1px var(--gold-deep) inset;
}
</style>
