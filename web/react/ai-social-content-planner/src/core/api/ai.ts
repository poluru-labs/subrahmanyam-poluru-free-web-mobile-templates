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
    id: 'agent_calendar',
    name: 'Calendar Board',
    description:
      'Builds posting calendars with themes, slots, and cross-channel cadence.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'calendar',
    promptVersion: '2026.03.1',
    tools: ['slot.plan', 'theme.week', 'cadence.fit'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
  },
  {
    id: 'agent_captions',
    name: 'Caption Studio',
    description:
      'Drafts caption variants with hooks, CTAs, and length tuned per network.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'captions',
    promptVersion: '2026.02.6',
    tools: ['caption.variant', 'hook.test', 'cta.insert'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 88).toISOString(),
  },
  {
    id: 'agent_hashtags',
    name: 'Hashtag Curator',
    description:
      'Suggests hashtag sets by reach, niche, and brand safety constraints.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'hashtags',
    promptVersion: '2026.01.7',
    tools: ['tag.cluster', 'reach.estimate', 'blocklist.check'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 205).toISOString(),
  },
  {
    id: 'agent_tone',
    name: 'Tone Adapter',
    description:
      'Rewrites copy for channel-specific voice—LinkedIn, X, Instagram, and more.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'tone',
    promptVersion: '2026.03.0-rc1',
    tools: ['voice.map', 'emoji.trim', 'formality.shift'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 21).toISOString(),
  },
  {
    id: 'agent_campaign',
    name: 'Campaign Composer',
    description:
      'Assembles calendar, captions, and tags into a unified campaign brief.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.4',
    tools: ['brief.merge', 'asset.link', 'review.pack'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
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
    'Ready when you are. Share a campaign goal or post idea to begin a mock planning pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'calendar':
        body = `Calendar (demo): I would slot posts around “${truncate(snippet)}”.`
        break
      case 'captions':
        body = `Captions (demo): I would draft variants for “${truncate(snippet)}”.`
        break
      case 'hashtags':
        body = `Hashtags (demo): I would curate tags for “${truncate(snippet)}”.`
        break
      case 'tone':
        body = `Tone (demo): I would adapt voice for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would build a brief from “${truncate(snippet)}”.`
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