<template>
  <div class="auth-container">
    <!-- Form side -->
    <div class="auth-form">
      <button class="logo-btn">
        <OperonLockup :size="16" />
      </button>

      <div class="form-content">
        <div class="auth-label">● Welcome back</div>
        <h1 class="auth-title">Sign in to Operon</h1>

        <p class="auth-subtitle">
          Access your workspace and the systems you've built.
        </p>

        <form @submit.prevent="submit">
          <div class="form-group">
            <label class="op-label">Email</label>
            <input
              v-model="email"
              type="email"
              class="op-input"
              placeholder="you@company.com"
            />
          </div>

          <div class="form-group">
            <div class="password-header">
              <label class="op-label">Password</label>
              <button type="button" class="forgot-link">Forgot?</button>
            </div>
            <div style="position: relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="op-input"
                placeholder="•••••••••"
              />
              <button
                type="button"
                class="show-btn"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a19.78 19.78 0 0 1 5.06-6.06M9.9 4.24A9.06 9.06 0 0 1 12 4c7 0 11 8 11 8a19.83 19.83 0 0 1-3.9 4.74"/><path d="M1 1l22 22"/><path d="M9 9a3 3 0 1 0 4.24 4.24"/>
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" class="op-btn accent" style="width: 100%; height: 38px; margin-top: 20px; justify-content: center">
            {{ loading ? 'Signing in…' : 'Sign in' }}
            <svg v-if="!loading" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        <div class="divider-section">
          <span class="divider-line" />
          <span class="divider-text">OR CONTINUE WITH</span>
          <span class="divider-line" />
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px">
          <button type="button" class="op-btn ghost" style="width: 100%; justify-content: center">
            <svg width="14" height="14" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Google
          </button>
          <button type="button" class="op-btn ghost" style="width: 100%; justify-content: center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            GitHub SSO
          </button>
        </div>
      </div>

      <div class="auth-footer">
        <span>© 2026 Operon Labs</span>
        <span>v3.2.1</span>
      </div>
    </div>

    <!-- Visual side -->
    <AuthAmbient />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OperonLockup from '../OperonLockup.vue'
import AuthAmbient from '../auth/AuthAmbient.vue'

const emit = defineEmits(['login'])

const email = ref('marin@operon.io')
const password = ref('••••••••••')
const showPassword = ref(false)
const loading = ref(false)

const submit = async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  loading.value = false
  emit('login')
}
</script>

<style scoped>
.auth-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100%;
  background: var(--paper);
}

.auth-form {
  display: flex;
  flex-direction: column;
  padding: 32px 48px;
  min-height: 100%;
}

.logo-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--ink);
  display: flex;
  align-items: center;
  width: fit-content;
}

.form-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 380px;
  margin: 0 auto;
  width: 100%;
}

.auth-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.auth-label::before {
  content: '● ';
  color: var(--accent);
}

.auth-title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.03em;
  margin: 0 0 8px;
  line-height: 1.1;
}

.auth-subtitle {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 28px;
}

.form-group {
  margin-bottom: 14px;
}

.form-group:last-of-type {
  margin-bottom: 6px;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.forgot-link {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 12px;
  color: var(--ink-3);
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 3px;
}

.show-btn {
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
}

.divider-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0 16px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--line);
}

.divider-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted);
  letter-spacing: 0.1em;
}

.auth-footer {
  font-size: 11px;
  color: var(--muted);
  font-family: var(--font-mono);
  display: flex;
  justify-content: space-between;
}

@media (max-width: 900px) {
  .auth-container {
    grid-template-columns: 1fr;
  }
  .auth-form {
    padding: 20px;
  }
}
</style>
