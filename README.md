# pedroou.github.io/Landing-Pdr

My personal site: a short landing page and a CV that prints cleanly to PDF, in English and Portuguese.

## Develop

Requires Node 22.18 or newer, and Google Chrome for the build (set `CHROME_PATH` if it isn't at `/usr/bin/google-chrome`).

```sh
npm install
npm run dev      # http://localhost:5173/Landing-Pdr/
npm run check    # type-check (tsc) + lint and format check (Biome)
npm run build    # static site in dist/, including the CV PDFs
```

## Layout

- `index.html`, `cv/index.html`: the two pages. Each one has static `<head>` metadata, because link-preview crawlers don't run JavaScript. There's no client-side router: GitHub Pages serves `/` and `/cv/` as ordinary files.
- `src/content/`: all copy. `en.ts` and `pt.ts` are typed against `types.ts`, so a key missing from either language fails the build. Facts that don't change between languages (name, email, links) live in `profile.ts`.
- `src/i18n.ts`: the language comes from the `?lang=` URL parameter, or from the browser's language when there isn't one. Internal links carry the parameter, so the language stays the same from page to page and in shared links. It also keeps `<html lang>` and the document title in sync.
- `src/theme.ts`: light/dark follows the OS until the visitor uses the toggle in the header; the choice is saved in `localStorage`. A small inline script in each HTML `<head>` applies the saved theme before first paint, so keep the two in sync.
- `src/components/SiteHeader.tsx`: the navigation bar shared by both pages (page links, language, theme).
- `src/pages/cv/Cv.module.css`: one stylesheet, two layouts. On screen the CV is a web page in the site theme, with dates and labels in a left column. In print it is a one-page, single-column document at 10 pt with dates on the right of each title, which keeps résumé parsers reading it in order.
- `scripts/cv-pdf.ts`: the last step of `npm run build`. It prints the built CV with Chrome into `dist/cv/pedro-ourique-cv-{en,pt}.pdf` (English on Letter, Portuguese on A4), the files behind **Download PDF**, and fails the build if either one runs past one page. They don't exist under `npm run dev`.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`. It checks, builds and publishes `dist/` to GitHub Pages. In the repository settings, Pages must be set to deploy from **GitHub Actions**.

`public/og.png` is the 1200×630 link-preview image. It's a screenshot of the landing hero; retake it when the name or role changes.

## The CV as PDF

**Download PDF** on `/cv/` serves the file printed at build time, so it always matches the page. **Print** opens the browser's print dialog; turn off _Headers and footers_ there.
