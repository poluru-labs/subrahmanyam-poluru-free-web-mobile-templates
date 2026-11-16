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
    id: 'agent_script',
    name: 'Script & Beats',
    description:
      'Drafts hooks, beat sheets, and VO lines for short-form video runs.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'script',
    promptVersion: '2026.03.6',
    tools: ['beat.sheet', 'hook.test', 'vo.timing'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: 'agent_storyboard',
    name: 'Storyboard Frames',
    description:
      'Suggests frame descriptions, transitions, and on-screen text placement.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'storyboard',
    promptVersion: '2026.02.2',
    tools: ['frame.desc', 'transition.pick', 'text.overlay'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 86).toISOString(),
  },
  {
    id: 'agent_shots',
    name: 'Shot List Builder',
    description:
      'Builds shot lists with angles, B-roll ideas, and coverage notes.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'shots',
    promptVersion: '2026.01.3',
    tools: ['shot.list', 'broll.suggest', 'coverage.map'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 224).toISOString(),
  },
  {
    id: 'agent_export',
    name: 'Export Notes',
    description:
      'Produces delivery specs, caption tracks, and editor handoff checklists.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'export',
    promptVersion: '2026.03.0-rc6',
    tools: ['spec.emit', 'caption.track', 'handoff.md'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 'agent_studio',
    name: 'Studio Composer',
    description:
      'Merges script, boards, shots, and export notes into a production brief.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.9',
    tools: ['brief.merge', 'asset.link', 'timeline.stub'],
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
    'Ready when you are. Describe your video idea or paste a script sketch to begin a mock studio pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'script':
        body = `Script (demo): I would draft beats for “${truncate(snippet)}”.`
        break
      case 'storyboard':
        body = `Storyboard (demo): I would frame scenes for “${truncate(snippet)}”.`
        break
      case 'shots':
        body = `Shots (demo): I would list coverage for “${truncate(snippet)}”.`
        break
      case 'export':
        body = `Export (demo): I would note deliverables for “${truncate(snippet)}”.`
        break
      case 'general':
        body = `Composer (demo): I would assemble a brief from “${truncate(snippet)}”.`
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