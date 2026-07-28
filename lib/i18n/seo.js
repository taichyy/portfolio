import { LOCALES, LOCALE_META } from "./config"

export const SITE_URL = "https://www.heytai.dev";

// hreflang map pointing each page at its translated twin.
export const languageAlternates = (path = "") =>
    Object.fromEntries(
        LOCALES.map((locale) => [
            LOCALE_META[locale].htmlLang,
            `${SITE_URL}/${locale}${path}`,
        ]),
    );

export const canonicalPath = (locale, path = "") => `/${locale}${path}`;

// Metadata shared by every localised page.
export const localeAlternates = (locale, path = "") => ({
    canonical: canonicalPath(locale, path),
    languages: languageAlternates(path),
});
