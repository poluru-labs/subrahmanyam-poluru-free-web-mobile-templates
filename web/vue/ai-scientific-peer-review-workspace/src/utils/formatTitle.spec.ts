import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Scientific Peer Review Workspace')).toBe('About · Scientific Peer Review Workspace')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Scientific Peer Review Workspace')).toBe('Scientific Peer Review Workspace')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Scientific Peer Review Workspace')
  })
})
