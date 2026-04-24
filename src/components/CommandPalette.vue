<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps<{
  open: boolean
  systemId: string
}>()
const emit = defineEmits<{
  close: []
  pickSystem: [id: string]
}>()

const query = ref('')
const activeIdx = ref(0)
const searchEl = ref<HTMLInputElement | null>(null)

const SYSTEMS = [
  { id: 'admin', name: 'Administration', desc: 'Operon platform' },
  { id: 'crm',   name: 'Sales CRM',      desc: 'Pipeline · 2.1k records' },
  { id: 'ops',   name: 'Field Ops',      desc: 'Workforce · 340 techs' },
  { id: 'insur', name: 'InsurHub',       desc: 'Policies · v3.2' },
  { id: 'hr',    name: 'People Hub',     desc: 'HR · 120 employees' },
]

const ACTIONS = [
  { id: 'a-new-model', label: 'New model',          kbd: 'M M', icon: 'Model' },
  { id: 'a-new-form',  label: 'New form',            kbd: 'F F', icon: 'Form' },
  { id: 'a-new-page',  label: 'New page',            kbd: 'P P', icon: 'Page' },
  { id: 'a-new-rule',  label: 'New business rule',   kbd: 'R R', icon: 'Rule' },
  { id: 'a-invite',    label: 'Invite user…',        kbd: '',    icon: 'Users' },
]

const filteredSystems = computed(() => {
  if (!query.value) return SYSTEMS
  const q = query.value.toLowerCase()
  return SYSTEMS.filter(s => s.name.toLowerCase().includes(q))
})

const filteredActions = computed(() => {
  if (!query.value) return ACTIONS
  const q = query.value.toLowerCase()
  return ACTIONS.filter(a => a.label.toLowerCase().includes(q))
})

// Flat list for keyboard navigation
const allItems = computed(() => [
  ...filteredSystems.value.map(s => ({ type: 'system' as const, item: s })),
  ...filteredActions.value.map(a => ({ type: 'action' as const, item: a })),
])

watch(() => props.open, async (val) => {
  if (val) {
    query.value = ''
    activeIdx.value = 0
    await nextTick()
    searchEl.value?.focus()
  }
})

watch(query, () => { activeIdx.value = 0 })

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { emit('close'); return }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIdx.value = Math.min(activeIdx.value + 1, allItems.value.length - 1)
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIdx.value = Math.max(activeIdx.value - 1, 0)
  }
  if (e.key === 'Enter') {
    const entry = allItems.value[activeIdx.value]
    if (entry?.type === 'system') pickSystem(entry.item.id)
    else emit('close')
  }
}

function pickSystem(id: string) {
  emit('pickSystem', id)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div v-if="open" class="palette-backdrop" @click.self="emit('close')" @keydown="onKeydown">
        <div class="palette-modal" role="dialog" aria-modal="true" aria-label="Command palette">
          <!-- Search bar -->
          <div class="palette-search">
            <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
              <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
            </svg>
            <input
              ref="searchEl"
              v-model="query"
              class="palette-input"
              placeholder="Switch systems, run an action, jump anywhere…"
              @keydown="onKeydown"
            />
            <kbd class="op-kbd">ESC</kbd>
          </div>

          <!-- Results -->
          <div class="palette-results">
            <!-- Systems -->
            <template v-if="filteredSystems.length">
              <div class="palette-section-label">Switch system</div>
              <button
                v-for="(sys, i) in filteredSystems"
                :key="sys.id"
                class="palette-row"
                :class="{ active: allItems[activeIdx]?.item.id === sys.id }"
                @click="pickSystem(sys.id)"
                @mouseenter="activeIdx = i"
              >
                <div class="sys-avatar">{{ sys.name[0] }}</div>
                <div class="row-info">
                  <div class="row-name">{{ sys.name }}</div>
                  <div class="row-desc">{{ sys.desc }}</div>
                </div>
                <svg v-if="systemId === sys.id" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </template>

            <!-- Actions -->
            <template v-if="filteredActions.length">
              <div class="palette-section-label">Actions</div>
              <button
                v-for="(action, i) in filteredActions"
                :key="action.id"
                class="palette-row"
                :class="{ active: allItems[activeIdx]?.item.id === action.id }"
                @click="emit('close')"
                @mouseenter="activeIdx = filteredSystems.length + i"
              >
                <div class="action-icon-wrap">
                  <!-- Inline icon SVG per type -->
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <template v-if="action.icon === 'Model'">
                      <path d="M4 7l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/>
                    </template>
                    <template v-else-if="action.icon === 'Form'">
                      <rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>
                    </template>
                    <template v-else-if="action.icon === 'Page'">
                      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>
                    </template>
                    <template v-else-if="action.icon === 'Rule'">
                      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>
                    </template>
                    <template v-else-if="action.icon === 'Users'">
                      <circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.2 3.5-5 6.5-5s5.7 1.8 6.5 5"/>
                      <circle cx="17" cy="9" r="2.5"/><path d="M21.5 18c-.5-2-2-3.2-4-3.2"/>
                    </template>
                  </svg>
                </div>
                <div class="row-name">{{ action.label }}</div>
                <kbd v-if="action.kbd" class="op-kbd">{{ action.kbd }}</kbd>
              </button>
            </template>

            <!-- Empty state -->
            <div v-if="!filteredSystems.length && !filteredActions.length" class="palette-empty">
              No matches for "{{ query }}"
            </div>
          </div>

          <!-- Footer -->
          <div class="palette-footer">
            <span><kbd class="op-kbd">↑</kbd> <kbd class="op-kbd">↓</kbd> navigate</span>
            <span><kbd class="op-kbd">↵</kbd> select</span>
            <span class="palette-url">operon://{{ systemId }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.palette-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 96px;
}

.palette-modal {
  width: 560px;
  max-width: 90vw;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

// ─── Search bar ──────────────────────────────────────────────────────────────
.palette-search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}

.search-icon {
  color: var(--muted);
  flex-shrink: 0;
}

.palette-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--ink);
  font: 400 14px/1 var(--font-sans);

  &::placeholder { color: var(--muted); }
}

// ─── Results ─────────────────────────────────────────────────────────────────
.palette-results {
  max-height: 420px;
  overflow-y: auto;
}

.palette-section-label {
  padding: 10px 16px 4px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.palette-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.08s;

  &:hover,
  &.active {
    background: var(--paper-2);
  }
}

.sys-avatar {
  width: 26px;
  height: 26px;
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

.action-icon-wrap {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.row-info { flex: 1; min-width: 0; text-align: left; }

.row-name {
  font-size: 13px;
  color: var(--ink);
  flex: 1;
  text-align: left;
}

.row-desc {
  font-size: 11px;
  color: var(--muted);
  font-family: var(--font-mono);
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.palette-empty {
  padding: 32px;
  text-align: center;
  color: var(--muted);
  font-size: 13px;
}

// ─── Footer ──────────────────────────────────────────────────────────────────
.palette-footer {
  padding: 8px 16px;
  border-top: 1px solid var(--line);
  display: flex;
  gap: 12px;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--muted);
}

.palette-url {
  margin-left: auto;
}

// ─── Transition ──────────────────────────────────────────────────────────────
.palette-enter-active,
.palette-leave-active {
  transition: opacity 0.15s ease;

  .palette-modal {
    transition: transform 0.15s ease, opacity 0.15s ease;
  }
}

.palette-enter-from,
.palette-leave-to {
  opacity: 0;

  .palette-modal {
    transform: translateY(-8px);
    opacity: 0;
  }
}
</style>
