import { describe, expect, it } from 'vitest'
import type { RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { navigation } from '@/config/navigation'

function collectRoutes(records: readonly RouteRecordRaw[]): RouteRecordRaw[] {
  return records.flatMap((record) => [
    record,
    ...(record.children ? collectRoutes(record.children) : []),
  ])
}

function collectPaths(records: readonly RouteRecordRaw[]): string[] {
  return collectRoutes(records).map((record) => record.path)
}

describe('file routes', () => {
  it('registers a path for every primary nav item', () => {
    const paths = collectPaths(routes)
    for (const item of navigation) {
      expect(paths).toContain(item.to)
    }
  })

  it('includes a catch-all page', () => {
    const paths = collectPaths(routes)
    expect(paths.some((path) => path.includes('(.*)'))).toBe(true)
  })

  it('reads page titles from route blocks', () => {
    const titles = new Map(collectRoutes(routes).map((record) => [record.path, record.meta?.title]))
    expect(titles.get('/')).toBe('Home')
    expect(titles.get('/about')).toBe('About')
    expect(titles.get('/components')).toBe('Components')
    expect(titles.get('/:path(.*)')).toBe('Page not found')
  })
})
