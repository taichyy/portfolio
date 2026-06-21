"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react'
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowUpRight } from "lucide-react";

import { ThemeToggle } from "../ui/theme-toggle";
import { portfolio } from "@/lib/data";

const simpleLinks = [
    { id: "1", url: "/", label: "首頁" },
    { id: "2", url: "/about", label: "關於我" },
    { id: "4", url: "/contact", label: "聯絡方式" },
]

// ── Portfolio dropdown ─────────────────────────────────────────
function PortfolioDropdown({ onNavigate }) {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] max-w-[calc(100vw-2rem)]
            rounded-2xl border border-border bg-card/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl
            overflow-hidden z-50">
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-border">
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">作品集</p>
            </div>

            <div className="p-3 space-y-1">
                {portfolio.map((work) => (
                    <Link
                        key={work.id}
                        href={`/portfolio/${work.id}`}
                        onClick={onNavigate}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl
                            hover:bg-secondary transition-all duration-200"
                    >
                        {/* Thumbnail */}
                        <div className="flex items-center justify-center
                            w-10 h-10 rounded-lg bg-secondary overflow-hidden shrink-0
                            border border-border group-hover:border-primary/30 transition-colors">
                            {work.img && work.img[0] ? (
                                <Image
                                    src={work.img[0]}
                                    alt={work.title}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover opacity-80"
                                />
                            ) : (
                                <div className="w-full h-full bg-muted" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
                                    {work.title}
                                </span>
                                {work.badges && work.badges[0] && (
                                    <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                                        {work.badges[0]}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                                {work.languages.join(" / ")}
                            </p>
                        </div>

                        <ArrowUpRight size={14}
                            className="text-muted-foreground/30 group-hover:text-primary shrink-0
                                transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-border">
                <Link href="/portfolio" onClick={onNavigate}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1">
                    查看全部作品
                    <ArrowUpRight size={11} />
                </Link>
            </div>
        </div>
    )
}

// ── Main nav ────────────────────────────────────────────────
const NavResponsive = () => {
    const [open, setOpen] = useState(false)
    const [portfolioOpen, setPortfolioOpen] = useState(false)
    const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const dropdownRef = useRef(null)

    useEffect(() => { setOpen(false); setPortfolioOpen(false) }, [pathname])

    useEffect(() => {
        !open && setMobileWorksOpen(false);
        
        if (open || mobilePortfolioOpen) {
            document.documentElement.style.overflow = 'hidden'
            return () => { document.documentElement.style.overflow = '' }
        }
    }, [open, mobilePortfolioOpen])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setPortfolioOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const isPortfolioActive = pathname.startsWith('/portfolio')

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
                            <span className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900">
                                <img src="/logo-white.png" className="w-9 h-auto hidden dark:block" />
                                <img src="/logo-dark.png" className="w-9 h-auto block dark:hidden" />
                            </span>
                        </span>
                    </Link>

                    {/* Simple links (首頁, 關於我) */}
                    {simpleLinks.slice(0, 2).map((link) => (
                        <Link key={link.id} href={link.url}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                                ${pathname === link.url
                                    ? 'bg-slate-900/10 text-slate-900 dark:bg-slate-100/10 dark:text-slate-100'
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
                                }`}>
                            {link.label}
                        </Link>
                    ))}

                    {/* Portfolio dropdown trigger */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setPortfolioOpen((v) => !v)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                                transition-all duration-300
                                ${isPortfolioActive || portfolioOpen
                                    ? 'bg-slate-900/10 text-slate-900 dark:bg-slate-100/10 dark:text-slate-100'
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
                                }`}
                        >
                            作品集
                            <ChevronDown size={12}
                                className={`transition-transform duration-300 ${portfolioOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown panel */}
                        <div className={`transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                            ${portfolioOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                            <PortfolioDropdown onNavigate={() => setPortfolioOpen(false)} />
                        </div>
                    </div>

                    {/* Remaining simple links (聯絡方式) */}
                    {simpleLinks.slice(2).map((link) => (
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
                            <span className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900">
                                <img src="/logo-white.png" className="w-9 h-auto hidden dark:block" />
                                <img src="/logo-dark.png" className="w-9 h-auto block dark:hidden" />
                            </span>
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
                    {/* 首頁, 關於我 */}
                    {simpleLinks.slice(0, 2).map((link) => (
                        <Link key={link.id} href={link.url} onClick={() => setOpen(false)}
                            className={`px-4 py-3 rounded-lg text-lg font-semibold tracking-tight transition-all duration-300
                                ${pathname === link.url
                                    ? 'bg-slate-900/10 text-slate-900 dark:bg-slate-100/10 dark:text-slate-100'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
                                }`}>
                            {link.label}
                        </Link>
                    ))}

                    {/* Portfolio accordion */}
                    <div className={mobilePortfolioOpen ? "mb-2" : ""}>
                        <button
                            onClick={() => setMobilePortfolioOpen((v) => !v)}
                            className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-lg font-semibold tracking-tight
                                text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            作品集
                            <ChevronDown size={18}
                                className={`transition-transform duration-300 ${mobilePortfolioOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Mobile portfolio list */}
                        <div className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ml-2
                            ${mobilePortfolioOpen ? 'max-h-[900px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            <div className="mt-2 rounded-2xl border border-border bg-card/80 dark:bg-slate-800/80 overflow-hidden divide-y divide-border">
                                {portfolio.map((work) => (
                                    <Link key={work.id} href={`/portfolio/${work.id}`}
                                        onClick={() => { setOpen(false); setMobilePortfolioOpen(false) }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-secondary overflow-hidden shrink-0 border border-border">
                                            {work.img && work.img[0] ? (
                                                <Image
                                                    src={work.img[0]}
                                                    alt={work.title}
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full object-cover opacity-80"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-muted" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-card-foreground truncate">{work.title}</p>
                                            <p className="text-xs text-muted-foreground truncate">{work.languages.join(" / ")}</p>
                                        </div>
                                    </Link>
                                ))}
                                {/* View all link */}
                                <Link href="/portfolio"
                                    onClick={() => { setOpen(false); setMobilePortfolioOpen(false) }}
                                    className="flex items-center gap-2 px-4 py-3 hover:bg-secondary transition-colors">
                                    <p className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                                        查看全部作品
                                        <ArrowUpRight size={11} />
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Remaining links (聯絡方式) */}
                    {simpleLinks.slice(2).map((link) => (
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
