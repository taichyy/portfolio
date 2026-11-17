import Link from "next/link"

import { getProfile } from "@/lib/profile"
import { localeHref } from "@/lib/i18n/routing"
import ThemeLogo from "@/components/theme-logo"
import { getDictionary } from "@/lib/i18n/dictionaries"

const footerNav = [
    { href: "/projects", key: "projects" },
    { href: "/experience", key: "experience" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
]

const SiteFooter = (props) => {
    const { locale } = props;
    const year = new Date().getFullYear()
    const dict = getDictionary(locale)
    const profile = getProfile(locale)
    const href = (path) => localeHref(locale, path)

    return (
        <footer className="mt-28 md:mt-40">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10">
                <div className="grid grid-cols-1 gap-y-10 border-t border-foreground py-12 md:grid-cols-12 md:gap-x-10">
                    <div className="md:col-span-6">
                        <div className="flex items-center gap-3">
                            <span className="relative h-9 w-9 shrink-0">
                                <ThemeLogo sizes="36px" />
                            </span>
                            <p className="font-display text-xl font-extrabold">{dict.footer.tagline}</p>
                        </div>
                        <a href={`mailto:${profile.email}`} className="link-mark mt-5 inline-block font-mono text-sm">
                            {profile.email}
                        </a>
                    </div>

                    <nav className="md:col-span-3" aria-label={dict.nav.footer}>
                        <ul className="space-y-2">
                            {footerNav.map((item) => (
                                <li key={item.href}>
                                    <Link href={href(item.href)} className="group text-[0.95rem] font-medium">
                                        <span className="mark-hover">{dict.nav[item.key]}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <ul className="space-y-2 md:col-span-3">
                        {profile.socials.map((s) => (
                            <li key={s.label}>
                                <a
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="group text-[0.95rem] font-medium"
                                >
                                    <span className="mark-hover">{s.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center justify-between border-t border-line py-6">
                    <span className="label-mono">© {year} Tai</span>
                    <span className="label-mono">heytai.dev</span>
                </div>
            </div>
        </footer>
    )
}

export default SiteFooter
