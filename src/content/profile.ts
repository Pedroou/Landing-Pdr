/** Facts that are identical in every language. */
export const profile = {
  name: "Pedro Ourique",
  email: "pedro.g.ourique@gmail.com",
  phone: "+55 51 98058-4781",
  github: "https://github.com/Pedroou",
  linkedin: "https://www.linkedin.com/in/pedro-guimaraes-ourique/",
  site: "https://pedroou.github.io/Landing-Pdr/",
  /** First day of paid development work (the NetComet internship). */
  careerStart: new Date(2025, 4, 1),
} as const;

/**
 * Years since `careerStart`, to the nearest half year: 18 months reads 1.5,
 * 21 months reads 2. Computed on every render, so the page never goes stale;
 * the PDFs only change when the site is rebuilt (deploy.yml does it monthly).
 */
export function yearsOfExperience(now = new Date()): number {
  const start = profile.careerStart;
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    now.getMonth() -
    start.getMonth();
  return Math.round(months / 6) / 2;
}

/** `https://www.example.com/path/` → `example.com/path`, for printed links. */
export const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
