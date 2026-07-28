import { LOCALES, DEFAULT_LOCALE } from "./config"

// Content files keep both languages side by side so they never drift apart:
//   title: t("模具調教數位功能模組", "Mold Tuning Digital Function Module")
export const t = (zh, en) => ({ "zh-TW": zh, en });

// An object is a translation pair only when *every* key is a locale code.
// Regular data objects (`{ live: "..." }`, `{ type: "point" }`) are untouched.
const isTranslationPair = (value) => {
    const keys = Object.keys(value);
    return keys.length > 0 && keys.every((key) => LOCALES.includes(key));
};

// Walks any content structure and swaps translation pairs for plain strings.
// React elements (the lucide icons in `lib/data.js`) are passed through as-is.
export const localize = (value, locale) => {
    if (Array.isArray(value)) return value.map((item) => localize(item, locale));
    if (value === null || typeof value !== "object") return value;
    if (value.$$typeof) return value;
    if (isTranslationPair(value)) return value[locale] ?? value[DEFAULT_LOCALE];

    return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, localize(item, locale)]),
    );
};
