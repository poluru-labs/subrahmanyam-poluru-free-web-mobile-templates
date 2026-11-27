import { describe, expect, it } from 'vitest'
import { formatTitle } from './formatTitle'

describe('formatTitle', () => {
  it('joins the page and app name', () => {
    expect(formatTitle('About', 'Model Evaluation Workbench')).toBe('About · Model Evaluation Workbench')
  })

  it('returns the app name when the page title is blank', () => {
    expect(formatTitle('   ', 'Model Evaluation Workbench')).toBe('Model Evaluation Workbench')
  })

  it('falls back when the app name is blank', () => {
    expect(formatTitle('Home', ' ')).toBe('Home · Model Evaluation Workbench')
  })
})
