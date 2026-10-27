import type { Language } from "../content";
import styles from "./LanguageSwitch.module.css";

/** Each option is named in its own language, as users look for it. */
const NAMES: Record<Language, string> = { en: "English", pt: "Português" };

interface Props {
  current: Language;
  label: string;
  onSwitch: (lang: Language) => void;
}

export function LanguageSwitch({ current, label, onSwitch }: Props) {
  const next: Language = current === "en" ? "pt" : "en";
  return (
    <button
      type="button"
      className={styles.switch}
      onClick={() => onSwitch(next)}
    >
      <span className="visually-hidden">{label}: </span>
      <span lang={next}>{NAMES[next]}</span>
    </button>
  );
}
