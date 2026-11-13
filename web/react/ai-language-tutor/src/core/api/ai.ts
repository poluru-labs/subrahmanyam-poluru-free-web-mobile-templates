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
    id: 'agent_dialogue',
    name: 'Dialogue Partner',
    description:
      'Leads level-aware roleplays with scaffolding for A1–C1 learners.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'dialogue',
    promptVersion: '2026.03.1',
    tools: ['level.gate', 'roleplay.scene', 'hint.ladder'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_correction',
    name: 'Correction Coach',
    description:
      'Flags grammar and word-choice issues with inline rewrites and explanations.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'correction',
    promptVersion: '2026.02.4',
    tools: ['grammar.flag', 'rewrite.inline', 'rule.cite'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_vocab',
    name: 'Vocab Builder',
    description:
      'Turns chat excerpts into spaced-review decks with example sentences.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'vocabulary',
    promptVersion: '2026.01.8',
    tools: ['deck.add', 'example.pair', 'srs.schedule'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_pronunciation',
    name: 'Pronunciation Guide',
    description:
      'Breaks down stress, liaison, and phoneme drills from learner phrases.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'pronunciation',
    promptVersion: '2026.03.0-rc1',
    tools: ['ipa.breakdown', 'stress.mark', 'minimal.pair'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_review',
    name: 'Review Scheduler',
    description:
      'Plans daily micro-lessons from weak spots and streak goals.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['weak.spot', 'streak.plan', 'reminder.nudge'],
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
    'Ready when you are. Say something in your target language or ask for a topic to begin a mock lesson.'

  if (lastUser) {
    switch (agent?.category) {
      case 'dialogue':
        body = `Dialogue (demo): I would continue a level-matched roleplay from “${truncate(snippet)}”. Connect your gateway for live tutoring.`
        break
      case 'correction':
        body = `Correction (demo): I would annotate grammar in “${truncate(snippet)}” with a cleaner rewrite.`
        break
      case 'vocabulary':
        body = `Vocab (demo): I would add cards and examples from “${truncate(snippet)}” to your deck.`
        break
      case 'pronunciation':
        body = `Pronunciation (demo): I would break down sounds in “${truncate(snippet)}” with stress marks.`
        break
      case 'general':
        body = `Review plan (demo): I would schedule practice around “${truncate(snippet)}” based on your streak.`
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
