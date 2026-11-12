# AGENTS.md — AI Email Assistant

Guidance for coding agents and contributors working on this template.

## Product

- **Name:** AI Email Assistant
- **Slug:** `ai-email-assistant`
- **Tagline:** Draft, triage, and personalize email without losing your voice.
- **Brand color:** `#AA2B1D` (no gradients)
- **Themes:** light and dark via `data-theme` + `useTheme`
- **Author footer:** Created by [Subrahmanyam Poluru](https://polurus.com)

## Core features

- Tone-matched drafts
- Thread summarization
- Priority triage
- Follow-up reminders

## Template capabilities

- Feature-based React structure (`app` / `core` / `features` / `shared`)
- SCSS modules with shared design tokens
- Chat + agents routes with mock AI API fallback
- **Email agents catalog** (5 inbox agents) with search/status filters and hero summary stats
- **Active agent** persisted in `localStorage` (`email-assistant:active-agent`)
- **Start compose** routes from Agents → Chat; mock completions vary by agent category
- Theme toggle persisted in `localStorage`
- Accessible layout shell with mobile nav

## Industry practices

1. Keep provider secrets on the server — only `VITE_*` public config in the browser
2. Prefer streaming chat with abort/cancel when wiring a real gateway
3. Sanitize any model-rendered HTML/markdown before mounting
4. Log traces/tokens on the backend; avoid raw PII in client logs
5. Version prompts/agents; gate production changes behind review
6. Support light and dark themes without gradient backgrounds
7. Keep visual brand anchored to `#AA2B1D`

## Architecture rules

- Extend `features/*` for product UX; keep `core` free of React UI
- Colocate `*.module.scss` with components
- Export public APIs from feature `index.ts` files
- Update this file when shipping user-facing capabilities

## Definition of done

- [ ] Light and dark themes verified
- [ ] Footer author link present and correct
- [ ] No gradient backgrounds introduced
- [ ] Brand accent remains `#AA2B1D`
- [ ] Agent selection flows Agents → Chat with category-aware mock replies
- [ ] `npm run typecheck` and `npm run lint` pass

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```
