<template>
  <div style="position: relative">
    <button
      @click="open = !open"
      title="Notifications"
      :aria-label="`Notifications${unread > 0 ? ` · ${unread} unread` : ''}`"
      :style="{ color: tone, background: open ? 'var(--paper-2)' : 'transparent' }"
      class="notif-btn"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
      <span v-if="unread > 0" class="badge-dot">{{ unread > 9 ? '9+' : unread }}</span>
    </button>

    <NotificationsPopover v-if="open" @close="open = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NotificationsPopover from './NotificationsPopover.vue'

defineProps({
  tone: String,
})

const open = ref(false)

const unread = computed(() => {
  // Get notifications count from popover (we'll update this with proper state management later)
  // For now, it reads from initial state
  return 4 // Default to 4 unread based on initial data in NotificationsPopover
})
</script>

<style scoped>
.notif-btn {
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.15s;
}

.badge-dot {
  position: absolute;
  top: 3px;
  right: 3px;
  min-width: 14px;
  height: 14px;
  padding: 0 3px;
  border-radius: 999px;
  background: var(--danger);
  color: #fff;
  font-size: 9.5px;
  font-weight: 600;
  font-family: var(--font-mono);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  box-shadow: 0 0 0 1.5px var(--paper);
}
</style>
