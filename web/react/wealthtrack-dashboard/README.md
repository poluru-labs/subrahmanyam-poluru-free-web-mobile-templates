# WealthTrack Dashboard

Personal wealth dashboard built with **Vite**, **React**, **TypeScript**, **React Router**, **Bootstrap 5**, **Bootstrap Icons**, and **Plus Jakarta Sans**.

Track net worth, portfolio holdings, accounts, transactions, goals, budgets, and a watchlist — all powered by mock data.

## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#1D4ED8` | Buttons, links, active nav, accents |
| Primary dark | `#1E40AF` | Hover states |
| Ink | `#0F172A` | Body text |
| Surface | `#FFFFFF` | Sidebar, cards, header |
| Canvas | `#F1F5F9` | Page background |

Clean light UI — no gradients. Blue is reserved for interactive accents.

## Pages

| Route | Page |
|---|---|
| `/` | Overview — KPIs, net-worth sparkline, allocation, activity |
| `/portfolio` | Holdings table with search, class filter, CSV export |
| `/accounts` | Linked accounts with sync action |
| `/transactions` | Transaction search, type filter, CSV export |
| `/goals` | Savings goal progress |
| `/budgets` | Category budgets vs spend |
| `/watchlist` | Editable watchlist (localStorage) |
| `/reports` | Cashflow / allocation report + export |
| `/settings` | Profile & alerts (localStorage) |

## Features

- Sticky light sidebar with mobile drawer toggle
- Blue buttons, links, and active states (no gradients)
- Global page search (`/` shortcut)
- Toast feedback for sync / export / watchlist actions
- Skip link and live clock in the header
- Mock data for all screens
- Responsive Bootstrap grid layouts

## Setup

```bash
cd web/react/wealthtrack-dashboard
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
