export function formatTitle(pageTitle: string, appName: string): string {
  const page = pageTitle.trim()
  const app = appName.trim() || 'Inclusive Design Reviewer'
  if (!page) return app
  return `${page} · ${app}`
}
