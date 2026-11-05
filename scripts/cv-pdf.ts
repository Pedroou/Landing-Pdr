/*
 * Prints the built CV to PDF into dist/cv/: each language, plus an English A4 copy. Run after
 * `vite build` (it is part of `npm run build`), so the download on the CV page
 * is always the current CV, printed by the same stylesheet as the Print button.
 *
 * Needs Google Chrome or Chromium: set CHROME_PATH if it isn't at the default.
 * File names must match the download link in src/pages/cv/Cv.tsx.
 */
import { writeFile } from "node:fs/promises";
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

const server = await preview({ preview: { port: 0, open: false } });
const base = server.resolvedUrls?.local[0];
if (!base) throw new Error("vite preview did not report a URL");

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome",
  // GitHub's Ubuntu runners block the sandbox's user namespaces. The only
  // page loaded is our own build.
  args: ["--no-sandbox"],
});

try {
  const page = await browser.newPage();
  for (const { lang, format, name } of files) {
    await page.goto(new URL(`cv/?lang=${lang}`, base).href, {
      waitUntil: "networkidle0",
    });
    // Printing before the web font arrives would bake the fallback in.
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const pdf = await page.pdf({ format });
    const pages = new TextDecoder("latin1")
      .decode(pdf)
      .match(/\/Type\s*\/Page\b/g)?.length;
    if (pages !== 1) {
      throw new Error(
        `The ${lang} CV prints on ${pages} pages on ${format}; it must fit on one. Shorten the content.`,
      );
    }

    const out = `dist/cv/${name}.pdf`;
    await writeFile(out, pdf);
    console.log(`${out} (${format}, 1 page)`);
  }
} finally {
  await browser.close();
  await server.close();
}
