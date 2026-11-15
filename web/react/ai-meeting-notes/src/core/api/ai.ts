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
    id: 'agent_summary',
    name: 'Live Summary Streamer',
    description:
      'Rolls up talking points in near real time for long working sessions.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'summary',
    promptVersion: '2026.03.1',
    tools: ['transcript.chunk', 'summary.stream', 'topic.tag'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: 'agent_actions',
    name: 'Action Item Extractor',
    description:
      'Pulls owners, due dates, and deliverables from messy meeting dialogue.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'actions',
    promptVersion: '2026.02.4',
    tools: ['action.parse', 'owner.assign', 'due.normalize'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
  },
  {
    id: 'agent_decisions',
    name: 'Decision Logger',
    description:
      'Captures what was decided, alternatives considered, and rationale.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'decisions',
    promptVersion: '2026.01.8',
    tools: ['decision.record', 'alt.compare', 'vote.note'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 280).toISOString(),
  },
  {
    id: 'agent_calendar',
    name: 'Calendar Sync Assistant',
    description:
      'Drafts follow-up invites and links notes to calendar events (mock hooks).',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'calendar',
    promptVersion: '2026.03.0-rc1',
    tools: ['event.link', 'invite.draft', 'timezone.align'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'agent_recap',
    name: 'Meeting Recap',
    description:
      'Produces end-of-meeting briefs with highlights and open threads.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['recap.compose', 'thread.flag', 'attendee.roll'],
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
    'Ready when you are. Paste notes or describe the meeting to begin a mock capture pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'summary':
        body = `Live summary (demo): I would stream key points from “${truncate(snippet)}”. Connect your gateway for real transcripts.`
        break
      case 'actions':
        body = `Action items (demo): I would extract tasks from “${truncate(snippet)}” with owners and dates.`
        break
      case 'decisions':
        body = `Decision log (demo): I would record decisions implied in “${truncate(snippet)}”.`
        break
      case 'calendar':
        body = `Calendar sync (demo): I would link follow-ups for “${truncate(snippet)}” to your calendar hooks.`
        break
      case 'general':
        body = `Recap (demo): I would draft a closing brief around “${truncate(snippet)}”.`
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