import { RouterProvider } from 'react-router'
import { router } from '@/app/router'

/**
 * Composition root for cross-cutting providers (auth, query, theme, etc.).
 * Wrap `RouterProvider` with additional providers as the app grows.
 */
export function AppProviders() {
  return <RouterProvider router={router} />
}
