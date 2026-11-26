# AGENTS.md — Photo Editing Workspace

Instructions for implementing this Angular application in `ai-photo-editing-workspace`.

## Goal

Build a **stunning, production-quality dashboard** for **Photo Editing Workspace** using:

- **Angular** (current project version) with **SSR** as configured
- **Angular Router** with real routes (not nav-only state)
- **Angular standalone components** + SCSS (no external UI package required)
- **Simple sidebar** (brand, nav, one profile row) — no extra workspace switchers or promo blocks
- **Sample data only** — illustrative metrics, no live APIs

## Theme

| Token | Value |
|-------|--------|
| Primary | `#475569` |
| Rationale | Slate gray (professional retouching UI) |

Apply the primary color to: CSS custom properties on `:root`, sidebar active state, charts, progress bars, favicon, and `theme-color` in `index.html`. Use a subtle gradient page background derived from the primary (mix with white ~88–94%).

## Branding (UI)

- **Product name:** **Retouchlab** / tagline **Photos**
- **Eyebrow (topbar):** Retouching queue

## Routing

Implement `src/app/app.routes.ts` with these routes:

| Path | Label | Notes |
|------|-------|--------|
| `/` | Overview (home) | Lazy-loaded standalone component or shell section keyed to nav |
| `/queue` | Queue | Lazy-loaded standalone component or shell section keyed to nav |
| `/presets` | Presets | Lazy-loaded standalone component or shell section keyed to nav |
| `/exports` | Exports | Lazy-loaded standalone component or shell section keyed to nav |

Use a **layout shell** (`app.ts` or a layout component) with `<router-outlet>`. Sidebar links must use `routerLink` + `routerLinkActive`. Default redirect: `''` → overview route.

Suggested route implementation:

- `Overview` — KPI cards, main chart, category breakdown, priority table, activity (as today)
- Other routes — focused list/detail pages using cards, tables, filters, and empty states consistent with the domain

## Sidebar navigation

Keep **exactly these four items** (labels match product domain):

- Overview
- Queue
- Presets
- Exports

- **Overview** — icon: home (inline SVG or simple icon font)
- **Queue** — `warning` or `mail`
- **Presets** — `folder` or `file`
- **Exports** — `folder` or `file`

**Profile (footer of sidebar):** **Dev Poluru** — Studio lead

## Feature requirements (domain)

Implement overview content aligned with the product name:

- Edit queue table
- Preset usage chart
- Before/after status
- Export batch log

### KPI metrics (Overview)

Display KPI stat blocks (label + value + optional trend) with sample values for:

- Images in queue
- Turnaround time
- Exports today
- Rework requests

## Sample people (required)

Use **fictional names ending in Poluru** only, for example:

- Lead: **Dev Poluru**
- Contributors: **Ananya Poluru**, **Rohan Poluru**, **Meera Poluru**

Do **not** use real customer data.

## Content rules — no AI marketing

- Describe **workflows, metrics, queues, and approvals** for this product domain.
- **Do not** mention AI, ML, LLMs, models, prompts, or “powered by intelligence” in UI copy.
- Folder names may include `ai-`; **user-facing text must not**.

## Footer (required on every page)

Sticky or layout footer with:

- **Created by** [Subrahmanyam Poluru](https://polurus.com) (new tab, `rel="noopener noreferrer"`)

Do **not** add third-party package attribution links in the footer or elsewhere unless the user explicitly requests them later.

## UI building blocks (minimum)

Implement with plain Angular + SCSS:

- Buttons, cards, badges, avatars (initials), tables, progress bars, segmented period control, status pills
- Accessible focus states and `aria-label` on icon-only controls
- Global `styles.scss` for typography (Roboto + Lato from Google Fonts is fine)

## Project metadata

When implementing, align:

- `package.json` `name`: `ai-photo-editing-workspace`
- `angular.json` project key: `ai-photo-editing-workspace`
- `index.html` `<title>`: Photo Editing Workspace
- `public/favicon.svg`: primary color `#475569`

## Quality bar

- Responsive layout (sidebar collapses on narrow viewports)
- Accessible labels on icon-only buttons
- `ChangeDetectionStrategy.OnPush` on routable components where practical
- `npm run build` must succeed; update `app.spec.ts` to assert footer `polurus.com` link

## Demo disclaimer

Include a small muted note: sample data for demonstration only.
