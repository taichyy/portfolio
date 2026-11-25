"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

import { useI18n } from "@/components/providers/i18n-provider"

// Both states are in the markup and the `dark` class (set before paint by
// next-themes) picks which one shows, so the button renders correctly on
// the server and never needs a placeholder while hydrating.
export const ThemeToggle = () => {
    const { dict } = useI18n()
    const { setTheme } = useTheme()

    const toggle = () => {
        const isDark = document.documentElement.classList.contains("dark")
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <button
            type="button"
            onClick={toggle}
            className="
                flex h-8 w-8 items-center justify-center rounded-full
                border border-line text-muted-foreground
                transition-colors duration-300 hover:bg-accent hover:text-foreground
                motion-safe:transition-[color,background-color,transform] motion-safe:active:scale-90
            "
        >
            <span className="contents dark:hidden">
                <Moon size={16} aria-hidden />
                <span className="sr-only">{dict.nav.toDark}</span>
            </span>
            <span className="hidden dark:contents">
                <Sun size={16} aria-hidden />
                <span className="sr-only">{dict.nav.toLight}</span>
            </span>
        </button>
    )
}
