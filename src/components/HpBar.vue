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
  <div>
    <p>{{ label }}: {{ currentHp }} / {{ maxHp }} HP</p>
    <div class="bar-bg">
      <div class="bar-fill" :style="{ width: `${percent}%` }"></div>
    </div>
  </div>
</template>

<style scoped>
.bar-bg {
  width: 100%;
  height: 10px;
  background: #eee;
  border-radius: 6px;
}

.bar-fill {
  height: 100%;
  background: #2f855a;
  border-radius: 6px;
}
</style>
