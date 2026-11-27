import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Data Annotation Workspace')).toBe('About · Data Annotation Workspace')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Data Annotation Workspace')).toBe('Data Annotation Workspace')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Data Annotation Workspace')
  })
})
