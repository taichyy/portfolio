"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * SmoothNavigate component
 * Smoothly scrolls to top when navigating between pages
 */
export default function SmoothNavigate() {
    const pathname = usePathname()

    useEffect(() => {
        // Get current scroll position
        const scrollY = window.scrollY

        // Only animate if user has scrolled down
        if (scrollY > 100) {
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        } else {
            // If already near top, just jump instantly
            window.scrollTo(0, 0)
        }
    }, [pathname])

    return null
}
