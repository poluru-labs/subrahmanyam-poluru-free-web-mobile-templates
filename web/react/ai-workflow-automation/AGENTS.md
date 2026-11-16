# AGENTS.md — AI Workflow Automation

Guidance for coding agents and contributors working on this template.

## Product

- **Name:** AI Workflow Automation
- **Slug:** `ai-workflow-automation`
- **Tagline:** Orchestrate multi-step AI workflows with human checkpoints.
- **Brand color:** `#2FA4D7` (no gradients)
- **Themes:** light and dark via `data-theme` + `useTheme`
- **Author footer:** Created by [Subrahmanyam Poluru](https://polurus.com)

## Core features

- Step graphs with retries
- Human-in-the-loop gates
- Webhook triggers
- Run history & replay

## Template capabilities

- Feature-based React structure (`app` / `core` / `features` / `shared`)
- SCSS modules with shared design tokens
- Chat + agents routes with mock AI API fallback
- Theme toggle persisted in `localStorage`
- Accessible layout shell with mobile nav

### Agents catalog

- Five workflow agents in `src/core/api/ai.ts` (`MOCK_AGENTS`): step graphs, human gates, webhooks, run history, and deploy brief assembly
- Each agent has `category`, `promptVersion`, `status`, and `tools` for catalog UI and versioned prompts
- **Active agent** persists in `localStorage` under `workflow-automation:active-agent` (`AGENT_STORAGE_KEYS`)
- **Agents page:** search, status filters, stat tiles, branded cards — select agent or **Start automating** → navigates to chat with that agent active
- **Chat:** `useChat` passes `agentId` to `aiApi.completeChat`; mock replies are category-aware until a real `/chat/completions` gateway is wired
- **Flow:** Agents → set active or **Start automating** → Chat uses that agent until changed

## Industry practices

1. Keep provider secrets on the server — only `VITE_*` public config in the browser
2. Prefer streaming chat with abort/cancel when wiring a real gateway
3. Sanitize any model-rendered HTML/markdown before mounting
4. Log traces/tokens on the backend; avoid raw PII in client logs
5. Version prompts/agents; gate production changes behind review
6. Support light and dark themes without gradient backgrounds
7. Keep visual brand anchored to `#2FA4D7`

## Architecture rules

- Extend `features/*` for product UX; keep `core` free of React UI
- Colocate `*.module.scss` with components
- Export public APIs from feature `index.ts` files
- Update this file when shipping user-facing capabilities

## Definition of done

- [ ] Light and dark themes verified
- [ ] Footer author link present and correct
- [ ] No gradient backgrounds introduced
- [ ] Brand accent remains `#2FA4D7`
- [ ] `npm run typecheck` and `npm run lint` pass

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```
