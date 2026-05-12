<template>
  <aside class="op-sidebar" :style="{ width: sidebarWidth }">
    <!-- Brand row -->
    <div class="brand-row">
      <button class="logo-btn" @click="$emit('open-command')">
        <OperonMark :size="collapsed ? 22 : 15" :collapsed="collapsed" />
      </button>
      <button v-if="!collapsed" class="collapse-btn" @click="$emit('toggle-collapse')" title="Collapse">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M11 6l-6 6 6 6M19 6l-6 6 6 6"/>
        </svg>
      </button>
    </div>

    <!-- System switcher -->
    <button class="system-switcher" @click="$emit('open-command')">
      <div class="system-badge">{{ systems[0].name[0] }}</div>
      <template v-if="!collapsed">
        <div class="system-info">
          <div class="system-name">{{ systems[0].name }}</div>
          <div class="system-desc">{{ systems[0].desc }}</div>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </template>
    </button>

    <!-- Search/command -->
    <button v-if="!collapsed" class="search-btn" @click="$emit('open-command')">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
      </svg>
      <span>Search…</span>
      <span class="op-kbd">⌘K</span>
    </button>

    <!-- Nav items -->
    <div class="nav-container">
      <div v-if="!collapsed" class="section-label">Workspace</div>
      <NavItem
        v-for="item in navItems.slice(0, 4)"
        :key="item.id"
        :item="item"
        :active="current === item.id"
        :collapsed="collapsed"
        @click="$emit('change-page', item.id)"
      />

      <div v-if="!collapsed" class="section-label">Builders</div>
      <NavItem
        v-for="item in navItems.slice(4, 9)"
        :key="item.id"
        :item="item"
        :active="current === item.id"
        :collapsed="collapsed"
        @click="$emit('change-page', item.id)"
      />

      <div v-if="!collapsed" class="section-label">Admin</div>
      <NavItem
        v-for="item in navItems.slice(9)"
        :key="item.id"
        :item="item"
        :active="current === item.id"
        :collapsed="collapsed"
        @click="$emit('change-page', item.id)"
      />
    </div>

    <!-- Footer nav -->
    <div class="nav-footer">
      <NavItem
        v-for="item in navBottom"
        :key="item.id"
        :item="item"
        :active="false"
        :collapsed="collapsed"
      />
      <button v-if="collapsed" class="expand-btn" @click="$emit('toggle-collapse')" title="Expand">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import OperonMark from '../OperonMark.vue'
import NavItem from './NavItem.vue'

const props = defineProps({
  collapsed: Boolean,
  current: String,
})

const emit = defineEmits(['toggle-collapse', 'change-page', 'open-command'])

const sidebarWidth = computed(() => {
  return props.collapsed ? '60px' : '256px'
})

const systems = [
  { id: 'admin', name: 'Administration', desc: 'Operon platform' },
  { id: 'crm', name: 'Sales CRM', desc: 'Pipeline · 2.1k records' },
]

const navItems = [
  { id: 'overview', label: 'Overview', icon: 'Overview', badge: null },
  { id: 'companies', label: 'Associated co.', icon: 'Database', badge: '12' },
  { id: 'company', label: 'Company info', icon: 'Book' },
  { id: 'systems', label: 'Systems', icon: 'Switch' },
  { id: 'models', label: 'Models manager', icon: 'Model', badge: null },
  { id: 'forms', label: 'Forms manager', icon: 'Form' },
  { id: 'pages', label: 'Pages', icon: 'Page', badge: 'NEW' },
  { id: 'rules', label: 'Business rules', icon: 'Rule' },
  { id: 'flows', label: 'Power automate', icon: 'Flow' },
  { id: 'roles', label: 'Roles & users', icon: 'Users' },
  { id: 'logs', label: 'Transaction logs', icon: 'Logs' },
  { id: 'components', label: 'Components', icon: 'Spark', badge: 'NEW' },
]

const navBottom = [
  { id: 'help', label: 'Get help', icon: 'Help' },
  { id: 'logout', label: 'Logout', icon: 'Logout' },
]
</script>

<style scoped>
.op-sidebar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--line);
  background: var(--paper);
  flex-shrink: 0;
  height: 100%;
  transition: width .18s ease;
}

.brand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 12px;
  border-bottom: 1px solid var(--line);
}

.logo-btn, .collapse-btn, .expand-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
}

.system-switcher {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px;
  padding: 8px 10px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  color: inherit;
}

.system-badge {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--ink);
  color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.system-info {
  flex: 1;
  min-width: 0;
}

.system-name {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.system-desc {
  font-size: 10.5px;
  color: var(--muted);
  font-family: var(--font-mono);
  line-height: 1.2;
  margin-top: 2px;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 8px 6px;
  padding: 0 10px;
  height: 30px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 6px;
  cursor: pointer;
  color: var(--muted);
}

.nav-container {
  flex: 1;
  overflow: auto;
  padding: 6px 8px;
}

.section-label {
  padding: 10px 10px 4px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.nav-footer {
  padding: 6px 8px 10px;
  border-top: 1px solid var(--line);
}
</style>
