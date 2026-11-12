export type MessageRole = 'system' | 'user' | 'assistant' | 'tool'

export type AiMessage = {
  id: string
  role: MessageRole
  content: string
  createdAt: string
  model?: string
  tokens?: number
}

export type ChatSession = {
  id: string
  title: string
  messages: AiMessage[]
  updatedAt: string
}

export type AgentStatus = 'draft' | 'active' | 'paused'

/** Email-assist specialization for routing prompts and UI grouping. */
export type AgentCategory =
  | 'tone'
  | 'summary'
  | 'triage'
  | 'followup'
  | 'general'

export type AiAgent = {
  id: string
  name: string
  description: string
  model: string
  status: AgentStatus
  category: AgentCategory
  /** Semantic version for prompt / policy packs shipped with the agent. */
  promptVersion: string
  tools: string[]
  updatedAt: string
}

export type ChatCompletionRequest = {
  sessionId?: string
  agentId?: string
  messages: Pick<AiMessage, 'role' | 'content'>[]
  model?: string
  stream?: boolean
}

export type ChatCompletionResponse = {
  message: AiMessage
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export type ApiErrorBody = {
  message: string
  code?: string
  details?: unknown
}
