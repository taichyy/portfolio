"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"
import { useEffect, useState, useRef } from "react"

import { featuredProjects } from "@/lib/data"
import ProjectRow from "@/components/project-row"
import SiteFooter from "@/components/site-footer"
import ScrollReveal from "@/components/scroll-reveal"
import { profile, experience, techProfile } from "@/lib/profile"

export default function HomePage() {
    const [showScrollButton, setShowScrollButton] = useState(true)
    const nextSectionRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            // 如果滾動超過 100px，隱藏按鈕
            setShowScrollButton(window.scrollY < 100)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToNextSection = () => {
        if (nextSectionRef.current) {
            const navHeight = 64 // 導航列高度 (h-16 = 64px)
            const offset = 40 // 額外往上一點的偏移
            const elementPosition = nextSectionRef.current.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.scrollY - navHeight - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    return (
        <main className="min-h-screen">
            {/* ── Identity ─────────────────────────────────────── */}
            <section className="relative mx-auto flex min-h-screen max-w-[1240px] flex-col justify-center px-6 py-24">
                <div>
                    <h1 className="font-serif text-6xl leading-none animate-fade-up [animation-delay:60ms] md:text-8xl">
                        Tai
                    </h1>

                    <div className="mt-6 flex flex-col gap-1 animate-fade-up [animation-delay:120ms]">
                        <p className="font-mono text-sm uppercase tracking-[0.18em]">
                            Software Engineer
                        </p>
                        <p className="font-mono text-sm text-muted-foreground">
                            Currently — {profile.currentRole}
                        </p>
                    </div>

                    <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground animate-fade-up [animation-delay:180ms]">
                        {profile.intro}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 animate-fade-up [animation-delay:240ms]">
                        <Link
                            href="/experience"
                            className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium transition-colors hover:border-signature hover:text-signature"
                        >
                            查看經歷
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                        >
                            查看作品
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

                {/* Scroll down button */}
                <button
                    onClick={scrollToNextSection}
                    className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-all duration-500 hover:text-foreground ${
                        showScrollButton ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    aria-label="往下捲動"
                >
                    <span className="label-mono">往下</span>
                    <ChevronDown className="h-5 w-5 animate-bounce" />
                </button>
            </section>

            {/* ── Professional summary ─────────────────────────── */}
            <ScrollReveal>
                <section ref={nextSectionRef} className="mx-auto max-w-[1240px] px-6">
                    <div className="rule-top grid grid-cols-1 gap-x-12 gap-y-6 pt-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
                        <h2 className="font-mono text-sm uppercase tracking-[0.2em]">Profile</h2>
                        <div className="max-w-prose space-y-5">
                            {profile.summary.map((p, i) => (
                                <p key={i} className="text-[1.05rem] leading-8 text-foreground/90">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ── Selected work ────────────────────────────────── */}
            {featuredProjects.length > 0 && (
                <ScrollReveal delay={100}>
                    <section className="mx-auto mt-24 max-w-[1240px] px-6">
                        <div className="mb-6 flex items-baseline justify-between">
                            <h2 className="font-mono text-sm uppercase tracking-[0.2em]">Selected Work</h2>
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                            >
                                全部作品
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                        <div>
                            {featuredProjects.map((project, i) => (
                                <ProjectRow key={project.slug} project={project} index={i} />
                            ))}
                            <div className="border-t border-line" />
                        </div>
                    </section>
                </ScrollReveal>
            )}

            {/* ── Experience ───────────────────────────────────── */}
            <ScrollReveal delay={150} stagger>
                <section className="mx-auto mt-24 max-w-[1240px] px-6">
                    <div className="mb-6 flex items-baseline justify-between">
                        <h2 className="font-mono text-sm uppercase tracking-[0.2em]">Experience</h2>
                        <Link
                            href="/experience"
                            className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                        >
                            完整經歷
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                    <div>
                        {experience.map((job) => (
                            <div
                                key={job.company}
                                className="flex flex-col gap-1 border-t border-line py-5 px-4 transition-all duration-300 hover:bg-muted/30 hover:-mx-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                            >
                                <div className="min-w-0">
                                    <p className="font-serif text-xl">{job.company}</p>
                                    <p className="mt-0.5 text-sm text-muted-foreground">{job.role}</p>
                                </div>
                                <span className="shrink-0 font-mono text-xs text-muted-foreground/70 tabular-nums">
                                    {job.period}
                                </span>
                            </div>
                        ))}
                        <div className="border-t border-line" />
                    </div>
                </section>
            </ScrollReveal>

            {/* ── Technical profile ────────────────────────────── */}
            <ScrollReveal delay={100} stagger>
                <section className="mx-auto mt-24 max-w-[1240px] px-6">
                    <h2 className="mb-8 font-mono text-sm uppercase tracking-[0.2em]">
                        Technical Profile
                    </h2>
                    <dl className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
                        {techProfile.map((group) => (
                            <div key={group.group} className="border-t border-line pt-5 transition-colors hover:bg-muted/20">
                                <dt className="flex items-baseline gap-3">
                                    <span className="font-serif text-lg">{group.group}</span>
                                    <span className="label-mono">{group.en}</span>
                                </dt>
                                <dd className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                                    {group.items.map((item) => (
                                        <span key={item} className="text-[0.95rem] text-foreground/90">
                                            {item}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>
            </ScrollReveal>

            {/* ── Contact ──────────────────────────────────────── */}
            <ScrollReveal delay={100}>
                <section className="mx-auto mt-24 max-w-[1240px] px-6">
                    <div className="rule-top pt-12">
                        <p className="label-mono">Contact</p>
                        <p className="mt-5 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
                            {profile.contact.heading}
                        </p>
                        <p className="mt-5 max-w-xl leading-8 text-muted-foreground">
                            {profile.contact.body}
                        </p>
                        <a
                            href={`mailto:${profile.email}`}
                            className="group mt-6 inline-flex items-center gap-2 font-mono text-lg transition-all hover:text-signature hover:translate-x-1"
                        >
                            {profile.email}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </section>
            </ScrollReveal>

            <SiteFooter />
        </main>
    )
}
