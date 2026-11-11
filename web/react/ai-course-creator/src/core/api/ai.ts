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
    id: 'agent_curriculum',
    name: 'Curriculum Architect',
    description:
      'Turns learning goals into module sequences, outcomes, and pacing guides.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'curriculum',
    promptVersion: '2026.03.1',
    tools: ['outcome.map', 'module.sequence', 'prerequisite.graph'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_syllabus',
    name: 'Syllabus Scaffolder',
    description:
      'Drafts week-by-week outlines, readings, and instructor notes from a topic brief.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'curriculum',
    promptVersion: '2026.02.4',
    tools: ['syllabus.generate', 'reading.list', 'calendar.weeks'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_lesson',
    name: 'Lesson Drafter',
    description:
      'Produces lesson flows with hooks, activities, and formative checks.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'lesson',
    promptVersion: '2026.01.8',
    tools: ['lesson.outline', 'activity.suggest', 'slide.notes'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_assessment',
    name: 'Assessment Blueprint',
    description:
      'Designs quizzes, projects, and item banks aligned to learning outcomes.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'assessment',
    promptVersion: '2026.03.0-rc1',
    tools: ['item.bank', 'blooms.align', 'variant.generate'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_rubric',
    name: 'Rubric Composer',
    description:
      'Builds criterion-based rubrics with performance levels and exemplar notes.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'rubric',
    promptVersion: '2025.12.2',
    tools: ['rubric.table', 'criterion.weight', 'exemplar.attach'],
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
    'Ready when you are. Describe your course topic or paste an outline to begin a mock authoring pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'curriculum':
        body = `Curriculum pass (demo): I would structure modules and outcomes from “${truncate(snippet)}”. Connect your gateway for production-ready scaffolding.`
        break
      case 'lesson':
        body = `Lesson draft (demo): I would outline activities and checks for “${truncate(snippet)}” with slide-ready notes.`
        break
      case 'assessment':
        body = `Assessment blueprint (demo): I would draft aligned items and project prompts for “${truncate(snippet)}”.`
        break
      case 'rubric':
        body = `Rubric draft (demo): I would generate criteria and performance levels for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Course review (demo): I would sanity-check scope and pacing around “${truncate(snippet)}”.`
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
