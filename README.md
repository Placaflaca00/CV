# Mohamad Kassem Moussa — portfolio + CV

Personal portfolio (vanilla HTML/CSS/JS, no build step) and the LaTeX source of my CV.
Live at **https://placaflaca00.github.io/CV/**

## What's here

| Path | What it is |
|---|---|
| `index.html` | Portfolio home — bilingual EN/ES |
| `conocetuave.html`, `transmission-cv.html`, `xrd-thesis.html`, `atacado-connect.html` | Case studies |
| `assets/js/i18n.js` | The EN/ES toggle. English lives in the HTML; Spanish lives in this file |
| `main.tex` | CV — **Spanish** |
| `cv-en.tex` | CV — **English** |
| `assets/cv/` | Where the compiled PDFs land (built by CI, not committed) |
| `.github/workflows/deploy.yml` | Compiles both CVs and deploys the site to GitHub Pages |

## The CV button

The "Résumé / Currículum" button in the hero carries `data-i18n-href="cv.pdf"`:

* page in **English** → `assets/cv/Mohamad-Kassem-Moussa-CV-EN.pdf`
* page in **Spanish** → `assets/cv/Mohamad-Kassem-Moussa-CV-ES.pdf`

The English path is the `href` in `index.html`; the Spanish one is in `HREF_ES` in
`assets/js/i18n.js`. Change either there — nothing else needs touching.

## Building the CVs

Every push to `main` compiles both `.tex` files and publishes the PDFs with the site.
No local LaTeX needed. The PDFs are also attached to each workflow run as the
`cv-pdfs` artifact.

To build locally (optional — needs a TeX distribution):

```sh
latexmk -pdf main.tex   && cp main.pdf  assets/cv/Mohamad-Kassem-Moussa-CV-ES.pdf
latexmk -pdf cv-en.tex  && cp cv-en.pdf assets/cv/Mohamad-Kassem-Moussa-CV-EN.pdf
```

`latexmk` runs pdflatex twice, which the page-number footer (`\pageref{LastPage}`) needs.

## Running the site locally

```sh
python3 -m http.server 8000    # then open http://localhost:8000
```

## Not published

`metrics/`, `_backup_original/` and `.claude/` are git-ignored: internal notes and
working files that don't belong on a public page.
