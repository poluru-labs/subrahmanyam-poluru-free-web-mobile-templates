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

const MOCK_AGENTS: AiAgent[] = [
  {
    id: 'agent_research',
    name: 'Research Analyst',
    description: 'Synthesizes documents, citations, and market briefs.',
    model: env.aiDefaultModel,
    status: 'active',
    tools: ['web.search', 'docs.retrieve', 'citations.format'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'agent_ops',
    name: 'Ops Copilot',
    description: 'Triages incidents and drafts runbook responses.',
    model: env.aiDefaultModel,
    status: 'active',
    tools: ['tickets.read', 'logs.query', 'runbooks.search'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'agent_policy',
    name: 'Policy Reviewer',
    description: 'Checks drafts against internal compliance policies.',
    model: env.aiDefaultModel,
    status: 'draft',
    tools: ['policy.match', 'risk.score'],
    updatedAt: new Date().toISOString(),
  },
]

function mockCompletion(
  request: ChatCompletionRequest,
): ChatCompletionResponse {
  const lastUser = [...request.messages]
    .reverse()
    .find((message) => message.role === 'user')

  const message: AiMessage = {
    id: createId(),
    role: 'assistant',
    content: lastUser
      ? `Acknowledged: “${lastUser.content}”. Connect \`/chat/completions\` to your AI gateway to replace this mock response.`
      : 'Ready when you are. Ask a question to begin.',
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
