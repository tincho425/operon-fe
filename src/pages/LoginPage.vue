<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import OperonMark from '@/components/OperonMark.vue'

const router = useRouter()

const email = ref('marin@operon.io')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)

// Concentric rings of node-rects for the ambient panel (mirrors auth.jsx)
const rings = computed(() => {
  return [80, 140, 200, 260].flatMap((r, ri) => {
    const n = 8 + ri * 4
    return Array.from({ length: n }, (_, i) => {
      const theta = (i / n) * Math.PI * 2 + ri * 0.2
      const x = 300 + Math.cos(theta) * r
      const y = 300 + Math.sin(theta) * r
      const active = (i + ri) % 5 === 0
      return { x, y, active, key: `${ri}-${i}`, opacity: 0.2 + ri * 0.15 + (active ? 0.3 : 0) }
    })
  })
})

// Mark nodes for the center circle inside the ambient SVG
const markNodes = computed(() => {
  const cx = 16, cy = 16, r = 11
  return Array.from({ length: 12 }, (_, i) => {
    const theta = (i / 12) * Math.PI * 2 - Math.PI / 2
    return {
      x: cx + Math.cos(theta) * r - 1.8,
      y: cy + Math.sin(theta) * r - 1.8,
      active: i % 3 === 0,
    }
  })
})

async function submit(e: Event) {
  e.preventDefault()
  error.value = ''
  loading.value = true
  // Placeholder: navigate to app after simulated delay
  await new Promise(r => setTimeout(r, 600))
  loading.value = false
  router.push('/app')
}
</script>

<template>
  <div class="auth-shell">
    <!-- ─── Left: form panel ─────────────────────────────────────────── -->
    <div class="auth-form-col">
      <!-- Brand -->
      <div class="auth-brand">
        <div class="auth-lockup">
          <OperonMark variant="nodes" :size="18" />
          <span class="auth-wordmark">operon</span>
        </div>
      </div>

      <!-- Form content, vertically centered -->
      <div class="auth-content">
        <div class="auth-subtitle">
          <span class="auth-dot">●</span> Welcome back
        </div>
        <h1 class="auth-title">Sign in to Operon</h1>
        <p class="auth-lead">
          Access your workspace and the systems you've built.
        </p>

        <form @submit="submit">
          <div class="field-row">
            <label class="op-label">Email</label>
            <input class="op-input" v-model="email" type="email"
              placeholder="you@company.com" autocomplete="email" />
          </div>
          <div class="field-row">
            <div class="field-header">
              <label class="op-label">Password</label>
              <router-link to="/forgot-password" class="forgot-link">Forgot?</router-link>
            </div>
            <div class="input-wrap">
              <input class="op-input" :type="showPassword ? 'text' : 'password'"
                v-model="password" placeholder="•••••••••" autocomplete="current-password" />
              <button type="button" class="eye-btn" @click="showPassword = !showPassword" tabindex="-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <template v-if="showPassword">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </template>
                  <template v-else>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </template>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="error" class="auth-error">{{ error }}</div>

          <button type="submit" class="op-btn accent submit-btn" :disabled="loading">
            <span>{{ loading ? 'Signing in…' : 'Sign in' }}</span>
            <svg v-if="!loading" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        <!-- SSO divider -->
        <div class="sso-divider">
          <span class="sso-line" />
          <span class="sso-label">or continue with</span>
          <span class="sso-line" />
        </div>
        <div class="sso-grid">
          <button type="button" class="op-btn ghost sso-btn">
            <svg width="14" height="14" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Google
          </button>
          <button type="button" class="op-btn ghost sso-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub SSO
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="auth-footer">
        <span>© 2026 Operon Labs</span>
        <span>v3.2.1</span>
      </div>
    </div>

    <!-- ─── Right: ambient panel ─────────────────────────────────────── -->
    <div class="auth-ambient">
      <div class="ambient-grid" />

      <svg viewBox="0 0 600 600" class="ambient-svg">
        <defs>
          <radialGradient id="ambientFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.25" />
            <stop offset="60%" stop-color="var(--accent)" stop-opacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="280" fill="url(#ambientFade)" />

        <rect
          v-for="node in rings"
          :key="node.key"
          :x="node.x - 3.5" :y="node.y - 3.5"
          width="7" height="7" rx="1"
          :fill="node.active ? 'var(--accent)' : 'none'"
          :stroke="node.active ? 'var(--accent)' : 'var(--line-strong)'"
          stroke-width="1.2"
          :opacity="node.opacity"
        />

        <!-- Center circle with inline OperonMark nodes -->
        <circle cx="300" cy="300" r="40" fill="var(--paper)" stroke="var(--line-strong)" stroke-width="1" />
        <g transform="translate(271.2, 271.2) scale(1.8)">
          <rect
            v-for="(n, i) in markNodes" :key="i"
            :x="n.x" :y="n.y" width="3.6" height="3.6" rx="0.6"
            :fill="n.active ? 'var(--ink)' : 'none'"
            stroke="var(--ink)" stroke-width="1.2"
          />
        </g>
      </svg>

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
  line-height: 1.5;
  margin: 0 0 28px;
}

.field-row { margin-bottom: 14px; }

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;

  :deep(.op-label) { margin-bottom: 0; }
}

.forgot-link {
  font-size: 12px;
  color: var(--ink-3);
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 3px;
  cursor: pointer;

  &:hover { color: var(--ink); }
}

.input-wrap {
  position: relative;

  .op-input { padding-right: 36px; }
}

.eye-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--muted);
  padding: 4px;
  display: flex;
  align-items: center;

  &:hover { color: var(--ink); }
}

.auth-error {
  font-size: 12px;
  color: var(--danger);
  margin-top: 6px;
}

.submit-btn {
  width: 100%;
  height: 38px;
  margin-top: 20px;
  justify-content: center;
}

.sso-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0 16px;
}

.sso-line {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.sso-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.sso-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.sso-btn {
  width: 100%;
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
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: -1px -1px;
}

.ambient-svg {
  width: 70%;
  max-width: 480px;
  position: relative;
  z-index: 1;
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
