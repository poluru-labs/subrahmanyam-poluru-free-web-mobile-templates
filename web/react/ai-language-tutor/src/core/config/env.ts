const asBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value == null || value === '') {
    return fallback
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

const asNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

/**
 * Typed runtime config from Vite env vars.
 * Keep secrets on the server — only public client config belongs here.
 */
export const env = {
  appName: import.meta.env.VITE_APP_NAME ?? 'AI Language Tutor',
  appTagline:
    import.meta.env.VITE_APP_TAGLINE ??
    'Conversational practice with corrections and spaced review.',
  brandColor: import.meta.env.VITE_BRAND_COLOR ?? '#D92C54',
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
  apiTimeoutMs: asNumber(import.meta.env.VITE_API_TIMEOUT_MS, 30_000),
  aiDefaultModel: import.meta.env.VITE_AI_DEFAULT_MODEL ?? 'gpt-4.1-mini',
  aiStreamingEnabled: asBoolean(
    import.meta.env.VITE_AI_STREAMING_ENABLED,
    true,
  ),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const

export type AppEnv = typeof env
