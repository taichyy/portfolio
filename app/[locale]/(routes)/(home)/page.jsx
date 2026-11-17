import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { getProjects } from "@/lib/data"
import { localeHref } from "@/lib/i18n/routing"
import ProjectRow from "@/components/project-row"
import SiteFooter from "@/components/site-footer"
import { resolveLocale } from "@/lib/i18n/config"
import FeatureBand from "./(components)/feature-band"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Marked, SectionLabel } from "@/components/editorial"
import { getProfile, getExperience, getTechProfile, getTenure } from "@/lib/profile"

const byPriority = (a, b) => (a.priority || 99) - (b.priority || 99)

const SeeAll = (props) => {
    const { to, children } = props;
    return (
        <Link href={to} className="link-mark inline-flex items-center gap-1.5 text-sm font-medium">
            {children}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
    )
}

const TenureNote = (props) => {
    const { label, dict } = props;
    const { fullTimeMonths, freelanceMonths } = getTenure();
    const t = dict.home.tenure;

    return (
        <span className="group/tenure relative inline-block">
            <button
                type="button"
                aria-describedby="tenure-note"
                className="cursor-help text-left underline decoration-subtle decoration-dotted decoration-1 underline-offset-[0.3em]"
            >
                {label}
            </button>
            <span
                id="tenure-note"
                role="tooltip"
                className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-max translate-y-1 bg-foreground px-3 py-2.5 font-mono text-[0.72rem] leading-relaxed text-background opacity-0 transition duration-200 group-focus-within/tenure:translate-y-0 group-focus-within/tenure:opacity-100 group-hover/tenure:translate-y-0 group-hover/tenure:opacity-100"
            >
                <span className="flex gap-3">
                    <span className="text-brand">{t.fullTime}</span>
                    <span>{t.yearsMonths(fullTimeMonths)}</span>
                </span>
                <span className="flex gap-3">
                    <span className="text-brand">{t.freelance}</span>
                    <span>{t.years(freelanceMonths)}</span>
                </span>
            </span>
        </span>
    )
}

const HomePage = async (props) => {
    const locale = resolveLocale((await props.params).locale)
    const dict = getDictionary(locale)
    const href = (path) => localeHref(locale, path)

    const profile = getProfile(locale)
    const experience = getExperience(locale)
    const techProfile = getTechProfile(locale)

    const projects = getProjects(locale).sort(byPriority)
    const lead = projects.find((p) => p.featured)
    const rest = projects.filter((p) => p !== lead)

    const facts = [
        { k: dict.home.facts.currently, v: <TenureNote label={profile.currentRole} dict={dict} /> },
        { k: dict.home.facts.focus, v: profile.focus },
        { k: dict.home.facts.based, v: profile.location },
    ]
    const github = profile.socials.find((s) => s.label === "GitHub")

    return (
        <main className="min-h-screen">
            <section className="mx-auto grid max-w-[1240px] grid-cols-1 gap-x-12 gap-y-14 px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-44 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <h1 className="hero-title font-display text-[2.35rem] font-extrabold leading-[1.08] sm:text-5xl md:text-[3.9rem] lg:text-[4.4rem] lg:leading-[1.04]">
                        {profile.headline.map((line, i) => (
                            <span key={i} className="block">
                                <Marked text={line} />
                            </span>
                        ))}
                    </h1>

                    <p className="mt-9 max-w-xl text-lg leading-[1.75] text-muted-foreground">
                        {profile.intro}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                        <SeeAll to={href("/projects")}>{dict.home.viewProjects}</SeeAll>
                        <SeeAll to={href("/experience")}>{dict.home.viewExperience}</SeeAll>
                    </div>
                </div>

                <aside className="lg:col-span-4 lg:pt-4">
                    <dl className="border-t border-foreground">
                        {facts.map((f) => (
                            <div key={f.k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-line py-3.5">
                                <dt className="label-mono pt-0.5">{f.k}</dt>
                                <dd className="text-[0.95rem]">{f.v}</dd>
                            </div>
                        ))}
                        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-line py-3.5">
                            <dt className="label-mono pt-0.5">{dict.home.facts.elsewhere}</dt>
                            <dd className="flex flex-col items-start gap-1.5 text-[0.95rem]">
                                <a href={`mailto:${profile.email}`} className="link-mark">
                                    {profile.email}
                                </a>
                                {github && (
                                    <a href={github.href} target="_blank" rel="noopener noreferrer" className="link-mark">
                                        GitHub
                                    </a>
                                )}
                            </dd>
                        </div>
                    </dl>
                </aside>
            </section>

            {lead && <FeatureBand project={lead} locale={locale} />}

            <section className="mx-auto mt-24 grid max-w-[1240px] grid-cols-1 gap-x-12 gap-y-8 px-6 md:mt-32 md:px-10 lg:grid-cols-12">
                <div className="lg:col-span-3">
                    <SectionLabel>{dict.home.profile}</SectionLabel>
                </div>
                <div className="space-y-6 lg:col-span-8">
                    {profile.summary.map((p, i) => (
                        <p
                            key={i}
                            className={i === 0
                                ? "text-2xl font-semibold leading-[1.5] [overflow-wrap:anywhere] [word-break:keep-all] md:text-[1.75rem]"
                                : "max-w-2xl text-[1.02rem] leading-[1.85] text-muted-foreground"}
                        >
                            {p}
                        </p>
                    ))}
                </div>
            </section>

            {rest.length > 0 && (
                <section className="mx-auto mt-24 max-w-[1240px] px-6 md:mt-32 md:px-10">
                    <SectionLabel
                        className="mb-8"
                        aside={<SeeAll to={href("/projects")}>{dict.home.allProjects}</SeeAll>}
                    >
                        {dict.home.selectedWork}
                    </SectionLabel>
                    <div className="border-b border-line">
                        {rest.map((project) => (
                            <ProjectRow key={project.slug} project={project} locale={locale} />
                        ))}
                    </div>
                </section>
            )}

            <section className="mx-auto mt-24 max-w-[1240px] px-6 md:mt-32 md:px-10">
                <SectionLabel
                    className="mb-8"
                    aside={<SeeAll to={href("/experience")}>{dict.home.fullExperience}</SeeAll>}
                >
                    {dict.home.experience}
                </SectionLabel>
                <ol className="border-b border-line">
                    {experience.map((job) => (
                        <li
                            key={job.company}
                            className="grid grid-cols-1 gap-x-10 gap-y-1 border-t border-line py-6 md:grid-cols-[11rem_minmax(0,1fr)]"
                        >
                            <span className="font-mono text-[0.75rem] tabular-nums text-subtle md:pt-1.5">
                                {job.period}
                            </span>
                            <div>
                                <p className="font-display text-xl font-bold md:text-2xl">{job.company}</p>
                                <p className="mt-1 text-muted-foreground">{job.role}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="mx-auto mt-24 max-w-[1240px] px-6 md:mt-32 md:px-10">
                <SectionLabel className="mb-8">{dict.home.techProfile}</SectionLabel>
                <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {techProfile.map((group) => (
                        <div key={group.id} className="border-t border-foreground pt-4">
                            <dt className="font-display text-lg font-bold">{group.label}</dt>
                            <dd className="mt-3">
                                <ul className="space-y-1.5">
                                    {group.items.map((item) => (
                                        <li key={item} className="text-[0.95rem] text-muted-foreground">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section className="mx-auto mt-28 max-w-[1240px] px-6 md:mt-40 md:px-10">
                <div className="border-t border-foreground pt-10 md:pt-14">
                    <SectionLabel as="p">{dict.home.contact}</SectionLabel>
                    <h2 className="font-display mt-8 max-w-4xl text-[2.6rem] font-extrabold leading-[1.02] md:text-7xl">
                        <Marked text={profile.contact.heading} />
                    </h2>
                    <p className="mt-7 max-w-xl text-[1.02rem] leading-[1.8] text-muted-foreground">
                        {profile.contact.body}
                    </p>
                    <a
                        href={`mailto:${profile.email}`}
                        className="link-mark mt-9 inline-flex items-center gap-3 font-display text-2xl font-bold md:text-4xl"
                    >
                        {profile.email}
                        <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" aria-hidden />
                    </a>
                </div>
            </section>

            <SiteFooter locale={locale} />
        </main>
    )
}

export default HomePage
