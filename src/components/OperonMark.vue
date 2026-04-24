<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: number
  variant?: 'nodes' | 'graph' | 'ring' | 'solid'
}>()

const size = computed(() => props.size ?? 22)
const variant = computed(() => props.variant ?? 'nodes')

// 12 squares in a ring, every 3rd filled — the Operon "O" mark
const nodes = computed(() => {
  const cx = 16, cy = 16, r = 11
  return Array.from({ length: 12 }, (_, i) => {
    const theta = (i / 12) * Math.PI * 2 - Math.PI / 2
    return {
      x: cx + Math.cos(theta) * r - 1.8,
      y: cy + Math.sin(theta) * r - 1.8,
      active: i % 3 === 0,
    }
  })
})

// 8-point ring used by the graph variant
const graphPts = computed(() => {
  const cx = 16, cy = 16, r = 11
  return Array.from({ length: 8 }, (_, i) => {
    const t = (i / 8) * Math.PI * 2 - Math.PI / 2
    return [cx + Math.cos(t) * r, cy + Math.sin(t) * r] as [number, number]
  })
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    aria-label="Operon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- nodes: 12 squares in a ring, every 3rd filled -->
    <template v-if="variant === 'nodes'">
      <rect
        v-for="(n, i) in nodes"
        :key="i"
        :x="n.x"
        :y="n.y"
        width="3.6"
        height="3.6"
        rx="0.6"
        :fill="n.active ? 'currentColor' : 'none'"
        stroke="currentColor"
        stroke-width="1.2"
      />
    </template>

    <!-- ring: dashed circle with gap -->
    <template v-else-if="variant === 'ring'">
      <circle
        cx="16" cy="16" r="11"
        fill="none" stroke="currentColor" stroke-width="2.6"
        stroke-linecap="round" stroke-dasharray="56 12"
        transform="rotate(-20 16 16)"
      />
    </template>

    <!-- solid: thick O stroke -->
    <template v-else-if="variant === 'solid'">
      <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="4.5" />
    </template>

    <!-- graph: 8 dots connected in a ring -->
    <template v-else-if="variant === 'graph'">
      <line
        v-for="(p, i) in graphPts"
        :key="'l' + i"
        :x1="p[0]" :y1="p[1]"
        :x2="graphPts[(i + 1) % graphPts.length][0]"
        :y2="graphPts[(i + 1) % graphPts.length][1]"
        stroke="currentColor" stroke-width="1" opacity="0.5"
      />
      <circle
        v-for="(p, i) in graphPts"
        :key="'c' + i"
        :cx="p[0]" :cy="p[1]"
        r="2.2" fill="currentColor"
      />
    </template>
  </svg>
</template>
