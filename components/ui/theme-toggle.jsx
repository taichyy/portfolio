"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

import { useI18n } from "@/components/providers/i18n-provider"

export function ThemeToggle() {
    const { dict } = useI18n()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <div className="w-8 h-8 rounded-full border border-border animate-pulse bg-muted" />
        )
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? dict.nav.toLight : dict.nav.toDark}
            className="
                flex h-8 w-8 items-center justify-center rounded-full
                border border-line text-muted-foreground
                transition-all duration-300 hover:bg-accent hover:text-foreground active:scale-90
            "
        >
            {isDark
                ? <Sun size={16} />
                : <Moon size={16} />
            }
        </button>
    )
}
