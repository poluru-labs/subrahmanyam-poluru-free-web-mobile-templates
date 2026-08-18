# Nonprofit Impact Dashboard

A polished, public-facing **nonprofit impact website template** for donors, partners, and communities. Built with **HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons**, and **Inter** (Google Fonts).

This is a landing-page style impact dashboard—not an internal admin panel—designed to communicate outcomes with clarity and trust.

## Screenshot

<img width="2887" height="8659" alt="image" src="https://github.com/user-attachments/assets/7ee0dfc0-c9e1-4576-8a3d-83eeb5323f9f" />


## Features

- Sticky responsive navbar with smooth scrolling and scroll shadow
- Skip link, back-to-top, and toast feedback for key actions
- Hero with mission statement and CTAs (Annual Report / Donate)
- “This Year in Impact” highlight banner
- Animated impact counters (people served, communities, volunteers, funds, projects)
- Program outcome cards with category filters and scroll-triggered progress bars
- Interactive geographic reach — clickable map pins, region highlight, city search
- Filterable + searchable annual report cards with demo download toasts
- Success stories filterable by Education / Health / Housing
- Partners & sponsors logo grid
- Donation impact calculator with amount presets
- Donate and Volunteer modals with validation
- Share this page (Web Share API or copy link)
- Donor FAQ accordion
- Footer newsletter signup
- Scroll-reveal animations (CSS + IntersectionObserver)
- Mobile-first, accessible contrast, semantic markup
- Reduced-motion friendly counters and reveals
- No heavy libraries beyond Bootstrap and Bootstrap Icons

## Brand Direction

| Token | Value | Use |
|---|---|---|
| Teal | `#0f766e` | Primary brand, CTAs, accents |
| Blue | `#0369a1` | Secondary program accents |
| Green | `#059669` | Growth / food security accents |
| Base | `#ffffff` / `#f0fdfa` | Clean white + soft teal wash |

Custom classes use the `np-` prefix (e.g. `.np-hero`, `.np-stat-card`).

## File Structure

```text
non-profit-impact-dashboard/
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
cd web/bootstrap/non-profit-impact-dashboard
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

Or open `index.html` directly in a modern browser.

## Sections

1. **Hero** — BrightPath Foundation mission + CTAs  
2. **Impact stats** — Animated key metrics  
3. **Programs** — Filterable Learning, Clinics, Nourish, Housing  
4. **Geography** — Interactive map pins + searchable regions  
5. **Reports** — Year + keyword filterable downloads  
6. **Stories** — Filterable beneficiary testimonials  
7. **Partners** — Sponsor logo placeholders  
8. **CTA** — Impact calculator, donate / volunteer / share  
9. **FAQ** — Donor transparency accordion  
10. **Footer** — Contact, newsletter, social, navigation  

## Customization

1. Replace **BrightPath Foundation** branding, EIN, address, and contact details  
2. Update stats (`data-target` on `.np-counter`) and program metrics  
3. Swap hero background image URL in `assets/css/style.css`  
4. Link real PDF URLs on report download buttons  
5. Adjust colors via CSS variables in `:root`

```css
:root {
  --np-teal: #0f766e;
  --np-blue: #0369a1;
  --np-green: #059669;
}
```

## Tech Stack

- HTML5
- CSS3 (`assets/css/style.css`)
- Vanilla JavaScript (`assets/js/script.js`)
- Bootstrap 5.3.3 (CDN)
- Bootstrap Icons 1.11.3 (CDN)
- Google Fonts — Inter

## Browser Support

Chrome, Firefox, Safari, Edge (recent versions) and modern mobile browsers.

## Author

**Subrahmanyam Poluru**

- Website: [https://polurus.com](https://polurus.com)
- Email: [mail.spoluru@gmail.com](mailto:mail.spoluru@gmail.com)

Part of the Free Web & Mobile Templates collection.

## License

MIT — free to use and customize.
