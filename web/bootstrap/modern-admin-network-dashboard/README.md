# Modern Admin Network Dashboard (SecOps)

A responsive **network and security operations** dashboard for company SOC, network, and IT security teams. Built with **Bootstrap 5**, **Bootstrap Icons**, **Chart.js**, and **Inter** (Google Fonts). Admins and operators share the same platform views for threats, traffic, endpoints, firewall, and VPN.

## Features

- **Security operations overview** — Active threats, endpoints online, bandwidth, firewall blocks
- **Network traffic chart** — Inbound vs outbound with 1H / 24H / 7D ranges
- **Threat severity** — Critical / High / Medium / Low doughnut breakdown
- **Live security alerts** — Analyst-ready table with severity and status badges
- **Top talkers** — Highest bandwidth hosts and protocols
- **Endpoint health meters** — Agent coverage, patching, encryption, AV status
- **VPN & remote access** — Active sessions, failed logins, uptime snapshot
- **Ops activity feed** — Admin and analyst actions for audit visibility
- **Light sticky sidebar** — Full-height navigation; sticky on desktop, off-canvas on mobile
- **Role-ready shell** — Brand, environment pill, notifications, user menu for multi-user platforms
- **Google Fonts (Inter)** — Clean, widely used UI typeface
- **External CSS only** — No HTML inline styles; custom classes use `adm-nw-*` prefix
- **No build step** — CDN assets; open or serve locally

## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#F97300` | Brand, CTAs, active nav, inbound traffic |
| Secondary | `#F05941` | Alerts, critical severity, outbound traffic |
| Sidebar | `#FFFFFF` | Light sticky sidebar background |

## CSS Prefix: `adm-nw-*`

All custom classes use the `adm-nw-` prefix to avoid Bootstrap conflicts:

```text
.adm-nw-sidebar
.adm-nw-topbar
.adm-nw-stat-card
.adm-nw-panel
.adm-nw-table
.adm-nw-severity-critical
.adm-nw-nav-link-active
```

CSS variables are namespaced the same way (`--adm-nw-primary`, `--adm-nw-secondary`, etc.).

## Tech Stack

| Technology | Source | Purpose |
|---|---|---|
| HTML5 | — | Semantic layout |
| CSS3 | `assets/css/styles.css` | Theme & responsive layout |
| Bootstrap | 5.3.3 CDN | Grid, dropdowns, utilities |
| Bootstrap Icons | 1.11.3 CDN | Icons |
| Google Fonts | Inter 400–800 | Typography |
| Chart.js | 4.4.1 CDN | Traffic & threat charts |
| JavaScript | `assets/js/scripts.js` | Sidebar + charts |

## File Structure

```text
modern-admin-network-dashboard/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── scripts.js
```

## Getting Started

```bash
cd web/bootstrap/modern-admin-network-dashboard
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

Or open `index.html` directly in a modern browser.

## Layout

```text
┌────────────────┬──────────────────────────────────────┐
│ Sticky Sidebar │ Topbar (search · env · alerts · user)│
│  (light)       ├──────────────────────────────────────┤
│                │ Network Security Overview            │
│ Overview       │ KPI cards                            │
│ Threat Center  │ Traffic chart     │ Threat severity  │
│ Traffic        │ Live alerts       │ Top talkers      │
│ Endpoints      │ Endpoint · VPN · Ops activity        │
│ Firewall       │                                      │
│ VPN / Users    │                                      │
└────────────────┴──────────────────────────────────────┘
```

### Breakpoints

| Viewport | Behavior |
|---|---|
| **≥ 992px** | Sticky light sidebar in document flow |
| **&lt; 992px** | Off-canvas sidebar + overlay + hamburger |
| **&lt; 576px** | Compact KPIs; search hidden in topbar |

## Customization

### Colors

Edit variables in `assets/css/styles.css`:

```css
:root {
  --adm-nw-primary: #F97300;
  --adm-nw-secondary: #F05941;
  --adm-nw-sidebar-bg: #ffffff;
}
```

Update matching hex values in `assets/js/scripts.js` (`COLORS`) for charts.

### Content

Replace demo company name, hosts, IPs, alert IDs, and avatar URL with your tenant data. Wire Threat Center / Endpoints links to real routes or APIs.

### Roles

The shell supports shared admin/user views. Hide nav items or action buttons per role in your app layer; the template shows a SOC Admin persona by default.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Modern mobile browsers

## Notes

- Frontend template with static demo security/network data
- Charts and sidebar interactions are client-side only
- Integrate SIEM, NetFlow, EDR, or ticketing APIs for production

## Author

**Subrahmanyam Poluru**

- Website: [https://polurus.com](https://polurus.com)
- Email: [mail.spoluru@gmail.com](mailto:mail.spoluru@gmail.com)

Part of the Free Web & Mobile Templates collection.

## License

MIT — free to use and customize.
