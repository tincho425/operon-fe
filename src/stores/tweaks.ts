import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme    = 'light' | 'dark'
export type Accent   = 'indigo' | 'emerald' | 'violet' | 'amber'
export type Header   = 'minimal' | 'dark' | 'accent'
export type Density  = 'compact' | 'normal' | 'comfortable'
export type Logo     = 'nodes' | 'graph' | 'ring' | 'solid'
export type TypePair = 'geist' | 'mono' | 'system'

// Matches TWEAK_DEFAULTS from App Prototype.html
const DEFAULTS = {
  theme:      'light'       as Theme,
  accent:     'indigo'      as Accent,
  headerStyle:'minimal'     as Header,
  density:    'comfortable' as Density,
  logoVariant:'nodes'       as Logo,
  typePair:   'mono'        as TypePair,
}

const ACCENT_CLASSES: Accent[] = ['indigo', 'emerald', 'violet', 'amber']

export const useTweaksStore = defineStore('tweaks', () => {
  const theme       = ref<Theme>   (DEFAULTS.theme)
  const accent      = ref<Accent>  (DEFAULTS.accent)
  const headerStyle = ref<Header>  (DEFAULTS.headerStyle)
  const density     = ref<Density> (DEFAULTS.density)
  const logoVariant = ref<Logo>    (DEFAULTS.logoVariant)
  const typePair    = ref<TypePair>(DEFAULTS.typePair)

  /** Apply all current values to <html> via classes + inline font overrides */
  function apply() {
    const el = document.documentElement

    // Theme — toggle .theme-dark / .theme-light class
    el.classList.remove('theme-light', 'theme-dark')
    el.classList.add(theme.value === 'dark' ? 'theme-dark' : 'theme-light')

    // Accent — set .accent-* class
    ACCENT_CLASSES.forEach(a => el.classList.remove(`accent-${a}`))
    el.classList.add(`accent-${accent.value}`)

    // Type pair — override --font-sans CSS variable
    if (typePair.value === 'mono') {
      el.style.setProperty('--font-sans', "'Geist Mono', ui-monospace, monospace")
    } else if (typePair.value === 'system') {
      el.style.setProperty('--font-sans', "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif")
    } else {
      el.style.setProperty('--font-sans', "'Geist', ui-sans-serif, system-ui, sans-serif")
    }

    // Density — data attr for CSS-driven spacing (optional extension point)
    el.setAttribute('data-density', density.value)
  }

  watch([theme, accent, headerStyle, density, logoVariant, typePair], apply)

  return { theme, accent, headerStyle, density, logoVariant, typePair, apply }
})
