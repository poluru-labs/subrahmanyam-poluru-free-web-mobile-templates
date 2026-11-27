import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Literature Review Workspace')).toBe('About · Literature Review Workspace')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Literature Review Workspace')).toBe('Literature Review Workspace')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Literature Review Workspace')
  })
})
