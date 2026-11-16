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
    id: 'agent_explain',
    name: 'Concept Guide',
    description:
      'Explains topics with analogies, worked examples, and check-for-understanding prompts.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'explain',
    promptVersion: '2026.03.2',
    tools: ['concept.map', 'analogy.pick', 'quiz.micro'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
  },
  {
    id: 'agent_spaced',
    name: 'Repetition Coach',
    description:
      'Schedules spaced-repetition intervals and card prompts from your notes.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'spaced',
    promptVersion: '2026.02.8',
    tools: ['sr.interval', 'card.draft', 'deck.tag'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 102).toISOString(),
  },
  {
    id: 'agent_planner',
    name: 'Session Planner',
    description:
      'Builds focused study blocks with breaks, goals, and time-boxed milestones.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'planner',
    promptVersion: '2026.01.5',
    tools: ['block.plan', 'pomodoro.fit', 'goal.split'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 198).toISOString(),
  },
  {
    id: 'agent_weakarea',
    name: 'Weak-Spot Finder',
    description:
      'Surfaces weak areas from quiz misses, rubric gaps, and topic coverage.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'weakarea',
    promptVersion: '2026.03.0-rc2',
    tools: ['gap.detect', 'topic.rank', 'remedial.plan'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 17).toISOString(),
  },
  {
    id: 'agent_study',
    name: 'Study Composer',
    description:
      'Combines explanations, repetition, and plans into a weekly mastery roadmap.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.6',
    tools: ['roadmap.merge', 'streak.track', 'review.pack'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
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
    'Ready when you are. Share a topic or assignment to begin a mock study session.'

  if (lastUser) {
    switch (agent?.category) {
      case 'explain':
        body = `Explain (demo): I would break down “${truncate(snippet)}”.`
        break
      case 'spaced':
        body = `Spaced rep (demo): I would schedule cards for “${truncate(snippet)}”.`
        break
      case 'planner':
        body = `Planner (demo): I would time-box study for “${truncate(snippet)}”.`
        break
      case 'weakarea':
        body = `Weak area (demo): I would flag gaps in “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would draft a roadmap from “${truncate(snippet)}”.`
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