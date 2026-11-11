import { useState } from 'react'
import { AGENT_STORAGE_KEYS, aiApi, env, type AiMessage } from '@/core'
import { useLocalStorage } from '@/shared'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `msg_${Date.now()}`

export function useChat() {
  const [messages, setMessages] = useState<AiMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [activeAgentId] = useLocalStorage<string | null>(
    AGENT_STORAGE_KEYS.activeAgentId,
    null,
  )

  const activeAgent = activeAgentId
    ? aiApi.getAgentById(activeAgentId) ?? null
    : null

  const sendMessage = async (content: string) => {
    const trimmed = content.trim()
    if (!trimmed || isPending) return

    const userMessage: AiMessage = {
      id: createId(),
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setError(null)
    setIsPending(true)

    try {
      const response = await aiApi.completeChat({
        messages: nextMessages.map(({ role, content: text }) => ({
          role,
          content: text,
        })),
        model: env.aiDefaultModel,
        stream: false,
        agentId: activeAgentId ?? undefined,
      })

      setMessages((current) => [...current, response.message])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete chat')
    } finally {
      setIsPending(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
    setError(null)
  }

  return {
    messages,
    error,
    isPending,
    activeAgent,
    sendMessage,
    clearMessages,
  }
}
