import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Plain Language Editor')).toBe('About · Plain Language Editor')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Plain Language Editor')).toBe('Plain Language Editor')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Plain Language Editor')
  })
})
