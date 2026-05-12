# Operon - Vue 3 + Vite

A clean, production-ready Vue 3 application built from the Operon design system, faithfully converting the React JSX components into Vue components.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
operon/
├── src/
│   ├── assets/
│   │   └── tokens.css              # Operon design tokens
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.vue        # Main container
│   │   │   ├── AppSidebar.vue      # Navigation sidebar
│   │   │   ├── AppTopbar.vue       # Header bar
│   │   │   └── NavItem.vue         # Nav item
│   │   ├── pages/
│   │   │   ├── LoginPage.vue       # Login form
│   │   │   ├── OverviewPage.vue    # Dashboard
│   │   │   └── PageFrame.vue       # Page wrapper
│   │   ├── auth/
│   │   │   └── AuthAmbient.vue     # Auth visual
│   │   ├── OperonMark.vue          # Logo mark
│   │   ├── OperonLockup.vue        # Logo + text
│   │   ├── CommandPalette.vue      # ⌘K menu
│   │   ├── NotificationsButton.vue # Notifications
│   │   └── NotificationsPopover.vue # Notifications dropdown
│   ├── App.vue
│   └── main.js
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

All components use Operon design tokens from `tokens.css`:

- **Colors**: Paper, Ink, Accent, Semantic (Success, Warning, Danger)
- **Typography**: Geist Sans & Geist Mono
- **Component Classes**: op-btn, op-input, op-card, op-chip, op-kbd, op-label

### Theming
```html
<div class="theme-light accent-indigo">
  <!-- or -->
  <div class="theme-dark accent-emerald">
```

## ✨ Features

- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Dark/Light theme support
- ✅ 4 accent color options
- ✅ Animated sidebar with collapse
- ✅ Command palette (⌘K)
- ✅ Notification system
- ✅ Mobile-friendly overlay drawer

## 📦 Component Hierarchy

```
App
└── AppShell
    ├── AppSidebar (with NavItem components)
    ├── AppTopbar (with NotificationsButton)
    ├── LoginPage (or OverviewPage)
    │   └── PageFrame
    └── CommandPalette
```

## 🔄 React to Vue Conversions Done

- Props → defineProps()
- State → ref()
- Events → defineEmits()
- Conditional → v-if/v-else
- Lists → v-for
- Styles → :style & class bindings

## 🛠️ Development

Changes are reflected instantly with HMR (Hot Module Replacement).

All styling uses CSS custom properties - modify colors in `tokens.css`.

## 📚 Next Steps

1. Add more pages (Models, Users, Forms, etc.)
2. Implement state management (Pinia)
3. Add API integration
4. Implement actual authentication
5. Add more interactive features

---

Built faithfully from the Operon React prototype, now as Vue 3.
