<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import OperonMark from '@/components/OperonMark.vue'

const dark = ref(false)

// Used via v-bind() in <style> — bypasses CSS var resolution in Vuetify context
const gridColor = computed(() => dark.value ? '#26262a' : '#e6e6e8')

function toggleDark() {
  dark.value = !dark.value
  const el = document.documentElement
  el.classList.toggle('theme-dark', dark.value)
  el.classList.toggle('theme-light', !dark.value)
}

onUnmounted(() => {
  // Restore theme when leaving landing
  document.documentElement.classList.remove('theme-dark')
  document.documentElement.classList.add('theme-light')
})

const steps = [
  { n: '01', icon: 'Model', t: 'Define models',   d: 'Declare entities and fields. Operon generates the schema, the API, and the admin.' },
  { n: '02', icon: 'Form',  t: 'Compose forms',   d: 'Build input surfaces against any model. Validation, permissions, and audit are free.' },
  { n: '03', icon: 'Page',  t: 'Assemble pages',  d: 'Lay out pages from forms, tables, charts. Custom React escape hatch when needed.' },
  { n: '04', icon: 'Rule',  t: 'Wire rules',       d: 'Business logic lives in versioned rules — not scattered across if/else in UI code.' },
]

const compareRows = [
  { t: 'In-house',      speed: 'low',    control: 'high',   scale: 'high',   cplx: 'high' },
  { t: 'SaaS / on-prem',speed: 'medium', control: 'low',    scale: 'medium', cplx: 'low' },
  { t: 'No-code',       speed: 'high',   control: 'medium', scale: 'low',    cplx: 'medium' },
  { t: 'VibeCode / AI', speed: 'high',   control: 'low',    scale: 'low',    cplx: 'low' },
  { t: 'Operon',        speed: 'high',   control: 'high',   scale: 'high',   cplx: 'high',   us: true },
]

const useCases = [
  { tag: 'ERP', t: 'Operations & finance', d: 'Models, forms and flows for the real back-office.' },
  { tag: 'CMS', t: 'Content systems',      d: 'Structured content, permissions, publishing workflows.' },
  { tag: 'CRM', t: 'Sales platforms',      d: 'Pipelines, activities, reporting against your own data.' },
  { tag: 'Ops', t: 'Internal tools',       d: 'The tools your company runs on — versioned and auditable.' },
]

const footerCols: [string, string[]][] = [
  ['Product', ['Overview', 'Models', 'Forms', 'Pages', 'Rules', 'Flows']],
  ['Company', ['About', 'Customers', 'Blog', 'Careers']],
  ['Legal',   ['Privacy', 'Terms', 'Security']],
]

// Mini-sidebar nav items for hero visual
const heroNav = [
  { n: 'Overview', active: true,  icon: 'Overview' },
  { n: 'Models',   active: false, icon: 'Model' },
  { n: 'Forms',    active: false, icon: 'Form' },
  { n: 'Pages',    active: false, icon: 'Page' },
  { n: 'Rules',    active: false, icon: 'Rule' },
  { n: 'Flows',    active: false, icon: 'Flow' },
  { n: 'Users',    active: false, icon: 'Users' },
  { n: 'Logs',     active: false, icon: 'Logs' },
]

const heroStats = [
  { l: 'Users',    v: '7',     s: 'active' },
  { l: 'Sessions', v: '4',     s: 'live',  hot: true },
  { l: 'Pages',    v: '100',   s: 'published' },
  { l: 'Calls',    v: '1,862', s: '30d' },
  { l: 'Txns',     v: '333',   s: '30d' },
  { l: 'Errors',   v: '19',    s: '30d' },
]

function cellClass(v: string) {
  return v === 'high' ? 'dot-green' : v === 'medium' ? 'dot-yellow' : 'dot-red'
}
</script>

<template>
  <div class="landing">
    <!-- ─── Nav ──────────────────────────────────────────────────────────── -->
    <nav class="lnav">
      <div class="container lnav-inner">
        <div class="lockup">
          <OperonMark variant="nodes" :size="16" />
          <span class="wordmark">operon</span>
        </div>
        <div class="lnav-links">
          <a class="lnav-link" href="#how">How it works</a>
          <a class="lnav-link" href="#compare">Compare</a>
          <a class="lnav-link" href="#pricing">Pricing</a>
          <a class="lnav-link" href="#customers">Customers</a>
        </div>
        <button class="theme-btn" @click="toggleDark" :title="dark ? 'Light mode' : 'Dark mode'">
          <!-- Sun -->
          <svg v-if="dark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
          <!-- Moon -->
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
          </svg>
        </button>
        <router-link to="/login" class="op-btn ghost lnav-btn">Sign in</router-link>
        <router-link to="/login" class="op-btn lnav-btn">
          Start building
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
    </nav>

    <!-- ─── Hero ─────────────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="grid-backdrop" />
      <div class="container hero-inner">
        <div class="hero-kicker"><span class="kicker-dot">●</span> v3.2 — now with AI-assisted models</div>
        <h1 class="hero-h1">Build <em>systems,</em><br>not apps.</h1>
        <p class="hero-lead">
          Operon is the backend-first platform for teams whose app became a system. Define your models, compose pages, wire up rules, ship the whole cluster.
        </p>
        <div class="hero-actions">
          <router-link to="/login" class="op-btn accent hero-cta">
            Start building
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
            </svg>
          </router-link>
          <a href="#how" class="op-btn ghost hero-cta">Learn more</a>
          <span class="hero-cmd">
            <kbd class="op-kbd">curl</kbd> <kbd class="op-kbd">get.operon.io</kbd>
          </span>
        </div>

        <!-- Browser mockup -->
        <div class="hero-visual">
          <div class="browser-chrome">
            <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
            <span class="browser-url">operon.io/administration</span>
          </div>
          <div class="browser-content">
            <!-- Mini sidebar -->
            <div class="mini-sidebar">
              <div class="mini-sys">
                <div class="mini-avatar">A</div>
                <span>Administration</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
              <div
                v-for="item in heroNav" :key="item.n"
                class="mini-nav-row"
                :class="{ 'mini-active': item.active }"
              >
                <!-- Icon SVG per type -->
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  :stroke="item.active ? 'var(--ink)' : 'var(--ink-3)'"
                  stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <template v-if="item.icon === 'Overview'">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
                    <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
                  </template>
                  <template v-else-if="item.icon === 'Model'">
                    <path d="M4 7l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/>
                  </template>
                  <template v-else-if="item.icon === 'Form'">
                    <rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>
                  </template>
                  <template v-else-if="item.icon === 'Page'">
                    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>
                  </template>
                  <template v-else-if="item.icon === 'Rule'">
                    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>
                  </template>
                  <template v-else-if="item.icon === 'Flow'">
                    <circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/>
                    <circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/>
                    <path d="M8.5 6H15.5M6 8.5V15.5M18 8.5V15.5M8.5 18H15.5"/>
                  </template>
                  <template v-else-if="item.icon === 'Users'">
                    <circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.2 3.5-5 6.5-5s5.7 1.8 6.5 5"/>
                    <circle cx="17" cy="9" r="2.5"/><path d="M21.5 18c-.5-2-2-3.2-4-3.2"/>
                  </template>
                  <template v-else-if="item.icon === 'Logs'">
                    <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h10M7 17h6"/>
                  </template>
                </svg>
                {{ item.n }}
              </div>
            </div>
            <!-- Mini main content -->
            <div class="mini-main">
              <div class="mini-page-title">Overview</div>
              <div class="mini-stats">
                <div v-for="k in heroStats" :key="k.l" class="mini-stat">
                  <div class="mini-stat-header">
                    <span class="mini-stat-label">{{ k.l }}</span>
                    <span class="mini-stat-tag" :class="{ 'tag-accent': k.hot }">{{ k.s }}</span>
                  </div>
                  <div class="mini-stat-value">{{ k.v }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── How it works ─────────────────────────────────────────────────── -->
    <section class="section" id="how">
      <div class="container">
        <div class="eyebrow">How Operon works</div>
        <h2 class="section-title">Four primitives. One coordinated system.</h2>
        <p class="section-lead">
          Operon gives you the four pieces every serious system needs — and nothing it doesn't. Use them together or bring your own.
        </p>

        <!-- 4-step grid -->
        <div class="steps-grid">
          <div v-for="s in steps" :key="s.n" class="step">
            <div class="step-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <template v-if="s.icon === 'Model'">
                  <path d="M4 7l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/>
                </template>
                <template v-else-if="s.icon === 'Form'">
                  <rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>
                </template>
                <template v-else-if="s.icon === 'Page'">
                  <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>
                </template>
                <template v-else-if="s.icon === 'Rule'">
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>
                </template>
              </svg>
            </div>
            <div class="step-num">{{ s.n }}</div>
            <h3 class="step-title">{{ s.t }}</h3>
            <p class="step-desc">{{ s.d }}</p>
          </div>
        </div>

        <!-- Two ways in -->
        <div class="two-ways">
          <div class="two-ways-text">
            <div class="eyebrow" style="margin-top:0">Two ways in</div>
            <h3 class="two-ways-title">Build it in the app, or straight in the database.</h3>
            <p class="two-ways-body">
              Design your models, forms and business logic inside Operon — point and click, no migration step. Or drop down to the database and write your schema and functions directly. Operon picks them up either way.
            </p>
            <div class="two-ways-chips">
              <span class="op-chip">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                Visual model builder
              </span>
              <span class="op-chip">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                SQL functions, your way
              </span>
              <span class="op-chip">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                Both stay in sync
              </span>
            </div>
          </div>
          <div class="two-ways-visuals">
            <!-- Visual builder card -->
            <div class="op-card" style="padding:16px">
              <div class="two-ways-card-header">
                <div class="two-ways-icon-wrap">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 7l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4"/><path d="M4 17l8 4 8-4"/>
                  </svg>
                </div>
                <span class="two-ways-card-label">In the app</span>
              </div>
              <div class="model-fields">
                <div class="field-pill"><span>id</span><span class="field-type">uuid</span></div>
                <div class="field-pill"><span>name</span><span class="field-type">string</span></div>
                <div class="field-pill"><span>plan</span><span class="field-type">enum</span></div>
                <div class="field-pill add-pill">+ add field</div>
              </div>
            </div>
            <!-- SQL code block -->
            <pre class="code-block"><span class="com">-- write it in plain SQL</span>
<span class="kw">CREATE FUNCTION</span>
<span class="id">company_can_delete</span>(uid uuid)
<span class="kw">RETURNS</span> <span class="id">bool AS</span> $$
  <span class="kw">SELECT</span> role = <span class="str">'owner'</span>
  <span class="kw">FROM</span> users
  <span class="kw">WHERE</span> id = uid;
$$ <span class="kw">LANGUAGE</span> sql;</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Compare ──────────────────────────────────────────────────────── -->
    <section class="section compare-section" id="compare">
      <div class="container">
        <div class="eyebrow">Why Operon</div>
        <h2 class="section-title">Every other option trades something away.</h2>
        <p class="section-lead">
          Speed, control, scale, complexity — pick three. Operon is the one that doesn't ask.
        </p>
        <table class="compare-table">
          <thead>
            <tr>
              <th>Approach</th>
              <th>Speed</th>
              <th>Control</th>
              <th>Scalability</th>
              <th>Complexity handled</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in compareRows" :key="r.t" :class="{ 'row-us': r.us }">
              <td>
                <div class="compare-name">
                  <OperonMark v-if="r.us" variant="nodes" :size="16" />
                  {{ r.t }}
                </div>
              </td>
              <td>
                <span class="compare-cell">
                  <span :class="cellClass(r.speed)">●</span>
                  <span class="compare-val">{{ r.speed }}</span>
                </span>
              </td>
              <td>
                <span class="compare-cell">
                  <span :class="cellClass(r.control)">●</span>
                  <span class="compare-val">{{ r.control }}</span>
                </span>
              </td>
              <td>
                <span class="compare-cell">
                  <span :class="cellClass(r.scale)">●</span>
                  <span class="compare-val">{{ r.scale }}</span>
                </span>
              </td>
              <td>
                <span class="compare-cell">
                  <span :class="cellClass(r.cplx)">●</span>
                  <span class="compare-val">{{ r.cplx }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ─── Use Cases ────────────────────────────────────────────────────── -->
    <section class="section" id="customers">
      <div class="container">
        <div class="eyebrow">Built with Operon</div>
        <h2 class="section-title">ERP. CMS. CRM. Or whatever you need.</h2>
        <div class="use-cases-grid">
          <div v-for="c in useCases" :key="c.tag" class="op-card use-case-card">
            <span class="op-chip use-case-chip">{{ c.tag }}</span>
            <div class="use-case-title">{{ c.t }}</div>
            <div class="use-case-desc">{{ c.d }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA ──────────────────────────────────────────────────────────── -->
    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-kicker">
          <span style="color:#6478ff">●</span> When your app becomes a system
        </div>
        <h2 class="cta-title">Start where others break.</h2>
        <p class="cta-lead">
          Operon scales with the logic your business actually runs on. No rewrites. No walled gardens.
        </p>
        <router-link to="/login" class="op-btn accent cta-btn">
          Start building
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
    </section>

    <!-- ─── Footer ───────────────────────────────────────────────────────── -->
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="lockup">
            <OperonMark variant="nodes" :size="16" />
            <span class="wordmark">operon</span>
          </div>
          <p class="footer-tagline">
            An operon is a coordinated cluster of genes. Build software the same way.
          </p>
          <div class="footer-social">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </div>
        </div>
        <div v-for="[heading, items] in footerCols" :key="heading" class="footer-col">
          <div class="footer-col-heading">{{ heading }}</div>
          <a v-for="item in items" :key="item" href="#" class="footer-link">{{ item }}</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© 2026 Operon Labs, S.L.</span>
        <span>v3.2.1 · all systems nominal ●</span>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.landing {
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
.lnav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: v-bind("dark ? 'rgba(10,10,10,0.72)' : 'rgba(255,255,255,0.78)'");
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid var(--line);
}

.lnav-inner {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.lockup {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
  flex-shrink: 0;
}

.wordmark {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.lnav-links {
  flex: 1;
  display: flex;
  gap: 22px;
  margin-left: 24px;
}

.lnav-link {
  font-size: 13px;
  color: var(--ink-3);
  transition: color 0.12s;
  text-decoration: none;

  &:hover { color: var(--ink); }
}

.theme-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-3);
  border-radius: var(--r-md);

  &:hover { background: var(--paper-2); color: var(--ink); }
}

.lnav-btn { height: 30px; }

// ─── Hero ────────────────────────────────────────────────────────────────────
.hero {
  padding: 80px 0 48px;
  position: relative;
  overflow: hidden;
}

.grid-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(v-bind(gridColor) 1px, transparent 1px),
    linear-gradient(90deg, v-bind(gridColor) 1px, transparent 1px);
  background-size: 56px 56px;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 30% 40%, black 30%, transparent 70%);
  mask-image: radial-gradient(ellipse 80% 60% at 30% 40%, black 30%, transparent 70%);
  opacity: 0.7;
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  color: var(--ink-3);
  margin-bottom: 20px;
}

.kicker-dot { color: var(--accent); }

.hero-h1 {
  font-size: clamp(48px, 7vw, 84px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.98;
  margin: 0 0 20px;
  max-width: 900px;

  em {
    font-style: normal;
    color: var(--muted);
  }
}

.hero-lead {
  font-size: 18px;
  color: var(--ink-3);
  line-height: 1.5;
  max-width: 560px;
  margin: 0 0 32px;
}

.hero-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.hero-cta { height: 40px; padding: 0 18px; font-size: 14px; }

.hero-cmd {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
  margin-left: 8px;
  display: flex;
  gap: 4px;
  align-items: center;
}

// ── Browser mockup ──────────────────────────────────────────────────────────
.hero-visual {
  margin-top: 64px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper);
  overflow: hidden;
  box-shadow: 0 24px 60px -20px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.02);
}

.browser-chrome {
  height: 34px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border-bottom: 1px solid var(--line);
  background: var(--paper-2);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &.red    { background: #ff5f57; }
  &.yellow { background: #febc2e; }
  &.green  { background: #28c840; }
}

.browser-url {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
}

.browser-content {
  display: grid;
  grid-template-columns: 200px 1fr;
  min-height: 460px;
}

.mini-sidebar {
  border-right: 1px solid var(--line);
  padding: 12px;
  background: var(--paper);
}

.mini-sys {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ink);
}

.mini-avatar {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: var(--ink);
  color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-family: var(--font-mono);
  font-weight: 600;
  flex-shrink: 0;
}

.mini-nav-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  color: var(--ink-3);
  font-weight: 400;

  &.mini-active {
    background: var(--paper-2);
    color: var(--ink);
    font-weight: 500;
  }
}

.mini-main {
  padding: 24px;
  background: var(--paper-2);
}

.mini-page-title {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 14px;
}

.mini-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
}

.mini-stat {
  background: var(--paper);
  padding: 14px;
}

.mini-stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mini-stat-label {
  font-size: 11px;
  color: var(--ink-3);
}

.mini-stat-tag {
  font-family: var(--font-mono);
  font-size: 9.5px;
  color: var(--muted);

  &.tag-accent { color: var(--accent); }
}

.mini-stat-value {
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-top: 6px;
}

// ─── Sections ────────────────────────────────────────────────────────────────
.section {
  padding: 96px 0;
  border-top: 1px solid var(--line);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
}

.section-title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.02;
  margin: 0 0 20px;
  max-width: 720px;
}

.section-lead {
  font-size: 17px;
  color: var(--ink-3);
  max-width: 620px;
  margin: 0 0 48px;
  line-height: 1.5;
}

// ── How it works ─────────────────────────────────────────────────────────────
.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--paper);
  overflow: hidden;
}

.step {
  padding: 24px;
  border-right: 1px solid var(--line);

  &:last-child { border-right: none; }
}

.step-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.step-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.step-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}

.step-desc {
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.5;
  margin: 0;
}

// ── Two ways in ───────────────────────────────────────────────────────────────
.two-ways {
  margin-top: 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}

.two-ways-title {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
}

.two-ways-body {
  font-size: 14.5px;
  color: var(--ink-3);
  line-height: 1.6;
  margin: 0 0 16px;
}

.two-ways-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.two-ways-visuals {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.two-ways-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.two-ways-icon-wrap {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
}

.two-ways-card-label {
  font-size: 12.5px;
  font-weight: 500;
}

.model-fields {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--ink-3);
}

.field-pill {
  padding: 6px 8px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.field-type { color: var(--muted); }

.add-pill {
  background: var(--accent-soft);
  border: 1px dashed var(--accent);
  color: var(--accent);
  justify-content: center;
}

.code-block {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.7;
  padding: 14px;
  background: var(--ink);
  color: #e4e4e7;
  border-radius: 12px;
  overflow-x: auto;
  margin: 0;
  white-space: pre;

  .kw  { color: #a78bfa; }
  .id  { color: #6478ff; }
  .str { color: #34d399; }
  .com { color: rgba(255,255,255,0.5); }
}

// ─── Compare ─────────────────────────────────────────────────────────────────
.compare-section { background: var(--paper-2); }

.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
  background: var(--paper);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--line);

  th, td {
    padding: 16px 20px;
    text-align: left;
    border-bottom: 1px solid var(--line);
  }

  th {
    font-weight: 500;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  tbody tr:last-child td { border-bottom: none; }

  .row-us td {
    background: var(--paper-2);
    font-weight: 500;
  }
}

.compare-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.compare-cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.compare-val {
  color: var(--ink-3);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dot-green  { color: var(--success); }
.dot-red    { color: var(--danger); }
.dot-yellow { color: var(--warning); }

// ─── Use Cases ───────────────────────────────────────────────────────────────
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 40px;
}

.use-case-card { padding: 20px; }

.use-case-chip { margin-bottom: 16px; }

.use-case-title {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin: 4px 0 6px;
}

.use-case-desc {
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.5;
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
.cta-section {
  background: var(--ink);
  color: var(--paper);
  border-top: 1px solid transparent;
  padding: 96px 0;
}

.cta-inner {
  text-align: center;
  max-width: 820px;
}

.cta-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  margin-bottom: 24px;
}

.cta-title {
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 0 0 20px;
}

.cta-lead {
  font-size: 17px;
  color: rgba(255,255,255,0.7);
  max-width: 580px;
  margin: 0 auto 36px;
  line-height: 1.5;
}

.cta-btn { height: 44px; padding: 0 22px; font-size: 15px; }

// ─── Footer ──────────────────────────────────────────────────────────────────
.footer {
  padding: 64px 0 40px;
  border-top: 1px solid var(--line);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 32px;
}

.footer-brand { }

.footer-tagline {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
  margin-top: 14px;
  max-width: 280px;
}

.footer-social {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  color: var(--muted);
}

.footer-col { }

.footer-col-heading {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.footer-link {
  display: block;
  font-size: 13px;
  color: var(--ink-3);
  padding: 4px 0;
  text-decoration: none;

  &:hover { color: var(--ink); }
}

.footer-bottom {
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted);
  font-family: var(--font-mono);
}
</style>
