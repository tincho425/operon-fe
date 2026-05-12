<template>
  <div v-if="open" class="palette-overlay" @click="$emit('close')">
    <div class="palette-content" @click.stop>
      <div class="palette-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
        </svg>
        <input
          v-model="query"
          autofocus
          type="text"
          placeholder="Switch systems, run an action, jump anywhere…"
          class="palette-input"
        />
        <span class="op-kbd">ESC</span>
      </div>

      <div class="palette-list">
        <div v-if="filteredSystems.length > 0" class="palette-section">
          <div class="section-label">Switch system</div>
          <button
            v-for="system in filteredSystems"
            :key="system.id"
            class="palette-item"
          >
            <div class="system-icon">{{ system.name[0] }}</div>
            <div style="flex: 1; text-align: left">
              <div style="font-size: 13px; color: var(--ink)">{{ system.name }}</div>
              <div style="font-size: 11px; color: var(--muted); font-family: var(--font-mono)">{{ system.desc }}</div>
            </div>
          </button>
        </div>

        <div v-if="filteredActions.length > 0" class="palette-section">
          <div class="section-label">Actions</div>
          <button
            v-for="action in filteredActions"
            :key="action.id"
            class="palette-item"
          >
            <div class="action-icon">+</div>
            <div style="flex: 1; text-align: left; font-size: 13px">{{ action.label }}</div>
            <span v-if="action.kbd" class="op-kbd">{{ action.kbd }}</span>
          </button>
        </div>

        <div v-if="filteredSystems.length === 0 && filteredActions.length === 0" style="padding: 32px; text-align: center; color: var(--muted); font-size: 13px">
          No matches for "{{ query }}"
        </div>
      </div>

      <div class="palette-footer">
        <span><span class="op-kbd">↑</span> <span class="op-kbd">↓</span> navigate</span>
        <span><span class="op-kbd">↵</span> select</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
  open: Boolean,
})

defineEmits(['close'])

const query = ref('')

const systems = [
  { id: 'admin', name: 'Administration', desc: 'Operon platform' },
  { id: 'crm', name: 'Sales CRM', desc: 'Pipeline · 2.1k records' },
  { id: 'ops', name: 'Field Ops', desc: 'Workforce · 340 techs' },
  { id: 'insur', name: 'InsurHub', desc: 'Policies · v3.2' },
  { id: 'hr', name: 'People Hub', desc: 'HR · 120 employees' },
]

const actions = [
  { id: 'a-new-model', label: 'New model', kbd: 'M M' },
  { id: 'a-new-form', label: 'New form', kbd: 'F F' },
  { id: 'a-new-page', label: 'New page', kbd: 'P P' },
  { id: 'a-new-rule', label: 'New business rule', kbd: 'R R' },
  { id: 'a-invite', label: 'Invite user…', kbd: '' },
]

const filteredSystems = computed(() =>
  systems.filter(s => !query.value || s.name.toLowerCase().includes(query.value.toLowerCase()))
)

const filteredActions = computed(() =>
  actions.filter(a => !query.value || a.label.toLowerCase().includes(query.value.toLowerCase()))
)
</script>

<style scoped>
.palette-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 96px;
}

.palette-content {
  width: 560px;
  max-width: 90%;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 520px;
}

.palette-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}

.palette-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--ink);
  font: 400 14px/1 var(--font-sans);
  padding: 0;
}

.palette-list {
  flex: 1;
  overflow: auto;
}

.palette-section {
  padding: 8px 0;
}

.section-label {
  padding: 10px 16px 4px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.palette-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  color: var(--ink);
  transition: background 0.1s;
}

.palette-item:hover {
  background: var(--paper-2);
}

.system-icon {
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
}

.action-icon {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-3);
  font-weight: 600;
}

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
</style>
