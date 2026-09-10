# Stride — Fitness Coach Dashboard

A clean, responsive **trainer dashboard** for client workouts, nutrition plans, progress charts, and sessions. Built for coaching desks, studio floors, and private-practice demos.

**Desk:** Stride · Poluru Strength  
**Brand:** `#05339C`  
**Prefix:** `st-*`  
**Coach:** Subbu Poluru, Head coach

Built with **HTML, CSS, JavaScript, Tailwind CSS (browser v4), Bootstrap Icons**, Roboto, and Open Sans.

## Template Overview

| Property | Value |
|---|---|
| Template Name | Fitness Coach Dashboard (Stride) |
| Category | Health, Dashboard |
| Framework | Tailwind CSS |
| Interaction | Vanilla JavaScript |
| License | Free to use and customize |

## Features

- Sticky navy header with a Warm-up → Strength → Condition → Recover rail
- Client switcher (Leela, Kavya, Ishaan) and adherence / session meter
- Coach desk: clients, adherence, next session, calorie target
- Workout cards with sets and demo logging
- Nutrition plates plus protein / carb / fat bars
- Progress: weekly volume, weight sparkline, adherence ring
- Session book with check-in and move (demo)
- Hash routing, top search, reduced-motion handling

## Views

1. **Overview** — today’s floor and desk notes
2. **Workouts** — squat wave, tempo run, press day
3. **Nutrition** — plates and macros
4. **Progress** — volume, weight, adherence
5. **Sessions** — today and the rest of the week

## File Structure

```text
fitness-coach-dashboard/
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
cd web/tailwind/fitness-coach-dashboard
python3 -m http.server 8013
```

Open [http://localhost:8013](http://localhost:8013) in your browser.

## Customization

1. Replace the coach name, clients, and session times.
2. Update lifts, plates, and chart values.
3. Connect log / check-in / book actions to your coaching app.
4. Adjust colors in `assets/css/style.css` and the Tailwind `@theme` block (`--st-primary` / `--color-brand` is `#05339C`).

## Brand

| Token | Value | Use |
|---|---|---|
| Primary | `#05339C` | Header, buttons, rail |
| Dark | `#03256F` | Button hover |
| Deep | `#021A4F` | Sidebar, meter |
| Soft | `#E6EEF8` | Chips, progress track |
| Canvas | `#F3F6FB` | Page background |

Demo people include **Subbu Poluru** (coach), Leela Poluru, Kavya Poluru, Ishaan Poluru, Maya Poluru, Priya Poluru, Rohan Poluru, Asha Poluru, Tara Poluru, Nila Poluru, Anika Poluru, Dev Poluru, and Kiran Poluru.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
