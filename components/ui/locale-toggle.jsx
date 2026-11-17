"use client"

import { usePathname } from "next/navigation"

import { stripLocale, localeHref } from "@/lib/i18n/routing"
import { useI18n } from "@/components/providers/i18n-provider"
import { LOCALES, LOCALE_META, LOCALE_COOKIE } from "@/lib/i18n/config"

// A plain <a>, not <Link>: a client transition across [locale] would leave
// <html lang> stale and re-create the layout's JSON-LD script.
export const LocaleToggle = () => {
    const pathname = usePathname()
    const { locale, dict } = useI18n()

    const target = LOCALES.find((candidate) => candidate !== locale) ?? locale
    const meta = LOCALE_META[target]

    const remember = () => {
        document.cookie = `${LOCALE_COOKIE}=${target};path=/;max-age=31536000;samesite=lax`
    }

    return (
        <a
            href={localeHref(target, stripLocale(pathname))}
            onClick={remember}
            hrefLang={meta.htmlLang}
            aria-label={`${dict.nav.switchLanguage} — ${meta.label}`}
            title={meta.label}
            className="
                flex h-8 min-w-8 items-center justify-center rounded-full px-2
                border border-line font-mono text-[0.7rem] tracking-[0.08em]
                text-muted-foreground transition-all duration-300
                hover:bg-accent hover:text-foreground active:scale-90
            "
        >
            {meta.short}
        </a>
    )
}
