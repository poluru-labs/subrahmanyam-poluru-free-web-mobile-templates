/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_TAGLINE: string
  readonly VITE_BRAND_COLOR: string
  readonly VITE_APP_ENV: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT_MS: string
  readonly VITE_AI_DEFAULT_MODEL: string
  readonly VITE_AI_STREAMING_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
