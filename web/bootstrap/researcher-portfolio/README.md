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

- Sticky responsive navbar with smooth scrolling and active section state
- Hero with name, title, affiliation, research summary, and CTAs
- About section with focus chips
- Animated impact metrics (publications, citations, h-index, talks, awards, reviews)
- Filterable publications (journal / conference) with co-authors and links
- Talks & presentations timeline
- Media / press cards
- Awards & honors
- Peer review, editorial, and judging service
- Teaching, mentoring, and institutional service
- Collaboration / contact form (demo)
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
4. Publications — selected papers with filters  
5. Talks — invited speaking timeline  
6. Media — press and commentary  
7. Awards — honors and recognition  
8. Peer review / editorial / judging  
9. Teaching, mentoring & service  
10. Collaboration / contact  
11. Footer  

## Customization

1. Replace name, title, affiliation, and bio in `index.html`.  
2. Update CSS variables in `assets/css/style.css` (`:root`).  
3. Adjust metric targets via `data-target` on `.rh-counter`.  
4. Swap publication / talk / award placeholders with your CV content.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.spoluru@gmail.com
