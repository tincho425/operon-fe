<template>
  <div class="popover" role="dialog" aria-label="Notifications">
    <!-- Header -->
    <div class="header">
      <div style="font-size: 13px; font-weight: 600; letter-spacing: -0.01em">Notifications</div>
      <span v-if="unreadCount > 0" style="font-family: var(--font-mono); font-size: 10px; font-weight: 500; padding: 1px 6px; border-radius: 999px; background: var(--paper-3); color: var(--ink-3);">{{ unreadCount }} new</span>
      <div style="flex: 1;" />
      <button
        @click="markAllRead"
        :disabled="unreadCount === 0"
        style="background: transparent; border: none; padding: 4px 6px; color: var(--ink-3); font-size: 11.5px; font-family: var(--font-mono); cursor: pointer; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;"
        :style="{ color: unreadCount === 0 ? 'var(--muted)' : 'var(--ink-3)' }"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M2 12l4 4 8-8"/><path d="M10 16l1.5 1.5L22 7"/>
        </svg>
        Mark all read
      </button>
    </div>

    <!-- Filter tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="filter = tab.id"
        :class="{ active: filter === tab.id }"
        class="tab"
      >
        {{ tab.label }}
        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--muted);">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Notifications list -->
    <div class="content">
      <NotificationRow
        v-for="notif in visibleNotifications"
        :key="notif.id"
        :notification="notif"
        @toggle-read="toggleRead(notif.id)"
        @remove="removeNotification(notif.id)"
      />

      <div v-if="visibleNotifications.length === 0" style="padding: 36px 16px; text-align: center; color: var(--muted);">
        <div style="width: 40px; height: 40px; border-radius: 999px; background: var(--paper-3); display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M21 10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10"/><path d="M3 10l9-7 9 7"/><path d="M3 10l9 6 9-6"/>
          </svg>
        </div>
        <div style="font-size: 12.5px; color: var(--ink);">
          {{ filter === 'unread' ? "You're all caught up." : 'No notifications yet.' }}
        </div>
        <div style="font-size: 11px; font-family: var(--font-mono);">
          {{ filter === 'unread' ? '0 unread' : 'Nothing to see here.' }}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <button
        @click="clearAll"
        :disabled="notifications.length === 0"
        style="background: transparent; border: none; color: var(--ink-3); font-size: 11.5px; font-family: var(--font-mono); padding: 4px 6px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"
        :style="{ color: notifications.length === 0 ? 'var(--muted)' : 'var(--ink-3)' }"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
        </svg>
        Clear all
      </button>
      <div style="flex: 1;" />
      <button style="background: transparent; border: none; color: var(--accent); font-size: 11.5px; font-family: var(--font-mono); font-weight: 500; padding: 4px 6px; border-radius: 4px; cursor: pointer;">
        View all →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NotificationRow from './NotificationRow.vue'

const filter = ref('all')
const notifications = ref([
  { id: 'n1', kind: 'mention', title: 'Marin mentioned you', body: 'Re: Models manager — "can you take a look at the Customer schema?"', time: '2m', read: false },
  { id: 'n2', kind: 'system', title: 'Deployment succeeded', body: 'Sales CRM · v2.14.0 is now live in production.', time: '18m', read: false },
  { id: 'n3', kind: 'rule', title: 'Rule failed: Invoice approval', body: '3 records rejected by "require_manager_signoff".', time: '1h', read: false },
  { id: 'n4', kind: 'invite', title: 'New workspace invite', body: 'Sara García invited you to InsurHub as Editor.', time: '3h', read: false },
  { id: 'n5', kind: 'flow', title: 'Flow paused', body: '"Nightly sync · Stripe → CRM" paused after 4 retries.', time: '6h', read: true },
  { id: 'n6', kind: 'comment', title: 'New comment on Forms', body: 'Diego: "Should we expose the locale field on the public form?"', time: '1d', read: true },
  { id: 'n7', kind: 'system', title: 'Weekly digest ready', body: '12 new records · 4 schema changes · 0 incidents.', time: '2d', read: true },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const tabs = computed(() => [
  { id: 'all', label: 'All', count: notifications.value.length },
  { id: 'unread', label: 'Unread', count: unreadCount.value },
])

const visibleNotifications = computed(() => {
  if (filter.value === 'unread') {
    return notifications.value.filter(n => !n.read)
  }
  return notifications.value
})

const markAllRead = () => {
  notifications.value.forEach(n => { n.read = true })
}

const toggleRead = (id) => {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) notif.read = !notif.read
}

const removeNotification = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

const clearAll = () => {
  notifications.value = []
}
</script>

<style scoped>
.popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 380px;
  max-width: calc(100vw - 32px);
  background: var(--paper);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 10px;
  box-shadow: 0 12px 32px -8px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.06);
  z-index: 60;
  display: flex;
  flex-direction: column;
  max-height: 520px;
  overflow: hidden;
}

.header {
  padding: 10px 12px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 8px;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  border-bottom: 1px solid var(--line);
}

.tab {
  border: none;
  background: transparent;
  color: var(--ink-3);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all .15s;
}

.tab.active {
  background: var(--paper-3);
  color: var(--ink);
  font-weight: 500;
  border: 1px solid var(--line);
}

.tab:hover:not(.active) {
  background: var(--paper-2);
}

.content {
  flex: 1;
  overflow: auto;
}

.footer {
  border-top: 1px solid var(--line);
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
