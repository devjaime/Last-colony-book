export type Locale = "es" | "en";

export function getLocaleFromSearch(search: string): Locale {
  return new URLSearchParams(search).get("lang") === "en" ? "en" : "es";
}

export function getLocalePath(locale: Locale) {
  return `/?lang=${locale}`;
}
