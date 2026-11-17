"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// The App Router keeps the scroll position here (fixed header + shared
// layout), so scroll new pages to the top explicitly.
export default function SmoothNavigate() {
    const pathname = usePathname()

    useEffect(() => {
        if (window.scrollY > 100) {
            window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
            window.scrollTo(0, 0)
        }
    }, [pathname])

    return null
}
