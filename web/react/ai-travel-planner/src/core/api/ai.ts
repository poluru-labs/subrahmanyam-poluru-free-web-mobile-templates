import { apiClient } from '@/core/api/client'
import { env } from '@/core/config/env'
import type {
  AiAgent,
  AiMessage,
  ChatCompletionRequest,
  ChatCompletionResponse,
} from '@/core/types/ai'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `msg_${Date.now()}`

export const MOCK_AGENTS: AiAgent[] = [
  {
    id: 'agent_itinerary',
    name: 'Itinerary Builder',
    description:
      'Drafts constraint-aware routes between cities with transit and timing buffers.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'itinerary',
    promptVersion: '2026.03.5',
    tools: ['route.plan', 'constraint.fit', 'buffer.add'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
  },
  {
    id: 'agent_budget',
    name: 'Budget Analyst',
    description:
      'Breaks out lodging, food, transit, and activities with tiered spend options.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'budget',
    promptVersion: '2026.02.3',
    tools: ['cost.split', 'tier.compare', 'fx.hint'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 91).toISOString(),
  },
  {
    id: 'agent_agenda',
    name: 'Day Map Planner',
    description:
      'Builds day-by-day agendas with maps, opening hours, and walking clusters.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'agenda',
    promptVersion: '2026.01.2',
    tools: ['day.map', 'hours.check', 'cluster.walk'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 215).toISOString(),
  },
  {
    id: 'agent_packing',
    name: 'Packing Curator',
    description:
      'Suggests packing lists from weather, activities, and baggage constraints.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'packing',
    promptVersion: '2026.03.0-rc5',
    tools: ['pack.list', 'weather.fit', 'bag.limit'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
  },
  {
    id: 'agent_trip',
    name: 'Trip Composer',
    description:
      'Merges itinerary, budget, agenda, and packing into a shareable trip brief.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.8',
    tools: ['brief.merge', 'share.link', 'checklist.emit'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
]

/**
 * AI API surface.
 * Swap mock implementations for real backend routes when ready.
 */
export const aiApi = {
  async listAgents(): Promise<AiAgent[]> {
    try {
      return await apiClient<AiAgent[]>('/agents')
    } catch {
      return MOCK_AGENTS
    }
  },

  getAgentById(agentId: string): AiAgent | undefined {
    return MOCK_AGENTS.find((agent) => agent.id === agentId)
  },

  async completeChat(
    request: ChatCompletionRequest,
  ): Promise<ChatCompletionResponse> {
    try {
      return await apiClient<ChatCompletionResponse>('/chat/completions', {
        method: 'POST',
        body: {
          ...request,
          model: request.model ?? env.aiDefaultModel,
          stream: request.stream ?? env.aiStreamingEnabled,
        },
      })
    } catch {
      return mockCompletion(request)
    }
  },
}

function mockCompletion(
  request: ChatCompletionRequest,
): ChatCompletionResponse {
  const lastUser = [...request.messages]
    .reverse()
    .find((message) => message.role === 'user')

  const agent = request.agentId
    ? MOCK_AGENTS.find((item) => item.id === request.agentId)
    : undefined

  const snippet = lastUser?.content ?? ''
  const agentLine = agent
    ? `${agent.name} (prompt ${agent.promptVersion}) — `
    : ''

  let body =
    'Ready when you are. Share destination, dates, or constraints to begin a mock trip plan.'

  if (lastUser) {
    switch (agent?.category) {
      case 'itinerary':
        body = `Itinerary (demo): I would route a trip around “${truncate(snippet)}”.`
        break
      case 'budget':
        body = `Budget (demo): I would break out costs for “${truncate(snippet)}”.`
        break
      case 'agenda':
        body = `Agenda (demo): I would map days for “${truncate(snippet)}”.`
        break
      case 'packing':
        body = `Packing (demo): I would list gear for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would assemble a brief from “${truncate(snippet)}”.`
        break
      default:
        body = `Acknowledged: “${truncate(snippet)}”. Connect \`/chat/completions\` to your AI gateway to replace this mock response.`
    }
  }

  const message: AiMessage = {
    id: createId(),
    role: 'assistant',
    content: `${agentLine}${body}`,
    createdAt: new Date().toISOString(),
    model: request.model ?? env.aiDefaultModel,
  }

  return {
    message,
    usage: {
      promptTokens: 24,
      completionTokens: 48,
      totalTokens: 72,
    },
  }
}

function truncate(value: string, max = 80) {
  const trimmed = value.trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max)}…`
}