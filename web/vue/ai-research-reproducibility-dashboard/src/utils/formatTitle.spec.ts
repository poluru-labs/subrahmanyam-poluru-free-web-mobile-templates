import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Research Reproducibility Dashboard')).toBe('About · Research Reproducibility Dashboard')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Research Reproducibility Dashboard')).toBe('Research Reproducibility Dashboard')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Research Reproducibility Dashboard')
  })
})
