import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Model Bias Auditor')).toBe('About · Model Bias Auditor')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Model Bias Auditor')).toBe('Model Bias Auditor')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Model Bias Auditor')
  })
})
