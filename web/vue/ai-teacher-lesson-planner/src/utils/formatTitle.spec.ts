import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Teacher Lesson Planner')).toBe('About · Teacher Lesson Planner')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Teacher Lesson Planner')).toBe('Teacher Lesson Planner')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Teacher Lesson Planner')
  })
})
