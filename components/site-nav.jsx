"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { stripLocale } from "@/lib/i18n/routing"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LocaleToggle } from "@/components/ui/locale-toggle"
import { useI18n } from "@/components/providers/i18n-provider"

const navItems = [
    { href: "/experience", key: "experience" },
    { href: "/projects", key: "projects" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
]

const isActive = (path, href) =>
    href === "/" ? path === "/" : path.startsWith(href)

const SiteNav = () => {
    const pathname = usePathname()
    const { dict, href } = useI18n()
    const { resolvedTheme } = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    const path = stripLocale(pathname)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => { setOpen(false) }, [pathname])

    useEffect(() => {
        document.documentElement.style.overflow = open ? "hidden" : ""
        return () => { document.documentElement.style.overflow = "" }
    }, [open])

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-[1000] transition-colors duration-300
                    ${scrolled
                        ? "border-b border-line bg-background/85 backdrop-blur-md"
                        : "border-b border-transparent"}`}
            >
                <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6">
                    {/* Wordmark with Logo */}
                    <Link href={href("/")} className="group flex items-center gap-2.5" aria-label={`HeyTai — ${dict.nav.home}`}>
                        {mounted && (
                            <div className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-110">
                                <Image
                                    src={resolvedTheme === 'dark' ? '/logo-white.png' : '/logo-dark.png'}
                                    alt="HeyTai Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        )}
                        <span className="font-serif text-xl italic leading-none transition-colors group-hover:text-signature">HeyTai</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-7 md:flex">
                        {navItems.map((item, i) => {
                            const active = isActive(path, item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={href(item.href)}
                                    style={{ animationDelay: `${i * 40}ms` }}
                                    className={`group flex items-center gap-1.5 text-sm transition-all duration-300 animate-fade-in
                                        ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:translate-y-[-1px]"}`}
                                >
                                    <span
                                        className={`h-1 w-1 rounded-full bg-signature transition-all duration-300
                                            ${active ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover:opacity-40 group-hover:scale-100"}`}
                                    />
                                    <span className="font-mono text-[0.8rem] uppercase tracking-[0.14em]">
                                        {dict.nav[item.key]}
                                    </span>
                                </Link>
                            )
                        })}
                        <div className="ml-1 h-4 w-px bg-line" />
                        <LocaleToggle />
                        <ThemeToggle />
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-3 md:hidden">
                        <LocaleToggle />
                        <ThemeToggle />
                        <button
                            onClick={() => setOpen((v) => !v)}
                            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
                            aria-expanded={open}
                            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
                        >
                            <span className={`h-px w-5 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                            <span className={`h-px w-5 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-[999] bg-background transition-all duration-500 md:hidden
                    ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            >
                <div className="flex h-full flex-col justify-between px-6 pb-12 pt-24">
                    <nav className="flex flex-col">
                        {navItems.map((item, i) => (
                            <Link
                                key={item.href}
                                href={href(item.href)}
                                style={{
                                    transitionDelay: open ? `${i * 50}ms` : '0ms',
                                    transform: open ? 'translateY(0)' : 'translateY(-20px)',
                                    opacity: open ? 1 : 0
                                }}
                                className="flex items-center justify-between border-b border-line py-5 transition-all duration-300 hover:bg-muted/20 hover:px-2 hover:-mx-2"
                            >
                                <span className="font-serif text-3xl">{dict.nav[item.key]}</span>
                                <span
                                    className={`h-1.5 w-1.5 rounded-full bg-signature transition-all duration-300
                                        ${isActive(path, item.href) ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                                />
                            </Link>
                        ))}
                    </nav>
                    <div
                        className="flex items-center justify-end transition-all duration-500"
                        style={{
                            transitionDelay: open ? '200ms' : '0ms',
                            transform: open ? 'translateY(0)' : 'translateY(20px)',
                            opacity: open ? 1 : 0
                        }}
                    >
                        <a href="mailto:tai@heytai.dev" className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">
                            tai@heytai.dev
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteNav
