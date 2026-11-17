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

export const isLocale = (value) => LOCALES.includes(value);

export const resolveLocale = (value) => (isLocale(value) ? value : DEFAULT_LOCALE);
