import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Systematic Review Manager')).toBe('About · Systematic Review Manager')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Systematic Review Manager')).toBe('Systematic Review Manager')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Systematic Review Manager')
  })
})
