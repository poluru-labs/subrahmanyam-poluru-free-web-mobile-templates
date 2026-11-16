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
    id: 'agent_rewrite',
    name: 'JD Tailor',
    description:
      'Aligns experience bullets and summary language to a target job description.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'rewrite',
    promptVersion: '2026.03.1',
    tools: ['jd.parse', 'keyword.map', 'tone.match'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 47).toISOString(),
  },
  {
    id: 'agent_bullets',
    name: 'Impact Bullet Scorer',
    description:
      'Rates bullets for metrics, action verbs, and relevance; suggests upgrades.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'bullets',
    promptVersion: '2026.02.4',
    tools: ['bullet.score', 'metric.suggest', 'verb.strong'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 101).toISOString(),
  },
  {
    id: 'agent_cover',
    name: 'Cover Letter Studio',
    description:
      'Drafts role-specific cover letters with variant tones and lengths.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'cover',
    promptVersion: '2026.01.8',
    tools: ['letter.draft', 'tone.variant', 'hook.open'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 258).toISOString(),
  },
  {
    id: 'agent_layout',
    name: 'Layout Exporter',
    description:
      'Prepares ATS-friendly sections and export-ready single-page layouts.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'layout',
    promptVersion: '2026.03.0-rc1',
    tools: ['ats.check', 'page.fit', 'section.order'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 13).toISOString(),
  },
  {
    id: 'agent_resume',
    name: 'Resume Composer',
    description:
      'Assembles headline, experience blocks, and skills for a cohesive draft.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['draft.merge', 'skill.cluster', 'gap.fill'],
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
    'Ready when you are. Paste a job description or resume draft to begin a mock tailoring pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'rewrite':
        body = `JD tailor (demo): I would align content to “${truncate(snippet)}”.`
        break
      case 'bullets':
        body = `Bullet score (demo): I would rate impacts in “${truncate(snippet)}”.`
        break
      case 'cover':
        body = `Cover letter (demo): I would draft a letter for “${truncate(snippet)}”.`
        break
      case 'layout':
        body = `Layout (demo): I would shape export sections from “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would assemble a resume around “${truncate(snippet)}”.`
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