import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Volunteer Skills Matcher')).toBe('About · Volunteer Skills Matcher')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Volunteer Skills Matcher')).toBe('Volunteer Skills Matcher')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Volunteer Skills Matcher')
  })
})
