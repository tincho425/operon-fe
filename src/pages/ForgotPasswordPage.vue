<script setup lang="ts">
import { ref } from 'vue'
import OperonMark from '@/components/OperonMark.vue'

const email = ref('marin@operon.io')
const sent = ref(false)
const loading = ref(false)

async function submit(e: Event) {
  e.preventDefault()
  loading.value = true
  await new Promise(r => setTimeout(r, 500))
  loading.value = false
  sent.value = true
}
</script>

<template>
  <div class="auth-shell">
    <!-- ─── Left: form panel ─────────────────────────────────────────── -->
    <div class="auth-form-col">
      <div class="auth-brand">
        <div class="auth-lockup">
          <OperonMark variant="nodes" :size="18" />
          <span class="auth-wordmark">operon</span>
        </div>
      </div>

      <div class="auth-content">
        <div class="auth-subtitle">
          <span class="auth-dot">●</span> {{ sent ? 'Link sent' : 'Password recovery' }}
        </div>
        <h1 class="auth-title">{{ sent ? 'Check your inbox' : 'Reset your password' }}</h1>

        <!-- ── Form state ── -->
        <template v-if="!sent">
          <p class="auth-lead">
            Enter your email and we'll send you a one-time link to choose a new password.
          </p>
          <form @submit="submit">
            <div class="field-row">
              <label class="op-label">Email</label>
              <input class="op-input" v-model="email" type="email"
                placeholder="you@company.com" autocomplete="email" />
            </div>
            <button type="submit" class="op-btn accent submit-btn" :disabled="loading">
              <span>{{ loading ? 'Sending…' : 'Send reset link' }}</span>
              <svg v-if="!loading" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
          <router-link to="/login" class="back-link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            Back to sign in
          </router-link>
        </template>

        <!-- ── Sent state ── -->
        <template v-else>
          <div class="sent-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <p class="auth-lead">
            We sent a reset link to <span class="mono sent-email">{{ email }}</span>.
            It expires in 15 minutes.
          </p>
          <!-- Terminal-style delivery card -->
          <div class="email-card">
            <div class="email-row">
              <span class="email-key">from</span>
              <span class="email-val">no-reply@operon.io</span>
            </div>
            <div class="email-row">
              <span class="email-key">subject</span>
              <span class="email-val">Reset your Operon password</span>
            </div>
            <div class="email-row">
              <span class="email-key">status</span>
              <span class="email-val success">delivered ✓</span>
            </div>
          </div>
          <router-link to="/login" class="op-btn ghost back-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            Back to sign in
          </router-link>
        </template>
      </div>

      <div class="auth-footer">
        <span>© 2026 Operon Labs</span>
        <span>v3.2.1</span>
      </div>
    </div>

    <!-- ─── Right: ambient panel (same as login) ─────────────────────── -->
    <div class="auth-ambient">
      <div class="grid-bg ambient-grid" />
      <div class="ambient-inner">
        <div class="ambient-rings">
          <div v-for="(_, i) in 4" :key="i" class="ambient-ring" :style="{ '--i': i }" />
        </div>
      </div>
      <div class="ambient-footer">
        <span class="ambient-tagline">operon — <span class="ambient-sub">build systems, not apps</span></span>
        <div class="ambient-status">
          <span class="status-dot" />
          <span>all systems nominal</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--paper);
}

// ─── Left column ─────────────────────────────────────────────────────────────
.auth-form-col {
  display: flex;
  flex-direction: column;
  padding: 32px 48px;
  min-height: 100%;
}

.auth-brand {
  display: flex;
  align-items: center;
}

.auth-lockup {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
}

.auth-wordmark {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.auth-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 380px;
  margin: 0 auto;
  width: 100%;
}

.auth-subtitle {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.auth-dot { color: var(--accent); }

.auth-title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.03em;
  margin: 0 0 8px;
  line-height: 1.1;
  color: var(--ink);
}

.auth-lead {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
  margin: 0 0 28px;
}

.sent-email { color: var(--ink); }

.field-row { margin-bottom: 14px; }

.submit-btn {
  width: 100%;
  height: 38px;
  margin-top: 20px;
  justify-content: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 18px;
  font-size: 13px;
  color: var(--ink-3);
  text-decoration: none;
  cursor: pointer;

  &:hover { color: var(--ink); }
}

// ── Sent state ──
.sent-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--accent-soft);
  margin: 0 0 18px;
}

.email-card {
  padding: 14px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 12px;
  color: var(--muted);
  font-family: var(--font-mono);
  line-height: 1.6;
}

.email-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.email-key { flex-shrink: 0; }

.email-val {
  color: var(--ink-3);
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.success { color: var(--success); }
}

.back-btn {
  width: 100%;
  margin-top: 20px;
  justify-content: center;
}

.auth-footer {
  font-size: 11px;
  color: var(--muted);
  font-family: var(--font-mono);
  display: flex;
  justify-content: space-between;
}

// ─── Right column (ambient) ──────────────────────────────────────────────────
.auth-ambient {
  position: relative;
  background: var(--paper-2);
  border-left: 1px solid var(--line);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ambient-grid {
  position: absolute;
  inset: 0;
  opacity: 0.6;
}

.ambient-inner {
  position: relative;
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.ambient-rings {
  position: absolute;
  inset: 0;
}

.ambient-ring {
  position: absolute;
  inset: calc(var(--i) * 30px);
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  opacity: calc(0.15 + var(--i) * 0.1);
}

.ambient-footer {
  position: absolute;
  bottom: 32px;
  left: 32px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.06em;
  z-index: 2;
}

.ambient-sub { color: var(--ink-3); }

.ambient-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
  flex-shrink: 0;
}
</style>
