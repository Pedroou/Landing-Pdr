/*
 * Packs the cover-letter tool into one .zip for someone on Windows:
 *   npm run pack:cover-letter [-- path/to/out.zip]
 * The zip holds a "Cover letters" folder with the page, the helper, the
 * Windows launcher and README.md (the Linux launcher is left out).
 * Uses the `zip` command, so run it on Linux or macOS.
 */
import { execFileSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const source = resolve(import.meta.dirname, "../cover-letter");
const folder = "Cover letters";
const out = resolve(process.argv[2] ?? "cover-letter-windows.zip");

const stage = mkdtempSync(join(tmpdir(), "cover-letter-"));
const dir = join(stage, folder);
mkdirSync(dir);

for (const file of ["cover-letter.html", "cover-letter-helper.mjs"]) {
  cpSync(join(source, file), join(dir, file));
}
// cmd.exe and Notepad want CRLF, whatever the working copy has.
for (const file of ["Start cover letter helper.cmd", "README.md"]) {
  const text = readFileSync(join(source, file), "utf8");
  writeFileSync(join(dir, file), text.replace(/\r?\n/g, "\r\n"));
}

rmSync(out, { force: true });
execFileSync("zip", ["-q", "-X", "-r", out, folder], { cwd: stage });
rmSync(stage, { recursive: true });
console.log(`Wrote ${out}`);
