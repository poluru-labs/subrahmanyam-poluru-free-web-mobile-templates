# MentorLoop — Mentorship Network Portal

A clean, responsive **Bootstrap 5** template for matching mentors and mentees, scheduling sessions, and collecting outcomes. Built with **Bootstrap Icons**, **Outfit** (Google Fonts), and lightweight vanilla JS.

## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#0F766E` | Teal brand, CTAs, links |
| Accent | `#C2410C` | Emphasis actions |
| Ink | `#0B1220` | Headers, footer, body text |
| Canvas | `#F1F5F9` | Page background |

Custom classes use the `mlp-` prefix (e.g. `.mlp-hero`, `.mlp-panel`).

## Pages

| File | Description |
|---|---|
| `index.html` | Brand-led home: hero, how-it-works, features, featured mentors |
| `mentors.html` | Filterable mentor directory |
| `mentees.html` | Filterable mentee directory |
| `matching.html` | Multi-step matching wizard |
| `sessions.html` | Session request form + upcoming board |
| `outcomes.html` | Outcome logging with draft autosave |
| `about.html` | Template story and stack |
| `contact.html` | Contact form |
| `documentation.html` | In-template documentation |

## Features

- Sticky navbar with **mobile toggle** (Bootstrap collapse)
- Responsive layouts across desktop and phone
- Mentor / mentee search and skill filters
- Matching wizard with toast feedback
- Session booking validation + confirm/remind actions
- Outcomes form with `localStorage` draft persistence
- Skip link, back-to-top, scroll reveal
- Documentation page with sticky section nav

## File Structure

```text
mentorloop/
├── index.html
├── mentors.html
├── mentees.html
├── matching.html
├── sessions.html
├── outcomes.html
├── about.html
├── contact.html
├── documentation.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Getting Started

```bash
cd web/bootstrap/mentorloop
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Customization

1. Update brand name, copy, and demo profiles in the HTML pages.  
2. Change theme tokens in `assets/css/style.css` (`:root`).  
3. Keep `data-skills` / `data-focus` attributes aligned with filter `<select>` values.  
4. Point forms at your backend when leaving the static demo.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
