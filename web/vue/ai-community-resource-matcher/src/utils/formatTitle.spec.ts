import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Community Resource Matcher')).toBe('About · Community Resource Matcher')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Community Resource Matcher')).toBe('Community Resource Matcher')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Community Resource Matcher')
  })
})
