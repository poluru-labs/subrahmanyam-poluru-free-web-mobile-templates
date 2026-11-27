import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Data Lineage Explorer')).toBe('About · Data Lineage Explorer')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Data Lineage Explorer')).toBe('Data Lineage Explorer')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Data Lineage Explorer')
  })
})
