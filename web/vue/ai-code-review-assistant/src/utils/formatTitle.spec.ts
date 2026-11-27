import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Code Review Assistant')).toBe('About · Code Review Assistant')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Code Review Assistant')).toBe('Code Review Assistant')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Code Review Assistant')
  })
})
