import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Inference Performance Monitor')).toBe('About · Inference Performance Monitor')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Inference Performance Monitor')).toBe('Inference Performance Monitor')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Inference Performance Monitor')
  })
})
