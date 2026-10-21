# Simmerbox — Recipe sharing community

Clean, gradient-free recipe community on a light background. Brand color **#CA6180**. Fonts: Roboto (headings), Lato (UI), Open Sans (body).

## Preview

From the repository root:

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/web/tailwind/recipe-sharing-community/`

## Customize

- `index.html` — recipes, cooks, and page structure
- `assets/css/style.css` — layout helpers (`rs-*` prefix)
- `assets/js/script.js` — filters, saved recipes, demo share notes (localStorage)
- `assets/favicon.svg` — tab icon

No build step. Tailwind v4 loads from CDN; Bootstrap Icons and Google Fonts load from CDN.

## Demo behavior

Simmerbox is fictional. Saved recipes and share notes stay in this browser only. No accounts, uploads, or payments.

## Author

[Subrahmanyam Poluru](https://polurus.com) · mail.polurus@gmail.com
