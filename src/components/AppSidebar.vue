<script setup lang="ts">
import { computed } from 'vue'
import { useTweaksStore } from '@/stores/tweaks'
import OperonMark from './OperonMark.vue'
import NavRow from './NavRow.vue'

const SYSTEMS = [
  { id: 'admin', name: 'Administration', desc: 'Operon platform' },
  { id: 'crm',   name: 'Sales CRM',      desc: 'Pipeline · 2.1k records' },
  { id: 'ops',   name: 'Field Ops',      desc: 'Workforce · 340 techs' },
  { id: 'insur', name: 'InsurHub',       desc: 'Policies · v3.2' },
  { id: 'hr',    name: 'People Hub',     desc: 'HR · 120 employees' },
]

const props = defineProps<{
  collapsed: boolean
  current: string
  systemId: string
}>()
const emit = defineEmits<{
  collapse: [boolean]
  navigate: [string]
  openCmd: []
}>()

const currentSystem = computed(() => SYSTEMS.find(s => s.id === props.systemId) ?? SYSTEMS[0])

const tweaks = useTweaksStore()

const logoVariant = computed(() => tweaks.logoVariant)

const width = computed(() => {
  if (props.collapsed) return '60px'
  return tweaks.density === 'compact' ? '232px' : '256px'
})

const rowH = computed(() => {
  if (tweaks.density === 'compact') return '30px'
  if (tweaks.density === 'comfortable') return '40px'
  return '34px'
})

const NAV_WORKSPACE = [
  { id: 'overview',   label: 'Overview',       icon: 'Overview', badge: null },
  { id: 'companies',  label: 'Associated co.', icon: 'Database', badge: '12' },
  { id: 'company',    label: 'Company info',   icon: 'Book' },
  { id: 'systems',    label: 'Systems',        icon: 'Switch' },
]
const NAV_BUILDERS = [
  { id: 'models',  label: 'Models manager',  icon: 'Model',  badge: null },
  { id: 'forms',   label: 'Forms manager',   icon: 'Form' },
  { id: 'pages',   label: 'Pages',           icon: 'Page',   badge: 'NEW' },
  { id: 'rules',   label: 'Business rules',  icon: 'Rule' },
  { id: 'flows',   label: 'Power automate',  icon: 'Flow' },
]
const NAV_ADMIN = [
  { id: 'roles', label: 'Roles & users',    icon: 'Users' },
  { id: 'logs',  label: 'Transaction logs', icon: 'Logs' },
]
const NAV_BOTTOM = [
  { id: 'help',   label: 'Get help', icon: 'Help' },
  { id: 'logout', label: 'Logout',   icon: 'Logout' },
]
</script>

<template>
  <aside class="sidebar" :style="{ width }">
    <!-- ─── Brand row ─────────────────────────────────────────────────── -->
    <div class="brand-row">
      <template v-if="collapsed">
        <div class="mark-only">
          <OperonMark :variant="logoVariant" :size="22" />
        </div>
      </template>
      <template v-else>
        <div class="lockup">
          <OperonMark :variant="logoVariant" :size="20" />
          <span class="wordmark">operon</span>
        </div>
        <button class="op-icon-btn" @click="emit('collapse', true)" title="Collapse">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 6l-6 6 6 6"/><path d="M19 6l-6 6 6 6"/>
          </svg>
        </button>
      </template>
    </div>

    <!-- ─── System switcher ───────────────────────────────────────────── -->
    <div class="sys-section">
      <button class="sys-btn" :class="{ collapsed }" title="Switch system" @click="emit('openCmd')">
        <div class="sys-avatar">{{ currentSystem.name[0] }}</div>
        <template v-if="!collapsed">
          <div class="sys-info">
            <div class="sys-name">{{ currentSystem.name }}</div>
            <div class="sys-desc">{{ currentSystem.desc }}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </template>
      </button>

      <button v-if="!collapsed" class="search-btn" @click="emit('openCmd')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
        </svg>
        <span>Search…</span>
        <kbd class="op-kbd">⌘K</kbd>
      </button>
    </div>

    <!-- ─── Navigation ───────────────────────────────────────────────── -->
    <div class="nav-scroll">
      <div v-if="!collapsed" class="nav-section-label">Workspace</div>
      <NavRow
        v-for="item in NAV_WORKSPACE" :key="item.id"
        :item="item" :active="current === item.id"
        :collapsed="collapsed" :row-h="rowH"
        @click="emit('navigate', item.id)"
      />

      <div v-if="!collapsed" class="nav-section-label">Builders</div>
      <NavRow
        v-for="item in NAV_BUILDERS" :key="item.id"
        :item="item" :active="current === item.id"
        :collapsed="collapsed" :row-h="rowH"
        @click="emit('navigate', item.id)"
      />

      <div v-if="!collapsed" class="nav-section-label">Admin</div>
      <NavRow
        v-for="item in NAV_ADMIN" :key="item.id"
        :item="item" :active="current === item.id"
        :collapsed="collapsed" :row-h="rowH"
        @click="emit('navigate', item.id)"
      />
    </div>

    <!-- ─── Footer ───────────────────────────────────────────────────── -->
    <div class="nav-footer">
      <NavRow
        v-for="item in NAV_BOTTOM" :key="item.id"
        :item="item" :active="false"
        :collapsed="collapsed" :row-h="rowH"
        @click="() => {}"
      />
      <button v-if="collapsed" class="expand-btn" @click="emit('collapse', false)" title="Expand">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 6l6 6-6 6"/>
        </svg>
      </button>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  border-right: 1px solid var(--line);
  background: var(--paper);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  transition: width 0.18s ease;
  overflow: hidden;
  position: relative;
}

.brand-row {
  height: 52px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  flex-shrink: 0;
}

.mark-only {
  width: 100%;
  display: flex;
  justify-content: center;
  color: var(--ink);
}

.lockup {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
}

.wordmark {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.sys-section {
  padding: 8px 8px 4px;
  flex-shrink: 0;
}

.sys-btn {
  width: 100%;
  padding: 8px 10px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;

  &.collapsed {
    padding: 8px 0;
    justify-content: center;
  }

  &:hover { background: var(--paper-3); }
}

.sys-avatar {
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

.sys-info { flex: 1; min-width: 0; }

.sys-name {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sys-desc {
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
  width: 100%;
  height: 30px;
  margin-top: 6px;
  padding: 0 10px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 6px;
  color: var(--muted);
  font-size: 12px;
  cursor: pointer;

  span { flex: 1; text-align: left; }

  &:hover { background: var(--paper-2); }
}

.nav-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 6px 8px;
}

.nav-section-label {
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
  flex-shrink: 0;
}

.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 28px;
  margin-top: 4px;
  background: transparent;
  border: none;
  color: var(--muted);
  border-radius: 4px;
  cursor: pointer;

  &:hover { background: var(--paper-2); color: var(--ink); }
}
</style>
