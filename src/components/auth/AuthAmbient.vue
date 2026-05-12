<template>
  <div class="auth-visual">
    <div class="grid-bg" />
    <svg viewBox="0 0 600 600" style="width: 70%; max-width: 480px; position: relative; z-index: 1">
      <defs>
        <radialGradient id="fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.25" />
          <stop offset="60%" stop-color="var(--accent)" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="280" fill="url(#fade)" />
      <template v-for="(r, ri) in [80, 140, 200, 260]" :key="`ring-${ri}`">
        <rect
          v-for="(_, i) in 8 + ri * 4"
          :key="`node-${ri}-${i}`"
          :x="getNodeX(ri, i, r) - 3.5"
          :y="getNodeY(ri, i, r) - 3.5"
          width="7"
          height="7"
          rx="1"
          :fill="(i + ri) % 5 === 0 ? 'var(--accent)' : 'none'"
          :stroke="(i + ri) % 5 === 0 ? 'var(--accent)' : 'var(--line-strong)'"
          stroke-width="1.2"
          :opacity="0.2 + (ri * 0.15) + ((i + ri) % 5 === 0 ? 0.3 : 0)"
        />
      </template>
      <circle cx="300" cy="300" r="40" fill="var(--paper)" stroke="var(--line-strong)" stroke-width="1" />
      <g transform="translate(300, 300) scale(1.8) translate(-16, -16)">
        <g>
          <rect
            v-for="(_, i) in 12"
            :key="i"
            :x="getMarkNodeX(i) - 1.8"
            :y="getMarkNodeY(i) - 1.8"
            width="3.6"
            height="3.6"
            rx="0.6"
            :fill="i % 3 === 0 ? 'var(--ink)' : 'none'"
            :stroke="'var(--ink)'"
            stroke-width="1.2"
          />
        </g>
      </g>
    </svg>
    <div class="ambient-footer">
      <div style="font-family: var(--font-mono); font-size: 11px; color: var(--muted); letter-spacing: 0.06em;">
        operon — <span style="color: var(--ink-3)">build systems, not apps</span>
      </div>
      <div style="display: flex; gap: 6px">
        <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--success)" />
        <span style="font-size: 11px; color: var(--muted); font-family: var(--font-mono)">all systems nominal</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const getNodeX = (ri, i, r) => {
  const n = 8 + ri * 4
  const theta = (i / n) * Math.PI * 2 + ri * 0.2
  return 300 + Math.cos(theta) * r
}

const getNodeY = (ri, i, r) => {
  const n = 8 + ri * 4
  const theta = (i / n) * Math.PI * 2 + ri * 0.2
  return 300 + Math.sin(theta) * r
}

const getMarkNodeX = (i) => {
  const cx = 16
  const r = 11
  const nodes = 12
  const theta = (i / nodes) * Math.PI * 2 - Math.PI / 2
  return cx + Math.cos(theta) * r
}

const getMarkNodeY = (i) => {
  const cy = 16
  const r = 11
  const nodes = 12
  const theta = (i / nodes) * Math.PI * 2 - Math.PI / 2
  return cy + Math.sin(theta) * r
}
</script>

<style scoped>
.auth-visual {
  position: relative;
  background: var(--paper-2);
  border-left: 1px solid var(--line);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-bg {
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: -1px -1px;
}

.ambient-footer {
  position: absolute;
  bottom: 32px;
  left: 32px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 900px) {
  .auth-visual {
    display: none;
  }
}
</style>
