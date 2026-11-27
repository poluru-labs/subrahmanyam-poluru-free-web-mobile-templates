import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultTheme, isThemeName, themeStorageKey, type ThemeName } from '@/config/themes'

function readStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(themeStorageKey)
    if (stored && isThemeName(stored)) return stored
  } catch {
    // Ignore storage failures and keep the default theme.
  }
  return defaultTheme
}

function applyTheme(theme: ThemeName) {
  document.documentElement.setAttribute('data-theme', theme)
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeName>(readStoredTheme())

  function setTheme(next: ThemeName) {
    theme.value = next
    applyTheme(next)
    try {
      localStorage.setItem(themeStorageKey, next)
    } catch {
      // The selected theme still applies for this session when storage is blocked.
    }
  }

  function init() {
    applyTheme(theme.value)
  }

  return { theme, setTheme, init }
})
