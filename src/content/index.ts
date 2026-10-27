import { en } from "./en";
import { pt } from "./pt";
import type { Content, Language } from "./types";

export const content: Record<Language, Content> = { en, pt };

export { displayUrl, profile } from "./profile";
export { type Content, LANGUAGES, type Language } from "./types";
