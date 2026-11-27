import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Retrieval Quality Analyzer')).toBe('About · Retrieval Quality Analyzer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Retrieval Quality Analyzer')).toBe('Retrieval Quality Analyzer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Retrieval Quality Analyzer')
  })
})
