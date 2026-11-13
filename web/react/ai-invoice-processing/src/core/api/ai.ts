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
    id: 'agent_extract',
    name: 'Field Extractor',
    description:
      'Pulls line items, tax, PO numbers, and due dates from PDF and email invoices.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'extract',
    promptVersion: '2026.03.1',
    tools: ['ocr.parse', 'field.map', 'confidence.score'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_validate',
    name: 'Total Validator',
    description:
      'Reconciles subtotals, tax math, and currency against tolerance rules.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'validate',
    promptVersion: '2026.02.4',
    tools: ['math.check', 'fx.convert', 'tolerance.apply'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_vendor',
    name: 'Vendor Matcher',
    description:
      'Links invoices to vendor master records and flags duplicate submissions.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'vendor',
    promptVersion: '2026.01.8',
    tools: ['vendor.fuzzy', 'dup.detect', 'bank.verify'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_approval',
    name: 'Approval Router',
    description:
      'Applies spend policies and routes invoices to the right approver chain.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'approval',
    promptVersion: '2026.03.0-rc1',
    tools: ['policy.match', 'approver.chain', 'sla.warn'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_exception',
    name: 'Exception Handler',
    description:
      'Explains rejects, gathers missing fields, and drafts vendor clarification emails.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['exception.classify', 'field.request', 'email.draft'],
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
    'Ready when you are. Paste invoice text or describe an AP exception to begin a mock processing pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'extract':
        body = `Extraction (demo): I would map fields from “${truncate(snippet)}” with confidence scores. Connect your gateway for OCR-backed output.`
        break
      case 'validate':
        body = `Validation (demo): I would check totals and tax math for “${truncate(snippet)}” against tolerances.`
        break
      case 'vendor':
        body = `Vendor match (demo): I would link “${truncate(snippet)}” to master data and scan for duplicates.`
        break
      case 'approval':
        body = `Routing (demo): I would apply policy and approvers for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Exception (demo): I would classify the issue in “${truncate(snippet)}” and draft a vendor note.`
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
