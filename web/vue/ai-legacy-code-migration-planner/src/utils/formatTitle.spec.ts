import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Legacy Code Migration Planner')).toBe('About · Legacy Code Migration Planner')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Legacy Code Migration Planner')).toBe('Legacy Code Migration Planner')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Legacy Code Migration Planner')
  })
})
