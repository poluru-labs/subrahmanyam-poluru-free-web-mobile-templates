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
    name: 'Side-by-Side Comparator',
    description:
      'Runs the same prompt across providers and lines up responses for review.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'compare',
    promptVersion: '2026.03.1',
    tools: ['prompt.fanout', 'diff.align', 'export.md'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
  },
  {
    id: 'agent_latency',
    name: 'Latency & Cost Analyst',
    description:
      'Estimates time-to-first-token, total latency, and $/1K tokens per model.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'latency',
    promptVersion: '2026.02.4',
    tools: ['latency.sample', 'cost.rollup', 'chart.spark'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
  },
  {
    id: 'agent_quality',
    name: 'Quality Rubric Judge',
    description:
      'Scores answers against rubrics for accuracy, tone, and policy fit.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'quality',
    promptVersion: '2026.01.8',
    tools: ['rubric.score', 'judge.ensemble', 'fail.explain'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 260).toISOString(),
  },
  {
    id: 'agent_promotion',
    name: 'Promotion Gatekeeper',
    description:
      'Checks if a challenger model clears thresholds before production promotion.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'promotion',
    promptVersion: '2026.03.0-rc1',
    tools: ['gate.threshold', 'baseline.diff', 'signoff.log'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'agent_bench',
    name: 'Benchmark Orchestrator',
    description:
      'Bundles datasets, schedules runs, and summarizes winner/loser trends.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['suite.load', 'run.schedule', 'leaderboard.rank'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
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
    'Ready when you are. Paste a prompt or benchmark scenario to begin a mock evaluation pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'compare':
        body = `Compare (demo): I would fan out “${truncate(snippet)}” across models side by side.`
        break
      case 'latency':
        body = `Latency/cost (demo): I would estimate metrics for runs matching “${truncate(snippet)}”.`
        break
      case 'quality':
        body = `Rubric (demo): I would score responses to “${truncate(snippet)}” against quality criteria.`
        break
      case 'promotion':
        body = `Promotion gate (demo): I would check if results for “${truncate(snippet)}” clear your thresholds.`
        break
      case 'general':
        body = `Benchmark (demo): I would orchestrate a suite around “${truncate(snippet)}”.`
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