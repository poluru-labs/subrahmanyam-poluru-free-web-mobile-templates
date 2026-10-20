# Parkline — Property management portal

Clean, gradient-free property portal on a light background. Brand color **#C2D099**. Fonts: Roboto (headings), Lato (UI), Open Sans (body).

## Preview

From the repository root:

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/web/tailwind/property-management-portal/`

## Customize

- `index.html` — copy, properties, metrics, and structure
- `assets/css/style.css` — layout helpers (`pm-*` prefix)
- `assets/js/script.js` — filters, watchlist, demo maintenance tickets (localStorage)
- `assets/favicon.svg` — tab icon

No build step. Tailwind v4 loads from CDN; Bootstrap Icons and Google Fonts load from CDN.

## Demo behavior

Parkline is fictional. Watchlist and maintenance tickets stay in this browser only. No live rent collection, email, or payments.

## Author

[Subrahmanyam Poluru](https://polurus.com) · mail.polurus@gmail.com
