import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Adaptive Learning Platform')).toBe('About · Adaptive Learning Platform')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Adaptive Learning Platform')).toBe('Adaptive Learning Platform')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Adaptive Learning Platform')
  })
})
