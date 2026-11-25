"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// The App Router keeps the scroll position here (fixed header + shared
// layout), so jump new pages to the top and move focus to the new page's
// heading. Focus routing gives keyboard and screen reader users the new
// context instead of leaving focus on a link that no longer exists.
const NavigationReset = () => {
    const pathname = usePathname()
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }

        window.scrollTo({ top: 0, left: 0, behavior: "instant" })

        const heading = document.querySelector("#content h1")
        if (!heading) return
        if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1")
        heading.focus({ preventScroll: true })
    }, [pathname])

    return null
}

export default NavigationReset
