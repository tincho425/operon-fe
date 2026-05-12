<template>
  <div class="page-frame">
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ title }}</h1>
        <div class="page-subtitle">{{ subtitle }}</div>
      </div>
      <div class="page-actions">
        <slot name="actions" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
})
</script>

<style scoped>
.page-frame {
  padding: 24px 32px 40px;
  min-height: 100%;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 4px;
}

.page-subtitle {
  font-size: 13px;
  color: var(--muted);
}

.page-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
