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
    id: 'agent_diarize',
    name: 'Speaker Diarizer',
    description:
      'Labels speaker turns and suggests splits when overlap or crosstalk is detected.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'diarize',
    promptVersion: '2026.03.4',
    tools: ['speaker.tag', 'overlap.flag', 'turn.merge'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 41).toISOString(),
  },
  {
    id: 'agent_cleanup',
    name: 'Transcript Cleaner',
    description:
      'Removes fillers, fixes punctuation, and normalizes domain terms.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'cleanup',
    promptVersion: '2026.02.9',
    tools: ['filler.trim', 'punct.fix', 'term.normalize'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 96).toISOString(),
  },
  {
    id: 'agent_timestamps',
    name: 'Timestamp Navigator',
    description:
      'Aligns cues, chapter markers, and seek-friendly segment boundaries.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'timestamps',
    promptVersion: '2026.01.4',
    tools: ['cue.align', 'chapter.mark', 'seek.jump'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 228).toISOString(),
  },
  {
    id: 'agent_export',
    name: 'Export Formatter',
    description:
      'Prepares SRT, VTT, and markdown exports with caption-safe line breaks.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'export',
    promptVersion: '2026.03.0-rc4',
    tools: ['srt.emit', 'vtt.emit', 'md.structure'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 19).toISOString(),
  },
  {
    id: 'agent_workspace',
    name: 'Workspace Composer',
    description:
      'Assembles diarization, cleanup, and exports into a delivery checklist.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.7',
    tools: ['pipeline.merge', 'qa.check', 'handoff.pack'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
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
    'Ready when you are. Paste a transcript snippet or describe your audio to begin a mock pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'diarize':
        body = `Diarize (demo): I would label speakers in “${truncate(snippet)}”.`
        break
      case 'cleanup':
        body = `Cleanup (demo): I would polish text in “${truncate(snippet)}”.`
        break
      case 'timestamps':
        body = `Timestamps (demo): I would align cues for “${truncate(snippet)}”.`
        break
      case 'export':
        body = `Export (demo): I would format captions from “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would build a pipeline from “${truncate(snippet)}”.`
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