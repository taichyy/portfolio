import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { localeHref } from "@/lib/i18n/routing"
import { resolveLocale } from "@/lib/i18n/config"
import { localeAlternates } from "@/lib/i18n/seo"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getAbout, getProfile, getEducation, getLanguages } from "@/lib/profile"

export async function generateMetadata(props) {
    const locale = resolveLocale((await props.params).locale)
    const dict = getDictionary(locale)

    return {
        title: dict.meta.about.title,
        description: dict.meta.about.description,
        alternates: localeAlternates(locale, "/about"),
    }
}

const About = async (props) => {
    const locale = resolveLocale((await props.params).locale)
    const dict = getDictionary(locale)

    const about = getAbout(locale)
    const profile = getProfile(locale)
    const education = getEducation(locale)
    const languages = getLanguages(locale)

    const facts = [
        { k: dict.about.facts.education, v: `${education[0].school} · ${education[0].dept}` },
        {
            k: dict.about.facts.languages,
            v: languages
                .map((l) =>
                    locale === "en" ? `${l.name} (${l.level})` : `${l.name}（${l.level}）`,
                )
                .join(locale === "en" ? ", " : "、"),
        },
        { k: dict.about.facts.stack, v: "TypeScript · React · Next.js · Node.js" },
        { k: dict.about.facts.location, v: profile.location },
    ]

    return (
        <section className="mx-auto max-w-[1240px] px-6 pt-32 md:pt-40">
            {/* Intro */}
            <header className="max-w-3xl">
                <p className="label-mono">{dict.about.eyebrow}</p>
                <div className="mt-6 space-y-2">
                    {about.intro.map((line, i) => (
                        <p
                            key={i}
                            className="font-serif text-[1.8rem] leading-[1.3] md:text-4xl md:leading-[1.25]"
                        >
                            {line}
                        </p>
                    ))}
                </div>
            </header>

            {/* Body + facts rail */}
            <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
                {/* Body */}
                <div className="order-2 max-w-prose space-y-10 lg:order-1">
                    {about.body.map((block) => (
                        <div
                            key={block.label}
                            className="grid grid-cols-1 gap-x-6 sm:grid-cols-[8rem_minmax(0,1fr)]"
                        >
                            <p className="label-mono mb-2 sm:mb-0 sm:pt-1.5">{block.label}</p>
                            <p className="text-[1.02rem] leading-8 text-foreground/90">
                                {block.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Facts */}
                <aside className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
                    <dl className="space-y-4 border-l border-line pl-5">
                        {facts.map((f) => (
                            <div key={f.k}>
                                <dt className="label-mono">{f.k}</dt>
                                <dd className="mt-1 text-sm leading-6 text-foreground/90">{f.v}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="mt-8 border-l border-line pl-5">
                        <dt className="label-mono">{dict.about.facts.links}</dt>
                        <dd className="mt-2 flex flex-col gap-1.5">
                            {profile.socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="link-editorial w-fit text-sm text-muted-foreground hover:text-foreground"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </dd>
                    </div>
                </aside>
            </div>

            {/* Closing */}
            <div className="mt-20 rule-top pt-10">
                <p className="max-w-2xl font-serif text-2xl leading-relaxed md:text-3xl md:leading-[1.4]">
                    {dict.about.closing.lead}
                    <Link
                        href={localeHref(locale, "/projects")}
                        className="text-signature underline-offset-4 hover:underline"
                    >
                        {dict.about.closing.projects}
                    </Link>
                    {dict.about.closing.and}
                    <Link
                        href={localeHref(locale, "/experience")}
                        className="text-signature underline-offset-4 hover:underline"
                    >
                        {dict.about.closing.experience}
                    </Link>
                    {dict.about.closing.end}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                    <Link
                        href={localeHref(locale, "/contact")}
                        className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium hover:border-signature hover:text-signature"
                    >
                        {dict.about.contactCta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <a
                        href={`mailto:${profile.email}`}
                        className="font-mono text-sm text-muted-foreground hover:text-foreground"
                    >
                        {profile.email}
                    </a>
                </div>
            </div>
        </section>
    )
}

export default About
