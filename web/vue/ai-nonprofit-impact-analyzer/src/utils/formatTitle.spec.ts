import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Nonprofit Impact Analyzer')).toBe('About · Nonprofit Impact Analyzer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Nonprofit Impact Analyzer')).toBe('Nonprofit Impact Analyzer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Nonprofit Impact Analyzer')
  })
})
