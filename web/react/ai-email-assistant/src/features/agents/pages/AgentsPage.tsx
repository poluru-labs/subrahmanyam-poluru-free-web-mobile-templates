import { useEffect, useState } from 'react'
import { aiApi, type AiAgent } from '@/core'
import { AgentCard } from '@/features/agents/components/AgentCard'
import { EmptyState, Spinner } from '@/shared'
import styles from './AgentsPage.module.scss'

export function AgentsPage() {
  const [agents, setAgents] = useState<AiAgent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    void aiApi.listAgents().then((result) => {
      if (!active) return
      setAgents(result)
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Agents</h1>
        <p className={styles.subtitle}>
          Catalog of reusable AI agents. Replace the mock data with your agent
          registry API.
        </p>
      </header>

      {loading ? (
        <div className={styles.loading}>
          <Spinner label="Loading agents" />
        </div>
      ) : agents.length === 0 ? (
        <EmptyState
          title="No agents yet"
          description="Create your first agent in the registry to populate this view."
        />
      ) : (
        <div className={styles.grid}>
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  )
}
