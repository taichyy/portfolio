"use client"

import {
    Children,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { useI18n } from "@/components/providers/i18n-provider"

const tones = {
    light: {
        button: "border-line bg-background/80 text-foreground backdrop-blur-sm hover:bg-background",
        marker: "bg-subtle",
        markerActive: "bg-foreground",
    },
    dark: {
        button: "border-white/30 bg-black/50 text-white hover:bg-black/70",
        marker: "bg-white/50",
        markerActive: "bg-white",
    },
}

// A native scroll-snap carousel: swiping, momentum and keyboard scrolling of
// the focused track come from the browser. Script only wires the buttons,
// the markers and the polite status message.
//
// `ref` exposes { goTo, next, prev } for callers that handle keys elsewhere.
const Carousel = (props) => {
    const {
        children,
        label,
        startIndex = 0,
        tone = "light",
        markers = true,
        onIndexChange,
        className,
        slideClassName,
        ref,
    } = props;
    const { dict } = useI18n()

    const slides = Children.toArray(children)
    const total = slides.length
    // Looping is the default from three slides; two slides stop at the ends.
    const loop = total >= 3
    const style = tones[tone]

    const trackRef = useRef(null)
    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const announcedRef = useRef(startIndex)
    // Where the track is heading. Read by the buttons instead of `current`,
    // which only updates once a scroll frame has rendered.
    const targetRef = useRef(startIndex)
    const onIndexChangeRef = useRef(onIndexChange)
    const [current, setCurrent] = useState(startIndex)
    const [status, setStatus] = useState("")

    useEffect(() => {
        onIndexChangeRef.current = onIndexChange
    }, [onIndexChange])

    const indexFromScroll = () => {
        const track = trackRef.current
        if (!track || track.clientWidth === 0) return 0
        return Math.round(track.scrollLeft / track.clientWidth)
    }

    const goTo = (index) => {
        const track = trackRef.current
        if (!track) return
        const target = loop
            ? (index + total) % total
            : Math.min(Math.max(index, 0), total - 1)
        targetRef.current = target
        // No explicit behavior: CSS scroll-behavior decides, so reduced
        // motion users get an instant jump.
        track.scrollTo({ left: target * track.clientWidth })
    }

    useImperativeHandle(ref, () => ({
        goTo,
        next: () => goTo(targetRef.current + 1),
        prev: () => goTo(targetRef.current - 1),
    }))

    // Start on the requested slide without animating there.
    useLayoutEffect(() => {
        const track = trackRef.current
        if (track) track.scrollTo({ left: startIndex * track.clientWidth, behavior: "instant" })
    }, [startIndex])

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        let frame = 0
        let timer = 0

        // Announce only once scrolling has settled on a new slide.
        const settle = () => {
            const index = indexFromScroll()
            targetRef.current = index
            if (index === announcedRef.current) return
            announcedRef.current = index
            setStatus(dict.carousel.slide(index + 1, total))
        }

        const onScroll = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                const index = indexFromScroll()
                setCurrent(index)
                onIndexChangeRef.current?.(index)
            })
            // Fallback where scrollend is not available.
            if (!("onscrollend" in window)) {
                clearTimeout(timer)
                timer = setTimeout(settle, 150)
            }
        }

        track.addEventListener("scroll", onScroll, { passive: true })
        track.addEventListener("scrollend", settle)
        return () => {
            cancelAnimationFrame(frame)
            clearTimeout(timer)
            track.removeEventListener("scroll", onScroll)
            track.removeEventListener("scrollend", settle)
        }
    }, [dict, total])

    const atStart = !loop && current === 0
    const atEnd = !loop && current === total - 1

    // A control that disables itself while focused would drop focus to the
    // body; hand it to the opposite control instead.
    useEffect(() => {
        if (atStart && document.activeElement === prevRef.current) nextRef.current?.focus()
        if (atEnd && document.activeElement === nextRef.current) prevRef.current?.focus()
    }, [atStart, atEnd])

    const arrow = cn(
        "pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-40",
        style.button,
    )

    return (
        <section
            aria-roledescription="carousel"
            aria-label={label || dict.carousel.label}
            className={className}
        >
            <div className="relative">
                <div
                    ref={trackRef}
                    tabIndex={0}
                    data-carousel-track
                    className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] motion-safe:scroll-smooth [&::-webkit-scrollbar]:hidden"
                >
                    {slides.map((slide, i) => (
                        <div
                            key={i}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={dict.carousel.slide(i + 1, total)}
                            className={cn("min-w-0 shrink-0 grow-0 basis-full snap-center snap-always", slideClassName)}
                        >
                            {slide}
                        </div>
                    ))}
                </div>

                {/* The overlay passes pointer events through so the track stays swipeable. */}
                <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-5">
                    <button
                        ref={prevRef}
                        type="button"
                        onClick={() => goTo(targetRef.current - 1)}
                        disabled={atStart}
                        className={arrow}
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden />
                        <span className="sr-only">{dict.carousel.prev}</span>
                    </button>
                    <button
                        ref={nextRef}
                        type="button"
                        onClick={() => goTo(targetRef.current + 1)}
                        disabled={atEnd}
                        className={arrow}
                    >
                        <ArrowRight className="h-4 w-4" aria-hidden />
                        <span className="sr-only">{dict.carousel.next}</span>
                    </button>
                </div>
            </div>

            {markers && (
                <nav aria-label={dict.carousel.markers} className="mt-2 flex justify-center gap-1">
                    {slides.map((_, i) => (
                        // 24px hit area around a small dot (WCAG 2.5.8); the
                        // active dot is wider, not only a different colour.
                        <button
                            key={i}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={dict.project.goToImage(i + 1)}
                            aria-current={current === i ? "true" : undefined}
                            className="flex h-6 min-w-6 items-center justify-center"
                        >
                            <span
                                aria-hidden
                                className={cn(
                                    "h-1.5 rounded-full transition-[width,background-color] duration-300",
                                    current === i ? cn("w-5", style.markerActive) : cn("w-1.5", style.marker),
                                )}
                            />
                        </button>
                    ))}
                </nav>
            )}

            <p role="status" aria-live="polite" className="sr-only">
                {status}
            </p>
        </section>
    )
}

export default Carousel
