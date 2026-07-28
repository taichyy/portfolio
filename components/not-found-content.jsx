import Link from "next/link"

import { localeHref } from "@/lib/i18n/routing"
import { getDictionary } from "@/lib/i18n/dictionaries"

const NotFoundContent = (props) => {
    const { locale } = props;
    const dict = getDictionary(locale);

    return (
        <main className="mx-auto flex min-h-screen max-w-[1240px] flex-col justify-center px-6">
            <p className="font-mono text-sm text-signature">404</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                {dict.notFound.heading}
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
                {dict.notFound.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <Link
                    href={localeHref(locale, "/")}
                    className="border-b border-foreground pb-1 text-sm font-medium hover:border-signature hover:text-signature"
                >
                    {dict.notFound.home}
                </Link>
                <Link
                    href={localeHref(locale, "/projects")}
                    className="font-mono text-sm text-muted-foreground hover:text-foreground"
                >
                    {dict.notFound.projects}
                </Link>
            </div>
        </main>
    )
}

export default NotFoundContent
