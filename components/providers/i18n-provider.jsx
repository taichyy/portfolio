"use client"

import { createContext, useContext, useMemo } from "react"

import { localeHref } from "@/lib/i18n/routing"
import { DEFAULT_LOCALE } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"

// Only the locale string crosses the server/client boundary — the dictionary
// is resolved here so client components can use it without serialising it.
const I18nContext = createContext(DEFAULT_LOCALE);

const I18nProvider = (props) => {
    const { locale, children } = props;

    return <I18nContext.Provider value={locale}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
    const locale = useContext(I18nContext);

    return useMemo(
        () => ({
            locale,
            dict: getDictionary(locale),
            href: (path) => localeHref(locale, path),
        }),
        [locale],
    );
};

export default I18nProvider;
