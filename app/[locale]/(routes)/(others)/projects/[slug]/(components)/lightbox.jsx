"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import Carousel from "@/components/ui/carousel"
import { useI18n } from "@/components/providers/i18n-provider"

// A native modal <dialog>: the browser makes the page inert, traps focus,
// closes on Esc or the back gesture and returns focus to the zoom button.
const Lightbox = (props) => {
    const { open, onOpenChange, images = [], startIndex = 0, title = "" } = props;
    const { dict } = useI18n()
    const multiple = images.length > 1

    const dialogRef = useRef(null)
    const carouselRef = useRef(null)
    const onOpenChangeRef = useRef(onOpenChange)
    const [current, setCurrent] = useState(startIndex)

    // Reset the counter on (re)open during render rather than in an effect.
    const [openedAt, setOpenedAt] = useState({ open, startIndex })
    if (openedAt.open !== open || openedAt.startIndex !== startIndex) {
        setOpenedAt({ open, startIndex })
        setCurrent(startIndex)
    }

    useEffect(() => {
        onOpenChangeRef.current = onOpenChange
    }, [onOpenChange])

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [open])

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        const onClose = () => onOpenChangeRef.current?.(false)
        dialog.addEventListener("close", onClose)
        return () => dialog.removeEventListener("close", onClose)
    }, [])

    // Arrow keys from anywhere in the dialog (e.g. the close button). The
    // focused track already scrolls natively, so leave its keys alone.
    const onKeyDown = (e) => {
        if (!multiple || e.defaultPrevented) return
        if (e.target.closest?.("[data-carousel-track]")) return
        if (e.key === "ArrowRight") {
            e.preventDefault()
            carouselRef.current?.next()
        } else if (e.key === "ArrowLeft") {
            e.preventDefault()
            carouselRef.current?.prev()
        }
    }

    if (images.length === 0) return null

    const picture = (img, i) => (
        <div className="relative h-[78dvh] w-full">
            <Image
                src={img.src}
                alt={img.alt || title || dict.lightbox.image(i + 1)}
                fill
                quality={90}
                sizes="100vw"
                className="select-none object-contain"
            />
        </div>
    )

    return (
        <dialog
            ref={dialogRef}
            aria-label={title || dict.lightbox.title}
            onKeyDown={onKeyDown}
            className="sheet-dialog bg-black/90 text-white backdrop-blur-sm"
        >
            {/* Images load only while the viewer is open. */}
            {open && (
                <div className="flex h-full flex-col">
                    <div className="flex shrink-0 items-center justify-between px-5 py-4">
                        <span className="font-mono text-xs tabular-nums text-white/70" aria-hidden>
                            {multiple ? `${current + 1} / ${images.length}` : ""}
                        </span>
                        <button
                            type="button"
                            onClick={() => dialogRef.current?.close()}
                            autoFocus
                            aria-label={dict.lightbox.close}
                            className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <X className="h-5 w-5" aria-hidden />
                        </button>
                    </div>

                    <div className="relative flex min-h-0 flex-1 items-center justify-center pb-8">
                        {multiple ? (
                            <Carousel
                                ref={carouselRef}
                                label={title || dict.lightbox.title}
                                startIndex={startIndex}
                                tone="dark"
                                markers={false}
                                onIndexChange={setCurrent}
                                className="w-full"
                                slideClassName="px-14 sm:px-20"
                            >
                                {images.map((img, i) => picture(img, i))}
                            </Carousel>
                        ) : (
                            <div className="w-full px-6">{picture(images[0], 0)}</div>
                        )}
                    </div>
                </div>
            )}
        </dialog>
    )
}

export default Lightbox
