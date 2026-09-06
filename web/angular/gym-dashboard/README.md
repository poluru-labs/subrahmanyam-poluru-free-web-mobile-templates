# Forge Athletic — Gym Dashboard (Angular)

A responsive **Angular** gym operations dashboard for club managers: members, trainers, classes, front-desk check-in, and memberships. Built with **Angular**, **Bootstrap 5**, **Bootstrap Icons**, and **Barlow**.

## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#FF5A5A` | CTAs, active nav, highlights |
| Ink | `#161311` | Sidebar, headings |
| Canvas | `#F3EFE8` | Page background |
| Surface | `#fffcf8` | Cards |

Custom classes use the `gxd-` prefix (e.g. `.gxd-sidebar`, `.gxd-card`).

## Routes

| Path | Description |
|---|---|
| `/` | Club snapshot: KPIs, today’s classes, floor occupancy, alerts, recent check-ins |
| `/members` | Filterable member directory with check-in / freeze actions |
| `/trainers` | Coach roster and today’s floor status |
| `/classes` | Schedule board with book, waitlist, and cancel |
| `/checkins` | Front-desk check-in form and today’s log |
| `/memberships` | Plans, dues, and holds |
| `/about` | Template story and tokens |
| `/docs` | In-template documentation |
| `/contact` | Ops contact form |

## Features

- Fixed dark sidebar on desktop; overlay drawer on mobile
- Skip link, live clock on the dashboard, notification indicator
- Member / trainer / class search and filters
- Check-in form validation with toast feedback
- Class book / waitlist / cancel toasts
- Membership freeze reminders
- Empty states when filters match nothing

## File Structure

```text
gym-dashboard/
├── public/favicon.svg
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.config.ts
│       ├── app.routes.ts
│       ├── core/
│       │   ├── data.ts
│       │   └── toast.service.ts
│       └── pages/
│           ├── dashboard.page.ts
│           ├── members.page.ts
│           ├── trainers.page.ts
│           ├── classes.page.ts
│           ├── checkins.page.ts
│           ├── memberships.page.ts
│           ├── about.page.ts
│           ├── docs.page.ts
│           └── contact.page.ts
├── angular.json
├── package.json
└── README.md
```

## Setup

```bash
cd web/angular/gym-dashboard
npm install
npm start
```

Open the URL the CLI prints (default [http://localhost:4200](http://localhost:4200)).

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular dev server |
| `npm run dev` | Dev server with the browser open |
| `npm run build` | Production build |
| `npm run preview` | Serve the production configuration |

## Customization

1. Update club name, staff, and sample members in `src/app/core/data.ts`.
2. Change theme tokens in `src/styles.css` (`:root`).
3. Keep plan / status / studio values aligned with the filter selects.
4. Point forms at your backend when leaving the static demo.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
