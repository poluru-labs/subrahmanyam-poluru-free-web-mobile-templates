import { env } from '@/core'
import styles from './SettingsPage.module.scss'

const SETTINGS = [
  { label: 'Application', value: env.appName },
  { label: 'Environment', value: env.appEnv },
  { label: 'API base URL', value: env.apiBaseUrl },
  { label: 'Default model', value: env.aiDefaultModel },
  {
    label: 'Streaming',
    value: env.aiStreamingEnabled ? 'enabled' : 'disabled',
  },
] as const

export function SettingsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Runtime configuration loaded from Vite environment variables.
        </p>
      </header>

      <section className={styles.panel}>
        {SETTINGS.map((item) => (
          <div key={item.label} className={styles.row}>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.value}>{item.value}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
