"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { ThemeToggle } from "@/components/ui/theme-toggle"

const links = [
    { href: "/experience", label: "Experience", zh: "經歷" },
    { href: "/projects", label: "Projects", zh: "作品" },
    { href: "/about", label: "About", zh: "關於" },
    { href: "/contact", label: "Contact", zh: "聯絡" },
]

const isActive = (pathname, href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

const SiteNav = () => {
    const pathname = usePathname()
    const { theme, resolvedTheme } = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

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
                    <Link href="/" className="group flex items-center gap-2.5" aria-label="HeyTai — 首頁">
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
                        {links.map((link, i) => {
                            const active = isActive(pathname, link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{ animationDelay: `${i * 40}ms` }}
                                    className={`group flex items-center gap-1.5 text-sm transition-all duration-300 animate-fade-in
                                        ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:translate-y-[-1px]"}`}
                                >
                                    <span
                                        className={`h-1 w-1 rounded-full bg-signature transition-all duration-300
                                            ${active ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover:opacity-40 group-hover:scale-100"}`}
                                    />
                                    <span className="font-mono text-[0.8rem] uppercase tracking-[0.14em]">
                                        {link.label}
                                    </span>
                                </Link>
                            )
                        })}
                        <div className="ml-1 h-4 w-px bg-line" />
                        <ThemeToggle />
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-3 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setOpen((v) => !v)}
                            aria-label={open ? "關閉選單" : "開啟選單"}
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
                        {links.map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{ 
                                    transitionDelay: open ? `${i * 50}ms` : '0ms',
                                    transform: open ? 'translateY(0)' : 'translateY(-20px)',
                                    opacity: open ? 1 : 0
                                }}
                                className="flex items-center justify-between border-b border-line py-5 transition-all duration-300 hover:bg-muted/20 hover:px-2 hover:-mx-2"
                            >
                                <span className="flex items-baseline gap-3">
                                    <span className="font-serif text-3xl">{link.zh}</span>
                                    <span className="label-mono">{link.label}</span>
                                </span>
                                <span
                                    className={`h-1.5 w-1.5 rounded-full bg-signature transition-all duration-300
                                        ${isActive(pathname, link.href) ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
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
