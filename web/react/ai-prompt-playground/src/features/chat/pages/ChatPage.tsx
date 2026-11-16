import { env } from '@/core'
import { MessageInput } from '@/features/chat/components/MessageInput'
import { MessageList } from '@/features/chat/components/MessageList'
import { useChat } from '@/features/chat/hooks/useChat'
import styles from './ChatPage.module.scss'

export function ChatPage() {
  const { messages, error, isPending, sendMessage, clearMessages } = useChat()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Chat</h1>
        <p className={styles.subtitle}>
          Model: {env.aiDefaultModel} · Streaming{' '}
          {env.aiStreamingEnabled ? 'enabled' : 'disabled'}
        </p>
      </header>

      <section className={styles.panel}>
        <MessageList messages={messages} />
        {error ? <p className={styles.error}>{error}</p> : null}
        <MessageInput
          disabled={isPending}
          onSend={sendMessage}
          onClear={clearMessages}
        />
      </section>
    </div>
  )
}
