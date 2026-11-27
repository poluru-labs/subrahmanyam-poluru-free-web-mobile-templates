import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Dependency Risk Dashboard')).toBe('About · Dependency Risk Dashboard')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Dependency Risk Dashboard')).toBe('Dependency Risk Dashboard')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Dependency Risk Dashboard')
  })
})
