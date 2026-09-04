# Forge Athletic — Gym Dashboard

A responsive **Bootstrap 5** gym operations dashboard for club managers: members, trainers, classes, front-desk check-in, and memberships. Built with **Bootstrap Icons**, **Barlow** (Google Fonts), and lightweight vanilla JS.

## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#FF5A5A` | CTAs, active nav, highlights |
| Ink | `#161311` | Sidebar, headings |
| Canvas | `#F3EFE8` | Page background |
| Surface | `#fffcf8` | Cards |

Custom classes use the `gxd-` prefix (e.g. `.gxd-sidebar`, `.gxd-card`).

## Pages

| File | Description |
|---|---|
| `index.html` | Club snapshot: KPIs, today’s classes, floor occupancy, alerts, recent check-ins |
| `members.html` | Filterable member directory with check-in / freeze actions |
| `trainers.html` | Coach roster and today’s floor status |
| `classes.html` | Schedule board with book, waitlist, and cancel |
| `checkins.html` | Front-desk check-in form and today’s log |
| `memberships.html` | Plans, dues, and holds |
| `about.html` | Template story and tokens |
| `contact.html` | Ops contact form |
| `documentation.html` | In-template documentation |

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
├── index.html
├── members.html
├── trainers.html
├── classes.html
├── checkins.html
├── memberships.html
├── about.html
├── contact.html
├── documentation.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Getting Started

```bash
cd web/bootstrap/gym-dashboard
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Customization

1. Update club name, staff, and sample members in the HTML pages.
2. Change theme tokens in `assets/css/style.css` (`:root`).
3. Keep `data-plan` / `data-status` attributes aligned with filter `<select>` values.
4. Point forms at your backend when leaving the static demo.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
