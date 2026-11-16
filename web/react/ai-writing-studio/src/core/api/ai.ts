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
    id: 'agent_outline',
    name: 'Outline Architect',
    description:
      'Builds chapter outlines and beat sheets for long-form narratives.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'outline',
    promptVersion: '2026.03.1',
    tools: ['outline.tree', 'beat.sheet', 'arc.map'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_draft',
    name: 'Draft Composer',
    description:
      'Expands outlines into prose with scene goals and pacing notes.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'draft',
    promptVersion: '2026.02.5',
    tools: ['draft.expand', 'scene.goal', 'pacing.hint'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 98).toISOString(),
  },
  {
    id: 'agent_tone',
    name: 'Tone Stylist',
    description:
      'Applies tone and style presets while preserving author voice.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'tone',
    promptVersion: '2026.01.4',
    tools: ['preset.apply', 'voice.lock', 'register.shift'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 216).toISOString(),
  },
  {
    id: 'agent_rewrite',
    name: 'Inline Rewriter',
    description:
      'Suggests tighter sentences, clearer transitions, and line-level fixes.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'rewrite',
    promptVersion: '2026.03.0-rc2',
    tools: ['line.suggest', 'clarity.lift', 'transition.fix'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 19).toISOString(),
  },
  {
    id: 'agent_studio',
    name: 'Revision Historian',
    description:
      'Tracks chapter versions and assembles revise-loop checklists.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.3',
    tools: ['version.diff', 'chapter.tag', 'revise.loop'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString(),
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
    'Ready when you are. Share a premise or draft passage to begin a mock writing pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'outline':
        body = `Outline (demo): I would structure chapters for “${truncate(snippet)}”.`
        break
      case 'draft':
        body = `Draft (demo): I would expand prose for “${truncate(snippet)}”.`
        break
      case 'tone':
        body = `Tone (demo): I would restyle voice for “${truncate(snippet)}”.`
        break
      case 'rewrite':
        body = `Rewrite (demo): I would refine lines in “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Revisions (demo): I would track versions of “${truncate(snippet)}”.`
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