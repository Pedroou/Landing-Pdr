# pedroou.github.io/Landing-Pdr

My personal site: a short landing page and a CV that prints cleanly to PDF, in English and Portuguese.

## Develop

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:5173/Landing-Pdr/
npm run check    # type-check (tsc) + lint and format check (Biome)
npm run build    # static site in dist/
```

## Layout

- `index.html`, `cv/index.html`: the two pages. Each one has static `<head>` metadata, because link-preview crawlers don't run JavaScript. There's no client-side router: GitHub Pages serves `/` and `/cv/` as ordinary files.
- `src/content/`: all copy. `en.ts` and `pt.ts` are typed against `types.ts`, so a key missing from either language fails the build. Facts that don't change between languages (name, email, links) live in `profile.ts`.
- `src/i18n.ts`: the language comes from the `?lang=` URL parameter, or from the browser's language when there isn't one. Internal links carry the parameter, so the language stays the same from page to page and in shared links. It also keeps `<html lang>` and the document title in sync.
- `src/pages/cv/Cv.module.css`: a single stylesheet for both screen and print. On wide screens the CV is an A4-width sheet set in points, so the screen matches the printed page.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`. It checks, builds and publishes `dist/` to GitHub Pages. In the repository settings, Pages must be set to deploy from **GitHub Actions**.

`public/og.png` is the 1200×630 link-preview image. It's a screenshot of the landing hero; retake it when the name or role changes.

## Saving the CV as PDF

Open `/cv/`, click **Save as PDF** and turn off _Headers and footers_ in the print dialog. The PDF file name comes from the page title.
