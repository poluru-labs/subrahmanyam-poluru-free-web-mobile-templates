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
    id: 'agent_messaging',
    name: 'Messaging Architect',
    description:
      'Builds positioning pillars, value props, and tone ladders for a launch.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'messaging',
    promptVersion: '2026.03.1',
    tools: ['pillar.map', 'tone.ladder', 'proof.hook'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_brief',
    name: 'Brief Composer',
    description:
      'Drafts creative briefs with objectives, mandatories, and deliverable specs.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'brief',
    promptVersion: '2026.02.4',
    tools: ['brief.outline', 'mandatory.list', 'kpi.bind'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_persona',
    name: 'Persona Builder',
    description:
      'Synthesizes ICP segments, jobs-to-be-done, and objection maps.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'persona',
    promptVersion: '2026.01.8',
    tools: ['segment.slice', 'jtbd.map', 'objection.bank'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_channel',
    name: 'Channel Planner',
    description:
      'Allocates budget tiers across paid, owned, and earned with flighting notes.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'channel',
    promptVersion: '2026.03.0-rc1',
    tools: ['mix.suggest', 'flight.calendar', 'utm.pattern'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_campaign',
    name: 'Campaign Orchestrator',
    description:
      'Sequences milestones, approvals, and asset dependencies for launch week.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['milestone.track', 'asset.dep', 'approval.route'],
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
    'Ready when you are. Describe a product, audience, or launch goal to begin a mock campaign pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'messaging':
        body = `Messaging (demo): I would draft pillars and tone for “${truncate(snippet)}”. Connect your gateway for production copy.`
        break
      case 'brief':
        body = `Brief (demo): I would structure objectives and mandatories for “${truncate(snippet)}”.`
        break
      case 'persona':
        body = `Persona (demo): I would build segments and JTBD from “${truncate(snippet)}”.`
        break
      case 'channel':
        body = `Channel plan (demo): I would suggest mix and flighting for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Orchestration (demo): I would sequence milestones around “${truncate(snippet)}”.`
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
