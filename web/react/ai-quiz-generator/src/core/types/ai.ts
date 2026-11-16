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

export type AiAgent = {
  id: string
  name: string
  description: string
  model: string
  status: AgentStatus
  tools: string[]
  updatedAt: string
}

export type ChatCompletionRequest = {
  sessionId?: string
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
