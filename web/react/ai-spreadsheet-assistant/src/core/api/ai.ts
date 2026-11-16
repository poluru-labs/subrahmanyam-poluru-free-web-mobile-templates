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
    id: 'agent_formulas',
    name: 'Formula Builder',
    description:
      'Generates Excel/Sheets formulas from plain-language goals and sample cells.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'formulas',
    promptVersion: '2026.03.3',
    tools: ['formula.gen', 'range.infer', 'locale.fn'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 36).toISOString(),
  },
  {
    id: 'agent_cleanup',
    name: 'Data Cleaner',
    description:
      'Suggests trims, dedupe steps, type fixes, and delimiter normalization.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'cleanup',
    promptVersion: '2026.02.7',
    tools: ['trim.plan', 'dedupe.key', 'type.cast'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 97).toISOString(),
  },
  {
    id: 'agent_pivot',
    name: 'Pivot Advisor',
    description:
      'Proposes pivot dimensions, aggregations, and slicer-friendly layouts.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'pivot',
    promptVersion: '2026.01.6',
    tools: ['pivot.suggest', 'agg.pick', 'slice.rank'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 212).toISOString(),
  },
  {
    id: 'agent_explain',
    name: 'Logic Explainer',
    description:
      'Translates nested formulas and linked ranges into plain-language steps.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'explain',
    promptVersion: '2026.03.0-rc3',
    tools: ['formula.parse', 'dep.trace', 'glossary.map'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_sheet',
    name: 'Sheet Composer',
    description:
      'Combines formulas, cleanup, and pivots into a workbook action plan.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.5',
    tools: ['plan.merge', 'sheet.order', 'checklist.emit'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 19).toISOString(),
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
    'Ready when you are. Paste a formula, range, or table snippet to begin a mock assist pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'formulas':
        body = `Formula (demo): I would build a formula for “${truncate(snippet)}”.`
        break
      case 'cleanup':
        body = `Cleanup (demo): I would normalize data in “${truncate(snippet)}”.`
        break
      case 'pivot':
        body = `Pivot (demo): I would suggest a pivot layout for “${truncate(snippet)}”.`
        break
      case 'explain':
        body = `Explain (demo): I would unpack logic in “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would draft a sheet plan from “${truncate(snippet)}”.`
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