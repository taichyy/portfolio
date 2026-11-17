import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { localeHref } from "@/lib/i18n/routing"
import { resolveLocale } from "@/lib/i18n/config"
import { localeAlternates } from "@/lib/i18n/seo"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Marked, SectionLabel } from "@/components/editorial"
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
        { k: dict.about.facts.stack, v: profile.focus },
        { k: dict.about.facts.location, v: profile.location },
    ]

    return (
        <section className="mx-auto max-w-[1240px] px-6 pt-32 md:px-10 md:pt-44">
            <header className="max-w-4xl">
                <p className="label-mono">{dict.about.eyebrow}</p>
                <h1 className="font-display mt-6 text-[2.4rem] font-extrabold leading-[1.1] md:text-[3.6rem]">
                    {about.intro.map((line, i) => (
                        <span key={i} className="block">
                            <Marked text={line} />
                        </span>
                    ))}
                </h1>
            </header>

            <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-14 md:mt-28 lg:grid-cols-12">
                <div className="order-2 space-y-12 lg:order-1 lg:col-span-7">
                    {about.body.map((block) => (
                        <div key={block.label} className="border-t border-foreground pt-5">
                            <h2 className="font-display text-xl font-bold">{block.label}</h2>
                            <p className="mt-3 text-[1.02rem] leading-[1.9] text-foreground/90">
                                {block.text}
                            </p>
                        </div>
                    ))}
                </div>

                <aside className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9 lg:sticky lg:top-24 lg:self-start">
                    <dl className="border-t border-foreground">
                        {facts.map((f) => (
                            <div key={f.k} className="border-b border-line py-3.5">
                                <dt className="label-mono">{f.k}</dt>
                                <dd className="mt-1.5 text-[0.95rem] leading-relaxed">{f.v}</dd>
                            </div>
                        ))}
                        <div className="border-b border-line py-3.5">
                            <dt className="label-mono">{dict.about.facts.links}</dt>
                            <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.95rem]">
                                {profile.socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target={s.href.startsWith("http") ? "_blank" : undefined}
                                        rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="link-mark"
                                    >
                                        {s.label}
                                    </a>
                                ))}
                            </dd>
                        </div>
                    </dl>
                </aside>
            </div>

            <div className="mt-24 border-t border-foreground pt-10 md:mt-32">
                <SectionLabel as="p">{dict.about.contactCta}</SectionLabel>
                <p className="font-display mt-8 max-w-3xl text-2xl font-bold leading-[1.45] md:text-[2.1rem]">
                    {dict.about.closing.lead}
                    <Link href={localeHref(locale, "/projects")} className="link-mark">
                        {dict.about.closing.projects}
                    </Link>
                    {dict.about.closing.and}
                    <Link href={localeHref(locale, "/experience")} className="link-mark">
                        {dict.about.closing.experience}
                    </Link>
                    {dict.about.closing.end}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
                    <Link
                        href={localeHref(locale, "/contact")}
                        className="link-mark inline-flex items-center gap-2 font-semibold"
                    >
                        {dict.about.contactCta}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <a href={`mailto:${profile.email}`} className="link-mark font-mono text-sm">
                        {profile.email}
                    </a>
                </div>
            </div>
        </section>
    )
}

export default About
