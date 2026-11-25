"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { useEffect, useRef } from "react"
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
    const menuRef = useRef(null)
    const toggleRef = useRef(null)

    const path = stripLocale(pathname)

    // A modal <dialog> makes the page inert, traps focus, closes on Esc or
    // the back gesture and returns focus to the toggle, so none of that is
    // hand-rolled here. Only aria-expanded needs syncing.
    useEffect(() => {
        const menu = menuRef.current
        if (!menu) return
        const onClose = () => toggleRef.current?.setAttribute("aria-expanded", "false")
        menu.addEventListener("close", onClose)
        return () => menu.removeEventListener("close", onClose)
    }, [])

    // The menu is hidden from md up; close it there so the page is not left inert.
    useEffect(() => {
        const wide = window.matchMedia("(min-width: 768px)")
        const onChange = (e) => { if (e.matches) menuRef.current?.close() }
        wide.addEventListener("change", onChange)
        return () => wide.removeEventListener("change", onChange)
    }, [])

    // Close the menu once a link in it has navigated.
    useEffect(() => {
        if (menuRef.current?.open) menuRef.current.close()
    }, [pathname])

    const openMenu = () => {
        menuRef.current?.showModal()
        toggleRef.current?.setAttribute("aria-expanded", "true")
    }

    const closeMenu = () => menuRef.current?.close()

    const logo = (
        <Link href={href("/")} className="group flex items-center gap-2.5" aria-label={`HeyTai, ${dict.nav.home}`}>
            <span className="relative h-7 w-7">
                <ThemeLogo sizes="28px" eager />
            </span>
            <span className="font-display text-lg font-extrabold leading-none">
                <span className="mark-hover">HeyTai</span>
            </span>
        </Link>
    )

    return (
        <header className="site-header fixed inset-x-0 top-0 z-[1000] bg-background">
            <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:px-10">
                {logo}

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
                        onClick={openMenu}
                        aria-label={dict.nav.openMenu}
                        aria-expanded="false"
                        aria-controls="mobile-menu"
                        className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
                    >
                        <span aria-hidden className="h-[2px] w-6 bg-foreground" />
                        <span aria-hidden className="h-[2px] w-6 bg-foreground" />
                    </button>
                </div>
            </div>

            <dialog
                id="mobile-menu"
                ref={menuRef}
                aria-label={dict.nav.main}
                className="sheet-dialog bg-background text-foreground md:hidden"
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 shrink-0 items-center justify-between px-6">
                        {logo}
                        <button
                            type="button"
                            onClick={closeMenu}
                            aria-label={dict.nav.closeMenu}
                            autoFocus
                            className="flex h-10 w-10 items-center justify-center"
                        >
                            <X className="h-6 w-6" aria-hidden />
                        </button>
                    </div>
                    <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 pb-10 pt-8">
                        <nav className="flex flex-col border-t border-foreground" aria-label={dict.nav.main}>
                            {navItems.map((item, i) => {
                                const active = isActive(path, item.href)
                                return (
                                    <Link
                                        key={item.href}
                                        href={href(item.href)}
                                        onClick={closeMenu}
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
                        <a href={`mailto:${EMAIL}`} className="link-mark mt-10 self-start font-mono text-sm">
                            {EMAIL}
                        </a>
                    </div>
                </div>
            </dialog>
        </header>
    )
}

export default SiteNav
