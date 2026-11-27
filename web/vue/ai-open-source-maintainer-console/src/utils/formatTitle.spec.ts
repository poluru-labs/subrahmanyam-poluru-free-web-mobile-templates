import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Open Source Maintainer Console')).toBe('About · Open Source Maintainer Console')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Open Source Maintainer Console')).toBe('Open Source Maintainer Console')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Open Source Maintainer Console')
  })
})
