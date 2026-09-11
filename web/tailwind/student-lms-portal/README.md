# Quill — Student LMS Portal

A clean, responsive **learning management dashboard** with courses, assignments, grades, and progress tracking. Built for student portals, cohort campuses, and online schools.

**Desk:** Quill · Alder Hall  
**Brand:** `#FF467A`  
**Prefix:** `ql-*`  
**Student:** Leela Poluru, Year 2 · Product design

Built with **HTML, CSS, JavaScript, Tailwind CSS (browser v4), Bootstrap Icons**, Roboto, and Open Sans.

## Template Overview

| Property | Value |
|---|---|
| Template Name | Student LMS Portal (Quill) |
| Category | Education, Dashboard |
| Framework | Tailwind CSS |
| Interaction | Vanilla JavaScript |
| License | Free to use and customize |

## Features

- Sticky sidebar navigation with mobile drawer and skip link
- Student desk: GPA, due work, hours, term progress
- Course catalog with in-progress / completed filters
- Assignment board with due / submitted / overdue states
- One-click submit (demo) that updates status and the due badge
- Gradebook with faculty notes and a transcript download (demo)
- Progress: studio bars, credit ring, weekly hours, skills
- Week schedule and faculty inbox with a local reply
- Hash routing, top search, notifications, toasts
- Accessible labels, semantic HTML, reduced-motion handling

## Views

1. **Dashboard** — continue studio, upcoming work, recent marks
2. **Courses** — Product Sense, Interface Craft, Decision Systems, Frontend Foundations, Shipping Leadership, SQL for Operators
3. **Assignments** — work board and submit
4. **Grades** — posted marks and standing
5. **Progress** — credits, hours, skills
6. **Schedule** — week of live studios
7. **Messages** — Maya, Anika, and Subbu Poluru

## File Structure

```text
student-lms-portal/
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
cd web/tailwind/student-lms-portal
python3 -m http.server 8010
```

Open [http://localhost:8010](http://localhost:8010) in your browser.

## Customization

1. Replace the student name, program, and Alder Hall copy.
2. Update courses, due dates, marks, and faculty.
3. Connect submit / reply / transcript to your LMS or campus mail.
4. Adjust colors in `assets/css/style.css` and the Tailwind `@theme` block (`--ql-primary` / `--color-brand` is `#FF467A`).

## Brand

| Token | Value | Use |
|---|---|---|
| Primary | `#FF467A` | Buttons, progress, brand mark |
| Dark | `#D91F5A` | Button hover |
| Deep | `#9B1040` | Emphasis text, active nav |
| Night | `#160D11` | Sidebar |
| Soft | `#FFE4EC` | Chips, progress track |
| Canvas | `#F7F1F3` | Page background |

Demo people include **Leela Poluru** (student), Maya Poluru, Kavya Poluru, Arjun Poluru, Nikhil Poluru, Subbu Poluru, Rohan Poluru, and Anika Poluru (advisor).

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
