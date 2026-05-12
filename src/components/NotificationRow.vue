<template>
  <div
    class="notification-row"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :style="{ background: getBackground() }"
  >
    <!-- Unread dot -->
    <div style="width: 6px; display: flex; align-items: center; justify-content: center; padding-top: 6px">
      <span v-if="!notification.read" style="width: 6px; height: 6px; border-radius: 999px; background: var(--accent)" />
    </div>

    <!-- Icon -->
    <div class="notif-icon" :style="{ color: getIconColor() }">
      <svg
        v-if="iconType"
        :width="14"
        :height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        v-html="getIconPath(iconType)"
      />
    </div>

    <!-- Content -->
    <div style="flex: 1; min-width: 0">
      <div style="display: flex; align-items: baseline; gap: 8px">
        <div
          style="font-size: 12.5px; font-weight: 500; color: var(--ink); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0"
          :style="{ fontWeight: notification.read ? 400 : 600 }"
        >
          {{ notification.title }}
        </div>
        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--muted); flex-shrink: 0">
          {{ notification.time }}
        </span>
      </div>
      <div style="font-size: 11.5px; color: var(--ink-3); margin-top: 2px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden">
        {{ notification.body }}
      </div>

      <!-- Actions -->
      <div
        v-if="hover"
        style="display: flex; gap: 4px; margin-top: 6px; opacity: 1; transition: opacity .12s; height: auto; overflow: visible"
      >
        <button
          @click="$emit('toggle-read')"
          class="action-btn"
        >
          <svg v-if="notification.read" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.6">
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          {{ notification.read ? 'Mark unread' : 'Mark read' }}
        </button>
        <button
          @click="$emit('remove')"
          class="action-btn"
          style="color: var(--danger)"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  notification: Object,
})

defineEmits(['toggle-read', 'remove'])

const hover = ref(false)

const iconMeta = {
  mention: { icon: 'Users', color: 'var(--accent)' },
  system: { icon: 'Switch', color: 'var(--ink-3)' },
  rule: { icon: 'Rule', color: 'var(--danger)' },
  invite: { icon: 'Mail', color: 'var(--accent)' },
  flow: { icon: 'Flow', color: 'var(--warning)' },
  comment: { icon: 'Book', color: 'var(--ink-3)' },
}

const iconType = computed(() => iconMeta[props.notification.kind]?.icon || 'Bell')

const iconPaths = {
  Users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.2 3.5-5 6.5-5s5.7 1.8 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M21.5 18c-.5-2-2-3.2-4-3.2"/>',
  Switch: '<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  Rule: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
  Mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',
  Flow: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15.5M6 8.5V15.5M18 8.5V15.5M8.5 18H15.5"/>',
  Book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
}

const getIconPath = (name) => iconPaths[name] || ''

const getIconColor = () => iconMeta[props.notification.kind]?.color || 'var(--ink-3)'

const getBackground = () => {
  if (hover.value) return 'var(--paper-2)'
  if (props.notification.read) return 'transparent'
  return 'var(--accent-soft, var(--paper-2))'
}
</script>

<style scoped>
.notification-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--line);
  position: relative;
  transition: background .12s;
}

.notif-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--paper-3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 10.5px;
  font-family: var(--font-mono);
  color: var(--ink-3);
  cursor: pointer;
  transition: all .1s;
}

.action-btn:hover {
  background: var(--paper-2);
  border-color: var(--line-strong);
}
</style>
