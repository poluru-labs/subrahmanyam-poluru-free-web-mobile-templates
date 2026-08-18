# Poluru DC — Enterprise Dashboard

Data center operations dashboard built with **Vite**, **React**, **React Router**, and **SCSS**, using [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

## Features

- Full-height sticky sidebar navigation with mobile drawer
- Light / dark theme toggle (header + Settings)
- Skip link, live ops clock, and `/` (or ⌘/Ctrl+K) to focus global search
- Light page and panel animations
- Roboto + Roboto Mono (Google Fonts)
- Routes: Overview, Facilities, Infrastructure, Power & Cooling, Alerts, Settings
- Global search across facilities, hosts, and alerts
- Notification drawer with acknowledge / acknowledge-all
- Interactive alert filtering, search, investigate modal, CSV export, and persistent acknowledgements
- Facility status filters, detail modal, and CSV export
- Infrastructure host search, refresh stamp, and CSV export
- Power & cooling site filter, live telemetry refresh, and CSV export
- Settings persisted to `localStorage`
- Overview fleet summary export and click-through facility cards

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
