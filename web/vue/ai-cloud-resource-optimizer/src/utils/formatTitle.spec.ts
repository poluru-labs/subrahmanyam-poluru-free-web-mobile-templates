import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Cloud Resource Optimizer')).toBe('About · Cloud Resource Optimizer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Cloud Resource Optimizer')).toBe('Cloud Resource Optimizer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Cloud Resource Optimizer')
  })
})
