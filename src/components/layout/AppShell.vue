<template>
  <div class="op-shell" :data-drawer="sidebarOpen ? '1' : '0'">
    <AppSidebar
      :collapsed="collapsed"
      :current="currentPage"
      @toggle-collapse="toggleCollapse"
      @change-page="currentPage = $event"
      @open-command="showCommandPalette = true"
    />

    <div class="flex flex-col flex-1">
      <AppTopbar
        :collapsed="collapsed"
        @toggle-collapse="toggleCollapse"
        @toggle-theme="toggleTheme"
        @open-drawer="sidebarOpen = !sidebarOpen"
        @open-command="showCommandPalette = true"
      />

      <main class="flex-1 overflow-auto">
        <LoginPage v-if="!isAuthenticated" @login="isAuthenticated = true" />
        <OverviewPage v-else-if="currentPage === 'overview'" />
        <div v-else style="padding: 40px; text-align: center;">
          <h2>{{ currentPage }}</h2>
          <p>Page content goes here</p>
        </div>
      </main>
    </div>

    <div class="op-sidebar-overlay" @click="sidebarOpen = false" />

    <CommandPalette
      v-if="showCommandPalette"
      :open="showCommandPalette"
      @close="showCommandPalette = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
import LoginPage from '../pages/LoginPage.vue'
import OverviewPage from '../pages/OverviewPage.vue'
import CommandPalette from '../CommandPalette.vue'

const collapsed = ref(false)
const currentPage = ref('overview')
const isAuthenticated = ref(false)
const sidebarOpen = ref(false)
const showCommandPalette = ref(false)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const toggleTheme = () => {
  const root = document.documentElement
  root.classList.toggle('theme-dark')
}
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-1 {
  flex: 1;
}
.overflow-auto {
  overflow: auto;
}
</style>
