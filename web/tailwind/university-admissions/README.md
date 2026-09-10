# Harborwell — University Admissions

A clean, responsive **admissions portal** for tracking applications, uploading documents, and reading status timelines. Built for university desks, counselor demos, and applicant portals.

**Desk:** Harborwell University  
**Brand:** `#05339C`  
**Prefix:** `hw-*`  
**Applicant:** Leela Poluru, Fall 2027

Built with **HTML, CSS, JavaScript, Tailwind CSS (browser v4), Bootstrap Icons**, Roboto, and Open Sans.

## Template Overview

| Property | Value |
|---|---|
| Template Name | University Admissions (Harborwell) |
| Category | Education, Dashboard |
| Framework | Tailwind CSS |
| Interaction | Vanilla JavaScript |
| License | Free to use and customize |

## Features

- Sticky navy header with a Start → Materials → Review → Decision rail
- Program switcher (CS, Bio, Arch) and completeness / deadline meter
- Applicant desk: applications, files in, next deadline, first reader
- Application cards that jump into the timeline or file set
- Document drop zone with demo uploads
- Status timeline per program
- Admissions inbox with a local reply
- Hash routing, top search, reduced-motion handling

## Views

1. **Overview** — what is still needed and desk notes
2. **Applications** — Computer Science, Biology, Architecture
3. **Documents** — required files and upload
4. **Timeline** — status log for the active program
5. **Messages** — Maya, Anika, Nila, and Asha Poluru

## File Structure

```text
university-admissions/
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
cd web/tailwind/university-admissions
python3 -m http.server 8012
```

Open [http://localhost:8012](http://localhost:8012) in your browser.

## Customization

1. Replace the applicant name, programs, and deadlines.
2. Update required documents and timeline events.
3. Connect uploads and replies to your SIS.
4. Adjust colors in `assets/css/style.css` and the Tailwind `@theme` block (`--hw-primary` / `--color-brand` is `#05339C`).

## Brand

| Token | Value | Use |
|---|---|---|
| Primary | `#05339C` | Header, buttons, rail |
| Dark | `#03256F` | Button hover |
| Deep | `#021A4F` | Sidebar, meter |
| Soft | `#E6EEF8` | Chips, progress track |
| Canvas | `#F3F6FB` | Page background |

Demo people include **Leela Poluru** (applicant), Subbu Poluru, Kavya Poluru, Maya Poluru, Anika Poluru, Priya Poluru, Rohan Poluru, Ishaan Poluru, Tara Poluru, Nila Poluru, Dev Poluru, Asha Poluru, and Kiran Poluru.

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
