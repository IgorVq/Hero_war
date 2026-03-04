<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useBattleStore } from '../stores/battle'

const router = useRouter()
const battleStore = useBattleStore()
const { heroA, heroB, canLaunchDuel, activeSlot } = storeToRefs(battleStore)

function launchDuel() {
  if (!canLaunchDuel.value) return
  battleStore.initBattle()
  router.push('/battle')
}

function selectSlot(slot) {
  battleStore.setActiveSlot(slot)
}

function removeFromSlot(slot) {
  battleStore.removeHeroFromSlot(slot)
}
</script>

<template>
  <section class="selected-panel">
    <header class="panel-header">
      <h2>Heroes selectionnes</h2>
      <p>Choisis un slot, puis selectionne une card.</p>
    </header>

    <div class="slots">
      <article
        class="slot"
        :class="{ active: activeSlot === 'heroA' }"
        @click="selectSlot('heroA')"
      >
        <div v-if="heroA" class="slot-card" @click.stop="removeFromSlot('heroA')">
          <img v-if="heroA?.image?.url" :src="heroA.image.url" :alt="heroA.name" />
          <div class="slot-meta">
            <p>{{ heroA.name }}</p>
            <small>Clique pour retirer</small>
          </div>
        </div>
        <p v-else class="slot-empty">Choisissez un hero</p>
      </article>

      <article
        class="slot"
        :class="{ active: activeSlot === 'heroB' }"
        @click="selectSlot('heroB')"
      >
        <div v-if="heroB" class="slot-card" @click.stop="removeFromSlot('heroB')">
          <img v-if="heroB?.image?.url" :src="heroB.image.url" :alt="heroB.name" />
          <div class="slot-meta">
            <p>{{ heroB.name }}</p>
            <small>Clique pour retirer</small>
          </div>
        </div>
        <p v-else class="slot-empty">Choisissez un hero</p>
      </article>
    </div>

    <button class="launch-btn" type="button" :disabled="!canLaunchDuel" @click="launchDuel">
      Lancer le duel
    </button>
  </section>
</template>

<style scoped>
.selected-panel {
  position: fixed;
  left: max(1rem, calc((100vw - var(--app-max-width)) / 2 + var(--app-padding)));
  right: max(1rem, calc((100vw - var(--app-max-width)) / 2 + var(--app-padding)));
  bottom: 1rem;
  z-index: 30;
  padding: 0.85rem 0.95rem;
  border: 1px solid var(--line);
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.9), #fffdf9),
    var(--panel);
  box-shadow:
    0 18px 40px rgba(22, 22, 22, 0.14),
    0 2px 8px rgba(22, 22, 22, 0.08);
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr) auto;
  gap: 0.8rem;
  align-items: stretch;
}

.panel-header {
  margin: 0;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.45rem;
}

.panel-header p {
  margin: 0.25rem 0 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.slots {
  display: contents;
}

.slot {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0;
  cursor: pointer;
  background: #fff;
  min-height: 92px;
  display: flex;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}

.slot:hover {
  transform: translateY(-1px);
  border-color: #bca477;
  box-shadow: 0 8px 18px rgba(35, 27, 14, 0.09);
}

.slot.active {
  border-color: var(--gold-deep);
  box-shadow: 0 0 0 1px var(--gold-deep) inset;
}

.slot-card {
  width: 100%;
  height: 100%;
  border-radius: 11px;
  border: 1px solid transparent;
  padding: 0.6rem;
  background: #fffdf7;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.slot-card img {
  width: 52px;
  height: 68px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 6px;
}

.slot-meta p {
  margin: 0;
  font-weight: 600;
  line-height: 1.1;
  font-size: 0.95rem;
}

.slot-meta small,
.slot-empty {
  color: var(--text-muted);
}

.slot-empty {
  width: 100%;
  margin: 0;
  padding: 0.6rem;
  display: flex;
  align-items: center;
}

.launch-btn {
  align-self: stretch;
  width: 180px;
  border: 1px solid #0f172a;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-weight: 700;
  background: linear-gradient(180deg, #1f2d42, #0f172a);
  color: #fff;
  cursor: pointer;
}

button[disabled] {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 1100px) {
  .selected-panel {
    grid-template-columns: 1fr;
    gap: 0.6rem;
    left: 0.7rem;
    right: 0.7rem;
    bottom: 0.7rem;
  }

  .slots {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem;
  }

  .launch-btn {
    width: 100%;
  }
}
</style>
