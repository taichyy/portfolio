import { NextResponse } from "next/server"

import { localeFromPathname } from "@/lib/i18n/routing"
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_HEADER, isLocale } from "@/lib/i18n/config"

// Picks a locale from the visitor's explicit choice (cookie) first, then from
// the browser's Accept-Language header.
const detectLocale = (request) => {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    if (isLocale(cookieLocale)) return cookieLocale;

    const header = request.headers.get("accept-language") || "";
    const accepted = header
        .split(",")
        .map((part) => {
            const [tag, q] = part.trim().split(";q=");
            return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
        })
        .sort((a, b) => b.q - a.q);

    for (const { tag } of accepted) {
        if (tag.startsWith("zh")) return "zh-TW";
        if (tag.startsWith("en")) return "en";
    }

    return DEFAULT_LOCALE;
};

export default function proxy(request) {
    const { pathname, search } = request.nextUrl;
    const pathLocale = localeFromPathname(pathname);

    if (pathLocale) {
        // `not-found.jsx` gets no route params, so hand it the locale here.
        const headers = new Headers(request.headers);
        headers.set(LOCALE_HEADER, pathLocale);
        return NextResponse.next({ request: { headers } });
    }

    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    url.search = search;

    return NextResponse.redirect(url);
}

export const config = {
    // Skip Next internals, metadata routes and anything with a file extension.
    matcher: [
        "/((?!_next|api|images|icomoon|favicon.ico|robots.txt|sitemap.xml|.*\\.[\\w]+$).*)",
    ],
};
