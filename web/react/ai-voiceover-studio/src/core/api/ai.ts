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
    id: 'agent_timing',
    name: 'Timing Director',
    description:
      'Marks script pacing, pause lengths, and read-time estimates for booth sessions.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'timing',
    promptVersion: '2026.03.7',
    tools: ['pace.mark', 'pause.sec', 'wpm.estimate'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 43).toISOString(),
  },
  {
    id: 'agent_emphasis',
    name: 'Emphasis Coach',
    description:
      'Highlights words to stress, soften, or lift for clarity and brand voice.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'emphasis',
    promptVersion: '2026.02.1',
    tools: ['stress.word', 'tone.lift', 'brand.voice'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 93).toISOString(),
  },
  {
    id: 'agent_takes',
    name: 'Take Logger',
    description:
      'Structures take notes, pick directions, and flag lines needing pickups.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'takes',
    promptVersion: '2026.01.1',
    tools: ['take.log', 'pick.best', 'pickup.flag'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 207).toISOString(),
  },
  {
    id: 'agent_pronounce',
    name: 'Pronunciation Guide',
    description:
      'Builds glossaries for names, acronyms, and locale-specific phonetics.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'pronunciation',
    promptVersion: '2026.03.0-rc7',
    tools: ['ipa.hint', 'glossary.add', 'locale.pick'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 16).toISOString(),
  },
  {
    id: 'agent_voice',
    name: 'Studio Composer',
    description:
      'Combines timing, emphasis, takes, and glossaries into a session brief.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.10',
    tools: ['brief.merge', 'session.pack', 'export.notes'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
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
    'Ready when you are. Paste a script or line to begin a mock voiceover pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'timing':
        body = `Timing (demo): I would mark pacing for “${truncate(snippet)}”.`
        break
      case 'emphasis':
        body = `Emphasis (demo): I would stress words in “${truncate(snippet)}”.`
        break
      case 'takes':
        body = `Takes (demo): I would log notes for “${truncate(snippet)}”.`
        break
      case 'pronunciation':
        body = `Pronunciation (demo): I would gloss terms in “${truncate(snippet)}”.`
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