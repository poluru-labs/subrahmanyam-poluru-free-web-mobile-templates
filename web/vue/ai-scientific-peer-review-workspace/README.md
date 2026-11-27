# Scientific Peer Review Workspace

Collect reviews, decisions, and author responses without losing which line they refer to.

**Author:** [Subrahmanyam Poluru](https://polurus.com)

**Stack:** Vue 3 · TypeScript · Vite · Vue Router 5 · Pinia · Vitest · Tailwind CSS · daisyUI

**Look:** Slate Blue (`#6A5ACD`) · Split studio · Open Sans and Roboto

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

| Script                  | Description                       |
| ----------------------- | --------------------------------- |
| `npm run dev`           | Local development server          |
| `npm test`              | Unit tests, once                  |
| `npm run test:watch`    | Unit tests in watch mode          |
| `npm run test:coverage` | Unit tests with a coverage report |
| `npm run lint`          | ESLint                            |
| `npm run format`        | Prettier                          |
| `npm run type-check`    | `vue-tsc --build`                 |
| `npm run build`         | Typecheck and production build    |
| `npm run preview`       | Preview the production build      |

## Folder structure

```text
mock/                 Sample JSON for this template
src/components/       Shared UI, including Vue icons
src/config/           App name, navigation, and theme catalog
src/layouts/          Shell around every page
src/pages/            One Vue file per route
src/styles/           Tailwind CSS and the brand theme
```

| File | URL |
| --- | --- |
| `src/pages/index.vue` | `/` |
| `src/pages/insights.vue` | `/insights` |
| `src/pages/about.vue` | `/about` |
| `src/pages/components.vue` | `/components` |
| `src/pages/[...path].vue` | Any unmatched URL |

Sample records live in `mock/`. Pages import those files, so edit the JSON to change what the screens show.
