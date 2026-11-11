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
    id: 'agent_query',
    name: 'Query Translator',
    description:
      'Turns natural-language questions into SQL or dataframe steps with guardrails.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'query',
    promptVersion: '2026.03.1',
    tools: ['nl2sql.draft', 'schema.introspect', 'query.lint'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_chart',
    name: 'Viz Recommender',
    description:
      'Suggests chart types, encodings, and faceting for the shape of your data.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'chart',
    promptVersion: '2026.02.4',
    tools: ['chart.suggest', 'encoding.map', 'vega.preview'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_insight',
    name: 'Insight Narrator',
    description:
      'Writes executive summaries, anomalies, and caveats from result sets.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'insight',
    promptVersion: '2026.01.8',
    tools: ['stats.summarize', 'anomaly.flag', 'narrative.export'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_notebook',
    name: 'Notebook Scribe',
    description:
      'Captures reproducible notebook cells with parameters, deps, and run metadata.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'notebook',
    promptVersion: '2026.03.0-rc1',
    tools: ['cell.generate', 'kernel.pin', 'run.manifest'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_schema',
    name: 'Schema Explorer',
    description:
      'Explains tables, joins, and data quality signals before you query.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['catalog.browse', 'join.hint', 'quality.score'],
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
    'Ready when you are. Describe a dataset or ask an analysis question to begin a mock workbench pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'query':
        body = `Query assist (demo): I would draft SQL or dataframe steps for “${truncate(snippet)}” with schema-aware linting. Connect your gateway for execution.`
        break
      case 'chart':
        body = `Viz pass (demo): I would recommend encodings and chart types for “${truncate(snippet)}” given typical cardinality patterns.`
        break
      case 'insight':
        body = `Insight draft (demo): I would summarize trends and caveats from results related to “${truncate(snippet)}”.`
        break
      case 'notebook':
        body = `Notebook cell (demo): I would capture reproducible steps for “${truncate(snippet)}” with pinned kernel metadata.`
        break
      case 'general':
        body = `Schema tour (demo): I would explain relevant tables and joins for “${truncate(snippet)}”.`
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
