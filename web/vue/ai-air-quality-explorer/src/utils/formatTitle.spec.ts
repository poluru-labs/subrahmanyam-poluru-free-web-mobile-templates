import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Air Quality Explorer')).toBe('About · Air Quality Explorer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Air Quality Explorer')).toBe('Air Quality Explorer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Air Quality Explorer')
  })
})
