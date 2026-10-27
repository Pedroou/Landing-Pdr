/** Facts that are identical in every language. */
export const profile = {
  name: "Pedro Ourique",
  email: "pedro.g.ourique@gmail.com",
  phone: "+55 51 98058-4781",
  github: "https://github.com/Pedroou",
  linkedin: "https://www.linkedin.com/in/pedro-guimaraes-ourique/",
  site: "https://pedroou.github.io/Landing-Pdr/",
} as const;

/** `https://www.example.com/path/` → `example.com/path`, for printed links. */
export const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
