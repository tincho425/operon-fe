import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ── Auth pages (no shell) ────────────────────────────────────────────────
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/pages/ForgotPasswordPage.vue'),
    },

    // ── App shell ────────────────────────────────────────────────────────────
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import('@/pages/OverviewPage.vue'),
        },
        {
          // Catch-all: every other path renders IrApp with the current URL
          // as id_resolver — same pattern as bfluid-fe-v3/pages/[...slug].vue
          path: ':pathMatch(.*)*',
          name: 'icl',
          component: () => import('@/pages/IclPage.vue'),
        },
      ],
    },
  ],
})

export default router
