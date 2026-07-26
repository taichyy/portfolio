"use client"

import { useEffect, useRef } from "react"

/**
 * ScrollReveal component
 * Adds scroll-triggered animations to child elements
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.stagger] - Enable staggered children animation
 * @param {number} [props.delay] - Animation delay in ms
 */
export default function ScrollReveal({ children, className = "", stagger = false, delay = 0 }) {
    const ref = useRef(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("is-visible")
                        }, delay)
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [delay])

    return (
        <div
            ref={ref}
            className={`${stagger ? "stagger-children" : "animate-on-scroll"} ${className}`}
        >
            {children}
        </div>
    )
}
