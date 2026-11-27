import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Food Waste Reduction Dashboard')).toBe('About · Food Waste Reduction Dashboard')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Food Waste Reduction Dashboard')).toBe('Food Waste Reduction Dashboard')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Food Waste Reduction Dashboard')
  })
})
