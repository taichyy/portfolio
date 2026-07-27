"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel"

// Full-screen image viewer.
// - Multiple images → a swipeable carousel that opens at `startIndex`.
// - A single image → just the image, no carousel controls.
const Lightbox = (props) => {
    const { open, onOpenChange, images = [], startIndex = 0, title = "" } = props;
    const multiple = images.length > 1

    const [api, setApi] = useState(null)
    const [current, setCurrent] = useState(startIndex + 1)

    useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap() + 1)
        const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", onSelect)
        return () => { api.off("select", onSelect) }
    }, [api])

    // Arrow keys navigate. The carousel's own handler only fires when focus is
    // inside it (and calls preventDefault), so this covers the rest.
    useEffect(() => {
        if (!open || !multiple) return
        const onKey = (e) => {
            if (e.defaultPrevented || !api) return
            if (e.key === "ArrowRight") api.scrollNext()
            else if (e.key === "ArrowLeft") api.scrollPrev()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open, multiple, api])

    if (images.length === 0) return null

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-[1100] bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
                <DialogPrimitive.Content
                    className="fixed inset-0 z-[1100] flex flex-col outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <DialogPrimitive.Title className="sr-only">
                        {title || "圖片檢視"}
                    </DialogPrimitive.Title>

                    {/* Top bar */}
                    <div className="flex shrink-0 items-center justify-between px-5 py-4">
                        <span className="font-mono text-xs tabular-nums text-white/70">
                            {multiple ? `${current} / ${images.length}` : ""}
                        </span>
                        <DialogPrimitive.Close
                            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label="關閉"
                        >
                            <X className="h-5 w-5" />
                        </DialogPrimitive.Close>
                    </div>

                    {/* Image area */}
                    <div className="relative flex min-h-0 flex-1 items-center justify-center pb-8">
                        {multiple ? (
                            <Carousel
                                key={startIndex}
                                className="w-full"
                                opts={{ loop: true, startIndex }}
                                setApi={setApi}
                            >
                                <CarouselContent>
                                    {images.map((img, i) => (
                                        <CarouselItem key={i} className="px-10 sm:px-16">
                                            <div className="relative h-[78vh] w-full">
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt || `圖片 ${i + 1}`}
                                                    fill
                                                    quality={90}
                                                    sizes="100vw"
                                                    className="object-contain select-none"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-3 h-11 w-11 border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white sm:left-5" />
                                <CarouselNext className="right-3 h-11 w-11 border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white sm:right-5" />
                            </Carousel>
                        ) : (
                            <div className="relative h-[78vh] w-full px-6">
                                <Image
                                    src={images[0].src}
                                    alt={images[0].alt || title || "圖片"}
                                    fill
                                    quality={90}
                                    sizes="100vw"
                                    className="object-contain select-none"
                                />
                            </div>
                        )}
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}

export default Lightbox
