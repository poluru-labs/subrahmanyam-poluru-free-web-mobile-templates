# Poluru DC — Enterprise Dashboard

Data center operations dashboard built with **Vite**, **React**, **React Router**, and **SCSS**, using [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

## Features

- Full-height sticky sidebar navigation
- Light theme with brand primary `#30AFFF`
- Light page and panel animations
- Roboto + Roboto Mono (Google Fonts)
- Routes: Overview, Facilities, Infrastructure, Power & Cooling, Alerts, Settings
- Global search across facilities, hosts, and alerts
- Notification drawer with acknowledge actions
- Interactive alert filtering and acknowledge-all
- Power & cooling telemetry (circuit load, UPS, CHW loops)
- Upcoming maintenance windows on Overview

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
