import { useNavigate } from 'react-router'
import { ROUTES, type AgentStatus } from '@/core'
import { AgentCard } from '@/features/agents/components/AgentCard'
import { useAgents } from '@/features/agents/hooks/useAgents'
import { EmptyState, Spinner } from '@/shared'
import styles from './AgentsPage.module.scss'

const STATUS_OPTIONS: Array<AgentStatus | 'all'> = [
  'all',
  'active',
  'draft',
  'paused',
]

export function AgentsPage() {
  const navigate = useNavigate()
  const {
    loading,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    filteredAgents,
    activeAgentId,
    selectAgent,
  } = useAgents()

  const handleStartReview = (agentId: string) => {
    selectAgent(agentId)
    navigate(ROUTES.chat)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Legal agents</h1>
        <p className={styles.subtitle}>
          Specialized agents for risk scoring, obligations, playbook diffs, and
          redlines. Select one to drive the review chat (stored in this browser).
        </p>
      </header>

      <div className={styles.toolbar} role="search">
        <label className={styles.search}>
          <span className={styles.srOnly}>Search agents</span>
          <input
            type="search"
            value={query}
            placeholder="Search by name, tool, or category"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className={styles.filters} role="group" aria-label="Agent status">
          {STATUS_OPTIONS.map((status) => {
            const isActive = statusFilter === status
            return (
              <button
                key={status}
                type="button"
                className={isActive ? styles.filterActive : styles.filter}
                aria-pressed={isActive}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <Spinner label="Loading agents" />
        </div>
      ) : filteredAgents.length === 0 ? (
        <EmptyState
          title="No agents match"
          description="Try another status filter or clear your search."
        />
      ) : (
        <div className={styles.grid}>
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isSelected={activeAgentId === agent.id}
              onStartReview={() => handleStartReview(agent.id)}
              onSelect={() => selectAgent(agent.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
