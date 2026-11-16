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
    id: 'agent_narrative',
    name: 'Narrative Architect',
    description:
      'Shapes story arcs, act breaks, and slide-level headlines for your topic.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'narrative',
    promptVersion: '2026.03.1',
    tools: ['arc.map', 'headline.draft', 'proof.list'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
  },
  {
    id: 'agent_notes',
    name: 'Speaker Notes',
    description:
      'Drafts presenter notes with cues, emphasis, and timeboxed delivery tips.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'notes',
    promptVersion: '2026.02.4',
    tools: ['note.expand', 'cue.insert', 'time.box'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 105).toISOString(),
  },
  {
    id: 'agent_pacing',
    name: 'Section Pacing',
    description:
      'Balances depth across sections and flags overrun for long decks.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'pacing',
    promptVersion: '2026.01.8',
    tools: ['slide.budget', 'depth.warn', 'transition.suggest'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 250).toISOString(),
  },
  {
    id: 'agent_brand',
    name: 'Brand Slide Kit',
    description:
      'Applies brand voice, layout tokens, and reusable slide patterns.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'brand',
    promptVersion: '2026.03.0-rc1',
    tools: ['kit.apply', 'token.check', 'layout.grid'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 16).toISOString(),
  },
  {
    id: 'agent_deck',
    name: 'Deck Assembler',
    description:
      'Orders sections, exports slide summaries, and prepends executive overview.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['deck.order', 'exec.prep', 'export.outline'],
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
    'Ready when you are. Describe your audience, topic, or rough outline to begin a mock deck pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'narrative':
        body = `Narrative (demo): I would outline story beats for “${truncate(snippet)}”.`
        break
      case 'notes':
        body = `Speaker notes (demo): I would draft presenter notes for slides about “${truncate(snippet)}”.`
        break
      case 'pacing':
        body = `Pacing (demo): I would balance section depth around “${truncate(snippet)}”.`
        break
      case 'brand':
        body = `Brand kit (demo): I would align slide patterns with “${truncate(snippet)}” and your kit.`
        break
      case 'general':
        body = `Deck assembly (demo): I would order sections for “${truncate(snippet)}”.`
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