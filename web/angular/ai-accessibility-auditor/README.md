# Angular starter

Copy this project when you start a new Angular template. It is a small, strict Angular 21 app with server-side rendering, lazy routes, and the shared design system already wired in.

Created by [Subrahmanyam Poluru](https://polurus.com). Built with [`@poluru-labs/enterprise-design-system-angular`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-angular).

## Stack

- Angular 21, standalone components, `OnPush`
- Server rendering with Express (`src/server.ts`)
- Vitest through `ng test`
- Prettier and ESLint (flat config)
- SCSS, with design tokens imported in `src/styles.scss`

Node `22` is recorded in `.nvmrc` and used in CI. Angular also accepts Node `^20.19`, `^24`, and `^25`.

## Scripts

```bash
npm install          # install dependencies
npm start            # dev server at http://localhost:4200/
npm run build        # production SSR build in dist/
npm test             # unit tests
npm run lint         # ESLint
npm run format       # write Prettier formatting
npm run serve:ssr:ng-boilerplate
```

After a production build, the last command serves `dist/ng-boilerplate`.

## Layout

```text
src/
  main.ts                 browser bootstrap
  main.server.ts          server bootstrap
  server.ts               Express host and /api/health
  styles.scss             global styles and design-system tokens
  environments/           public build-time config (no secrets)
  app/
    app.ts                shell: header, nav, router outlet
    app.config.ts         router, HTTP, hydration
    app.routes.ts         lazy routes — add pages here
    pages/                one folder per screen
public/                   static files copied as-is (favicon)
```

`ng serve` swaps `environment.ts` for `environment.development.ts`. Production builds keep `environment.ts`.

## Add a page

1. Generate a component: `ng generate component pages/reports --type=component`
2. Register a lazy route in `src/app/app.routes.ts`.
3. Add a link in `src/app/app.html` if it belongs in the main nav.
4. If the page cannot be prerendered, set its `renderMode` in `app.routes.server.ts`.

## API routes

Add Express handlers in `src/server.ts` **before** the Angular catch-all. `GET /api/health` is the working example. The browser calls that origin with `environment.apiBaseUrl`.

## Checks

```bash
npm run format:check
npm run lint
npm test -- --watch=false
npm run build
```

The same steps run in `.github/workflows/ci.yml`.

## License

[MIT](LICENSE)
