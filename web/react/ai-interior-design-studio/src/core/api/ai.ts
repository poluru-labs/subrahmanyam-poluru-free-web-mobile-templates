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
    id: 'agent_brief',
    name: 'Brief Intake',
    description:
      'Turns client notes into structured room goals, constraints, and style keywords.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'brief',
    promptVersion: '2026.03.1',
    tools: ['brief.parse', 'constraint.list', 'style.extract'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_mood',
    name: 'Moodboard Composer',
    description:
      'Assembles palettes, textures, and reference boards aligned to the brief.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'moodboard',
    promptVersion: '2026.02.4',
    tools: ['palette.suggest', 'texture.board', 'ref.gather'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_layout',
    name: 'Layout Planner',
    description:
      'Proposes furniture arrangements, traffic flow, and focal-point options.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'layout',
    promptVersion: '2026.01.8',
    tools: ['floorplan.hint', 'traffic.flow', 'focal.rank'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_shopping',
    name: 'Shopping List Builder',
    description:
      'Maps selections to SKUs, budgets, and vendor links with alternates.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'shopping',
    promptVersion: '2026.03.0-rc1',
    tools: ['sku.match', 'budget.cap', 'vendor.link'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_stylist',
    name: 'Room Stylist',
    description:
      'Balances scale, lighting, and accessory layers for photo-ready rooms.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['scale.check', 'light.layer', 'accent.place'],
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
    'Ready when you are. Describe a room, style, or budget to begin a mock design pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'brief':
        body = `Brief intake (demo): I would structure goals and constraints from “${truncate(snippet)}”. Connect your gateway for client-ready briefs.`
        break
      case 'moodboard':
        body = `Moodboard (demo): I would propose palettes and textures for “${truncate(snippet)}”.`
        break
      case 'layout':
        body = `Layout (demo): I would suggest furniture flow and focal points for “${truncate(snippet)}”.`
        break
      case 'shopping':
        body = `Shopping list (demo): I would map items and budgets for “${truncate(snippet)}” with vendor links.`
        break
      case 'general':
        body = `Styling pass (demo): I would tune scale and lighting around “${truncate(snippet)}”.`
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
