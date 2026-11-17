"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Lightbox from "./lightbox"
import { useI18n } from "@/components/providers/i18n-provider"

const zoomButton = "block w-full cursor-zoom-in overflow-hidden border border-line transition-opacity hover:opacity-90"

const Gallery = (props) => {
    const { images, title } = props;
    const { dict } = useI18n()

    const [api, setApi] = useState(null)
    const [current, setCurrent] = useState(1)
    const [zoomAt, setZoomAt] = useState(null)

    useEffect(() => {
        if (!api) return
        const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", onSelect)
        return () => { api.off("select", onSelect) }
    }, [api])

    if (images.length === 0) return null

    const slide = (img, i) => (
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
                className="aspect-video w-full object-cover"
            />
        </button>
    )

    return (
        <div className="mb-14">
            {images.length === 1 ? slide(images[0], 0) : (
                <>
                    <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
                        <CarouselContent>
                            {images.map((img, i) => (
                                <CarouselItem key={img.src}>{slide(img, i)}</CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-3 bg-background/80 backdrop-blur-sm" />
                        <CarouselNext className="right-3 bg-background/80 backdrop-blur-sm" />
                    </Carousel>
                    <div className="mt-3 flex justify-center gap-1.5">
                        {images.map((img, i) => (
                            <button
                                key={img.src}
                                type="button"
                                onClick={() => api?.scrollTo(i)}
                                aria-label={dict.project.goToImage(i + 1)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    current === i + 1 ? "w-5 bg-foreground" : "w-1.5 bg-muted-foreground/30",
                                )}
                            />
                        ))}
                    </div>
                </>
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
