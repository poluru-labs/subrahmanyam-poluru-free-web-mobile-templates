import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Incident Investigation Workspace')).toBe('About · Incident Investigation Workspace')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Incident Investigation Workspace')).toBe('Incident Investigation Workspace')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Incident Investigation Workspace')
  })
})
