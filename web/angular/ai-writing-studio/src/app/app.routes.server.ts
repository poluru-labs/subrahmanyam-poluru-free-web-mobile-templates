import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * How each URL is rendered on the server.
 *
 * - `Prerender`: HTML is generated at build time. Use for public pages.
 * - `Server`: HTML is generated on each request. Use for personalized pages.
 * - `Client`: skip server HTML and render in the browser only.
 *
 * The catch-all prerenders every route. Replace it with explicit paths
 * when one route needs a different mode.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
