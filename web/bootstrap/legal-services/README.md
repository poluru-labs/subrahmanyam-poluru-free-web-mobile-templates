# Meridian Hale — Legal Services

A clean, light **legal services website** with a mega menu, an animated hero, practice areas, attorney profiles, and a consultation form. Built for counsel practices, boutique firms, and professional-services landing pages.

**Firm:** Meridian Hale  
**Brand:** `#C62828`  
**Prefix:** `mh-*`

Built with **HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons**, Lato, and Roboto.

## Template Overview

| Property | Value |
|---|---|
| Template Name | Legal Services (Meridian Hale) |
| Category | Legal, Professional Services |
| Framework | Bootstrap 5.3.3 |
| Fonts | Lato (headings), Roboto (body) |
| Interaction | Vanilla JavaScript |
| License | Free for personal and commercial use |

## Features

- Sticky navigation with a full-width mega menu for Practice, The Firm, and Insights
- Hover open on desktop, tap open on smaller screens, and keyboard focus that stays inside the menu
- Animated hero with a rising headline, underline draw, floating cards, and a live-status pulse
- Light shadows, a warm paper background, and crimson used for actions and labels
- Eight practice cards, a four-step approach, and count-up sample figures
- Illustrative matters, attorney profiles, client notes, and expandable insight briefs
- FAQ accordion and a consultation form that validates in the browser
- SEO-ready title, description, canonical link, Open Graph tags, and JSON-LD
- Skip link, visible focus, semantic landmarks, and reduced-motion support

Meridian Hale, its attorneys, matters, address, and phone number are fictional. The consultation form does not send a message and does not create an attorney-client relationship.

## Sections

1. **Hero** — firm promise, consultation actions, and a counsel panel
2. **Practice areas** — corporate, litigation, employment, family, estates, real estate, intellectual property, immigration
3. **The firm** — story, who the work is for, and a careers note
4. **Approach** — listen, map, act, stay
5. **Selected matters** — three illustrative stories
6. **Attorneys** — Elena Hale, Marcus Adeyemi, Priya Shah, James Okonkwo
7. **Clients** — sample notes
8. **Insights** — three briefs that open on the page
9. **Questions** — five answers, including that this firm is a demonstration
10. **Consultation** — request form with a local confirmation
11. **Footer** — practice links, desk details, and template credit

## File Structure

```text
legal-services/
├── index.html
├── README.md
└── assets/
    ├── favicon.svg
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Getting Started

No install or build step. From this folder:

```bash
cd web/bootstrap/legal-services
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

Bootstrap, Bootstrap Icons, and the Google fonts load from public CDNs. The page still uses system fonts if those requests are blocked.

## Customization

1. Replace the firm name, address, phone, and email in `index.html`.
2. Rewrite practice areas, attorney names, and matter stories with licensed details.
3. Point the consultation form at your own endpoint. Keep the note that a demo submission is not legal advice.
4. Adjust colors in `assets/css/style.css`. The brand token is `--mh-brand: #C62828`.
5. Swap Lato and Roboto only if you also update the Google Fonts link in `index.html`.

## Brand

| Token | Value | Use |
|---|---|---|
| Brand | `#C62828` | Buttons, labels, mark, links |
| Brand dark | `#9B1C1C` | Button hover |
| Brand soft | `#FDECEC` | Icon tiles, feature panel |
| Ink | `#1A1816` | Headings and body |
| Muted | `#5E5854` | Supporting copy |
| Paper | `#F7F4F1` | Utility bar and alternate sections |
| Line | `#E8E2DC` | Rules and input borders |

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
