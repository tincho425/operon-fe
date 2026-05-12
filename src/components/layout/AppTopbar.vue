<template>
  <header class="op-topbar" :style="{ background: bg, color: fg, borderBottom: `1px solid ${border}` }">
    <button class="op-hamburger" @click="$emit('open-drawer')" :style="{ color: sub }">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M3 6h18M3 12h18M3 18h18"/>
      </svg>
    </button>

    <div class="breadcrumb" :style="{ color: sub }">
      <span class="label">● administration</span>
      <span>/</span>
      <span>overview</span>
    </div>

    <div class="spacer" />

    <button @click="$emit('toggle-theme')" :style="{ color: sub }" title="Toggle theme">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
      </svg>
    </button>

    <NotificationsButton :tone="sub" />

    <div class="divider" :style="{ background: isDark || isAccent ? 'rgba(255,255,255,0.15)' : 'var(--line)' }" />

    <button class="user-btn">
      <div class="user-avatar">MB</div>
      <div class="op-topbar-user-name">
        <div class="user-name">Marin Ballestero</div>
        <div class="user-domain">operon.io</div>
      </div>
    </button>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import NotificationsButton from '../NotificationsButton.vue'

const emit = defineEmits(['toggle-collapse', 'toggle-theme', 'open-drawer', 'open-command'])

const headerStyle = 'minimal'
const isDark = headerStyle === 'dark'
const isAccent = headerStyle === 'accent'

const bg = isDark ? 'var(--ink)' : isAccent ? 'var(--accent)' : 'var(--paper)'
const fg = (isDark || isAccent) ? 'var(--paper)' : 'var(--ink)'
const sub = (isDark || isAccent) ? 'rgba(255,255,255,0.65)' : 'var(--muted)'
const border = (isDark || isAccent) ? 'transparent' : 'var(--line)'
</script>

<style scoped>
.op-topbar {
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  height: 52px;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.op-hamburger {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: inherit;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.label {
  font-family: var(--font-mono);
  font-size: 11px;
  opacity: 0.6;
}

.spacer {
  flex: 1;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.divider {
  width: 1px;
  height: 20px;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 6px 4px 4px;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  border-radius: 6px;
  width: auto;
  height: auto;
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
}

.user-name {
  font-size: 12px;
  font-weight: 500;
}

.user-domain {
  font-size: 10.5px;
  font-family: var(--font-mono);
  opacity: 0.65;
}

@media (max-width: 700px) {
  .breadcrumb {
    display: none;
  }
  .user-name {
    display: none;
  }
  .op-topbar {
    padding: 0 12px;
  }
}
</style>
