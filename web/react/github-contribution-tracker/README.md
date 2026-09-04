# Contribly · GitHub Contribution Tracker

Open source contribution workspace built with **React**, **Vite**, **Tailwind CSS**, **Bootstrap Icons**, and a Node mock GitHub API.

Primary brand color: `#8140DC`.

## Setup

```bash
npm install
npm run dev
```

Run the frontend and mock API together with `npm run dev:all`. The API listens on `http://localhost:8787` and Vite proxies `/api` requests to it.

Open the URL Vite prints (default `http://localhost:5173`).

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run api` | Start the Node mock GitHub API |
| `npm run dev:all` | Start frontend and API together |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Mock API

Implemented endpoints: `GET /api/github/me`, `GET /api/discover/issues`, `GET /api/repos`, `GET /api/contributions`, `GET /api/contributions/:id`, `POST /api/watchlist`, `DELETE /api/watchlist/:owner/:repo`, `POST /api/sync`, `GET /api/evidence`, `POST /api/evidence`, and `GET /api/evidence/export`.
