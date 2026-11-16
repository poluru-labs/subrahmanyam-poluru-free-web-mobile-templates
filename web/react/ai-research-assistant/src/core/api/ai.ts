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
    id: 'agent_citations',
    name: 'Cited Q&A',
    description:
      'Answers from your source corpus with inline citations and confidence notes.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'citations',
    promptVersion: '2026.03.1',
    tools: ['source.retrieve', 'cite.inline', 'claim.check'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 41).toISOString(),
  },
  {
    id: 'agent_literature',
    name: 'Literature Reviewer',
    description:
      'Builds thematic outlines and gap maps across papers and reports.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'literature',
    promptVersion: '2026.02.4',
    tools: ['theme.cluster', 'gap.map', 'outline.draft'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 103).toISOString(),
  },
  {
    id: 'agent_threads',
    name: 'Thread Archivist',
    description:
      'Saves research threads, links prior answers, and resumes context.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'threads',
    promptVersion: '2026.01.8',
    tools: ['thread.save', 'context.resume', 'pin.source'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 272).toISOString(),
  },
  {
    id: 'agent_brief',
    name: 'Brief Exporter',
    description:
      'Packages findings into markdown or PDF briefs with bibliography blocks.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'brief',
    promptVersion: '2026.03.0-rc1',
    tools: ['md.export', 'pdf.pack', 'bib.format'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: 'agent_synth',
    name: 'Synthesis Lead',
    description:
      'Merges multi-source takes into executive summaries for stakeholders.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['synth.merge', 'exec.trim', 'stance.balance'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
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
    'Ready when you are. Ask a question or paste a source excerpt to begin a mock research pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'citations':
        body = `Cited Q&A (demo): I would answer “${truncate(snippet)}” with source citations.`
        break
      case 'literature':
        body = `Literature (demo): I would outline themes around “${truncate(snippet)}”.`
        break
      case 'threads':
        body = `Threads (demo): I would archive context for “${truncate(snippet)}” in a saved thread.`
        break
      case 'brief':
        body = `Brief (demo): I would export findings on “${truncate(snippet)}” to MD/PDF.`
        break
      case 'general':
        body = `Synthesis (demo): I would summarize stakeholder views on “${truncate(snippet)}”.`
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