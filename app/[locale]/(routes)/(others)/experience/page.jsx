import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { localeHref } from "@/lib/i18n/routing"
import { localeAlternates } from "@/lib/i18n/seo"
import { resolveLocale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getExperience, getEducation, getLanguages, getTechProfile } from "@/lib/profile"

export async function generateMetadata(props) {
    const locale = resolveLocale((await props.params).locale)
    const dict = getDictionary(locale)

    return {
        title: dict.meta.experience.title,
        description: dict.meta.experience.description,
        alternates: localeAlternates(locale, "/experience"),
    }
}

const Experience = async (props) => {
    const locale = resolveLocale((await props.params).locale)
    const dict = getDictionary(locale)

    const experience = getExperience(locale)
    const education = getEducation(locale)
    const languages = getLanguages(locale)
    const techProfile = getTechProfile(locale)

    return (
        <section className="mx-auto max-w-[1240px] px-6 pt-32 md:pt-40">
            <header className="max-w-2xl">
                <p className="label-mono">{dict.experience.eyebrow}</p>
                <h1 className="mt-5 font-serif text-4xl leading-[1.1] md:text-6xl">
                    {dict.experience.heading}
                </h1>
                <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
                    {dict.experience.intro}
                </p>
            </header>

            {/* Work history */}
            <div className="mt-16">
                {experience.map((job) => (
                    <div
                        key={job.company}
                        className="grid grid-cols-1 gap-x-12 gap-y-4 border-t border-line py-10 lg:grid-cols-[16rem_minmax(0,1fr)]"
                    >
                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                                    {job.period}
                                </span>
                                {job.current && (
                                    <span className="rounded-full border border-signature/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-signature">
                                        {dict.experience.current}
                                    </span>
                                )}
                            </div>
                            {job.periodNote && (
                                <p className="mt-1 font-mono text-[0.68rem] text-muted-foreground/60">
                                    {job.periodNote}
                                </p>
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="font-serif text-2xl md:text-3xl">{job.company}</h2>
                            <p className="mt-1 text-muted-foreground">{job.role}</p>
                            {job.summary && (
                                <p className="mt-4 max-w-prose leading-8 text-foreground/90">
                                    {job.summary}
                                </p>
                            )}
                            {job.points?.length > 0 && (
                                <ul className="mt-4 max-w-prose space-y-2.5">
                                    {job.points.map((point, i) => (
                                        <li key={i} className="flex gap-3 leading-7 text-foreground/90">
                                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signature" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                                {job.stack?.length > 0 && (
                                    <span className="font-mono text-[0.72rem] text-muted-foreground">
                                        {job.stack.join(" · ")}
                                    </span>
                                )}
                                {job.projectSlug && (
                                    <Link
                                        href={localeHref(locale, `/projects/${job.projectSlug}`)}
                                        className="group inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-foreground hover:text-signature"
                                    >
                                        {dict.experience.relatedProject}
                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="border-t border-line" />
            </div>

            {/* Education + languages + tech */}
            <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-2">
                <div>
                    <h2 className="mb-6 font-mono text-sm uppercase tracking-[0.2em]">
                        {dict.experience.education}
                    </h2>
                    {education.map((edu) => (
                        <div key={edu.school} className="border-t border-line pt-5">
                            <p className="font-serif text-xl">{edu.school}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{edu.dept}</p>
                            <p className="mt-1 font-mono text-xs text-muted-foreground/70">{edu.period}</p>
                        </div>
                    ))}
                    <h2 className="mb-6 mt-12 font-mono text-sm uppercase tracking-[0.2em]">
                        {dict.experience.languages}
                    </h2>
                    <div className="space-y-2 border-t border-line pt-5">
                        {languages.map((lang) => (
                            <div key={lang.name} className="flex items-baseline justify-between">
                                <span className="text-foreground/90">{lang.name}</span>
                                <span className="font-mono text-xs text-muted-foreground">{lang.level}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="mb-6 font-mono text-sm uppercase tracking-[0.2em]">
                        {dict.experience.techProfile}
                    </h2>
                    <dl className="space-y-6">
                        {techProfile.map((group) => (
                            <div key={group.id} className="border-t border-line pt-5">
                                <dt className="font-serif text-lg">{group.label}</dt>
                                <dd className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                                    {group.items.map((item) => (
                                        <span key={item} className="text-[0.95rem] text-foreground/90">
                                            {item}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}

export default Experience
