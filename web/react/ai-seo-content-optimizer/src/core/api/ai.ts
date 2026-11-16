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
    id: 'agent_intent',
    name: 'Intent Mapper',
    description:
      'Maps search intent, SERP patterns, and audience questions to page angles.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'intent',
    promptVersion: '2026.03.2',
    tools: ['serp.scan', 'intent.cluster', 'query.map'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 39).toISOString(),
  },
  {
    id: 'agent_onpage',
    name: 'On-Page Advisor',
    description:
      'Recommends titles, meta, headings, and snippet-ready copy improvements.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'onpage',
    promptVersion: '2026.02.5',
    tools: ['meta.audit', 'heading.outline', 'snippet.fit'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 94).toISOString(),
  },
  {
    id: 'agent_outline',
    name: 'Outline Optimizer',
    description:
      'Restructures sections for scannability, depth, and topical coverage.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'outline',
    promptVersion: '2026.01.9',
    tools: ['section.balance', 'faq.suggest', 'toc.build'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
  },
  {
    id: 'agent_links',
    name: 'Link Strategist',
    description:
      'Suggests contextual internal links and anchor text for site architecture.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'links',
    promptVersion: '2026.03.0-rc2',
    tools: ['graph.suggest', 'anchor.variant', 'orphan.find'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'agent_seo',
    name: 'Content Composer',
    description:
      'Assembles intent, on-page, and structure notes into an optimization brief.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.3',
    tools: ['brief.merge', 'priority.rank', 'checklist.emit'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
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
    'Ready when you are. Paste a URL or draft copy to begin a mock optimization pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'intent':
        body = `Intent map (demo): I would cluster intent for “${truncate(snippet)}”.`
        break
      case 'onpage':
        body = `On-page (demo): I would audit titles and meta around “${truncate(snippet)}”.`
        break
      case 'outline':
        body = `Outline (demo): I would reshape sections for “${truncate(snippet)}”.`
        break
      case 'links':
        body = `Links (demo): I would suggest internal targets for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would build an optimization brief from “${truncate(snippet)}”.`
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