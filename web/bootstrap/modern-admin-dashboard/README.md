# Modern Admin Dashboard (Ecommerce)

A responsive ecommerce admin dashboard built with **Bootstrap 5**, **Bootstrap Icons**, **Chart.js**, and **Inter** (Google Fonts). Includes a full-height sidebar with mobile toggle, KPI cards, sales charts, orders table, inventory alerts, and more.

## Screenshot

<img width="3361" height="3007" alt="image" src="https://github.com/user-attachments/assets/f882b820-c193-443a-95a5-77a56008dce0" />


## Features

- **Ecommerce KPIs** — Revenue, orders, customers, and conversion rate cards with trend indicators
- **Sales overview chart** — Interactive line chart with 7D / 30D / 90D range switching
- **Traffic sources** — Doughnut chart with Organic, Paid Ads, Social, and Referral breakdown
- **Recent orders table** — Customer avatars, product names, amounts, and status badges (Paid, Shipped, Pending, Refunded)
- **Top products** — Best-seller list with sales counts and growth percentages
- **Inventory alerts** — Low-stock progress bars for restock visibility
- **Customer snapshot** — New customers, returning rate, AOV, and store rating
- **Activity feed** — Live-style store event timeline
- **Full-height sidebar** — Fixed navigation with brand, section labels, badges, and upgrade card
- **Mobile sidebar toggle** — Hamburger menu, overlay, Escape key, and auto-close on resize / link tap
- **Sticky topbar** — Search, notifications dropdown, and user menu
- **Google Fonts (Inter)** — Popular UI typeface loaded via Google Fonts CDN
- **Bootstrap Icons** — Consistent iconography across navigation and widgets
- **Responsive layout** — Desktop fixed sidebar; tablet/mobile off-canvas drawer
- **No build step** — Open `index.html` or serve locally; all libraries via CDN

## Tech Stack

| Technology | Version / Source | Purpose |
|---|---|---|
| HTML5 | — | Structure |
| CSS3 | Custom (`ftl-` prefix) | Layout, theme, responsive rules |
| Bootstrap | 5.3.3 (CDN) | Grid, dropdowns, utilities |
| Bootstrap Icons | 1.11.3 (CDN) | Icons |
| Google Fonts | Inter 400–800 | Typography |
| Chart.js | 4.4.1 (CDN) | Sales & traffic charts |
| JavaScript (ES6) | Vanilla | Sidebar + chart interactions |

## File Structure

```text
modern-admin-dashboard/
├── index.html                 # Dashboard page
├── README.md                  # Features & documentation
└── assets/
    ├── css/
    │   └── styles.css         # Theme, layout, responsive styles
    └── js/
        └── scripts.js         # Sidebar toggle & Chart.js setup
```

## Getting Started

### Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge)
- Optional: a local static server for best results

### Open the template

1. Clone or download this repository
2. Go to the template folder:

```bash
cd web/bootstrap/modern-admin-dashboard
```

3. Open `index.html` in your browser, or serve locally:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server
```

4. Visit [http://localhost:8000](http://localhost:8000)

## Layout

```text
┌──────────────┬────────────────────────────────────────┐
│   Sidebar    │  Topbar (search · alerts · user)       │
│  (full ht.)  ├────────────────────────────────────────┤
│              │  Page title + actions                  │
│  Dashboard   │  KPI cards                             │
│  Orders      │  Sales chart        │ Traffic sources  │
│  Products    │  Recent orders      │ Top products     │
│  Customers   │  Inventory · Customers · Activity      │
│  Analytics   │                                        │
└──────────────┴────────────────────────────────────────┘
```

### Breakpoints

| Viewport | Behavior |
|---|---|
| **≥ 992px (desktop)** | Fixed full-height sidebar; main content offset |
| **&lt; 992px (tablet/mobile)** | Sidebar off-canvas; hamburger opens overlay drawer |
| **&lt; 576px** | Search hidden; compact stats and stacked actions |

## Customization

### Brand colors

Edit CSS variables in `assets/css/styles.css`:

```css
:root {
  --ftl-primary: #D90000;
  --ftl-secondary: #007DCC;
  --ftl-sidebar-bg: #ffffff;
  --ftl-bg: #f1f5f9;
  --ftl-text: #0f172a;
  --ftl-muted: #64748b;
}
```

### Typography

Inter is loaded in `index.html`. To change the font, update the Google Fonts link and `--ftl-font` in CSS.

### Charts

Sample datasets live in `assets/js/scripts.js` (`salesData`). Replace with API data and call `createSalesChart(range)` after updates.

### Content

Replace demo names, order IDs, product labels, and Polurus avatar URL with your own store data and branding.

## CSS Class Prefix

Custom classes use the `ftl-` prefix (Free Template Library) to avoid clashes with Bootstrap:

- `.ftl-sidebar`, `.ftl-main`, `.ftl-topbar`
- `.ftl-stat-card`, `.ftl-panel`, `.ftl-table`
- `.ftl-status-*`, `.ftl-nav-link`, `.ftl-product-list`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Modern mobile browsers

## Notes

- This is a **frontend template** with static demo data
- Charts and sidebar interactions work client-side; wire APIs for production
- Inventory, orders, and notifications are UI placeholders

## Author

**Subrahmanyam Poluru**

- Website: [https://polurus.com](https://polurus.com)
- Email: [mail.spoluru@gmail.com](mailto:mail.spoluru@gmail.com)

Part of the Free Web & Mobile Templates collection.

## License

MIT — free to use and customize.
