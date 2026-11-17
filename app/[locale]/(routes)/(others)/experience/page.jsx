import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { getProject } from "@/lib/data"
import { localeHref } from "@/lib/i18n/routing"
import { localeAlternates } from "@/lib/i18n/seo"
import { resolveLocale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { PageHeader, SectionLabel } from "@/components/editorial"
import { getExperience, getEducation, getLanguages, getTechProfile, getTraining } from "@/lib/profile"

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
    const training = getTraining(locale)
    const techProfile = getTechProfile(locale)

    return (
        <section className="mx-auto max-w-[1240px] px-6 pt-32 md:px-10 md:pt-44">
            <PageHeader
                eyebrow={dict.experience.eyebrow}
                title={dict.experience.heading}
                intro={dict.experience.intro}
            />

            <ol className="mt-20 border-b border-line md:mt-28">
                {experience.map((job) => {
                    const related = job.projectSlug && getProject(job.projectSlug, locale)

                    return (
                        <li
                            key={job.company}
                            className="grid grid-cols-1 gap-x-12 gap-y-4 border-t border-foreground py-10 lg:grid-cols-12"
                        >
                            <div className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
                                <p className="font-mono text-[0.78rem] tabular-nums text-subtle">{job.period}</p>
                                {job.current && (
                                    <span className="mt-2 inline-block bg-brand px-1.5 py-1 font-mono text-[0.65rem] uppercase leading-none tracking-[0.14em] text-brand-ink">
                                        {dict.experience.current}
                                    </span>
                                )}
                                {job.periodNote && (
                                    <p className="mt-1 font-mono text-[0.7rem] text-subtle">{job.periodNote}</p>
                                )}
                            </div>

                            <div className="min-w-0 lg:col-span-8">
                                <h2 className="font-display text-[1.7rem] font-extrabold leading-tight md:text-[2.2rem]">
                                    {job.company}
                                </h2>
                                <p className="mt-1.5 text-lg text-muted-foreground">{job.role}</p>
                                {job.summary && (
                                    <p className="mt-5 max-w-2xl text-[1.02rem] leading-[1.85]">{job.summary}</p>
                                )}
                                {job.points?.length > 0 && (
                                    <ul className="mt-5 max-w-2xl space-y-3">
                                        {job.points.map((point, i) => (
                                            <li key={i} className="flex gap-3.5 leading-[1.8] text-foreground/90">
                                                <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-foreground" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {(job.stack?.length > 0 || related) && (
                                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                                        {job.stack?.length > 0 && (
                                            <span className="font-mono text-[0.75rem] text-subtle">
                                                {job.stack.join(" · ")}
                                            </span>
                                        )}
                                        {related && (
                                            <Link
                                                href={localeHref(locale, `/projects/${related.slug}`)}
                                                className="link-mark inline-flex items-center gap-1 text-sm font-semibold"
                                            >
                                                {dict.experience.relatedProject}
                                                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ol>

            <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-16 md:mt-32 lg:grid-cols-12">
                <div className="space-y-14 lg:col-span-5">
                    <div>
                        <SectionLabel className="mb-6">{dict.experience.education}</SectionLabel>
                        {education.map((edu) => (
                            <div key={edu.school} className="border-t border-foreground pt-4">
                                <p className="font-display text-xl font-bold">{edu.school}</p>
                                <p className="mt-1 text-muted-foreground">{edu.dept}</p>
                                <p className="mt-2 font-mono text-[0.75rem] tabular-nums text-subtle">{edu.period}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <SectionLabel className="mb-6">{dict.experience.training}</SectionLabel>
                        {training.map((item) => (
                            <div key={item.program} className="border-t border-foreground pt-4">
                                <p className="font-display text-xl font-bold">{item.program}</p>
                                <p className="mt-1 text-muted-foreground">{item.org}</p>
                                <p className="mt-2 font-mono text-[0.75rem] tabular-nums text-subtle">{item.period}</p>
                                <p className="mt-4 text-[0.95rem] leading-[1.8] text-foreground/90">{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <SectionLabel className="mb-6">{dict.experience.languages}</SectionLabel>
                        <dl className="border-t border-foreground">
                            {languages.map((lang) => (
                                <div key={lang.name} className="flex items-baseline justify-between border-b border-line py-3">
                                    <dt className="font-medium">{lang.name}</dt>
                                    <dd className="font-mono text-[0.78rem] text-subtle">{lang.level}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                    <SectionLabel className="mb-6">{dict.experience.techProfile}</SectionLabel>
                    <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                        {techProfile.map((group) => (
                            <div key={group.id} className="border-t border-foreground pt-4">
                                <dt className="font-display text-lg font-bold">{group.label}</dt>
                                <dd className="mt-3">
                                    <ul className="space-y-1.5">
                                        {group.items.map((item) => (
                                            <li key={item} className="text-[0.95rem] text-muted-foreground">{item}</li>
                                        ))}
                                    </ul>
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
