import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Inclusive Design Reviewer')).toBe('About · Inclusive Design Reviewer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Inclusive Design Reviewer')).toBe('Inclusive Design Reviewer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Inclusive Design Reviewer')
  })
})
