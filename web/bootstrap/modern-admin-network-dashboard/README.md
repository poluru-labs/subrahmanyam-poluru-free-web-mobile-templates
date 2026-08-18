# Modern Admin Network Dashboard (SecOps)

A responsive **network and security operations** dashboard for company SOC, network, and IT security teams. Built with **Bootstrap 5**, **Bootstrap Icons**, **Chart.js**, and **Inter** (Google Fonts).

Admins and operators share the same platform views for threats, traffic, endpoints, firewall, devices, VPN, DNS, users, reports, and settings.

## Screenshot

<img width="3361" height="3017" alt="image" src="https://github.com/user-attachments/assets/693dafee-e78a-4310-a9a2-c88ebf7a5e0a" />


## Features

- **11-page platform** — Overview plus dedicated ops, network, and platform screens
- **Security operations overview** — Active threats, endpoints online, bandwidth, firewall blocks
- **Animated KPI counters** — Numeric stats animate into view (respects reduced motion)
- **Threat Center** — Working search, severity/status filters, triage tabs, assign/investigate actions
- **Network traffic** — Inbound vs outbound charts (1H / 24H / 7D) and protocol mix
- **Live security alerts** — Overview table with search + severity chip filters
- **Endpoints** — Filter by OS/status; isolate / release / ping demo actions
- **Firewall** — Policy rules, hit counts, and recent deny activity
- **Devices** — Searchable/filterable inventory cards by type and site
- **VPN Access** — Active sessions, failed logins, gateway capacity
- **DNS & Proxy** — Query decisions, sinkholes, resolver health
- **Users & Roles** — Search + role filter for Admin / Analyst / Viewer access
- **Reports** — Scheduled and on-demand exports with CSV download of visible tables
- **Settings** — Tenant profile, integrations, MFA; Save persists to `localStorage`
- **New incident modal** — Create Incident / New Incident opens a validated demo form
- **Copy to clipboard** — Click alert IDs and IP codes to copy
- **Notifications** — Mark all read clears badge dots for the session
- **Keyboard search** — Press `/` to focus the topbar search
- **Skip link, live clock, back to top** — Accessibility and operator orientation helpers
- **Light sticky sidebar** — Sticky on desktop; off-canvas toggle on mobile
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
| JavaScript | `assets/js/scripts.js` | Sidebar, charts, filters, triage, export, toasts |

## Pages

| Page | File | Purpose |
|---|---|---|
| Overview | `index.html` | SOC homepage with KPIs, charts, alerts |
| Threat Center | `threats.html` | Alert triage, ownership, severity filters |
| Traffic | `traffic.html` | Throughput, protocol mix, top talkers |
| Endpoints | `endpoints.html` | Managed devices and posture actions |
| Firewall | `firewall.html` | Policy rules and recent blocks |
| Devices | `devices.html` | Routers, switches, collectors inventory |
| VPN Access | `vpn.html` | Sessions and auth failures |
| DNS & Proxy | `dns.html` | DNS decisions and resolver health |
| Users & Roles | `users.html` | Admin / Analyst / Viewer access |
| Reports | `reports.html` | Scheduled and on-demand exports |
| Settings | `settings.html` | Tenant, integrations, security toggles |

## File Structure

```text
modern-admin-network-dashboard/
├── index.html
├── threats.html
├── traffic.html
├── endpoints.html
├── firewall.html
├── devices.html
├── vpn.html
├── dns.html
├── users.html
├── reports.html
├── settings.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── scripts.js
```

## Getting Started

### Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge)
- Optional: a local static server

### Run locally

```bash
cd web/bootstrap/modern-admin-network-dashboard
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

Or open `index.html` directly in a browser.

## Layout

```text
┌────────────────┬──────────────────────────────────────┐
│ Sticky Sidebar │ Topbar (search · env · alerts · user)│
│  (light)       ├──────────────────────────────────────┤
│ Overview       │ Page title + actions                 │
│ Threat Center  │ KPI cards / filters / tables         │
│ Traffic        │ Charts, panels, device cards         │
│ Endpoints      │                                      │
│ Firewall       │                                      │
│ Devices        │                                      │
│ VPN / DNS      │                                      │
│ Users / Reports│                                      │
│ Settings       │                                      │
└────────────────┴──────────────────────────────────────┘
```

### Breakpoints

| Viewport | Behavior |
|---|---|
| **≥ 992px** | Sticky light sidebar in document flow |
| **&lt; 992px** | Off-canvas sidebar + overlay + hamburger |
| **&lt; 576px** | Compact KPIs; search hidden in topbar |

## Demo Users

Template sample people use these name variants:

- Subrahmanyam Poluru
- S Poluru
- Poluru S
- Poluru Subrahmanyam

Replace them with your real operators when customizing.

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

Replace demo company name (Acme Corp), hosts, IPs, alert IDs, and avatar URL with your tenant data. Wire Threat Center / Endpoints / Firewall actions to real APIs.

### Roles

The shell supports shared admin/user views. Hide nav items or action buttons per role in your app layer. The template defaults to a **SOC Admin** persona.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Modern mobile browsers

## Notes

- Frontend template with static demo security/network data
- Filters, triage actions, CSV export, incident modal, and settings save run client-side
- Settings are stored in `localStorage` under `adm-nw-settings`
- Integrate SIEM, NetFlow, EDR, or ticketing APIs for production use

## Author

**Subrahmanyam Poluru**

- Website: [https://polurus.com](https://polurus.com)
- Email: [mail.spoluru@gmail.com](mailto:mail.spoluru@gmail.com)

Part of the Free Web & Mobile Templates collection.

## License

MIT — free to use and customize.
