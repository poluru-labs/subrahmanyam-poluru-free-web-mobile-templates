import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'RAG Evaluation Dashboard')).toBe('About · RAG Evaluation Dashboard')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'RAG Evaluation Dashboard')).toBe('RAG Evaluation Dashboard')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · RAG Evaluation Dashboard')
  })
})
