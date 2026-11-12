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
    id: 'agent_tone',
    name: 'Tone Drafter',
    description:
      'Writes replies that match your voice profile, signatures, and formality rules.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'tone',
    promptVersion: '2026.03.1',
    tools: ['voice.profile', 'draft.reply', 'signature.insert'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_summary',
    name: 'Thread Summarizer',
    description:
      'Condenses long threads into decisions, open questions, and next owners.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'summary',
    promptVersion: '2026.02.4',
    tools: ['thread.parse', 'decision.extract', 'bullets.out'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_triage',
    name: 'Inbox Triage',
    description:
      'Scores urgency, suggests labels, and routes messages to the right queue.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'triage',
    promptVersion: '2026.01.8',
    tools: ['priority.score', 'label.suggest', 'queue.route'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_followup',
    name: 'Follow-up Coach',
    description:
      'Proposes nudges, deadlines, and polite bump language for waiting threads.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'followup',
    promptVersion: '2026.03.0-rc1',
    tools: ['nudge.draft', 'deadline.suggest', 'calendar.hold'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_templates',
    name: 'Template Librarian',
    description:
      'Finds the best macro or snippet for a scenario and personalizes merge fields.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['snippet.match', 'field.merge', 'macro.version'],
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
    'Ready when you are. Paste a thread excerpt or describe the email you need to begin a mock compose pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'tone':
        body = `Draft (demo): I would write a tone-matched reply for “${truncate(snippet)}” using your voice profile. Connect your gateway for send-ready output.`
        break
      case 'summary':
        body = `Summary (demo): I would extract decisions and open items from “${truncate(snippet)}”.`
        break
      case 'triage':
        body = `Triage (demo): I would score priority and suggest labels for “${truncate(snippet)}”.`
        break
      case 'followup':
        body = `Follow-up (demo): I would draft a nudge for “${truncate(snippet)}” with a suggested send date.`
        break
      case 'general':
        body = `Template (demo): I would match snippets and merge fields for “${truncate(snippet)}”.`
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
