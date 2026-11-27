import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Skills Assessment Workbench')).toBe('About · Skills Assessment Workbench')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Skills Assessment Workbench')).toBe('Skills Assessment Workbench')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Skills Assessment Workbench')
  })
})
