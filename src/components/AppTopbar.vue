<script setup lang="ts">
import { computed } from 'vue'
import { useTweaksStore } from '@/stores/tweaks'

defineProps<{
  breadcrumb: string[]
  collapsed: boolean
}>()
const emit = defineEmits<{
  expand: []
  tweaks: []
  toggleTheme: []
}>()

const tweaks = useTweaksStore()

// Background/foreground tokens based on headerStyle
const s = computed(() => {
  const h = tweaks.headerStyle
  if (h === 'dark')   return { bg: 'var(--ink)', fg: 'var(--paper)', sub: 'rgba(255,255,255,0.5)',  border: 'transparent', divider: 'rgba(255,255,255,0.15)' }
  if (h === 'accent') return { bg: 'var(--accent)', fg: 'var(--paper)', sub: 'rgba(255,255,255,0.6)', border: 'transparent', divider: 'rgba(255,255,255,0.2)' }
  return { bg: 'var(--paper)', fg: 'var(--ink)', sub: 'var(--muted)', border: 'var(--line)', divider: 'var(--line)' }
})
</script>

<template>
  <header class="topbar" :style="{ background: s.bg, color: s.fg, borderBottomColor: s.border }">

    <!-- Expand collapsed sidebar -->
    <button v-if="collapsed" class="ghost-btn" :style="{ color: s.sub }" @click="emit('expand')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 6l6 6-6 6"/>
      </svg>
    </button>

    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <template v-for="(seg, i) in breadcrumb" :key="i">
        <span v-if="i > 0" class="crumb-sep" :style="{ color: s.sub, opacity: 0.5 }">/</span>
        <span
          class="crumb"
          :style="{
            color: i === breadcrumb.length - 1 ? s.fg : s.sub,
            fontWeight: i === breadcrumb.length - 1 ? 500 : 400,
            fontFamily: i === 0 ? 'var(--font-mono)' : undefined,
            fontSize: i === 0 ? '11px' : '13px',
          }"
        >{{ seg }}</span>
      </template>
    </nav>

    <div class="spacer" />

    <!-- Theme toggle -->
    <button class="ghost-btn" :style="{ color: s.sub }" :title="tweaks.theme === 'dark' ? 'Light mode' : 'Dark mode'" @click="emit('toggleTheme')">
      <svg v-if="tweaks.theme === 'dark'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
      </svg>
    </button>

    <div class="divider" :style="{ background: s.divider }" />

    <!-- Logged-in user (right side, per design) -->
    <button class="user-btn" :style="{ color: s.fg }" @click="emit('tweaks')" title="Open Tweaks">
      <div class="user-avatar">MB</div>
      <div class="user-info">
        <div class="user-name">Marin Ballestero</div>
        <div class="user-sub" :style="{ color: s.sub }">operon.io</div>
      </div>
    </button>

  </header>
</template>

<style scoped lang="scss">
.topbar {
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  border-bottom: 1px solid;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.crumb { line-height: 1; }
.crumb-sep { line-height: 1; user-select: none; }
.spacer { flex: 1; }

.ghost-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  border-radius: var(--r-md);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.12s;

  &:hover { background: rgba(128, 128, 128, 0.1); }
}

.divider {
  width: 1px;
  height: 20px;
  flex-shrink: 0;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 6px 4px 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.12s;

  &:hover { background: rgba(128, 128, 128, 0.1); }
}

.user-avatar {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--accent), var(--ink));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.user-info { text-align: left; line-height: 1.15; }

.user-name {
  font-size: 12px;
  font-weight: 500;
}

.user-sub {
  font-size: 10.5px;
  font-family: var(--font-mono);
}
</style>
