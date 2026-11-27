import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Learning Accessibility Portal')).toBe('About · Learning Accessibility Portal')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Learning Accessibility Portal')).toBe('Learning Accessibility Portal')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Learning Accessibility Portal')
  })
})
