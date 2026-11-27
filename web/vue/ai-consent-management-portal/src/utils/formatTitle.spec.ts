import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Consent Management Portal')).toBe('About · Consent Management Portal')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Consent Management Portal')).toBe('Consent Management Portal')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Consent Management Portal')
  })
})
