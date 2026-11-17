"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { resolveLocale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { localeHref, localeFromPathname } from "@/lib/i18n/routing"

const NotFoundContent = () => {
    const locale = resolveLocale(localeFromPathname(usePathname() || ""));
    const dict = getDictionary(locale);

    return (
        <main className="mx-auto flex min-h-screen max-w-[1240px] flex-col justify-center px-6 md:px-10">
            <title>{dict.meta.notFound}</title>
            <p>
                <span className="bg-brand px-2 py-1 font-mono text-sm font-medium text-brand-ink">404</span>
            </p>
            <h1 className="font-display mt-8 text-[2.6rem] font-extrabold leading-[1.05] md:text-7xl">
                {dict.notFound.heading}
            </h1>
            <p className="mt-6 max-w-md text-base leading-[1.8] text-muted-foreground">
                {dict.notFound.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <Link href={localeHref(locale, "/")} className="link-mark font-semibold">
                    {dict.notFound.home}
                </Link>
                <Link href={localeHref(locale, "/projects")} className="link-mark font-semibold">
                    {dict.notFound.projects}
                </Link>
            </div>
        </main>
    )
}

export default NotFoundContent
