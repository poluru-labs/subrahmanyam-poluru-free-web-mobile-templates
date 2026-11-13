          import { useNavigate } from 'react-router'
          import { env, ROUTES } from '@/core'
          import { Button } from '@/shared'
          import styles from './DashboardPage.module.scss'

          const METRICS = [
            {
  label: 'Invoices',
  value: '2.9k',
  hint: 'Processed',
},
{
  label: 'STP rate',
  value: '81%',
  hint: 'No touch',
},
{
  label: 'Exceptions',
  value: '19%',
  hint: 'Needs review',
},
          ] as const

          export function DashboardPage() {
            const navigate = useNavigate()

            return (
              <div className={styles.page}>
                <section className={styles.hero}>
                  <p className={styles.eyebrow}>{env.appName}</p>
                  <h1 className={styles.title}>Invoices from PDF to ledger</h1>
                  <p className={styles.subtitle}>{env.appTagline}</p>
                  <div className={styles.actions}>
                    <Button onClick={() => navigate(ROUTES.chat)}>Open workspace</Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(ROUTES.agents)}
                    >
                      Browse agents
                    </Button>
                  </div>
                </section>

                <section className={styles.grid} aria-label="Key metrics">
                  {METRICS.map((metric) => (
                    <article key={metric.label} className={styles.metric}>
                      <p className={styles.metricLabel}>{metric.label}</p>
                      <p className={styles.metricValue}>{metric.value}</p>
                      <p className={styles.metricHint}>{metric.hint}</p>
                    </article>
                  ))}
                </section>
              </div>
            )
          }
