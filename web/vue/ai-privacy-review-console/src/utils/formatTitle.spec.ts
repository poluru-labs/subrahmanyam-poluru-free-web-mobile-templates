import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Privacy Review Console')).toBe('About · Privacy Review Console')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Privacy Review Console')).toBe('Privacy Review Console')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Privacy Review Console')
  })
})
