import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Accessibility Auditor')).toBe('About · Accessibility Auditor')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Accessibility Auditor')).toBe('Accessibility Auditor')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Accessibility Auditor')
  })
})
