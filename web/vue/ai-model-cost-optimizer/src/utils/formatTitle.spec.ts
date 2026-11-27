import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Model Cost Optimizer')).toBe('About · Model Cost Optimizer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Model Cost Optimizer')).toBe('Model Cost Optimizer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Model Cost Optimizer')
  })
})
