import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { icl } from 'icl-v3'
import 'icl-v3/dist/icl-v3.css'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// ICL — registers Pinia store, Vuetify, and the useApi composable.
// The auth token is set per-session after login; for now the base URL is enough.
app.use(icl, {
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  headers: {},
})

app.mount('#app')
