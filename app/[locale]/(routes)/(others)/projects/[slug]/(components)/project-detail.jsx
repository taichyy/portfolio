import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Lightbulb, ListChecks } from "lucide-react"

import Gallery from "./gallery"
import ZoomableImage from "./zoomable-image"
import { localeHref } from "@/lib/i18n/routing"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { Marked, NumberTab, SectionLabel } from "@/components/editorial"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const caseOrder = [
    "background",
    "overview",
    "context",
    "contribution",
    "challenge",
    "implementation",
    "result",
]

const backLink = "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"

const DeepDiveBlock = (props) => {
    const { block, fallbackAlt } = props;

    if (block.type === "paragraph") {
        return <p className="mt-4 leading-8 text-foreground/90">{block.text}</p>
    }

    if (block.type === "items" && block.items?.length) {
        return (
            <div className="mt-4">
                {block.items.map((item, i) => (
                    <div className="ml-3.5" key={i}>
                        <div className="relative flex items-start pb-2">
                            <div className="absolute top-[2.75rem] h-[calc(100%-2.75rem)] w-px bg-border/70" />
                            <div className="absolute ml-[-14px] py-2">
                                <div className="flex size-7 shrink-0 items-center justify-center rounded bg-muted">
                                    {item.icon || <ListChecks className="h-3.5 w-3.5" />}
                                </div>
                            </div>
                            <div className="pl-12">
                                {item.title && <h4 className="mt-2 text-base font-semibold">{item.title}</h4>}
                                {item.description && (
                                    <p className={item.title ? "leading-7 text-muted-foreground" : "mt-2 leading-7 text-muted-foreground"}>
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (block.type === "img" && block.src) {
        return (
            <figure className="mt-6">
                <ZoomableImage src={block.src} alt={block.alt || block.caption || fallbackAlt} />
                {block.caption && (
                    <figcaption className="mt-2 text-right font-mono text-xs text-muted-foreground">
                        {block.caption}
                    </figcaption>
                )}
            </figure>
        )
    }

    if (block.type === "point") {
        return (
            <Alert className="mt-6 rounded">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>{block.title}</AlertTitle>
                <AlertDescription>{block.description}</AlertDescription>
            </Alert>
        )
    }

    return null
}

const CaseSection = (props) => {
    const { index, heading, children } = props;

    return (
        <section className="grid grid-cols-1 gap-x-10 sm:grid-cols-[10rem_minmax(0,1fr)]">
            <div className="mb-3 flex items-center gap-3 sm:mb-0 sm:flex-col sm:items-start sm:gap-1">
                <span className="font-mono text-xs font-medium tabular-nums text-foreground">
                    {String(index).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-foreground sm:mt-2" />
            </div>
            <div>
                <h2 className="font-display text-2xl font-bold md:text-[1.7rem]">{heading}</h2>
                {children}
            </div>
        </section>
    )
}

const Meta = (props) => {
    const { k, v } = props;
    if (!v) return null;

    return (
        <div>
            <dt className="label-mono">{k}</dt>
            <dd className="mt-1 text-foreground/90">{v}</dd>
        </div>
    )
}

const ProjectDetail = (props) => {
    const { project, locale, categoryLabel } = props;
    const dict = getDictionary(locale)
    const href = (path) => localeHref(locale, path)

    const liveLink = project.links?.live
    const repoLink = project.links?.github
    const hasDecisions = project.decisions?.length > 0

    // Decisions go right before Result, or last when there is no Result.
    const blocks = []
    caseOrder.forEach((key) => {
        if (key === "result" && hasDecisions) blocks.push({ type: "decisions" })
        if (project[key]) {
            const heading =
                key === "background" && project.bgHeading
                    ? project.bgHeading
                    : dict.project.sections[key]
            blocks.push({ type: "text", key, heading })
        }
    })
    if (hasDecisions && !blocks.some((b) => b.type === "decisions")) {
        blocks.push({ type: "decisions" })
    }

    const images = (project.img || []).map((src, i) => ({
        src,
        alt: `${project.title} — ${i + 1}`,
    }))

    return (
        <article className="mx-auto max-w-[1240px] px-6 pt-28 md:px-10 md:pt-36">
            <div className="flex items-center justify-between">
                <Link href={href("/projects")} className={backLink}>
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:-translate-x-0.5" aria-hidden />
                    {dict.project.back}
                </Link>
                {(liveLink || repoLink) && (
                    <div className="flex items-center gap-5">
                        {repoLink && (
                            <a href={repoLink} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
                                {dict.project.source} <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        )}
                        {liveLink && (
                            <a href={liveLink} target="_blank" rel="noopener noreferrer"
                                className="link-mark inline-flex items-center gap-1.5 text-sm font-semibold">
                                {dict.project.visit} <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                )}
            </div>

            <header className="mt-10 border-t border-foreground pt-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <NumberTab n={project.number} />
                    <span className="label-mono">{categoryLabel || dict.project.fallbackCategory}</span>
                    {project.openSource && project.category !== "opensource" && (
                        <span className="bg-brand px-1.5 py-0.5 font-mono text-[0.65rem] uppercase leading-none tracking-[0.12em] text-brand-ink">
                            {dict.project.openSource}
                        </span>
                    )}
                </div>
                <h1 className="font-display mt-7 max-w-5xl text-display-xl font-extrabold leading-[1.04]">
                    <Marked text={project.displayTitle || project.title} />
                </h1>
                <p className="mt-7 max-w-3xl text-xl font-medium leading-[1.6] text-muted-foreground md:text-2xl">
                    {project.tagline}
                </p>
            </header>

            <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <dl className="space-y-5 border-l border-foreground pl-5 text-sm">
                        <Meta k={dict.project.meta.category} v={categoryLabel} />
                        <Meta k={dict.project.meta.role} v={project.role} />
                        <Meta k={dict.project.meta.year} v={project.year} />
                        <Meta k={dict.project.meta.client} v={project.client} />
                        <Meta k={dict.project.meta.company} v={project.company} />
                        {project.stack?.length > 0 && (
                            <div>
                                <dt className="label-mono">{dict.project.meta.technology}</dt>
                                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                                    {project.stack.map((s) => (
                                        <span key={s} className="border border-line px-1.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
                                            {s}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        )}
                        {(liveLink || repoLink) && (
                            <div>
                                <dt className="label-mono">{dict.project.meta.links}</dt>
                                <dd className="mt-1.5 flex flex-col gap-1">
                                    {liveLink && (
                                        <a href={liveLink} target="_blank" rel="noopener noreferrer"
                                            className="link-mark w-fit font-medium">
                                            {dict.project.liveLink}
                                        </a>
                                    )}
                                    {repoLink && (
                                        <a href={repoLink} target="_blank" rel="noopener noreferrer"
                                            className="link-mark w-fit font-medium">
                                            {dict.project.repoLink}
                                        </a>
                                    )}
                                </dd>
                            </div>
                        )}
                    </dl>
                </aside>

                <div className="min-w-0">
                    <Gallery images={images} title={project.title} transitionName={`project-shot-${project.slug}`} />

                    <div className="space-y-12">
                        {blocks.map((block, i) => {
                            if (block.type === "decisions") {
                                return (
                                    <CaseSection key="decisions" index={i + 1} heading={dict.project.sections.decisions}>
                                        <ul className="mt-4 space-y-5">
                                            {project.decisions.map((d, di) => (
                                                <li key={di} className="border-l-2 border-foreground pl-4">
                                                    <p className="font-display text-lg font-bold">{d.title}</p>
                                                    <p className="mt-1 max-w-prose leading-8 text-foreground/90">{d.text}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </CaseSection>
                                )
                            }
                            return (
                                <CaseSection key={block.key} index={i + 1} heading={block.heading}>
                                    <p className="mt-3 max-w-prose text-[1.02rem] leading-[1.9] text-foreground/90">
                                        {project[block.key]}
                                    </p>
                                </CaseSection>
                            )
                        })}
                    </div>

                    {project.data?.length > 0 && (
                        <div className="mt-20 border-t border-foreground pt-10">
                            <SectionLabel as="p" className="mb-10">{dict.project.deepDive}</SectionLabel>
                            <div className="space-y-10">
                                {project.data.map((section, si) => (
                                    <section key={si}>
                                        {section.title && (
                                            <h3 className="font-display text-xl font-bold">{section.title}</h3>
                                        )}
                                        {section.content?.map((block, bi) => (
                                            <DeepDiveBlock key={bi} block={block} fallbackAlt={project.title} />
                                        ))}
                                    </section>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-16 border-t border-line pt-8">
                        <Link href={href("/projects")} className={backLink}>
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:-translate-x-0.5" aria-hidden />
                            {dict.project.back}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ProjectDetail
