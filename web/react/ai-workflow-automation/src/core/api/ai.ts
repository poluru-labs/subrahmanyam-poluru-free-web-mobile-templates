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
    id: 'agent_graph',
    name: 'Graph Orchestrator',
    description:
      'Designs step graphs with branches, retries, and backoff policies.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'graph',
    promptVersion: '2026.03.8',
    tools: ['step.graph', 'retry.policy', 'branch.add'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 37).toISOString(),
  },
  {
    id: 'agent_human',
    name: 'Human Gatekeeper',
    description:
      'Places approval gates, escalations, and reviewer SLAs in flows.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'human',
    promptVersion: '2026.02.4',
    tools: ['gate.approve', 'escalate.rule', 'sla.warn'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 89).toISOString(),
  },
  {
    id: 'agent_webhook',
    name: 'Webhook Trigger',
    description:
      'Maps inbound events to workflow starts with signing and idempotency hints.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'webhook',
    promptVersion: '2026.01.0',
    tools: ['event.map', 'sign.verify', 'idempotent.key'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 201).toISOString(),
  },
  {
    id: 'agent_history',
    name: 'Run Historian',
    description:
      'Summarizes run history, diffs, and replay-safe checkpoints.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'history',
    promptVersion: '2026.03.0-rc8',
    tools: ['run.diff', 'replay.point', 'trace.summarize'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: 'agent_workflow',
    name: 'Workflow Composer',
    description:
      'Assembles graphs, gates, triggers, and history into a deploy brief.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.11',
    tools: ['brief.merge', 'env.promote', 'checklist.emit'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
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
    'Ready when you are. Describe a workflow goal or paste a step list to begin a mock automation pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'graph':
        body = `Graph (demo): I would wire steps for “${truncate(snippet)}”.`
        break
      case 'human':
        body = `Human gate (demo): I would add approvals for “${truncate(snippet)}”.`
        break
      case 'webhook':
        body = `Webhook (demo): I would map triggers for “${truncate(snippet)}”.`
        break
      case 'history':
        body = `History (demo): I would summarize runs for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would build a brief from “${truncate(snippet)}”.`
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