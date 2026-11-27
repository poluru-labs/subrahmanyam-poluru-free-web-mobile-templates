import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Document Accessibility Checker')).toBe('About · Document Accessibility Checker')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Document Accessibility Checker')).toBe('Document Accessibility Checker')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Document Accessibility Checker')
  })
})
