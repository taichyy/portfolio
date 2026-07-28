import { headers } from "next/headers"

import NotFoundContent from "@/components/not-found-content"
import { LOCALE_HEADER, resolveLocale } from "@/lib/i18n/config"

// Reached when a page calls notFound() (e.g. an unknown project slug).
// This file gets no route params, so the locale arrives via the proxy header.
const NotFound = async () => {
    const locale = resolveLocale((await headers()).get(LOCALE_HEADER))

    return <NotFoundContent locale={locale} />
}

export default NotFound
