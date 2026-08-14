# Startup KPI Board — Clearlane

A polished, responsive **founder metrics / startup KPI dashboard** template for board updates, fundraising packs, and operator reporting. Built with **HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons**, and **Manrope**.

Premium SaaS presentation—not a generic admin shell. No heavy chart libraries; visuals use Bootstrap progress bars, CSS sparklines, and lightweight JS.

## Screenshot

<img width="2984" height="8374" alt="image" src="https://github.com/user-attachments/assets/40277332-677d-4818-a4c8-b3f2f4898696" />



## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#008BFF` | Accents, CTAs, growth signals |
| Ink | `#0B1F33` | Headings, footer, secondary emphasis |
| Soft bg | `#F3F7FB` | Section contrast |

Solid colors only — no brand-color gradients.

Custom classes use the `skb-` prefix (e.g. `.skb-hero`, `.skb-kpi`).

## Features

- Sticky responsive navbar with smooth scrolling and active section state
- Hero with startup brand, reporting period chips, monthly/quarterly toggle
- KPI cards: MRR, ARR, CAC, LTV, churn, customers, burn, runway
- Animated counters and scroll-triggered progress bars
- Growth sparklines (CSS) + revenue / retention panels
- Fundraising progress with milestone tracker
- Customer acquisition channels and segment table
- Burn / runway / expense summary + trailing six-month table
- Product roadmap, shipping milestones, hiring
- Investor wins / risks / asks + update timeline
- Backers and advisor cards
- Share CTA + polished footer

## File Structure

```text
startup-kpi-board/
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
cd web/bootstrap/startup-kpi-board
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Customization

1. Update company name, tagline, and demo metrics in `index.html`.  
2. Adjust CSS variables in `assets/css/style.css` (`:root`).  
3. Tweak counter targets via `data-target` / `data-decimals` on `.skb-counter`.  
4. Set progress widths with `data-progress` on `.progress-bar`.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.spoluru@gmail.com
