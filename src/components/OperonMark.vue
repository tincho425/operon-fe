<template>
  <svg :width="size" :height="size" viewBox="0 0 32 32" :style="style" aria-label="Operon">
    <template v-if="variant === 'nodes'">
      <rect
        v-for="(_, i) in 12"
        :key="i"
        :x="getNodeX(i) - 1.8"
        :y="getNodeY(i) - 1.8"
        width="3.6"
        height="3.6"
        rx="0.6"
        :fill="i % 3 === 0 ? color : 'none'"
        :stroke="color"
        stroke-width="1.2"
      />
    </template>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: Number, default: 28 },
  color: { type: String, default: 'currentColor' },
  style: { type: Object, default: () => ({}) },
  variant: { type: String, default: 'nodes' },
  collapsed: Boolean,
})

const cx = 16
const cy = 16
const r = 11
const nodes = 12

const getNodeX = (i) => {
  const theta = (i / nodes) * Math.PI * 2 - Math.PI / 2
  return cx + Math.cos(theta) * r
}

const getNodeY = (i) => {
  const theta = (i / nodes) * Math.PI * 2 - Math.PI / 2
  return cy + Math.sin(theta) * r
}
</script>

<style scoped>
svg {
  display: block;
}
</style>
