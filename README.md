# Azizbek Xasanov

Personal site for Azizbek Xasanov, an ML engineer in Tashkent. Static [Astro](https://astro.build) and Tailwind. Published at [azxav.github.io](https://azxav.github.io) from the `azxav/azxav.github.io` repository.

## Run locally

```bash
npm install
npm run dev
```

The dev server is [http://127.0.0.1:4471](http://127.0.0.1:4471).

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

Appearance is Light, Dark, or Monospace. Add `?theme=dark` (or `light`, or `mono`) to open a specific one. The choice is saved in the browser after a toggle.

## Add a project

Edit `src/data/projects.ts` and append one object to the `projects` array. Order in that array is the order on the site. A new entry creates the home row, the projects index, and `/projects/<slug>/`.

Required fields:

| Field | Purpose |
| --- | --- |
| `slug` | URL segment, lowercase words separated by hyphens |
| `title` | Name on the index and the page |
| `kind` | `personal` or `competition` |
| `summary` | One line on the index |
| `repo` | `https://github.com/azxav/...` |
| `paragraphs` | Page copy. Do not invent metrics, users, or awards |

Optional: `links`, `sections`, `stack`, `stat`, `todo`.

Employment, education, certifications, honours, and skills live in `src/data/profile.ts`. Those facts come from the résumé. Do not add an employer as a project.

## Deploy

Pushing to `main` runs two workflows:

- **CI** lints, type-checks, and builds.
- **Deploy to GitHub Pages** publishes `dist/` with GitHub Actions.

In the repository settings, set Pages → Build and deployment → Source to **GitHub Actions**. The site is served from the domain root (`https://azxav.github.io`), which matches a repository named `azxav.github.io`.

## Content notes

Phone is omitted. Russian is listed with no proficiency level. 2Brain links to the live product at [2brainai.tech](https://2brainai.tech) and credits Garry Tan’s licensed gbrain. Kaggle S6E3 is rank 57 of 4,142, score 0.91824.

## Notes

The grain field is a small WebGL shader. It pauses when the tab is hidden or the canvas is off-screen, stays still when `prefers-reduced-motion` is set, and falls back to a static image when WebGL is unavailable. Fonts are SIL Open Font License; see `public/fonts/`.
