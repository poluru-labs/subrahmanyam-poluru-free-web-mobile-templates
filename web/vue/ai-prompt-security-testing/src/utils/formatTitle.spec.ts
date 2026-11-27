import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Prompt Security Testing')).toBe('About · Prompt Security Testing')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Prompt Security Testing')).toBe('Prompt Security Testing')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Prompt Security Testing')
  })
})
