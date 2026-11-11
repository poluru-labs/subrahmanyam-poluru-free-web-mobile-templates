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
    id: 'agent_kb',
    name: 'KB Grounding',
    description:
      'Pulls approved articles and snippets to draft replies with citation links.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'kb',
    promptVersion: '2026.03.1',
    tools: ['kb.search', 'article.cite', 'answer.ground'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_macro',
    name: 'Macro Suggester',
    description:
      'Recommends macros and merge fields from ticket context and customer tier.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'macro',
    promptVersion: '2026.02.4',
    tools: ['macro.match', 'field.merge', 'tone.adjust'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_sentiment',
    name: 'Sentiment Scout',
    description:
      'Surfaces tone, frustration signals, and coaching tips before you send.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'sentiment',
    promptVersion: '2026.01.8',
    tools: ['sentiment.score', 'churn.flag', 'coach.hint'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_escalation',
    name: 'Escalation Playbook',
    description:
      'Maps severity to on-call paths, SLA breach risk, and handoff summaries.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'escalation',
    promptVersion: '2026.03.0-rc1',
    tools: ['severity.map', 'sla.check', 'handoff.summary'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_triage',
    name: 'Queue Triage',
    description:
      'Classifies inbound threads, suggests priority, and tags product areas.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['queue.classify', 'tag.product', 'priority.score'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
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
    'Ready when you are. Paste a customer message or ticket summary to begin a mock assist pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'kb':
        body = `KB reply (demo): I would ground an answer in approved articles for “${truncate(snippet)}” with citations. Connect your gateway for live retrieval.`
        break
      case 'macro':
        body = `Macro pass (demo): I would suggest macros and merge fields for “${truncate(snippet)}” aligned to your playbook.`
        break
      case 'sentiment':
        body = `Sentiment check (demo): I would score tone and flag frustration in “${truncate(snippet)}” with coaching hints.`
        break
      case 'escalation':
        body = `Escalation brief (demo): I would map severity and handoff steps for “${truncate(snippet)}” against your SLA matrix.`
        break
      case 'general':
        body = `Triage (demo): I would classify priority and product tags for “${truncate(snippet)}”.`
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
