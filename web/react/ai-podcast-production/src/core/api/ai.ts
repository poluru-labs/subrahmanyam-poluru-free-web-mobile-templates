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
    id: 'agent_outlines',
    name: 'Episode Outliner',
    description:
      'Structures segments, hooks, and pacing for interview or solo episodes.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'outlines',
    promptVersion: '2026.03.1',
    tools: ['beat.map', 'hook.draft', 'runtime.estimate'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
  },
  {
    id: 'agent_guest',
    name: 'Guest Brief Writer',
    description:
      'Prepares guest bios, talking points, and pre-interview questions.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'guest',
    promptVersion: '2026.02.4',
    tools: ['guest.research', 'question.bank', 'brief.pdf'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
  },
  {
    id: 'agent_shownotes',
    name: 'Show Notes & Chapters',
    description:
      'Drafts timestamps, chapter markers, and listener-friendly summaries.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'shownotes',
    promptVersion: '2026.01.8',
    tools: ['chapter.mark', 'quote.pull', 'links.curate'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 270).toISOString(),
  },
  {
    id: 'agent_seo',
    name: 'SEO Metadata',
    description:
      'Writes titles, descriptions, and tags tuned for podcast directories.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'seo',
    promptVersion: '2026.03.0-rc1',
    tools: ['title.ab', 'desc.trim', 'tag.suggest'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: 'agent_publish',
    name: 'Publish Packager',
    description:
      'Assembles publish-ready bundles: artwork cues, transcripts, and RSS fields.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['rss.field', 'artwork.brief', 'transcript.export'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
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
    'Ready when you are. Share a topic, guest, or rough transcript to begin a mock production pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'outlines':
        body = `Outline (demo): I would structure beats for “${truncate(snippet)}”.`
        break
      case 'guest':
        body = `Guest brief (demo): I would draft a prep doc around “${truncate(snippet)}”.`
        break
      case 'shownotes':
        body = `Show notes (demo): I would add chapters and summary for “${truncate(snippet)}”.`
        break
      case 'seo':
        body = `SEO (demo): I would propose title/description for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Publish pack (demo): I would bundle assets for “${truncate(snippet)}”.`
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