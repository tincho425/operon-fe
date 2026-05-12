<template>
  <div class="page-container">
    <PageFrame
      title="Overview"
      subtitle="Live metrics for the Administration system."
    >
      <div class="kpi-grid">
        <div v-for="kpi in kpis" :key="kpi.label" class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-label">{{ kpi.label }}</span>
            <span v-if="kpi.unit" class="kpi-unit" :class="{ hot: kpi.hot }">
              <span v-if="kpi.hot" class="hot-dot" />
              {{ kpi.unit }}
            </span>
          </div>
          <div class="kpi-value">{{ kpi.value }}</div>
          <div class="kpi-sub">{{ kpi.sub }}</div>
          <div class="kpi-trend" :style="{ color: kpi.good ? 'var(--success)' : 'var(--ink-3)' }">
            {{ kpi.trend }}
          </div>
        </div>
      </div>
    </PageFrame>
  </div>
</template>

<script setup>
import PageFrame from './PageFrame.vue'

const kpis = [
  { label: 'Users', value: '7', unit: null, sub: 'defined active users', trend: '+2 this month' },
  { label: 'Sessions', value: '4', unit: 'live', sub: 'active right now', trend: 'stable', hot: true },
  { label: 'Pages', value: '100', unit: null, sub: 'active pages in system', trend: '+12 this month' },
  { label: 'Pages called', value: '1,862', unit: '30d', sub: 'hit count last 30 days', trend: '↑ 18% vs prev' },
  { label: 'Transactions', value: '333', unit: '30d', sub: 'database function calls', trend: '↑ 4%' },
  { label: 'Errors', value: '19', unit: '30d', sub: 'caught in last 30 days', trend: '↓ 41% vs prev', good: true },
]
</script>

<style scoped>
.page-container {
  min-height: 100%;
  padding: 24px 32px 40px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

.kpi-card {
  background: var(--paper);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kpi-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.kpi-label {
  font-size: 12px;
  color: var(--ink-3);
  font-weight: 500;
}

.kpi-unit {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted);
  padding: 1px 6px;
  border-radius: 3px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.kpi-unit.hot {
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid transparent;
}

.hot-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
}

.kpi-value {
  font-size: 34px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
}

.kpi-sub {
  font-size: 12px;
  color: var(--muted);
}

.kpi-trend {
  font-family: var(--font-mono);
  font-size: 10.5px;
  margin-top: 2px;
}

@media (max-width: 900px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
