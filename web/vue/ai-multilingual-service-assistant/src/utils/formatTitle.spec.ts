import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Multilingual Service Assistant')).toBe('About · Multilingual Service Assistant')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Multilingual Service Assistant')).toBe('Multilingual Service Assistant')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Multilingual Service Assistant')
  })
})
