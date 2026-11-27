import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Water Usage Insights')).toBe('About · Water Usage Insights')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Water Usage Insights')).toBe('Water Usage Insights')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Water Usage Insights')
  })
})
