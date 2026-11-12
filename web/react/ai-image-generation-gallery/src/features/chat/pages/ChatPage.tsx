import { Link } from 'react-router'
import { env, ROUTES } from '@/core'
import { MessageInput } from '@/features/chat/components/MessageInput'
import { MessageList } from '@/features/chat/components/MessageList'
import { useChat } from '@/features/chat/hooks/useChat'
import styles from './ChatPage.module.scss'

export function ChatPage() {
  const { messages, error, isPending, activeAgent, sendMessage, clearMessages } =
    useChat()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Studio chat</h1>
        <p className={styles.subtitle}>
          Model: {env.aiDefaultModel} · Streaming{' '}
          {env.aiStreamingEnabled ? 'enabled' : 'disabled'}
        </p>
        {activeAgent ? (
          <p className={styles.agentBanner}>
            Active agent: <strong>{activeAgent.name}</strong> (prompt v
            {activeAgent.promptVersion}) ·{' '}
            <Link to={ROUTES.agents}>Change agent</Link>
          </p>
        ) : (
          <p className={styles.agentBanner}>
            No agent selected —{' '}
            <Link to={ROUTES.agents}>pick a studio agent</Link> for tailored mock
            responses.
          </p>
        )}
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
