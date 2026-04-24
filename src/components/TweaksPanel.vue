<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTweaksStore, type Accent, type Header, type Density, type Logo, type TypePair } from '@/stores/tweaks'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const tweaks = useTweaksStore()

// ─── Drag logic (matches design: draggable from header, right/bottom anchored) ─
const panelRef = ref<HTMLElement | null>(null)
const pos = ref({ right: 16, bottom: 16 })

function clampToViewport() {
  const el = panelRef.value
  if (!el) return
  const maxRight  = Math.max(16, window.innerWidth  - el.offsetWidth  - 16)
  const maxBottom = Math.max(16, window.innerHeight - el.offsetHeight - 16)
  pos.value = {
    right:  Math.min(maxRight,  Math.max(16, pos.value.right)),
    bottom: Math.min(maxBottom, Math.max(16, pos.value.bottom)),
  }
}

function onDragStart(e: MouseEvent) {
  const el = panelRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const startRight  = window.innerWidth  - rect.right
  const startBottom = window.innerHeight - rect.bottom
  const sx = e.clientX, sy = e.clientY

  const move = (ev: MouseEvent) => {
    pos.value = {
      right:  startRight  - (ev.clientX - sx),
      bottom: startBottom - (ev.clientY - sy),
    }
    clampToViewport()
  }
  const up = () => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
  }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}

onMounted(() => window.addEventListener('resize', clampToViewport))
onUnmounted(() => window.removeEventListener('resize', clampToViewport))

// ─── Segmented control active thumb position ──────────────────────────────
function thumbStyle(options: string[], value: string) {
  const idx = options.indexOf(value)
  const n = options.length
  return {
    left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
    width: `calc((100% - 4px) / ${n})`,
  }
}
</script>

<template>
  <Transition name="twk-fade">
    <div
      v-if="open"
      ref="panelRef"
      class="twk-panel"
      :style="{ right: pos.right + 'px', bottom: pos.bottom + 'px' }"
    >
      <!-- Header (draggable) -->
      <div class="twk-hd" @mousedown="onDragStart">
        <b>Tweaks</b>
        <button class="twk-x" @mousedown.stop @click="$emit('close')">✕</button>
      </div>

      <div class="twk-body">

        <!-- ── Theme ───────────────────────────────────────────────── -->
        <div class="twk-sect">Theme</div>

        <TweakRow label="Mode">
          <Seg
            :options="[{value:'light',label:'Light'},{value:'dark',label:'Dark'}]"
            :value="tweaks.theme"
            @change="tweaks.theme = ($event as typeof tweaks.theme)"
          />
        </TweakRow>

        <TweakRow label="Accent">
          <Seg
            :options="[
              {value:'indigo',  label:'Indigo'},
              {value:'emerald', label:'Emerald'},
              {value:'violet',  label:'Violet'},
              {value:'amber',   label:'Amber'},
            ]"
            :value="tweaks.accent"
            @change="tweaks.accent = ($event as Accent)"
          />
        </TweakRow>

        <!-- ── Shell ───────────────────────────────────────────────── -->
        <div class="twk-sect">Shell</div>

        <TweakRow label="Header">
          <Seg
            :options="[
              {value:'minimal',  label:'Minimal'},
              {value:'dark',     label:'Dark'},
              {value:'accent',   label:'Accent'},
            ]"
            :value="tweaks.headerStyle"
            @change="tweaks.headerStyle = ($event as Header)"
          />
        </TweakRow>

        <TweakRow label="Density">
          <Seg
            :options="[
              {value:'compact',     label:'Compact'},
              {value:'normal',      label:'Normal'},
              {value:'comfortable', label:'Comfortable'},
            ]"
            :value="tweaks.density"
            @change="tweaks.density = ($event as Density)"
          />
        </TweakRow>

        <!-- ── Brand ───────────────────────────────────────────────── -->
        <div class="twk-sect">Brand</div>

        <TweakRow label="Logo mark">
          <Seg
            :options="[
              {value:'nodes', label:'Nodes'},
              {value:'graph', label:'Graph'},
              {value:'ring',  label:'Ring'},
              {value:'solid', label:'Solid'},
            ]"
            :value="tweaks.logoVariant"
            @change="tweaks.logoVariant = ($event as Logo)"
          />
        </TweakRow>

        <TweakRow label="Type pair">
          <Seg
            :options="[
              {value:'geist',  label:'Geist'},
              {value:'mono',   label:'All mono'},
              {value:'system', label:'System'},
            ]"
            :value="tweaks.typePair"
            @change="tweaks.typePair = ($event as TypePair)"
          />
        </TweakRow>

      </div>
    </div>
  </Transition>
</template>

<!-- ─── Child components ────────────────────────────────────────────────── -->
<script lang="ts">
// TweakRow: label + control
const TweakRow = {
  name: 'TweakRow',
  props: { label: String },
  template: `
    <div class="twk-row">
      <div class="twk-lbl"><span>{{ label }}</span></div>
      <slot />
    </div>
  `,
}

// Seg: segmented radio control with animated sliding thumb
const Seg = {
  name: 'Seg',
  props: {
    options: { type: Array as () => { value: string; label: string }[], required: true },
    value:   { type: String, required: true },
  },
  emits: ['change'],
  computed: {
    idx() { return this.options.findIndex((o: { value: string }) => o.value === this.value) },
    thumbStyle() {
      const n = this.options.length
      return {
        left:  `calc(2px + ${this.idx} * (100% - 4px) / ${n})`,
        width: `calc((100% - 4px) / ${n})`,
      }
    },
  },
  template: `
    <div class="twk-seg">
      <div class="twk-seg-thumb" :style="thumbStyle" />
      <button
        v-for="opt in options"
        :key="opt.value"
        type="button"
        :aria-checked="opt.value === value"
        @click="$emit('change', opt.value)"
      >{{ opt.label }}</button>
    </div>
  `,
}

export default {
  components: { TweakRow, Seg },
}
</script>

<style scoped lang="scss">
// ─── Panel shell (matches tweaks-panel.jsx styles) ─────────────────────────
.twk-panel {
  position: fixed;
  z-index: 2147483646;
  width: 280px;
  max-height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  background: rgba(250, 249, 247, 0.78);
  color: #29261b;
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  backdrop-filter: blur(24px) saturate(160%);
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  border-radius: 14px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.5) inset,
    0 12px 40px rgba(0, 0, 0, 0.18);
  font: 11.5px/1.4 ui-sans-serif, system-ui, -apple-system, sans-serif;
  overflow: hidden;

  // Dark mode adjustment
  :global(.theme-dark) & {
    background: rgba(17, 17, 19, 0.85);
    color: #e4e4e7;
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.06) inset,
      0 12px 40px rgba(0, 0, 0, 0.6);
  }
}

// ─── Fade transition ────────────────────────────────────────────────────────
.twk-fade-enter-active, .twk-fade-leave-active {
  transition: opacity 0.15s, transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.twk-fade-enter-from, .twk-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}

// ─── Header ─────────────────────────────────────────────────────────────────
.twk-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 8px 10px 14px;
  cursor: move;
  user-select: none;

  b { font-size: 12px; font-weight: 600; letter-spacing: 0.01em; }
}

.twk-x {
  appearance: none;
  border: 0;
  background: transparent;
  color: rgba(41, 38, 27, 0.55);
  width: 22px;
  height: 22px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  :global(.theme-dark) & { color: rgba(228, 228, 231, 0.55); }

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    color: #29261b;

    :global(.theme-dark) & {
      background: rgba(255, 255, 255, 0.08);
      color: #e4e4e7;
    }
  }
}

// ─── Body ────────────────────────────────────────────────────────────────────
.twk-body {
  padding: 2px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
}

.twk-sect {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(41, 38, 27, 0.45);
  padding: 10px 0 0;

  &:first-child { padding-top: 0; }

  :global(.theme-dark) & { color: rgba(228, 228, 231, 0.4); }
}

// ─── Row ─────────────────────────────────────────────────────────────────────
:deep(.twk-row) {
  display: flex;
  flex-direction: column;
  gap: 5px;

  .twk-lbl {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: rgba(41, 38, 27, 0.72);

    span:first-child { font-weight: 500; }

    :global(.theme-dark) & { color: rgba(228, 228, 231, 0.72); }
  }
}

// ─── Segmented control ───────────────────────────────────────────────────────
:deep(.twk-seg) {
  position: relative;
  display: flex;
  padding: 2px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.06);
  user-select: none;

  :global(.theme-dark) & { background: rgba(255, 255, 255, 0.08); }

  .twk-seg-thumb {
    position: absolute;
    top: 2px;
    bottom: 2px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
    transition: left 0.15s cubic-bezier(0.3, 0.7, 0.4, 1), width 0.15s;
    pointer-events: none;

    :global(.theme-dark) & { background: rgba(255, 255, 255, 0.15); }
  }

  button {
    appearance: none;
    position: relative;
    z-index: 1;
    flex: 1;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    font-weight: 500;
    height: 22px;
    border-radius: 6px;
    cursor: pointer;
    padding: 0;
    font-size: 11px;
  }
}
</style>
