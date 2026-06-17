"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
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
            aria-label={isDark ? "切換淺色主題" : "切換深色主題"}
            className="
                w-8 h-8 rounded-full flex items-center justify-center
                border border-slate-200 dark:border-slate-700
                text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition-all duration-300 active:scale-90
            "
        >
            {isDark
                ? <Sun size={16} />
                : <Moon size={16} />
            }
        </button>
    )
}
