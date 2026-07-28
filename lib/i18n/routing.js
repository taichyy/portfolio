import { LOCALES, DEFAULT_LOCALE } from "./config"

// Every route lives under a locale segment: `/zh-TW`, `/en/projects`, …
export const localeHref = (locale, href = "/") => {
    const base = `/${locale || DEFAULT_LOCALE}`;
    if (!href || href === "/") return base;
    return `${base}${href.startsWith("/") ? href : `/${href}`}`;
};

// `/en/projects/taidypass` → `/projects/taidypass`
export const stripLocale = (pathname) => {
    for (const locale of LOCALES) {
        if (pathname === `/${locale}`) return "/";
        if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
    }
    return pathname;
};

// `/en/projects` → `en`, `/projects` → null
export const localeFromPathname = (pathname) =>
    LOCALES.find(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    ) ?? null;
