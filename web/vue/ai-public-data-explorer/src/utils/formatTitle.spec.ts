import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Public Data Explorer')).toBe('About · Public Data Explorer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Public Data Explorer')).toBe('Public Data Explorer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Public Data Explorer')
  })
})
