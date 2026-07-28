"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowUpRight, Lightbulb, ListChecks } from "lucide-react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { getCategoryMeta } from "@/lib/data"
import Lightbox from "@/components/lightbox"
import { useI18n } from "@/components/providers/i18n-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Case-study sections, in order. Rendered only when the field exists.
const caseOrder = [
    "background",
    "overview",
    "context",
    "contribution",
    "challenge",
    "implementation",
    "result",
    "retrospective",
]

const DeepDiveBlock = (props) => {
    const { block, dict } = props;

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
                                <h4 className="mt-2 text-base font-semibold">{item.title || "--"}</h4>
                                <p className="leading-7 text-muted-foreground">{item.description || "--"}</p>
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
                <button
                    type="button"
                    onClick={() => props.onImageClick?.([{ src: block.src, alt: block.alt || block.caption || "Image" }], 0)}
                    className="block w-full cursor-zoom-in overflow-hidden rounded border border-line transition-opacity hover:opacity-90"
                    aria-label={dict.project.zoomImage}
                >
                    <Image
                        src={block.src}
                        alt={block.alt || "Image"}
                        width={1000}
                        height={700}
                        className="w-full"
                    />
                </button>
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
                <span className="font-mono text-xs text-signature tabular-nums">
                    {String(index).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-line sm:mt-2" />
            </div>
            <div>
                <h2 className="font-serif text-2xl">{heading}</h2>
                {children}
            </div>
        </section>
    )
}

const ProjectDetail = (props) => {
    const { project } = props;
    const { locale, dict, href } = useI18n();

    const liveLink = project.links?.live
    const repoLink = project.links?.github
    const cat = getCategoryMeta(locale)[project.category]

    const hasDecisions = project.decisions?.length > 0

    // Build the ordered list of case-study blocks, inserting Engineering
    // Decisions just before Result (or at the end if there is no Result).
    const blocks = []
    caseOrder.forEach((key) => {
        if (key === "result" && hasDecisions) blocks.push({ type: "decisions" })
        if (project[key]) {
            // Let a project give its background section a custom heading.
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

    const [carouselApi, setCarouselApi] = useState(null)
    const [current, setCurrent] = useState(1)
    const total = project.img?.length || 0
    const galleryImages = (project.img || []).map((src, i) => ({
        src,
        alt: `${project.title} — ${i + 1}`,
    }))

    // Lightbox (enlarged image view)
    const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 })
    const openLightbox = (images, index) =>
        setLightbox({ open: true, images, index })
    const setLightboxOpen = (open) =>
        setLightbox((s) => ({ ...s, open }))

    useEffect(() => {
        if (!carouselApi) return
        const onSelect = () => setCurrent(carouselApi.selectedScrollSnap() + 1)
        carouselApi.on("select", onSelect)
        return () => { carouselApi.off("select", onSelect) }
    }, [carouselApi])

    return (
        <article className="mx-auto max-w-[1240px] px-6 pt-28 md:pt-32">
            {/* Back + external links */}
            <div className="flex items-center justify-between">
                <Link
                    href={href("/projects")}
                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
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
                                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground hover:text-signature">
                                {dict.project.visit} <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Title block */}
            <header className="mt-10 border-t border-line pt-10">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="label-mono">{cat?.label || dict.project.fallbackCategory}</span>
                    {project.openSource && project.category !== "opensource" && (
                        <span className="label-mono text-signature">{dict.project.openSource}</span>
                    )}
                </div>
                <h1 className="mt-5 font-serif text-4xl leading-[1.05] md:text-6xl">
                    {project.title}
                </h1>
                <p className="mt-5 max-w-2xl font-serif text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
                    {project.tagline}
                </p>
            </header>

            {/* Body: meta rail + main column */}
            <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
                {/* Meta rail */}
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <dl className="space-y-5 border-l border-line pl-5 text-sm">
                        <Meta k={dict.project.meta.category} v={cat?.label} />
                        <Meta k={dict.project.meta.role} v={project.role} />
                        <Meta k={dict.project.meta.year} v={project.year} />
                        <Meta k={dict.project.meta.client} v={project.client} />
                        <Meta k={dict.project.meta.company} v={project.company} />
                        {project.stack?.length > 0 && (
                            <div>
                                <dt className="label-mono">{dict.project.meta.technology}</dt>
                                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                                    {project.stack.map((s) => (
                                        <span key={s} className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
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
                                            className="link-editorial w-fit text-foreground hover:text-signature">
                                            {dict.project.liveLink}
                                        </a>
                                    )}
                                    {repoLink && (
                                        <a href={repoLink} target="_blank" rel="noopener noreferrer"
                                            className="link-editorial w-fit text-foreground hover:text-signature">
                                            {dict.project.repoLink}
                                        </a>
                                    )}
                                </dd>
                            </div>
                        )}
                    </dl>
                </aside>

                {/* Main column */}
                <div className="min-w-0">
                    {/* Gallery */}
                    {total === 1 && (
                        <div className="mb-14">
                            <button
                                type="button"
                                onClick={() => openLightbox(galleryImages, 0)}
                                className="block w-full cursor-zoom-in overflow-hidden rounded border border-line transition-opacity hover:opacity-90"
                                aria-label={dict.project.zoomImage}
                            >
                                <Image
                                    src={project.img[0]}
                                    alt={galleryImages[0].alt}
                                    width={1920}
                                    height={1080}
                                    className="aspect-video w-full object-cover"
                                />
                            </button>
                        </div>
                    )}

                    {total > 1 && (
                        <div className="mb-14">
                            <Carousel className="w-full" opts={{ loop: true }} setApi={setCarouselApi}>
                                <CarouselContent>
                                    {project.img.map((src, i) => (
                                        <CarouselItem key={i}>
                                            <button
                                                type="button"
                                                onClick={() => openLightbox(galleryImages, i)}
                                                className="block w-full cursor-zoom-in overflow-hidden rounded border border-line transition-opacity hover:opacity-90"
                                                aria-label={dict.project.zoomImageAt(i + 1)}
                                            >
                                                <Image
                                                    src={src}
                                                    alt={galleryImages[i].alt}
                                                    width={1920}
                                                    height={1080}
                                                    className="aspect-video w-full object-cover"
                                                />
                                            </button>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-3 bg-background/80 backdrop-blur-sm" />
                                <CarouselNext className="right-3 bg-background/80 backdrop-blur-sm" />
                            </Carousel>
                            <div className="mt-3 flex justify-center gap-1.5">
                                {project.img.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => carouselApi?.scrollTo(i)}
                                        aria-label={dict.project.goToImage(i + 1)}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all duration-300",
                                            current === i + 1 ? "w-4 bg-signature" : "w-1.5 bg-muted-foreground/30",
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Case study */}
                    <div className="space-y-12">
                        {blocks.map((block, i) => {
                            if (block.type === "decisions") {
                                return (
                                    <CaseSection key="decisions" index={i + 1} heading={dict.project.sections.decisions}>
                                        <ul className="mt-4 space-y-5">
                                            {project.decisions.map((d, di) => (
                                                <li key={di} className="border-l-2 border-line pl-4">
                                                    <p className="font-medium text-foreground">{d.title}</p>
                                                    <p className="mt-1 max-w-prose leading-8 text-foreground/90">{d.text}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </CaseSection>
                                )
                            }
                            return (
                                <CaseSection key={block.key} index={i + 1} heading={block.heading}>
                                    <p className="mt-3 max-w-prose text-[1.02rem] leading-8 text-foreground/90">
                                        {project[block.key]}
                                    </p>
                                </CaseSection>
                            )
                        })}
                    </div>

                    {/* Deep dive (optional) */}
                    {project.data?.length > 0 && (
                        <div className="mt-16 border-t border-line pt-10">
                            <p className="label-mono mb-8">{dict.project.deepDive}</p>
                            <div className="space-y-10">
                                {project.data.map((section, si) => (
                                    <section key={si}>
                                        {section.title && (
                                            <h3 className="font-serif text-xl">{section.title}</h3>
                                        )}
                                        {section.content?.map((block, bi) => (
                                            <DeepDiveBlock key={bi} block={block} dict={dict} onImageClick={openLightbox} />
                                        ))}
                                    </section>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Foot */}
                    <div className="mt-16 border-t border-line pt-8">
                        <Link
                            href={href("/projects")}
                            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                            {dict.project.back}
                        </Link>
                    </div>
                </div>
            </div>

            <Lightbox
                open={lightbox.open}
                onOpenChange={setLightboxOpen}
                images={lightbox.images}
                startIndex={lightbox.index}
                title={project.title}
            />
        </article>
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

export default ProjectDetail
