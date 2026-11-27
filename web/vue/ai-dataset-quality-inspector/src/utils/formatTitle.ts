export function formatTitle(pageTitle: string, appName: string): string {
  const page = pageTitle.trim()
  const app = appName.trim() || 'Dataset Quality Inspector'
  if (!page) return app
  return `${page} · ${app}`
}
