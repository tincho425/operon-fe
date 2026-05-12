<template>
  <button
    class="nav-item"
    :class="{ active }"
    @click="$emit('click')"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <span v-if="active && !collapsed" class="active-indicator" />
    <svg
      v-if="iconPath"
      :width="15"
      :height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      :color="active ? 'var(--ink)' : 'var(--ink-3)'"
    >
      <g v-html="iconPath" />
    </svg>
    <span v-if="!collapsed" class="label">{{ item.label }}</span>
    <span v-if="!collapsed && item.badge" class="badge" :class="{ 'new': item.badge === 'NEW' }">
      {{ item.badge }}
    </span>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  item: Object,
  active: Boolean,
  collapsed: Boolean,
})

defineEmits(['click'])

const hover = ref(false)

const iconPaths = {
  Overview: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  Database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  Book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  Switch: '<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  Model: '<path d="M4 7l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/>',
  Form: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  Page: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
  Rule: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
  Flow: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15.5M6 8.5V15.5M18 8.5V15.5M8.5 18H15.5"/>',
  Users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.2 3.5-5 6.5-5s5.7 1.8 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M21.5 18c-.5-2-2-3.2-4-3.2"/>',
  Logs: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h10M7 17h6"/>',
  Help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.9.5c0 1.5-2 2-2 3"/><path d="M12 17h0"/>',
  Logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  Spark: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
}

const iconPath = computed(() => iconPaths[props.item.icon] || '')
</script>

<style scoped>
.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  color: var(--ink-3);
  font-size: 13px;
  font-weight: 400;
  position: relative;
  transition: background .1s;
  justify-content: center;
}

.nav-item.active {
  background: var(--paper-2);
  color: var(--ink);
  font-weight: 500;
}

.nav-item:hover:not(.active) {
  background: var(--paper-2);
}

.active-indicator {
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 16px;
  background: var(--accent);
  border-radius: 2px;
}

.label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--paper-3);
  color: var(--muted);
}

.badge.new {
  background: var(--accent);
  color: var(--accent-ink);
}
</style>
