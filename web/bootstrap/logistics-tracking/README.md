# Wayline — Logistics tracking (Bootstrap)

Single-page marketing and ops demo for a fictional logistics control tower (**Harbor Freight Network**).

- **Stack:** Bootstrap 5.3, Bootstrap Icons, vanilla JS
- **Fonts:** Roboto (display), Lato (UI), Open Sans (body) via Google Fonts
- **Brand:** `#C4DFDF` with teal ink `#2A5C5C` for contrast (no gradients)
- **Prefix:** `lt-*`

## Run locally

From the repository root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/web/bootstrap/logistics-tracking/`

## Demo behavior

- Hero **Track** and load-board **Track** open a milestone timeline (sample IDs: `WL-884021`, `WL-883902`, `WL-883771`)
- Search and status filters on the shipment table
- **Export CSV** downloads visible rows only
- Contact form and toasts are browser-only (no backend)

## Author

**Subrahmanyam Poluru** — [polurus.com](https://polurus.com) · mail.polurus@gmail.com

Free for personal and commercial use.
