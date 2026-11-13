import { useEffect, useMemo, useState } from 'react'
import { AGENT_STORAGE_KEYS, aiApi, type AgentStatus, type AiAgent } from '@/core'
import { useLocalStorage } from '@/shared'

export function useAgents() {
  const [agents, setAgents] = useState<AiAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<AgentStatus | 'all'>('all')
  const [activeAgentId, setActiveAgentId] = useLocalStorage<string | null>(
    AGENT_STORAGE_KEYS.activeAgentId,
    null,
  )

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

  const filteredAgents = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return agents.filter((agent) => {
      const statusOk = statusFilter === 'all' || agent.status === statusFilter
      if (!statusOk) return false
      if (!normalized) return true
      const haystack = [
        agent.name,
        agent.description,
        agent.category,
        agent.promptVersion,
        ...agent.tools,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalized)
    })
  }, [agents, query, statusFilter])

  const activeAgent = useMemo(
    () =>
      activeAgentId
        ? agents.find((agent) => agent.id === activeAgentId) ?? null
        : null,
    [activeAgentId, agents],
  )

  const selectAgent = (agentId: string) => {
    setActiveAgentId(agentId)
  }

  const clearActiveAgent = () => {
    setActiveAgentId(null)
  }

  return {
    agents,
    loading,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    filteredAgents,
    activeAgent,
    activeAgentId,
    selectAgent,
    clearActiveAgent,
  }
}
