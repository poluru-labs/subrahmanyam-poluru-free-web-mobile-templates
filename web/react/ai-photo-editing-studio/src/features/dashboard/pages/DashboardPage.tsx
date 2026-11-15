import { useNavigate } from 'react-router'
import { env, ROUTES } from '@/core'
import { Button } from '@/shared'
import styles from './DashboardPage.module.scss'

const METRICS = [
  { label: 'Edits', value: '1.7k', hint: 'This week' },
  { label: 'Batches', value: '88', hint: 'Processed' },
  { label: 'Revert rate', value: '4%', hint: 'Undone' },
] as const

const FEATURES = [
  {
    kicker: '01',
    title: 'Natural-language edits',
    copy: 'Describe the change. The editor turns it into a reversible layer.',
  },
  {
    kicker: '02',
    title: 'Batch operations',
    copy: 'Carry one look across a set without touching the source files.',
  },
  {
    kicker: '03',
    title: 'Before/after compare',
    copy: 'Split the frame and approve only the edits that hold up.',
  },
  {
    kicker: '04',
    title: 'Non-destructive history',
    copy: 'Step backward anytime. Originals stay locked.',
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <section className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{env.appName}</p>
          <h1 className={styles.title}>Edits directed in plain language</h1>
          <p className={styles.subtitle}>{env.appTagline}</p>
          <div className={styles.actions}>
            <Button onClick={() => navigate(ROUTES.chat)}>Open workspace</Button>
            <Button variant="secondary" onClick={() => navigate(ROUTES.agents)}>
              Browse agents
            </Button>
          </div>
        </div>

        <figure className={styles.compare}>
          <div className={styles.frame}>
            <div className={styles.before}>
              <span className={styles.frameLabel}>Before</span>
              <span className={styles.scene} aria-hidden />
            </div>
            <div className={styles.after}>
              <span className={styles.frameLabel}>After</span>
              <span className={styles.sceneEdited} aria-hidden />
            </div>
          </div>
          <figcaption className={styles.caption}>
            Non-destructive compare · originals stay locked
          </figcaption>
        </figure>
      </section>

      <section className={styles.grid} aria-label="Key metrics">
        {METRICS.map((metric, index) => (
          <article key={metric.label} className={styles.metric}>
            <p className={styles.frameIndex}>0{index + 1}</p>
            <p className={styles.metricLabel}>{metric.label}</p>
            <p className={styles.metricValue}>{metric.value}</p>
            <p className={styles.metricHint}>{metric.hint}</p>
          </article>
        ))}
      </section>

      <section className={styles.features} aria-label="Studio capabilities">
        {FEATURES.map((feature) => (
          <article key={feature.kicker} className={styles.feature}>
            <p className={styles.kicker}>{feature.kicker}</p>
            <h2 className={styles.featureTitle}>{feature.title}</h2>
            <p className={styles.featureCopy}>{feature.copy}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
