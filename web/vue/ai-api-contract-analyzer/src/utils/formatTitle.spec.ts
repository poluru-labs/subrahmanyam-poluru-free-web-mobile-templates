import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'API Contract Analyzer')).toBe('About · API Contract Analyzer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'API Contract Analyzer')).toBe('API Contract Analyzer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · API Contract Analyzer')
  })
})
