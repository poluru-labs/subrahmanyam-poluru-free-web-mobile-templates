import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Test Generation Workspace')).toBe('About · Test Generation Workspace')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Test Generation Workspace')).toBe('Test Generation Workspace')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Test Generation Workspace')
  })
})
