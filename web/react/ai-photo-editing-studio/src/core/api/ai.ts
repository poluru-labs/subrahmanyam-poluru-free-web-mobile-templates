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
    id: 'agent_edit',
    name: 'Natural Language Editor',
    description:
      'Turns a plain-language instruction into a layered, reversible edit.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'edit',
    promptVersion: '2026.03.2',
    tools: ['prompt.parse', 'mask.region', 'layer.commit'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: 'agent_batch',
    name: 'Batch Retoucher',
    description:
      'Applies the same look across a set while leaving each original untouched.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'batch',
    promptVersion: '2026.02.6',
    tools: ['queue.scan', 'preset.apply', 'export.set'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
  },
  {
    id: 'agent_compare',
    name: 'Before/After Comparator',
    description:
      'Lines up the source and the edit so you can approve or reject the change.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'compare',
    promptVersion: '2026.01.9',
    tools: ['frame.split', 'diff.highlight', 'review.approve'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
  },
  {
    id: 'agent_history',
    name: 'History Keeper',
    description:
      'Snapshots every step so you can revert without overwriting the original.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'history',
    promptVersion: '2026.03.0-rc2',
    tools: ['snapshot.save', 'revert.step', 'original.lock'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 16).toISOString(),
  },
  {
    id: 'agent_studio',
    name: 'Studio Orchestrator',
    description:
      'Routes a job across edit, batch, compare, and history agents.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.4',
    tools: ['job.route', 'preset.library', 'qa.pass'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
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
