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
    id: 'agent_compare',
    name: 'Multi-Model Compare',
    description:
      'Runs the same prompt in parallel panes across models for quick visual diff.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'compare',
    promptVersion: '2026.03.1',
    tools: ['pane.split', 'diff.highlight', 'model.pick'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
  },
  {
    id: 'agent_sweep',
    name: 'Parameter Sweeper',
    description:
      'Grids temperature, top-p, and max tokens to map response behavior.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'sweep',
    promptVersion: '2026.02.4',
    tools: ['param.grid', 'sample.run', 'chart.heat'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 98).toISOString(),
  },
  {
    id: 'agent_version',
    name: 'Prompt Versioner',
    description:
      'Tracks prompt revisions, labels changes, and rolls back safely.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'version',
    promptVersion: '2026.01.8',
    tools: ['prompt.diff', 'tag.release', 'rollback.snap'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 265).toISOString(),
  },
  {
    id: 'agent_share',
    name: 'Share Link Builder',
    description:
      'Packages experiments into shareable links with redacted secrets.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'share',
    promptVersion: '2026.03.0-rc1',
    tools: ['link.pack', 'secret.redact', 'expiry.set'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
  },
  {
    id: 'agent_lab',
    name: 'Experiment Lab',
    description:
      'Bundles notes, winners, and next hypotheses from playground sessions.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['session.log', 'winner.tag', 'hypothesis.queue'],
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
    'Ready when you are. Paste a prompt or describe parameters to begin a mock experiment pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'compare':
        body = `Compare (demo): I would run panes for “${truncate(snippet)}” across models.`
        break
      case 'sweep':
        body = `Parameter sweep (demo): I would grid settings for “${truncate(snippet)}”.`
        break
      case 'version':
        body = `Versioning (demo): I would snapshot prompt changes around “${truncate(snippet)}”.`
        break
      case 'share':
        body = `Share link (demo): I would package “${truncate(snippet)}” into a redacted link.`
        break
      case 'general':
        body = `Lab notes (demo): I would log experiment context for “${truncate(snippet)}”.`
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