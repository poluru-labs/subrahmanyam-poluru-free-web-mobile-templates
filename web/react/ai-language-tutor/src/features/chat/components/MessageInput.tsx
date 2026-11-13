import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Button, Spinner } from '@/shared'
import styles from './MessageInput.module.scss'

type MessageInputProps = {
  disabled?: boolean
  onSend: (value: string) => void
  onClear: () => void
}

export function MessageInput({ disabled, onSend, onClear }: MessageInputProps) {
  const [value, setValue] = useState('')

  const submit = (event?: FormEvent) => {
    event?.preventDefault()
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label className="sr-only" htmlFor="chat-input">
        Message
      </label>
      <textarea
        id="chat-input"
        className={styles.field}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask the workspace assistant…"
        disabled={disabled}
      />
      <div className={styles.footer}>
        <p className={styles.hint}>Enter to send · Shift+Enter for newline</p>
        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={onClear}>
            Clear
          </Button>
          <Button type="submit" disabled={disabled || !value.trim()}>
            {disabled ? <Spinner label="Sending" /> : null}
            Send
          </Button>
        </div>
      </div>
    </form>
  )
}
