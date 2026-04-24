<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import TweaksPanel from '@/components/TweaksPanel.vue'
import CommandPalette from '@/components/CommandPalette.vue'
import { useTweaksStore } from '@/stores/tweaks'

const tweaks = useTweaksStore()

const collapsed = ref(false)
const tweaksOpen = ref(false)
const cmdOpen = ref(false)
const currentNav = ref('overview')
const systemId = ref('admin')

const navLabels: Record<string, string> = {
  overview:  'Overview',
  companies: 'Associated companies',
  company:   'Company info',
  systems:   'Systems',
  models:    'Models',
  forms:     'Forms',
  pages:     'Pages',
  rules:     'Business rules',
  flows:     'Flows',
  roles:     'Roles & users',
  logs:      'Logs',
}

const breadcrumb = computed(() => ['administration', navLabels[currentNav.value] ?? currentNav.value])

function toggleTheme() {
  tweaks.theme = tweaks.theme === 'dark' ? 'light' : 'dark'
}

// ⌘K / Ctrl+K global shortcut
function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    cmdOpen.value = !cmdOpen.value
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKey))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<template>
  <div class="app-layout">
    <AppSidebar
      :collapsed="collapsed"
      :current="currentNav"
      :system-id="systemId"
      @collapse="collapsed = $event"
      @navigate="currentNav = $event"
      @open-cmd="cmdOpen = true"
    />

    <div class="app-main">
      <AppTopbar
        :breadcrumb="breadcrumb"
        :collapsed="collapsed"
        @expand="collapsed = false"
        @tweaks="tweaksOpen = !tweaksOpen"
        @toggle-theme="toggleTheme"
      />

      <div class="page-scroll">
        <router-view />
      </div>
    </div>

    <TweaksPanel :open="tweaksOpen" @close="tweaksOpen = false" />

    <CommandPalette
      :open="cmdOpen"
      :system-id="systemId"
      @close="cmdOpen = false"
      @pick-system="systemId = $event"
    />
  </div>
</template>
