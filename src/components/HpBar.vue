<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  currentHp: {
    type: Number,
    required: true,
  },
  maxHp: {
    type: Number,
    required: true,
  },
})

const percent = computed(() => {
  if (props.maxHp <= 0) return 0
  return Math.max(0, Math.min(100, Math.round((props.currentHp / props.maxHp) * 100)))
})
</script>

<template>
  <div class="hp-wrap">
    <p class="hp-value">{{ currentHp }} / {{ maxHp }} HP</p>
    <div class="bar-bg">
      <div class="bar-fill" :style="{ width: `${percent}%` }"></div>
    </div>
  </div>
</template>

<style scoped>
.hp-wrap {
  margin-top: 0.75rem;
}

p {
  margin: 0 0 0.35rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.hp-value {
  text-align: right;
}

.bar-bg {
  width: 100%;
  height: 12px;
  background: #eee6d8;
  border-radius: 999px;
  border: 1px solid #deceb2;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #b48b49, #d4b06f);
  border-radius: 999px;
  transition: width 0.2s ease;
}
</style>
