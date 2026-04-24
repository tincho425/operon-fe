// Type shim for icl-v3 (no published @types package).
// Extend as needed when using specific named exports.
declare module 'icl-v3' {
  import type { Plugin } from 'vue'

  interface IclOptions {
    baseURL?: string
    headers?: Record<string, string>
  }

  export const icl: Plugin<[IclOptions]>

  export function useApi(): {
    get: (endpoint: string, params?: object) => Promise<unknown>
    post: (args: { endpoint: string; data?: object; config?: object }) => Promise<unknown>
    put: (endpoint: string, data?: object, config?: object) => Promise<unknown>
    del: (endpoint: string, config?: object) => Promise<unknown>
    updateBaseUrl: (url: string) => void
    updateHeaders: (headers: Record<string, string>) => void
    loading: import('vue').Ref<boolean>
  }

  export function useTheme(): unknown
  export function useLocale(): { current: import('vue').Ref<string> }
  export function useDisplay(): Record<string, import('vue').Ref<boolean>>
}

declare module 'icl-v3/dist/icl-v3.css' {}
