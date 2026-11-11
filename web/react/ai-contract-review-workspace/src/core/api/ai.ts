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
    id: 'agent_clause_risk',
    name: 'Clause Risk Scorer',
    description:
      'Flags indemnity, limitation of liability, and termination language against your risk rubric.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'risk',
    promptVersion: '2026.03.1',
    tools: ['clause.segment', 'risk.score', 'citation.link'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_obligations',
    name: 'Obligation Extractor',
    description:
      'Pulls notice periods, payment terms, SLAs, and renewal windows into a task table.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'obligations',
    promptVersion: '2026.02.4',
    tools: ['obligation.extract', 'calendar.ics', 'owner.assign'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_playbook',
    name: 'Playbook Comparator',
    description:
      'Diffs vendor paper against your fallback positions and preferred language.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'playbook',
    promptVersion: '2026.01.8',
    tools: ['playbook.match', 'diff.side_by_side', 'comment.export'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_redline',
    name: 'Redline Composer',
    description:
      'Drafts markup suggestions with rationale tied to playbook clause IDs.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'redline',
    promptVersion: '2026.03.0-rc1',
    tools: ['redline.suggest', 'track.changes', 'rationale.attach'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_msa',
    name: 'MSA Sentinel',
    description:
      'Watches master agreements for conflicting order-form terms and change-of-control triggers.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['msa.graph', 'order_form.link', 'alert.queue'],
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
    'Ready when you are. Paste a clause or describe the agreement to begin a mock review pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'risk':
        body = `Risk scan (demo): I would score indemnity and liability caps in your excerpt. Highlight: “${truncate(snippet)}”. Connect your gateway for calibrated scores.`
        break
      case 'obligations':
        body = `Obligation pass (demo): I would extract notice, payment, and renewal duties from “${truncate(snippet)}” into your obligations board.`
        break
      case 'playbook':
        body = `Playbook diff (demo): I would compare “${truncate(snippet)}” to your standard positions and flag deviations with clause IDs.`
        break
      case 'redline':
        body = `Redline draft (demo): I would propose fallback language for “${truncate(snippet)}” with tracked-change markup.`
        break
      case 'general':
        body = `MSA review (demo): I would check order-form conflicts and change-of-control language around “${truncate(snippet)}”.`
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
