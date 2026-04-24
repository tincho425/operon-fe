<script setup lang="ts">
import { onMounted } from 'vue'
import { useTweaksStore } from '@/stores/tweaks'

// Apply stored tweaks to <html> on initial load
const tweaks = useTweaksStore()
onMounted(() => tweaks.apply())
</script>

<template>
  <router-view />
</template>
