import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { defaultTheme, themeStorageKey, themes } from './themes'

const root = process.cwd()

describe('theme catalog', () => {
  it('enables every starter theme in the stylesheet', () => {
    const css = readFileSync(resolve(root, 'src/styles/main.css'), 'utf8')
    const block = css.match(/@plugin "daisyui" \{([^}]+)\}/)?.[1] ?? ''

    expect(block).toContain(`${defaultTheme} --default`)
    for (const theme of themes) {
      expect(block).toContain(theme)
    }
  })

  it('restores the saved theme before the app paints', () => {
    const html = readFileSync(resolve(root, 'index.html'), 'utf8')
    expect(html).toContain(themeStorageKey)
    expect(html).toContain(`data-theme="${defaultTheme}"`)
  })
})
