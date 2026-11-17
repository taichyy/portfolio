"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

import { EMAIL } from "@/lib/site"
import { stripLocale } from "@/lib/i18n/routing"
import ThemeLogo from "@/components/theme-logo"
import { NumberTab } from "@/components/editorial"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LocaleToggle } from "@/components/ui/locale-toggle"
import { useI18n } from "@/components/providers/i18n-provider"

const navItems = [
    { href: "/projects", key: "projects" },
    { href: "/experience", key: "experience" },
    { href: "/about", key: "about" },
    { href: "/contact", key: "contact" },
]

const isActive = (path, href) =>
    href === "/" ? path === "/" : path.startsWith(href)

const SiteNav = () => {
    const pathname = usePathname()
    const { dict, href } = useI18n()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const headerRef = useRef(null)
    const menuRef = useRef(null)
    const toggleRef = useRef(null)

    const path = stripLocale(pathname)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // While the menu is open, everything outside the header is inert, so focus
    // stays in the menu; Escape closes it and returns focus to the toggle.
    useEffect(() => {
        if (!open) return

        const header = headerRef.current
        const outside = [...document.body.children].filter((el) => !el.contains(header))
        outside.forEach((el) => { el.inert = true })
        document.documentElement.style.overflow = "hidden"
        menuRef.current?.querySelector("a")?.focus()

        const onKey = (e) => {
            if (e.key !== "Escape") return
            setOpen(false)
            toggleRef.current?.focus()
        }
        window.addEventListener("keydown", onKey)

        return () => {
            outside.forEach((el) => { el.inert = false })
            document.documentElement.style.overflow = ""
            window.removeEventListener("keydown", onKey)
        }
    }, [open])

    return (
        <header
            ref={headerRef}
            className={`fixed inset-x-0 top-0 z-[1000] bg-background transition-[border-color] duration-300
                ${scrolled ? "border-b border-line" : "border-b border-transparent"}`}
        >
            <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:px-10">
                <Link href={href("/")} className="group flex items-center gap-2.5" aria-label={`HeyTai, ${dict.nav.home}`}>
                    <span className="relative h-7 w-7">
                        <ThemeLogo sizes="28px" priority />
                    </span>
                    <span className="font-display text-lg font-extrabold leading-none">
                        <span className="mark-hover">HeyTai</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex" aria-label={dict.nav.main}>
                    {navItems.map((item) => {
                        const active = isActive(path, item.href)
                        return (
                            <Link
                                key={item.href}
                                href={href(item.href)}
                                aria-current={active ? "page" : undefined}
                                className="group px-2.5 py-2 text-[0.95rem] font-medium"
                            >
                                <span className={active ? "mark" : "mark-hover"}>
                                    {dict.nav[item.key]}
                                </span>
                            </Link>
                        )
                    })}
                    <div className="mx-3 h-4 w-px bg-line" />
                    <div className="flex items-center gap-2">
                        <LocaleToggle />
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="flex items-center gap-2 md:hidden">
                    <LocaleToggle />
                    <ThemeToggle />
                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
                    >
                        <span className={`h-[2px] w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
                        <span className={`h-[2px] w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Inside the header so the toggle stays usable while the rest of the page is inert. */}
            <div
                id="mobile-menu"
                ref={menuRef}
                inert={!open}
                className={`fixed inset-0 -z-10 bg-background transition-opacity duration-300 md:hidden
                    ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
                <div className="flex h-full flex-col justify-between px-6 pb-10 pt-24">
                    <nav className="flex flex-col border-t border-foreground" aria-label={dict.nav.main}>
                        {navItems.map((item, i) => {
                            const active = isActive(path, item.href)
                            return (
                                <Link
                                    key={item.href}
                                    href={href(item.href)}
                                    onClick={() => setOpen(false)}
                                    aria-current={active ? "page" : undefined}
                                    className="group flex items-center gap-4 border-b border-line py-5"
                                >
                                    <NumberTab n={i + 1} />
                                    <span className="font-display text-[2rem] font-extrabold leading-none">
                                        <span className={active ? "mark" : "mark-hover"}>
                                            {dict.nav[item.key]}
                                        </span>
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>
                    <a href={`mailto:${EMAIL}`} className="link-mark self-start font-mono text-sm">
                        {EMAIL}
                    </a>
                </div>
            </div>
        </header>
    )
}

export default SiteNav
