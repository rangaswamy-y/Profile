# Rangaswamy Yagateela — SAP BTP CAPM Developer Portfolio

[![Pages](https://img.shields.io/badge/GitHub_Pages-live-0a6ed1?logo=github)](https://rangaswamy71506.github.io/RANGASWAMY-POROFILE/)
[![SAP BTP](https://img.shields.io/badge/SAP-BTP%20CAPM-0a6ed1)]()
[![License](https://img.shields.io/badge/license-MIT-df6e21)]()

A clean, modern, fully-responsive personal portfolio for **Rangaswamy Yagateela**, a Full Stack Developer with **5+ years** of hands-on experience on the **SAP Business Technology Platform**, specializing in **CAP (Node.js)**, **CDS**, **SAP HANA Cloud**, **OData V4**, and **AI / RAG pipelines** built on **SAP AI Core** and **Generative AI Hub**.

> Live site: **https://rangaswamy71506.github.io/RANGASWAMY-POROFILE/**

---

## Highlights

- Hero section with animated gradient avatar, `#OPENTOWORK` overlay, and typewriter tagline.
- Six themed sections: **About**, **Skills**, **Experience**, **Projects**, **Certifications**, **Contact**.
- Interactive **project filter** by domain (CAP / OData, AI / RAG, Data, Security).
- **Light / dark theme** toggle with `localStorage` persistence.
- **Scroll-reveal**, animated counters, and smooth in-page navigation.
- Fully responsive — mobile, tablet, desktop — with a hamburger nav.
- Accessibility: skip link, focus styles, `prefers-reduced-motion` honored.
- Zero build step. Pure HTML, CSS, and vanilla JS — perfect for **GitHub Pages**.

---

## Tech stack

| Area      | Tech                                                     |
| --------- | -------------------------------------------------------- |
| Markup    | Semantic HTML5                                           |
| Styling   | Modern CSS (custom properties, grid, glassmorphism)      |
| Scripting | Vanilla JavaScript (IntersectionObserver, no frameworks) |
| Hosting   | GitHub Pages                                             |
| Fonts     | Inter, JetBrains Mono (Google Fonts)                     |

---

## Project structure

```
RANGASWAMY-POROFILE/
├── index.html               # Main entry point
├── README.md
├── .nojekyll                # Disable Jekyll on GitHub Pages
├── .gitignore
└── assets/
    ├── css/
    │   └── styles.css       # All styles + responsive + theming
    ├── js/
    │   └── main.js          # Theme, nav, reveals, typewriter, filters
    ├── img/
    │   ├── favicon.svg
    │   ├── og-card.svg
    │   └── open-to-work-frame.png
    └── docs/
        └── Rangaswamy_Yagateela_Resume.docx
```

---

## Run locally

The site is fully static — any static server works.

### Option 1: Node `http-server` (recommended, no install)

```bash
npx --yes http-server . -p 5173 -c-1 -o
```

Then open <http://localhost:5173>.

### Option 2: Python

```bash
python -m http.server 5173
```

### Option 3: Just open the file

Double-click `index.html`. Most features work directly from `file://`.

---

## Deploy to GitHub Pages

This repo is meant to be hosted on GitHub Pages from the `main` branch root.

1. Push the code to <https://github.com/rangaswamy71506/RANGASWAMY-POROFILE>.
2. Go to **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select **Branch:** `main` and **Folder:** `/ (root)`. Save.
5. Wait ~1 minute. The site will be live at:
   <https://rangaswamy71506.github.io/RANGASWAMY-POROFILE/>.

The `.nojekyll` file is included so GitHub Pages serves all files (including
those starting with `_`) as-is.

---

## Customizing

- **Colors / theme** — tweak the CSS variables at the top of `assets/css/styles.css`.
- **Sections / copy** — edit `index.html` directly, the structure is plain semantic HTML.
- **Typewriter phrases** — edit the `phrases` array in `assets/js/main.js`.
- **Resume download** — replace `assets/docs/Rangaswamy_Yagateela_Resume.docx` with your latest copy.
- **Profile image** — drop a `profile.jpg` into `assets/img/` and replace the SVG initials inside `.avatar` with `<img src="assets/img/profile.jpg" alt="...">`.

---

## Contact

- Email: [ranga75038@gmail.com](mailto:ranga75038@gmail.com)
- Phone: +1 (682) 407-4466
- Location: Irving, Texas, USA
- GitHub: [@rangaswamy71506](https://github.com/rangaswamy71506)

---

## License

Released under the **MIT License**. Copy, fork, and adapt for your own portfolio.
