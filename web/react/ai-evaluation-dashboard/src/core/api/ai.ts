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
    id: 'agent_suite',
    name: 'Suite Composer',
    description:
      'Bundles prompts, golden sets, and thresholds into runnable eval suites.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'suite',
    promptVersion: '2026.03.1',
    tools: ['suite.assemble', 'golden.load', 'threshold.bind'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_regression',
    name: 'Regression Sentinel',
    description:
      'Compares runs across model versions and surfaces metric deltas with alerts.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'regression',
    promptVersion: '2026.02.4',
    tools: ['run.diff', 'alert.threshold', 'changelog.link'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_scorecard',
    name: 'Scorecard Builder',
    description:
      'Turns eval metrics into executive scorecards with trend annotations.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'scorecard',
    promptVersion: '2026.01.8',
    tools: ['metric.roll_up', 'trend.annotate', 'export.pdf'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_feedback',
    name: 'Human Feedback Loop',
    description:
      'Ingests raters, resolves disagreements, and feeds labels back to suites.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'feedback',
    promptVersion: '2026.03.0-rc1',
    tools: ['rater.merge', 'label.export', 'drift.watch'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_runs',
    name: 'Run Orchestrator',
    description:
      'Schedules eval jobs, shards datasets, and tracks artifact lineage.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['job.schedule', 'shard.split', 'lineage.trace'],
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
    'Ready when you are. Describe a model version or eval goal to begin a mock analysis pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'suite':
        body = `Suite draft (demo): I would assemble cases and thresholds for “${truncate(snippet)}”. Connect your gateway for live runs.`
        break
      case 'regression':
        body = `Regression check (demo): I would diff metrics for “${truncate(snippet)}” against your last baseline.`
        break
      case 'scorecard':
        body = `Scorecard (demo): I would summarize KPIs and trends related to “${truncate(snippet)}”.`
        break
      case 'feedback':
        body = `Feedback loop (demo): I would reconcile human ratings for “${truncate(snippet)}” and propose suite updates.`
        break
      case 'general':
        body = `Run plan (demo): I would schedule and shard work for “${truncate(snippet)}”.`
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
