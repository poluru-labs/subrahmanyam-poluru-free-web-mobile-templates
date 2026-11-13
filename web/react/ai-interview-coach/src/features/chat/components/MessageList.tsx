import type { AiMessage } from '@/core'
import { cn, formatRelativeTime } from '@/shared'
import { EmptyState } from '@/shared'
import styles from './MessageList.module.scss'

type MessageListProps = {
  messages: AiMessage[]
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <EmptyState
        title="Start a conversation"
        description="Ask a question to exercise the chat pipeline. Responses fall back to a mock until your API is connected."
      />
    )
  }

  return (
    <div className={styles.list} role="log" aria-live="polite">
      {messages.map((message) => (
        <article
          key={message.id}
          className={cn(styles.row, styles[message.role])}
        >
          <div className={styles.meta}>
            <span>{message.role}</span>
            <span>{formatRelativeTime(message.createdAt)}</span>
          </div>
          <div className={styles.bubble}>{message.content}</div>
        </article>
      ))}
    </div>
  )
}
