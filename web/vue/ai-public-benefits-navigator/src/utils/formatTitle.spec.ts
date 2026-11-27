import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Public Benefits Navigator')).toBe('About · Public Benefits Navigator')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Public Benefits Navigator')).toBe('Public Benefits Navigator')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Public Benefits Navigator')
  })
})
