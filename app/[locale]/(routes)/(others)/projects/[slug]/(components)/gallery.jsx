"use client"

import Image from "next/image"
import { useState, ViewTransition } from "react"

import Lightbox from "./lightbox"
import Carousel from "@/components/ui/carousel"
import { useI18n } from "@/components/providers/i18n-provider"

// Width of the case-study column next to the 16rem meta aside.
export const CONTENT_SIZES = "(min-width: 1240px) 856px, (min-width: 1024px) calc(100vw - 24rem), calc(100vw - 3rem)"

const zoomButton = "block w-full cursor-zoom-in overflow-hidden border border-line transition-opacity hover:opacity-90"

const Gallery = (props) => {
    const { images, title, transitionName } = props;
    const { dict } = useI18n()
    const [zoomAt, setZoomAt] = useState(null)

    if (images.length === 0) return null

    const slide = (img, i) => {
        // The first shot is the page's likely LCP element: fetch it first.
        // Later slides start hidden off to the side, so they wait.
        const first = i === 0
        const button = (
            <button
                type="button"
                onClick={() => setZoomAt(i)}
                className={zoomButton}
                aria-label={images.length > 1 ? dict.project.zoomImageAt(i + 1) : dict.project.zoomImage}
            >
                <Image
                    src={img.src}
                    alt={img.alt}
                    width={1920}
                    height={1080}
                    sizes={CONTENT_SIZES}
                    preload={first}
                    fetchPriority={first ? "high" : "low"}
                    loading={first ? undefined : "lazy"}
                    className="aspect-video w-full object-cover object-top"
                />
            </button>
        )

        if (!first || !transitionName) return button

        // Pairs with the project thumbnail on the home and projects pages.
        return (
            <ViewTransition name={transitionName} share="project-shot">
                {button}
            </ViewTransition>
        )
    }

    return (
        <div className="mb-14">
            {images.length === 1 ? slide(images[0], 0) : (
                <Carousel label={title}>
                    {images.map((img, i) => slide(img, i))}
                </Carousel>
            )}

            <Lightbox
                open={zoomAt !== null}
                onOpenChange={(open) => { if (!open) setZoomAt(null) }}
                images={images}
                startIndex={zoomAt ?? 0}
                title={title}
            />
        </div>
    )
}

export default Gallery
