import { LOCALES, LOCALE_META } from "./config"

export const SITE_URL = "https://www.heytai.dev";

export const languageAlternates = (path = "") =>
    Object.fromEntries(
        LOCALES.map((locale) => [
            LOCALE_META[locale].htmlLang,
            `${SITE_URL}/${locale}${path}`,
        ]),
    );

export const canonicalPath = (locale, path = "") => `/${locale}${path}`;

export const localeAlternates = (locale, path = "") => ({
    canonical: canonicalPath(locale, path),
    languages: languageAlternates(path),
});
