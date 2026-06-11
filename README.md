# Linda R. Perez — Personal Portfolio

A clean, responsive, fast-loading personal/academic portfolio built with plain
HTML, CSS, and JavaScript — no frameworks, no build step. Designed to be hosted
for free on **GitHub Pages**.

## ✨ Features

- Sticky top navigation with smooth-scroll anchor links
- Hero with name, tagline, contact, social links, photo, and compact stats
- About, Projects (card grid), Publications (with "show all"), Experience &
  Education timeline, Skills, Honors, and Service sections
- Responsive across desktop, tablet, and mobile
- Accessible: semantic HTML, skip link, keyboard focus styles, alt text,
  reduced-motion support, strong color contrast
- Graceful image fallbacks — missing photos show a neutral gradient placeholder
- No external tracking scripts; everything loads from your repo

## 📁 Structure

```
/
├── index.html              # Page markup & section anchors
├── styles.css              # All styling (edit CSS variables at the top)
├── script.js               # All editable content arrays + rendering
├── README.md
├── assets/
│   ├── profile.jpg         # Your hero photo (optional)
│   └── projects/           # project-1.jpg … project-6.jpg (optional)
└── .github/workflows/
    └── deploy.yml          # GitHub Pages deployment
```

## 🚀 Deploy to GitHub Pages

### 1. Create the repository
- For a **user site** (`https://USERNAME.github.io`): name the repo exactly
  `USERNAME.github.io`.
- For a **project site** (`https://USERNAME.github.io/REPO`): use any repo name.
- This site uses **relative paths**, so it works at either URL.

### 2. Push the files
```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### 3. Enable GitHub Pages with Actions
1. Go to your repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or open the **Actions** tab and run the workflow manually).
4. When the workflow finishes, your site is live at the URL shown in the
   workflow summary / Settings → Pages.

The included workflow (`.github/workflows/deploy.yml`) runs on every push to
`main`, uploads the repo as a Pages artifact, and deploys it with the official
`actions/deploy-pages` flow (permissions: `contents: read`, `pages: write`,
`id-token: write`).

## 🛠 Customize the content

Almost everything lives in **`script.js`** as plain arrays — edit them and
refresh the browser:

| What | Where |
|------|-------|
| Name, tagline, affiliation, contact, social links | `index.html` → hero section |
| Bio paragraphs & interests | `index.html` → About section |
| Compact stats | `STATS` array in `script.js` |
| Projects | **Auto-loaded from your public GitHub repos.** Tune via `PROJECT_CONFIG` (how many show, what's pinned/excluded). Polish a specific repo (custom title/image/blurb/tags) via `PROJECT_OVERRIDES` keyed by exact repo name. `FALLBACK_PROJECTS` shows only if GitHub is unreachable. |
| Certifications & courses (with "show all" toggle) | `CERTIFICATIONS` array (`featured: true` shows by default) |
| Experience & Education timeline | `EXPERIENCE` / `EDUCATION` arrays |
| Skills by category (+ radar levels) | `SKILLS` array (`level: 0–100` drives the radar) |
| Live GitHub panel | `GITHUB_USER` in `script.js` |
| Honors / Education highlights | `HONORS` array |
| Resume PDF | Replace `assets/resume/Resume_2026.pdf`. The page shows an **image preview** (`assets/resume/resume-preview.png`) so it works in every browser — regenerate it after updating the PDF: `pdftoppm -png -r 150 -singlefile Resume_2026.pdf resume-preview` (or export page 1 to PNG any way you like). |
| Profile photo | `assets/personal_photos/profile_3.jpeg` (update the `src` in `index.html` if you rename it) |
| Accent color, fonts, spacing | CSS variables at top of `styles.css` |

### Images
Drop files into `assets/` (see `assets/README.md`). If an image is missing, a
gradient placeholder is shown automatically — the layout never breaks.

## 🖥 Run locally
No server needed — just open `index.html` in a browser. Or serve it:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## ✅ Pre-push checklist
- [ ] Updated name, tagline, contact, and social links in `index.html`
- [ ] Replaced bio text in the About section
- [ ] Edited `PROJECTS`, `PUBLICATIONS`, `EXPERIENCE`, `EDUCATION`, `SKILLS`,
      `HONORS`, `SERVICE` in `script.js`
- [ ] Added `assets/profile.jpg` and project images (or accept placeholders)
- [ ] Opened `index.html` locally and confirmed nav anchors + mobile menu work
- [ ] Set repo name correctly for a user vs. project site
- [ ] Enabled Pages → Source: **GitHub Actions**

---
Built with plain HTML/CSS/JS. Last structural update reflected automatically in
the footer.