<template>
  <span class="lockup">
    <OperonMark :size="size * 1.35" :color="color" />
    <span class="wordmark">operon</span>
  </span>
</template>

<script setup>
import OperonMark from './OperonMark.vue'

defineProps({
  size: { type: Number, default: 20 },
  color: { type: String, default: 'currentColor' },
  gap: { type: Number, default: 8 },
})
</script>

<style scoped>
.lockup {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: inherit;
}

.wordmark {
  font-weight: 600;
  font-size: inherit;
  letter-spacing: -0.03em;
}
</style>
