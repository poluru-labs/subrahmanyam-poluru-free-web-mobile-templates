import { useState } from 'react'
import { aiApi, env, type AiMessage } from '@/core'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `msg_${Date.now()}`

export function useChat() {
  const [messages, setMessages] = useState<AiMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

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
    sendMessage,
    clearMessages,
  }
}
