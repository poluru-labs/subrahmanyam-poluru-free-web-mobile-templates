# Elevate Awards — Nomination & Judging Platform

A polished, responsive **awards nomination and judging platform** template for professional recognition programs, fellowships, and innovation challenges. Built with **HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons**, and **Manrope** (Google Fonts).

This is a premium public-facing awards platform page—not a generic admin dashboard.


## Screenshot


<img width="2512" height="9950" alt="image" src="https://github.com/user-attachments/assets/a5877fe6-d16b-46b2-a32c-e79b07cf04e5" />

## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#AF0404` | Headings, CTAs, key highlights |
| Secondary | `#46B5D1` | Accents and supporting UI |
| Muted | `#525252` | Body text and supporting labels |
| Soft bg | `#f5fafc` | Section contrast |

Solid colors only — no brand-color gradients.

Custom classes use the `ea-` prefix (e.g. `.ea-hero`, `.ea-scorecard`).

## Features

- Sticky responsive navbar with smooth scrolling
- Credibility-focused hero with integrity snapshot panel
- Animated overview counters (nominations, categories, reviewers, finalists, completion)
- Timeline-style nomination → screening → review → shortlist → selection workflow
- Eligibility screening cards with status badges + review table mockup
- Filterable award category cards (open / closing soon / in review)
- Expert reviewer profiles with review stats
- Weighted scoring rubric with scroll-triggered progress bars
- Finalist / shortlist cards with composite scores
- Insights cards for program health
- Reusable nomination form layout
- Nominee preview modal
- Transparent Evaluation highlight band
- Scroll-reveal animations (lightweight CSS/JS)
- No heavy libraries beyond Bootstrap, Bootstrap Icons, and Google Fonts

## File Structure

```text
elevate-awards/
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
cd web/bootstrap/elevate-awards
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Sections

1. Hero — platform title, credibility copy, CTAs  
2. Overview — key program metrics  
3. Workflow — five-stage judging process  
4. Eligibility — criteria + screening table  
5. Categories — filterable award tracks  
6. Reviewers — expert panel profiles  
7. Scoring — weighted rubric / scorecard  
8. Finalists — shortlist cards  
9. Insights — organizer health metrics  
10. Nomination form — reusable submission layout  
11. CTA + Footer  

## Customization

Edit CSS variables in `assets/css/style.css`:

```css
:root {
  --ea-primary: #AF0404;
  --ea-secondary: #46B5D1;
  --ea-muted: #525252;
}
```

Update counters via `data-target` on `.ea-counter`, replace demo categories/reviewers, and wire the nomination form to your backend.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5.3.3 (CDN)
- Bootstrap Icons 1.11.3 (CDN)
- Google Fonts — Manrope

## Author

**Subrahmanyam Poluru**

- Website: [https://polurus.com](https://polurus.com)
- Email: [mail.spoluru@gmail.com](mailto:mail.spoluru@gmail.com)

Part of the Free Web & Mobile Templates collection.

## License

MIT — free to use and customize.
