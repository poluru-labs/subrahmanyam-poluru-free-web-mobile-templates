# Jobs Raja

React hiring dashboard for Poluru Cloud. Theme color is `#2A1A5E`. Built with Vite, Bootstrap, and [`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).

Signed in as **Kavya Poluru**, talent lead.

## Run

Requires Node.js 20+.

```bash
cd enterprise-jobportal-dashboard
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5175

| Script | Description |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Routes

| Hash | Page |
| --- | --- |
| `#/overview` | Open roles, inbound, funnel, alerts |
| `#/jobs` | Marketplace roles |
| `#/job/:id` | Role workspace |
| `#/candidates` | Talent pool and interview scheduling |
| `#/pipeline` | Applied → offer board |
| `#/employers` | Company seats and departments |
| `#/settings` | Profile, alerts, CLI |

## Stack

- React 18
- Vite
- Bootstrap 5 + Bootstrap Icons
- `@poluru-labs/enterprise-design-system-react`
