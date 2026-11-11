import type { AiAgent } from '@/core'
import { Button, cn, formatRelativeTime } from '@/shared'
import styles from './AgentCard.module.scss'

type AgentCardProps = {
  agent: AiAgent
  isSelected?: boolean
  onStartAssist?: () => void
  onSelect?: () => void
}

const CATEGORY_LABEL: Record<AiAgent['category'], string> = {
  kb: 'KB',
  macro: 'Macros',
  sentiment: 'Sentiment',
  escalation: 'Escalation',
  general: 'Triage',
}

export function AgentCard({
  agent,
  isSelected = false,
  onStartAssist,
  onSelect,
}: AgentCardProps) {
  return (
    <article
      className={cn(styles.card, isSelected && styles.selected)}
      aria-current={isSelected ? 'true' : undefined}
    >
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h3 className={styles.name}>{agent.name}</h3>
          <span className={styles.category}>{CATEGORY_LABEL[agent.category]}</span>
        </div>
        <span className={cn(styles.status, styles[agent.status])}>
          {agent.status}
        </span>
      </div>
      <p className={styles.description}>{agent.description}</p>
      <div className={styles.meta}>
        <span className={styles.chip}>prompt v{agent.promptVersion}</span>
        <span className={styles.chip}>{agent.model}</span>
        {agent.tools.map((tool) => (
          <span key={tool} className={styles.chip}>
            {tool}
          </span>
        ))}
      </div>
      <div className={styles.actions}>
        <Button size="sm" onClick={onStartAssist}>
          Start assist
        </Button>
        <Button size="sm" variant="secondary" onClick={onSelect}>
          {isSelected ? 'Selected' : 'Set active'}
        </Button>
      </div>
      <p className={styles.footer}>
        Updated {formatRelativeTime(agent.updatedAt)}
      </p>
    </article>
  )
}
