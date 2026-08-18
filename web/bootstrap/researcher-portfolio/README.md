# ResearcherHub — Expert Portfolio for Researchers

A modern, responsive **academic personal site** template for faculty, lab leads, and independent researchers. Built with **HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons, Manrope**, and **AOS** (Animate On Scroll).

Credible and contemporary—not outdated university chrome. Solid brand colors only.


## Screenshot

<img width="2679" height="9331" alt="image" src="https://github.com/user-attachments/assets/2eccb372-f268-44fb-a5ad-8c1dd244300f" />



## Brand Colors

| Token | Value | Use |
|---|---|---|
| Primary | `#3B0270` | Brand, headings, primary CTAs |
| Secondary | `#F8DE22` | Accents, secondary buttons, highlights |
| Soft bg | `#F7F4FB` | Section contrast |

Custom classes use the `rh-` prefix (e.g. `.rh-hero`, `.rh-pub-card`).

## Features

- Sticky responsive navbar with smooth scrolling, scroll shadow, and active section state
- Skip link and floating back-to-top control
- Hero with name, title, affiliation, research summary, and CTAs
- About section with focus chips
- Animated impact metrics (publications, citations, h-index, talks, awards, reviews)
- Publications: type filters, year filter, keyword search, Cite + BibTeX copy
- Talks timeline with type filters (keynote / seminar / industry / panel)
- Media / press cards
- Awards & honors
- Peer review, editorial, and judging service
- Teaching, mentoring, and institutional service
- Collaboration FAQ accordion
- Contact form with character count, localStorage draft, and toast confirmation
- Copy email and share profile actions
- Demo CV download toast (wire to your PDF)
- AOS scroll animations throughout
- Reduced-motion support

## File Structure

```text
researcher-portfolio/
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
cd web/bootstrap/researcher-portfolio
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Sections

1. Hero — identity, affiliation, summary, CTAs  
2. About — narrative + quick facts  
3. Impact — scholarly metrics with counters  
4. Publications — searchable/filterable papers with cite tools  
5. Talks — invited speaking timeline with type filters  
6. Media — press and commentary  
7. Awards — honors and recognition  
8. Peer review / editorial / judging  
9. Teaching, mentoring & service  
10. FAQ — collaboration notes  
11. Collaboration / contact  
12. Footer  

## Customization

1. Replace name, title, affiliation, and bio in `index.html`.  
2. Update CSS variables in `assets/css/style.css` (`:root`).  
3. Adjust metric targets via `data-target` on `.rh-counter`.  
4. Swap publication / talk / award placeholders with your CV content.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.spoluru@gmail.com
