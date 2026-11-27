import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Citation Verification Console')).toBe('About · Citation Verification Console')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Citation Verification Console')).toBe('Citation Verification Console')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Citation Verification Console')
  })
})
