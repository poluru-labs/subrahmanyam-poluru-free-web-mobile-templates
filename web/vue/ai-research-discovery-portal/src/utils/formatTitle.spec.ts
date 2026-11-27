import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Research Discovery Portal')).toBe('About · Research Discovery Portal')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Research Discovery Portal')).toBe('Research Discovery Portal')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Research Discovery Portal')
  })
})
