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
    id: 'agent_ocr',
    name: 'Receipt OCR',
    description:
      'Pulls merchant, totals, tax, and dates from photos or PDF scans.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'ocr',
    promptVersion: '2026.03.1',
    tools: ['ocr.parse', 'total.extract', 'line.item'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 43).toISOString(),
  },
  {
    id: 'agent_category',
    name: 'Category Suggester',
    description:
      'Proposes GL codes and spend categories from merchant and line items.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'category',
    promptVersion: '2026.02.4',
    tools: ['gl.map', 'rule.learn', 'policy.tag'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 99).toISOString(),
  },
  {
    id: 'agent_duplicate',
    name: 'Duplicate Spotter',
    description:
      'Flags likely duplicate receipts by amount, date, and merchant fuzzy match.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'duplicate',
    promptVersion: '2026.01.8',
    tools: ['dup.hash', 'fuzzy.match', 'merge.suggest'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 268).toISOString(),
  },
  {
    id: 'agent_export',
    name: 'Export Packager',
    description:
      'Builds CSV and PDF expense bundles ready for accountants.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'export',
    promptVersion: '2026.03.0-rc1',
    tools: ['csv.pack', 'pdf.bundle', 'period.filter'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'agent_summary',
    name: 'Spend Summarizer',
    description:
      'Rolls up monthly totals and highlights outliers by category.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['rollup.month', 'outlier.flag', 'trend.spark'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
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
    'Ready when you are. Describe a receipt or paste extracted text to begin a mock organize pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'ocr':
        body = `OCR (demo): I would extract fields from “${truncate(snippet)}”.`
        break
      case 'category':
        body = `Category (demo): I would suggest GL categories for “${truncate(snippet)}”.`
        break
      case 'duplicate':
        body = `Duplicates (demo): I would compare “${truncate(snippet)}” against your ledger.`
        break
      case 'export':
        body = `Export (demo): I would package rows from “${truncate(snippet)}” to CSV/PDF.`
        break
      case 'general':
        body = `Summary (demo): I would roll up spend context around “${truncate(snippet)}”.`
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