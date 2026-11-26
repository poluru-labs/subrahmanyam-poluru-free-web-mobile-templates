# Contributing

This repository is the base Angular starter. Copy it when starting a new template, then change the app name, routes, and pages.

## Before you open a pull request

From a clean install:

```bash
npm ci
npm run format:check
npm run lint
npm test
npm run build
```

`npm test` runs Vitest once when `CI` is set. Locally, pass `--watch=false` if the runner stays open.

## Project conventions

- Standalone components, `OnPush` change detection, and lazy-loaded routes.
- SCSS for component styles. Global tokens come from `@poluru-labs/enterprise-design-system-angular`.
- Public configuration goes in `src/environments`. Do not commit secrets.
- Keep comments that explain why a file exists or how to extend it. Skip comments that restate the code.
