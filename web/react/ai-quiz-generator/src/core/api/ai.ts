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
    id: 'agent_formats',
    name: 'Question Format Mixer',
    description:
      'Blends MCQ, short answer, true/false, and matching from the same source.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'formats',
    promptVersion: '2026.03.1',
    tools: ['format.mix', 'distractor.gen', 'stem.clarify'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 46).toISOString(),
  },
  {
    id: 'agent_difficulty',
    name: 'Difficulty Calibrator',
    description:
      'Tunes Bloom levels and cognitive load with explicit difficulty targets.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'difficulty',
    promptVersion: '2026.02.4',
    tools: ['bloom.map', 'load.score', 'target.band'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 102).toISOString(),
  },
  {
    id: 'agent_answers',
    name: 'Answer Key & Rationale',
    description:
      'Produces keyed answers with teaching notes and misconception callouts.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'answers',
    promptVersion: '2026.01.8',
    tools: ['key.build', 'rationale.write', 'miscon.tag'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 255).toISOString(),
  },
  {
    id: 'agent_lms',
    name: 'LMS Exporter',
    description:
      'Maps quizzes to QTI, Canvas, and Moodle field shapes (mock export).',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'lms',
    promptVersion: '2026.03.0-rc1',
    tools: ['qti.pack', 'canvas.csv', 'moodle.xml'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 13).toISOString(),
  },
  {
    id: 'agent_quiz',
    name: 'Quiz Assembler',
    description:
      'Orders sections, sets point values, and adds instructor overview.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['section.order', 'points.set', 'overview.draft'],
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
    'Ready when you are. Paste notes, a PDF summary, or lesson goals to begin a mock quiz pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'formats':
        body = `Formats (demo): I would mix question types from “${truncate(snippet)}”.`
        break
      case 'difficulty':
        body = `Difficulty (demo): I would calibrate levels for content about “${truncate(snippet)}”.`
        break
      case 'answers':
        body = `Answer key (demo): I would draft keys and rationales for “${truncate(snippet)}”.`
        break
      case 'lms':
        body = `LMS export (demo): I would map a quiz from “${truncate(snippet)}” to export fields.`
        break
      case 'general':
        body = `Assembly (demo): I would structure a full quiz around “${truncate(snippet)}”.`
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