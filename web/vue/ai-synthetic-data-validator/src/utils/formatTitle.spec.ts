import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Synthetic Data Validator')).toBe('About · Synthetic Data Validator')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Synthetic Data Validator')).toBe('Synthetic Data Validator')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Synthetic Data Validator')
  })
})
