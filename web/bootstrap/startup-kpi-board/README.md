# Startup KPI Board — Clearlane

A polished, responsive **founder metrics / startup KPI dashboard** template for board updates, fundraising packs, and operator reporting. Built with **HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons**, and **Plus Jakarta Sans**.

Premium SaaS presentation—not a generic admin shell. No heavy chart libraries; visuals use Bootstrap progress bars, CSS sparklines, and lightweight JS.

## Screenshot

<img width="2984" height="8374" alt="image" src="https://github.com/user-attachments/assets/40277332-677d-4818-a4c8-b3f2f4898696" />



## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#008BFF` | Accents, CTAs, growth signals |
| Ink | `#07111D` | Dark command header, footer, headings |
| Canvas | `#EEF2F6` | Page background |

**Layout:** command-board style — dark header strip, overlapping KPI rail, bento growth grid, horizontal milestone steps, left-rail brief cards. Solid colors only.

Custom classes use the `skb-` prefix (e.g. `.skb-hero`, `.skb-kpi`).

## Features

- Dark sticky command navbar
- Full-bleed ink hero with reporting toolbar
- KPI signal strip with left-accent metric tiles
- Monthly / quarterly KPI swap (live counter + trend/note updates)
- Bento growth layout with CSS sparklines
- Fundraising card + numbered milestone steps
- Segment table filter
- Runway calculator (cash ÷ burn scenario)
- Trailing finance table with CSV export
- Wins / risks / asks brief panels — asks checklist persists in `localStorage`
- Backers and advisor rail
- Share actions: copy board link, print pack
- Skip link, back-to-top, toast feedback
- Double-click any KPI tile to copy its value
- Print-friendly stylesheet
- Animated counters, progress bars, period chips
- Plus Jakarta Sans + Bootstrap 5 + Icons

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
4. Add `data-monthly` / `data-quarterly` (and matching trend/note attrs) for period swap.  
5. Set progress widths with `data-progress` on `.progress-bar`.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.spoluru@gmail.com
