import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { defaultTheme, themeStorageKey } from '@/config/themes'
import { useThemeStore } from './theme'

describe('theme store', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    setActivePinia(createPinia())
  })

  it('starts on the default theme', () => {
    const store = useThemeStore()
    store.init()
    expect(store.theme).toBe(defaultTheme)
    expect(document.documentElement.getAttribute('data-theme')).toBe(defaultTheme)
  })

  it('ignores an unknown saved theme', () => {
    localStorage.setItem(themeStorageKey, 'not-a-theme')
    const store = useThemeStore()
    expect(store.theme).toBe(defaultTheme)
  })

  it('saves and applies the selected theme', () => {
    const store = useThemeStore()
    store.setTheme('dark')
    expect(store.theme).toBe('dark')
    expect(localStorage.getItem(themeStorageKey)).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('restores a saved theme', () => {
    localStorage.setItem(themeStorageKey, 'light')
    const store = useThemeStore()
    store.init()
    expect(store.theme).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})
