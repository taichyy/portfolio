"use client"

import Link from "next/link";
import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation";

import { ThemeToggle } from "../ui/theme-toggle";

const navLinks = [
    { id: "1", url: "/", label: "首頁" },
    { id: "2", url: "/about", label: "關於我" },
    { id: "3", url: "/portfolio", label: "作品集" },
    { id: "4", url: "/contact", label: "聯絡方式" },
]

const NavResponsive = () => {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => { setOpen(false) }, [pathname])

    useEffect(() => {
        if (open) {
            document.documentElement.style.overflow = 'hidden'
            return () => { document.documentElement.style.overflow = '' }
        }
    }, [open])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            {/* ── Desktop pill nav ─────────────────────────────── */}
            <nav className="fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-5 px-4">
                <div className={`
                    hidden md:flex items-center gap-1 px-3 py-2 rounded-full
                    border border-slate-200 dark:border-slate-700 backdrop-blur-xl
                    transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${scrolled
                        ? 'bg-white/80 dark:bg-slate-900/80 shadow-lg'
                        : 'bg-white/60 dark:bg-slate-900/60'}
                `}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 px-3 py-1 mr-2">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            <span className="text-lg text-[#EBFF00] bg-slate-900 dark:bg-slate-100 dark:text-slate-900 px-1.5 py-0.5">T</span>
                        </span>
                    </Link>

                    {/* Nav links */}
                    {navLinks.map((link) => (
                        <Link key={link.id} href={link.url}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                                ${pathname === link.url
                                    ? 'bg-slate-900/10 text-slate-900 dark:bg-slate-100/10 dark:text-slate-100'
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
                                }`}>
                            {link.label}
                        </Link>
                    ))}

                    <div className="ml-1">
                        <ThemeToggle />
                    </div>
                </div>

                {/* ── Mobile pill ──────────────────────────────── */}
                <div className={`
                    flex md:hidden items-center justify-between w-full max-w-sm px-4 py-2.5 rounded-full
                    border border-slate-200 dark:border-slate-700 backdrop-blur-xl transition-all duration-500
                    ${scrolled
                        ? 'bg-white/80 dark:bg-slate-900/80 shadow-lg'
                        : 'bg-white/60 dark:bg-slate-900/60'}
                `}>
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            <span className="text-lg text-[#EBFF00] bg-slate-900 dark:bg-slate-100 dark:text-slate-900 px-1.5 py-0.5">T</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
                            className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5">
                            <span className={`block w-5 h-[1.5px] bg-slate-700 dark:bg-slate-300 rounded-full transition-all duration-300 origin-center
                                ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
                            <span className={`block w-5 h-[1.5px] bg-slate-700 dark:bg-slate-300 rounded-full transition-all duration-300
                                ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Mobile backdrop ───────────────────────────────── */}
            <div className={`fixed top-0 left-0 right-0 bottom-0 z-[999] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                backdrop-blur-md bg-black/40 min-h-[100dvh]
                ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setOpen(false)} />

            {/* ── Mobile side drawer ─────────────────────────────── */}
            <div className={`fixed right-0 top-0 z-[1000] h-[100dvh] w-full max-w-sm md:hidden
                flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 overflow-hidden
                ${open ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>

                {/* Drawer header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-50 flex-shrink-0">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">選單</h2>
                    <button onClick={() => setOpen(false)} aria-label="Close menu"
                        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <svg className="w-5 h-5 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Drawer content */}
                <div className="flex flex-col gap-0 p-4 flex-1 overflow-y-auto min-h-0">
                    {navLinks.map((link) => (
                        <Link key={link.id} href={link.url} onClick={() => setOpen(false)}
                            className={`px-4 py-3 rounded-lg text-lg font-semibold tracking-tight transition-all duration-300
                                ${pathname === link.url
                                    ? 'bg-slate-900/10 text-slate-900 dark:bg-slate-100/10 dark:text-slate-100'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
                                }`}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default NavResponsive;
