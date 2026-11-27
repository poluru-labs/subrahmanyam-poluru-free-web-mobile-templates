import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Technical Documentation Studio')).toBe('About · Technical Documentation Studio')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Technical Documentation Studio')).toBe('Technical Documentation Studio')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Technical Documentation Studio')
  })
})
