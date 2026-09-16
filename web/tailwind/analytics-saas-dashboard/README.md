# Gridline — Analytics / BI Dashboard

A responsive **analytics desk** for reports, saved filters, workspace drill-downs, and CSV exports. Built for SaaS finance reviews, board packs, and warehouse demos.

**Desk:** Gridline · Harbor North  
**Brand:** `#C45C26`  
**Prefix:** `gl-*`  
**Analyst:** Meera Poluru, Harbor & Co.

Built with **HTML, CSS, JavaScript, Tailwind CSS (browser v4), Bootstrap Icons**, Roboto, and Open Sans.

## Template Overview

| Property | Value |
|---|---|
| Template Name | Analytics SaaS Dashboard (Gridline) |
| Category | Analytics, BI, Dashboard |
| Framework | Tailwind CSS |
| Interaction | Vanilla JavaScript |
| License | Free to use and customize |

## Features

- Sticky sidebar with mobile drawer and skip link
- Date-range chips (7d, 30d, Q3, FY26) that rewrite KPIs and the bar chart
- Overview: revenue, paying workspaces, net new MRR, logo churn, office mix, funnel, flags, seat heatmap
- Report library with Board / Growth / Finance / Product filters and search
- Explore fact table with office, plan, channel, and text filters
- Row drill-down dialog (plan, seats, MRR, last invoice)
- Export jobs list with retry / download toasts
- Warehouse sources with freshness notes
- Hash routing, CSV download of visible rows, reduced-motion handling

## Views

1. **Overview** — Harbor North close, KPIs, revenue bars, office mix, trial funnel
2. **Reports** — eight saved packs (board pack, funnel, seat mix, cohorts, NPS, expansion, churn, feature usage)
3. **Explore** — paying workspaces; click a row to drill down
4. **Exports** — scheduled PDF/CSV/XLSX jobs
5. **Sources** — Snowflake, Segment, Stripe, HubSpot

## File Structure

```text
analytics-saas-dashboard/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Getting Started

```bash
cd web/tailwind/analytics-saas-dashboard
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in the browser.

## Customization

1. Replace Harbor North, office names, and the analyst line.
2. Swap workspace rows, MRR, and report owners.
3. Point Run / Export / Refresh actions at your warehouse.
4. Adjust colors in `assets/css/style.css` and the Tailwind `@theme` block (`--gl-primary` / `--color-brand` is `#C45C26`).

## Brand

| Token | Value | Use |
|---|---|---|
| Primary | `#C45C26` | Buttons, peak bars, badges |
| Deep | `#6B2E10` | Heatmap peak |
| Soft | `#F4E0D2` | Tracks, chips |
| Night | `#1C1914` | Sidebar, focus KPI |
| Canvas | `#F4EFE8` | Page background |

Demo people include **Meera Poluru** (analyst), Kavya Poluru, Kiran Poluru, Leela Poluru, Ravi Poluru, Nila Poluru, Ishaan Poluru, Tara Poluru, Priya Poluru, and Subbu Poluru.

Sample workspaces: Ridge Medical, Cedar Payroll, Northline Freight, Stride Athletics, Ashbury Academy, Alder Hall, Mira Clinics, Quill Press, Kavya Studio, Oak & Thread.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
