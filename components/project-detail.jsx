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
import { categoryMeta } from "@/lib/data"
import Lightbox from "@/components/lightbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Case-study sections, in order. Rendered only when the field exists.
const caseOrder = [
    { key: "background", en: "BACKGROUND", zh: "背景" },
    { key: "overview", en: "OVERVIEW", zh: "專案概述" },
    { key: "context", en: "CONTEXT", zh: "為什麼需要它" },
    { key: "contribution", en: "MY ROLE", zh: "我負責的部分" },
    { key: "challenge", en: "TECHNICAL CHALLENGE", zh: "技術挑戰" },
    { key: "implementation", en: "IMPLEMENTATION", zh: "怎麼實作的" },
    { key: "result", en: "RESULT", zh: "成果" },
    { key: "retrospective", en: "WHAT I'D DO DIFFERENTLY", zh: "如果重做" },
]

const DeepDiveBlock = (props) => {
    const { block } = props;

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
                    aria-label="放大檢視圖片"
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
    const { index, en, zh, children } = props;
    return (
        <section className="grid grid-cols-1 gap-x-10 sm:grid-cols-[10rem_minmax(0,1fr)]">
            <div className="mb-3 flex items-center gap-3 sm:mb-0 sm:flex-col sm:items-start sm:gap-1">
                <span className="font-mono text-xs text-signature tabular-nums">
                    {String(index).padStart(2, "0")}
                </span>
                <span className="label-mono sm:leading-relaxed">{en}</span>
            </div>
            <div>
                <h2 className="font-serif text-2xl">{zh}</h2>
                {children}
            </div>
        </section>
    )
}

const ProjectDetail = (props) => {
    const { project } = props;

    const liveLink = project.links?.live
    const repoLink = project.links?.github
    const cat = categoryMeta[project.category]

    const hasDecisions = project.decisions?.length > 0

    // Build the ordered list of case-study blocks, inserting Engineering
    // Decisions just before Result (or at the end if there is no Result).
    const blocks = []
    caseOrder.forEach((s) => {
        if (s.key === "result" && hasDecisions) blocks.push({ type: "decisions" })
        if (project[s.key]) {
            // Let a project give its background section a custom heading.
            const zh = s.key === "background" && project.bgHeading ? project.bgHeading : s.zh
            blocks.push({ type: "text", ...s, zh })
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
                    href="/projects"
                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                    所有作品
                </Link>
                {(liveLink || repoLink) && (
                    <div className="flex items-center gap-5">
                        {repoLink && (
                            <a href={repoLink} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
                                Source <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        )}
                        {liveLink && (
                            <a href={liveLink} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground hover:text-signature">
                                Visit <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Title block */}
            <header className="mt-10 border-t border-line pt-10">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="label-mono">{cat?.en || "Project"}</span>
                    {project.openSource && project.category !== "opensource" && (
                        <span className="label-mono text-signature">Open Source</span>
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
                        <Meta k="Category" v={cat?.label} />
                        <Meta k="Role" v={project.role} />
                        <Meta k="Year" v={project.year} />
                        <Meta k="Client" v={project.client} />
                        <Meta k="Company" v={project.company} />
                        {project.stack?.length > 0 && (
                            <div>
                                <dt className="label-mono">Technology</dt>
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
                                <dt className="label-mono">Links</dt>
                                <dd className="mt-1.5 flex flex-col gap-1">
                                    {liveLink && (
                                        <a href={liveLink} target="_blank" rel="noopener noreferrer"
                                            className="link-editorial w-fit text-foreground hover:text-signature">
                                            線上連結
                                        </a>
                                    )}
                                    {repoLink && (
                                        <a href={repoLink} target="_blank" rel="noopener noreferrer"
                                            className="link-editorial w-fit text-foreground hover:text-signature">
                                            Github
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
                                aria-label="放大檢視圖片"
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
                                                aria-label={`放大檢視第 ${i + 1} 張`}
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
                                        aria-label={`第 ${i + 1} 張`}
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
                                    <CaseSection key="decisions" index={i + 1} en="ENGINEERING DECISIONS" zh="關鍵工程決策">
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
                                <CaseSection key={block.key} index={i + 1} en={block.en} zh={block.zh}>
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
                            <p className="label-mono mb-8">Deep dive · 細節</p>
                            <div className="space-y-10">
                                {project.data.map((section, si) => (
                                    <section key={si}>
                                        {section.title && (
                                            <h3 className="font-serif text-xl">{section.title}</h3>
                                        )}
                                        {section.content?.map((block, bi) => (
                                            <DeepDiveBlock key={bi} block={block} onImageClick={openLightbox} />
                                        ))}
                                    </section>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Foot */}
                    <div className="mt-16 border-t border-line pt-8">
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                            所有作品
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
