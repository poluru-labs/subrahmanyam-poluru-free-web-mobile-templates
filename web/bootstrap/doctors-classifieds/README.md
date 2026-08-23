# DocBoard — Doctors Classifieds

A modern, multi-page **doctors classifieds marketplace** template for physicians, clinics, hospitals, recruiters, and medical suppliers. Built with **Bootstrap 5**, **Bootstrap Icons**, **Vite**, and **`@poluru-labs/enterprise-design-system-wc`**.

## Brand

| Token | Value | Use |
|---|---|---|
| Primary | `#0F766E` | Teal CTAs, links, brand mark |
| Soft blue | `#EFF6FF` / `#2563EB` | Accents and info surfaces |
| Green | `#15803D` | Success / verified cues |
| Canvas | `#F8FAFC` | Light page background |
| Surface | `#FFFFFF` | Cards and header |

Custom classes use the `dc-` prefix (e.g. `.dc-hero`, `.dc-listing`, `.dc-card`). Typography: **DM Sans**.

## Pages

| File | Description |
|---|---|
| `index.html` | Home: hero search, categories, listings, employers, how-it-works, plans, testimonials, blog, newsletter |
| `about.html` | Mission and marketplace story |
| `listings.html` | Filterable classifieds grid |
| `listing-detail.html` | Detail view with contact sidebar and related ads |
| `post-classified.html` | Create listing form (EDS inputs/selects) |
| `categories.html` | Category directory |
| `jobs.html` | Doctors jobs & locum |
| `clinics.html` | Clinics & practice opportunities |
| `equipment.html` | Equipment for sale |
| `cme-events.html` | CME & events |
| `pricing.html` | Membership / posting plans |
| `blog.html` | News & insights |
| `contact.html` | Contact form |
| `login.html` / `register.html` | Auth screens |
| `dashboard.html` | Manage ads, messages, saved listings |
| `faq.html` | FAQ accordion |
| `terms.html` / `privacy.html` | Legal pages |

## Features

- Sticky header, breadcrumbs on inner pages, skip link, back-to-top
- Listing filters (specialty, location, category, type, search)
- Featured / Urgent / New badges; save, share, and contact actions
- EDS web components: buttons, cards, inputs, selects, badges, alerts, tabs, modal, pagination, avatars, empty state
- Toast feedback for forms, newsletter, and dashboard actions
- Mobile-first Bootstrap grid and utilities

## Getting started

```bash
cd web/bootstrap/doctors-classifieds
npm install
npm run dev
```

Open the URL Vite prints (default [http://localhost:5174](http://localhost:5174)).

```bash
npm run build    # production build → dist/
npm run preview  # preview dist/
```

## File structure

```text
doctors-classifieds/
├── index.html … privacy.html
├── package.json
├── vite.config.js
├── README.md
└── assets/
    ├── css/style.css
    └── js/main.js
```

## Customization

1. Update brand copy and demo listings in the HTML pages.
2. Adjust theme tokens in `assets/css/style.css` (`:root`).
3. Keep listing `data-*` attributes aligned with filter `<select>` values.
4. Point forms and contact actions at your backend when leaving the static demo.

## Author

**Subrahmanyam Poluru**  
[polurus.com](https://polurus.com) · [mail.polurus@gmail.com](mailto:mail.polurus@gmail.com)

Free for personal and commercial use.
