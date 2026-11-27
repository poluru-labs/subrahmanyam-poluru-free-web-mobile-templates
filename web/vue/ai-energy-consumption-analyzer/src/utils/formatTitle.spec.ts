import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Energy Consumption Analyzer')).toBe('About · Energy Consumption Analyzer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Energy Consumption Analyzer')).toBe('Energy Consumption Analyzer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Energy Consumption Analyzer')
  })
})
