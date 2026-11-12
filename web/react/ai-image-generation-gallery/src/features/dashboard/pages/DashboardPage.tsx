          import { useNavigate } from 'react-router'
          import { env, ROUTES } from '@/core'
          import { Button } from '@/shared'
          import styles from './DashboardPage.module.scss'

          const METRICS = [
            {
  label: 'Images',
  value: '8.4k',
  hint: 'In library',
},
{
  label: 'Collections',
  value: '56',
  hint: 'Curated',
},
{
  label: 'Approved',
  value: '61%',
  hint: 'Ready to ship',
},
          ] as const

          export function DashboardPage() {
            const navigate = useNavigate()

            return (
              <div className={styles.page}>
                <section className={styles.hero}>
                  <p className={styles.eyebrow}>{env.appName}</p>
                  <h1 className={styles.title}>A gallery built for iteration</h1>
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
