export const themes = ['brand', 'light', 'dark'] as const

export type ThemeName = (typeof themes)[number]

export const defaultTheme: ThemeName = 'brand'

export const themeStorageKey = 'ai-open-source-maintainer-console-theme'

export function isThemeName(value: string): value is ThemeName {
  return (themes as readonly string[]).includes(value)
}

export function themeLabel(theme: ThemeName): string {
  if (theme === 'brand') return 'Brand'
  return theme.charAt(0).toUpperCase() + theme.slice(1)
}
