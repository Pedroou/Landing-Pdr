/*
 * Prints the built CV to PDF into dist/cv/: each language, plus an English A4 copy. Run after
 * `vite build` (it is part of `npm run build`), so the download on the CV page
 * is always the current CV, printed by the same stylesheet as the Print button.
 *
 * Projects are ranked: paper keeps as many as fit on one page in every paper
 * size of that language. The count is stamped on dist/cv/index.html's <html>
 * (data-print-projects-en / -pt), so the Print button drops the same ones.
 *
 * Needs Google Chrome or Chromium: set CHROME_PATH if it isn't at the default.
 * File names must match the download link in src/pages/cv/Cv.tsx.
 */
import { readFile, writeFile } from "node:fs/promises";
import puppeteer, { type PaperFormat } from "puppeteer-core";
import { preview } from "vite";

// Letter for the English CV (US companies hire most remote roles), A4 for the
// Portuguese one (Brazil's paper size). The English A4 copy isn't linked from
// the page: it's for applications to Brazil and Europe (SAP Labs, say).
const files: Array<{ lang: string; format: PaperFormat; name: string }> = [
  { lang: "en", format: "letter", name: "pedro-ourique-cv-en" },
  { lang: "en", format: "a4", name: "pedro-ourique-cv-en-a4" },
  { lang: "pt", format: "a4", name: "pedro-ourique-cv-pt" },
];

// Cv.module.css has hiding rules for 0, 1 and 2 projects, so 3 is the most.
const MAX_PROJECTS = 3;
const HTML = "dist/cv/index.html";

const server = await preview({ preview: { port: 0, open: false } });
const base = server.resolvedUrls?.local[0];
if (!base) throw new Error("vite preview did not report a URL");

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome",
  // GitHub's Ubuntu runners block the sandbox's user namespaces. The only
  // page loaded is our own build.
  args: ["--no-sandbox"],
});

const fit: Record<string, number> = {};

try {
  const page = await browser.newPage();
  for (const lang of new Set(files.map((file) => file.lang))) {
    const formats = files.filter((file) => file.lang === lang);
    await page.goto(new URL(`cv/?lang=${lang}`, base).href, {
      waitUntil: "networkidle0",
    });
    // Printing before the web font arrives would bake the fallback in.
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const total = await page.$$eval("[data-project]", (els) => els.length);
    if (total > MAX_PROJECTS) {
      throw new Error(
        `The ${lang} CV lists ${total} projects; the print stylesheet handles at most ${MAX_PROJECTS}.`,
      );
    }

    // Most projects first; stop at the first count that fits every format.
    let pdfs: Uint8Array[] | null = null;
    for (let count = total; count >= 0 && !pdfs; count--) {
      await page.evaluate(
        (attr, value) => document.documentElement.setAttribute(attr, value),
        `data-print-projects-${lang}`,
        String(count),
      );
      const printed = [];
      for (const { format } of formats)
        printed.push(await page.pdf({ format }));
      // One "/Type /Page" object per page in Chrome's PDF output.
      const onePage = printed.every(
        (pdf) =>
          new TextDecoder("latin1").decode(pdf).match(/\/Type\s*\/Page\b/g)
            ?.length === 1,
      );
      if (onePage) {
        fit[lang] = count;
        pdfs = printed;
      }
    }
    if (!pdfs) {
      throw new Error(
        `The ${lang} CV runs past one page even without projects. Shorten the content.`,
      );
    }

    for (const [i, { format, name }] of formats.entries()) {
      const out = `dist/cv/${name}.pdf`;
      await writeFile(out, pdfs[i]);
      console.log(`${out} (${format}, 1 page)`);
    }
    console.log(`${lang}: ${fit[lang]} of ${total} projects on paper`);
  }
} finally {
  await browser.close();
  await server.close();
}

const attrs = Object.entries(fit)
  .map(([lang, count]) => ` data-print-projects-${lang}="${count}"`)
  .join("");
const html = await readFile(HTML, "utf8");
if (!/<html\b/.test(html)) throw new Error(`No <html> tag in ${HTML}`);
await writeFile(HTML, html.replace(/<html\b/, `<html${attrs}`));
