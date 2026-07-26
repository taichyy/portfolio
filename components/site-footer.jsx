"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { profile } from "@/lib/profile"

const nav = [
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
]

const SiteFooter = () => {
    const year = new Date().getFullYear()
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <footer className="rule-top mt-24">
            <div className="mx-auto max-w-[1240px] px-6 py-14">
                <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-md">
                        <div className="flex items-center gap-3">
                            {mounted && (
                                <div className="relative h-10 w-10 flex-shrink-0">
                                    <Image
                                        src={resolvedTheme === 'dark' ? '/logo-white.png' : '/logo-dark.png'}
                                        alt="Tai Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                            <p className="font-serif text-2xl leading-snug">
                                Tai — 軟體工程師
                            </p>
                        </div>
                        <a
                            href={`mailto:${profile.email}`}
                            className="link-editorial mt-4 inline-block font-mono text-sm text-muted-foreground hover:text-foreground"
                        >
                            {profile.email}
                        </a>
                    </div>

                    <div className="flex flex-col gap-6 md:items-end">
                        <nav className="flex flex-wrap gap-x-6 gap-y-2">
                            {nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex gap-4">
                            {profile.socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    aria-label={s.label}
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <span className={`${s.icon} text-lg`} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
                    <span className="label-mono">© {year} Tai</span>
                    <span className="label-mono hidden sm:inline">heytai.dev</span>
                </div>
            </div>
        </footer>
    )
}

export default SiteFooter
