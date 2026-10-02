# Baystock — Inventory Management

A clean **inventory website** for stock, vendors, purchase orders, and warehouses. Built as a Harbor Goods ops desk: Austin DC, Hyderabad DC, and London Bond.

**Product:** Baystock  
**Brand:** `#1B6B43`  
**Prefix:** `inv-*`  
**Fonts:** Roboto (headings), Lato (UI), Open Sans (body)  
**Ops:** Ravi Poluru (Austin), Leela Poluru (buying), Ishaan Poluru (Hyderabad)

Built with **HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons**. No gradients.

## Template Overview

| Property | Value |
|---|---|
| Template Name | Inventory Management (Baystock) |
| Category | Operations, Inventory, ERP |
| Framework | Bootstrap 5 |
| Interaction | Vanilla JavaScript |
| License | Free to use and customize |

## Features

- Sticky nav, skip link, and mobile collapse
- Hero with Austin DC aisle bins (fill bars, not charts)
- Product cards: stock, receiving, POs, vendors, warehouses, cycle counts
- Live stock table with search, warehouse filter, adjust, and CSV export
- Receive PO-4412 demo (updates TAPE-2 on the page)
- Three warehouse cards and a vendor book
- Sample Floor / Network pricing
- FAQ and a contact form that saves in-browser only
- Footer author block with [polurus.com](https://polurus.com)

## File Structure

```text
inventory-management/
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

```bash
cd web/bootstrap/inventory-management
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in the browser.

## Customization

1. Replace Harbor Goods, warehouse addresses, and SKU rows.
2. Point Receive / Adjust / Contact at your WMS or ERP.
3. Update colors in `assets/css/style.css` (`--inv-brand` is `#1B6B43`).
4. Fonts load from Google Fonts: Roboto, Lato, Open Sans.

## Brand

| Token | Value | Use |
|---|---|---|
| Primary | `#1B6B43` | Buttons, bins, badges |
| Dark | `#145234` | Button hover |
| Soft | `#E6F1EB` | Icon wells, ok badges |
| Ink | `#15231C` | Sidebar-free text, footer |
| Paper | `#F3F6F4` | Hero and alt sections |

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
