import { LOCALES, DEFAULT_LOCALE } from "./config"

export const t = (zh, en) => ({ "zh-TW": zh, en });

// Only objects whose keys are all locale codes count as translation pairs.
const isTranslationPair = (value) => {
    const keys = Object.keys(value);
    return keys.length > 0 && keys.every((key) => LOCALES.includes(key));
};

export const localize = (value, locale) => {
    if (Array.isArray(value)) return value.map((item) => localize(item, locale));
    if (value === null || typeof value !== "object") return value;
    if (value.$$typeof) return value;
    if (isTranslationPair(value)) return value[locale] ?? value[DEFAULT_LOCALE];

    return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, localize(item, locale)]),
    );
};
