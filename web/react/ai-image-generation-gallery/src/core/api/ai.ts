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
    id: 'agent_prompt',
    name: 'Prompt Archivist',
    description:
      'Tracks prompt versions, seeds, and settings so every render stays reproducible.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'prompt',
    promptVersion: '2026.03.1',
    tools: ['prompt.version', 'seed.log', 'settings.snapshot'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_board',
    name: 'Board Curator',
    description:
      'Organizes generations into mood boards and production-ready collections.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'collection',
    promptVersion: '2026.02.4',
    tools: ['board.layout', 'asset.tag', 'collection.export'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_style',
    name: 'Style Preset Maker',
    description:
      'Builds LUT-like style packs from reference sets and negative prompts.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'style',
    promptVersion: '2026.01.8',
    tools: ['style.extract', 'preset.save', 'negative.suggest'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_approval',
    name: 'Approval Gate',
    description:
      'Routes assets through review lanes with policy checks and audit notes.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'approval',
    promptVersion: '2026.03.0-rc1',
    tools: ['review.queue', 'policy.scan', 'signoff.log'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_seed',
    name: 'Seed Explorer',
    description:
      'Suggests seed sweeps and aspect ratios for consistent character sheets.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['seed.grid', 'aspect.batch', 'variation.rank'],
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
    'Ready when you are. Describe a scene, style, or board goal to begin a mock studio pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'prompt':
        body = `Prompt log (demo): I would version prompts and seeds for “${truncate(snippet)}”. Connect your gateway for live generation.`
        break
      case 'collection':
        body = `Board pass (demo): I would group assets and tags for “${truncate(snippet)}” into a collection.`
        break
      case 'style':
        body = `Style pack (demo): I would distill presets from “${truncate(snippet)}” with suggested negatives.`
        break
      case 'approval':
        body = `Review lane (demo): I would queue “${truncate(snippet)}” with policy notes for sign-off.`
        break
      case 'general':
        body = `Seed sweep (demo): I would propose grids and aspects for “${truncate(snippet)}”.`
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
