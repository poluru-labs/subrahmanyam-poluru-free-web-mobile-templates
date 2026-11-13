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
    id: 'agent_behavioral',
    name: 'Behavioral Drill',
    description:
      'Runs leadership and teamwork scenarios with follow-ups on impact and metrics.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'behavioral',
    promptVersion: '2026.03.1',
    tools: ['scenario.pick', 'followup.chain', 'metric.probe'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_technical',
    name: 'Technical Drill',
    description:
      'Facilitates coding, system design, and whiteboard prompts with hint ladders.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'technical',
    promptVersion: '2026.02.4',
    tools: ['prompt.bank', 'hint.ladder', 'complexity.check'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_star',
    name: 'STAR Coach',
    description:
      'Scores answers on situation, task, action, and result with rewrite suggestions.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'star',
    promptVersion: '2026.01.8',
    tools: ['star.score', 'clarity.flag', 'rewrite.suggest'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_recap',
    name: 'Session Summarizer',
    description:
      'Turns practice transcripts into strengths, gaps, and tomorrow’s drill plan.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'recap',
    promptVersion: '2026.03.0-rc1',
    tools: ['transcript.parse', 'gap.list', 'drill.plan'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_company',
    name: 'Company Pack',
    description:
      'Loads role-specific rubrics, values, and question banks for target employers.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'company',
    promptVersion: '2025.12.2',
    tools: ['pack.load', 'values.map', 'rubric.align'],
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
    'Ready when you are. Share a role, company, or practice answer to begin a mock coaching pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'behavioral':
        body = `Behavioral drill (demo): I would run follow-ups on “${truncate(snippet)}” for impact and ownership. Connect your gateway for live scoring.`
        break
      case 'technical':
        body = `Technical drill (demo): I would probe depth and hints for “${truncate(snippet)}”.`
        break
      case 'star':
        body = `STAR feedback (demo): I would score structure in “${truncate(snippet)}” and suggest a tighter result line.`
        break
      case 'recap':
        body = `Session recap (demo): I would summarize strengths and gaps from “${truncate(snippet)}”.`
        break
      case 'company':
        body = `Company pack (demo): I would align rubric and values for “${truncate(snippet)}”.`
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
