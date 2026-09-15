# Poluru Studio

A standalone responsive Bootstrap 5 website implemented from `prompt.md`.

## Run

From the parent `codex-bootstrap` directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/creative-portfolio/. Pages have shareable hash URLs, such as `#/home`. No package install or build is needed. Each project keeps its own assets and can be served independently.

## Features

12 linked project case studies; discipline/search filters with remembered layout; photography lightbox; six complete journal articles; services, team, inquiry preview, studio-profile download, privacy, and 404.

## Technology and accessibility

Bootstrap 5.3.3, Bootstrap Icons 1.11.3, and Chart.js 4.4.8 are bundled locally. Lato/Roboto and Open Sans load from Google Fonts, with system fallbacks. The design uses solid colors, responsive layouts, visible focus, native dialogs, reduced-motion support, and accessible chart data tables. Local photograph sources and usage notes are in `assets/images/CREDITS.md` where applicable.

## Data and service boundaries

All people, firms, projects, events, and records are fictional examples. No email, payment, booking, exchange, or form submission service is connected. Public contact forms are honest previews and do not save personal information. Dashboard edits and saved preferences remain in this browser; export a backup before a confirmed reset. Crypto prices are explicitly sample data. Calculator outputs are illustrative USD estimates.

Only the five requested projects were edited. The original prompt is retained. The crypto prompt ends mid-sentence; the implementation follows the available complete requirements.

## Checks

JavaScript syntax, local asset references, route rendering, linked detail URLs, validation, and core interactions are checked. The integration test uses jsdom and a Chart.js adapter; it is not a screenshot or visual browser test.

To run after making jsdom available in your development environment:

```sh
node tests/integration.cjs
```

Or point to an existing installation with `SITE_TEST_JSDOM=/absolute/path/to/jsdom node tests/integration.cjs`. There is no jsdom dependency in the delivered browser application.

