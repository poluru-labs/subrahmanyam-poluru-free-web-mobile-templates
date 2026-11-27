import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Disaster Information Hub')).toBe('About · Disaster Information Hub')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Disaster Information Hub')).toBe('Disaster Information Hub')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Disaster Information Hub')
  })
})
