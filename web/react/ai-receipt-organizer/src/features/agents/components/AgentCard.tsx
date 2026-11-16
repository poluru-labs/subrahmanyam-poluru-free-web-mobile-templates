import type { AiAgent } from '@/core'
import { Button, cn, formatRelativeTime } from '@/shared'
import styles from './AgentCard.module.scss'

type AgentCardProps = {
  agent: AiAgent
  isSelected?: boolean
  onStartOrganize?: () => void
  onSelect?: () => void
}

const CATEGORY_LABEL: Record<AiAgent['category'], string> = {
  ocr: 'OCR',
  category: 'Cats',
  duplicate: 'Dupes',
  export: 'Export',
  general: 'Summary',
}

export function AgentCard({
  agent,
  isSelected = false,
  onStartOrganize,
  onSelect,
}: AgentCardProps) {
  return (
    <article
      className={cn(styles.card, isSelected && styles.selected)}
      aria-current={isSelected ? 'true' : undefined}
    >
      <div className={styles.accent} aria-hidden />
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
        <span className={cn(styles.chip, styles.chipProminent)}>
          prompt v{agent.promptVersion}
        </span>
        <span className={styles.chip}>{agent.model}</span>
        {agent.tools.map((tool) => (
          <span key={tool} className={styles.chip}>
            {tool}
          </span>
        ))}
      </div>
      <div className={styles.actions}>
        <Button size="sm" onClick={onStartOrganize}>
          Start organize
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