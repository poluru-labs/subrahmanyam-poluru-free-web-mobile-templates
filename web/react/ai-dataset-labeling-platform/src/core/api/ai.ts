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
    id: 'agent_suggest',
    name: 'Label Suggester',
    description:
      'Proposes class labels, spans, and confidence scores from few-shot examples.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'suggest',
    promptVersion: '2026.03.1',
    tools: ['label.propose', 'span.highlight', 'confidence.score'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_consensus',
    name: 'Consensus Arbiter',
    description:
      'Merges annotator disagreements with guidelines and majority rules.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'consensus',
    promptVersion: '2026.02.4',
    tools: ['vote.merge', 'guideline.cite', 'tiebreak.explain'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_qa',
    name: 'QA Sampler',
    description:
      'Picks audit batches, flags drift, and drafts reviewer feedback.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'qa',
    promptVersion: '2026.01.8',
    tools: ['sample.queue', 'drift.detect', 'review.note'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_export',
    name: 'Schema Exporter',
    description:
      'Maps labels to JSONL, COCO, or custom export schemas with validation.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'export',
    promptVersion: '2026.03.0-rc1',
    tools: ['schema.map', 'export.validate', 'manifest.hash'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_batch',
    name: 'Batch Orchestrator',
    description:
      'Sequences labeling waves, assignee routing, and SLA reminders.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['batch.schedule', 'assignee.route', 'sla.nudge'],
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
    'Ready when you are. Paste a sample row, image caption, or labeling guideline to begin a mock assist pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'suggest':
        body = `Label suggest (demo): I would propose classes and spans for “${truncate(snippet)}” with confidence scores. Connect your gateway for live model assist.`
        break
      case 'consensus':
        body = `Consensus pass (demo): I would reconcile annotator labels on “${truncate(snippet)}” against your guideline doc.`
        break
      case 'qa':
        body = `QA sample (demo): I would queue “${truncate(snippet)}” for review and note likely drift patterns.`
        break
      case 'export':
        body = `Export map (demo): I would map labels for “${truncate(snippet)}” to your target schema with validation checks.`
        break
      case 'general':
        body = `Batch plan (demo): I would route and schedule work related to “${truncate(snippet)}”.`
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
