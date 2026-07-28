// Supported locales. `zh-TW` is the default and the language the content is
// authored in; `en` is the translation.
export const LOCALES = ["zh-TW", "en"];

export const DEFAULT_LOCALE = "zh-TW";

export const LOCALE_META = {
    "zh-TW": {
        label: "繁體中文",
        short: "中",
        htmlLang: "zh-Hant",
        ogLocale: "zh_TW",
    },
    en: {
        label: "English",
        short: "EN",
        htmlLang: "en",
        ogLocale: "en_US",
    },
};

export const LOCALE_COOKIE = "NEXT_LOCALE";

// Set by the proxy so `not-found.jsx`, which receives no route params, can
// still resolve the locale of the request.
export const LOCALE_HEADER = "x-locale";

export const isLocale = (value) => LOCALES.includes(value);

export const resolveLocale = (value) => (isLocale(value) ? value : DEFAULT_LOCALE);
