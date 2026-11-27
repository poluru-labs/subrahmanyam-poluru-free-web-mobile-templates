import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Student Feedback Assistant')).toBe('About · Student Feedback Assistant')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Student Feedback Assistant')).toBe('Student Feedback Assistant')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Student Feedback Assistant')
  })
})
