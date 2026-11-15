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
    id: 'agent_prefs',
    name: 'Preference Profiler',
    description:
      'Captures diets, allergens, cuisines, and household size for personalized plans.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'preferences',
    promptVersion: '2026.03.1',
    tools: ['diet.map', 'allergen.flag', 'household.size'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'agent_macros',
    name: 'Macro Menu Builder',
    description:
      'Balances protein, carbs, and fats across breakfast, lunch, and dinner.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'macros',
    promptVersion: '2026.02.4',
    tools: ['macro.target', 'meal.split', 'portion.scale'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'agent_grocery',
    name: 'Grocery Aggregator',
    description:
      'Merges weekly recipes into one list with aisle grouping and quantity rollup.',
    model: env.aiDefaultModel,
    status: 'active',
    category: 'grocery',
    promptVersion: '2026.01.8',
    tools: ['list.merge', 'aisle.sort', 'unit.convert'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
  {
    id: 'agent_leftovers',
    name: 'Leftover Coach',
    description:
      'Suggests remix meals and storage windows so nothing goes to waste.',
    model: env.aiDefaultModel,
    status: 'draft',
    category: 'leftovers',
    promptVersion: '2026.03.0-rc1',
    tools: ['remix.suggest', 'shelf.life', 'prep.reuse'],
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'agent_week',
    name: 'Week Planner',
    description:
      'Lays out seven-day menus with prep-ahead notes and busy-night shortcuts.',
    model: env.aiDefaultModel,
    status: 'paused',
    category: 'general',
    promptVersion: '2025.12.2',
    tools: ['week.grid', 'prep.batch', 'shortcut.meal'],
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
    'Ready when you are. Share preferences, macros, or what is in the fridge to begin a mock planning pass.'

  if (lastUser) {
    switch (agent?.category) {
      case 'preferences':
        body = `Preferences (demo): I would profile diets and allergens from “${truncate(snippet)}”. Connect your gateway for saved profiles.`
        break
      case 'macros':
        body = `Macro menu (demo): I would balance meals for “${truncate(snippet)}” against your targets.`
        break
      case 'grocery':
        body = `Grocery list (demo): I would aggregate ingredients for “${truncate(snippet)}” by aisle.`
        break
      case 'leftovers':
        body = `Leftovers (demo): I would suggest remixes for “${truncate(snippet)}” with storage tips.`
        break
      case 'general':
        body = `Week plan (demo): I would lay out seven days around “${truncate(snippet)}”.`
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