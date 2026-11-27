import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Dataset Quality Inspector')).toBe('About · Dataset Quality Inspector')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Dataset Quality Inspector')).toBe('Dataset Quality Inspector')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Dataset Quality Inspector')
  })
})
