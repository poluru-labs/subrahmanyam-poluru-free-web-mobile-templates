# Founder Metrics Dashboard — Blvd

A polished, responsive **founder / investor metrics dashboard** template for board updates, fundraising packs, and operator reporting. Built with **HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons**, and **Manrope** (Google Fonts).

Premium SaaS presentation—not a generic admin shell. No heavy chart libraries; visuals use Bootstrap progress bars, CSS sparklines, and lightweight JS.

## Screenshot

<img width="2631" height="9495" alt="image" src="https://github.com/user-attachments/assets/a5fbbf55-ca25-4c95-91be-50f055f4ac3e" />


## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#0D63A5` | Brand, headings, primary CTAs |
| Secondary | `#21E6C1` | Growth signals, secondary emphasis |
| Amber | `#C27803` | Fundraising / caution highlights |
| Soft bg | `#F2F5F7` | Section contrast |

Solid colors only — no brand-color gradients.

Custom classes use the `fm-` prefix (e.g. `.fm-hero`, `.fm-kpi-card`).

## Features

- Sticky responsive navbar with smooth scrolling and active section state
- Skip-to-content link and back-to-top control
- Hero summary with company brand, reporting period chips, monthly/quarterly toggle
- Period toggle swaps live KPI values, trends, and notes
- Copy KPI summary, download text report, print board view
- Share Update modal with editable draft + email handoff
- KPI overview cards (MRR, ARR, customers, churn, CAC, LTV, burn, runway) with trend badges
- Animated counters for headline values (vanilla JS)
- Growth blocks with CSS sparklines and scroll-triggered progress bars
- Fundraising progress panel with lead status and milestone timeline
- Revenue & expense comparison cards + trailing six-month table + CSV export
- Segment table search/filter
- Acquisition channels, trial-to-paid, and market mix
- Product roadmap, shipping milestones, hiring, wins & blockers
- Investor update cards + interactive asks checklist (localStorage)
- Runway calculator with cash / burn scenario modeling
- Board pack shortcut tools and toast feedback
- Scroll-reveal animations with reduced-motion support
- Print-friendly styles for board packs

## File Structure

```text
founder-metrics-dashboard-app/
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
cd web/bootstrap/founder-metrics-dashboard-app
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Sections

1. Hero — Blvd brand, tagline, period controls, CTAs  
2. KPIs — core startup metrics with trends  
3. Growth — users, revenue, conversion, retention, expansion  
4. Fundraising — Series A target, commitments, milestones  
5. Finance — revenue, OpEx, margin, burn + table  
6. Customers — channels, segments, conversion, regions  
7. Product & team — roadmap, shipping, hiring, wins/blockers  
8. Investor update — highlights, risks, asks checklist, timeline  
9. Backers — investor badges + advisors  
10. Tools — runway calculator + board pack shortcuts  
11. CTA — board / fundraising call-to-action  
12. Footer — contact, nav, copyright  

## Customization

1. Update company name, tagline, and demo metrics in `index.html`.  
2. Adjust CSS variables in `assets/css/style.css` (`:root`).  
3. Tweak counter targets via `data-target` / `data-decimals` on `.fm-counter`.  
4. Set progress widths with `data-progress` on `.progress-bar`.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.spoluru@gmail.com
