import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Agent Observability Console')).toBe('About · Agent Observability Console')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Agent Observability Console')).toBe('Agent Observability Console')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Agent Observability Console')
  })
})
